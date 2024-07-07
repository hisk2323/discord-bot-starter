# Slash Commands

Slash commands must be registered per server using the Discord API. An  example method for this exists in `src/resources/deploy_slash_commands.ts`. 

When you create a new slash command, you will need to register it to your server before you can test it. This can be done by uncommenting line 13 in `src/main/index.ts`.