# 🌐 Global slashcommand with options

```javascript
// create a global slashcommand with options
const {
   SlashCommand,
   Slash,
   SlashcommandOption,
} = require('@mxgnus/slashcommands.js');

const nameOption = new SlashcommandOption()
   .setName('name')
   .setDescription('Name')
   .setType('STRING')
   .setRequired(true);

new SlashCommand()
   .setName('name')
   .setDescription('Enter your name')
   .addOption(nameOption)
   .register();
```
