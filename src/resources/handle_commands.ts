import { Interaction, Message, PermissionsBitField } from "discord.js";
import { TextCommandsList } from "../text_commands";
import { config } from "./config";
import { TextCommand } from "./interfaces";
import { Permission } from "./enums";
import { DiscordClient } from "../main";
import { slashCommandsList } from "../slash_commands";

export async function handleTextCommands(message: Message) {
    if (message.author.bot) return;

    if (message.content.indexOf(config.PREFIX) !== 0) return;

    message.channel.sendTyping();
    const args = message.content.slice(config.PREFIX.length).trim().split(/ +/); // get any arguments from the message
    const command = args.shift()?.toLowerCase(); // get the command from the message
    if (command == undefined) return;
    // check if command exists, and if so, execute it
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
        interaction.channel?.sendTyping();
        return command.execute(interaction);
    }
}

function handlePermissions(command: TextCommand, message: Message): boolean {
    if (command.permissions === Permission.DEVELOPER) {
        return message.author.id === config.DEVELOPER_ID;
    } else if (command.permissions === Permission.ADMINISTRATOR) {
        return message.member?.permissions.has(PermissionsBitField.Flags.Administrator) ?? false;
    } else if (command.permissions === Permission.MODERATOR) {
        return message.member?.permissions.has(PermissionsBitField.Flags.MuteMembers) ?? false;
    } else if (command.permissions === Permission.USER) {
        return true;
    }
    return false;
}
