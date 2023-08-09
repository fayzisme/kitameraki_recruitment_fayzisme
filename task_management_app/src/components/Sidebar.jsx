import { DefaultButton, Icon, mergeStyles } from '@fluentui/react/lib';

import { useState } from 'react';
import { DefaultButton, Icon, mergeStyles } from '@fluentui/react/lib';

const Sidebar = () => {
  const [expanded, setExpanded] = useState(true);

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  const sidebarStyles = mergeStyles({
    width: expanded ? '250px' : '50px',
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
    marginLeft: expanded ? '250px' : '50px',
    padding: '16px',
    transition: 'margin 0.3s ease-in-out',
  });

  return (
    <div>
      <div className={sidebarStyles}>
        <DefaultButton
          onClick={toggleSidebar}
          iconProps={{ iconName: expanded ? 'ChevronLeft' : 'ChevronRight' }}
          styles={{
            root: {
              width: '50px',
              height: '50px',
              fontSize: '20px',
              backgroundColor: 'transparent',
              border: 'none',
              color: 'white',
            },
          }}
        />
        {expanded && (
          <ul>
            <li>Menu Item 1</li>
            <li>Menu Item 2</li>
            <li>Menu Item 3</li>
          </ul>
        )}
      </div>
      <div className={contentStyles}>
        <h1>Content Area</h1>
      </div>
    </div>
  );
};

export default Sidebar;
