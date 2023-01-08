import {Command} from "../Command";
import {Client, CommandInteraction} from "discord.js";
import {SomaService} from "../service/SomaService";

export const DrunkifyCommand: Command = {
    name: "drunkify",
    description: "écrivez comme diego en rentrant de soirée",
    type: 1, // chat input,
    options: [{
        name: "message",
        description: "le message à transformer",
        required: true,
        type: 3,
    }],
    run: async (client: Client, interaction: CommandInteraction) => {

        if (!interaction.command) {
            return;
        }

        const message = interaction.options.get("message");

        if (!message || !message.value) return;

        await interaction.reply(SomaService.drunkify(message.value as string));
    }
}