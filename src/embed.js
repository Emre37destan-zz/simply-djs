const Discord = require('discord.js')

async function embed(message, options=[]){
  try{
    if(options.slash === true){
      let interaction = message
      const { MessageEmbed, MessageActionRow, MessageSelectMenu, MessageButton } = require('discord.js')
  
      const done = new MessageButton()
    .setLabel('Done')
    .setStyle('SUCCESS')
    .setCustomId('setDone')
  
        const reject = new MessageButton()
    .setLabel('İptal/Sil')
    .setStyle('DANGER')
    .setCustomId('setDelete')
  
  let name = ['Message', 'Title', 'Description', 'URL', 'Color', 'Image', 'Thumbnail', 'Footer']
  let desc = ['Message outside of the embed', 'Title of the embed', 'Description of the embed', 'URL in the title in the embed (hyperlink for title)', 'Color of the embed', 'Image in the embed', 'Thumbnail in the embed', 'Footer of the embed']
  let value = ['setContent', 'setTitle', 'setDescription', 'setURL', 'setColor', 'setImage', 'setThumbnail', 'setFooter']
  
   let menuOptions = [];
  
   for (let i = 0; i < name.length; i++) {
  let dataopt = {
          label: name[i],
          description: desc[i],
          value: value[i],
        }
  
        menuOptions.push(dataopt)
   }
  
   let slct = new MessageSelectMenu()
      .setMaxValues(1)
      .setCustomId('embed-creator')
      .setPlaceholder('Gömme Oluşturma Seçenekleri')
      .addOptions([
        menuOptions
      ])
  
    const row = new MessageActionRow()
    .addComponents([done, reject])
  
    const row2 = new MessageActionRow()
    .addComponents([slct])
    
    const embed = new MessageEmbed()
    .setTitle(options.embedTitle || 'Gömme Oluşturucu')
    .setDescription('Bu mesajdaki Seç Menüsünden herhangi bir ***seçenek*** seçin, ben de **tüm bilgileri toplayacağım ve bu verileri kullanarak sizin için bir yerleştirme** oluşturacağım.\n\nBu, tamamlanmış bir yerleştirmedir.')
    .setImage('https://media.discordapp.net/attachments/867344516600037396/879238983492710450/unknown.png')
    .setColor(options.embedColor || '#075FFF')
    .setFooter('Simply-DJS kullanarak gömme yaratıcısı')
    
    message.followUp({ embeds: [embed], components: [row2, row]})
    
    const emb = new MessageEmbed()
    .setFooter('Sadece DJler')
    .setColor('#2F3136')
    
    message.channel.send({ content: '***Ön izleme***', embeds: [emb]}).then(async a => {
    
      let lel = await message.fetchReply()
      let e = await message.fetchReply()
    let membed = await message.channel.messages.fetch(a.id)
  
    let filter = m => m.user.id === interaction.user.id
    let collector = e.createMessageComponentCollector({ filter, type: 'SELECT_MENU', time: 600000 })
    
    collector.on('collect', async button=> {
    
        if(button.customId && button.customId === 'setDelete'){
        button.reply({content: 'Siliniyor...', ephemeral: true})
        
        membed.delete()
        e.delete()
        message.delete()
      } else 
  
  if(button.customId && button.customId === 'setDone'){
        button.reply({content: 'Tamamlandı 👍', ephemeral: true})
        
        message.channel.send({ content: membed.content, embeds: [membed.embeds[0] ] })
        membed.delete()
        e.delete()
      } else
  
     if(button.values[0] === 'setContent'){
        button.reply({content: 'Yerleştirme dışında mesaj için hangi metni istediğinizi söyleyin', ephemeral: true})
        let filter = m => interaction.user.id === m.author.id
        let titleclr = button.channel.createMessageCollector({ filter, time: 30000, max: 1 })
        
        titleclr.on("collect", async m => {
          
           const url = membed.embeds[0].image ? membed.embeds[0].image.url : '';
           
    let msg = new MessageEmbed()
    .setTitle(membed.embeds[0].title || '')
    .setDescription(membed.embeds[0].description || '')
    .setColor(membed.embeds[0].color || '#36393F')
    .setFooter(membed.embeds[0].footer.text || '')
    .setImage(url)
    .setURL(membed.embeds[0].url || '')
    .setThumbnail(membed.embeds[0].thumbnail ? membed.embeds[0].thumbnail.url : '')
  titleclr.stop()
    m.delete()
    
          membed.edit({ content: m.content, embeds: [msg] })
        })
      } else
  if(button.values[0] === 'setThumbnail'){
        button.reply({content: 'Küçük resmi yerleştirmek için hangi resmi istediğinizi söyleyin (sağ üstte küçük resim)', ephemeral: true})
        let filter = m => interaction.user.id === m.author.id
        let titleclr = button.channel.createMessageCollector({ filter, time: 30000, max: 1 })
        
        titleclr.on("collect", async m => {
          
           const url = membed.embeds[0].image ? membed.embeds[0].image.url : '';
           
                let isthumb = m.content.match(/^http[^\?]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.*))?$/gmi) != null || m.attachments.first().url || ''
            if(!isthumb) return message.followUp({ content: 'Bu bir resim urlsi değil. Lütfen bir resim URLsi veya eki sağlayın.', ephemeral: true})
  
    let msg = new MessageEmbed()
    .setTitle(membed.embeds[0].title || '')
    .setDescription(membed.embeds[0].description || '')
    .setColor(membed.embeds[0].color || '#2F3136')
    .setURL(membed.embeds[0].url || '')
    .setFooter(membed.embeds[0].footer.text || '')
    .setImage(url)
    .setThumbnail(m.content || m.attachments.first().url || '')
  titleclr.stop()
    m.delete()
    
          membed.edit({ content: membed.content, embeds: [msg] })
        })
      } else
  
      if(button.values[0] === 'setColor'){
        button.reply({content: 'Gömmek için hangi rengi istediğini söyle', ephemeral: true})
        let filter = m => interaction.user.id === m.author.id
        let titleclr = button.channel.createMessageCollector({ filter, time: 30000 })
        
        titleclr.on("collect", async m => {
  
  if(/^#[0-9A-F]{6}$/i.test(m.content)) {
  
      const url = membed.embeds[0].image ? membed.embeds[0].image.url : '';
  
    let msg = new MessageEmbed()
    .setTitle(membed.embeds[0].title || '')
    .setDescription(membed.embeds[0].description || '')
    .setColor(`${m.content}`)
    .setURL(membed.embeds[0].url || '')
    .setFooter(membed.embeds[0].footer.text || '')
    .setImage(url)
    .setThumbnail(membed.embeds[0].thumbnail ? membed.embeds[0].thumbnail.url : '')
  
    m.delete()
    titleclr.stop()
          membed.edit({ content: membed.content, embeds: [msg] })
  
  } else {
      message.reply('Lütfen bana geçerli bir hex kodu verin')
  }
  
        })
      } else
  
  
      if(button.values[0] === 'setURL'){
        button.reply({content: 'Yerleştirme başlığı için hangi URLyi istediğinizi söyleyin (gömme başlığı için köprü)', ephemeral: true})
        let filter = m => interaction.user.id === m.author.id
        let titleclr = button.channel.createMessageCollector({ filter, time: 30000, max: 1 })
        
        titleclr.on("collect", async m => {
                   const url = membed.embeds[0].image ? membed.embeds[0].image.url : '';
    let msg = new MessageEmbed()
    .setTitle(membed.embeds[0].title || '')
    .setURL(m.content)
    .setDescription(membed.embeds[0].description || '')
    .setColor(membed.embeds[0].color || '#2F3136')
    .setImage(url || '')
    .setFooter(membed.embeds[0].footer.text || '')
    .setThumbnail(membed.embeds[0].thumbnail ? membed.embeds[0].thumbnail.url : '')
  
    m.delete()
    titleclr.stop()
          membed.edit({ content: membed.content, embeds: [msg] })
        })
      } else
  
  if(button.values[0] === 'setImage'){
        button.reply({content: 'Gömmek için hangi resmi istediğini söyle', ephemeral: true})
        let filter = m => interaction.user.id === m.author.id
        let titleclr = button.channel.createMessageCollector({ filter, time: 30000, max: 1 })
        
        titleclr.on("collect", async m => {
  
          let isthumb = m.content.match(/^http[^\?]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.*))?$/gmi) != null || m.attachments.first().url || ''
            if(!isthumb) return message.reply('Bu bir resim urlsi değil. Lütfen bir resim URLsi veya eki sağlayın.')
  
    let msg = new MessageEmbed()
    .setTitle(membed.embeds[0].title || '')
    .setDescription(membed.embeds[0].description || '')
    .setColor(membed.embeds[0].color || '#2F3136')
    .setFooter(membed.embeds[0].footer.text || '')
    .setImage(m.content || m.attachments.first().url)
    .setURL(membed.embeds[0].url)
    .setThumbnail(membed.embeds[0].thumbnail ? membed.embeds[0].thumbnail.url : '')
    
    m.delete()
    titleclr.stop()
          membed.edit({ content: membed.content, embeds: [msg] })
        })
      } else
  
      if(button.values[0] === 'setTitle'){
        button.reply({content: 'Yerleştirme başlığı için hangi metni istediğinizi söyleyin', ephemeral: true})
        let filter = m => interaction.user.id === m.author.id
        let titleclr = button.channel.createMessageCollector({ filter, time: 30000, max: 1 })
        
        titleclr.on("collect", async m => {
                   const url = membed.embeds[0].image ? membed.embeds[0].image.url : '';
    let msg = new MessageEmbed()
    .setTitle(m.content)
    .setURL(membed.embeds[0].url || '')
    .setDescription(membed.embeds[0].description || '')
    .setColor(membed.embeds[0].color || '#2F3136')
    .setThumbnail(membed.embeds[0].thumbnail ? membed.embeds[0].thumbnail.url : '')
    .setImage(url || '')
    .setFooter(membed.embeds[0].footer.text || '')
    m.delete()
    titleclr.stop()
    
          membed.edit({ content: membed.content, embeds: [msg] })
          
        })
      } else
     if(button.values[0] === 'setDescription'){
        button.reply({content: 'Yerleştirme açıklaması için hangi metni istediğinizi söyleyin', ephemeral: true})
        let filter = m => interaction.user.id === m.author.id
        let titleclr = button.channel.createMessageCollector({ filter, time: 30000, max: 1 })
        
        titleclr.on("collect", async m => {
          
       const url = membed.embeds[0].image ? membed.embeds[0].image.url : '';
  
    let msg = new MessageEmbed()
    .setTitle(membed.embeds[0].title || '')
    .setURL(membed.embeds[0].url || '')
    .setDescription(m.content)
    .setThumbnail(membed.embeds[0].thumbnail ? membed.embeds[0].thumbnail.url : '')
    .setColor(membed.embeds[0].color || '#2F3136')
    .setImage(url || '')
    .setFooter(membed.embeds[0].footer.text || '')
    m.delete()
    titleclr.stop()
          membed.edit({ content: membed.content, embeds: [msg] })
        })
      } else
  
   if(button.values[0] === 'setFooter'){
        button.reply({content: 'Gömülü alt bilgi için hangi metni istediğinizi söyleyin', ephemeral: true})
        let filter = m => interaction.user.id === m.author.id
        let titleclr = button.channel.createMessageCollector({ filter, time: 30000, max: 1 })
        
        titleclr.on("collect", async m => {
       const url = membed.embeds[0].image ? membed.embeds[0].image.url : '';
          
    let msg = new MessageEmbed()
    .setTitle(membed.embeds[0].title || '')
    .setURL(membed.embeds[0].url || '')
    .setThumbnail(membed.embeds[0].thumbnail ? membed.embeds[0].thumbnail.url : '')
    .setDescription(membed.embeds[0].description || '')
    .setColor(membed.embeds[0].color || '#2F3136')
    .setFooter(m.content || '')
    .setImage(url || '')
  
    m.delete()
  
    titleclr.stop()
  
          membed.edit({ content: membed.content, embeds: [msg] })
        })
      }
    
  })
  collector.on('end', async (collected, reason) => {
    if(reason === 'time'){
  
      const content = new MessageButton()
    .setLabel('Zaman aşımı')
    .setStyle('DANGER')
    .setCustomId('timeout|91817623842')
    .setDisabled()
  
    const row = new MessageActionRow()
    .addComponents([content])
  
      e.edit({ embeds: [lel.embeds[0]], components: [row] })
    }
  })
    })
    } else if(!options || !options.slash || options.slash === false)
  {
    const { MessageEmbed, MessageActionRow, MessageSelectMenu, MessageButton } = require('discord.js')
  
    const done = new MessageButton()
  .setLabel('Tamamlandı')
  .setStyle('SUCCESS')
  .setCustomId('setDone')

      const reject = new MessageButton()
  .setLabel('İptal/Sil')
  .setStyle('DANGER')
  .setCustomId('setDelete')

let name = ['Message', 'Title', 'Description', 'URL', 'Color', 'Image', 'Thumbnail', 'Footer']
let desc = ['Message outside of the embed', 'Title of the embed', 'Description of the embed', 'URL in the title in the embed (hyperlink for title)', 'Color of the embed', 'Image in the embed', 'Thumbnail in the embed', 'Footer of the embed']
let value = ['setContent', 'setTitle', 'setDescription', 'setURL', 'setColor', 'setImage', 'setThumbnail', 'setFooter']

 let menuOptions = [];

 for (let i = 0; i < name.length; i++) {
let dataopt = {
        label: name[i],
        description: desc[i],
        value: value[i],
      }

      menuOptions.push(dataopt)
 }

 let slct = new MessageSelectMenu()
    .setMaxValues(1)
    .setCustomId('embed-creator')
    .setPlaceholder('Gömme Oluşturma Seçenekleri')
    .addOptions([
      menuOptions
    ])

  const row = new MessageActionRow()
  .addComponents([done, reject])

  const row2 = new MessageActionRow()
  .addComponents([slct])
  
  const embed = new MessageEmbed()
  .setTitle(options.embedTitle || 'Gömme Oluşturucu')
  .setDescription('Bu mesajdaki Seç Menüsünden herhangi bir ***seçenek*** seçin, ben de **tüm bilgileri toplayacağım ve bu verileri kullanarak sizin için bir yerleştirme** oluşturacağım.\n\nBu, tamamlanmış bir yerleştirmedir.')
  .setImage('https://media.discordapp.net/attachments/867344516600037396/879238983492710450/unknown.png')
  .setColor(options.embedColor || '#075FFF')
  .setFooter('Simply-DJS kullanarak gömme yaratıcısı')
  
  message.channel.send({ embeds: [embed], components: [row2, row] }).then(async e => {
  
  const emb = new MessageEmbed()
  .setFooter('Sadece DJler')
  .setColor('#2F3136')
  
  message.channel.send({ content: '***Ön izleme***', embeds: [emb]}).then(async a => {
  
  let membed = await message.channel.messages.fetch(a.id)
  let lel = await message.channel.messages.fetch(e.id)

  let filter = m => m.user.id === message.author.id
  let collector = e.createMessageComponentCollector({ filter, type: 'SELECT_MENU', time: 600000 })
  
  collector.on('collect', async button=> {
  
      if(button.customId && button.customId === 'setDelete'){
      button.reply({content: 'Siliniyor...', ephemeral: true})
      
      membed.delete()
      e.delete()
      message.delete()
    } else 

if(button.customId && button.customId === 'setDone'){
      button.reply({content: 'Tamamlandı 👍', ephemeral: true})
      
      message.channel.send({ content: membed.content, embeds: [membed.embeds[0] ], allowedMentions: { repliedUser: false } })
      membed.delete()
      e.delete()
    } else

   if(button.values[0] === 'setContent'){
      button.reply({content: 'Yerleştirme dışında mesaj için hangi metni istediğinizi söyleyin', ephemeral: true})
      let filter = m => message.author.id === m.author.id
      let titleclr = button.channel.createMessageCollector({ filter, time: 30000, max: 1 })
      
      titleclr.on("collect", async m => {
        
         const url = membed.embeds[0].image ? membed.embeds[0].image.url : '';
         
  let msg = new MessageEmbed()
  .setTitle(membed.embeds[0].title || '')
  .setDescription(membed.embeds[0].description || '')
  .setColor(membed.embeds[0].color || '#36393F')
  .setFooter(membed.embeds[0].footer.text || '')
  .setImage(url)
  .setThumbnail(membed.embeds[0].thumbnail ? membed.embeds[0].thumbnail.url : '')
titleclr.stop()
  m.delete()
  
        membed.edit({ content: m.content, embeds: [msg] })
      })
    } else
if(button.values[0] === 'setThumbnail'){
      button.reply({content: 'Küçük resmi yerleştirmek için hangi resmi istediğinizi söyleyin (sağ üstte küçük resim)', ephemeral: true})
      let filter = m => message.author.id === m.author.id
      let titleclr = button.channel.createMessageCollector({ filter, time: 30000, max: 1 })
      
      titleclr.on("collect", async m => {
        
         const url = membed.embeds[0].image ? membed.embeds[0].image.url : '';
         
              let isthumb = m.content.match(/^http[^\?]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.*))?$/gmi) != null || m.attachments.first().url || ''
          if(!isthumb) return message.reply('Bu bir resim urlsi değil. Lütfen bir resim URLsi veya eki sağlayın.')

  let msg = new MessageEmbed()
  .setTitle(membed.embeds[0].title || '')
  .setDescription(membed.embeds[0].description || '')
  .setColor(membed.embeds[0].color || '#2F3136')
  .setFooter(membed.embeds[0].footer.text || '')
  .setImage(url)
  .setThumbnail(m.content || m.attachments.first().url || '')
titleclr.stop()
  m.delete()
  
        membed.edit({ content: membed.content, embeds: [msg] })
      })
    } else

    if(button.values[0] === 'setColor'){
      button.reply({content: 'Gömmek için hangi rengi istediğini söyle', ephemeral: true})
      let filter = m => message.author.id === m.author.id
      let titleclr = button.channel.createMessageCollector({ filter, time: 30000 })
      
      titleclr.on("collect", async m => {

if(/^#[0-9A-F]{6}$/i.test(m.content)) {

    const url = membed.embeds[0].image ? membed.embeds[0].image.url : '';

  let msg = new MessageEmbed()
  .setTitle(membed.embeds[0].title || '')
  .setDescription(membed.embeds[0].description || '')
  .setColor(`${m.content}`)
  .setFooter(membed.embeds[0].footer.text || '')
  .setImage(url)
  .setThumbnail(membed.embeds[0].thumbnail ? membed.embeds[0].thumbnail.url : '')

  m.delete()
  titleclr.stop()
        membed.edit({ content: membed.content, embeds: [msg] })

} else {
    message.reply('Lütfen bana geçerli bir hex kodu verin')
}

      })
    } else


    if(button.values[0] === 'setURL'){
      button.reply({content: 'Yerleştirme başlığı için hangi URLyi istediğinizi söyleyin (gömme başlığı için köprü)', ephemeral: true})
      let filter = m => message.author.id === m.author.id
      let titleclr = button.channel.createMessageCollector({ filter, time: 30000, max: 1 })
      
      titleclr.on("collect", async m => {
                 const url = membed.embeds[0].image ? membed.embeds[0].image.url : '';
  let msg = new MessageEmbed()
  .setTitle(membed.embeds[0].title || '')
  .setURL(m.content)
  .setDescription(membed.embeds[0].description || '')
  .setColor(membed.embeds[0].color || '#2F3136')
  .setImage(url || '')
  .setFooter(membed.embeds[0].footer.text || '')
  .setThumbnail(membed.embeds[0].thumbnail ? membed.embeds[0].thumbnail.url : '')

  m.delete()
  titleclr.stop()
        membed.edit({ content: membed.content, embeds: [msg] })
      })
    } else

if(button.values[0] === 'setImage'){
      button.reply({content: 'Gömmek için hangi resmi istediğini söyle', ephemeral: true})
      let filter = m => message.author.id === m.author.id
      let titleclr = button.channel.createMessageCollector({ filter, time: 30000, max: 1 })
      
      titleclr.on("collect", async m => {

        let isthumb = m.content.match(/^http[^\?]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.*))?$/gmi) != null || m.attachments.first().url || ''
          if(!isthumb) return message.reply('Bu bir resim urlsi değil. Lütfen bir resim URLsi veya eki sağlayın.')

  let msg = new MessageEmbed()
  .setTitle(membed.embeds[0].title || '')
  .setDescription(membed.embeds[0].description || '')
  .setColor(membed.embeds[0].color || '#2F3136')
  .setFooter(membed.embeds[0].footer.text || '')
  .setImage(m.content || m.attachments.first().url)
  .setURL(membed.embeds[0].url)
  .setThumbnail(membed.embeds[0].thumbnail ? membed.embeds[0].thumbnail.url : '')
  
  m.delete()
  titleclr.stop()
        membed.edit({ content: membed.content, embeds: [msg] })
      })
    } else

    if(button.values[0] === 'setTitle'){
      button.reply({content: 'Yerleştirme başlığı için hangi metni istediğinizi söyleyin', ephemeral: true})
      let filter = m => message.author.id === m.author.id
      let titleclr = button.channel.createMessageCollector({ filter, time: 30000, max: 1 })
      
      titleclr.on("collect", async m => {
                 const url = membed.embeds[0].image ? membed.embeds[0].image.url : '';
  let msg = new MessageEmbed()
  .setTitle(m.content)
  .setURL(membed.embeds[0].url || '')
  .setDescription(membed.embeds[0].description || '')
  .setColor(membed.embeds[0].color || '#2F3136')
  .setThumbnail(membed.embeds[0].thumbnail ? membed.embeds[0].thumbnail.url : '')
  .setImage(url || '')
  .setFooter(membed.embeds[0].footer.text || '')
  m.delete()
  titleclr.stop()
  
        membed.edit({ content: membed.content, embeds: [msg] })
        
      })
    } else
   if(button.values[0] === 'setDescription'){
      button.reply({content: 'Yerleştirme açıklaması için hangi metni istediğinizi söyleyin', ephemeral: true})
      let filter = m => message.author.id === m.author.id
      let titleclr = button.channel.createMessageCollector({ filter, time: 30000, max: 1 })
      
      titleclr.on("collect", async m => {
        
     const url = membed.embeds[0].image ? membed.embeds[0].image.url : '';

  let msg = new MessageEmbed()
  .setTitle(membed.embeds[0].title || '')
  .setURL(membed.embeds[0].url || '')
  .setDescription(m.content)
  .setThumbnail(membed.embeds[0].thumbnail ? membed.embeds[0].thumbnail.url : '')
  .setColor(membed.embeds[0].color || '#2F3136')
  .setImage(url || '')
  .setFooter(membed.embeds[0].footer.text || '')
  m.delete()
  titleclr.stop()
        membed.edit({ content: membed.content, embeds: [msg] })
      })
    } else

 if(button.values[0] === 'setFooter'){
      button.reply({content: 'Gömülü alt bilgi için hangi metni istediğinizi söyleyin', ephemeral: true})
      let filter = m => message.author.id === m.author.id
      let titleclr = button.channel.createMessageCollector({ filter, time: 30000, max: 1 })
      
      titleclr.on("collect", async m => {
     const url = membed.embeds[0].image ? membed.embeds[0].image.url : '';
        
  let msg = new MessageEmbed()
  .setTitle(membed.embeds[0].title || '')
  .setURL(membed.embeds[0].url)
  .setThumbnail(membed.embeds[0].thumbnail ? membed.embeds[0].thumbnail.url : '')
  .setDescription(membed.embeds[0].description || '')
  .setColor(membed.embeds[0].color || '#2F3136')
  .setFooter(m.content || '')
  .setImage(url || '')

  m.delete()

  titleclr.stop()

        membed.edit({ content: membed.content, embeds: [msg] })
      })
    }
  
})
collector.on('end', async (collected, reason) => {
  if(reason === 'time'){

    const content = new MessageButton()
  .setLabel('Zaman aşımı')
  .setStyle('DANGER')
  .setCustomId('timeout|91817623842')
  .setDisabled()

  const row = new MessageActionRow()
  .addComponents([content])

    e.edit({ embeds: [lel.embeds[0]], components: [row] })
  }
})
  })
  })
}
} catch(err){
  console.log(`Hata oluştu. | embedOluştur | Hata: ${err}`)
}
  
}

module.exports = embed;