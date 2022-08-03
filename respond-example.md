# Respond example

```javascript
bot.on('interactionCreate', async (interaction) => {
   if (interaction.isCommand()) { // check if interaction is a slashcommand
      if (interaction.commandName === 'test') { // check if command name is "test"
         interaction.reply('test'); // send a message back
      }
   }
});
```
