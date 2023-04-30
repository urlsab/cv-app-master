
import React, { useState } from "react";
import './Todo.css';

const Todo = () => {

  const [display, setDisplay] = useState('notdisplayed');
  const [inputList, setInputList] = useState([{ firstName: '' }]);

  const showButton = (e) => {
    e.preventDefault();
    setDisplay('displayed');
  };

  const hideButton = (e) => {
    e.preventDefault();

    
      setDisplay('notdisplayed')
    

    // setDisplay('notdisplayed')
    //}, 1000);

  };

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { firstName: '' }]);
  };

  return (
    <div>
      {inputList.map((x, i) => {
        return (
          <div className="box" onMouseEnter={e => showButton(e)}
          onMouseLeave={e => hideButton(e)}>
            <input
            
            
              name="firstName"
              placeholder=" "
              
              value={x.firstName}
              onChange={(e) => handleInputChange(e, i)}
            />
            <div  className="btn-box">
              {inputList.length !== 1 && (
                <button className={display} onClick={() => handleRemoveClick(i)}>
                  Remove
                </button>
              )}
              {inputList.length - 1 === i && (
                <button className={display} onClick={handleAddClick}>Add</button>
              )}
            </div>
          </div>
        );
      })}
      
    </div>
  );
}

// export default AddRemoveInputField

// import './Todo.css'

// import { Button, Card, Form } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';

// import { useState } from "react";


// const Todo = ({ todo, index, markTodo, removeTodo, addTodo }) => {

//   const obj = [{text: "This is a sampe todo",isDone: false}];

//   const [value, setValue] = useState("");
//   const [todos, setTodos] = useState(obj)
    

//   const handleSubmit = e => {
//     e.preventDefault();
//     if (!value) return;
//     addTodo(value);
//     setValue("");
//   };

//   const handleAddTodo = text => {
//     const newTodos = [...todos, { text }];
//     setTodos(newTodos);
//   };

//   const handleMarkTodo = index => {
//     const newTodos = [...todos];
//     newTodos[index].isDone= true;
//     setTodos(newTodos);
//   };

//   const handleRemoveTodo = index => {
//     const newTodos = [...todos];
//     newTodos.splice(index, 1);
//     setTodos(newTodos);
//   };

//   return (
//     <div className="todo">
//       <span style={{ textDecoration: todo.isDone ? "line-through" : "" }}>{todo.text}</span>
//       <div>

//       <h1 className="text-center mb-4">Todo List</h1>
//         <Todo addTodo={handleAddTodo} />
//         <div>
//           {todos.map((todo, index) => (
//             <Card>
//               <Card.Body>
//                 <Todo
//                 key={index}
//                 index={index}
//                 todo={todo}
//                 markTodo={markTodo}
//                 removeTodo={removeTodo}
//                 />
//               </Card.Body>
//             </Card>
//           ))}
//         </div>

//         <Form onSubmit={handleSubmit}> 
//       <Form.Group>
//         <Form.Label><b>Add Todo</b></Form.Label>
//         <Form.Control type="text" className="input" value={value} onChange={e => setValue(e.target.value)} placeholder="Add new todo" />
//       </Form.Group>
//       <Button variant="primary mb-3" type="submit">
//         Submit
//       </Button>
//     </Form>

//         <Button variant="outline-success" onClick={() => handleMarkTodo(index)}>✓</Button>{' '}
//         <Button variant="outline-danger" onClick={() => handleRemoveTodo(index)}>✕</Button>
//       </div>
//     </div>
//   );
// }


export default Todo;