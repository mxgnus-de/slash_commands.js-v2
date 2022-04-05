# 🏠 Guild slashcommand with options and choices

```javascript
const {
   GuildSlashCommand,
   Slash,
   SlashcommandOption,
   SlashCommandOptionChoice,
} = require('@mxgnus/slashcommands.js');

new Slash(bot /* your discord.js client */); // initialize the slash command

const nameChoice1 = new SlashCommandOptionChoice()
   .setName('name1')
   .setDescription('Name 1');
const nameChoice2 = new SlashCommandOptionChoice()
   .setName('name2')
   .setDescription('Name 2');
const nameOption = new SlashcommandOption()
   .setName('name')
   .setDescription('Name')
   .setType('STRING')
   .setRequired(true)
   .setChoices([nameChoice1, nameChoice2]);

new GuildSlashCommand()
   .setGuildId('your guild id')
   .setName('name')
   .setDescription('Enter your name')
   .addOption(nameOption)
   .register();
```
