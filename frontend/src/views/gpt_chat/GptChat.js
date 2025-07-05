import React, { createRef, Component } from "react";
import LeftPanel from "./LeftPanel";
import RightPanel from "./RightPanel";

class GptChat extends Component {  
    constructor(props) {  
        super(props);  
        this.state = {  
            url: "https://mfile-m2rrsgne-swedencentral.openai.azure.com/",  
            apiKey: "",  
            model: "gpt-4.1",  
            apiVersion: "2025-01-01-preview",  
            maxTokens: "512",  
            conversation: [  
                { sender: "system", content: "Welcome! Start the conversation below." }  
            ],  
            userInput: "",  
            isLoading: false  
        };  
        this.conversationRef = createRef();  
    }  
  
    handleLeftPanelChange = (field, value) => {  
        this.setState({ [field]: value });  
    };  
  
    handleUserInputChange = (e) => {  
        this.setState({ userInput: e.target.value });  
    };  
  
    handleMaxTokensChange = (e) => {  
        this.setState({ maxTokens: e.target.value });  
    };  
  
    handleInputKeyDown = (e) => {  
        if (e.key === "Enter" && !e.shiftKey && !this.state.isLoading) {  
            e.preventDefault();  
            this.sendMessage();  
        }  
    };  
  
    sendMessage = async () => {  
        const { userInput, conversation, url, apiKey, model, apiVersion, maxTokens } = this.state;  
        if (!userInput.trim()) return;  
        this.setState({ isLoading: true });  
  
        const updatedConversation = [  
            ...conversation,  
            { sender: "user", content: userInput }  
        ];  
        this.setState({ conversation: updatedConversation });  
  
        try {  
            const payload = {  
                model,  
                messages: updatedConversation  
                .filter(x => x.sender !== "system")  
                .map(m => ({  
                    role: m.sender,  
                    content: m.content  
                })),  
                max_tokens: parseInt(maxTokens) || 512,  
            };  
  
            const headers = {  
                "Content-Type": "application/json",  
                Authorization: `Bearer ${apiKey.trim()}`  
            };  
  
            let finalUrl = url.trim() + "openai/deployments/" + model + "/chat/completions?api-version=" + apiVersion;
            console.log(finalUrl);
            console.log(headers);
            console.log(payload);
            const response = await fetch(finalUrl, {  
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
  
            this.setState(prev => ({  
                conversation: [  
                ...prev.conversation,  
                { sender: "assistant", content: gptContent }  
                ]  
            }));  
        } catch (error) {  
            this.setState(prev => ({  
                conversation: [  
                ...prev.conversation,  
                { sender: "assistant", content: `[Error] ${error.message}` }  
                ]  
            }));  
        } finally {  
            this.setState({ isLoading: false, userInput: "" }, () => {  
                setTimeout(() => {  
                this.conversationRef.current?.scrollTo(0, this.conversationRef.current.scrollHeight);  
                }, 50);  
            });  
        }  
    };  
  
    render() {  
        const {  
            url, apiKey, model, apiVersion,  
            conversation, userInput, isLoading, maxTokens  
        } = this.state;  
        return (  
            <div style={{  
                display: "flex",  
                height: "100vh",  
                fontFamily: "sans-serif",  
                background: "#f4f4f4"  
            }}>  
                <LeftPanel  
                url={url}  
                apiKey={apiKey}  
                model={model}  
                apiVersion={apiVersion}  
                onChange={this.handleLeftPanelChange}  
                />  
                <RightPanel  
                conversation={conversation}  
                conversationRef={this.conversationRef}  
                userInput={userInput}  
                isLoading={isLoading}  
                maxTokens={maxTokens}  
                onInputChange={this.handleUserInputChange}  
                onMaxTokensChange={this.handleMaxTokensChange}  
                onInputKeyDown={this.handleInputKeyDown}  
                onSend={this.sendMessage}  
                />  
            </div>  
        );  
    }  
}  
  
export default GptChat; 