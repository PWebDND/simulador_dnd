async function fetchAIResponse() {
    try {
        const userInput = document.getElementById("Input").value; // Get user input
        const context = document.getElementById("Output").value; // Get current context
        const turns = parseInt(document.getElementById("TurnsLeft").innerText.split(" ")[3], 10); // Get current turn count
        const totalTurns = 5; // Set total turns
        
        const response = await fetch("/.netlify/functions/openai", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ 
                userInput, 
                context, 
                turns, 
                totalTurns
            }),
        });

                const output = await fetch ("/.netlify/functions/openai",{completion.choices[0].message.content};
        

        // Update the output UI
        document.getElementById("Output").value += "Você: " + userInput + "\n" + "\n" + "Narrador: " + output + "\n" + "\n";
        document.getElementById("TurnsLeft").innerText = `You have ${totalTurns - updatedTurns} Turns Left`;
    } catch (error) {
        console.error("Error calling Netlify function:", error);
    }
}

// Start the loop
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("form").addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent the form from submitting
        fetchAIResponse(); // Call the AI function
    });
});
