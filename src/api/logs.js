const { Router } = require("express");

const LogEntry = require("../models/LogEntry");

const router = Router();

router.get("/", async (req, res, next) => {
    try {
        const entries = await LogEntry.find();
        res.json(entries);
    } catch (error) {
        next(error);
    }
});

router.post("/", async (req, res, next) => {
    try {
        const logEntry = new LogEntry(req.body);
        const createdEntry = await logEntry.save();
        res.json(createdEntry);
        console.log(req.body);
    } catch (error) {
        if (error.name === "ValidationError") {
            res.status(422);
        }

        next(error);
    }
});

router.delete("/:_id", async (req, res, next) => {
    try {
        const entry = await LogEntry.findById({ _id: req.params._id });

        if (!entry) {
            return res.status(401).json({ msg: "Log entry not found" });
        }

        await entry.remove();
        return res.status(200).json({ msg: "Log entry has been removed" });
    } catch (error) {
        console.error(error.message);

        if (error.kind == "ObjectId") {
            return res.status(404).json({ msg: "Log entry not found" });
        }
        next(error);
    }
});

module.exports = router;
