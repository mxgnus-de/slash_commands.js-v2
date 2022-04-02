# 🌐 Global slashcommand with options and choices

```javascript
const {
   Slashcommand,
   Slash,
   SlashcommandOption,
   SlashCommandOptionChoice,
} = require('@mxgnus/slashcommands.js');

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

new Slashcommand()
   .setName('name')
   .setDescription('Enter your name')
   .addOption(nameOption)
   .register();
```
