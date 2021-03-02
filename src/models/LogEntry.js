const mongoose = require("mongoose");
const { Schema } = mongoose;

/* 	-   Title - Required Text
    -   Description - Text
    -   Comment - Text
    -   Rating - scale of 1 - 10
	-	Image
    -   Lat- Number
    -   Long - Number
	- 	Visit Date - Date
	-	Timestamps
*/

const requiredString = {
    type: String,
    required: true,
};

const requiredNumber = {
    type: Number,
    required: true,
};

const logEntrySchema = new Schema(
    {
        title: requiredString,
        description: String,
        comment: String,
        rating: {
            type: Number,
            min: 0,
            max: 10,
            default: 0,
        },
        image: String,
        lat: {
            ...requiredNumber,
            min: -90,
            max: 90,
        },
        long: {
            ...requiredNumber,
            min: -180,
            max: 180,
        },
        visitDate: {
            required: true,
            type: Date,
        },
    },
    {
        timestamps: true,
    }
);

const LogEntry = mongoose.model("LogEntry", logEntrySchema);

module.exports = LogEntry;
