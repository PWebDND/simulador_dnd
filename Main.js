async function fetchAIResponse() {
  try {
    const response = await fetch("/.netlify/functions/openai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: "Say hello!" }), // You can customize the prompt here
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
    }

    const data = await response.json();
    console.log("OpenAI Response:", data);
  } catch (error) {
    console.error("Error calling Netlify function:", error);
  }
}

// Start calling the Netlify function every 5 seconds
setInterval(fetchAIResponse, 50); // You can adjust this interval time
