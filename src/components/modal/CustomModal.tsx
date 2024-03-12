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
      <div className='modal'>
        {selectedItem && (
          <>
            <p>
              Text:{' '}
              <input
                type='text'
                value={selectedItem.text}
                onChange={e => handleEditModalText(e.target.value)}
              />
            </p>
            <p>
              Description:{' '}
              <textarea
                className='textarea'
                value={selectedItem.description}
                onChange={e => handleEditModalDescription(e.target.value)}
              />
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
                  />
                </p>
              </div>
              {/* <input
                className='image-input'
                type='file'
                accept='image/*'
                id='fileInput'
                onChange={e => handleEditImage(e.target.files?.[0] ?? null)}
              /> */}
              <input
                className='image-input'
                type='file'
                accept='image/*'
                id='fileInput'
                onChange={e => {
                  const file = e.target.files?.[0]
                  if (file) {
                    const imageUrl = URL.createObjectURL(file)
                    handleEditImage(imageUrl)
                  } else {
                    handleEditImage(null)
                  }
                }}
              />
            </div>
            <label className='download-icon' htmlFor='fileInput'>
              <img src='https://cdn-icons-png.flaticon.com/512/1092/1092004.png' />
            </label>
            <button onClick={handleDeleteImage} className='delete-button'>
              Delete Image
            </button>
          </>
        )}
      </div>
    </Modal>
  )
}
