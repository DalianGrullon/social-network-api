const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models/index');

module.exports = {
  getUsers(req, res) {
    User.find()
      .then(async (users) => {
        const userObj = { users };
        return res.status(200).json(userObj);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  getUser(req, res) {
    User.findOne({ _id: ObjectId(req.params.userId) })
      .select('-__v')
      .then(async (user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.status(200).json({ user })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.status(201).json(user))
      .catch((err) => res.status(500).json(err));
  },
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: ObjectId(req.params.userId) },
      req.body,
      { new: true },
      (err, result) => {
        if (result) {
          res.status(200).json(result);
        } else {
          res.status(500).json(err);
        }
      }
    );
  },
  deleteUser(req, res) {
    User.findOneAndRemove({ _id: ObjectId(req.params.userId) })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No such user exists' })
          : Thought.deleteMany(
              { username: user.username },
              { new: true }
            )
      )
      .then(() =>
        res.status(200).json({
          message: 'User and their associated thoughts have been successfully deleted'
        })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: ObjectId(req.params.userId) },
      { $addToSet: { friends: ObjectId(req.params.friendId) } },
      { new: true }
    )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: 'No user found with that ID :(' })
          : res.status(201).json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  deleteFriend(req, res) {
    User.findOneAndUpdate(
      { _id: ObjectId(req.params.userId) },
      { $pull: { friends: ObjectId(req.params.friendId) } },
      { new: true }
    )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: 'No user found with that ID :(' })
          : res.status(200).json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
};