const {player} = require(".")

module.exports = async (cliente, msg, args, command) => {
    if(command === 'tocar'){
        const channel = msg.member.voice.channel;
        if(!channel) return msg.channel.send("Você precisa entrar no canal de voz");

        const search_music = args.join("");
        if(!search_music) return msg.channel.send("Digite o nome da música ou o link:");

        const queue =  player.createQueue(msg.guild.id, {
            metadata: {
                channel: msg.channel,
            },
        });
        try {
            if(!queue.connection) await queue.connect(channel);
        } catch (error) {
            queue.destroy()
            return await msg.reply({
                content: "não foi possível no servidor",
                ephemeral: true, 
            })
        }
    }
}