import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import express from "express";
import OpenAI from "openai";
import bodyParser from "body-parser";
import path from "path"; 

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const app = express();
const port = 3000;

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,  
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(bodyParser.json());


app.post("/openai", async (req, res) => {
    try {
        const { userInput, context, turns, totalTurns } = req.body;

        let systemMessage = `
            Você é um narrador de histórias interativas de fantasia com sarcasmo, humor ácido e uma criatividade sem limites. Você escreve como um autor profissional, com controle completo da estrutura narrativa: início, meio e fim.

            O jogador propõe ações, e você descreve o que acontece a seguir, interpretando tudo com sarcasmo ou deboche se desejar. O mundo pode conter elementos de fantasia, ficção científica, comédia ou absurdo, mas deve sempre seguir uma lógica interna coerente.

            Você nunca deve explicar o que está fazendo nem quebrar a quarta parede. Nunca diga que isso é um jogo ou peça novas instruções.

            Você deve SEMPRE respeitar o número máximo de turnos. Cada turno representa uma parte da história.

            Você DEVE manter consistência com os eventos anteriores. Nunca mude personagens, locais ou situações estabelecidas sem motivo dentro da história. Se o jogador menciona um ladrão, não substitua por um dragão. Mantenha o mundo coeso.


            ${turns + 1 >= totalTurns
                ? `ATENÇÃO: Este é o TURNO FINAL. Sua resposta deve conter o FIM da história. O conflito principal precisa ser resolvido, e o jogador deve terminar vitorioso ou derrotado. NÃO PODE haver dúvidas, perguntas abertas ou ganchos para continuação. Termine com uma frase final clara como: "Fim."`
                : `Este NÃO é o turno final. Sua resposta deve continuar a história, criando novas possibilidades e mantendo os conflitos em aberto. NÃO conclua a narrativa ainda.`}

            Exemplos de encerramento:
            - "Com a última baforada do dragão, tudo virou cinzas. Fim."
            - "Contra todas as probabilidades, você triunfa, mesmo que fedendo a enxofre. Fim."
            - "A criatura desaparece, e você fica sozinho com a sua glória... e uma multa por danos à floresta. Fim."
        `;

        const completion = await openai.chat.completions.create({
            model: "ft:gpt-4o-mini-2024-07-18:mee::BWNW57FP", 
            temperature: 0.7,
            messages: [
                { role: "system", content: systemMessage },
                { role: "assistant", content: context },
                { role: "user", content: userInput }
            ],
        });

        console.log("Resposta da OpenAI:", completion); 

        const output = completion.choices[0].message.content;
        const finished = turns + 1 >= totalTurns;
            res.json({
                output,
                context: context + output,
                turns: turns + 1,
                finished
            });
    } catch (error) {
        console.error("Erro ao chamar a API da OpenAI:", error); 
        res.status(500).json({ error: "Erro ao chamar OpenAI." });
    }
});



app.use(express.static(path.join(__dirname)));

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

