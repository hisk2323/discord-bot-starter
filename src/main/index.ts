import { ActivityType, Client } from 'discord.js';
import { config } from '../resources/config';
import { handleSlashCommands, handleTextCommands } from '../resources/handle_commands';
import { deploySlashCommands } from '../resources/deploy_slash_commands';

export const DiscordClient = new Client({
    intents: config.intents
});

DiscordClient.once("ready", () => {
    console.log(`Logged in as ${DiscordClient.user?.tag}`);
    DiscordClient.user?.setActivity({ name: "Ready", type: ActivityType.Playing })
    // deploySlashCommands({ guildId: YOUR_DEV_SERVER_ID}); // Update slash commands for the development server
});

DiscordClient.on("guildCreate", async (guild) => {
    console.log(`Joined a new guild: ${guild.name}`);
    deploySlashCommands({ guildId: guild.id }); // Register slash commands for the new guild
});

DiscordClient.on("guildDelete", async (guild) => {
    console.log(`Left a guild: ${guild.name}`);
});

DiscordClient.on("messageCreate", async (message) => {
    await handleTextCommands(message);
});

DiscordClient.on("interactionCreate", async (interaction) => { // handle slash commands
    await handleSlashCommands(interaction);
});

DiscordClient.login(config.DISCORD_TOKEN);