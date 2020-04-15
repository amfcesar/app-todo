import React, { useState, useEffect } from 'react';
import axios from 'axios';

import PageHeader from '../template/PageHeader';
import TodoForm from '../todo/TodoForm';
import TodoList from '../todo/TodoList'

const sort = (a,b) => a.description.localeCompare(b.description);

const Todo = () => {

    const [description, setDescription] = useState();
    const [list, setList] = useState([]);

    useEffect(()=>{
        refresh();
    }, []);


    function refresh(description = '') {
        const search = description ? `&description__regex=/${description}/` : '';
        axios.get(`${process.env.REACT_APP_BASE_URL}?sort=createdAt${search}`).then(response => {
           setDescription(description)
           setList(response.data.sort(sort));
        })
    };

    function handleAdd() {
        axios.post(process.env.REACT_APP_BASE_URL, { description });
        setDescription('');
        setList([...list, {description, done: false} ].sort(sort));
    }

    function handleChange(event) {
        const description = event.target.value;
        setDescription(description);
    }

    function handleRemove(todo){
        axios.delete(`${process.env.REACT_APP_BASE_URL}/${todo._id}`)
             .then(() => refresh(description)); 
    }

    function handleMarkAsDone(todo) {
        if(!todo._id) refresh();
        
        axios.put(`${process.env.REACT_APP_BASE_URL}/${todo._id}`, {...todo, done : true} )
              .then( ()=> refresh(description));
    }

   function handleMarkAsPending(todo){
        axios.put(`${process.env.REACT_APP_BASE_URL}/${todo._id}`, {...todo, done : false} )
        .then( ()=> refresh(description)); 
    }

    function handleSearch() {
        refresh(description);
    }

    function handleClear() {
        refresh();
    }

    return (
        <div>
            <PageHeader name='Tarefas' small='Cadastro' />
            <TodoForm 
                description={description}
                handleAdd={handleAdd}
                handleChange={handleChange}
                handleSearch = {handleSearch}
                handleClear = {handleClear}
              />
            <TodoList 
                list={list} 
                handleMarkAsPending = {handleMarkAsPending}
                handleMarkAsDone = {handleMarkAsDone}                            
                handleRemove ={handleRemove}
             />
        </div>
    );
};

export default Todo;