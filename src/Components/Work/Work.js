import './Work.css';
import React, { useState } from 'react';
// import { initialState } from "../../utils/ourState";
// import Fade from 'react-reveal/Fade';
import DOMPurify from 'dompurify';

// '•'

const TodoWork = () => {

  const [selectedTexti, setSelectedText] = useState('');
  const [isPopoverVisible, setIsPopoverVisible] = useState(false);
  // const [ourForm, setOurForm] = useState(initialState);

  const sanitizeInput = (input) => {
    return DOMPurify.sanitize(input.trim());
  };

  const handleSelect = () => {
    const selection = window.getSelection();
    if (selection.toString()) {
      const selectedText = selection.toString();
      setSelectedText(selectedText);
      setIsPopoverVisible(true);
      console.log(selectedTexti,isPopoverVisible);
    } else {
      setSelectedText('');
      setIsPopoverVisible(false);
    }
  };

  // const useKeyDown = (targetKey) => {
  //   // State for keeping track of whether key is pressed
  //   const [keyPressed, setKeyPressed] = useState(false);
  //   // If pressed key is our target key then set to true
  //   const downHandler = ({ key }) => {
  //     if (key === targetKey) {
  //       setKeyPressed(true);
  //     }
  //   }
    
  //   // Add event listeners to those lines
  //   useEffect( () => {
  //     window.addEventListener("keydown", downHandler);
      
  //     return () => {
  //       window.removeEventListener("keydown", downHandler);
        
  //     };
  //   }, [] ); 
  //   return keyPressed;
  // }


// •  • • ∙  ● • · · | . |
// work at pdf kendo - · |  
  const [inputList, setInputList] = useState([{ display: 'notdisplayed', roleAndCompanyName: '',  durationAndLocation: '', achivements: '-'}]);

  const handleEnterPress = (event, i) => {

  const list = [...inputList];

  setTimeout(() => {
    if (event.key === 'Enter') {

      // fix: enter gives emty string
      list[i].achivements += '-pp '  ;

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
            style={{marginBottom:'15px'}}
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

            <div className='forSecondGroup' style={{marginTop:'10px', marginBottom:'10px'}} key={i  + 7}>
            {/* {dotIcon} */}

        {/* x.roleAndCompanyName!=='' && */}
        <div style={{display:'flex',flexDirection:'row', justifyContent:'normal'}}>
          <div>
            
            <div
              name="roleAndCompanyName"
              aria-required="true"
              onMouseUp={handleSelect}
              suppressContentEditableWarning={true}
              contentEditable={true}
              placeholder='Role | Company Name'
              content={x.roleAndCompanyName}
              onInput={(event) => {
                const sanitizedInput = sanitizeInput(event.target.textContent);
                handleInputChange({ target: { name: 'optionalSectionContent', value: sanitizedInput }, key: event.key }, i);
              }}
              // onChange={(e) => handleInputChange(e, i)}
              style={{width:'250px',marginLeft:'3px',fontSize:16.5, paddingLeft: '0.2rem', lineHeight:"25px"}}
              // onInput={(event) => {
              //     const nameFull = event.target.textContent;
              //     handleCustomChange('GeneralKnowledge', nameFull);
              // }}
              />
            </div>

        {/* x.durationAndLocation!=='' && */}
            <div >
              
            <div
              name="durationAndLocation"
              aria-required="true"
              onMouseUp={handleSelect}
              suppressContentEditableWarning={true}
              contentEditable={true}
              placeholder='Duration | Location'
              content={x.durationAndLocation}
              // onChange={(e) => handleInputChange(e, i)}
              onInput={(event) => {
                const sanitizedInput = sanitizeInput(event.target.textContent);
                handleInputChange({ target: { name: 'optionalSectionContent', value: sanitizedInput }, key: event.key }, i);
              }}
              style={{width:'240px',marginRight:'2px',color:'gray',fontWeight:'bold',justifyContent:'end',textAlign:'end',fontSize:13, paddingLeft: '0.2rem', lineHeight:"25px"}}
              // onInput={(event) => {
              //     const nameFull = event.target.textContent;
              //     handleCustomChange('GeneralKnowledge', nameFull);
              // }}
            />
          </div>
        </div>
        {/* x.achivements!=='' && */}
          <div >

      
            
          
            <div
              name="achivements"
              aria-required="true"
              onMouseUp={handleSelect}
              suppressContentEditableWarning={true}
              contentEditable={true}
              placeholder='Achievements: Accomplished X as measured by Y by doing Z. Use numbers!!!!'
              content={x.achivements}
              onKeyDown={(e) => handleEnterPress(e, i) } 
              // onChange={(e) => handleInputChange(e, i) }
              onInput={(event) => {
                const sanitizedInput = sanitizeInput(event.target.textContent);
                handleInputChange({ target: { name: 'optionalSectionContent', value: sanitizedInput }, key: event.key }, i);
              }}
              style={{fontSize:14.5, marginLeft:'3px', width:'500px', lineHeight:'25px', paddingLeft:'0.2rem'}}
            />

            <hr style={{opacity:0.3,height:'0.2px',backgroundColor:'gray' , border:'none', borderRadius:'5px', width:'500px'}} />

          </div>
              
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