import { useState, useEffect } from 'react';
import { Button, Container, Row, Col, Navbar, Nav, Dropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
  useGetChannelsQuery, useAddMessagesMutation, useAddChannelMutation,
  useGetMessagesQuery, useEditChannelMutation, useRemoveChannelMutation, 
} from '../api/usersApi';
import { setAuthToken } from '../Slice/authSlice';
import { setChannels, selectChannels, setCurrentChannel, selectCurrentChannel } from '../Slice/channelsSlice';
import { selectCurrentAuthor } from '../Slice/currentAuthorSlice';
import AddChannel from './ModalWindows/AddChannel';
import handleSocketEvents from '../api/socket';
import { addMessage, selectMessages } from '../Slice/messagesSlice';
import { useTranslation } from 'react-i18next'; 
import filter from 'leo-profanity';
import RenameChannelModal from './ModalWindows/RenameChannel';
import DeleteChannelModal from './ModalWindows/RemoveChannel';
import MessageForm from './MessageForm';
import MessageList from './MessageList';

const MainPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const channelsStore = useSelector(selectChannels);
  const currentChannel = useSelector(selectCurrentChannel);
  const token = localStorage.getItem('token');
  const author = useSelector(selectCurrentAuthor) || localStorage.getItem('author');
  const [showModal, setShowModal] = useState(false);
  const messagesStore = useSelector(selectMessages);
  const { t } = useTranslation();
  filter.loadDictionary('ru');
  const defaultChannel = channelsStore.find((channel) => channel.name === 'general')
  
  useEffect(() => {
    const subscribeSocket = handleSocketEvents(dispatch, channelsStore, messagesStore);
  
    return () => {
      subscribeSocket();
    };
  }, [dispatch, channelsStore, messagesStore]);

  useEffect(() => {
    if (token !== null) {
      dispatch(setAuthToken(token));
    }

    if (token === null) {
      navigate('/login');
    }
  }, [token, dispatch, navigate]);

  const { data: channels } = useGetChannelsQuery();
  const [addMessages] = useAddMessagesMutation();
  const [addChannel] = useAddChannelMutation();
  const { data: allMessages, refetch } = useGetMessagesQuery();
  const [editChannel] = useEditChannelMutation();
  const [removeChannel] = useRemoveChannelMutation();

  useEffect(() => {
    if (channels) {
      dispatch(setCurrentChannel(channels[0]));
      dispatch(setChannels(channels));
    }
  }, [channels, dispatch]);
  
  useEffect(() => {
    if (allMessages && currentChannel) {
      const channelMessages = allMessages.filter(message => message.channelId === currentChannel.id);
      dispatch(addMessage(channelMessages));
    }
  }, [allMessages, currentChannel, dispatch]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const textMessage = filter.clean(formData.get('body'));
    const newMessage = { body: textMessage, channelId: currentChannel.id, username: author };
    addMessages(newMessage);
    event.target.reset();
  };

  const handleExit = () => {
    navigate('/login');
    localStorage.clear();
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleAddChannel = async (event) => {
    const newChannel = { name: filter.clean(event.channelName) };
    const { data: createdChannel } = await addChannel(newChannel);
    dispatch(setCurrentChannel(createdChannel));
    setShowModal(false);
  };

  const [showRenameModal, setShowRenameModal] = useState(false);
  const [selectedClickChannel, setSelectedClickChannel] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const renderChannels = () => {
    const handleChangeChannel = async (channel) => {
      if (channel !== currentChannel) {
        dispatch(setCurrentChannel(channel));
        await refetch();
      }
    };
    
    const handleRenameChannel = (channel) => {
      setSelectedClickChannel(channel);
      setShowRenameModal(true);
    };
  
    const handleRename = (newName) => {
      const editedChannel = { name: newName };
      editChannel({ id: selectedClickChannel.id, nameChannel: editedChannel });
      const updatedChannel = { ...currentChannel, name: newName };
      dispatch(setCurrentChannel(updatedChannel));
      setShowRenameModal(false);
    };
  
    const handleDeleteChannel = (channel) => {
      setSelectedClickChannel(channel);
      setShowDeleteModal(true);
    };

    const handleDelete = async () => {
      removeChannel(selectedClickChannel.id);
      if (currentChannel && currentChannel.id === selectedClickChannel.id) {
        dispatch(setCurrentChannel(defaultChannel));
        const { data: updatedMessages } = await refetch();
        const channelMessages = updatedMessages.filter(message => message.channelId === defaultChannel.id);
        dispatch(addMessage(channelMessages));

      }
      setShowDeleteModal(false);
    };
  
    return (
      <>
        {channelsStore && channelsStore.length > 0 && channelsStore.map((channel, index) => (
          <div key={index} className='d-flex dropdown btn-group'>
            <button
              type='button'
              className={`w-100 rounded-0 text-start text-truncate btn ${currentChannel && currentChannel.id === channel.id ? 'btn-secondary' : ''}`}
              onClick={() => handleChangeChannel(channel)}
            >
              <span className='me-1'>#</span>{channel.name}
            </button>
            {channel.removable && (
              <Dropdown>
                <Dropdown.Toggle
                  split
                  variant=''
                  className={`dropdown-toggle-split btn ${currentChannel && currentChannel.id === channel.id ? 'btn-secondary' : ''}`}
                  id={`dropdown-split-basic-${index}`}
                  style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                >
                  <span className='visually-hidden'>Управление каналом</span>
                </Dropdown.Toggle>
      
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => handleDeleteChannel(channel)}>Удалить</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleRenameChannel(channel)}>Переименовать</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
          </div>
        ))}
        <RenameChannelModal
          show={showRenameModal}
          handleClose={() => setShowRenameModal(false)}
          handleRename={handleRename}
          initialValues={{ name: selectedClickChannel ? selectedClickChannel.name : '' }}
        />
        <DeleteChannelModal
        show={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        handleDelete={handleDelete}
      />
      </>
    );
  }
  

  return (
    <div className='h-100 bg-light'>
      <div className='h-100'>
        <div className='h-100' id='chat'>
          <div className='d-flex flex-column h-100'>
            <Navbar bg='white' expand='lg' className='shadow-sm'>
              <Container>
                <Navbar.Brand href='/'>Hexlet Chat</Navbar.Brand>
                <Button variant='primary' onClick={handleExit}>{t('chatMainPage.exit')}</Button>
              </Container>
            </Navbar>
            <Container className='h-100 my-4 overflow-hidden rounded shadow'>
              <Row className='h-100 bg-white flex-md-row'>
                <Col xs={4} md={2} className='border-end px-0 bg-light flex-column h-100 d-flex'>
                  <div className='d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4'>
                    <b>{t('chatMainPage.channels')}</b>
                    <Button variant='primary' onClick={handleShowModal}>
                      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' width='20' height='20' fill='currentColor'>
                        <path d='M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z'></path>
                        <path d='M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4'></path>
                      </svg>
                      <span className='visually-hidden'>+</span>
                    </Button>
                  </div>
                  <Nav className='flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block' id='channels-box'>
                    {renderChannels()}
                  </Nav>
                </Col>
                <Col className='p-0 h-100'>
                  <div className='d-flex flex-column h-100'>
                    <div className='bg-light mb-4 p-3 shadow-sm small'>
                    <p className='m-0'><b># {currentChannel ? currentChannel.name : ''}</b></p>
                      <span className='text-muted'>{t('chatMainPage.messages.key', { count: messagesStore.length })}</span>
                    </div>
                    <div id='messages-box' className='chat-messages overflow-auto px-5 '>
                      <MessageList messages={messagesStore} currentChannel={currentChannel} />
                    </div>
                    <div className='mt-auto px-5 py-3'>
                      <MessageForm handleSubmit={handleSubmit} currentChannel={currentChannel}/>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </div>
      <AddChannel show={showModal} setShowModal={setShowModal} handleSubmitModal={handleAddChannel} handleClose={handleCloseModal} />
    </div>
  );
};

export default MainPage;
