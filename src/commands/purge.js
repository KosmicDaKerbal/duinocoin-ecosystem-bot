const process = require("process");
const { EmbedBuilder } = require("discord.js");
module.exports = {
    execute: async function (embed) {
        const purge = new EmbedBuilder().setFooter({ text: `${process.env.BOT_NAME} v${process.env.BOT_VERSION}`, iconURL: process.env.ICON }).setTimestamp();
        const param = Math.abs(embed.options.get("purge-limit").value);
        if ((100 - param) > 0) {
            purge.setAuthor({ name: `${process.env.BOT_NAME} Administration`, iconURL: process.env.SUCCESS })
            .setTitle("Purged \`" + param + "\` Messages.")
            .setColor(0x00ff00);
            await embed.channel.bulkDelete(param);
            await embed.reply({ embeds: [purge] });
        } else {
            purge.setAuthor({ name: `${process.env.BOT_NAME} Administration`, iconURL: process.env.FAIL })
            .setTitle("Value must be greater than 0 and less than 100.")
            .setColor(0xff0000);
            await embed.reply({ embeds: [purge] });
        }
    }
}