# Resources

This directory houses various resources that are used by the bot, including configuration, various enums and interfaces, and methods for handling commands and permissions. If you just want to create a simple bot, you likely will not need to edit these much; but a couple basic tips for getting started will be below.

## Adding new config entries to the `config.ts` file

1) Add your new config parameter to the `.env` file.
2) Update the `const` declaration on line 6 so that it reads your new parameter from the `.env` file.
3) Update line 17 if your parameter is necessary for the bot to run.
4) Add your new parameter to the `export` statement beginning on line 21.