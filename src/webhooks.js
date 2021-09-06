const Discord = require('discord.js')

async function webhooks(client, options = []) {
    if (!options.chid) throw new Error('EMPTY_CHANNEL_ID. Kanal kimliği belirtmediniz. Destek almak için https://discord.com/invite/AnUXS6z5tY adresine gidin');

    if (!options.msg && !options.embed) throw new Error('Boş mesaj gönderilemiyor. Lütfen bir yerleştirme veya mesaj belirtin. Destek almak için https://discord.com/invite/AnUXS6z5tY adresine gidin');

    const channel = client.channels.cache.get(options.chid);

    if (!channel) throw new Error('INVALID_CHANNEL_ID. Belirttiğiniz kanal kimliği geçerli değil (veya) VIEW_CHANNEL iznim yok. Destek almak için https://discord.com/invite/AnUXS6z5tY adresine gidin');

    try {
        const webhooks = await channel.fetchWebhooks();
            let webhook = webhooks.first();

        if (!webhook) {

            channel.createWebhook(options.username || client.user.username, {
                avatar: options.avatar || client.user.displayAvatarURL(),
            }).then(webhookz => webhook = webhookz)
        }

        if (!options.embed) {
            await webhook.send({
                content: options.msg,
                username: options.username || client.user.username,
                avatarURL: options.avatar || client.user.displayAvatarURL(),
            })
        } else {
            await webhook.send({
                content: options.msg || '‏‏‎ ‎',
                username: options.username || client.user.username,
                avatarURL: options.avatar || client.user.displayAvatarURL(),
                embeds: [options.embed],
            })
        }

    } catch (error) {
        console.error('Göndermeye çalışırken hata oluştu: ', error);
    }
}
module.exports = webhooks;