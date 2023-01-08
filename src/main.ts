import interactionsCreate from './listeners/interactionsCreate';
import ready from "./listeners/ready";
import {Configuration, OpenAIApi} from "openai";
import {SomaService} from "./service/SomaService";

const { Client, GatewayIntentBits } = require("discord.js");
const dotenv = require("dotenv");

console.log("Soma se réveille")
dotenv.config();

const discordToken = process.env.DISCORD_TOKEN;
const openAPIToken = process.env.OPENAPI_KEY;

export const Train = "En t'addressant comme si c'était un discours et utilise un maximum de figure de style.";

const configuration = new Configuration({
    apiKey: openAPIToken,
});
export const openai = new OpenAIApi(configuration);

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
    ]
});

client.login(discordToken).then(() => {
    SomaService.drunkify("Je suis bourré");
    ready(client);
    interactionsCreate(client);
});