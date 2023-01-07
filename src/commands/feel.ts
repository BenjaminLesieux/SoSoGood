import {Command} from "../Command";
import {Client, CommandInteraction} from "discord.js";
import {openai} from "../main";

export const FeelCommand: Command = {
    name: "feel",
    description: "décrire l'émotion d'un message",
    type: 1, // chat input,
    options: [],
    run: async (client: Client, interaction: CommandInteraction) => {
        if (!interaction.command) {
            return;
        }

        await interaction.reply("en production...");
    }
};