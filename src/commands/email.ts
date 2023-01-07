import {Command} from "../Command";
import {Client, CommandInteraction} from "discord.js";
import {openai, Train} from "../main";

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

        const response = await openai.createCompletion({
            model: "text-davinci-003",
            temperature: 0,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0,
            prompt: `${Train} Ecrit un long message destiné en soliloque dans un français soutenu sur le thème suivant : ${prompt.value}`,
            max_tokens: 1000
        });

        await interaction.editReply(response.data.choices[0].text ?? "error");
    }
};