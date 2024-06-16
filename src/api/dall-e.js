export const dallEApiCall = async newMessages => {
  try {
    const response = await fetch('http://192.168.1.26:3000/dalle', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userMessage: newMessages,
      }),
    });

    let responseData = await response.json();
    return responseData;
  } catch (err) {
    console.log('Error fetching data ! ', err.message);
  }
};
