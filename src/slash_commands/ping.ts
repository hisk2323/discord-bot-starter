// Basic slash command for testing purposes

import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { SlashCommand } from "../resources/interfaces";

export const ping: SlashCommand = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Replies with Pong!"),
    execute: async (interaction: CommandInteraction) => {
        interaction.reply('Pong!');
        return;
    }
}