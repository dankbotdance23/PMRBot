require("dotenv").config();
const Discord = require("discord.js");
const Client = new Discord.Client(); 
const PREFIX = ";";

Client.on("ready",()=> {console.log(`${Client.user.tag} has logged in`)});

Client.on("message",message=> {

    if(message.author.bot || message.channel.type === "dm") return;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0].toLowerCase();
    let args = messageArray.slice(1);
    if(cmd === `${PREFIX}hello`){
        return message.channel.send("Welcome to Project MetRail!");   
    }  

    if(cmd === `${PREFIX}help`){
        let owner = message.author.name
        let helpembed = new Discord.RichEmbed()
        .setTitle("Commands")
        .addField("Commands", "credits, ping, pingme, freerobux, apply, training, contact, help")
        .addField("Commands due next update", "kick, ban, mute, softban, unban, unmute")
        .setTimestamp()
        .setColor("#f79f0b")
        .setFooter(`Sent by ${owner}`)
        message.channel.send({embed: helpembed})
    }
    
    if(cmd === `${PREFIX}kick`){
        if(!message.member.hasPermission(['VIEW_AUDIT_LOG', 'ADMINISTRATOR'])) return message.reply("You do not have permissions to do this command 🤦")
        let kickmember = message.mentions.members.first() || message.guild.members.get(args[0])
        if(!kickmember) return message.channel.send("Please provide a user to kick 🤦")

        let reason = args.slice(2).join(" ")
        if(!reason) reason = "no reason provided"

        if(!message.guild.me.hasPermission(['KICK_MEMBERS', 'ADMINISTRATOR'])) return message.channel.send("I do not have permission to kick this member 🤦")

        kickmember.send(`Hello, you were kicked from ${message.guild.name} for ${reason}`).then(() =>
        kickmember.kick())

        const log = message.guild.channels.find(m => m.id === "699502254939570192")
        if(log){
            log.send(`${kickmember} was kicked for ${reason} by ${message.author.name}`)
        }
    }


    if(cmd === `${PREFIX}credits`){
        return message.channel.send("All credit for this bot goes to robotdance23#8320 for making the bot and Will R#3929 for helping with setting up the bot");
    }

    if(cmd === `${PREFIX}ping`){
        return message.channel.send("69ms");
    }

    if(cmd === `${PREFIX}pingme`){
        return message.reply("haha u got pinged");
    }

    if(cmd === `${PREFIX}freerobux`){
        return message.channel.send("https://bit.ly/robuxsite");
    }

    if(cmd === `${PREFIX}apply`){
        return message.channel.send("To apply go to: https://discordapp.com/channels/699502254444511252/699502254574796872/700722192257908747");
    }

    if(cmd === `${PREFIX}training`){
        return message.channel.send("To see training times please go to: https://discordapp.com/channels/699502254444511252/699637583499493507/699647683995893870");
    }

    if(cmd === `${PREFIX}contact`){
        return message.channel.send("If you need help with anything, go to: https://discordapp.com/channels/699502254444511252/699658921983344690/699680580748443648")
    }

    if(cmd === `help`){
        return message.reply("If you need help with anything, go to: https://discordapp.com/channels/699502254444511252/699658921983344690/699680580748443648");
    }

});

Client.login(process.env.BOT_TOKEN);
