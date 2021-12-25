const Discord = require("discord.js")
const client = new Discord.Client(
    { intents: ["GUILDS", "GUILD_MEMBERS", "GUILD_MESSAGES"] }
)

client.login("process.env.token")

client.on("message", message => {
    if (message.content.startsWith("!say")) {
        var args = message.content.split(/\s+/);
        var testo;
        testo = args.slice(1).join(" ");
        if (!testo) {
            message.channel.send("Inserire un messaggio");
            return
        }
        message.delete()
        message.channel.send(testo)
    }
})

client.on('message', message => {
    if(message.content == "ciao") {
        message.react("<:Ciao:923243462046912582>")
    }
})

client.on('message', message => {
    if(message.content == "GG") {
        message.react("<:GG:922947736297406485>")
    }
})

client.on('message', message => {
    if(message.content == "?") {
        message.react("<:Domandoso:922947675370963024>")
    }
})

client.on('message', message => {
    if(message.content == "F") {
        message.react("<:F_:922947711643320330>")
    }
})

client.on('message', message => {
    if(message.content == "gg") {
        message.react("<:GG:922947736297406485>")
    }
})

client.on('message', message => {
    if(message.content == "f") {
        message.react("<:F_:922947711643320330>")
    }
})

client.on('message', message => {
    if(message.content == "Ciao") {
        message.react("<:Ciao:923243462046912582>")
    }
})

client.on('message', message => {
    if(message.content == "Ciao!") {
        message.react("<:Ciao:923243462046912582>")
    }
})

client.on("guildMemberAdd", member => { //Update canale quando entra un utente dal server
    var canale = client.channels.cache.get("922965230441607169")
    canale.setName("👾 | Utenti: " + member.guild.memberCount)
});
client.on("guildMemberRemove", member => { //Update canale quando esce un utente dal server
    var canale = client.channels.cache.get("922965230441607169")
    canale.setName("👾 | Utenti: " + member.guild.memberCount)
});

client.on("messageCreate", message => {
    if (message.content.startsWith("!channelinfo")) {
        var canale = message.mentions.channels.first()
        if(!canale) canale = message.channel
        if (!canale) {
            message.channel.send("Canale non trovato");
            return
        }
        switch (canale.type) {
            case "GUILD_TEXT": canale.type = "Text"; break;
            case "GUILD_VOICE": canale.type = "Voice"; break;
            case "GUILD_NEWS": canale.type = "News"; break;
            case "GUILD_CATEGORY": canale.type = "Category"; break;
        }
        if (canale.type == "Voice") {
            var embed = new Discord.MessageEmbed()
                .setTitle(canale.name.toString())
                .setDescription("Tutte le statistiche su questo canale")
                .addField("Channel ID", canale.id.toString(), true)
                .addField("Type", canale.type.toString(), true)
                .addField("Position", canale.rawPosition.toString(), true)
                .addField("Category", canale.parent.name.toString(), true)
                .addField("Bitrate", canale.bitrate.toString(), true)
                .addField("User limit", canale.userLimit == 0 ? "∞" : canale.userLimit.toString(), true)
            message.channel.send({embeds: [embed]})
            return
        }
        if (canale.type == "Category") {
            var embed = new Discord.MessageEmbed()
                .setTitle(canale.name.toString())
                .setDescription("Tutte le statistiche su questa categoria")
                .addField("Category ID", canale.id.toString(), true)
                .addField("Type", canale.type.toString(), true)
                .addField("Position", canale.rawPosition.toString(), true)
                .addField("Category created", canale.createdAt.toDateString(), false)
            message.channel.send({embeds: [embed]})
            return
        }
        var lastMessage = canale.messages.fetch(canale.lastMessageID)
            .then(lastMessage => {
                var embed = new Discord.MessageEmbed()
                    .setTitle(canale.name.toString())
                    .setDescription("Tutte le statistiche su questo canale")
                    .addField("Channel ID", canale.id.toString(), true)
                    .addField("Type", canale.type.toString(), true)
                    .addField("Position", canale.rawPosition.toString(), true)
                    .addField("Category", canale.parent.name.toString(), true)
                    .addField("Topic", !canale.topic ? "No topic" : canale.topic.toString(), true)
                    .addField("NSFW", canale.nsfw ? "Yes" : "No", true)
                    .addField("Last message", lastMessage.author.username + "#" + lastMessage.author.discriminator + " - " + lastMessage.content.toString(), true)
                    .addField("Channel created", canale.createdAt.toDateString(), false)
                message.channel.send({embeds: [embed]})
            })
            .catch(() => {
                var embed = new Discord.MessageEmbed()
                    .setTitle(canale.name)
                    .setDescription("Tutte le statistiche su questo canale")
                    .addField("Channel ID", canale.id.toString(), true)
                    .addField("Type", canale.type.toString(), true)
                    .addField("Position", canale.rawPosition.toString(), true)
                    .addField("Category", canale.parent.name.toString(), true)
                    .addField("Topic", !canale.topic ? "No topic" : canale.topic.toString(), true)
                    .addField("NSFW", canale.nsfw ? "Yes" : "No", true)
                    .addField("Last message", "Not found", true)
                    .addField("Channel created", canale.createdAt.toDateString(), false)
                message.channel.send({embeds: [embed]})
            });
    }
})

//BENVENUTO
client.on("guildMemberAdd", member => {
    if (member.user.bot) return
    var canale = client.channels.cache.get("922926325533126720") //Settare il canale di benvenuto
    canale.send(`
-------------- WELCOME --------------
Ciao ${member.toString()}, benvenuto in ${member.guild.name}
Sei il **${member.guild.memberCount}° Membro**`)
});
//ADDIO
client.on("guildMemberRemove", member => {
    if (member.user.bot) return
    var canale = client.channels.cache.get("922926325533126720") //Settare il canale di addio
    canale.send(`
-------------- GOODBYE --------------
Ciao ${member.toString()}, ci rivediamo presto qua in ${member.guild.name}`)
});

client.on('message', message => {
    if (message.content.startsWith("!youtube")) {
    message.channel.send("Ecco il mio canale YouTube: https://www.youtube.com/channel/UCUZ8dzZaF7c8NjJOCMxnEdw")} 
})

client.on('message', message => {
    if (message.content.startsWith("!yt")) {
    message.channel.send("Ecco il mio canale YouTube: https://www.youtube.com/channel/UCUZ8dzZaF7c8NjJOCMxnEdw")} 
})


