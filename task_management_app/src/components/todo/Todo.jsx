import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { initializeIcons } from '@fluentui/react';
import { PrimaryButton } from '@fluentui/react/lib/Button';
import FormAdd from './FormAdd';
import { useState } from 'react';

initializeIcons();

const addIcon = { iconName: 'Add' };

const Todo = ({reload, showBtn, _addClicked, data}) => {
    
 return (
   <div>
    <Container>
        {showBtn ? 
        <Row>
          <Col className='text-end'>
          <PrimaryButton text="Add New Task" onClick={_addClicked} allowDisabledFocus iconProps={addIcon} />
          </Col>
        </Row> :
        <FormAdd onSuccess={reload} saveClick={_addClicked} data={data}/>

        }
      </Container>
   </div>
 )
}
 
export default Todo