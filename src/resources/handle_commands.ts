import { Interaction, Message, PermissionsBitField } from "discord.js";
import { TextCommandsList } from "../text_commands";
import { config } from "./config";
import { TextCommand, SlashCommand } from "./interfaces";
import { Permission } from "./enums";
import { DiscordClient } from "../main";
import { slashCommandsList } from "../slash_commands";

export async function handleTextCommands(message: Message) { // handle text commands
    if (message.author.bot) return;

    if (message.content.indexOf(config.PREFIX) !== 0) return; // If the message does not start with the prefix, return

    message.channel.sendTyping();
    const args = message.content.slice(config.PREFIX.length).trim().split(/ +/); // get any arguments from the message
    const command = args.shift()?.toLowerCase(); // get the command from the message
    if (command == undefined) return;
    // check if command exists (including aliases), and if so, execute it
    const textCommand = TextCommandsList.find((textCommand) => textCommand.name.toLowerCase() === command) || TextCommandsList.find((textCommand) => textCommand.aliases.includes(command));
    if (textCommand) {
        const permission = handlePermissions(textCommand, message);
        if (!permission) return;
        return textCommand.execute(DiscordClient, message, args);
    }
}

export async function handleSlashCommands(interaction: Interaction) {
    if (!interaction.isCommand()) return;
    interaction.channel?.sendTyping();
    const { commandName } = interaction;
    // check if the command exists, and if so execute it
    const command = slashCommandsList.find((command) => command.data.name === commandName);
    if (command) {
        const permission = handlePermissions(command, interaction);
        if (!permission) return;
        interaction.channel?.sendTyping();
        return command.execute(interaction);
    }
}

function handlePermissions(command: TextCommand | SlashCommand, context: Message | Interaction): boolean {
    // Function to check permissions safely for both text and slash commands
    const hasPermission = (memberPermissions: any, permission: bigint): boolean => {
        if (memberPermissions instanceof PermissionsBitField) {
            return memberPermissions.has(permission);
        }
        return false;
    };

    if (command.permissions === Permission.DEVELOPER) {
        if (context instanceof Message) {
            return context.author.id === config.DEVELOPER_ID;
        } else {
            return context.user.id === config.DEVELOPER_ID;
        }
    } else if (command.permissions === Permission.ADMINISTRATOR) {
        if (context instanceof Message) {
            return context.member?.permissions.has(PermissionsBitField.Flags.Administrator) ?? false;
        } else {
            return hasPermission(context.member?.permissions, PermissionsBitField.Flags.Administrator);
        }
    } else if (command.permissions === Permission.MODERATOR) {
        if (context instanceof Message) {
            return context.member?.permissions.has(PermissionsBitField.Flags.MuteMembers) ?? false;
        } else {
            return hasPermission(context.member?.permissions, PermissionsBitField.Flags.MuteMembers);
        }
    } else if (command.permissions === Permission.USER || command.permissions === undefined) { // Permissions are an optional property - so we assume if none is provided, it is a user command
        return true;
    }
    return false;
}

