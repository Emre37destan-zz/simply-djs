const Discord = require('discord.js')

async function rps(message, options = []) {
    try{
        if(options.slash === true){
            let opponent = message.options.getUser('user')
            if (!opponent) return message.followUp({ content: 'Rakipten bahsedilmedi!', ephemeral: true})
            if (opponent.id == message.user.id) return message.followUp({ content: 'Kendi başına oynayamazsın!', ephemeral: true})
            if (options.credit === false) {
                foot = options.embedFooter || "Taş kağıt makas"
            } else {
                foot = "©️ Sadece Geliştirin. | By- Dk Emre 30#8590"
            }
        
            let acceptEmbed = new Discord.MessageEmbed()
                .setTitle(`Kabul etmek için ${opponent.tag} bekleniyor!`)
                .setAuthor(message.user.tag, message.user.displayAvatarURL())
                .setColor(options.embedColor || 0x075FFF)
                .setFooter(foot)
        
            let accept = new Discord.MessageButton()
                .setLabel('Kabul et')
                .setStyle('SUCCESS')
                .setCustomId('accept')
        
            let decline = new Discord.MessageButton()
                .setLabel('Reddet')
                .setStyle('DANGER')
                .setCustomId('decline')
        
            let accep = new Discord.MessageActionRow()
                .addComponents([accept, decline])
            message.followUp({
              content: `Merhaba <@${opponent.id}>. Bir Taş Kağıt Makas Oyunu davetiniz var!`,
                embeds: [acceptEmbed],
                components: [accep]
            })
            let m = await message.fetchReply()

                let filter = (button) => button.user.id == opponent.id
                const collector = m.createMessageComponentCollector({ type: 'BUTTON', time: 30000, filter: filter })
                collector.on('collect', (button) => {
                    if (button.customId == 'decline') {
                        button.deferUpdate()
                        return collector.stop('decline')
                    }
                    button.deferUpdate()
                    let embed = new Discord.MessageEmbed()
                        .setTitle(`${message.user.tag} VS. ${opponent.tag}`)
                        .setColor(options.embedColor || 0x075FFF)
                        .setFooter(foot)
                        .setDescription(", 📄 veya ✂️ seçin")
        
                    if (options.rockColor === 'grey') {
                        options.rockColor = 'SECONDARY'
                    } else if (options.rockColor === 'red') {
                        options.rockColor = 'DANGER'
                    } else if (options.rockColor === 'green') {
                        options.rockColor = 'SUCCESS'
                    } else if (options.rockColor === 'blurple') {
                        options.rockColor = 'PRIMARY'
                    }
        
                    let rock = new Discord.MessageButton()
                        .setLabel('TAŞ')
                        .setCustomId('rock')
                        .setStyle(options.rockColor || 'SECONDARY')
                        .setEmoji("🪨")
        
                    if (options.paperColor === 'grey') {
                        options.paperColor = 'SECONDARY'
                    } else if (options.paperColor === 'red') {
                        options.paperColor = 'DANGER'
                    } else if (options.paperColor === 'green') {
                        options.paperColor = 'SUCCESS'
                    } else if (options.paperColor === 'blurple') {
                        options.paperColor = 'PRIMARY'
                    }
        
                    let paper = new Discord.MessageButton()
                        .setLabel('KAĞIT')
                        .setCustomId('paper')
                        .setStyle(options.paperColor || 'SECONDARY')
                        .setEmoji("📄")
        
                    if (options.scissorsColor === 'grey') {
                        options.scissorsColor = 'SECONDARY'
                    } else if (options.scissorsColor === 'red') {
                        options.scissorsColor = 'DANGER'
                    } else if (options.scissorsColor === 'green') {
                        options.scissorsColor = 'SUCCESS'
                    } else if (options.scissorsColor === 'blurple') {
                        options.scissorsColor = 'PRIMARY'
                    }
        
                    let scissors = new Discord.MessageButton()
                        .setLabel('MAKAS')
                        .setCustomId('scissors')
                        .setStyle(options.scissorsColor || 'SECONDARY')
                        .setEmoji("✂️")
        
                    let row = new Discord.MessageActionRow()
                        .addComponents([rock, paper, scissors])
        
                    message.editReply({
                        embeds: [embed],
                        components: [row]
                    })
        
                    collector.stop()
                    let ids = new Set()
                    ids.add(message.user.id)
                    ids.add(opponent.id)
                    let op, auth
                    let filter = (button) => ids.has(button.user.id)
                    const collect = m.createMessageComponentCollector({ filter: filter, type: 'BUTTON', time: 30000 })
                    collect.on('collect', (b) => {
                        ids.delete(b.user.id)
                        b.deferUpdate()
                        if (b.user.id == opponent.id) {
                            mem = b.customId
                        }
                        if (b.user.id == message.user.id) {
                            auth = b.customId
                        }
                        if (ids.size == 0) collect.stop()
                    })
                    collect.on('end', (c, reason) => {
                        if (reason == 'time') {
                            let embed = new Discord.MessageEmbed()
                                .setTitle('Oyun Zaman aşımına uğradı!')
                                .setColor(options.timeoutEmbedColor || 0xc90000)
                                .setDescription('Bir veya daha fazla oyuncu zamanında hamle yapmadı(30s)')
                                .setFooter(foot)
                            message.editReply({
                                embeds: [embed],
                                components: []
                            })
                        } else {
                            if (mem == 'rock' && auth == 'scissors') {
                                let embed = new Discord.MessageEmbed()
                                    .setTitle(`${opponent.tag} Kazandı!`)
                                    .setColor(options.winEmbedColor || 0x06bd00)
                                    .setDescription('Taş, Makası yendi')
                                    .setFooter(foot)
                                message.editReply({ embeds: [embed], components: [] })
                            } else if (mem == 'scissors' && auth == 'rock') {
                                let embed = new Discord.MessageEmbed()
                                    .setTitle(`${message.user.tag} Kazandı!`)
                                    .setColor(options.winEmbedColor || 0x06bd00)
                                    .setDescription('Taş, Makası yendi')
                                    .setFooter(foot)
                                message.editReply({ embeds: [embed], components: [] })
                            }
                            else if (mem == 'scissors' && auth == 'paper') {
                                let embed = new Discord.MessageEmbed()
                                    .setTitle(`${opponent.tag} Kazandı!`)
                                    .setColor(options.winEmbedColor || 0x06bd00)
                                    .setDescription('Makas Kağıdı yendi')
                                    .setFooter(foot)
                                message.editReply({ embeds: [embed], components: [] })
                            } else if (mem == 'paper' && auth == 'scissors') {
                                let embed = new Discord.MessageEmbed()
                                    .setTitle(`${message.user.tag} Kazandı!`)
                                    .setColor(options.winEmbedColor || 0x06bd00)
                                    .setDescription('Makas Kağıdı yendi')
                                    .setFooter(foot)
                               message.editReply({ embeds: [embed], components: [] })
                            }
                            else if (mem == 'paper' && auth == 'rock') {
                                let embed = new Discord.MessageEmbed()
                                    .setTitle(`${opponent.tag} Kazandı!`)
                                    .setColor(options.winEmbedColor || 0x06bd00)
                                    .setDescription('Kağıt Taşı yendi')
                                    .setFooter(foot)
                               message.editReply({ embeds: [embed], components: [] })
                            } else if (mem == 'rock' && auth == 'paper') {
                                let embed = new Discord.MessageEmbed()
                                    .setTitle(`${message.user.tag} Kazandı!`)
                                    .setColor(options.winEmbedColor || 0x06bd00)
                                    .setDescription('Kağıt Taşı yendi')
                                    .setFooter(foot)
                                message.editReply({ embeds: [embed], components: [] })
                            }
                            else {
                                let embed = new Discord.MessageEmbed()
                                    .setTitle('Çizmek!')
                                    .setColor(options.winEmbedColor || 0x06bd00)
                                    .setDescription(`Her iki oyuncu da ${mem}'i seçti`)
                                    .setFooter(foot)
                               message.editReply({ embeds: [embed], components: [] })
                            }
                        }
                    })
                })
                collector.on('end', (collected, reason) => {
                    if (reason == 'time') {
                        let embed = new Discord.MessageEmbed()
                            .setTitle('Meydan Okuma Zamanında Kabul Edilmedi')
                            .setAuthor(message.user.tag, message.user.displayAvatarURL())
                            .setColor(options.timeoutEmbedColor || 0xc90000)
                            .setFooter(foot)
                            .setDescription('Süre doldu!\nSüre sınırı: 30s')
                      message.editReply({
                            embeds: [embed],
                            components: []
                        })
                    }
                    if (reason == 'decline') {
                        let embed = new Discord.MessageEmbed()
                            .setTitle("Oyun Reddedildi!")
                            .setAuthor(message.user.tag, message.user.displayAvatarURL())
                            .setColor(options.timeoutEmbedColor || 0xc90000)
                            .setFooter(foot)
                            .setDescription(`${opponent.tag} oyununuzu reddetti!`)
                       message.editReply({
                            embeds: [embed],
                            components: []
                        })
                    }
                })
        }
       else if(!options.slash || options.slash === false){
        let opponent = message.mentions.members.first()
    if (!opponent) return message.channel.send('Rakipten bahsedilmedi!')
    if (opponent.id == message.author.id) return message.channel.send('Kendi başına oynayamazsın!')

    if (options.credit === false) {
        foot = options.embedFooter || "Taş kağıt makas"
    } else {
        foot = "©️ Sadece Geliştirin. | By- Dk Emre 30#8590"
    }

    let acceptEmbed = new Discord.MessageEmbed()
        .setTitle(`Kabul etmek için ${opponent.user.tag} bekleniyor!`)
        .setAuthor(message.author.tag, message.author.displayAvatarURL())
        .setColor(options.embedColor || 0x075FFF)
        .setFooter(foot)

    let accept = new Discord.MessageButton()
        .setLabel('Kabut Et')
        .setStyle('SUCCESS')
        .setCustomId('accept')

    let decline = new Discord.MessageButton()
        .setLabel('Reddet')
        .setStyle('DANGER')
        .setCustomId('decline')

    let accep = new Discord.MessageActionRow()
        .addComponents([accept, decline])
    message.channel.send({
        embeds: [acceptEmbed],
        components: [accep]
    }).then(m => {
        let filter = (button) => button.user.id == opponent.id
        const collector = m.createMessageComponentCollector({ type: 'BUTTON', time: 30000, filter: filter })
        collector.on('collect', (button) => {
            if (button.customId == 'decline') {
                button.deferUpdate()
                return collector.stop('decline')
            }
            button.deferUpdate()
            let embed = new Discord.MessageEmbed()
                .setTitle(`${message.author.tag} VS. ${opponent.user.tag}`)
                .setColor(options.embedColor || 0x075FFF)
                .setFooter(foot)
                .setDescription("Select 🪨, 📄, or ✂️")

            if (options.rockColor === 'grey') {
                options.rockColor = 'SECONDARY'
            } else if (options.rockColor === 'red') {
                options.rockColor = 'DANGER'
            } else if (options.rockColor === 'green') {
                options.rockColor = 'SUCCESS'
            } else if (options.rockColor === 'blurple') {
                options.rockColor = 'PRIMARY'
            }

            let rock = new Discord.MessageButton()
                .setLabel('TAŞ')
                .setCustomId('rock')
                .setStyle(options.rockColor || 'SECONDARY')
                .setEmoji("🪨")

            if (options.paperColor === 'grey') {
                options.paperColor = 'SECONDARY'
            } else if (options.paperColor === 'red') {
                options.paperColor = 'DANGER'
            } else if (options.paperColor === 'green') {
                options.paperColor = 'SUCCESS'
            } else if (options.paperColor === 'blurple') {
                options.paperColor = 'PRIMARY'
            }

            let paper = new Discord.MessageButton()
                .setLabel('KAĞIT')
                .setCustomId('paper')
                .setStyle(options.paperColor || 'SECONDARY')
                .setEmoji("📄")

            if (options.scissorsColor === 'grey') {
                options.scissorsColor = 'SECONDARY'
            } else if (options.scissorsColor === 'red') {
                options.scissorsColor = 'DANGER'
            } else if (options.scissorsColor === 'green') {
                options.scissorsColor = 'SUCCESS'
            } else if (options.scissorsColor === 'blurple') {
                options.scissorsColor = 'PRIMARY'
            }

            let scissors = new Discord.MessageButton()
                .setLabel('MAKAS')
                .setCustomId('scissors')
                .setStyle(options.scissorsColor || 'SECONDARY')
                .setEmoji("✂️")

            let row = new Discord.MessageActionRow()
                .addComponents([rock, paper, scissors])

            m.edit({
                embeds: [embed],
                components: [row]
            })

            collector.stop()
            let ids = new Set()
            ids.add(message.author.id)
            ids.add(opponent.id)
            let op, auth
            let filter = (button) => ids.has(button.user.id)
            const collect = m.createMessageComponentCollector({ filter: filter, type: 'BUTTON', time: 30000 })
            collect.on('collect', (b) => {
                ids.delete(b.user.id)
                b.deferUpdate()
                if (b.user.id == opponent.id) {
                    mem = b.customId
                }
                if (b.user.id == message.author.id) {
                    auth = b.customId
                }
                if (ids.size == 0) collect.stop()
            })
            collect.on('end', (c, reason) => {
                if (reason == 'time') {
                    let embed = new Discord.MessageEmbed()
                        .setTitle('Oyun Zaman aşımına uğradı!')
                        .setColor(options.timeoutEmbedColor || 0xc90000)
                        .setDescription('Bir veya daha fazla oyuncu zamanında hamle yapmadı(30s)')
                        .setFooter(foot)
                    m.edit({
                        embeds: [embed],
                        components: []
                    })
                } else {
                    if (mem == 'rock' && auth == 'scissors') {
                        let embed = new Discord.MessageEmbed()
                            .setTitle(`${opponent.user.tag} Kazandı!`)
                            .setColor(options.winEmbedColor || 0x06bd00)
                            .setDescription('Taş, Makası yendi')
                            .setFooter(foot)
                        m.edit({ embeds: [embed], components: [] })
                    } else if (mem == 'scissors' && auth == 'rock') {
                        let embed = new Discord.MessageEmbed()
                            .setTitle(`${message.member.user.tag} Kazandı!`)
                            .setColor(options.winEmbedColor || 0x06bd00)
                            .setDescription('Taş, Makası yendi')
                            .setFooter(foot)
                        m.edit({ embeds: [embed], components: [] })
                    }
                    else if (mem == 'scissors' && auth == 'paper') {
                        let embed = new Discord.MessageEmbed()
                            .setTitle(`${opponent.user.tag} Kazandı!`)
                            .setColor(options.winEmbedColor || 0x06bd00)
                            .setDescription('Makas Kağıdı yendi')
                            .setFooter(foot)
                        m.edit({ embeds: [embed], components: [] })
                    } else if (mem == 'paper' && auth == 'scissors') {
                        let embed = new Discord.MessageEmbed()
                            .setTitle(`${message.member.user.tag} Kazandı!`)
                            .setColor(options.winEmbedColor || 0x06bd00)
                            .setDescription('Makas Kağıdı yendi')
                            .setFooter(foot)
                        m.edit({ embeds: [embed], components: [] })
                    }
                    else if (mem == 'paper' && auth == 'rock') {
                        let embed = new Discord.MessageEmbed()
                            .setTitle(`${opponent.user.tag} Kazandı!`)
                            .setColor(options.winEmbedColor || 0x06bd00)
                            .setDescription('Kağıt Taşı yendi')
                            .setFooter(foot)
                        m.edit({ embeds: [embed], components: [] })
                    } else if (mem == 'rock' && auth == 'paper') {
                        let embed = new Discord.MessageEmbed()
                            .setTitle(`${message.member.user.tag} Kazandı!`)
                            .setColor(options.winEmbedColor || 0x06bd00)
                            .setDescription('Kağıt Taşı yendi')
                            .setFooter(foot)
                        m.edit({ embeds: [embed], components: [] })
                    }
                    else {
                        let embed = new Discord.MessageEmbed()
                            .setTitle('Çizmek!')
                            .setColor(options.winEmbedColor || 0x06bd00)
                            .setDescription(`Her iki oyuncu da ${mem}'i seçti`)
                            .setFooter(foot)
                        m.edit({ embeds: [embed], components: [] })
                    }
                }
            })
        })
        collector.on('end', (collected, reason) => {
            if (reason == 'time') {
                let embed = new Discord.MessageEmbed()
                    .setTitle('Meydan Okuma Zamanında Kabul Edilmedi')
                    .setAuthor(message.author.tag, message.author.displayAvatarURL())
                    .setColor(options.timeoutEmbedColor || 0xc90000)
                    .setFooter(foot)
                    .setDescription('Süre doldu!\nSüre sınırı: 30s')
                m.edit({
                    embeds: [embed],
                    components: []
                })
            }
            if (reason == 'decline') {
                let embed = new Discord.MessageEmbed()
                    .setTitle("Oyun Reddedildi!")
                    .setAuthor(message.author.tag, message.author.displayAvatarURL())
                    .setColor(options.timeoutEmbedColor || 0xc90000)
                    .setFooter(foot)
                    .setDescription(`${opponent.user.tag} oyununuzu reddetti!`)
                m.edit({
                    embeds: [embed],
                    components: []
                })
            }
        })
    })
}
} catch(err){
    console.log(`Hata oluştu. | rps | Hata: ${err}`)
}
}
module.exports = rps;
