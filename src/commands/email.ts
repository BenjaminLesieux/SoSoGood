import {Command} from "../Command";
import {Client, CommandInteraction} from "discord.js";
import {openai, Train} from "../main";
import {SomaService} from "../service/SomaService";

export const EmailCommand: Command = {
    name: "email",
    description: "écrivez un email comme soma",
    type: 1, // chat input,
    options: [{
        name: "prompt",
        description: "pour pouvoir dire à soma quel type d'email écrire !",
        required: true,
        type: 3,
    }],
    run: async (client: Client, interaction: CommandInteraction) => {

        if (!interaction.command) {
            return;
        }

        const prompt = interaction.options.get("prompt");

        if (!prompt || !prompt.value) return;

        await interaction.deferReply();

        const [data, error] = await SomaService.prompt(
            `Ecrit un long message destiné en soliloque dans un français soutenu sur le thème suivant : ${prompt.value}`
        );

        if (error) {
            await interaction.editReply("Une erreur m'a empêchée de converser avec mon intellect.");
            return;
        }

        if (data) await interaction.editReply(data);
    }
};