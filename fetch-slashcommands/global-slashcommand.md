# 🌐 Global slashcommand

```javascript
const {
   fetchSlashcommands,
   Slash,
} = require('@mxgnus/slashcommands.js');
new Slash(bot /* your discord.js client */); // initialize the slash command

const slashCommands = await fetchSlashcommands();
```
