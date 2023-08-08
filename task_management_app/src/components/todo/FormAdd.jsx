import React, { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack';

import { Label } from '@fluentui/react/lib/Label';
import { TextField } from '@fluentui/react/lib/TextField';
import { Toggle } from '@fluentui/react/lib/Toggle';
import { useId } from '@fluentui/react-hooks';

import { DefaultButton, PrimaryButton } from '@fluentui/react/lib/Button';

import api from '../../helper/api'

function FormAdd({onSuccess, saveClick, data}) {
    const textFieldId = useId('inputTitle');
    const descFieldId = useId('inputDesc');

    const [title, setTitle] = useState(data ? data.title : '');
    const [description, setDescription] = useState(data? data.description : '');
    const [done, setDone] = useState(data? data.done : false);
    const [titleError, setTitleError] = useState('');

    let form = {
        title : title,
        description: description,
        done: done
    }


    const validateTitle = () => {
        if (title.length === 0) {
          setTitleError('Title must be required.');
          return false;
        }
        setTitleError('');
        return true;
      };
    
      const handleTitleChange = (event, newValue) => {
        setTitle(newValue);
        if (titleError) {
          validateTitle();
        }
      };

      const handleDescChange = (event, newValue) => {
        setDescription(newValue);
      };

      function _onChange(ev,checked) {
        setDone(checked);
      }

      const reset = () => {
        setTitle('');
        setDescription('');
        setTitleError('');
      };

    async function saveTask() {
        if (validateTitle()) {

            let url = data && data.id ? `/update/${data.id}` : '/add'

            if (data && data.id) {
                form.id = data.id
            }
            
            await api({
                url: url,
                data: form,
                method: data && data.id ? "put" : "post"
            })
            .then(response => {
               reset();
               saveClick();
               onSuccess();
            })
            .catch(error => {
                console.log(error)
            })
          }
    }

    return (
      <Card style={{ width: '100%' }}>
        <Card.Body>
          <Card.Title>New Task</Card.Title>
          <Row>
            <Col md="auto">
            <form className="col-12 p-2" >
                <Label className='my-2' htmlFor={textFieldId}>Task Title</Label>
                <TextField required style={{ width: '550px' }} id={textFieldId} value={title}
                onChange={handleTitleChange}
                errorMessage={titleError} />
                <Label className='my-2' htmlFor={descFieldId}>Description (Optional)</Label>
                <TextField style={{ width: '550px' }} multiline autoAdjustHeight resizable={false} id={descFieldId} value={description}
                onChange={handleDescChange} />
                {   
                    data &&
                    <Toggle label="Status" defaultChecked={done} onText="Done" offText="Not Yet" onChange={_onChange} />
                }
                <Stack gap={2} className="col-md-5 mx-auto" style={{ marginTop: '24px' }}>
                    <PrimaryButton text={data && data.id ? "Edit":"Add"} allowDisabledFocus onClick={()=>saveTask()} />
                    <DefaultButton text="Cancel" onClick={()=>saveClick()}/>
                </Stack>
            </form>
          </Col>
        </Row>
        </Card.Body>
      </Card>
    );
  }
  
  export default FormAdd;