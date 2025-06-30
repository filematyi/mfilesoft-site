import React, { useState, useRef } from "react";  
  
const GptChat = () => {  
  // Left panel credentials & settings  
  const [url, setUrl] = useState("https://api.openai.com/v1/chat/completions");  
  const [apiKey, setApiKey] = useState("");  
  const [model, setModel] = useState("gpt-3.5-turbo");  
  const [apiVersion, setApiVersion] = useState("");  
  const [maxTokens, setMaxTokens] = useState("512");  
  
  // Conversation and user input  
  const [conversation, setConversation] = useState([  
    { sender: "system", content: "Welcome! Start the conversation below." },  
  ]);  
  const [userInput, setUserInput] = useState("");  
  const [isLoading, setIsLoading] = useState(false);  
  
  // For scrolling to bottom automatically  
  const conversationRef = useRef(null);  
  
  // Helper: send GPT message  
  const sendMessage = async () => {  
    if (!userInput.trim()) return;  
    setIsLoading(true);  
  
    const updatedConversation = [  
      ...conversation,  
      { sender: "user", content: userInput },  
    ];  
    setConversation(updatedConversation);  
  
    try {  
      const payload = {  
        model,  
        messages: updatedConversation  
          .filter(x => x.sender !== "system")  
          .map((m) => ({  
            role: m.sender,  
            content: m.content,  
          })),  
        max_tokens: parseInt(maxTokens) || 512,  
      };  
      // Support for model/version logic could be added here if required  
  
      const headers = {  
        "Content-Type": "application/json",  
        Authorization: `Bearer ${apiKey.trim()}`,  
      };  
  
      // If Azure OpenAI, include api-version in URL  
      let fetchUrl = url.trim();  
      if (apiVersion) {  
        const paramSep = fetchUrl.includes("?") ? "&" : "?";  
        fetchUrl = `${fetchUrl}${paramSep}api-version=${apiVersion}`;  
      }  
  
      const response = await fetch(fetchUrl, {  
        method: "POST",  
        headers,  
        body: JSON.stringify(payload),  
      });  
  
      if (!response.ok) {  
        throw new Error("API error: " + (await response.text()));  
      }  
      const data = await response.json();  
      const gptContent =  
        data.choices && data.choices[0] && data.choices[0].message  
          ? data.choices[0].message.content  
          : "[No response from GPT model]";  
  
      setConversation((prev) => [  
        ...prev,  
        { sender: "assistant", content: gptContent },  
      ]);  
    } catch (error) {  
      setConversation((prev) => [  
        ...prev,  
        { sender: "assistant", content: `[Error] ${error.message}` },  
      ]);  
    } finally {  
      setIsLoading(false);  
      setUserInput("");  
      setTimeout(() => {  
        conversationRef.current?.scrollTo(0, conversationRef.current.scrollHeight);  
      }, 50);  
    }  
  };  
  
  // Handle Enter key in input box  
  const handleInputKeyDown = (e) => {  
    if (e.key === "Enter" && !e.shiftKey && !isLoading) {  
      e.preventDefault();  
      sendMessage();  
    }  
  };  
  
  // --- RENDER ---  
  return (  
    <div style={{  
      display: "flex",  
      height: "100vh",  
      fontFamily: "sans-serif",  
      background: "#f4f4f4"  
    }}>  
      {/* Left panel 1/4th */}  
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
            onChange={e => setUrl(e.target.value)}  
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
            onChange={e => setApiKey(e.target.value)}  
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
            onChange={e => setModel(e.target.value)}  
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
            onChange={e => setApiVersion(e.target.value)}  
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
  
      {/* Right panel 3/4th */}  
      <div style={{  
        flex: "3 0 0",  
        display: "flex",  
        flexDirection: "column",  
        padding: "2rem 2rem 1rem 2rem",  
        minWidth: 0  
      }}>  
        {/* Conversation box */}  
        <div  
          ref={conversationRef}  
          style={{  
            flex: "1 1 0",  
            background: "#fff",  
            borderRadius: 8,  
            border: "1.5px solid #ddd",  
            padding: "1.2em",  
            overflowY: "auto",  
            marginBottom: "1.5rem",  
            fontSize: "1rem",  
            lineHeight: 1.55,  
            boxShadow: "0 2px 8px 0 #0001"  
          }}  
        >  
          {conversation.map((msg, i) => (  
            <div  
              key={i}  
              style={{  
                marginBottom: 10,  
                textAlign: msg.sender === "user" ? "right" : "left"  
              }}  
            >  
              <span  
                style={{  
                  color: msg.sender === "user"  
                    ? "#569df7"  
                    : msg.sender === "assistant"  
                    ? "#4caf50"  
                    : "#8e44ad",  
                  marginRight: 5,  
                  fontWeight: 500  
                }}  
              >  
                {msg.sender === "user"  
                  ? "You"  
                  : msg.sender === "assistant"  
                  ? "GPT"  
                  : "System"}  
                :  
              </span>  
              <span  
                style={{whiteSpace:"pre-wrap"}}  
              >  
                {msg.content}  
              </span>  
            </div>  
          ))}  
        </div>  
  
        {/* Input panel at bottom */}  
        <form  
          onSubmit={e => {  
            e.preventDefault();  
            if (!isLoading) sendMessage();  
          }}  
          style={{  
            display: "flex",  
            alignItems: "flex-end",  
            gap: "1rem"  
          }}  
        >  
          {/* Max size input (smaller) */}  
          <div style={{display:"flex", flexDirection:"column", width: 100}}>  
            <label  
              style={{  
                fontWeight: 500,  
                marginBottom: 4,  
                fontSize: "0.95em"  
              }}  
            >Max size</label>  
            <input  
              type="number"  
              value={maxTokens}  
              min="16"  
              max="4096"  
              onChange={e => setMaxTokens(e.target.value)}  
              style={{  
                minWidth: 0,  
                padding: "0.5em",  
                border: "1px solid #aaa",  
                borderRadius: 4,  
                background: "#fafbfc"  
              }}  
            />  
          </div>  
          {/* User message input */}  
          <textarea  
            rows={2}  
            value={userInput}  
            disabled={isLoading}  
            onChange={e => setUserInput(e.target.value)}  
            onKeyDown={handleInputKeyDown}  
            placeholder="Your message (shift+enter for newline)..."  
            style={{  
              flex: "1 1 0",  
              padding: "0.8em",  
              border: "1.5px solid #bbb",  
              borderRadius: 6,  
              resize: "none",  
              fontSize: "1rem"  
            }}  
            autoFocus  
          />  
          {/* Enter button */}  
          <button  
            type="submit"  
            disabled={isLoading || !userInput.trim()}  
            style={{  
              marginLeft: 4,  
              padding: "0.85em 1.8em",  
              borderRadius: 6,  
              border: "none",  
              background: isLoading ? "#bbb" : "#0073fa",  
              color: "#fff",  
              fontSize: "1rem",  
              fontWeight: 700,  
              cursor: isLoading ? "default" : "pointer",  
              transition: "background 0.15s"  
            }}  
          >  
            {isLoading ? "Sending..." : "Enter"}  
          </button>  
        </form>  
      </div>  
    </div>  
  );  
};  
  
export default GptChat;  
