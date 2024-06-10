import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import filter from 'leo-profanity';
import { setCurrentChannel, selectCurrentChannel } from '../Slice/channelsSlice';
import { addMessage } from '../Slice/messagesSlice';
import { useEditChannelMutation, useRemoveChannelMutation, useGetMessagesQuery } from '../api/usersApi';
import { selectDefaultChannel } from '../Selectors/channelsSelectors';

const useChannelManagement = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const currentChannel = useSelector(selectCurrentChannel);
  const defaultChannel = useSelector(selectDefaultChannel);
  const [editChannel] = useEditChannelMutation();
  const [removeChannel] = useRemoveChannelMutation();
  const { refetch } = useGetMessagesQuery();
  const [showRenameModal, setShowRenameModal] = useState(false);
  const [selectedClickChannel, setSelectedClickChannel] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

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

  return {
    showRenameModal,
    setShowRenameModal,
    selectedClickChannel,
    showDeleteModal,
    setShowDeleteModal,
    handleChangeChannel,
    handleRenameChannel,
    handleRename,
    handleDeleteChannel,
    handleDelete,
  };
};

export default useChannelManagement;
