import { fileURLToPath } from 'url';
import express from "express";
import OpenAI from "openai";
import bodyParser from "body-parser";
import path from "path"; // Importar o módulo 'path' para manipular caminhos de arquivos

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const app = express();
const port = 3000;

const openai = new OpenAI({
    apiKey: "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", // Substitua com sua chave de API OpenAI
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(bodyParser.json());


app.post("/openai", async (req, res) => {
    try {
        const { userInput, context, turns, totalTurns } = req.body;

        let attitude = turns >= totalTurns
            ? "The Narrator, MUST END THE HISTORY IN THIS INPUT, DECIDING VICTORY OR DEFEAT FOR THE USER"
            : "The history UNDER NO CIRCUMSTANCES can END, VICTORY and DEFEAT ARE IMPOSSIBLE, ALL RESPONSES MUST INCLUDE SOMETHING THAT LEADS TO ANOTHER USER INPUT.";

        const completion = await openai.chat.completions.create({
            model: "ft:gpt-4o-mini-2024-07-18:mee::BWNW57FP", // Substitua pelo seu modelo OpenAI
            messages: [
                { role: "system", content: attitude },
                { role: "user", content: userInput },
                { role: "developer", content: "Ensure consistency in the narrative." },
            ],
        });

        console.log("Resposta da OpenAI:", completion); // Logando a resposta completa da OpenAI

        const output = completion.choices[0].message.content;
        res.json({ output, context: context + output, turns: turns + 1 });
    } catch (error) {
        console.error("Erro ao chamar a API da OpenAI:", error); // Logando o erro detalhado
        res.status(500).json({ error: "Erro ao chamar OpenAI." });
    }
});


// Servir arquivos estáticos (como CSS, JS)
app.use(express.static(path.join(__dirname)));

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
