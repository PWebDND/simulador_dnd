import OpenAI from "./openai";
let Context = "";
let Turns = 0;
let userInput = "";
let atitude = "";
let Total_Turns = 5;
const API_KEY = process.env.API;
const client = new OpenAI({apiKey : API_KEY, dangerouslyAllowBrowser: true  });
async function NewInput() {
    
    if (Turns >= 5) {
        atitude = "The Narrator, MUST END THE HISTORY IN THIS IMPUT, DECIDING VICTORY, OR DEFEAT FOR THE USER"
    }
    else {
        atitude = "The history UNDER NO CIRCUNSTANTE can END, VICTORY and DEFEAT ARE IMPOSSIBLE, ALL RESPONSES MUST INCLUDE SOMETHING THAT LEADS TO ANOTHER USER INPUT, NEVER DECIDE HOW THE USER REACTS, sometimes make the result be extremely unexpected"
    }

    if (Turns >= 5) {
        userInput = "Desculpe, mas não posso continuar mais essa história. É hora de dizer adeus, eu venci?"
    }
    else {
        userInput = document.getElementById("Input").value;
    }
    const completion = await client.chat.completions.create({
        model: "ft:gpt-4o-mini-2024-07-18:masters-mercy-mm:adreeu:BEb4ivBd",
        messages: [
            { 
                role: "system", 
                content: atitude,
            },
            {
                role: "developer",
                content: "Keep the history consistent with:" + Context + "but make sure that no enemy is unbeatable, and no victory is easy.",
            },
            {
                role: "user",
                content: userInput,
            },
        ],
    });


    const output = completion.choices[0].message.content;
    
    Context += output;
    Turns += 1;
   
    console.log(Turns);
    document.getElementById("Output").value += "Você: " + userInput + "\n" + "\n" + "Narrador: " +output + "\n" + "\n" ;
};




document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("form").addEventListener("submit", (event) => {
        event.preventDefault(); 
        NewInput();
        console.log("You have " + (Total_Turns - Turns)  + " Turns Left");
        document.getElementById("TurnsLeft").innerText = "You have " + (Total_Turns - Turns) + " Turns Left";
    });
});
