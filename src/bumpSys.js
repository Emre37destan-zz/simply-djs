const Discord = require('discord.js')

async function bumpSys(client, db, options = []) {
    if (options.event === 'messageCreate') {
      let message = options.message;
      if (message.author.id === '302050872383242240') {
        for (let i = 0; i < options.chid.length; i++) {
          if (message.channel.id === options.chid[i]) {
            if (message.embeds[0] && message.embeds[0].description && message.embeds[0].description.includes('Çarpma yapıldı')) {
  
              let timeout = 7200000
              let time = Date.now() + timeout
  
              let setTime = db.set('bumper-' + message.channel.id, time)
  
              const bumpoo = new Discord.MessageEmbed()
                .setTitle('Teşekkürler')
                .setDescription('Sunucuyu bozduğunuz için teşekkürler. Desteğiniz çok şey ifade ediyor. 2 saat sonra sizi bilgilendirecek')
                .setTimestamp()
                .setColor('#06bf00')
                .setFooter('Şimdi 120 dakika bekleme zamanı. (2 saat)')
  
              message.channel.send({ embeds: [options.thanksEmbed || bumpoo] })
              message.channel.overwritePermission
            }
          }
        }
      }
    } else if (options.event === 'ready') {
        setInterval(async () => {
  
          for (let i = 0; i < options.chid.length; i++) {
            let time = await db.fetch('bumper-' + options.chid[i])
  
            if (time && time !== 'hi' && Date.now() > time) {
  
              db.set('bumper-' + options.chid[i], 'hi')
  
              let cho = client.channels.cache.get(options.chid[i])
  
              const bumpo = new Discord.MessageEmbed()
                .setTitle('Çarpışma Zamanı!')
                .setDescription('Son darbenin üzerinden 2 saat geçti. Birisi lütfen sunucuyu tekrar çarpabilir mi?')
                .setTimestamp()
                .setColor('#075FFF')
                .setFooter('Sunucuyu bump için !d bump yapın')
  
              cho.send({ embeds: [options.bumpEmbed || bumpo] })
            } else return;
          }
        }, 5000)
      } else throw new Error('Bilinmeyen Olay.. Lütfen bana geçerli bir olay sağlayın..')
  
  }

module.exports = bumpSys;