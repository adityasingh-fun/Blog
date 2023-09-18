const commentModel = require('../models/comment');

const createComment = async function (req, res) {
    try {
        let comment = req.body;


        const commentt = await commentModel.create(comment);
        res.status(201).send({ status: true, data: commentt });
    } catch (error) {
        res.status(400).send({ status: false, msg: error.message });
    }
}

const updateComment = async function (req, res) {

    try {
        let authorId = req.params.authorId;

        const isAuthor = await commentModel.findOne({ authorId: authorId });
        if (!isAuthor) {
            return res.status(403).send({ status: false, msg: "Forbidden" });
        }
        let commentId = req.params.commentId;
        let newComment = req.body.newComment;

        const updateComment = await commentModel.findOneAndUpdate(
            { _id: commentId },
            { updateContent: newComment },
            { new: true }
        );
        // checking if the document isDeleted(true) and is not present in database
        if (!updateComment)
            return res.status(404).send({ status: false, msg: "No such data present" });


        res.status(200).send({
            status: true,
            message: "Comment updated successfully",
            data: updateComment,
        });

    } catch (err) {
        res.status(500).send({ error: err.message });
    }
}

const deleteComment = async function (req, res) {
    try {
        let authorId = req.params.authorId;

        const isAuthor = await commentModel.findOne({ authorId: authorId });
        if (!isAuthor) {
            return res.status(403).send({ status: false, msg: "Forbidden" });
        }
        let commentId = req.params.commentId;


        const deleteComment = await commentModel.findOneAndUpdate(
            { _id: commentId },
            { isDeleted: true },
            { new: true }
        );
        // checking if the document isDeleted(true) and is not present in database
        if (!deleteComment)
            return res.status(404).send({ status: false, msg: "No such data present" });


        res.status(200).send({
            status: true,
            message: "Comment deleted successfully",
            data: updateComment,
        });

    } catch (err) {
        res.status(500).send({ error: err.message });
    }
}

module.exports = {
    createComment,
    updateComment,
    deleteComment
};