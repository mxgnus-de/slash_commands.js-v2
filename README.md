# @mxgnus/slashcommands.js-v2

#### @mxgnus/slashcommands.js is a free easy to use slash command package for discords.js

If you find any bugs, [contact me](https://discord.mxgnus.de)

## Installation

Use the package manager [npm](https://nodejs.org/en/download/) to install @mxgnus/slashcommands.js.

```bash
npm i @mxgnus/slashcommands.js
```

## Create a new slashcommand

```javascript
const {
   GuildSlashCommand,
   Slashcommand,
   default: Slash,
} = require('@mxgnus/slashcommands.js');
new Slash(bot /* your discord.js client */); // initialize the slash command

// create a guild slashcommand
new GuildSlashCommand()
   .setGuildId('your guild id')
   .setName('commandname')
   .setDescription('command description')
   .register();

// create a global slashcommand
new Slashcommand()
   .setName('commandname')
   .setDescription('command description')
   .register();
```

## Fetch slashcommands

```javascript
const {
   fetchGuildSlashcommands,
   fetchSlashcommands,
   default: Slash,
} = require('@mxgnus/slashcommands.js');
new Slash(bot /* your discord.js client */); // initialize the slash command

// fetch all guild slashcommands
const guildSlashCommands = await fetchGuildSlashcommands();

// fetch all global slashcommands
const slashCommands = await fetchSlashcommands();
```

## Delete slashcommands

```javascript
const {
   deleteGuildSlashcommand,
   deleteSlashcommand,
   default: Slash,
} = require('@mxgnus/slashcommands.js');
new Slash(bot /* your discord.js client */); // initialize the slash command

// delete a guild slashcommand by name
deleteGuildSlashcommand({
   guildId: 'your guild id',
   name: 'command name',
});

// delete a guild slashcommand by id
deleteGuildSlashcommand({
   id: 'command id',
});

// delete a global slashcommand by name
deleteSlashcommand({
   name: 'command name',
});

// delete a global slashcommand by id
deleteSlashcommand({
   id: 'command id',
});
```

## Respond Example

```javascript
bot.on('interactionCreate', async (interaction) => {
   if (interaction.isCommand()) {
      if (interaction.commandName === 'test') {
         interaction.reply('test');
      }
   }
});
```

# WARNING

## Discord takes a lot of time to create or update a slashcommand. So be patient if you add one.

## Guild slashcommands should update directly

## Also you need to invite your bot with the `application.commands` permission:

#### https://discord.com/api/oauth2/authorize?client_id=YOUR_CLIENT_ID&permissions=0scope=applications.commands%20bot

## License

[ISC](https://choosealicense.com/licenses/isc/)
