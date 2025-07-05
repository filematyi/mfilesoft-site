import LabeledInput from './LabeledInput';  
  
function Example() {  
  const [form, setForm] = React.useState({ apiVersion: '' });  
  
  const handleInputChange = (name, value) => {  
    setForm(prev => ({ ...prev, [name]: value }));  
  };  
  
  return (  
    <LabeledInput  
      label="API Version:"  
      name="apiVersion"  
      value={form.apiVersion}  
      onChange={handleInputChange}  
      placeholder="Optional (for Azure OpenAI)"  
      boldLabel  
    />  
  );  
}  
