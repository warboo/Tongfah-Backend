const express = require("express");
const multer = require("multer");
const Post = require("../models/postSchema");

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/post", upload.single("image"), async (req, res) => {
    if (!req.file) {
        res.json({
            message: "Cannot find the file."
        });
    }
    else {
        const data = new Post({
            ...req.body,
            image: {
                data: req.file.buffer,
                contentType: req.file.mimetype
            }
        });
    
        try {
            const dataToSave = await data.save();
            res.status(200).json(dataToSave);
        }
        catch (err) {
            res.json({message: err.message});
        }
    }
});

router.get("/", (req, res) => {
    res.send("Get All API");
});

router.get("/getOne/:id", (req, res) => {
    res.send("Get by ID API");
});

router.patch("/update/:id", (req, res) => {
    res.send("Update by ID API");
});

router.delete("/delete/:id", (req, res) => {
    res.send("Delete by ID API");
});

module.exports = router;