import { useState, useEffect } from 'react';
import {
  Button, Container, Row,
  Nav, Dropdown, Col,
} from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import filter from 'leo-profanity';
import { useDispatch, useSelector } from 'react-redux';
import {
  useGetChannelsQuery, useAddChannelMutation,
  useGetMessagesQuery, useEditChannelMutation, useRemoveChannelMutation,
} from '../api/usersApi';
import {
  setChannels, selectChannels,
  setCurrentChannel, selectCurrentChannel,
} from '../Slice/channelsSlice';
import AddChannel from './ModalWindows/AddChannel';
import { addMessage, selectMessages } from '../Slice/messagesSlice';
import RenameChannelModal from './ModalWindows/RenameChannel';
import DeleteChannelModal from './ModalWindows/RemoveChannel';
import MessageForm from './MessageForm';
import MessageList from './MessageList';
import { selectDefaultChannel } from '../Selectors/channelsSelectors';
import HeadersPage from './HeadersPage';

const MainPage = () => {
  const dispatch = useDispatch();
  const channelsStore = useSelector(selectChannels);
  const currentChannel = useSelector(selectCurrentChannel);
  const [showModal, setShowModal] = useState(false);
  const messagesStore = useSelector(selectMessages);
  const { t } = useTranslation();
  const defaultChannel = useSelector(selectDefaultChannel);
  const { data: channels } = useGetChannelsQuery();
  const [addChannel] = useAddChannelMutation();
  const { data: allMessages, refetch } = useGetMessagesQuery();
  const [editChannel] = useEditChannelMutation();
  const [removeChannel] = useRemoveChannelMutation();

  useEffect(() => {
    try {
      if (channels) {
        dispatch(setCurrentChannel(defaultChannel));
        dispatch(setChannels(channels));
      }
    } catch (error) {
      toast.error(t('chatMainPage.toastError'));
      console.error(error);
    }
  }, [channels, dispatch, t, defaultChannel]);

  useEffect(() => {
    if (allMessages && currentChannel) {
      const channelMessages = allMessages.filter(
        (message) => message.channelId === currentChannel.id,
      );
      dispatch(addMessage(channelMessages));
    }
  }, [allMessages, currentChannel, dispatch]);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleAddChannel = async (event) => {
    const newChannel = { name: filter.clean(event.channelName) };
    try {
      const { data: createdChannel } = await addChannel(newChannel);
      dispatch(setCurrentChannel(createdChannel));
      toast.success(t('modalWindows.addChannel.toastAddName'));
      setShowModal(false);
    } catch (error) {
      toast.error(t('modalWindows.addChannel.toastErrorAddName'));
    }
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
      const editedChannel = { name: filter.clean(newName) };
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
      try {
        removeChannel(selectedClickChannel.id);
        if (currentChannel && currentChannel.id === selectedClickChannel.id) {
          dispatch(setCurrentChannel(defaultChannel));
          const { data: updatedMessages } = await refetch();
          const channelMessages = updatedMessages.filter(
            (message) => message.channelId === defaultChannel.id,
          );
          dispatch(addMessage(channelMessages));
        }
        toast.success(t('modalWindows.deleteChannel.toastDeleteChannel'));
        setShowDeleteModal(false);
      } catch (error) {
        toast.error(t('modalWindows.deleteChannel.toastErrorAddName'));
        console.error(error);
      }
    };

    return (
      <>
        {channelsStore && channelsStore.length > 0 && channelsStore.map((channel) => (
          <div key={channel.id} className="d-flex dropdown btn-group">
            <button
              type="button"
              className={`w-100 rounded-0 text-start text-truncate btn ${currentChannel && currentChannel.id === channel.id ? 'btn-secondary' : ''}`}
              onClick={() => handleChangeChannel(channel)}
            >
              <span className="me-1">#</span>
              {channel.name}
            </button>
            {channel.removable && (
              <Dropdown>
                <Dropdown.Toggle
                  split
                  variant=""
                  className={`dropdown-toggle-split btn ${currentChannel && currentChannel.id === channel.id ? 'btn-secondary' : ''}`}
                  id={`dropdown-split-basic-${channel.id}`}
                  style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                >
                  <span className="visually-hidden">{t('modalWindows.channelManagment')}</span>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => handleDeleteChannel(channel)}>{t('modalWindows.deleteChannel.delete')}</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleRenameChannel(channel)}>{t('modalWindows.renameChannel.rename')}</Dropdown.Item>
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
  };

  return (
    <div className="h-100 bg-light">
      <div className="h-100">
        <div className="h-100" id="chat">
          <div className="d-flex flex-column h-100">
            <HeadersPage
              showExitButton={false}
            />
            <Container className="h-100 my-4 overflow-hidden rounded shadow">
              <Row className="h-100 bg-white flex-md-row">
                <Col xs={4} md={2} className="border-end px-0 bg-light flex-column h-100 d-flex">
                  <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
                    <b>{t('chatMainPage.channels')}</b>
                    <Button variant="primary" onClick={handleShowModal}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                        <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                      </svg>
                      <span className="visually-hidden">{t('chatMainPage.plus')}</span>
                    </Button>
                  </div>
                  <Nav className="flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block" id="channels-box">
                    {renderChannels()}
                  </Nav>
                </Col>
                <Col className="p-0 h-100">
                  <div className="d-flex flex-column h-100">
                    <div className="bg-light mb-4 p-3 shadow-sm small">
                      <p className="m-0">
                        <b>
                          {currentChannel ? `# ${currentChannel.name}` : ''}
                        </b>
                      </p>
                      <span className="text-muted">{t('chatMainPage.messages.key', { count: messagesStore.length })}</span>
                    </div>
                    <div id="messages-box" className="chat-messages overflow-auto px-5">
                      <MessageList messages={messagesStore} currentChannel={currentChannel} />
                    </div>
                    <div className="mt-auto px-5 py-3">
                      <MessageForm currentChannel={currentChannel} />
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </div>
      <AddChannel
        show={showModal}
        setShowModal={setShowModal}
        handleSubmitModal={handleAddChannel}
        handleClose={handleCloseModal}
      />
    </div>
  );
};

export default MainPage;
