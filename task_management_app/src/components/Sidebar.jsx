import { useState, useEffect } from 'react';
import { DefaultButton, mergeStyles } from '@fluentui/react';
import { DragDropContext } from "react-beautiful-dnd";

import Header from "./Header";
import Content from './Content';
import Footer from './Footer';
import ListMenu from "./ListMenu";

const menuItems = [
  {
    id: 1,
    title: 'Date Picker',
    value: null,
    icon: 'Calendar'
  },
  {
    id: 2,
    title: 'Text',
    value: null,
    icon: 'TextField'
  },
  {
    id: 3,
    title: 'Spin Number',
    value: null,
    icon: 'NumberField'
  },
  // ...Tambahkan item menu lainnya...
];

const Sidebar = () => {
  const [expanded, setExpanded] = useState(true);
  const [completed, setCompleted] = useState([]);
  const [incomplete, setIncomplete] = useState([]);

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  const sidebarStyles = mergeStyles({
    width: expanded ? '150px' : '80px',
    height: '100vh',
    backgroundColor: '#333',
    color: 'white',
    transition: 'width 0.3s ease-in-out',
    overflowX: 'hidden',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 1000,
  });

  const contentStyles = mergeStyles({
    marginLeft: expanded ? '150px' : '50px',
    padding: '16px',
    transition: 'margin 0.3s ease-in-out',
  });

  useEffect(() => {
    setCompleted([]);
    setIncomplete(menuItems);
  }, []);

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    console.log(draggableId);

    if (source.droppableId == destination.droppableId) return;

    //REMOVE FROM SOURCE ARRAY

    if (source.droppableId == 2) {
      setCompleted(removeItemById(draggableId, completed));
    } else {
      setIncomplete(removeItemById(draggableId, incomplete));
    }

    // GET ITEM

    const task = findItemById(draggableId, [...incomplete, ...completed]);

    //ADD ITEM
    if (destination.droppableId == 2) {
      setCompleted([{ ...task, completed: !task.completed }, ...completed]);
    } else {
      setIncomplete([{ ...task, completed: !task.completed }, ...incomplete]);
    }
  };

  function findItemById(id, array) {
    return array.find((item) => item.id == id);
  }

  function removeItemById(id, array) {
    return array.filter((item) => item.id != id);
  }

  return (
    <div>
      <DragDropContext onDragEnd={handleDragEnd}>
      <div className={sidebarStyles}>
        <DefaultButton
          onClick={toggleSidebar}
          iconProps={{ iconName: expanded ? 'ChevronLeft' : 'ChevronRight' }}
          styles={{
            root: {
              width: expanded ? '100%' : '80px',
              height: '50px',
              fontSize: '20px',
              backgroundColor: 'transparent',
              border: 'none',
              color: 'white'
            },
            rootHovered: {
              width: '100%'
            }
          }}
        />
        {expanded && (
        <ListMenu menuItems={incomplete} id={"1"}/>
        )}
      </div>
      <div className={contentStyles}>
      <Header/>
      <Content field={completed} id={"2"}/>
      <Footer className='footer'/>
      </div>
      </DragDropContext>
    </div>
  );
};

export default Sidebar;
