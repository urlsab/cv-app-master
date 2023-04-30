
import React, { useState } from "react";
import './Todo.css';

const Todo = () => {


  const [hoveredCart, setHoveredCart] = useState(-1);

  const showCartHandler = (i) =>{
    
    setHoveredCart(i);
    setDisplay('displayed');
}

const hideCartHandler= () => {
      
      setHoveredCart(-1);
      setDisplay('notdisplayed');
}


  const [display, setDisplay] = useState('notdisplayed');
  const [inputList, setInputList] = useState([{ firstName: '' }]);

  const showButton = (e) => {
    e.preventDefault();
    setDisplay('displayed');
  };

  const hideButton = (e) => {
    e.preventDefault();
    setDisplay('notdisplayed');
    

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
          <div 
            className="box" 
            
            >
          <input
            onMouseEnter={e => showCartHandler(e)}
            onMouseLeave={e => hideCartHandler(e)}
            name="firstName"
            placeholder=" "
              
            value={x.firstName}
            onChange={(e) => handleInputChange(e, i)}
          />
            <div className="btn-box">
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

export default Todo;