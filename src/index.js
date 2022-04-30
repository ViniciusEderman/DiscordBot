const Discord = require('discord.js');
const { Intents } = require('discord.js');
const dotenv = require('dotenv');
const { Client } = require('discord.js');
const { Player } = require('discord-player');
const {prefix, token} = require("../config.json")


dotenv.config();

const client = new Discord.Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});



client.login(process.env.TOKEN);

client.on("ready", () => {
    console.log("Bot is ready :3 ");
});

client.on("messageCreate", (msg) => {
    if(!msg.guild) return;
    if(!msg.content.startsWith(prefix)) return;
    if(msg.content === prefix + "Hello"){
        msg.reply({
            content: "Okay",
        });
    }
    if(msg.content === prefix + "Bom dia") {
        msg.reply({
            content: "Bom dia, " + msg.author.username,
        });
    }
});

const cliente = new Client({
    restTimeOffset: 0,
    shards: "auto",
    intents: 641,
});

const player = new Player(cliente, {
    leaveOnEnd: true,
    leaveOnStrop: true,
    leaveOnEmpty: true,
    leaveOnEmptyCooldown: 5000, 
    autoSelfDeaf: true,
    initialVolume: 50,
    bufferingTimeout: 3000
});

client.on("ready", () => {
    console.log("bot ativo");
    client.user.setActivity("Your Song", { type: "LISTENING" });
}); 

client.on("messageCreate", (msg) => {
    if(!msg.guild || msg.author.bot) return;
    if(!msg.content.startsWith(prefix)) return;

    const args = msg.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    require("./commands")(client, msg, args, command);
});

module.exports = { player, cliente};

client.login()