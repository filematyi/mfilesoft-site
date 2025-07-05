import React from 'react';  
import './LabeledInput.css';  
  
function LabeledInput({  
  label,  
  value,  
  onChange,  
  placeholder = '',  
  type = 'text',  
  name = '',  
  boldLabel = false,  
  inputProps = {},  
}) {  
  return (  
    <div className="labeled-input-container">  
      <label   
        className={boldLabel ? "labeled-input-label bold" : "labeled-input-label"}  
        htmlFor={name}  
      >  
        {label}  
      </label>  
      <input  
        className="labeled-input-field"  
        type={type}  
        id={name}  
        name={name}  
        placeholder={placeholder}  
        value={value}  
        onChange={e => onChange(name, e.target.value)}  
        spellCheck={false}  
        {...inputProps}  
      />  
    </div>  
  );  
}  
  
export default LabeledInput;  
