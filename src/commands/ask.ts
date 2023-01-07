import {Command} from "../Command";
import {Client, CommandInteraction} from "discord.js";
import {openai, Train} from "../main";
import {SomaService} from "../service/SomaService";

export const AskCommand: Command = {
    name: "ask",
    description: "demandez quelque chose à soma, il a réponse à tout",
    type: 1, // chat input,
    options: [{
        name: "question",
        description: "quelle est ta question ?",
        required: true,
        type: 3,
    }],
    run: async (client: Client, interaction: CommandInteraction) => {

        if (!interaction.command) {
            return;
        }

        const question = interaction.options.get("question");

        if (!question || !question.value) return;

        await interaction.deferReply();

        const [data, error] = await SomaService.prompt(
            `Peux-tu répondre à la demande chatgpt suivante : ${question.value}`
        );

        if (error) {
            await interaction.editReply("Une erreur m'a empêchée de converser avec mon intellect.");
            return;
        }

        if (data) await interaction.editReply(data);
    }
}