import React, { useState } from 'react'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import { Avatar, Input } from 'antd'
import '../../src/components/ColumnLayout.scss'
import { CustomModal } from './modal/CustomModal'
import { IColumnLayoutProps } from './types'

export const ColumnLayout: React.FC<IColumnLayoutProps> = ({
  selectorState,
  droppableId,
  isModalOpen,
  handleCancelModal,
  isAddingCard,
  handleAddCard,
  handleOpenModal,
  handleCancel,
  handleEditModalText,
  handleEditModalDescription,
  handleEditImage,
  handleDeleteImage,
  handleSubmitCard,
  selectedItem,
  setNewCardTitle,
  handleDeleteItem,
  handleShowMembersTable,
  showMembersTable,
  selectedMembers,
  handleCloseMembersTable,
  handleMemberSelection,
}) => {
  return (
    <>
      <Box className='custom-box'>
        <Droppable droppableId={droppableId}>
          {provided => (
            <List
              className='list'
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {selectorState.map(
                ({ id, text, description, image }, index: number) => (
                  <Draggable key={id} draggableId={id} index={index}>
                    {(provided, snapshot) => (
                      <>
                        <ListItem
                          onClick={() =>
                            handleOpenModal(id, text, description, image)
                          }
                          className={`list-item ${
                            snapshot.isDragging ? 'dragging' : ''
                          }`}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <ListItemText className='list-item-text'>
                            <Box component='span' className='text'>
                              {text}
                            </Box>
                            <Box component='span' className='icon-button'>
                              <IconButton
                                onClick={event => handleDeleteItem(id, event)}
                              >
                                <DeleteIcon className='delete-icon' />
                              </IconButton>
                            </Box>
                            {selectedItem &&
                              selectedItem.id === id &&
                              selectedMembers.map((name, index) => (
                                <Avatar
                                  key={index}
                                  style={{
                                    verticalAlign: 'middle',
                                    marginRight: '5px',
                                  }}
                                  size='small'
                                >
                                  {name[0].toUpperCase()}
                                </Avatar>
                              ))}
                          </ListItemText>
                        </ListItem>

                        <CustomModal
                          isModalOpen={isModalOpen}
                          handleCancelModal={handleCancelModal}
                          selectedItem={selectedItem}
                          handleEditModalText={handleEditModalText}
                          handleEditModalDescription={
                            handleEditModalDescription
                          }
                          handleDeleteImage={handleDeleteImage}
                          handleEditImage={handleEditImage}
                          handleShowMembersTable={handleShowMembersTable}
                          showMembersTable={showMembersTable}
                          selectedMembers={selectedMembers}
                          handleCloseMembersTable={handleCloseMembersTable}
                          handleMemberSelection={handleMemberSelection}
                        />
                      </>
                    )}
                  </Draggable>
                ),
              )}
              {provided.placeholder}
            </List>
          )}
        </Droppable>
      </Box>
      {isAddingCard ? (
        <div style={{ padding: '8px' }}>
          <Input
            placeholder='Enter a title for this card...'
            onChange={e => setNewCardTitle(e.target.value)}
            onPressEnter={handleAddCard}
          />
          <Button onClick={handleSubmitCard}>Add card</Button>
          <Button onClick={handleCancel}>x</Button>
        </div>
      ) : (
        <div className='main__addCard' onClick={handleAddCard}>
          + Add a card
        </div>
      )}
    </>
  )
}
