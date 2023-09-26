import './TodoLeft.css';
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';

const TodoLeft = () => {

  const [inputList, setInputList] = useState([{ display: 'notdisplayed'}]);

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
    console.log(list[index]);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = (index) => {
    const list = [...inputList];
    list.splice(index + 1 , 0, { optionalSectionHeader: '',  optionalSectionContent: ''});
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

                {inputList.length !== 0 && (
                  <button
                    key={i + 4}
                    style={{backgroundColor:"transparent",color:"red", width:"20px", height:"20px", border:"none"}} 
                    className={x.display}
                    onClick={() => handleRemoveClick(i)}
                  >
                    x
                  </button>
                )}

                <div style={{marginTop:'10px', marginBottom:'10px'}} key={i  + 7}>
                  <TextField
                    type="text"
                    name="optionalSectionHeader"
                    className='pdfFonts'
                    required 
                    multiline
                    placeholder='Optional Header'
                    sx={{border: 'none',"& fieldset": { border: 'none' }  }}
                    value={x.optionalSectionHeader}
                    onChange={(e) => handleInputChange(e, i)}
                    style={{ marginLeft:'27px',width:'230px',display:'flex'}}
                    InputProps={{style: {fontSize:19, fontWeight:'bolder', padding: '0.2rem', lineHeight:"25px"},}}
                  />

                  <TextField
                    type="text"
                    name="optionalSectionContent"
                    className='pdfFonts'
                    required 
                    multiline
                    placeholder='Optional Content'
                    sx={{border: 'none',"& fieldset": { border: 'none' }  }}
                    value={x.optionalSectionContent}
                    onChange={(e) => handleInputChange(e, i)}
                    style={{marginLeft:'28px',width:'230px',marginBottom:'10px',display:'flex'}}
                    InputProps={{style: {fontSize:15, padding: '0.2rem', lineHeight:"25px"}, }}
                  />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
  
};

export default TodoLeft;