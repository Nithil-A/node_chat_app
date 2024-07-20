const Message = require('../database/schemas/message');
const Group = require('../database/schemas/group');
const User = require('../database/schemas/users');

exports.sendMessage = async (req, res) => {
  const { content, groupId } = req.body;
  try {
    const message = new Message({
      sender: req.user.id,
      content,
      group: groupId,
    });
    await message.save();
    res.json(message);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find({ group: req.params.groupId }).sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
