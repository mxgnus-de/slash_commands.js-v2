# 🏠 Guild slashcommand

```javascript

const {
   GuildSlashCommand,
   Slash,
} = require('@mxgnus/slashcommands.js');
new Slash(bot /* your discord.js client */); // initialize the slash command

// create a guild slashcommand
new GuildSlashCommand()
   .setGuildId('your guild id')
   .setName('commandname')
   .setDescription('command description')
   .register();

```
