import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Button } from "@mui/material";

const CopyToClipboardButton = ({ text }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    toast.success('Copied to clipboard!');
  };

  return (
    <Button   
        sx={{mr:1}}  
        style={{display: 'flex', justifyContent: 'center'}}
        color='inherit'
        variant="contained"
        onClick={handleCopy}>
          {isCopied ? '•' : '•'}
    </Button>
  );
};

export default CopyToClipboardButton;