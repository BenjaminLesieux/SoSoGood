import {Command} from "../Command";
import {Client, CommandInteraction} from "discord.js";
import {openai} from "../main";

export const MamacitaCommand: Command = {
    name: "mamacita",
    description: "demendez l'avis de soma sur une daronne (ou un daron)",
    type: 1, // chat input,
    options: [{
        name: "personne",
        description: "mamacita ou pas mamacita ?!",
        required: true,
        type: 3,
    }, {
        name: "qualité",
        description: "précise une de ses qualités",
        required: true,
        type: 3
    }],
    run: async (client: Client, interaction: CommandInteraction) => {

        if (!interaction.command) {
            return;
        }

        const prompt = interaction.options.get("personne");
        const quality = interaction.options.get("qualité");

        if (!prompt || !prompt.value) return;

        await interaction.reply("voyons ce que mon esprit pense de: " + prompt.value + "...");

        const response = await openai.createCompletion({
            model: "text-davinci-003",
            temperature: 0,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0,
            prompt: `Tu es une personne qui ne parle qu'en français soutenu. Complimente le plus possible une personne s'appellant ${prompt.value} avec la qualité suivante ${quality.value}.`,
            max_tokens: 500
        });

        await interaction.editReply(response.data.choices[0].text ?? "error");
        console.log(response.data.choices[0].text);
    }
}