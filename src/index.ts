import {
   ApplicationCommandOptionData,
   Client,
   CommandOptionChannelResolvableType,
   CommandOptionChoiceResolvableType,
   CommandOptionNonChoiceResolvableType,
   CommandOptionNumericResolvableType,
   ExcludeEnum,
} from 'discord.js';
import { EventEmitter } from 'events';
import colors from 'colors';
import {
   ApplicationCommandOptionTypes,
   ChannelTypes,
} from 'discord.js/typings/enums';

interface Options {
   debug?: boolean;
   guildId?: string;
}

let that: Client;
let emitter: EventEmitter = new EventEmitter();
const options: Options = {
   debug: false,
   guildId: undefined,
};

type SlashcommandOptionType =
   | 'STRING'
   | 'NUMBER'
   | 'INTEGER'
   | ApplicationCommandOptionTypes.STRING
   | ApplicationCommandOptionTypes.NUMBER
   | ApplicationCommandOptionTypes.INTEGER
   | CommandOptionChannelResolvableType
   | CommandOptionChoiceResolvableType
   | CommandOptionNumericResolvableType
   | 'SUB_COMMAND_GROUP'
   | ApplicationCommandOptionTypes.SUB_COMMAND_GROUP
   | 'SUB_COMMAND'
   | ApplicationCommandOptionTypes.SUB_COMMAND
   | CommandOptionNonChoiceResolvableType;

export class Slash {
   protected client: Client;

   constructor(client: Client, clientOptions: Options = {}) {
      this.client = client;
      that = client;
      if (clientOptions.debug) options.debug = clientOptions.debug;
      if (clientOptions.guildId) {
         validateGuildId(clientOptions.guildId);
         options.guildId = clientOptions.guildId;
      }
      debugLogger(`Slash initialized.`);

      if (!isReady()) {
         client.on('ready', () => {
            emitter.emit('ready');
         });
      }
   }
}

export class GuildSlashCommand {
   protected name: string | null = null;
   protected description: string | null = null;
   protected options: ApplicationCommandOptionData[] = [];
   protected guildId: string | null = null;
   protected type: string | null = null;

   constructor() {
      if (!isInit()) {
         throw new Error('Slash command not initialized');
      }
      if (options.guildId) this.guildId = options.guildId;
      return this;
   }

   public setGuildId(guildId: string) {
      validateGuildId(guildId);
      this.guildId = guildId;
      return this;
   }

   public setName(name: string) {
      validateName(name);
      this.name = name.toLowerCase();
      return this;
   }

   public setDescription(description: string) {
      validateDescription(description);
      this.description = description;
      return this;
   }

   public setOptions(options: ApplicationCommandOptionData[]) {
      if (!validateOptions(this.options)) {
         throw new Error(
            'Invalid options, slashcommand option must have a name, type and description',
         );
      }
      this.options = formatOptions(options);

      return this;
   }

   public setType(type: string) {
      this.type = type;
      return this;
   }

   public addOption(option: ApplicationCommandOptionData) {
      this.options.push(option);
      return this;
   }

   public async register() {
      if (!this.name) {
         throw new Error('Name is not set');
      }
      if (!this.description) {
         throw new Error('Description is not set');
      }
      if (!this.guildId) {
         throw new Error('Guild ID is not set');
      }
      if (!validateOptions(this.options)) {
         throw new Error(
            'Invalid options, slashcommand option must have a name, type and description',
         );
      }

      if (!isReady()) {
         await new Promise((resolve) => {
            emitter.once('ready', () => {
               resolve(null);
            });
         });
      }

      const guild =
         that.guilds.cache.get(this.guildId) ||
         (await that.guilds.fetch(this.guildId));
      if (!guild) {
         throw new Error('Guild not found');
      }

      let err = null;
      debugLogger(
         `Registering slash command ${this.name} in guild ${guild.id}`,
      );
      const slashcommand = await guild.commands
         .create({
            name: this.name,
            description: this.description,
            options: this.options,
         })
         .catch((e) => {
            err = e;
            throw e;
         });

      if (err !== null || !slashcommand) {
      }

      return slashcommand;
   }
}

export class Slashcommand {
   protected name: string | null = null;
   protected description: string | null = null;
   protected type: string | null = null;
   protected options: ApplicationCommandOptionData[] = [];

   constructor() {
      if (!isInit()) {
         throw new Error('Slash command not initialized');
      }
      return this;
   }

   public setName(name: string) {
      validateName(name);
      this.name = name.toLowerCase();
      return this;
   }

   public setDescription(description: string) {
      validateDescription(description);
      this.description = description;
      return this;
   }

   public setOptions(options: ApplicationCommandOptionData[]) {
      if (!validateOptions(this.options)) {
         throw new Error(
            'Invalid options, slashcommand option must have a name, type and description',
         );
      }
      this.options = formatOptions(options);
      return this;
   }

