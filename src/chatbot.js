const Discord = require('discord.js')
const fetch = require('node-fetch')
async function chatbot(client, message, options = []) {
    if (message.author.bot) return;
if(options && options.toggle === false) return;
    let channel = options.chid
    try {
        if (Array.isArray(channel)) {
            channel.forEach((channel) => {
                const ch = client.channels.cache.get(channel);
                if (!ch) throw new Error(`INVALID_CHANNEL_ID: ${channel}. Belirttiğiniz kanal kimliği geçerli değil (veya) VIEW_CHANNEL iznim yok. Destek almak için https://discord.com/invite/AnUXS6z5tY adresine gidin`);
            })


            if (channel.includes(message.channel.id)) {

                let name = options.name || client.user.username
                let developer = options.developer || 'Dk Emre 30#8590'

                fetch(`https://api.affiliateplus.xyz/api/chatbot?message=${message}&botname=${name}&ownername=${developer}&user=${message.author.id}`)
                    .then(res => {
                        let rep = res.json()

                        return rep;
                    })
                    .then(async reply => {
                        let mes = await reply.message.replace('@everyone', '\`@everyone\`')
                        let mess = mes.replace('@here', '`@here`')
                        message.reply({ content: mess.toString(), allowedMentions: { repliedUser: false } });
                    }).catch(err => message.reply({ content: err }))

            }
        } else {
            const ch = client.channels.cache.get(channel);
            if (!ch) throw new Error('INVALID_CHANNEL_ID. Belirttiğiniz kanal kimliği geçerli değil (veya) VIEW_CHANNEL iznim yok. Destek almak için https://discord.com/invite/AnUXS6z5tY adresine gidin');;

            if (channel === message.channel.id) {

                let name = options.name || client.user.username
                let developer = options.developer || 'Dk Emre 30#8590'

                fetch(`https://api.affiliateplus.xyz/api/chatbot?message=${message}&botname=${name}&ownername=${developer}&user=${message.author.id}`)
                    .then(res => {
                        let rep = res.json()

                        return rep;
                    })
                    .then(async reply => {
                        let mes = await reply.message.replace('@everyone', '\`@everyone\`')
                        let mess = mes.replace('@here', '`@here`')
                        message.reply({ content: mess.toString(), allowedMentions: { repliedUser: false } });
                    }).catch(err => message.reply({ content: `Hata: ${err}` }))
            }
        }
    } catch (err) {
        console.log(`Hata oluştu. | sohbet robotu | Hata: ${err}`)
    }

}
module.exports = chatbot;