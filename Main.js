let turners = 0;
const totalTurns = 5;

function tentar() {
    turners = 0; // Resetar os turnos
    document.getElementById("Output").value = ""; 
    document.getElementById("Input").value = ""; 
    document.getElementById("TurnsLeft").innerText = `Você tem ${totalTurns} turnos restantes.`;
    document.getElementById("Input").disabled = false;
    document.getElementById("forn").style.display = "block";
    document.getElementById("tentarNovamente").style.display = "none";
}

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

        turners++;

        document.getElementById("TurnsLeft").innerText = 
            `Você tem ${totalTurns - turners} turno(s) restante(s).`;

        document.getElementById("Input").value = ""; 

        if (data.finished) {
            document.getElementById("TurnsLeft").innerText = "A história chegou ao fim.";
            document.getElementById("Input").disabled = true;
            document.getElementById("forn").style.display = "none";
            document.getElementById("tentarNovamente").style.display = "block";
        }

    } catch (error) {
        console.error("Erro ao chamar a API:", error);
        alert("Houve um erro ao tentar continuar a história.");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("form").addEventListener("submit", (event) => {
        event.preventDefault();
        fetchAIResponse();
    });
});

window.tentar = tentar;