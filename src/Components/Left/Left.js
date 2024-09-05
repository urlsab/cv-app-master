import './Left.css';
import React, { useState } from 'react';
import DOMPurify from 'dompurify';

const TodoRight = () => {

  const [inputList, setInputList] = useState([{ 
    display: 'notdisplayed', 
    optionalSectionHeader: '', 
    optionalSectionContent: '' 
  }]);

  const [text, setText] = useState('');
  const [selectedTexti, setSelectedText] = useState('');
  const [isPopoverVisible, setIsPopoverVisible] = useState(false);

  const sanitizeInput = (input) => {
    return DOMPurify.sanitize(input.trim());
  };

  const handleSelect = () => {
    const selection = window.getSelection();
    if (selection.toString()) {
      console.log(text, selectedTexti,isPopoverVisible)
      const selectedText = selection.toString();
      setSelectedText(selectedText);
      setIsPopoverVisible(true);
    } else {
      setSelectedText('');
      setIsPopoverVisible(false);
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

  
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const sanitizedValue = sanitizeInput(value);
    
    if (e.key === 'Enter') {
      e.preventDefault();
      const newValue = sanitizedValue + '\n\u2022 ';
      const list = [...inputList];
      list[index][name] = newValue;
      setInputList(list);
      setText(newValue);
    } else {
      const list = [...inputList];
      list[index][name] = sanitizedValue;
      setInputList(list);
    }
  };

  const handleAddClick = (index) => {
    try {
      const list = [...inputList];
      list.splice(index + 1, 0, { optionalSectionHeader: '', optionalSectionContent: '' });
      setInputList(list);
    } catch (error) {
      console.error('Error in handleAddClick:', error);
    }
  };
  
  const handleRemoveClick = (index) => {
    try {
      const list = [...inputList];
      if (list.length > 1) {
        list.splice(index, 1);
        setInputList(list);
      }
    } catch (error) {
      console.error('Error in handleRemoveClick:', error);
    }
  };

  return (
    <div>
      {inputList.map((x, i) => {
        return (
            <div style={{marginBottom:'20px',marginTop:'20px',marginLeft:'18px'}}>
                <div
                    key={i + 1}
                    className="box"
                    style={{marginBottom:'10px'}}
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

                        <div className='forSecondGroup' style={{ marginBottom:'1px'}} key={i  + 7}>

                        <div
                          name="optionalSectionHeader"
                          key={i + 7}
                          aria-required="true"
                          style={{ marginBottom:'5px',marginTop:'10px',width: '250px', fontSize: 16.5, fontWeight: 'bolder', paddingLeft: '0.2rem', lineHeight: "25px" }}
                          onMouseUp={handleSelect}
                          suppressContentEditableWarning={true}
                          contentEditable={true}
                          placeholder='Optional header'
                          onInput={(event) => {
                            const sanitizedInput = sanitizeInput(event.target.textContent);
                            handleInputChange({ target: { name: 'optionalSectionHeader', value: sanitizedInput }, key: event.key }, i);
                          }}
                          // dangerouslySetInnerHTML={{ __html: x.optionalSectionHeader || '' }}
                        />

                        {/* <hr style={{height:'2px',backgroundColor:'gray' , border:'none', borderRadius:'5px', width:'450px'}} /> */}

                        <div
                          name="optionalSectionContent"
                          key={i + 8}
                          aria-required="true"
                          style={{ width: '250px', fontSize: 14.5, paddingLeft: '0.2rem', lineHeight: "25px" }}
                          onMouseUp={handleSelect}
                          suppressContentEditableWarning={true}
                          contentEditable={true}
                          placeholder='Optional content'
                          onInput={(event) => {
                            const sanitizedInput = sanitizeInput(event.target.textContent);
                            handleInputChange({ target: { name: 'optionalSectionContent', value: sanitizedInput }, key: event.key }, i);
                          }}
                          // onKeyDown={handleKeyPress}
                          // dangerouslySetInnerHTML={{ __html: x.optionalSectionContent || '' }}
                        />

                                    {/* <TextField
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
                                        
                                        marginLeft:'23px',
                                        width:'430px'
                                        
                                        }}
                                        InputProps={{style: {fontSize:19, fontWeight:'bolder', padding: '0.2rem', lineHeight:"25px"},
                                        
                                        }}

                                    /> */}
                        
                                    {/* <TextField
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
                                        
                                        marginLeft:'25px',
                                        width:'430px',
                                        marginBottom:'10px'
                                        
                                        }}
                                        InputProps={{style: {fontSize:15, padding: '0.2rem', lineHeight:"25px"},
                                        
                                        }}

                                    /> */}

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