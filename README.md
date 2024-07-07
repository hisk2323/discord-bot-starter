# Discord Bot Starter

This is a starter template that I use when playing around with a new Discord bot and I find it helps with getting up and running quickly. It provides an easy-to-follow structure and should help you get started easily!

## Features

- Easy setup and configuration
- Text command handling with customizable prefix
- Slash command handling
- Example commands for reference

## Prerequisites

Before getting started, it may help to be a little familiar with TypeScript. Additionally, you will need [NPM](https://www.npmjs.com) installed on your system. 

Additionally, before starting, you will need a Discord bot token. This can be created on the [Discord developer site](https://discord.com/developers/applications). Create a new application and add it to a server that you'd like to use for development and testing.

## Installation

1. Clone this repository to your local machine.
2. Navigate to the root directory of the project, and install the dependencies by running `npm install`.
3. Rename the `.env.example` file to `.env` and fill in the necessary info.
4. Customize the bot's prefix and other settings in the `config.ts` and `.env` files.
5. Start the bot by running `npm run dev`.

## Usage

Once the bot is running, you can invite it to your Discord server using the provided invite link. The bot will respond to commands prefixed with the configured prefix.

To add your own commands, simply create a new file in the `commands` directory and follow the existing command structure.

## Contributing

Contributions are welcome! If you have any suggestions or improvements, feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.
