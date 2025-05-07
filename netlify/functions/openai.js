import { Configuration, OpenAIApi } from "openai";

// Get the API key from environment variables
const API_KEY = process.env.API_KEY;

// Initialize OpenAI API
const openai = new Configuration({
    apiKey: API_KEY
});


// Function to handle the request
export async function handler(event) {
    // Only handle POST requests
    if (event.httpMethod !== "POST") {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Invalid request method. Use POST." })
        };
    }

    // Parse request body
    let requestBody;
    try {
        requestBody = JSON.parse(event.body);
    } catch (error) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Invalid JSON request body" })
        };
    }

    // Destructure prompt from the request body
    const { userInput, context, turns, totalTurns } = requestBody;
    
    // Initialize attitude and check if the history should end
    let attitude = "";
    if (turns >= totalTurns) {
        attitude = "The Narrator, MUST END THE STORY IN THIS INPUT, DECIDING VICTORY OR DEFEAT FOR THE USER";
    } else {
        attitude = "The history UNDER NO CIRCUMSTANCES can END, VICTORY and DEFEAT ARE IMPOSSIBLE, ALL RESPONSES MUST INCLUDE SOMETHING THAT LEADS TO ANOTHER USER INPUT, NEVER DECIDE HOW THE USER REACTS, sometimes make the result be extremely unexpected";
    }

    // Prepare OpenAI request data
    try {
        const completion = await openai.chat.completions.create({
            model: "ft:gpt-4o-mini-2024-07-18:masters-mercy-mm:adreeu:BEb4ivBd",
            messages: [
                { 
                    role: "system", 
                    content: attitude,
                },
                {
                    role: "developer",
                    content: "Keep the history consistent with: " + context + " but make sure that no enemy is unbeatable, and no victory is easy.",
                },
                {
                    role: "user",
                    content: userInput,
                },
            ],
            export completion;
        });

        // Prepare the output
        const output = completion.choices[0].message.content;
        context += output; // Update context
        turns += 1; // Increment turns
        
        return {
            statusCode: 200,
            body: JSON.stringify({
                output,
                context,
                turns,
                totalTurns
            })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
}
