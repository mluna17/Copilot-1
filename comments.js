// Create web server
// 1. Import express
const express = require('express');
// 2. Create router
const router = express.Router();
// 3. Import comments model
const commentsModel = require('../models/commentsModel');
// 4. Create API
// 4.1. Get all comments
router.get('/', async (req, res) => {
    try {
        const comments = await commentsModel.find({});
        res.json(comments);
    } catch (err) {
        res.json({message: err});
    }
});
// 4.2. Get comment by id
router.get('/:commentId', async (req, res) => {
    try {
        const comment = await commentsModel.findById(req.params.commentId);
        res.json(comment);
    } catch (err) {
        res.json({message: err});
    }
});
// 4.3. Create new comment
router.post('/', async (req, res) => {
    const comment = new commentsModel({
        postId: req.body.postId,
        userId: req.body.userId,
        content: req.body.content,
        created: req.body.created
    });
    try {
        const savedComment = await comment.save();
        res.json(savedComment);
    } catch (err) {
        res.json({message: err});
    }
});
// 4.4. Update comment
router.patch('/:commentId', async (req, res) => {
    try {
        const updatedComment = await commentsModel.updateOne(
            {_id: req.params.commentId},
            {$set: {content: req.body.content}}
        );
        res.json(updatedComment);
    } catch (err) {
        res.json({message: err});
    }
});
// 4.5. Delete comment
router.delete('/:commentId', async (req, res) => {
    try {
        const removedComment = await commentsModel.remove({_id: req.params.commentId});
        res.json(removedComment);
    } catch (err) {
        res.json({message: err});
    }
});
// 5. Export router
module.exports = router;