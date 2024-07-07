import { REST, Routes } from "discord.js";
import { config } from "./config";
import { slashCommandsList } from "../slash_commands";

const commandsData = slashCommandsList.map((command) => command.data.toJSON());


const rest = new REST({ version: "10" }).setToken(config.DISCORD_TOKEN);

type DeployCommandsProps = {
    guildId: string;
}

export async function deploySlashCommands({ guildId }: DeployCommandsProps) { // Deploy all slash commands to the specified guild using the Discord REST API
    try {
        console.log("Started refreshing application (/) commands.");

        await rest.put(Routes.applicationGuildCommands(config.DISCORD_CLIENT_ID, guildId), {
            body: commandsData,
        });
        console.log("Successfully reloaded application (/) commands.");
    } catch (error) {
        console.error(error);
    }
}