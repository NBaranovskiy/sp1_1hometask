import { Router, Request, Response } from 'express';
import {db} from "../db/in-memore.db";
import {HttpStatus} from "../core/types/http-statuses";


export const testingRouter = Router({});
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
testingRouter.delete('/all-data', (req: Request, res: Response) => {
  db.videos = [];
  res.sendStatus(HttpStatus.NoContent);
});

