async function fetchAIResponse() {
  try {
    const response = await fetch("/.netlify/functions/openai.js", {
      method: "POST",
      request 
    });
    fetchAIResponse();
  }
}
fetchAIResponse();

  
