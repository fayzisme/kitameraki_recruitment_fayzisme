import React from 'react';
import { List } from '@fluentui/react/lib/List';
import { Icon, initializeIcons } from '@fluentui/react';

import styled from "styled-components";
import { Droppable, Draggable } from "react-beautiful-dnd";

const TaskList = styled.div`
  margin: 5px;
  padding: 3px;
  transistion: background-color 0.2s ease;
  background-color: inherit;
  min-height: 300px;
`;

const Container = styled.div`
  border-radius: 10px;
  box-shadow: 5px 5px 5px 2px grey;
  padding: 8px;
  color: #000;
  margin-bottom: 8px;
  min-height: 90px;
  max-width: 140px;
  margin-left: 10px;
  margin-right: 10px;
  background-color: ${(props) => bgcolorChange(props)};
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  text-align: center;
`;

initializeIcons(); // Inisialisasi ikon untuk digunakan

function bgcolorChange(props) {
    return props.isDragging
      ? "lightgreen"
      : props.isDraggable
      ? props.isBacklog
        ? "#F2D7D5"
        : "#DCDCDC"
      : props.isBacklog
      ? "#F2D7D5"
      : "white";
  }

const renderDocumentCard = (item, index) => {
  return (
    <Draggable draggableId={`${item.id}`} key={item.id} index={index}>
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Icon iconName={item.icon} style={{ fontSize: 32, marginBottom: 8 }} />
          <div>{item.title}</div>
        </Container>
      )}
      
    </Draggable>
    
  );
};

const MenuList = ({menuItems, id}) => {
  return (
    <Droppable droppableId={id}>
        {(provided, snapshot) => (
            <>
            <div style={{ width: '100%', textAlign: 'center' }}>Item Field</div>
            <TaskList
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={{ border : snapshot.isDraggingOver ? '2px dashed white' : (menuItems.length < 1 ? '1px dotted white' : 'none'), display: menuItems.length < 1 ? 'flex' : 'block', alignItems: menuItems.length < 1 ? 'center' : 'normal' }}
            >
                {menuItems.length < 1 && !snapshot.isDraggingOver ? 
                    <div style={{ width: '100%', textAlign:'center', paddingTop: '10px' }}>
                    <Icon iconName="Add" style={{ fontSize: 12}} />
                        <div style={{ fontSize: 10 }}>
                        Drag & Drop here
                        </div>
                    </div> 
                  :
                  <List items={menuItems} onRenderCell={renderDocumentCard} />
                }
                {provided.placeholder}
            </TaskList>
            </>
        )}
      </Droppable>
    
  );
};

export default MenuList;
