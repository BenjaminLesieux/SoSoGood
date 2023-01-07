import {Client} from "discord.js";
import interactionsCreate from './listeners/interactionsCreate';
import ready from "./listeners/ready";
import {Configuration, OpenAIApi} from "openai";

const dotenv = require("dotenv");

console.log("Soma se réveille")
dotenv.config();

const discordToken = process.env.DISCORD_TOKEN;
const openAPIToken = process.env.OPENAPI_KEY;

const configuration = new Configuration({
    apiKey: openAPIToken,
});
export const openai = new OpenAIApi(configuration);

const client = new Client({
    intents: [],
});

client.login(discordToken).then(() => {
    ready(client);
    interactionsCreate(client);
});