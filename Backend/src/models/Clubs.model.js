import mongoose from "mongoose";

const ClubsSchema = new mongoose.Schema({
    Name: String,
    Description: String,
    Tag: String,
    Number_of_Members: Number,
    Icon: String,
    Active_Members: Number,
    President: String,
    Vice_President: String,
    Core_Members: [String],
    Club_Achievements: [String],
}, { timestamps: true });

const Clubs = mongoose.model("Clubs", ClubsSchema);

export default Clubs;