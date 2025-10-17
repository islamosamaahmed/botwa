const { generateWAMessageFromContent, proto } = require('@whiskeysockets/baileys')

let handler = async (m, { conn, args }) => {
  try {
    let target
    if (args[0]) {
      let num = args[0].replace(/[^0-9]/g, '')
      target = num + '@s.whatsapp.net'
    } else {
      target = m.sender
    }

    let jid = conn.decodeJid(target)
    let isLid = jid.endsWith('@lid')

    let caption = `*ID Checker*\n\n`
    let copyText = jid
    if (isLid) {
      caption += `• *LID*: ${jid}`
      copyText = jid
    } else {
      let lid = jid.split('@')[0] + '@lid'
      caption += `• *JID*: ${jid}\n`
      caption += `• *LID*: ${lid}`
      copyText = `JID: ${jid}\nLID: ${lid}`
    }

    const buttonMsg = generateWAMessageFromContent(m.chat, {
      viewOnceMessage: {
        message: {
          messageContextInfo: {
            deviceListMetadata: {},
            deviceListMetadataVersion: 2
          },
          interactiveMessage: proto.Message.InteractiveMessage.create({
            body: proto.Message.InteractiveMessage.Body.create({ text: caption }),
            nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
              buttons: [
                {
                  name: 'cta_copy',
                  buttonParamsJson: JSON.stringify({
                    display_text: 'Salin ID',
                    copy_code: copyText
                  })
                }
              ]
            })
          })
        }
      }
    }, { userJid: m.sender, quoted: m })

    await conn.relayMessage(m.chat, buttonMsg.message, { messageId: buttonMsg.key.id })

  } catch (e) {
    console.error(e)
    await conn.reply(m.chat, "❌ Terjadi kesalahan saat mengambil ID.", m)
  }
}

handler.help = ["getlid"]
handler.tags = ["info"]
handler.command = /^getlid$/i

module.exports = handler