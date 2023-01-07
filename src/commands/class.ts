import {Command} from "../Command";
import {Client, CommandInteraction} from "discord.js";
import {SomaService} from "../service/SomaService";

export const ClassCommand: Command = {
    name: "class",
    description: "créez une nouvelle matière pour le module de communication",
    type: 1, // chat input,
    options: [{
        name: "thème",
        description: "petit thème général histoire de guider mon génie !",
        required: true,
        type: 3,
    }],
    run: async (client: Client, interaction: CommandInteraction) => {

        if (!interaction.command) {
            return;
        }

        const prompt = interaction.options.get("thème");

        if (!prompt || !prompt.value) return;

        await interaction.deferReply();

        const [data, error] = await SomaService.prompt(
            `Trouve le nom d'une matière pour un cursus éducatif sur le thème de ${prompt.value}`,
            30,
            false
        );

        if (error) {
            await interaction.editReply("Une erreur m'a empêchée de converser avec mon intellect.");
            return;
        }

        if (data) await interaction.editReply(data);
    }
};