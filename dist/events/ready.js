const { ActivityType } = require('discord.js');
module.exports = async client => {
    console.log(`Logged in as ${client.user.tag}!`);
    await client.application.commands.set(client.command.map(x => x));
    client.user.setPresence({
        status: "online",
        activities: [{
            name: "Quang tập code",
            type: ActivityType.Watching
        }]
    });
};