let turners = 0;
const totalTurns = 5;

async function fetchAIResponse() {
    try {
        const userInput = document.getElementById("Input").value;
        const context = document.getElementById("Output").value;

        const response = await fetch("http://localhost:3000/openai", {
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

        const data = await response.json();
        console.log(data);

        if (data.error) {
            throw new Error(data.error);
        }

        const output = data.output;

        document.getElementById("Output").value += 
            "Você: " + userInput + "\n\n" + 
            "Narrador: " + output + "\n\n";

        document.getElementById("TurnsLeft").innerText = 
            `You have ${totalTurns - ++turners} Turns Left`;

        document.getElementById("Input").value = ""; // Clear input

    } catch (error) {
        console.error("Error calling Netlify function:", error);
        alert("Houve um erro ao tentar continuar a história.");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("form").addEventListener("submit", (event) => {
        event.preventDefault();
        fetchAIResponse();
    });
});
