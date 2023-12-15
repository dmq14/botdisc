
module.exports = {
    name: "ping",
    description: "Ping.",
    run: async(client, integration)=>{
        integration.reply({content: `Ping: ${client.ws.ping}ms!`});
        integration.setCountdown(8000);
    }
}