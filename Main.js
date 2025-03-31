async function fetchAIResponse() {
  try {
    const response = await fetch("/.netlify/functions/openai", {
      method: "POST",
    });

    const data = await response.json();
    console.log("OpenAI Response:", data);
  } catch (error) {
    console.error("Error calling Netlify function:", error);
  } finally {
    // Call again after 5 seconds
    setTimeout(fetchAIResponse, 500);
  }
}


fetchAIResponse();
