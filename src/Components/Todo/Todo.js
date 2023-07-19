import './Todo.css';
import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { createRandomId } from '../../utils/randomId';

// '•'

const Todo = () => {

  // const [display, setDisplay] = useState('notdisplayed');
   
  const [inputList, setInputList] = useState([{ firstName: '', display: 'notdisplayed'}]);

  const [text, setText] = useState('');

//   const inputRef = inputList.map((i) => React.createRef(i));

//   const inputRefCurrent = (i) => {
//     console.log(inputRef[i]);
//     inputRef[i].current.save();
// };

// onClick={() => inputRefCurrent(i)}

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

    handleKeyPress(e, index);

    // inputRef[index].current.save();

    const list = [...inputList];
    list[index][name] =  value;
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputList];

    // inputRef[index].current.save();

    list.splice(index, 1);
    console.log(list[index]);
    setInputList(list);
    
  };

  // handle click event of the Add button
  const handleAddClick = (index) => {
    const list = [...inputList];

    // inputRef[index].current.save();

    list.splice(index + 1 , 0, { firstName: ''});
    console.log(list[index]);
    setInputList(list);
  };

  return (
    <div>
      {inputList.map((x, i) => {
        return (
          <div>
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
                style={{backgroundColor:"transparent",color:"green", width:"20px", height:"20px", border:"none"}} 
                key={i + 3} className={x.display} 
                onClick={() => handleAddClick(i)}
                // onClick={() => inputRefCurrent(i)}
              >
                +
              </button>

              {inputList.length !== 1 && (
                <button
                  key={i + 4}
                  style={{backgroundColor:"transparent",color:"red", width:"20px", height:"20px", border:"none"}} 
                  className={x.display}
                  onClick={() => handleRemoveClick(i)}
                >
                  x
                </button>
              )}

            <div key={i  + 7}>

              <input
                // key={i + 9}
                name="firstName"
                height="100px"
                width="420px"
                maxLength="40"
                className="inputStyle"
                placeholder="Role | Company name"
                value={x.firstName}
                onChange={(e) => handleInputChange(e, i)}
              />

            {/* <input
              key={i}
              name="firstName"
              className="inputStyle"
              placeholder="Duration dates | Location"
              value={x.firstName}
              onChange={(e) => handleInputChange(e, i)}
            /> */}

              <div key={i + 6 }>
                <div key={ i + 9}
            
                  // ref={inputRef[i]}
                  // placeholder="content list"
                  suppressContentEditableWarning={true} 
                  contentEditable={true} 
                  
                  onChange={(e) => { handleInputChange(e, i); }}  
                  className="listBulletRight" > 
                </div>

              </div>
              
            </div>


              {/* suppressContentEditableWarning={true}  - aviod react warrnig*/}
              {/* contentEditable={true} - aloow to write text inside this div */}
              
  
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
          </div>
        );
      })}
    </div>
  );
};

export default Todo;