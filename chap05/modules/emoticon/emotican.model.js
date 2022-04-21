const { string } = require("joi");
const mongoose = require("mongoose");

const EmoticanShema = new mongoose.Schema({
    postId: mongoose.Types.ObjectId,
    userId: mongoose.Types.ObjectId,
    iconUrl: String
},{
    timestamps:true
})

const EmoticanModel= mongoose.model('Emotican', EmoticanShema);
module.exports = EmoticanModel;