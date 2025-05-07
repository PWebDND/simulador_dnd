const { Configuration, OpenAIApi } = require("openai");

const API_KEY = process.env.API_KEY;

const config = new Configuration({
  apiKey: API_KEY,
});

const openai = new OpenAIApi(config);

exports.handler = async function (event, context) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Invalid request method. Use POST." }),
    };
  }

  let requestBody;
  try {
    requestBody = JSON.parse(event.body);
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Invalid JSON request body" }),
    };
  }

  const { userInput, context: ctx, turns, totalTurns } = requestBody;
  let attitude =
    turns >= totalTurns
      ? "The Narrator, MUST END THE STORY IN THIS INPUT, DECIDING VICTORY OR DEFEAT FOR THE USER"
      : "The history UNDER NO CIRCUMSTANCES can END, VICTORY and DEFEAT ARE IMPOSSIBLE, ALL RESPONSES MUST INCLUDE SOMETHING THAT LEADS TO ANOTHER USER INPUT, NEVER DECIDE HOW THE USER REACTS, sometimes make the result be extremely unexpected";

  try {
    const completion = await openai.createChatCompletion({
      model: "ft:gpt-4o-mini-2024-07-18:masters-mercy-mm:adreeu:BEb4ivBd",
      messages: [
        {
          role: "system",
          content: attitude,
        },
        {
          role: "developer",
          content:
            "Keep the history consistent with: " +
            ctx +
            " but make sure that no enemy is unbeatable, and no victory is easy.",
        },
        {
          role: "user",
          content: userInput,
        },
      ],
    });

    const output = completion.data.choices[0].message.content;
    const updatedContext = ctx + output;
    const updatedTurns = turns + 1;

    return {
      statusCode: 200,
      body: JSON.stringify({
        output,
        context: updatedContext,
        turns: updatedTurns,
        totalTurns,
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
