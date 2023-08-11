import './TodoWork.css';

import React, { useState, useEffect } from 'react';

import TextField from '@mui/material/TextField';
import ListItem from '@mui/material/ListItem';
import { MdWorkOutline } from "react-icons/md";
import { PiDotBold } from "react-icons/pi";

import { TbCircleLetterA } from "react-icons/tb";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { RxCalendar } from "react-icons/rx";
import { BsListUl } from "react-icons/bs";
import { InputAdornment } from "@mui/material";
import Fade from 'react-reveal/Fade';

import { Icon } from '@iconify/react';

// '•'

const TodoWork = () => {

  const [coords, setCoords] = useState({x: 0, y: 0});

  // <Icon icon="ph:dot-thin" />

  
  useEffect(() => {
    const handleWindowMouseMove = event => {
      setCoords({
        x: event.clientX,
        y: event.clientY,
      });
    };
    window.addEventListener('mousemove', handleWindowMouseMove);

    return () => {
      window.removeEventListener(
        'mousemove',
        handleWindowMouseMove,
      );
    };
  }, []);

  const { dotIcon } =  <PiDotBold/>  ;
  // const [display, setDisplay] = useState('notdisplayed');
   
  const [inputList, setInputList] = useState([{ display: 'notdisplayed', roleAndCompanyName: '',  durationAndLocation: '', achivements: '•'}]);

  const [text, setText] = useState('');

  // const handleChanges = (event, i) => {
  //   setText(event.target.value);
  // };

  const renderDot = () => {
    return (
      <>
        <PiDotBold />
      </>
    );
  }

  const handleEnterPress = (event, i) => {
    //DONT ADD THAT !!!! - event.preventDefault(); - with that - we can write no thing

    const char = '-';

    const list = [...inputList];

setTimeout(() => {
    if (event.key === 'Enter') {
      
      // + JSON.stringify(dotIcon, null, 2)
      
        list[i].achivements += `${char}` + " "  ;

      setInputList(list);
      //DONT ADD THAT !!!! - event.preventDefault(); - with that - enter button will not jump line
      // const list = [...inputList];

      // point after list[i].achievements - will make line jump when enter
      
    }

    else{
      setInputList(list);
    }

    // mini
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
      {/* ({coords.x}, {coords.y}) */}
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
              width:'420px'
              
              }}
              InputProps={{style: {fontSize:18, padding: '0.2rem', lineHeight:"25px"},
              startAdornment: (
                  <InputAdornment position='start'>
                      { x.roleAndCompanyName ?
                      
                      <Fade> <MdWorkOutline style={{fontSize:15, color:'gray', marginRight:'3px'}}/> | <TbCircleLetterA style={{fontSize:15, color:'gray'}}/> </Fade> : null }
                      
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
              width:'420px'
              
              
              }}
              InputProps={{style: {fontSize:18, padding: '0.2rem', lineHeight:"25px"},
              startAdornment: (
                  <InputAdornment position='start'>
                      { x.durationAndLocation ?
                      
                      <Fade> <RxCalendar style={{fontSize:15, color:'gray', marginRight:'3px'}}/> | <HiOutlineLocationMarker style={{fontSize:15, color:'gray'}}/>  </Fade> : null }
                      
                  </InputAdornment>
              )
          }}

          

          />

            <TextField
              type="text"
              name="achivements"
              className='pdfFonts'
              required 
              multiline
              placeholder='Achivements'
              sx={{border: 'none',"& fieldset": { border: 'none' }  }}
              value={x.achivements}

              
              onKeyDown={(e) => handleEnterPress(e, i) } 
              onChange={(e) => handleInputChange(e, i) }
        
              style={{
              
              marginLeft:'20px',
              width:'420px',
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


              {/* <div key={i + 6 }>
                <div key={ i + 9}
            
                  // ref={inputRef[i]}
                  // placeholder="content list"
                  suppressContentEditableWarning={true} 
                  contentEditable={true} 
                  
                  onChange={(e) => { handleInputChange(e, i); }}  
                  className="listBulletRight" > 
                </div>

              </div> */}
              
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

// ==============================

{/* suppressContentEditableWarning={true}  - aviod react warrnig*/}
{/* contentEditable={true} - aloow to write text inside this div */}

{/* {short solution for bullet list} */}
{/* contenteditable - allow to write content like input tag */}