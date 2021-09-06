const Discord = require('discord.js')

async function clickBtn(button, options = []) {
    if (button.isButton()) {
    try{
    if (options.credit === false) {
        foot = button.message.guild.name, button.message.guild.iconURL()
    } else {
        foot = '©️ Sadece Geliştirin. npm i simply-djs'
    }

    if (button.customId.startsWith('role-')) {
        let rle = button.customId.replace("role-", "")

        let real = button.guild.roles.cache.find(r => r.id === rle)
        if (!real) return;
        else {

            if (button.member.roles.cache.find(r => r.id === real.id)) {

                button.reply({ content: 'Zaten rolün var. Şimdi kaldırılıyor', ephemeral: true })

                button.member.roles.remove(real).catch(err => button.message.channel.send('ERROR: Rol benden yüksek. MISSING_PERMISSIONS'))


            } else {

                button.reply({ content: `Size rolü verdi Adı: ${real.name} | ID: ${real.id}`, ephemeral: true })

                button.member.roles.add(real).catch(err => button.message.channel.send('ERROR: Rol benden yüksek. MISSING_PERMISSIONS'))
            }

        }
    }

    
    let { MessageButton, MessageActionRow } = require('discord.js')

    if (button.customId === 'create_ticket') {

        let ticketname = `ticket_${button.user.id}`

        let antispamo = await button.guild.channels.cache.find(ch => ch.name === ticketname.toLowerCase());

        if (options.closeColor) {

            if (options.closeColor === 'grey') {
                options.closeColor = 'SECONDARY'
            } else if (options.closeColor === 'red') {
                options.closeColor = 'DANGER'
            } else if (options.closeColor === 'green') {
                options.closeColor = 'SUCCESS'
            } else if (options.closeColor === 'blurple') {
                options.closeColor = 'PRIMARY'
            }

        }

        if (options.openColor) {

            if (options.openColor === 'grey') {
                options.openColor = 'SECONDARY'
            } else if (options.openColor === 'red') {
                options.openColor = 'DANGER'
            } else if (options.openColor === 'green') {
                options.openColor = 'SUCCESS'
            } else if (options.openColor === 'blurple') {
                options.openColor = 'PRIMARY'
            }

        }


        if (options.delColor) {

            if (options.delColor === 'grey') {
                options.delColor = 'SECONDARY'
            } else if (options.delColor === 'red') {
                options.delColor = 'DANGER'
            } else if (options.delColor === 'green') {
                options.delColor = 'SUCCESS'
            } else if (options.delColor === 'blurple') {
                options.delColor = 'PRIMARY'
            }

        }

        if (antispamo) {
            button.reply({ content: options.cooldownMsg || 'Zaten açılmış bir biletiniz var.. Lütfen başka bir bilet açmadan önce silin.', ephemeral: true })

        } else if (!antispamo) {
            button.deferUpdate();

            roles = {
                id: options.role || button.user.id,
                allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY']
            }

            chparent = options.categoryID || null
            let categ = button.guild.channels.cache.get(options.categoryID)
            if (!categ) { chparent = null }

            button.guild.channels.create(`ticket_${button.user.id}`, {
                type: "text",
                parent: chparent,
                permissionOverwrites: [
                    {
                        id: button.message.guild.roles.everyone,
                        deny: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY'] //İzinleri reddet
                    },
                    {
                        id: button.user.id,
                        allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY'],
                    },
                    roles
                ],
            }).then((ch) => {


                let emb = new Discord.MessageEmbed()
                    .setTitle('Bilet Oluşturuldu')
                    .setDescription(options.embedDesc || `Bilet ${button.user}. tarafından artırıldı. Yöneticilerden buraya çağrı yapmalarını rica ediyoruz.\n\nDağınıklığı azaltmak için bu kanal 10 dakika sonra silinecek`)
                    .setThumbnail(button.message.guild.iconURL())
                    .setTimestamp()
                    .setColor(options.embedColor || '#075FFF')
                    .setFooter(foot)


                let close_btn = new MessageButton()
                    .setStyle(options.closeColor || 'PRIMARY')
                    .setEmoji(options.closeEmoji || '🔒')
                    .setLabel('Close')
                    .setCustomId('close_ticket')

                let closerow = new MessageActionRow()
                    .addComponents([close_btn])

                ch.send({ content: `${button.user}`, embeds: [emb], components: [closerow] })

                if (options.timeout == true || !options.timeout) {
                    setTimeout(() => {
                        ch.send({ content: 'Mola.. 10 dakikaya ulaştınız. Bu bilet şu anda siliniyor.' })

                        setTimeout(() => {
                            ch.delete()
                        }, 10000)

                    }, 600000)
                } else return;
            })
        }
    }
    if (button.customId === 'close_ticket') {

        button.deferUpdate();

        button.channel.permissionOverwrites.edit(button.user.id, {
            SEND_MESSAGES: false,
            VIEW_CHANNEL: true
        })
            .catch((err) => { })

        let X_btn = new MessageButton()
            .setStyle(options.delColor || 'SECONDARY')
            .setEmoji(options.delEmoji || '❌')
            .setLabel('Sil')
            .setCustomId('delete_ticket')

        let open_btn = new MessageButton()
            .setStyle(options.openColor || 'SUCCESS')
            .setEmoji(options.openEmoji || '🔓')
            .setLabel('Yeniden Aç')
            .setCustomId('open_ticket')

        let row = new MessageActionRow()
            .addComponents([open_btn, X_btn])

        let emb = new Discord.MessageEmbed()
            .setTitle('Bilet Oluşturuldu')
            .setDescription(options.embedDesc || `Bilet ${button.user}. tarafından artırıldı. Yöneticilerden buraya çağrı yapmalarını rica ediyoruz.\n\nDağınıklığı azaltmak için bu kanal 10 dakika sonra silinecek`)
            .setThumbnail(button.message.guild.iconURL())
            .setTimestamp()
            .setColor(options.embedColor || '#075FFF')
            .setFooter(foot)

        button.message.edit({ content: `${button.user}`, embeds: [emb], components: [row] })
    }

    if (button.customId === 'open_ticket') {

        button.channel.permissionOverwrites.edit(button.user.id, {
            SEND_MESSAGES: true,
            VIEW_CHANNEL: true
        }).catch((err) => { })

        let emb = new Discord.MessageEmbed()
            .setTitle('Bilet Oluşturuldu')
            .setDescription(options.embedDesc || `Bilet ${button.user}. tarafından artırıldı. Yöneticilerden buraya çağrı yapmalarını rica ediyoruz.` + `Dağınıklığı azaltmak için bu kanal 10 dakika sonra silinecek`)
            .setThumbnail(button.message.guild.iconURL())
            .setTimestamp()
            .setColor(options.embedColor || '#075FFF')
            .setFooter(foot)


        let close_btn = new MessageButton()
            .setStyle(options.closeColor || 'PRIMARY')
            .setEmoji(options.closeEmoji || '🔒')
            .setLabel('Kapat')
            .setCustomId('close_ticket')

        let closerow = new MessageActionRow()
            .addComponents([close_btn])

        button.message.edit({ content: `${button.user}`, embedDesc: [emb], components: [closerow] })
        button.reply({ content: 'Bileti yeniden açtı ;)', ephemeral: true })

    }

    if (button.customId === 'delete_ticket') {

        let surebtn = new MessageButton()
            .setStyle('DANGER')
            .setLabel('Emin ol')
            .setCustomId('s_ticket')

        let nobtn = new MessageButton()
            .setStyle('SUCCESS')
            .setLabel('İptal')
            .setCustomId('no_ticket')

        let row1 = new MessageActionRow()
            .addComponents([surebtn, nobtn])

        let emb = new Discord.MessageEmbed()
            .setTitle('Emin misin ?')
            .setDescription(`Bu, kanalı ve bileti siler. Bu işlemi geri alamazsınız`)
            .setTimestamp()
            .setColor('#c90000')
            .setFooter(foot)

        button.reply({ embeds: [emb], components: [row1] })


    }

    if (button.customId === 's_ticket') {

        button.reply({ content: 'Bilet ve kanal siliniyor.. Lütfen bekleyiniz.' })

        setTimeout(() => {
            let delch = button.message.guild.channels.cache.get(button.message.channel.id)
            delch.delete().catch((err) => {
                button.message.channel.send({ content: 'Bir hata oluştu. ' + err, ephemeral: true })
            })
        }, 2000)
    }

    if (button.customId === 'no_ticket') {
        button.message.delete();
        button.reply({ content: 'Bilet Silme iptal edildi', ephemeral: true })
    }
} catch(err){
    console.log(`Hata oluştu. | tıklamaBtn | Hata: ${err}`)
}
    }
}
module.exports = clickBtn;