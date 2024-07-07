import { ActivityType, Client } from 'discord.js';
import { config } from '../resources/config';
import { handleSlashCommands, handleTextCommands } from '../resources/handle_commands';
import { deploySlashCommands } from '../resources/deploy_slash_commands';

export const DiscordClient = new Client({ // create a new Discord client for the bot
    intents: config.intents
});

DiscordClient.once("ready", () => {
    console.log(`Logged in as ${DiscordClient.user?.tag}`);
    DiscordClient.user?.setActivity({ name: "Ready", type: ActivityType.Playing })
    // deploySlashCommands({ guildId: YOUR_DEV_SERVER_ID}); // Uncomment this line to re-register slash commands to your development server
});

DiscordClient.on("guildCreate", async (guild) => {
    console.log(`Joined a new guild: ${guild.name}`);
    deploySlashCommands({ guildId: guild.id }); // Register slash commands for the new guild
});

DiscordClient.on("guildDelete", async (guild) => {
    console.log(`Left a guild: ${guild.name}`);
});

DiscordClient.on("messageCreate", async (message) => { // Handle text commands
    await handleTextCommands(message);
});

DiscordClient.on("interactionCreate", async (interaction) => { // Handle slash commands
    await handleSlashCommands(interaction);
});

DiscordClient.login(config.DISCORD_TOKEN);