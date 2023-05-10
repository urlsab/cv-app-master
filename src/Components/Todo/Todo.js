import './Todo.css';
import React, { useState } from 'react';

const Todo = () => {
  // const [display, setDisplay] = useState('notdisplayed');
  const [inputList, setInputList] = useState([{ firstName: '' , display: 'notdisplayed'}]);

  const showButton = (e, i) => {
    e.preventDefault();
    const list = [...inputList];
    list[i].display = 'displayed';
    setInputList(list);
  };

  const hideButton = (e, i) => {
    e.preventDefault();
    const list = [...inputList];
    list[i].display = 'notdisplayed';
    setInputList(list);

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
  const handleAddClick = (index) => {
    const list = [...inputList];
    list.splice(index +1 , 0, { firstName: '' });
    setInputList(list);
    // setInputList([...inputList, { firstName: '' }]);
  };

  return (
    <div>
      {inputList.map((x, i) => {
        return (
          <div
            key={i}
            className="box"
            // onMouseOver={e}
            onMouseEnter={(e) => showButton(e, i)}
            onMouseLeave={(e) => hideButton(e, i)}
          >
            <input
              key={i}
              name="firstName"
              className="inputStyle"
              placeholder="type here"
              value={x.firstName}
              onChange={(e) => handleInputChange(e, i)}
            />
            <div className="btn-box">
              {/* {inputList.length - 1 === i && ( */}
              <button key={i} className={x.display} onClick={() => handleAddClick(i)}>
                Add
              </button>

              {inputList.length !== 1 && (
                <button
                  key={i}
                  className={x.display}
                  onClick={() => handleRemoveClick(i)}
                >
                  Remove
                </button>
              )}
              {/* )} */}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Todo;