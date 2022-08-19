const router = require('express').Router();

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:id
router.route('/:userId').get(getUser).put(updateUser).delete(deleteUser);

router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);

module.exports = router;