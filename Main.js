import OpenAI from "./node_modules/openai";
let Context = "";
let Turns = 0;
let userInput = "";
let atitude = "";
let Total_Turns = 5;
const client = new OpenAI({apiKey : "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", dangerouslyAllowBrowser: true  });
async function NewInput() {
    
    if (Turns >= 5) {
        atitude = "The Narrator, MUST END THE HISTORY IN THIS IMPUT, DECIDING VICTORY, OR DEFEAT FOR THE USER"
    }
    else {
        atitude = "The history UNDER NO CIRCUNSTANTE can END, VICTORY and DEFEAT ARE IMPOSSIBLE, ALL RESPONSES MUST INCLUDE SOMETHING THAT LEADS TO ANOTHER USER INPUT, NEVER DECIDE HOW THE USER REACTS, sometimes make the result be extremely unexpected"
    }
}

let turners = 0; 

async function fetchAIResponse() {
    try {
        const userInput = document.getElementById("Input").value; // Get user input
        const context = document.getElementById("Output").value; // Get current context
        
        const totalTurns = 5; // Set total turns
        
        const response = await fetch("/.netlify/functions/openai", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ 
                userInput, 
                context, 
                turns: turners,
                totalTurns
            }),
        });

        turners += 1;

        const data = await response.json();
        const output = data.output

        // Update the output UI
        document.getElementById("Output").value += "Você: " + userInput + "\n" + "\n" + "Narrador: " + output + "\n" + "\n";
        document.getElementById("TurnsLeft").innerText = `You have ${totalTurns - turners} Turns Left`;
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
