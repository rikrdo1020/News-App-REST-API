const { Schema, model, trusted } = require('mongoose');

const PostSchema = Schema({
    postId:{
        type: String,
        require:true,
        unique: true
    },
    title: {
        type: String,
        require: [true, 'The title is required'],
        unique: true
    },
    link: {
        type: String,
        unique: true
    },
    tags:{
        type: [String],
        default: null
    },
    creator:{
        type: String,
    },
    video_url:{
        type: String
    },
    description:{ type: String },
    content:{ type: String },
    pubDate: { type: Date },
    image_url:{ type: String },
    source: { type: String }
})

PostSchema.methods.toJSON = function() {
    const { __v, _id, postId, ...data } = this.toObject();
    return data;
}

module.exports = model('Post', PostSchema);