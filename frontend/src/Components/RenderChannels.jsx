import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Dropdown } from 'react-bootstrap';
import { useEditChannelMutation, useRemoveChannelMutation, useGetMessagesQuery } from '../api/usersApi';
import { selectChannels, selectCurrentChannel, setCurrentChannel } from '../Slice/channelsSlice';
import { setMessages } from '../Slice/messagesSlice';
import RenameChannelModal from './ModalWindows/RenameChannel';
import DeleteChannelModal from './ModalWindows/RemoveChannel';

const RenderChannels = () => {
  const channelsStore = useSelector(selectChannels);
  const currentChannel = useSelector(selectCurrentChannel);
  const dispatch = useDispatch();

  const [showRenameModal, setShowRenameModal] = useState(false);
  const [selectedRenameChannel, setSelectedRenameChannel] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [editChannel] = useEditChannelMutation();
  const [removeChannel] = useRemoveChannelMutation();
  const { data: allMessages, refetch } = useGetMessagesQuery();

  const handleChangeChannel = async (channel) => {
    if (channel.id !== currentChannel.id) {
      dispatch(setCurrentChannel(channel));
      await refetch();
      const channelMessages = allMessages.filter(message => message.channelId === channel.id);
      dispatch(setMessages(channelMessages));
    }
  };

  const handleRenameChannel = (channel) => {
    setSelectedRenameChannel(channel);
    setShowRenameModal(true);
  };

  const handleRename = (newName) => {
    const editedChannel = { name: newName };
    editChannel({ id: selectedRenameChannel.id, nameChannel: editedChannel });
  };

  const handleDeleteChannel = (channel) => {
    setSelectedRenameChannel(channel);
    setShowDeleteModal(true);
  };

  const handleDelete = () => {
    removeChannel(selectedRenameChannel.id);
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
        initialValues={{ name: selectedRenameChannel ? selectedRenameChannel.name : '' }}
      />
      <DeleteChannelModal
        show={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        handleDelete={handleDelete}
      />
    </>
  );
};

export default RenderChannels;
