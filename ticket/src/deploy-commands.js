require('dotenv').config();
const { REST, Routes } = require('discord.js');
const fs = require('fs');

const commands = [];
const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log('🔄 Registrando (atualizando) comandos...');
        await rest.put(Routes.applicationCommands('YOUR_APPLICATION_ID_HERE') /* Replace with your application id here */ , { body: commands });
        console.log('✅ Comandos registrados com sucesso!');
    } catch (error) {
        console.error(error);
    }
})();