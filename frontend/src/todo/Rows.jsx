import React from 'react';
import IconButton from "../template/IconButton";

const Rows = (props) => {
 return (
   props.list.map(todo => {
     return(  
       <tr key={todo._id} >
           <td className={todo.done ? 'markedAsDone' : ''} >{todo.description}</td>
           <td>
               <IconButton color='success' icon='check' hide={todo.done}
                    onClick={() => props.handleMarkAsDone(todo)} />
                    
               <IconButton color='warning' icon='undo' hide={!todo.done}
                   onClick={() => props.handleMarkAsPending(todo)} />

               <IconButton color='danger' icon='trash-o' hide={!todo.done}
                   onClick={() => props.handleRemove(todo)} />
           </td>
       </tr>
     )
   })
 )
};

export default Rows;