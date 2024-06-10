import { useState, useEffect } from 'react';
import {
  Button, Container, Row, Nav, Col,
} from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import filter from 'leo-profanity';
import { useDispatch, useSelector } from 'react-redux';
import {
  useGetChannelsQuery, useAddChannelMutation, useGetMessagesQuery,
} from '../../api/usersApi';
import {
  setChannels, setCurrentChannel, selectCurrentChannel,
} from '../../Slice/channelsSlice';
import AddChannel from '../ModalWindows/AddChannel';
import { addMessage, selectMessages } from '../../Slice/messagesSlice';

import MessageForm from '../MessageForm';
import MessageList from '../MessageList';
import { selectDefaultChannel } from '../../Selectors/channelsSelectors';
import HeaderNavbar from '../HeaderNavbar';
import RenderChannels from '../RenderChannels';

const MainPage = () => {
  const dispatch = useDispatch();
  const currentChannel = useSelector(selectCurrentChannel);
  const [showModal, setShowModal] = useState(false);
  const messagesStore = useSelector(selectMessages);
  const { t } = useTranslation();
  const defaultChannel = useSelector(selectDefaultChannel);
  const { data: channels } = useGetChannelsQuery();
  const [addChannel] = useAddChannelMutation();
  const { data: allMessages } = useGetMessagesQuery();

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

  return (
    <div className="h-100 bg-light">
      <div className="h-100">
        <div className="h-100" id="chat">
          <div className="d-flex flex-column h-100">
            <HeaderNavbar
              showExitButton={true}
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
                    <RenderChannels />
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
