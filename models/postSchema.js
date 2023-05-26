const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema({
    owner: String,
    date: { type: Date, default: Date.now },
    location: String,
    condition: String,
    temp: Number,
    wind: Number,
    precip: Number,
    visibility: Number,
    uv: Number,
    pm25: Number,
    pm25_index: Number,
    // image: {
    //     data: Buffer,
    //     contentType: String
    // }
});

module.exports = mongoose.model("Post", postSchema);