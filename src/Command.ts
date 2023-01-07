import {ChatInputApplicationCommandData, Client, CommandInteraction} from "discord.js";

export interface Command extends ChatInputApplicationCommandData {
    run: (client: Client, interaction: CommandInteraction) => void;
}

export class CommandRegisterer {
    private static commands: Command[] = [];

    static get getCommands() {
        return this.commands;
    }

    static registerCommands(_commands: Command[]) {
        this.commands.push(..._commands);
    }
}