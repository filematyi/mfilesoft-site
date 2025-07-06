async function sendGptMessage({  
    userInput,
    conversation,
    url,
    apiKey,
    model,
    apiVersion,
    maxTokens
}) {  
    if (!userInput.trim()) return;  

    conversation = [  
        ...conversation,  
        { sender: "user", content: userInput }  
    ];

    try {  
        const payload = {  
            model,  
            messages: conversation  
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
        
        conversation = [  
            ...conversation,  
            { sender: "assistant", content: gptContent }  
        ];
    } catch (error) {
        conversation = [  
            ...conversation,  
            { sender: "assistant", content: `[Error] ${error.message}` }
        ];  
    }
    return conversation;
};

export default sendGptMessage;