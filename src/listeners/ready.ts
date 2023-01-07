import {Client, Interaction} from "discord.js";
import {CommandRegisterer} from "../Command";
import {EmailCommand} from "../commands/email";

export default (client: Client): void => {
    client.on("ready", async () => {
        if (!client.user || !client.application) {
            return;
        }

        console.log("Chargement des commandes");

        CommandRegisterer.registerCommands([EmailCommand]);
        await client.application.commands.set(CommandRegisterer.getCommands);

        console.log(client.application.commands)

        console.log("Soma est connecté !");
    });
};