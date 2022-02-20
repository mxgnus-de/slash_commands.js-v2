# 🚀 Getting started

## [📝 Documentation](https://slashcommands.mxgnus.de)

### Installation

Use the package manager [npm](https://nodejs.org/en/download/) to install @mxgnus/slashcommands.js.

```bash
npm i @mxgnus/slashcommands.js
```

### Create a new slashcommand

```javascript
const {
   GuildSlashCommand,
   Slashcommand,
   Slash,
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

### Create a new slashcommand with options

```javascript
// create a guild slashcommand with options
const {
   GuildSlashCommand,
   Slash,
   SlashcommandOption,
} = require('@mxgnus/slashcommands.js');

new Slash(bot /* your discord.js client */); // initialize the slash command

const nameOption = new SlashcommandOption()
   .setName('name')
   .setDescription('Name')
   .setType('STRING')
   .setRequired(true);

new GuildSlashCommand()
   .setGuildId('your guild id')
   .setName('name')
   .setDescription('Enter your name')
   .addOption(nameOption)
   .register();

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

### Create a new slashcommand with options and choices

```javascript
// create a guild slashcommand with options and choices
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

// create a global slashcommand with options and choices
const {
   SlashCommand,
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

new SlashCommand()
   .setName('name')
   .setDescription('Enter your name')
   .addOption(nameOption)
   .register();
```

### Fetch slashcommands

```javascript
const {
   fetchGuildSlashcommands,
   fetchSlashcommands,
   Slash,
} = require('@mxgnus/slashcommands.js');
new Slash(bot /* your discord.js client */); // initialize the slash command

// fetch all guild slashcommands
const guildSlashCommands = await fetchGuildSlashcommands();

// fetch all global slashcommands
const slashCommands = await fetchSlashcommands();
```

### Delete slashcommands

```javascript
const {
   deleteGuildSlashcommand,
   deleteSlashcommand,
   Slash,
} = require('@mxgnus/slashcommands.js');
new Slash(bot /* your discord.js client */); // initialize the slash command

// delete a guild slashcommand by name
deleteGuildSlashcommand({
   guildId: 'your guild id',
   name: 'command name',
});

// delete a guild slashcommand by id
deleteGuildSlashcommand({
   guildId: 'your guild id',
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

### Respond to a slashcommand

```javascript
bot.on('interactionCreate', async (interaction) => {
   if (interaction.isCommand()) {
      if (interaction.commandName === 'test') {
         interaction.reply('test');
      }
   }
});
```

### Need help?

#### [Discord Server](https://discord.gg/M6Tf9b2Tvt)

## WARNING

### Discord takes a lot of time to create or update a slashcommand. So be patient if you add one.

### Guild slashcommands should update directly

### Also you need to invite your bot with the `application.commands` permission:

**https://discord.com/api/oauth2/authorize?client\_id=YOUR\_CLIENT\_ID\&permissions=0scope=applications.commands%20bot**

### License

[ISC](https://choosealicense.com/licenses/isc/)
