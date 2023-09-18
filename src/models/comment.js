const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const commentSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: true,
      trim: true,
    },
    authorId: {
        type: ObjectId,
        ref: "authorData",
    },
    blogId: {
      type: ObjectId,
      ref: "BlogData",
    },
    isDeleted:{
        type: Boolean,
        default:false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("commentData",commentSchema);