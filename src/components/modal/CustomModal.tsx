import { Modal } from 'antd'
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline'
import { ModalType } from './type'
import '../modal/CustomModal.scss'

export const CustomModal: React.FC<ModalType> = ({
  isModalOpen,
  handleCancelModal,
  selectedItem,
  handleEditModalText,
  handleEditModalDescription,
  handleDeleteImage,
  handleEditImage,
}) => {
  return (
    <Modal open={isModalOpen} onCancel={handleCancelModal}>
      <div>
        {selectedItem && (
          <>
            <p>ID: {selectedItem.id}</p>
            <p>
              Text:{' '}
              <input
                type='text'
                value={selectedItem.text}
                onChange={e => handleEditModalText(e.target.value)}
              />
              {!selectedItem.text && (
                <label className='label-text'>Give text name</label>
              )}
            </p>
            <p>
              Description:{' '}
              <textarea
                value={selectedItem.description}
                onChange={e => handleEditModalDescription(e.target.value)}
              />
              {!selectedItem.description && (
                <label className='label-description'>Give description</label>
              )}
            </p>
            <div>
              <div className='image-container'>
                <p>
                  Image:{' '}
                  <img
                    src={
                      typeof selectedItem.image === 'string'
                        ? selectedItem.image
                        : undefined
                    }
                    alt='Selected'
                  />
                </p>
                <button onClick={handleDeleteImage} className='delete-button'>
                  Delete Image
                </button>
              </div>
              <input
                className='image-input'
                type='file'
                accept='image/*'
                id='fileInput'
                onChange={e => handleEditImage(e.target.files?.[0] ?? null)}
              />
            </div>
            <label className='download-icon' htmlFor='fileInput'>
              <DownloadForOfflineIcon />
            </label>
          </>
        )}
      </div>
    </Modal>
  )
}
