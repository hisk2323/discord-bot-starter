import { Client, CommandInteraction, Message, SlashCommandBuilder, SlashCommandSubcommandsOnlyBuilder } from 'discord.js';
import { Permission } from './enums';

export interface TextCommand {
    name: string;
    description: string;
    execute: (client: Client, message: Message, args: string[]) => void;
    permissions?: Permission;
    aliases: string[];
}

export interface SlashCommand {
    data:
    | Omit<SlashCommandBuilder, "addSubcommandGroup" | "addSubcommand">
    | SlashCommandSubcommandsOnlyBuilder;
    execute: (interaction: CommandInteraction) => Promise<void>;
  }