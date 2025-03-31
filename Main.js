async function fetchAIResponse() {
  
    const response = await fetch("/.netlify/functions/openai.js", {
      method: "POST",
      request 
    });
    fetchAIResponse();
  
}
fetchAIResponse();

  
