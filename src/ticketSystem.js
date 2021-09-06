const Discord = require('discord.js')

async function ticketSystem(message, channel, options = []) {
    try{
    let { MessageButton, MessageActionRow } = require('discord.js')

    if (!message.member.permissions.has("ADMINISTRATOR")) return message.reply({ content: "Bilet sistemi kurma izniniz yok" })
    if (!message.guild.me.permissions.has("MANAGE_CHANNELS")) return message.reply({ content: "Bilet sistemiyle çalışma iznim yok | Gerekli İzin: MANAGE_CHANNELS" })

    if (options.color) {

        if (options.color === 'grey') {
            options.color = 'SECONDARY'
        } else if (options.color === 'red') {
            options.color = 'DANGER'
        } else if (options.color === 'green') {
            options.color = 'SUCCESS'
        } else if (options.color === 'blurple') {
            options.color = 'PRIMARY'
        }

    }
    let ticketbtn = new MessageButton()
        .setStyle(options.color || 'SECONDARY')
        .setEmoji(options.emoji || '🎫')
        .setLabel('Bilet')
        .setCustomId('create_ticket');

    if (options.credit === false) {
        foot = options.embedFoot || message.guild.name, message.guild.iconURL()
    } else {
        foot = '©️ Sadece Geliştirin. npm i simply-djs'
    }

    let a = new MessageActionRow()
        .addComponents([ticketbtn])

    let embed = new Discord.MessageEmbed()
        .setTitle('Bilet oluştur')
        .setDescription(options.embedDesc || '🎫 Düğmeye tıklayarak bir bilet oluşturun 🎫')
        .setThumbnail(message.guild.iconURL())
        .setTimestamp()
        .setColor(options.embedColor || '#075FFF')
        .setFooter(foot)

    try {
        channel.send({ embeds: [embed], components: [a] })
    } catch (err) {
        channel.send({ content: 'HATA OLUŞTU ' + err })
    }

} catch(err){
    console.error(`Hata oluştu. | biletSistem | Hata: ${err}`)
}

}
module.exports = ticketSystem;