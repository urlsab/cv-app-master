import './TodoLeft.css';
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { initialState } from "../../utils/ourState";

const TodoLeft = () => {

  const [inputList, setInputList] = useState([{ display: 'notdisplayed'}]);
  const [selectedText, setSelectedText] = useState('');
  const [isPopoverVisible, setIsPopoverVisible] = useState(false);
  const [ourForm, setOurForm] = useState(initialState);

  const [flag, setFlag] = useState(false);

  // maybe just toggle font-weight: bold/normal;
  const handleBold = () => {
      if (window.getSelection() && !flag) {
        const selection = window.getSelection();
        const range = selection.getRangeAt(0);
        const span = document.createElement('b');
        span.setAttribute('id', 'bb');
        span?.appendChild(range.extractContents());
        range.insertNode(span);
        setFlag(!flag);
      }
      if (window.getSelection() && flag) {
        const selection = window.getSelection();
        const range = selection.getRangeAt(0);
        const span = document.getElementById('bb');
        console.log(selection);
        span?.replaceWith(...span.childNodes);
        range.insertNode(span);
        setFlag(!flag);
      }
    };
  
    // maybe just toggle text-decoration: underline/none
    const handleUnderline = () => {
      if (window.getSelection() && !flag) {
        const selection = window.getSelection();
        const range = selection.getRangeAt(0);
        const span = document.createElement('u');
        
        span.setAttribute('id','bb');
        span?.appendChild(range.extractContents());
        range.insertNode(span);
        setFlag(!flag);
      }
      if (window.getSelection() && flag) {
        const selection = window.getSelection();
        const range = selection.getRangeAt(0);
        const span = document.getElementById('bb');
        span?.replaceWith(...span.childNodes);
        range.insertNode(span);
        setFlag(!flag);
      }
    };

  const handleCustomChange = (field, data) => {
    setOurForm({
        ...ourForm,
        objectName: {
            ...ourForm.objectName,
            [field]: data,
        }
    })
  }

  const handleSelect = () => {
    const selection = window.getSelection();
    if (selection.toString()) {
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
          <div style={{marginTop:'15px'}}>
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

                <div className='forSecondGroup' style={{marginTop:'10px', marginBottom:'5px', marginLeft:'18px', width:'235px'}} key={i  + 7}>

                  <div
                    name="optionalSectionHeader"
                    key={i  + 7}
                    aria-required="true"
                    style={{ textTransform:"uppercase", fontSize:19, fontWeight:'bolder', padding: '0.2rem', lineHeight:"25px", marginLeft:'3px'}}
                    onMouseUp={handleSelect}
                    suppressContentEditableWarning={true}
                    contentEditable={true}
                    placeholder='Optional Header'
                    content={x.optionalSectionHeader}
                    onChange={(e) => handleInputChange(e, i)}
                    // onInput={(event) => {
                    //     const nameFull = event.target.textContent;
                    //     handleCustomChange('optionalSectionHeader', nameFull);
                    // }}
                />

                  {/*className='pdfFonts'*/}

                  <div
                    name="optionalSectionContent"
                    key={i  + 7}
                    aria-required="true"
                    style={{ fontSize:19, padding: '0.2rem', lineHeight:"30px", marginLeft:'5px' }}
                    onMouseUp={handleSelect}
                    suppressContentEditableWarning={true}
                    contentEditable={true}
                    placeholder='Optional Content'
                    content={x.optionalSectionContent}
                    onChange={(e) => handleInputChange(e, i)}
                    // onInput={(event) => {
                    //     const nameFull = event.target.textContent;
                    //     handleCustomChange('optionalSectionContent', nameFull);
                    // }}
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