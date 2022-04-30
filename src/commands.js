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
            });
        }
        const song = await player.search(search_music, {
            requestedBy:msg.author,
        }).then((x) =>x.tracks[0])
        client.user.setActivity(song.title, { type: "LISTENING" });
        if(!song) return msg.reply('erro ao procurar música:  ${search_music} ');
        queue.play(song);

        msg.channel.send({content: 'buscando ${song.title}'});
    }else if(command === "skip"){
    }
};