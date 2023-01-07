import {Command} from "../Command";
import {Client, CommandInteraction} from "discord.js";
import {openai} from "../main";

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

        await interaction.reply("voyons ce que mon esprit pense de: " + question.value + "...");

        const response = await openai.createCompletion({
            model: "text-davinci-003",
            temperature: 0,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0,
            prompt: `En parlant dans un ancien français. Peux-tu répondre à la demande chatgpt suivante : ${question.value}`,
            max_tokens: 500
        });

        await interaction.editReply(response.data.choices[0].text ?? "error");
        console.log(response.data.choices[0].text);
    }
}