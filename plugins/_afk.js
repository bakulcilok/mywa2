//- Made by BakulCilok
//- FB: fb.com/obito.obito.568 - IG: @halim.rohmana

let handler = m => m
handler.before = m => {
let user = global.db.data.users[m.sender]

if (user.afk > -1) {

conn.sendBtn(m.chat, `Kamu berhenti AFK ${user.afkReason ? ' setelah ' + user.afkReason : ''} Selama ${clockString(new Date - user.afk)}`, global.footer, 'LIST MENU', '#menu', m)

user.afk = -1

user.afkReason = ''

}

let jids = [...new Set([...(m.mentionedJid || []), ...(m.quoted ? [m.quoted.sender] : [])])]

for (let jid of jids) {

let user = global.db.data.users[jid]

if (!user) continue

let afkTime = user.afk

if (!afkTime || afkTime < 0) continue

let reason = user.afkReason || ''

conn.sendBtn(m.chat, `Jangan tag dia!
Dia sedang AFK ${reason ? 'dengan alasan ' + reason : 'tanpa alasan'}
Selama ${clockString(new Date - afkTime)}`, global.footer, 'LIST MENU', '#menu', m)

}

return true

}

module.exports = handler

function clockString(ms) {

let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)

let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60

let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60

return [h, m, s].map(v => v.toString().padStart(2, 0) ).join(':')

}

