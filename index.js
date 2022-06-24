const path = require("path")
const express = require("express")
const fs = require("fs-extra")

const app = express()

app.get("/holder.m3u8", (req, res) => {
    res.sendFile(path.join(__dirname, "services.m3u8"))
})

app.get("/video/:name", (req, res) => {
    let video = req.params.name

    if(video.includes(".m3u8")){
        res.sendFile(path.join(__dirname, "files", video))
    } else {
        const videoPath = path.join(__dirname, "files", video)
        const videoStream = fs.createReadStream(videoPath)

        videoStream.pipe(res)
    }
})

app.listen(5065, () => {
    console.log("Server running at port 5065")
})