"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const setup_app_1 = require("./setup-app");
// создание приложения
const app = (0, express_1.default)();
(0, setup_app_1.setupApp)(app);
const videos = [{}];
let ID = 0;
// порт приложения
const PORT = process.env.PORT || 5001;
app.get('/hometask_01/api/videos', (req, res) => {
    res.send(videos);
});
app.post('/hometask_01/api/videos', (req, res) => {
    const bodyJSON = {
        "title": req.body.title,
        "author": req.body.author,
        "availableResolutions": req.body.availableResolutions
    };
    const errors = [];
    if (!req.body.title || typeof req.body.title !== 'string')
        errors.push({ field: "title", message: "Invalid title" });
    if (!req.body.author || typeof req.body.author !== 'string')
        errors.push({ field: "author", message: "Invalid author" });
    if (!Array.isArray(req.body.availableResolutions))
        errors.push({ field: "availableResolutions", message: "Should be array" });
    if (errors.length > 0) {
        return res.status(400).json({ errorsMessages: errors });
    }
    let date = new Date(Date.now());
    const newVideo = {
        "id": ID++,
        "title": bodyJSON.title,
        "author": bodyJSON.author,
        "canBeDownloaded": true,
        "minAgeRestriction": null,
        "createdAt": Date,
        "publicationDate": Date,
        "availableResolutions": bodyJSON.availableResolutions
    };
    videos.push(newVideo);
    res.status(201).send(newVideo);
});
app.get('/hometask_01/api/videos/:id', (req, res) => {
    const id = Number(req.params.id);
    if (isNaN(id))
        return res.sendStatus(400);
    const video = videos.find((v => v.id === id));
    if (!video)
        return res.Status(404);
    res.json(video);
});
app.put('/hometask_01/api/videos/:id', (req, res) => {
    app.put('/hometask_01/api/videos/:id', (req, res) => {
        const id = Number(req.params.id);
        if (isNaN(id))
            return res.sendStatus(400);
        const videoIndex = videos.findIndex(v => v.id === id);
        if (videoIndex === -1)
            return res.sendStatus(404);
        const { title, author, availableResolutions, canBeDownloaded, minAgeRestriction } = req.body;
        const errors = [];
        if (!title || typeof title !== 'string')
            errors.push({ field: "title", message: "Invalid title" });
        // Добавьте проверки для других полей...
        if (errors.length > 0) {
            return res.status(400).json({ errorsMessages: errors });
        }
        videos[videoIndex] = Object.assign(Object.assign({}, videos[videoIndex]), { title,
            author,
            availableResolutions, canBeDownloaded: Boolean(canBeDownloaded), minAgeRestriction: minAgeRestriction !== undefined ? Number(minAgeRestriction) : null });
        return res.sendStatus(204);
    });
});
// запуск приложения
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
});
