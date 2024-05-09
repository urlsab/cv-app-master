import './TodoWork.css';
import React, { useState } from 'react';
// import { initialState } from "../../utils/ourState";
import Fade from 'react-reveal/Fade';

// '•'

const TodoWork = () => {

  const [selectedTexti, setSelectedText] = useState('');
  const [isPopoverVisible, setIsPopoverVisible] = useState(false);
  // const [ourForm, setOurForm] = useState(initialState);

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
          <div className="iconAndInputs">
            { (<Fade> <img alt="svg"
                    style={{marginRight:"1px", marginLeft:'20px'}}
                    src='data:image/svg+xml;utf8,
                      <svg class="w-[12px] h-[12px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="gray" viewBox="0 0 24 24">
                        <path fill-rule="evenodd" stroke-width="1.5" d="M10 2a3 3 0 0 0-3 3v1H5a3 3 0 0 0-3 3v2.382l1.447.723.005.003.027.013.12.056c.108.05.272.123.486.212.429.177 1.056.416 1.834.655C7.481 13.524 9.63 14 12 14c2.372 0 4.52-.475 6.08-.956.78-.24 1.406-.478 1.835-.655a14.028 14.028 0 0 0 .606-.268l.027-.013.005-.002L22 11.381V9a3 3 0 0 0-3-3h-2V5a3 3 0 0 0-3-3h-4Zm5 4V5a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v1h6Zm6.447 7.894.553-.276V19a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3v-5.382l.553.276.002.002.004.002.013.006.041.02.151.07c.13.06.318.144.557.242.478.198 1.163.46 2.01.72C7.019 15.476 9.37 16 12 16c2.628 0 4.98-.525 6.67-1.044a22.95 22.95 0 0 0 2.01-.72 15.994 15.994 0 0 0 .707-.312l.041-.02.013-.006.004-.002.001-.001-.431-.866.432.865ZM12 10a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H12Z" clip-rule="evenodd"/>
                      </svg>'
                /> </Fade>)}
            <div
              name="roleAndCompanyName"
              aria-required="true"
              onMouseUp={handleSelect}
              suppressContentEditableWarning={true}
              contentEditable={true}
              placeholder='Role | Company Name'
              content={x.roleAndCompanyName}
              onChange={(e) => handleInputChange(e, i)}
              style={{marginLeft:'5px',width:'490px',fontSize:16.5, paddingLeft: '0.2rem', lineHeight:"25px"}}
              // onInput={(event) => {
              //     const nameFull = event.target.textContent;
              //     handleCustomChange('GeneralKnowledge', nameFull);
              // }}
              />
            </div>

        {/* x.durationAndLocation!=='' && */}
            <div className="iconAndInputs">
              { (<Fade> <img alt="svg"
                  style={{marginRight:"1px", marginLeft:'20px'}}
                  src='data:image/svg+xml;utf8,
                    <svg class="w-[12px] h-[12px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="gray" viewBox="0 0 24 24">
                      <path fill-rule="evenodd" stroke-width="1.5" d="M5 5a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1 2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a2 2 0 0 1 2-2ZM3 19v-7a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm6.01-6a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm-10 4a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z" clip-rule="evenodd"/>
                    </svg>'
              /> </Fade>)}
            <div
              name="durationAndLocation"
              aria-required="true"
              onMouseUp={handleSelect}
              suppressContentEditableWarning={true}
              contentEditable={true}
              placeholder='Duration | Location'
              content={x.durationAndLocation}
              onChange={(e) => handleInputChange(e, i)}
              style={{marginLeft:'5px',width:'490px',fontSize:13, paddingLeft: '0.2rem', lineHeight:"25px"}}
              // onInput={(event) => {
              //     const nameFull = event.target.textContent;
              //     handleCustomChange('GeneralKnowledge', nameFull);
              // }}
            />
          </div>

        {/* x.achivements!=='' && */}
          <div className="iconAndInputs">
            { (<Fade> <img alt="svg"
              style={{marginRight:"1px", marginLeft:'20px'}}
              src='data:image/svg+xml;utf8,
                <svg class="w-[12px] h-[12px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24">
                  <path stroke="gray" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 9a3 3 0 0 1 3-3m-2 15h4m0-3c0-4.1 4-4.9 4-9A6 6 0 1 0 6 9c0 4 4 5 4 9h4Z"/>
                </svg>'
            /> </Fade>)}
          
            <div
              name="achivements"
              aria-required="true"
              onMouseUp={handleSelect}
              suppressContentEditableWarning={true}
              contentEditable={true}
              placeholder='Achivements'
              content={x.achivements}
              onKeyDown={(e) => handleEnterPress(e, i) } 
              onChange={(e) => handleInputChange(e, i) }
              style={{fontSize:14.5, marginLeft:'5px', width:'490px', lineHeight:'25px', paddingLeft:'0.2rem'}}
            />

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