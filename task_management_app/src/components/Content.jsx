import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Todo from './todo/Todo';
import TodoList from './todo/TodoList';
import KanbanBoard from "./Kanbanboard";

import api from '../helper/api'

function Content() {
    const [items, setItems] = useState([]);
    const [showBtn, setShowBtn] = useState(true);
    const [dataEdit, setDataEdit] = useState(null)

    function _addClicked() {
        setShowBtn(!showBtn);
    }

  // Simulasi pengambilan data tugas dari API atau sumber data lainnya
  const fetchData = async (query = null) => {

        let payload = {
            url: "/get",
            method: "get"
        }
        
        if (query) {
            payload.params = {
                title : query
            }
        }

     // Simulasi get data tugas
        await api(payload)
        .then(response => {
        console.log(response);
        setItems(response.data.tasks);
        })
        .catch(error => {
            console.log(error)
        })
  
      
    };
      
    useEffect(() => {
        fetchData();
      }, []);
    
    function filterItems(text) {    
        fetchData(text); 
     } 
    
    function onEdit(data) {
        setShowBtn(false);
        setDataEdit(data)
     }

    return (
      <Container className='container-mod'>
        <Row className="justify-content-md-center">
          <Col className='content' md="auto">
            <Todo showBtn={showBtn} _addClicked={_addClicked} reload={fetchData} data={dataEdit}/>
          </Col>
        </Row>
        <Row>
          <Col className='content'>
            <TodoList items={items} onFilterItems={filterItems} reload={fetchData} onEdit={onEdit}/>
          </Col>
        </Row>
        <Row>
          <Col className='content'>
            <KanbanBoard/>
          </Col>
        </Row>
      </Container>
    );
  }
  
  export default Content;