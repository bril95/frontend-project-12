import { useSelector } from 'react-redux';
import { Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import RenameChannelModal from './ModalWindows/RenameChannel';
import DeleteChannelModal from './ModalWindows/RemoveChannel';
import useChannelManagement from '../hooks/useChannelManagement';
import { selectChannels, selectCurrentChannel } from '../Slice/channelsSlice';

const RenderChannels = () => {
  const {
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
  } = useChannelManagement();
  const channelsStore = useSelector(selectChannels);
  const { t } = useTranslation();
  const currentChannel = useSelector(selectCurrentChannel);

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
export default RenderChannels;