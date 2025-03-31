async function fetchAIResponse() {
  
    const response = await fetch("/.netlify/functions/openai.js", {
      method: "POST",
    });
    fetchAIResponse();
  
}
fetchAIResponse();

  
