const Group = require('../database/schemas/group');
const User = require('../database/schemas/users');

exports.createGroup = async (req, res) => {
  const { name, members } = req.body;
  try {
    const group = new Group({
      name,
      members,
    });
    await group.save();
    res.json(group);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.addMember = async (req, res) => {
  const { userId } = req.body;
  try {
    const group = await Group.findById(req.params.groupId);
    if (!group) {
      return res.status(404).json({ msg: 'Group not found' });
    }
    group.members.push(userId);
    await group.save();
    res.json(group);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.removeMember = async (req, res) => {
  const { userId } = req.body;
  try {
    const group = await Group.findById(req.params.groupId);
    if (!group) {
      return res.status(404).json({ msg: 'Group not found' });
    }
    group.members = group.members.filter(member => member.toString() !== userId);
    await group.save();
    res.json(group);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
