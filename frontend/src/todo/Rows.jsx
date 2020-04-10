import React from 'react';
import IconButton from "../template/IconButton";

const Rows = (props) => {
 return (
   props.list.map(todo => {
     return(  
       <tr key={todo._id} >
           <td className={todo.done ? 'markedAsDone' : ''} >{todo.description}</td>
           <td>
               <IconButton style='success' icon='check' hide={todo.done}
                    onClick={() => props.handleMarkAsDone(todo)} />
                    
               <IconButton style='warning' icon='undo' hide={!todo.done}
                   onClick={() => props.handleMarkAsPending(todo)} />

               <IconButton style='danger' icon='trash-o' hide={!todo.done}
                   onClick={() => props.handleRemove(todo)} />
           </td>
       </tr>
     )
   })
 )
};

export default Rows;