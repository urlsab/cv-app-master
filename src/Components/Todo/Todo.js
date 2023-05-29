import './Todo.css';
import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { createRandomId } from '../../utils/randomId';

// '•'

const Todo = () => {

  // const [display, setDisplay] = useState('notdisplayed');
   
  const [inputList, setInputList] = useState([{ firstName: '', display: 'notdisplayed'}]);

  const [text, setText] = useState('');

  const handleChanges = (event, i) => {
    setText(event.target.value);
  };

  const handleKeyPress = (event, index) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      setText((prevText) => prevText + '\n\u2022 ');
    }
  };

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
  };

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] =  value;
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
    list.splice(index + 1 , 0, { firstName: '' });
    setInputList(list);
  };

  return (
    <div>
      {inputList.map((x, i) => {
        return (
          <div
            key={i + 1}
            className="box"
            // onMouseOver={(e) => showButton(e, i)}
            onMouseEnter={(e) => showButton(e, i)}
            onMouseLeave={(e) => hideButton(e, i)}
          >

            <div className="btn-box">
              {/* {inputList.length - 1 === i && ( */}
              <button 
                style={{backgroundColor:"green", width:"10px", height:"10px"}} 
                key={i + 3} className={x.display} 
                onClick={() => handleAddClick(i)}
              >
                
              </button>

              {inputList.length !== 1 && (
                <button
                  key={i + 4}
                  style={{backgroundColor:"red", width:"10px", height:"10px"}} 
                  className={x.display}
                  onClick={() => handleRemoveClick(i)}
                >
                  
                </button>
              )}

              <div key={i + 2} onChange={(e) => { handleInputChange(e, i); }}   className="listBullet" contentEditable="true" > </div>
  
            {/* <TextField
              key={i + 2}
              size='small'
              onKeyDown={(e) => handleKeyPress(e)}
              
              multiline
              name="firstName"
              className="inputStyle"
              placeholder=""
              color='primary'
              
              sx={{
                "& fieldset": { border: 'none' },
                width:"350px"
              }}
              
              value={`${x.firstName}`}
              onChange={(e) => { handleInputChange(e, i); }}
            /> */}

          {/* {short solution for bullet list} */}
          {/* contenteditable - allow to write content like input tag */}
                     
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Todo;

/*

import React, { useState } from 'react';

const BulletTextarea = () => {
  const [content, setContent] = useState('');

  const handleChange = (event) => {
    setContent(event.target.value);
  };

  const renderContentWithBullets = () => {
    // Replace lines starting with a bullet character with <ul> and <li>
    const lines = content.split('\n');
    const bulletLines = lines.map((line, index) => {
      if (line.trim().startsWith('•')) {
        return <li key={index}>{line.substring(1)}</li>;
      }
      return line;
    });

    return <ul>{bulletLines}</ul>;
  };

  return (
    <div>
      <textarea value={content} onChange={handleChange} />
      <div>{renderContentWithBullets()}</div>
    </div>
  );
};

export default BulletTextarea;

*/