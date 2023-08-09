import React, { useState, useEffect} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack';

import { Label } from '@fluentui/react/lib/Label';
import { TextField } from '@fluentui/react/lib/TextField';
import { Toggle } from '@fluentui/react/lib/Toggle';
import { useId } from '@fluentui/react-hooks';

import { DatePicker, DayOfWeek,SpinButton, mergeStyles } from '@fluentui/react';

import styled from "styled-components";

import { DefaultButton, PrimaryButton } from '@fluentui/react/lib/Button';
import { Icon, initializeIcons } from '@fluentui/react';

import "../scroll.css";
import { Droppable,  Draggable } from "react-beautiful-dnd";

import api from '../../helper/api'

initializeIcons();

const TaskList = styled.div`
  padding: 5px 5px 25px 5px;
  transistion: background-color 0.2s ease;
  background-color: inherit;
  flex-grow: 1;
  min-height: 80px;
  margin-top: 10px;
`;

const controlClass = mergeStyles({
  display: 'block',
  margin: '10px 0',
});

function FormAdd({field, id, onSuccess, saveClick, data}) {
    const textFieldId = useId('inputTitle');
    const descFieldId = useId('inputDesc');

    const [title, setTitle] = useState(data ? data.title : '');
    const [description, setDescription] = useState(data? data.description : '');
    const [done, setDone] = useState(data? data.done : false);
    const [titleError, setTitleError] = useState('');

    // Optional Field
    const [selectedDate, setSelectedDate] = useState(data ? new Date(data.date) : null);
    const [text, setText] = useState(data ? data.text : '');
    const [value, setValue] = useState(data ? data.number : '0');
    const [form, setForm] = useState({
      title : title,
      description: description,
      done: done
    })
    const [textBtn, setTextBtn] = useState(data && data.id ? 'Edit' : 'Add');
    const [showToggle, setShowToggle] = useState(data ? true : false);

    useEffect(() => {
      setTitle(data ? data.title : '')
      setDescription(data ? data.description : '')
      setDone(data && data.done ? data.done : false)
      setSelectedDate(data && data.date ? new Date(data.date) : null)
      setText(data && data.text ? data.text : '')
      setTextBtn(data ? 'Edit' : 'Add')
      setValue(data && data.number ? data.number : '0')
      setShowToggle(data ? true : false);
      console.log('masuk');
    }, [data]);

    const handleValueChange = (newValue) => {
      setValue(newValue);
    };

    const handleDateChange = (date) => {
      setSelectedDate(date);
    };


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

      const handleTextChange = (event, newValue) => {
        setText(newValue);
      };

      function _onChange(ev,checked) {
        setDone(checked);
      }

      const reset = () => {
        setTitle('');
        setDescription('');
        setTitleError('');
        setDescription('');
        setDone(false);
        setSelectedDate(null)
        setText('');
        setValue('0');
        setTextBtn('Add')
        setShowToggle(false)
      };

    async function saveTask() {
        if (validateTitle()) {

            let url = data && data.id && showToggle ? `/update/${data.id}` : '/add'
            let newForm = {...form}

            newForm.title = title
            newForm.description = description
            newForm.done = done

            if (data && data.id && showToggle) {
                newForm.id = data.id
            }

            if (selectedDate) {
              newForm.date = selectedDate
            }

            if (text) {
              newForm.text = text
            }

            if (value && value != '0') {
              newForm.number= value
            }

            setForm(newForm);
            
            await api({
                url: url,
                data: newForm,
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
                    showToggle &&
                    <Toggle label="Status" defaultChecked={done} onText="Done" offText="Not Yet" onChange={_onChange} />
                }
                <Droppable droppableId={id}>
                {(provided, snapshot) => (
                  <TaskList
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    style={{ border : snapshot.isDraggingOver ? '2px dashed blue' : '1px dotted gray' }}
                  >
                    {field.length === 0 && !snapshot.isDraggingOver &&
                      <div style={{ width: '100%', textAlign:'center', paddingTop: '10px' }}>
                        <Icon iconName="Add" style={{ fontSize: 12}} />
                        <div>
                          Drag & Drop item field here
                        </div>
                      </div>
                    }
                    {field.map((el, index) => (
                      <>
                        <Draggable draggableId={`${el.id}`} key={el.id} index={index}>
                          {(pd, snap) => (
                            <div {...pd.draggableProps}
                            {...pd.dragHandleProps}
                            ref={pd.innerRef}>
                              {el.id == '1' && 
                                <DatePicker
                                  label={el.title}
                                  allowTextInput={true}
                                  formatDate={(date) => (date ? date.toLocaleDateString() : '')}
                                  firstDayOfWeek={DayOfWeek.Sunday}
                                  value={selectedDate}
                                  onSelectDate={handleDateChange}
                                  className={controlClass}
                                />
                              }
                              {
                                el.id == '2' && (
                                  <>
                                  <Label className='my-2' htmlFor={el.id}>{el.title}</Label>
                                  <TextField style={{ width: '550px' }} multiline autoAdjustHeight resizable={false} id={el.id} value={text}
                                    onChange={handleTextChange}/>
                                  </>
                                )
                              }
                              {
                                el.id == '3' && (
                                  <>
                                  <SpinButton
                                    label="Enter a number"
                                    value={value}
                                    min={0}
                                    max={100}
                                    step={1}
                                    incrementButtonAriaLabel="Increase value"
                                    decrementButtonAriaLabel="Decrease value"
                                    onIncrement={() => handleValueChange((parseInt(value, 10) || 0) + 1)}
                                    onDecrement={() => handleValueChange((parseInt(value, 10) || 0) - 1)}
                                    className={controlClass}
                                  />
                                  </>
                                )
                              }
                              {provided.placeholder}
                            </div>
                          )}
                        </Draggable>
                      </>
                    ))}
                    {provided.placeholder}
                  </TaskList>
                )}
              </Droppable>
                <Stack gap={2} className="col-md-5 mx-auto" style={{ marginTop: '24px' }}>
                    <PrimaryButton text={textBtn} allowDisabledFocus onClick={()=>saveTask()} />
                    <DefaultButton text="Cancel" onClick={()=>reset()}/>
                </Stack>
            </form>
          </Col>
        </Row>
        </Card.Body>
      </Card>
    );
  }
  
  export default FormAdd;