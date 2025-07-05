import React, { createRef, Component } from "react";

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
          <div>  
            <label style={{ fontWeight: "bold" }}>API URL:</label>  
            <input  
              type="text"  
              value={url}  
              onChange={e => onChange("url", e.target.value)}  
              style={{  
                width: "100%",  
                padding: "0.5em",  
                marginTop: 4,  
                borderRadius: 4,  
                border: "1px solid #666",  
                background: "#333",  
                color: "#ffe"  
              }}  
              spellCheck={false}  
            />  
          </div>  
          <div>  
            <label style={{ fontWeight: "bold" }}>API Key:</label>  
            <input  
              type="password"  
              value={apiKey}  
              onChange={e => onChange("apiKey", e.target.value)}  
              style={{  
                width: "100%",  
                padding: "0.5em",  
                marginTop: 4,  
                borderRadius: 4,  
                border: "1px solid #666",  
                background: "#333",  
                color: "#ffe"  
              }}  
              spellCheck={false}  
            />  
          </div>  
          <div>  
            <label style={{ fontWeight: "bold" }}>Model:</label>  
            <input  
              type="text"  
              value={model}  
              onChange={e => onChange("model", e.target.value)}  
              style={{  
                width: "100%",  
                padding: "0.5em",  
                marginTop: 4,  
                borderRadius: 4,  
                border: "1px solid #666",  
                background: "#333",  
                color: "#ffe"  
              }}  
              spellCheck={false}  
            />  
          </div>  
          <div>  
            <label style={{ fontWeight: "bold" }}>API Version:</label>  
            <input  
              type="text"  
              placeholder="Optional (for Azure OpenAI)"  
              value={apiVersion}  
              onChange={e => onChange("apiVersion", e.target.value)}  
              style={{  
                width: "100%",  
                padding: "0.5em",  
                marginTop: 4,  
                borderRadius: 4,  
                border: "1px solid #666",  
                background: "#333",  
                color: "#ffe"  
              }}  
              spellCheck={false}  
            />  
          </div>  
        </div>  
      );  
    }  
  }

  export default LeftPanel; 