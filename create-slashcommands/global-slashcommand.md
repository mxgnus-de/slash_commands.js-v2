# 🌐 Global slashcommand



```javascript
const {
   Slashcommand,
   Slash,
} = require('@mxgnus/slashcommands.js');
new Slash(bot /* your discord.js client */); // initialize the slash command

new Slashcommand()
   .setName('commandname')
   .setDescription('command description')
   .register();
```
