import {Client, Interaction, CommandInteraction} from "discord.js";
import {CommandRegisterer} from "../Command";

export default (client: Client): void => {
    client.on("interactionCreate", async (interaction: Interaction) => {

        if (interaction.isCommand() || interaction.isContextMenuCommand()) {
            await handleSlashCommand(client, interaction);
        }
    });
};

const handleSlashCommand = async (client: Client, interaction: CommandInteraction): Promise<void> => {
    const slashCommand = CommandRegisterer.getCommands.find(c => c.name === interaction.commandName);
    if (!slashCommand) {
        await interaction.followUp({ content: "An error has occurred" });
        return;
    }

    slashCommand.run(client, interaction);
};