   public setType(type: string) {
      this.type = type;
      return this;
   }

   public addOption(option: ApplicationCommandOptionData) {
      this.options.push(option);
      return this;
   }

   public async register() {
      if (!this.name) {
         throw new Error('Name is not set');
      }
      if (!this.description) {
         throw new Error('Description is not set');
      }
      if (!validateOptions(this.options)) {
         throw new Error(
            'Invalid options, slashcommand option must have a name, type and description',
         );
      }

      if (!isReady()) {
         await new Promise((resolve) => {
            emitter.once('ready', () => {
               resolve(null);
            });
         });
      }

      if (!that.application) {
         throw new Error('Application in client not found');
      }

      debugLogger(
         `Registering slash command ${this.name} in application ${that.application.name} (${that.application.id})`,
      );
      let err = false;
      const slashcommand = await that.application.commands
         .create({
            name: this.name,
            description: this.description,
            options: this.options,
            type: (this.type as any) ?? undefined,
         })
         .catch((e) => {
            err = true;
            throw e;
         });

      if (!slashcommand || err) return;

      return slashcommand;
   }
}

export class SlashCommandOptionChoice {
   protected name: string | number | boolean | null = null;
   protected value: string | number | boolean | null = null;
   constructor() {
      return this;
   }

   public setName(name: string | number | boolean) {
      validateChoiceName(name);
      this.name = name;
      return this;
   }

   public setValue(value: string | number | boolean) {
      validateChoiceValue(value);
      this.value = value;
      return this;
   }
}
export class SlashcommandOption {
   protected name: string | null = null;
   protected description: string | null = null;
   protected type: SlashcommandOptionType | null = null;
   protected required: boolean = false;
   protected autocomplete: boolean = false;
   protected channelTypes?: ExcludeEnum<typeof ChannelTypes, 'UNKNOWN'>[];
   protected maxValues?: number;
   protected minValue?: number;
   protected choices?: SlashCommandOptionChoice[];

   constructor() {
      return this;
   }

   public setName(name: string) {
      validateName(name);
      this.name = name.toLowerCase();
      return this;
   }

   public setDescription(description: string) {
      validateDescription(description);
      this.description = description;
      return this;
   }

   public setType(type: SlashcommandOptionType) {
      this.type = type;
      return this;
   }

   public setRequired(required: boolean) {
      if (typeof required !== 'boolean') {
         throw new Error('Required must be a boolean');
      }
      this.required = required;
      return this;
   }

   public setAutocomplete(autocomplete: boolean) {
      this.autocomplete = autocomplete;
      return this;
   }

   public setChannelTypes(
      channelTypes: ExcludeEnum<typeof ChannelTypes, 'UNKNOWN'>[],
   ) {
      this.channelTypes = channelTypes;
      return this;
   }

   public setMaxValues(maxValues: number) {
      this.maxValues = maxValues;
      return this;
   }

   public setMinValue(minValue: number) {
      this.minValue = minValue;
      return this;
   }

   public setChoices(choices: SlashCommandOptionChoice[]) {
      this.choices = choices;
      return this;
   }
}

export async function fetchGuildSlashcommands(
   { guildId }: { guildId: string } = {
      guildId: '',
   },
) {
   if (!isInit()) {
      throw new Error('Slash command not initialized');
   }
   if (options.guildId) guildId = options.guildId;
   if (!guildId) {
      throw new Error('Guild ID is not set');
   }
   validateGuildId(guildId);

   if (!isReady()) {
      await new Promise((resolve) => {
         emitter.once('ready', () => {
            resolve(null);
         });
      });
   }

   debugLogger(`Fetching slash commands for guild ${guildId}`);
   let err = false;
   const guild =
      that.guilds.cache.get(guildId) || (await that.guilds.fetch(guildId));
   if (!guild) {
      throw new Error('Guild not found');
   }

   const slashcommands = await guild.commands.fetch().catch((e) => {
      err = true;
      throw e;
   });

   if (err || !slashcommands) return;

   return slashcommands;
}

export async function fetchSlashcommands() {
   if (!isInit()) {
      throw new Error('Slash command not initialized');
   }

   if (!isReady()) {
      await new Promise((resolve) => {
         emitter.once('ready', () => {
            resolve(null);
         });
      });
   }

   if (!that.application) {
      throw new Error('Application in client not found');
   }

   debugLogger(
      `Fetching slash commands for application ${that.application.name} (${that.application.id})`,
   );
   let err = false;
   const slashcommands = await that.application.commands.fetch().catch((e) => {
      err = true;
      throw e;
   });

   if (err || !slashcommands) return;

   return slashcommands;
}

