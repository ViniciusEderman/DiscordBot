const { player } = require(".");

module.exports = async (client, msg, args, command) => {
  if (command === "play") {
    const channel = msg.member.voice.channel;
    if (!channel)
      return msg.channel.send("Para iniciarmos, preciso que você entre em algum canal de voz");

    const search_music = args.join(" ");
    if (!search_music)
      return msg.channel.send("Digite o nome/link da musica: ");

    const queue = player.createQueue(msg.guild.id, {
      metadata: {
        channel: msg.channel,
      },
    });

    try {
      if (!queue.connection) await queue.connect(channel);
    } catch (error) {
      queue.destroy();
      return await msg.reply({
        content: "Não foi possivel entrar no server!!",
        ephemeral: true,
      });
    }

    const song = await player
      .search(search_music, {
        requestedBy: msg.author,
      })
      .then((x) => x.tracks[0]);
    client.user.setActivity(song.title, { type: "LISTENING" });
    if (!song) return msg.reply(`Erro na busca da música: ${search_music}!!!`);
    queue.play(song);

    msg.channel.send({ content: `Buscando por: **${song.title}**!` });
  } else if (command === "skip") {
    const queue = player.getQueue(msg.guild.id);
    queue.skip();
    msg.channel.send(`Proxima música.`);
  } else if (command === "break") {
    const queue = player.getQueue(msg.guild.id);
    queue.stop();
    msg.channel.send(`Pediu pra parar parouuu.`);
  } else if (command === "pause") {
    const queue = player.getQueue(msg.guild.id);
    queue.setPaused(true);
    msg.channel.send(`Pause.`);
  } else if (command === "continue") {
    const queue = player.getQueue(msg.guild.id);
    queue.setPaused(false);
    msg.channel.send(`Continuando a tocar.`);
  }
};