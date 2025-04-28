import request from 'supertest';
import { setupApp } from '../../../src/setup-app';
import express from 'express';
import {CreateVideoInputModel} from "../../../src/videos/dto/CreateVideoInputModel";
import {UpdateVideoInputModel} from "../../../src/videos/dto/UpdateVideoInputModel";
import {validateCreateVideoInputModel,validateUpdateVideoInputModel} from "../../../src/videos/validation/vehicleInputDtoValidation";
import { HttpStatus } from '../../../src/core/types/http-statuses';
describe('Video API validation', () => {
    const app = express();
    setupApp(app);

    const correctTestVideoData = {
        title: "Valid Title",
        author: "Valid Author",
        availableResolutions: ["P144"]
    };

    const correctTestVideoData2 = {
        title: "Updated Title",
        author: "Updated Author",
        availableResolutions: ["P720"],
        canBeDownloaded: true,
        minAgeRestriction: 18,
        publicationDate: "2025-04-28T14:12:38.739Z"
    };

    beforeEach(async () => {
        await request(app).delete('/testing/all-data').expect(HttpStatus.NoContent);
    });

    describe('Positive cases', () => {
        it('Should return all videos', async () => {
            const response = await request(app).get('/videos').expect(HttpStatus.Ok);
            expect(Array.isArray(response.body)).toBe(true);
        });

        it('Should create video', async () => {
            const createResponse = await request(app)
                .post('/videos')
                .send(correctTestVideoData)
                .expect(HttpStatus.Created);
        });

        it('Should get video by ID', async () => {
            const createResponse = await request(app)
                .post('/videos')
                .send(correctTestVideoData)
                .expect(HttpStatus.Created);

            const videoId = createResponse.body.id;
            const getResponse = await request(app)
                .get(`/videos/${videoId}`)
                .expect(HttpStatus.Ok);

            expect(getResponse.body).toEqual({
                id: videoId,
                title: correctTestVideoData.title,
                author: correctTestVideoData.author,
                availableResolutions: correctTestVideoData.availableResolutions,
                canBeDownloaded: expect.any(Boolean),
                minAgeRestriction: null,
                createdAt: expect.any(String),
                publicationDate: expect.any(String)
            });
        });

        it('Should update video by ID', async () => {
            const createResponse = await request(app)
                .post('/videos')
                .send(correctTestVideoData)
                .expect(HttpStatus.Created);

            const videoId = createResponse.body.id;
            await request(app)
                .put(`/videos/${videoId}`)
                .send(correctTestVideoData2)
                .expect(HttpStatus.NoContent);

            const checkResponse = await request(app)
                .get(`/videos/${videoId}`)
                .expect(HttpStatus.Ok);

            expect(checkResponse.body).toMatchObject({
                title: correctTestVideoData2.title,
                author: correctTestVideoData2.author,
                availableResolutions: correctTestVideoData2.availableResolutions,
                canBeDownloaded: correctTestVideoData2.canBeDownloaded,
                minAgeRestriction: correctTestVideoData2.minAgeRestriction
            });
        });

        it('Should delete video by ID', async () => {
            const createResponse = await request(app)
                .post('/videos')
                .send(correctTestVideoData)
                .expect(HttpStatus.Created);

            const videoId = createResponse.body.id;
            await request(app)
                .delete(`/videos/${videoId}`)
                .expect(HttpStatus.NoContent);
        });
    });

    describe('Negative cases', () => {
        describe('POST /videos', () => {
            it('Should return 400 if title is missing', async () => {
                const { title, ...invalidData } = correctTestVideoData;

                await request(app)
                    .post('/videos')
                    .send(invalidData)
                    .expect(HttpStatus.BadRequest);
            });

            it('Should return 400 if author is missing', async () => {
                const { author, ...invalidData } = correctTestVideoData;

                await request(app)
                    .post('/videos')
                    .send(invalidData)
                    .expect(HttpStatus.BadRequest);
            });
            it('Should return 400 if title is too long', async () => {
                await request(app)
                    .post('/videos')
                    .send({
                        ...correctTestVideoData,
                        title: 'a'.repeat(41)
                    })
                    .expect(HttpStatus.BadRequest);
            });

            it('Should return 400 if author is too long', async () => {
                await request(app)
                    .post('/videos')
                    .send({
                        ...correctTestVideoData,
                        author: 'a'.repeat(21)
                    })
                    .expect(HttpStatus.BadRequest);
            });

            it('Should return 400 if availableResolutions contains invalid value', async () => {
                await request(app)
                    .post('/videos')
                    .send({
                        ...correctTestVideoData,
                        availableResolutions: ["P144", "INVALID"]
                    })
                    .expect(HttpStatus.BadRequest);
            });




        });

        describe('PUT /videos/:id', () => {
            let videoId: number;

            beforeEach(async () => {
                const createResponse = await request(app)
                    .post('/videos')
                    .send(correctTestVideoData)
                    .expect(HttpStatus.Created);
                videoId = createResponse.body.id;
            });

            it('Should return 400 if title is too long', async () => {
                await request(app)
                    .put(`/videos/${videoId}`)
                    .send({
                        ...correctTestVideoData2,
                        title: 'a'.repeat(41)
                    })
                    .expect(HttpStatus.BadRequest);
            });

            it('Should return 400 if minAgeRestriction is invalid', async () => {
                await request(app)
                    .put(`/videos/${videoId}`)
                    .send({
                        ...correctTestVideoData2,
                        minAgeRestriction: 25
                    })
                    .expect(HttpStatus.BadRequest);
            });

            it('Should return 400 if publicationDate is invalid', async () => {
                await request(app)
                    .put(`/videos/${videoId}`)
                    .send({
                        ...correctTestVideoData2,
                        publicationDate: "invalid-date"
                    })
                    .expect(HttpStatus.BadRequest);
            });

            it('Should return 404 if video not found', async () => {
                const nonExistentId = 9999;
                await request(app)
                    .put(`/videos/${nonExistentId}`)
                    .send(correctTestVideoData2)
                    .expect(HttpStatus.NotFound);
            });
        });

        describe('GET /videos/:id', () => {
            it('Should return 404 if video not found', async () => {
                const nonExistentId = 9999;
                await request(app)
                    .get(`/videos/${nonExistentId}`)
                    .expect(HttpStatus.NotFound);
            });

            it('Should return 400 if id is invalid', async () => {
                await request(app)
                    .get('/videos/invalid-id')
                    .expect(HttpStatus.NotFound);
            });
        });

        describe('DELETE /videos/:id', () => {
            it('Should return 404 if video not found', async () => {
                const nonExistentId = 9999;
                await request(app)
                    .delete(`/videos/${nonExistentId}`)
                    .expect(HttpStatus.NotFound);
            });

            it('Should return 400 if id is invalid', async () => {
                await request(app)
                    .delete('/videos/invalid-id')
                    .expect(HttpStatus.NotFound);
            });
        });
    });
});