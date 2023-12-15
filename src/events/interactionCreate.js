const ms = require("ms");
module.exports = async (client, interaction) => {
    if(interaction.isChatInputCommand()){
        const command = client.command.get(interaction.commandName);
        if(!interaction.guild) return interaction.reply({
            content: "Only use in server!",
            ephemeral: true
        });
        if(!command) return interaction.reply({
            content: "Error 404!",
            ephemeral: true
        });
        const countdownData = `${interaction.user.id}/${interaction.commandName}`;
        if(client.countdown.has(countdownData)){
            const time = ms(client.countdown.get(countdownData) - Date.now());
            return interaction.reply({
                content: `There are ${time} seconds left to do it!`,
                ephemeral: true
            });
        }
        interaction.setCountdown = async(time) =>{
            client.countdown.set(countdownData, Date.now()+time);
            setTimeout(()=>client.countdown.delete(countdownData),time);
        }
        await command.run(client, interaction);
    }
}