import './Todo.css';
import React, { useState } from 'react';

import TextField from '@mui/material/TextField';

import { createRandomId } from '../../utils/randomId';

// '•'

const Todo = () => {
  // const [display, setDisplay] = useState('notdisplayed');
  const randId = createRandomId();
  const [point, setPoint] = useState('');
  const [inputList, setInputList] = useState([{ firstName: '•' , display: 'notdisplayed'}]);

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
    list[index][name] =  value;
    handleKeyPress(index);
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
    list.splice(index +1 , 0, { firstName: '•' });
    setInputList(list);
    // setInputList([...inputList, { firstName: '' }]);
  };

  const handleKeyPress = (e, i) => {
    if (e.key === 'Enter') {
      console.log('Enter key pressed');
      setPoint(<li>p</li>);
    }
  }

  return (
    <div>
      {inputList.map((x, i) => {
        return (
          <div
            key={i + 1}
            className="box"
            // onMouseOver={e}
            onMouseEnter={(e) => showButton(e, i)}
            onMouseLeave={(e) => hideButton(e, i)}
          >

            <TextField
              key={i + 2}
              size='small'
              // onKeyDown={(e) => handleKeyPress(e)}
              
              multiline
              name="firstName"
              className="inputStyle"
              placeholder=""
              color='primary'
              sx={{
                "& fieldset": { border: 'none' },
                width:"350px"
              }}
              
              value={x.firstName}
              onChange={(e) => { handleInputChange(e, i)}}
            />
            <div className="btn-box">
              {/* {inputList.length - 1 === i && ( */}
              <button 
                style={{backgroundColor:"green"}} 
                key={i + 3} className={x.display} 
                onClick={() => handleAddClick(i)}
              >
                +
              </button>

              {inputList.length !== 1 && (
                <button
                  key={i + 4}
                  style={{backgroundColor:"red"}} 
                  className={x.display}
                  onClick={() => handleRemoveClick(i)}
                >
                  x
                </button>
              )}
              {/* )} */}
                {point}
              
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Todo;