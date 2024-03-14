import { Avatar, Button, Image, Input, Table } from 'antd'
import { ModalType } from './type'
import '../modal/CustomModal.scss'
import TextArea from 'antd/es/input/TextArea'
import { Member } from '../../container/types'
import { existingMembers } from '../../container/ColumnLayoutContainer'
import { Box, Grid, Modal, Typography } from '@mui/material'
import { useState } from 'react'
// import Modal from 'react-bootstrap/Modal'

export const CustomModal: React.FC<ModalType> = ({
  isModalOpen,
  handleCancelModal,
  selectedItem,
  handleEditModalText,
  handleEditModalDescription,
  handleDeleteImage,
  handleEditImage,
  handleShowMembersTable,
  showMembersTable,
  selectedMembers,
  handleCloseMembersTable,
  handleMemberSelection,
}) => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: Member) => (
        <Button onClick={() => handleMemberSelection(record.name)}>
          <Avatar
            style={{
              backgroundColor: '#87d068',
              verticalAlign: 'middle',
              marginRight: '5px',
            }}
            size='small'
          >
            {text[0].toUpperCase()}
          </Avatar>
          {text}
        </Button>
      ),
    },
  ]
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  }

  return (
    // <Modal
    //   open={isModalOpen}
    //   onClose={handleCancelModal}
    //   style={{ width: '400px', height: '400px' }}
    // >
    //   <div className='modal'>
    //     {selectedItem && (
    //       <div>
    //         <p>
    //           Text:{' '}
    //           <Input
    //             className='member'
    //             type='text'
    //             value={selectedItem.text}
    //             onChange={e => handleEditModalText(e.target.value)}
    //           />
    //         </p>
    //         <p>
    //           Description:{' '}
    //           <TextArea
    //             className='textarea'
    //             value={selectedItem.description}
    //             onChange={e => handleEditModalDescription(e.target.value)}
    //           />
    //         </p>

    //         <div>
    //           <div className='image-container'>
    //             Image: <Image src={selectedItem.image as string | undefined} />
    //           </div>
    //           <Input
    //             className='image-input'
    //             type='file'
    //             accept='image/*'
    //             id='fileInput'
    //             onChange={e => {
    //               const file = e.target.files?.[0]
    //               if (file) {
    //                 const imageUrl = URL.createObjectURL(file)
    //                 handleEditImage(imageUrl)
    //               } else {
    //                 handleEditImage(null)
    //               }
    //             }}
    //           />
    //         </div>
    //         <label className='download-icon' htmlFor='fileInput'>
    //           <img src='https://cdn-icons-png.flaticon.com/512/1092/1092004.png' />
    //         </label>
    //         <button onClick={handleDeleteImage} className='delete-button'>
    //           Delete Image
    //         </button>
    //         <Button className='member' onClick={handleShowMembersTable}>
    //           Members
    //         </Button>
    //         {selectedMembers.map((name, index) => (
    //           <Avatar
    //             key={index}
    //             style={{
    //               backgroundColor: '#87d068',
    //               verticalAlign: 'middle',
    //               marginRight: '5px',
    //             }}
    //             size='small'
    //           >
    //             {name[0].toUpperCase()}
    //           </Avatar>
    //         ))}
    //       </div>
    //     )}
    //   </div>
    //   {/* <ChildModal
    //     open={showMembersTable}
    //     onClose={handleCloseMembersTable}
    //     title='Existing Members'
    //     footer={null}
    //   >
    //     <Table
    //       dataSource={existingMembers.map((member, index) => ({
    //         ...member,
    //         key: index,
    //       }))}
    //       columns={columns}
    //     />
    //   </ChildModal> */}
    // </Modal>
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        keepMounted
        open={isModalOpen}
        onClose={handleCancelModal}
        aria-labelledby='keep-mounted-modal-title'
        aria-describedby='keep-mounted-modal-description'
      >
        <Box sx={style}></Box>
      </Modal>
    </div>
  )
}
