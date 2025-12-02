import mongoose from "mongoose";

const EventsSchema = new mongoose.Schema({
    Title: String,
    Description: String,
    Date: Date,
    Time: String,
    Location: String,
    Organizer: String,
    CreateAt: {type: Date, Default: Date.now()}
}, { timestamps: true });

const Event = mongoose.model("Event", EventsSchema);

export default EventsSchema;