# 🏠 Guild slashcommand with options

```javascript
const {
   GuildSlashCommand,
   Slash,
   SlashcommandOption,
} = require('@mxgnus/slashcommands.js');

new Slash(bot /* your discord.js client */); // initialize the slash command

const nameOption = new SlashcommandOption()
   .setName('name')
   .setDescription('Name')
   .setType('STRING')
   .setRequired(true);

new GuildSlashCommand()
   .setGuildId('your guild id')
   .setName('name')
   .setDescription('Enter your name')
   .addOption(nameOption)
   .register();
```
