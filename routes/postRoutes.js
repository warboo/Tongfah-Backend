const express = require("express");
const Post = require("../models/postSchema");

const router = express.Router();

router.post("/post", async (req, res) => {
    const data = new Post({
        ...req.body
        // owner: req.body.owner,
        // location: req.body.location,
        // condition: req.body.condition,
        // temp: req.body.temp,
        // wind: req.body.wind,
        // precip: req.body.precip,
        // visibility: req.body.visibility,
        // uv: req.body.uv,
        // pm25: req.body.pm25,
        // pm25_index: req.body.pm25_index,
        // image: {
        //     data: Buffer,
        //     contentType: String
        // }
    });

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave);
    }
    catch (err) {
        res.json({message: err.message});
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