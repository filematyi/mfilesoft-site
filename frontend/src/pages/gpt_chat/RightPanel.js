import React, { Component } from "react";  


class RightPanel extends Component {  
    render() {  
      const {  
        conversation,  
        conversationRef,  
        userInput,  
        isLoading,  
        maxTokens,  
        onInputChange,  
        onMaxTokensChange,  
        onInputKeyDown,  
        onSend,  
      } = this.props;  
    
      return (  
        <div style={{  
          flex: "3 0 0",  
          display: "flex",  
          flexDirection: "column",  
          padding: "2rem 2rem 1rem 2rem",  
          minWidth: 0  
        }}>  
          {/* Conversation history */}  
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
                  }}>  
                  {msg.sender === "user"  
                    ? "You"  
                    : msg.sender === "assistant"  
                      ? "GPT"  
                      : "System"  
                  }  
                  :  
                </span>  
                <span style={{ whiteSpace: "pre-wrap" }}>  
                  {msg.content}  
                </span>  
              </div>  
            ))}  
          </div>  
          {/* Input area */}  
          <form  
            onSubmit={e => {  
              e.preventDefault();  
              if (!isLoading) onSend();  
            }}  
            style={{  
              display: "flex",  
              alignItems: "flex-end",  
              gap: "1rem"  
            }}  
          >  
            {/* Max size input */}  
            <div style={{ display: "flex", flexDirection: "column", width: 100 }}>  
              <label  
                style={{  
                  fontWeight: 500,  
                  marginBottom: 4,  
                  fontSize: "0.95em"  
                }}  
              >  
                Max size  
              </label>  
              <input  
                type="number"  
                value={maxTokens}  
                min="16"  
                max="4096"  
                onChange={onMaxTokensChange}  
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
              onChange={onInputChange}  
              onKeyDown={onInputKeyDown}  
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
      );  
    }  
  }

export default RightPanel; 