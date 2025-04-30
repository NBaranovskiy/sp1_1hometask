"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.videosRouter = void 0;
const express_1 = require("express");
const vehicleInputDtoValidation_1 = require("../validation/vehicleInputDtoValidation");
const in_memore_db_1 = require("../../db/in-memore.db");
exports.videosRouter = (0, express_1.Router)({});
/**
 * @swagger
 * tags:
 *   name: Videos
 *   description: API for managing videos
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Video:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         title:
 *           type: string
 *           example: "Video Title"
 *         author:
 *           type: string
 *           example: "Video Author"
 *         canBeDownloaded:
 *           type: boolean
 *           default: false
 *         minAgeRestriction:
 *           type: integer
 *           nullable: true
 *           minimum: 1
 *           maximum: 18
 *           example: 16
 *         createdAt:
 *           type: string
 *           format: date-time
 *         publicationDate:
 *           type: string
 *           format: date-time
 *         availableResolutions:
 *           type: array
 *           items:
 *             type: string
 *             enum: [P144, P240, P360, P480, P720, P1080, P1440, P2160]
 *     Resolutions:
 *           type: string
 *           enum:
 *             - "P144"
 *             - "P240"
 *             - "P360"
 *             - "P480"
 *             - "P720"
 *             - "P1080"
 *             - "P1440"
 *             - "P2160"
 *     FieldError:
 *         type: object
 *         properties:
 *             message:
 *                 type: string
 *             field:
 *                 type: string
 *
 *     CreateVideoInputModel:
 *             required:
 *               - title
 *               - author
 *               - availableResolutions
 *             properties:
 *               title:
 *                 type: string
 *                 minLength: 1
 *                 maxLength: 40
 *                 example: "New Video"
 *               author:
 *                 type: string
 *                 minLength: 1
 *                 maxLength: 20
 *                 example: "Video Author"
 *               availableResolutions:
 *                 type: array
 *                 items:
 *                   type: string
 *                   enum: [P144, P240, P360, P480, P720, P1080, P1440, P2160]
 *                 example: [P144, P720]
 *               canBeDownloaded:
 *                 type: boolean
 *                 default: false
 *               minAgeRestriction:
 *                 type: integer
 *                 nullable: true
 *                 minimum: 1
 *                 maximum: 18
 *               publicationDate:
 *                 type: string
 *                 format: date-time
 *     UpdateVideoInputModel:
 *             properties:
 *               title:
 *                 type: string
 *                 minLength: 1
 *                 maxLength: 40
 *               author:
 *                 type: string
 *                 minLength: 1
 *                 maxLength: 20
 *               availableResolutions:
 *                 type: array
 *                 items:
 *                   type: string
 *                   enum: [P144, P240, P360, P480, P720, P1080, P1440, P2160]
 *               canBeDownloaded:
 *                 type: boolean
 *               minAgeRestriction:
 *                 type: integer
 *                 nullable: true
 *                 minimum: 1
 *                 maximum: 18
 *               publicationDate:
 *                 type: string
 *                 format: date-time
 *     APIErrorResult:
 *       type: object
 *       properties:
 *         errorsMessages:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *               field:
 *                 type: string
 *       example:
 *         errorsMessages:
 *           - message: "Video not found"
 *             field: "id"
 *
 */
exports.videosRouter.get('/', (req, res) => {
    res.status(200).json(in_memore_db_1.db.videos); // Явно указываем Content-Type и формат
});
/**
 * @swagger
 * /videos:
 *   get:
 *     summary: Get all videos
 *     tags: [Videos]
 *     responses:
 *       200:
 *         description: Successfully retrieved videos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Video'
 */
exports.videosRouter.post('/', (req, res) => {
    const errors = (0, vehicleInputDtoValidation_1.validateCreateVideoInputModel)(req.body);
    if (errors.length > 0) {
        res.status(400).json({ "errorsMessages": errors }); // Правильный формат ошибок
        return;
    }
    ;
    const currentDate = new Date();
    const publicationDate = new Date();
    publicationDate.setDate(currentDate.getDate() + 1);
    const newVideo = {
        id: in_memore_db_1.db.videos.length ? in_memore_db_1.db.videos[in_memore_db_1.db.videos.length - 1].id + 1 : 1,
        title: req.body.title,
        author: req.body.author,
        canBeDownloaded: false, // Добавляем дефолтное значение
        minAgeRestriction: null,
        createdAt: currentDate.toISOString(),
        publicationDate: publicationDate.toISOString(),
        availableResolutions: req.body.availableResolutions
    };
    in_memore_db_1.db.videos.push(newVideo);
    res.status(201).json(newVideo); // Исправляем статус на 201
});
/**
 * @swagger
 * /videos/{id}:
 *   get:
 *     summary: Get video by ID
 *     tags: [Videos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the video to get
 *     responses:
 *       200:
 *         description: Video data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Video'
 *       404:
 *         description: Video not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
exports.videosRouter.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const video = in_memore_db_1.db.videos.find(v => v.id === id);
    if (!video) {
        res.status(404).json({ "errorsMessages": [{ "message": 'Video not found', "field": 'id' }] }); // Исправляем на 404
        return;
    }
    ;
    res.status(200).json(video);
});
/**
 * @swagger
 * /videos:
 *   post:
 *     summary: Create a new video
 *     tags: [Videos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateVideoInputModel'
 *     responses:
 *       201:
 *         description: Video created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Video'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
exports.videosRouter.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const video = in_memore_db_1.db.videos.find(v => v.id === id);
    if (!video) {
        res.status(404).json({ "errorsMessages": [{ "message": 'Video not found', "field": 'id' }] });
        return;
    }
    ;
    const errors = (0, vehicleInputDtoValidation_1.validateUpdateVideoInputModel)(req.body);
    if (errors.length > 0) {
        res.status(400).json({ "errorsMessages": errors });
        return;
    }
    ;
    // Обновляем видео
    Object.assign(video, {
        title: req.body.title,
        author: req.body.author,
        availableResolutions: req.body.availableResolutions,
        canBeDownloaded: req.body.canBeDownloaded,
        minAgeRestriction: req.body.minAgeRestriction,
        publicationDate: req.body.publicationDate
    });
    res.sendStatus(204);
});
/**
 * @swagger
 * /videos/{id}:
 *   put:
 *     summary: Update video by ID
 *     tags: [Videos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the video to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              $ref: '#/components/schemas/UpdateVideoInputModel'
 *
 *     responses:
 *       204:
 *         description: Video updated successfully
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Video not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
exports.videosRouter.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = in_memore_db_1.db.videos.findIndex(v => v.id === id);
    if (index === -1) {
        res.status(404).json({ "errorsMessages": [{ "message": 'Video not found', "field": 'id' }] }); // Исправляем на 404
        return;
    }
    ;
    in_memore_db_1.db.videos.splice(index, 1);
    res.sendStatus(204);
});
/**
 * @swagger
 * /videos/{id}:
 *   delete:
 *     summary: Delete video by ID
 *     tags: [Videos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the video to delete
 *     responses:
 *       204:
 *         description: Video deleted successfully
 *       404:
 *         description: Video not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */ 
