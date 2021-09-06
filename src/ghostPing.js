const Discord = require('discord.js')

async function ghostPing(message, options = []) {
    if (message.mentions.users.first()) {

        if (options.credit === false) {
            foot = options.embedFoot || 'Hayalet Ping. Oop.'
        } else {
            foot = '©️ Sadece Geliştirin. npm i simply-djs'
        }
try{
    if(message.author.bot) return;
    
    if(message.content.includes(`<@${message.mentions.users.first().id}>`)){
        const chembed = new Discord.MessageEmbed()
            .setTitle('Hayalet Ping Algılandı')
            .setDescription(options.embedDesc || `${message.author} **(${message.author.tag})**'nin sadece hayalet tarafından ping attığını buldum ${message.mentions.members.first()} **(${message.mentions.users.first().tag})**\n\nİçerik: **${message.content}**`)
            .setColor(options.embedColor || 0x075FFF)
            .setFooter(foot)
            .setTimestamp()

        message.channel.send({ embeds: [options.embed || chembed] }).then(async (msg) => {
            setTimeout(() => {
                msg.delete()
            }, 10000)
        })
    }

    } catch(err){
        console.log(`Hata oluştu. | hayaletPing | Hata: ${err}`)
    }

    }
}
module.exports = ghostPing;