export async function deleteGuildSlashcommand(
   {
      guildId,
      name,
      id,
   }: {
      guildId: string;
      name?: string;
      id?: string;
   } = {
      guildId: '',
   },
) {
   if (!isInit()) {
      throw new Error('Slash command not initialized');
   }
   if (options.guildId) guildId = options.guildId;
   if (!guildId) {
      throw new Error('Guild ID is not set');
   }
   validateGuildId(guildId);

   if (!name && !id) {
      throw new Error('Name or ID is not set. Please specify one');
   }

   if (!isReady()) {
      await new Promise((resolve) => {
         emitter.once('ready', () => {
            resolve(null);
         });
      });
   }

   let cmdId = id;
   if (!id && name) {
      const slashcommands = await fetchGuildSlashcommands({ guildId });
      if (!slashcommands) throw new Error('Invalid slashcommand id');
      const slashcommand = slashcommands.find((c) => c.name === name);
      if (!slashcommand) throw new Error('Invalid slashcommand name');
      cmdId = slashcommand.id;
   }

   if (!cmdId) throw new Error('Invalid slashcommand id');

   debugLogger(`Deleting slash command ${cmdId} for guild ${guildId}`);
   let err = false;
   const guild =
      that.guilds.cache.get(guildId) || (await that.guilds.fetch(guildId));
   if (!guild) {
      throw new Error('Guild not found');
   }

   const slashcommand = await guild.commands.delete(cmdId).catch((e) => {
      err = true;
      throw e;
   });

   if (err || !slashcommand) return;

   return slashcommand;
}

export async function deleteSlashcommand({
   name,
   id,
}: { name?: string; id?: string } = {}) {
   if (!isInit()) {
      throw new Error('Slash command not initialized');
   }

   if (!name && !id) {
      throw new Error('Name or ID is not set. Please specify one');
   }

   if (!isReady()) {
      await new Promise((resolve) => {
         emitter.once('ready', () => {
            resolve(null);
         });
      });
   }

   if (!that.application) {
      throw new Error('Application in client not found');
   }

   let cmdId = id;

   if (!id && name) {
      const slashcommands = await fetchSlashcommands();
      if (!slashcommands) throw new Error('Invalid slashcommand id');
      const slashcommand = slashcommands.find((c) => c.name === name);
      if (!slashcommand) throw new Error('Invalid slashcommand name');
      cmdId = slashcommand.id;
   }

   if (!cmdId) throw new Error('Invalid slashcommand id');

   debugLogger(
      `Deleting slash command ${cmdId} for application ${that.application.name} (${that.application.id})`,
   );
   let err = false;
   const slashcommand = await that.application.commands
      .delete(cmdId)
      .catch((e) => {
         err = true;
         throw e;
      });

   if (err || !slashcommand) return;

   return slashcommand;
}

function validateOptions(options: ApplicationCommandOptionData[]): boolean {
   return options.every((option) => {
      return option.name && option.description && option.type;
   });
}

function isInit(): boolean {
   return that instanceof Client;
}

function validateGuildId(guildId: string) {
   if (typeof guildId !== 'string') throw new Error('GuildId must be a string');
   if (!/^[0-9]{17,18}$/.test(guildId)) {
      throw new Error('Invalid guild ID');
   }
}

function validateName(name: string) {
   if (typeof name !== 'string') throw new Error('Name must be a string');
   if (name.length > 32)
      throw new Error('Name has to be less than 32 characters');
   if (name.length < 1)
      throw new Error('Name has to be more than 1 characters');
   if (name.match(/[^a-zA-Z0-9_]/g))
      throw new Error('Name can only contain letters, numbers and underscores');
   return;
}

function validateDescription(description: string) {
   if (typeof description !== 'string')
      throw new Error('Description must be a string');
   if (description.length > 100)
      throw new Error('Description has to be less than 100 characters');
   if (description.length < 1)
      throw new Error('Description has to be more than 1 characters');
   return;
}

function formatOptions(options: ApplicationCommandOptionData[]) {
   return options.map((option) => {
      return {
         ...option,
         name: option.name?.toLowerCase(),
      };
   });
}

function isReady(): boolean {
   return that.readyAt instanceof Date;
}

function debugLogger(message: string) {
   if (options.debug) {
      const date = new Date();
      const time = `${date.getDay().toString().padStart(2, '0')}.${
         date.getMonth() + 1
      }.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
      console.debug(
         colors.grey(
            '[' +
               colors.blue('DEBUG') +
               ' | ' +
               colors.blue(time) +
               '] => ' +
               colors.cyan(message),
         ),
      );
   }
}

function validateChoiceName(name: string | number | boolean) {
   if (typeof name !== 'string') throw new Error('Name must be a string');
   if (name.length > 100)
      throw new Error('Choice name has to be less than 100 characters');
   if (name.length < 1)
      throw new Error('Choice name has to be more than 1 characters');
   return;
}

function validateChoiceValue(value: string | number | boolean) {
   if (value.toString().length > 100)
      throw new Error('Choice value has to be less than 100 characters');
   if (value.toString().length < 1)
      throw new Error('Choice value has to be more than 1 characters');
   return;
}
