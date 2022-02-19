# 🏠 Guild slashcommand

```javascript
const {
   fetchGuildSlashcommands,
   Slash,
} = require('@mxgnus/slashcommands.js');
new Slash(bot /* your discord.js client */); // initialize the slash command

const guildSlashCommands = await fetchGuildSlashcommands();
```
