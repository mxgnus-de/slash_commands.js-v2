# 🏠 Guild slashcommands

Delete a guild slashcommand by name

```javascript
const {
   deleteGuildSlashcommand,
   Slash,
} = require('@mxgnus/slashcommands.js');
new Slash(bot /* your discord.js client */); // initialize the slash command

deleteGuildSlashcommand({
   guildId: 'your guild id',
   name: 'command name',
});
```

Delete a guild slashcommand by id

```javascript
const {
   deleteGuildSlashcommand,
   Slash,
} = require('@mxgnus/slashcommands.js');
new Slash(bot /* your discord.js client */); // initialize the slash command


deleteGuildSlashcommand({
   guildId: 'your guild id',
   id: 'command id',
});
```

Delete all guild slashcommands

```javascript
const {
   deleteAllGuildSlashcommands,
   Slash,
} = require('@mxgnus/slashcommands.js');
new Slash(bot /* your discord.js client */); // initialize the slash command

deleteAllGuildSlashcommands({
   guildId: 'your guild id'
});
```

