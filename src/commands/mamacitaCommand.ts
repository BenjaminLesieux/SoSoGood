import {Command} from "../Command";
import {Client, CommandInteraction} from "discord.js";
import {openai, Train} from "../main";
import {SomaService} from "../service/SomaService";

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

        await interaction.deferReply();

        const [data, error] = await SomaService.prompt(
            `Complimente le plus possible une personne s'appellant ${prompt.value} avec la qualité suivante ${quality.value}.`
        );

        if (error) {
            await interaction.editReply("Une erreur m'a empêchée de converser avec mon intellect.");
            return;
        }

        if (data) await interaction.editReply(data);
    }
}