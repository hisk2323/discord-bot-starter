import dotenv from 'dotenv';
import { GatewayIntentBits } from 'discord.js';

// Configuration for the bot

dotenv.config();

const { DISCORD_TOKEN, DISCORD_CLIENT_ID, PREFIX, DEVELOPER_ID } = process.env;

const intents = [ // This is a basic set of intents that should be perfectly fine for most use cases - but can be adjusted as needed
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageReactions,
];

if (!DISCORD_TOKEN || !DISCORD_CLIENT_ID || !PREFIX || !DEVELOPER_ID) { // Check if needed config parameters are present
    throw new Error('Missing environment variables');
}

export const config = { // Export the config if all looks good
    DISCORD_TOKEN,
    DISCORD_CLIENT_ID,
    PREFIX,
    intents,
    DEVELOPER_ID
}
