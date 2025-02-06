const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionFlagsBits } = require('discord.js');

module.exports = {
    name: 'ticketsetup',
    description: 'Configura o sistema de tickets no canal atual.',
    run: async (interaction) => {
        if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
            return interaction.reply({ 
                content: '❌ Você não tem permissão para usar este comando.', 
                ephemeral: true 
            });
        }

        const embed = new EmbedBuilder()
            .setColor('#FF3131')
            .setTitle('📩 Sistema de Tickets')
            .setDescription('Se precisar de ajuda, clique no botão abaixo para abrir um ticket.')
            .setFooter({ text: 'Equipe de Suporte' });

        const button = new ButtonBuilder()
            .setCustomId('open_ticket')
            .setLabel('Abrir Ticket')
            .setEmoji('🎫')
            .setStyle(ButtonStyle.Primary);

        const row = new ActionRowBuilder().addComponents(button);

        await interaction.channel.send({ embeds: [embed], components: [row] });
        await interaction.reply({ content: '✅ Sistema de tickets configurado!', ephemeral: true });
    }
};
