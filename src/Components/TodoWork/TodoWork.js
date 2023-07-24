import './TodoWork.css';
import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { createRandomId } from '../../utils/randomId';


import WorkIcon from '@mui/icons-material/Work';

import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import FilePresentIcon from '@mui/icons-material/FilePresent';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import ListIcon from '@mui/icons-material/List';

import CodeIcon from '@mui/icons-material/Code';
import PsychologyIcon from '@mui/icons-material/Psychology';
import CoPresentIcon from '@mui/icons-material/CoPresent';
import WhereToVoteIcon from '@mui/icons-material/WhereToVote';
import TitleIcon from '@mui/icons-material/Title';
import HdrAutoIcon from '@mui/icons-material/HdrAuto';

import { Button, InputAdornment } from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';

import Fade from 'react-reveal/Fade';

// '•'

const TodoWork = () => {

  // const [display, setDisplay] = useState('notdisplayed');
   
  const [inputList, setInputList] = useState([{ display: 'notdisplayed', roleAndCompanyName: '',  durationAndLocation: '', achivments: ''}]);

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

    list.splice(index + 1 , 0, { roleAndCompanyName: '',  durationAndLocation: '', achivments: ''});
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

            <div style={{marginTop:'10px', marginBottom:'10px'}} key={i  + 7}>

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
                      
                      <Fade><WorkIcon sx={{fontSize:15}}/> | <HdrAutoIcon sx={{fontSize:15}}/>  </Fade> : null }
                      
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
                      
                      <Fade><EventAvailableIcon sx={{fontSize:15}}/> | <WhereToVoteIcon sx={{fontSize:15}}/>  </Fade> : null }
                      
                  </InputAdornment>
              )
          }}

          />

            <TextField
              type="text"
              name="achivments"
              className='pdfFonts'
              required 
              multiline
              placeholder='Achievement'
              sx={{border: 'none',"& fieldset": { border: 'none' }  }}
              value={x.achivments}
              onChange={(e) => handleInputChange(e, i)}
        
              style={{
              
              marginLeft:'20px',
              width:'420px',
              marginBottom:'5px'
              
              }}
              InputProps={{style: {fontSize:15, padding: '0.2rem', lineHeight:"25px"},
              startAdornment: (
                  <InputAdornment position='start'>
                      { x.achivments ?
                      
                      <Fade> <ListIcon sx={{fontSize:15}}/>   </Fade> : null }
                      
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