import React, { Component } from 'react';
import axios from 'axios';

import PageHeader from '../template/PageHeader';
import TodoForm from '../todo/TodoForm';
import TodoList from '../todo/TodoList'

const sort = (a,b) => a.description.localeCompare(b.description);

export default class Todo extends Component {

    constructor(props) {
        super(props)

        this.refresh();
    }

    state = {
        description: '', list: [],
    }
    
    refresh = (description = '')=> {
        const search = description ? `&description__regex=/${description}/` : '';
        axios.get(`${process.env.REACT_APP_BASE_URL}?sort=createdAt${search}`).then(response => {
            this.setState({...this.state, description, list: response.data.sort(sort) });
        })
    };

    handleAdd = ()=> {
        const description = this.state.description;
        axios.post(process.env.REACT_APP_BASE_URL, { description }).then(response => {
            this.refresh();
        });

    }

    handleChange = event => {
        const description = event.target.value;
        this.setState({...this.state, description})
    }

    handleRemove = todo => {
        axios.delete(`${process.env.REACT_APP_BASE_URL}/${todo._id}`)
             .then(() => {
                 this.refresh(this.state.description);
             })   
    }

    handleMarkAsDone = todo => {
        axios.put(`${process.env.REACT_APP_BASE_URL}/${todo._id}`, {...todo, done : true} )
              .then( ()=> {
                  this.refresh(this.state.description);
              })
    }

    handleMarkAsPending = todo => {
        axios.put(`${process.env.REACT_APP_BASE_URL}/${todo._id}`, {...todo, done : false} )
        .then( ()=> {
            this.refresh(this.state.description);
        }) 
    }

    handleSearch = () => {
        this.refresh(this.state.description);
    }

    handleClear = () => {
        this.refresh();
    }

    render() {
        return (
            <div>
                <PageHeader name='Tarefas' small='Cadastro' />
                <TodoForm 
                    description={this.state.description}
                    handleAdd={this.handleAdd}
                    handleChange={this.handleChange}
                    handleSearch = {this.handleSearch}
                    handleClear = {this.handleClear}
                  />
                <TodoList 
                    list={this.state.list} 
                    handleMarkAsPending = {this.handleMarkAsPending}
                    handleMarkAsDone = {this.handleMarkAsDone}                            
                    handleRemove ={this.handleRemove}
                 />
            </div>
        );
    }
}
