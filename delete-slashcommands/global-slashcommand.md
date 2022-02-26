# 🌐 Global slashcommand

Delete a global slashcommand by name

```javascript
const {
   deleteSlashcommand,
   Slash,
} = require('@mxgnus/slashcommands.js');
new Slash(bot /* your discord.js client */); // initialize the slash command

deleteSlashcommand({
   name: 'command name',
});
```

Delete a global slashcommand by id

```javascript
const {
   deleteSlashcommand,
   Slash,
} = require('@mxgnus/slashcommands.js');
new Slash(bot /* your discord.js client */); // initialize the slash command

deleteSlashcommand({
   id: 'command id',
});
```

Delete all global slashcommands

```javascript
const {
   deleteAllSlashcommands,
   Slash,
} = require('@mxgnus/slashcommands.js');
new Slash(bot /* your discord.js client */); // initialize the slash command

deleteAllSlashcommands()
```
