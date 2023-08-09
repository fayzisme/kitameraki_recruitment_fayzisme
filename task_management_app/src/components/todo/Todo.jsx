import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { initializeIcons } from '@fluentui/react';
import { PrimaryButton } from '@fluentui/react/lib/Button';
import FormAdd from './FormAdd';

initializeIcons();

const Todo = ({field, id, reload, showBtn, _addClicked, data}) => {
    console.log(field);
 return (
   <div>
    <Container>
        {/* {showBtn ? 
        <Row>
          <Col className='text-end'>
          <PrimaryButton text="Add New Task" onClick={_addClicked} allowDisabledFocus iconProps={addIcon} />
          </Col>
        </Row> :
        <FormAdd field={field} id={id} onSuccess={reload} saveClick={_addClicked} data={data}/>

        } */}
        <FormAdd field={field} id={id} onSuccess={reload} saveClick={_addClicked} data={data}/>
      </Container>
   </div>
 )
}
 
export default Todo