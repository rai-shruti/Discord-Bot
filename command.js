import { REST, Routes } from 'discord.js';

const commands = [
  {
    name: 'create',
    description: 'Create a new short url',
  },
];

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

try {
    console.log('Started refreshing application (/) commands.');
  
   // await rest.put(Routes.applicationCommands('1304771036272660531'), { body: commands });
  
    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }


  