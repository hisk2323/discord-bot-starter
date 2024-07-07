import { Permission } from "../resources/enums";
import { TextCommand } from "../resources/interfaces";

export const ping: TextCommand = {
    name: 'ping',
    description: 'Replies with Pong!',
    execute: (client, message, args) => {
        message.reply('Pong!');
    },
    permissions: Permission.USER,
    aliases: ['pong']
};
