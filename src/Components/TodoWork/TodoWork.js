import './TodoWork.css';

// import 'quill/dist/quill.snow.css';
// import 'react-quill/dist/quill.bubble.css';
// import ReactQuill from 'react-quill';

import React, { useState, useEffect } from 'react';

import TextField from '@mui/material/TextField';
import { MdWorkOutline } from "react-icons/md";
import * as Icons from "react-icons/pi";

import { PiDotBold } from "react-icons/pi";

import { TbCircleLetterA } from "react-icons/tb";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { RxCalendar } from "react-icons/rx";
import { BsListUl } from "react-icons/bs";
import { InputAdornment } from "@mui/material";

import Fade from 'react-reveal/Fade';

// '•'

const TodoWork = () => {

  const modules = {
    toolbar: [
      [{ size: ['small', false, 'large', 'huge'] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
        { align: [] },
      ],
      
      [
        {
          color: [
            '#000000',
            '#e60000',
            '#ff9900',
            '#ffff00',
            '#008a00',
            '#0066cc',
            '#9933ff',
            '#ffffff',
            '#facccc',
            '#ffebcc',
            '#ffffcc',
            '#cce8cc',
            '#cce0f5',
            '#ebd6ff',
            '#bbbbbb',
            '#f06666',
            '#ffc266',
            '#ffff66',
            '#66b966',
            '#66a3e0',
            '#c285ff',
            '#888888',
            '#a10000',
            '#b26b00',
            '#b2b200',
            '#006100',
            '#0047b2',
            '#6b24b2',
            '#444444',
            '#5c0000',
            '#663d00',
            '#666600',
            '#003700',
            '#002966',
            '#3d1466',
            'custom-color',
          ],
        },
      ],
    ],
  };

  const formats = [
    'header',
    'height',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'color',
    'bullet',
    'indent',
    'link',
    'image',
    'align',
    'size',
  ];

  const handleProcedureContentChange = (content) => {
    console.log('content---->', content);
  };

  const useKeyDown = (targetKey) => {
    // State for keeping track of whether key is pressed
    const [keyPressed, setKeyPressed] = useState(false);
    // If pressed key is our target key then set to true
    const downHandler = ({ key }) => {
      if (key === targetKey) {
        setKeyPressed(true);
      }
    }
    
    // Add event listeners to those lines
    useEffect( () => {
      window.addEventListener("keydown", downHandler);
      
      return () => {
        window.removeEventListener("keydown", downHandler);
        
      };
    }, [] ); 
    return keyPressed;
  }

  const enterPress = useKeyDown("Enter");

  const iconOb = <PiDotBold/>;


  const renderDot = () => {
    return (
      <>
        <PiDotBold />
      </>
    );
  }

// •  • • ∙  ● • · · | . |
// work at pdf kendo - · |  
  const dotIcon =  <PiDotBold/>  ;
  const [inputList, setInputList] = useState([{ display: 'notdisplayed', roleAndCompanyName: '',  durationAndLocation: '', achivements: '-'}]);

  const handleEnterPress = (event, i) => {

  const list = [...inputList];

  setTimeout(() => {
    if (event.key === 'Enter') {

      list[i].achivements += '-' + " "  ;

      // list[i].achivements += '·' + " "  ;
      setInputList(list);
    }

    else {
      setInputList(list);
    }

  }, 0);

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

    // inputRef[index].current.save();
    // if (e.key === 'Enter') { 
    //   console.log('Enter key pressed');
    //   list[index][name] =  '&';
    //   setInputList(list);
    // }

    // else {
      list[index][name] =  value;
      setInputList(list);
    // }
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

    list.splice(index + 1 , 0, { roleAndCompanyName: '',  durationAndLocation: '', achivements: ''});
    console.log(list[index]);
    setInputList(list);
  };

  return (
    <div>
     
      {/* make this for ant enter + in achivement fieled */}
      
      {inputList.map((x, i) => {
        return (
          <div>
          {/* {enterPress ? inputList[i].achivements = <PiDotBold/> : null} */}
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

            <div style={{marginTop:'10px', marginBottom:'10px'}} key={i  + 7}>
            {/* {dotIcon} */}
            <TextField
              type="text"
              name="roleAndCompanyName"
              className='pdfFonts'
              required 
              multiline
              placeholder='Role | Company Name'
              sx={{border: 'none',"& fieldset": { border: 'none' }  }}
              value={x.roleAndCompanyName}
              onChange={(e) => handleInputChange(e, i)}

              style={{
              
              marginLeft:'20px',
              width:'490px'
              
              }}
              InputProps={{style: {fontSize:18, padding: '0.2rem', lineHeight:"25px"},
              startAdornment: (
                  <InputAdornment position="start">
                      { x.roleAndCompanyName ?
                      
                      <Fade>  <MdWorkOutline style={{fontSize:15, color:'gray', marginRight:'3px'}}/> | <TbCircleLetterA style={{fontSize:15, color:'gray'}}/> </Fade> : null }
                      
                  </InputAdornment>
              )
          }}

          />

            <TextField
              type="text"
              name="durationAndLocation"
              className='pdfFonts'
              required 
              multiline
              placeholder='Duration | Location'
              sx={{border: 'none',"& fieldset": { border: 'none' }  }}
              value={x.durationAndLocation}
              onChange={(e) => handleInputChange(e, i)}
        
              style={{
              
              marginLeft:'20px',
              width:'490px'
              
              
              }}
              InputProps={{style: {fontSize:14, padding: '0.2rem', lineHeight:"25px"},
              startAdornment: (
                  <InputAdornment position='start'>
                      { x.durationAndLocation ?
                      
                      <Fade> <RxCalendar style={{fontSize:11, color:'gray', marginRight:'3px'}}/> | <HiOutlineLocationMarker style={{fontSize:11, color:'gray'}}/>  </Fade> : null }
                      
                  </InputAdornment>
              )
          }}

          />
          
            <TextField
              type="text"
              name="achivements"
              className="pdfFonts"
              required 
              multiline
              placeholder='Achivements'
              sx={{border: 'none',"& fieldset": { border: 'none' }  }}
              value={x.achivements}
              // onKeyDown={handleKeyPress}
              // onKeyDown={(e) => enterPress ? '-' : null }
              // onKeyDown={(e) => enterPress ? <PiDotBold /> : null }
              onKeyDown={(e) => handleEnterPress(e, i) } 
              onChange={(e) => handleInputChange(e, i) }
        
              style={{
              
              marginLeft:'20px',
              width:'490px',
              marginBottom:'5px'
              
              }}
              InputProps={{style: {fontSize:15, padding: '0.2rem', lineHeight:"25px"},
              startAdornment: (
                  <InputAdornment position='start'>
                      { x.achivements ?
                     
                      <Fade> <BsListUl style={{fontSize:15, color:'gray'}}/> </Fade> : null }

                  </InputAdornment>
              )
          }}

          />

          {/* {showIcon && <TbCircleLetterA style={{fontSize:15, color:'red'}} /> } */}
              
            </div>
              
            </div>
          </div>
          </div>
        );
      })}
      
    </div>
  );
};

export default TodoWork;