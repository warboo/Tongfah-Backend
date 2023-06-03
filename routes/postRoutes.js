const express = require("express");
const multer = require("multer");
const Post = require("../models/postSchema");

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

async function getWeather(latitude, longitude) {
    var requestOptions = {
        method: 'POST',
        redirect: 'follow'
      };
      
      try {
        const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_TOKEN}&q=${latitude},${longitude}&aqi=yes`, requestOptions);
        const result = await response.json();
        return result;
      }
      catch (error) {
        console.log("Error:", error);
        return null;
      }
}

router.post("/post", upload.single("image"), async (req, res) => {
    // const weatherData = await getWeather("16.425640290331955", "102.83526550930343");
    const weatherData = await getWeather(req.body.latitude, req.body.longitude);

    if (!req.file) {
        res.json({
            message: "Cannot find the file."
        });
    }
    else {
        const data = new Post({
            // ...req.body,
            owner: req.body.owner,
            location: weatherData.location.name + ", " + weatherData.location.country,
            condition: weatherData.current.condition.text,
            temp: weatherData.current.temp_c,
            wind: weatherData.current.wind_kph,
            precip: weatherData.current.precip_mm,
            visibility: weatherData.current.vis_km,
            uv: weatherData.current.uv,
            pm25: weatherData.current.air_quality.pm2_5,
            pm25_index: weatherData.current.air_quality["us-epa-index"],
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
            res.status(400).json({message: err.message});
        }
    }
});

router.get("/", async (req, res) => {
    try {
        const data = await Post.find();

        data.sort((a,b) => b.date - a.date);
        res.json(data);
    }
    catch(err) {
        res.status(500).json({message: err.message});
    }
});

router.delete("/delete/:id", async(req, res) => {
    try {
        const dataToDelete = await Post.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Post deleted" });
    }
    catch(err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;