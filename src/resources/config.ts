import dotenv from 'dotenv';
import { GatewayIntentBits } from 'discord.js';

dotenv.config();

const { DISCORD_TOKEN, DISCORD_CLIENT_ID, PREFIX, DEVELOPER_ID } = process.env;

const intents = [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageReactions,
];

if (!DISCORD_TOKEN || !DISCORD_CLIENT_ID || !PREFIX || !DEVELOPER_ID) {
    throw new Error('Missing environment variables');
}

export const config = {
    DISCORD_TOKEN,
    DISCORD_CLIENT_ID,
    PREFIX,
    intents,
    DEVELOPER_ID
}
