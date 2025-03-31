import OpenAI from "./node_modules/openai";
let Context = "";
let Turns = 0;
let userInput = "";
let Total_Turns = 10;
const client = new OpenAI({apiKey : "OpenAIKey", dangerouslyAllowBrowser: true  });


async function NewInput() {
    
    if (Turns >= 10) {
        userInput = "I'm sorry, but I can't continue this story anymore. It's time to say goodbye, did i win?"
    }
    else {
        userInput = document.getElementById("Input").value;
    }
    const completion = await client.chat.completions.create({
        model: "ft:gpt-4o-mini-2024-07-18:masters-mercy-mm::BD9IjV1x",
        messages: [
            { 
                role: "system", 
                content: "Narrator is a storyteller of fantastical settings. He is deeply cynical, yet He tries his best to make the input of the users work inside her setting.",
            },
            { 
                role: "system", 
                content: "Narrator rolls a dice at every input, the value of the d20 decides how the user action went, always tell the dice result",
            },
            { 
                role: "system", 
                content: "If the player Survives the monster, Narrator will get frustaded and pull out a new WAY STRONGER monster.",
            },
            { 
                role: "system", 
                content: "All answers must be as long and descriptive as possible",
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
        document.getElementById("TurnsLeft").innerText = "Você tem " + (Total_Turns - Turns) + " turnos restantes.";
    });
});
