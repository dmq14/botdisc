// util/feedback.js
module.exports = {
    name: "feedback",
    description: "Submit feedback.",
    options: [
        {
        name: "comment",
        type: "string",
        description: "The message to reply with",
        required: true,
        type: 3,
        },
        ],
    run: async (client, interaction, args) => {
        const comment = interaction.options.getString('comment');
        // Kiểm tra xem có comment từ người dùng hay không
        if (!comment) {
            return interaction.reply({
                content: "Please provide a comment.",
                ephemeral: true,
            });
        }

        // Gửi thông tin đến máy chủ Express
        const response = await fetch("http://localhost:3000/api/comment", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                comment: comment,
                discordUserId: interaction.user.id,
                discordUsername: interaction.user.username,
                discordChannelId: interaction.channel.id,
            }),
        });

        // Xử lý phản hồi từ máy chủ Express
        const data = await response.json();

        // Xử lý phản hồi từ máy chủ Discord
        await interaction.reply({
            content: `Thanks for reaching out! We will be passing this along to the team directly! Good luck playing the game!`,
        });

        interaction.setCountdown(8000);
    },
};
