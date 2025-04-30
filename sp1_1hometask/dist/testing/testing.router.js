"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testingRouter = void 0;
const express_1 = require("express");
const in_memore_db_1 = require("../db/in-memore.db");
exports.testingRouter = (0, express_1.Router)({});
/**
 * @swagger
 * tags:
 *   name: testing
 *   description: API for clearing database
 */
/**
 * @swagger
 * /testing/all-data:
 *   delete:
 *     summary: Delete video by ID
 *     tags: [testing]
 *     responses:
 *       204:
 *         description: All data is deleted
 */
exports.testingRouter.delete('/all-data', (req, res) => {
    in_memore_db_1.db.videos = [];
    res.sendStatus(204);
});
