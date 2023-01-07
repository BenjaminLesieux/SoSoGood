import {Command} from "../Command";
import {Client, CommandInteraction} from "discord.js";
import {openai} from "../main";

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

        await interaction.reply("je compose...ce message sera modifié lorsque j'aurai fini de converser avec mon intellect...");

        const response = await openai.createCompletion({
            model: "text-davinci-003",
            temperature: 0,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0,
            prompt: `écrit un long email destiné aux élèves d'une école d'ingénieur en soliloque dans un ancien français avec un ton accusateur sur le thème ${prompt.value}`,
            max_tokens: 1000
        });

        await interaction.editReply(response.data.choices[0].text ?? "error");
        console.log(response.data.choices[0].text);
    }
};