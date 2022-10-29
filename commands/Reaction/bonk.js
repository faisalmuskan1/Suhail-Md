const axios = require('axios')
const { fetchJson ,GIFBufferToVideoBuffer} = require('../../lib')

module.exports = {
   name: 'bonk',
   category: 'reaction',
   async exec(citel, Void) {

    var bite = await fetchJson(`https://api.waifu.pics/sfw/bonk`);
    const response = await axios.get(bite.url, {
					responseType: "arraybuffer",
				});
    const buffer = Buffer.from(response.data, "utf-8");
   let users = citel.mentionedJid ? citel.mentionedJid[0] : citel.msg.contextInfo.participant || false;
   let gif = await GIFBufferToVideoBuffer(buffer);	
if(users){
	let cap = `@${citel.sender.split("@")[0]} bonked to @${users.split("@")[0]} `;
  Void.sendMessage(citel.chat, { video: gif, gifPlayback: true, mentions: [users, citel.sender], caption: cap }, { quoted: citel });
} else {
let cap = `@${citel.sender.split("@")[0]} bonked to everyone. `;	
Void.sendMessage(citel.chat, { video: gif, gifPlayback: true, mentions: [citel.sender], caption: cap }, { quoted: citel });	
}
   }
}
