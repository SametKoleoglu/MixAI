export const geminiApiCall = async (newMessages) => {
    try{

        var filteredMessages = newMessages.filter((msg) => msg.role != 'model');

        const response = await fetch('http://192.168.1.26:3000/gemini', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userMessage: filteredMessages
            }),
        })

        let responseData = await response.json();
        console.log(responseData);
        return responseData;

    }catch(err){
        console.log("Error fetching data ! ", err.message);
    }
}