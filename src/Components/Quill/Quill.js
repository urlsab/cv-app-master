import React, {useState} from 'react';
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';

const Quill = () => {
  const theme = 'bubble'; // options when hover
  const [value, setValue] = useState('');

  const modules = {
    toolbar: ['bold', 'italic', 'underline', 'link'],
  };

  const formats = ['bold', 'italic', 'underline', 'strike'];

  const placeholder = '';

  const { quillRef } = useQuill({ theme, modules, formats, placeholder });

  return (
    <div>
  
      <div style={{display:'flex', maxHeight: '600px', border: 'none' }}>
        <div  className="resume">
          <div className='square'>
            <div className='firstGroup'> 
              <div ref={quillRef}>
                <div ref={quillRef}
                
                  // inputRef={contentRef}
                  // onClick={toggleBold}
                  // onDoubleClick={toggleLine}
                  // onClick={toggleLink}
                  // contentEditable={true}
                  // style={{ border: '1px solid #ccc', minHeight: '50px' }}
                />
              </div>
            </div>
              
          </div>

        </div>

      </div>
   
    </div>
  );
};

export default Quill;