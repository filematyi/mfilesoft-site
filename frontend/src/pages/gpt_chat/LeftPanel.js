import React, { Component } from "react";
import LabeledInput from '../../components/inputs/LabeledInput';

class LeftPanel extends Component {  
    render() {  
      const { url, apiKey, model, apiVersion, onChange } = this.props;  
      return (  
        <div style={{  
          flex: "1 0 0",  
          padding: "2rem 1.5rem",  
          background: "#222",  
          color: "#eee",  
          minWidth: 0,  
          display: "flex",  
          flexDirection: "column",  
          gap: "1rem"  
        }}>
          <LabeledInput  
            label="API Url:"  
            name="url"  
            value={url}  
            onChange={e => onChange("url", e.target.value)}
            boldLabel
          />  
          <LabeledInput  
            label="API Key:"  
            name="apiKey"  
            value={apiKey}  
            onChange={e => onChange("apiKey", e.target.value)}
            boldLabel
            type="password"
          />
          <LabeledInput  
            label="Model:"  
            name="model"  
            value={model}  
            onChange={e => onChange("model", e.target.value)}
            boldLabel  
          />
          <LabeledInput  
            label="API Version:"  
            name="apiVersion"  
            value={apiVersion}  
            onChange={e => onChange("apiVersion", e.target.value)}  
            placeholder="Optional (for Azure OpenAI)"  
            boldLabel  
          />  
        </div>  
      );  
    }  
  }

  export default LeftPanel; 