const Discord = require('discord.js')

async function stealSticker(message, args, options=[]){
    let filter = m => m.author.id === message.author.id

message.channel.send('Etiketi/eki şimdi gönderin. topluyorum...')
let collector = message.channel.createMessageCollector({ filter, time: 15000, max: 1 })

collector.on('collect', async message => {
  let stickers = message.stickers.first()

  if (options.credit === false) {
    foot = options.embedFoot || 'Çalmak yasa dışı'
} else {
    foot = '©️ Sadece Geliştirin. npm i simply-djs'
}   

  if (!stickers) {
       const attachment = message.attachments.first();
const url = attachment ? attachment.url : null;

if(url === null) return message.reply('Bir çıkartma/ek sağlamadığınız için üzgünüm')

message.guild.stickers.create(url, args[0] || 'stickerURL', args[1] || 'simply-djs').then(async (st) => {
     const mentionav = new Discord.MessageEmbed()
              .setTitle(options.embedTitle || `Çıkartma Eklendi ;)\n\nEtiket Adı: \`${st.name}\`\nEtiket Kimliği: \`${st.id}\``)
              .setThumbnail(st.url)
              .setColor(options.embedColor || 0x075FFF)
              .setFooter(foot)

          message.channel.send({ embeds: [mentionav] })
    message.delete()
    })
    .catch(err => {
    message.reply({ content: `Hata: ${err}`})
  })

  } else {

  message.guild.stickers.create(stickers.url, args[0] || stickers.id, args[1] || 'simply-djs').then(async (st) => {

     const mentionav = new Discord.MessageEmbed()
              .setTitle(options.embedTitle || `Çıkartma Eklendi ;)\n\nEtiket Adı: \`${st.name}\`\nEtiket Kimliği: \`${st.id}\``)
              .setThumbnail(st.url)
              .setColor(options.embedColor || 0x075FFF)
              .setFooter(foot)

          message.channel.send({ embeds: [mentionav] })
    message.delete()
    })
    .catch(err => {
    message.reply({ content: `Hata: ${err}`})
  })
  }

})
}
module.exports = stealSticker;