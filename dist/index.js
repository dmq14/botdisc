require("dotenv").config();
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const mongoose = require("mongoose");
const command = require("./handlers/command");

const client = new Client({
    intents: [GatewayIntentBits.Guilds]
});

client.command = new Collection();
client.countdown = new Collection();

["event", "command"].forEach(file => require(`./handlers/${file}`)(client));
if (process.env.MONGO) {
    mongoose.connect(process.env.MONGO).then(() => {
        console.log("Connect mongo!");
    });
    mongoose.connection.on("disconnected", () => console.log("Disconnect mongo!!"));
}

client.login(process.env.TOKEN);