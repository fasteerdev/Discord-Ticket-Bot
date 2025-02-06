const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionsBitField } = require('discord.js');

module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        if (!interaction.isButton()) return;

        if (interaction.customId === 'open_ticket') {
            const loadingEmbed = new EmbedBuilder()
                .setColor('#FF3131')
                .setTitle('🎫 Criando Ticket')
                .setDescription('Criando o canal...')
                .setFooter({ text: 'Aguarde um momento.' });

            const loadingMessage = await interaction.reply({ embeds: [loadingEmbed], ephemeral: true });

            setTimeout(async () => {
                const configuringEmbed = new EmbedBuilder()
                    .setColor('#FF3131')
                    .setTitle('🎫 Criando Ticket')
                    .setDescription('Configurando o canal...')
                    .setFooter({ text: 'Aguarde um momento.' });

                await interaction.editReply({ embeds: [configuringEmbed] });

                setTimeout(async () => {
                    const existingChannel = interaction.guild.channels.cache.find(channel => 
                        channel.name === `🎫┇ticket-${interaction.user.username.toLowerCase()}`
                    );

                    if (existingChannel) {
                        return interaction.editReply({ content: '❌ Você já tem um ticket aberto!', ephemeral: true });
                    }

                    const categoryId = 'YOUR_CATEGORY_ID_HERE'; // Replace with the ticket category id here
                    const ticketChannel = await interaction.guild.channels.create({
                        name: `🎫┇ticket-${interaction.user.username}`,
                        type: 0,
                        parent: categoryId,
                        permissionOverwrites: [
                            {
                                id: interaction.guild.id,
                                deny: [PermissionsBitField.Flags.ViewChannel]
                            },
                            {
                                id: interaction.user.id,
                                allow: [
                                    PermissionsBitField.Flags.ViewChannel,
                                    PermissionsBitField.Flags.SendMessages,
                                    PermissionsBitField.Flags.AttachFiles
                                ]
                            },
                            {
                                id: interaction.client.user.id,
                                allow: [
                                    PermissionsBitField.Flags.ViewChannel,
                                    PermissionsBitField.Flags.SendMessages,
                                    PermissionsBitField.Flags.ManageChannels
                                ]
                            },
                            {
                                id: 'YOUR_STAFF_ROLE_ID_HERE', // // Replace with the staff role id here
                                allow: [PermissionsBitField.Flags.ViewChannel]
                            }
                        ]
                    });

                    const createdEmbed = new EmbedBuilder()
                        .setColor('#FF3131')
                        .setTitle('🎫 Ticket Criado')
                        .setDescription(`O canal foi criado com sucesso! Você pode agora explicar sua dúvida.`)
                        .setFooter({ text: 'Equipe de Suporte' });

                    const closeButton = new ButtonBuilder()
                        .setCustomId('close_ticket')
                        .setLabel('Fechar Ticket')
                        .setStyle(ButtonStyle.Danger);

                    const row = new ActionRowBuilder().addComponents(closeButton);

                    await ticketChannel.send({ content: `<@${interaction.user.id}>`, embeds: [createdEmbed], components: [row] });

                    await interaction.editReply({ content: `✅ Ticket criado: ${ticketChannel}`, ephemeral: true });
                }, 2000);
            }, 2000);
        }

        if (interaction.customId === 'close_ticket') {
            const confirmationEmbed = new EmbedBuilder()
                .setColor('#FF3131')
                .setTitle('⚠️ Fechar Ticket')
                .setDescription('Tem certeza de que deseja fechar este ticket?')
                .setFooter({ text: 'Clique no botão abaixo para confirmar.' });

            const confirmButton = new ButtonBuilder()
                .setCustomId('confirm_close')
                .setLabel('Confirmar Fechamento')
                .setStyle(ButtonStyle.Danger);

            const cancelButton = new ButtonBuilder()
                .setCustomId('cancel_close')
                .setLabel('Cancelar')
                .setStyle(ButtonStyle.Secondary);

            const confirmationRow = new ActionRowBuilder().addComponents(confirmButton, cancelButton);

            await interaction.reply({
                embeds: [confirmationEmbed],
                components: [confirmationRow],
                ephemeral: true
            });
        }

        if (interaction.customId === 'confirm_close') {
            const channel = interaction.channel;

            await interaction.update({
                content: '✅ O ticket será fechado em 10 segundos.',
                components: []
            });

            setTimeout(async () => {
                await channel.delete();
            }, 10000);
        }

        if (interaction.customId === 'cancel_close') {
            await interaction.update({
                content: '❌ O fechamento do ticket foi cancelado.',
                components: []
            });
        }
    }
};