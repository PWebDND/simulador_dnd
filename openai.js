import { Configuration, OpenAIApi } from ".netlify/functions/openai";

const configuration = new Configuration({
    apiKey: process.env.API_KEY
});

const openai = new OpenAIApi(configuration);

export default openai;
