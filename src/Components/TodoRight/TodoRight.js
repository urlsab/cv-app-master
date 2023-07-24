import './TodoRight.css';
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';

const TodoRight = () => {

  const [inputList, setInputList] = useState([{ display: 'notdisplayed', roleAndCompanyName: '',  durationAndLocation: '', achivments: ''}]);

  const [text, setText] = useState('');

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
                                    
                                        style={{
                                        
                                        marginLeft:'20px',
                                        width:'430px'
                                        
                                        }}
                                        InputProps={{style: {fontSize:19, fontWeight:'bolder', padding: '0.2rem', lineHeight:"25px"},
                                        
                                        }}

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
                                    
                                        style={{
                                        
                                        marginLeft:'20px',
                                        width:'430px',
                                        marginBottom:'10px'
                                        
                                        }}
                                        InputProps={{style: {fontSize:15, padding: '0.2rem', lineHeight:"25px"},
                                        
                                        }}

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

export default TodoRight;

// ==============================

{/* suppressContentEditableWarning={true}  - aviod react warrnig*/}
{/* contentEditable={true} - aloow to write text inside this div */}

{/* {short solution for bullet list} */}
{/* contenteditable - allow to write content like input tag */}