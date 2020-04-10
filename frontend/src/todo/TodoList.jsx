import React from 'react';
import Rows from "./Rows";
import '../todo/TodoList.css'

const TodoList = (props) => {
    return (
        <table className="table" >
            <thead>
                <tr>
                    <th> Descrição </th>
                    <th className="tableActions" > Ações </th>
                </tr>
            </thead>
            <tbody>
               <Rows list={props.list} 
                     handleMarkAsDone = {props.handleMarkAsDone}
                     handleMarkAsPending = {props.handleMarkAsPending}
                     handleRemove = {props.handleRemove} />
            </tbody>

        </table>
    )
};

export default TodoList;