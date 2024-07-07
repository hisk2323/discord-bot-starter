import { Client, CommandInteraction, Message, SlashCommandBuilder, SlashCommandSubcommandsOnlyBuilder } from 'discord.js';
import { Permission } from './enums';

export interface TextCommand { // Interface for text commands
    name: string;
    description: string;
    execute: (client: Client, message: Message, args: string[]) => void;
    permissions?: Permission;
    aliases: string[];
}

export interface SlashCommand { // Interface for slash commands
    data:
    | Omit<SlashCommandBuilder, "addSubcommandGroup" | "addSubcommand">
    | SlashCommandSubcommandsOnlyBuilder;
    execute: (interaction: CommandInteraction) => Promise<void>;
    permissions?: Permission;
}

// Note that permissions are optional for both types of commands. If you do not specify a permission, the command will be available to all users