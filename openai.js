import { Configuration, OpenAIApi } from "./node_modules/openai/index";

const configuration = new Configuration({
    apiKey: process.env.API_KEY
});

const openai = new OpenAIApi(configuration);

export default openai;
