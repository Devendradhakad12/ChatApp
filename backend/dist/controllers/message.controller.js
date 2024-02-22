import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { reciverId } = req.params;
        const senderId = req.user?._id;
        if (!reciverId || !message)
            return res
                .status(400)
                .json({ error: "Reciver ID and message is required" });
        let conversation = await Conversation.findOne({
            members: { $all: [reciverId, senderId] },
        });
        if (!conversation) {
            conversation = await Conversation.create({
                members: [senderId, reciverId],
            });
        }
        const newMessage = new Message({
            message,
            senderId,
            reciverId,
        });
        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }
        await Promise.all([newMessage.save(), conversation.save()]);
        res.status(200).json({ newMessage });
    }
    catch (error) {
        console.log("SendMessage controller route", error.message);
        return res.status(500).json({ error: error.messaeg });
    }
};
