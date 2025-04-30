"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCreateVideoInputModel = exports.validateUpdateVideoInputModel = void 0;
const video_1 = require("../types/video");
const validateUpdateVideoInputModel = (data) => {
    const errors = [];
    if (!data.title ||
        typeof data.title !== 'string' ||
        data.title.trim().length > 40 ||
        data.title.trim().length < 1) {
        errors.push({ "message": 'Invalid title', "field": 'title' });
    }
    if (!data.author ||
        typeof data.author !== 'string' ||
        data.author.trim().length > 20 ||
        data.author.trim().length < 1) {
        errors.push({ "message": 'Invalid author', "field": 'author' });
    }
    if (!Array.isArray(data.availableResolutions)) {
        errors.push({
            "message": 'availableResolutions must be array',
            "field": 'availableResolutions',
        });
    }
    else if (data.availableResolutions.length) {
        const existingResolutions = Object.values(video_1.Resolutions);
        if (data.availableResolutions.length > existingResolutions.length ||
            data.availableResolutions.length < 1) {
            errors.push({
                "message": 'Invalid availableResolutions',
                "field": 'availableResolutions',
            });
        }
        for (const resolution of data.availableResolutions) {
            if (!existingResolutions.includes(resolution)) {
                errors.push({
                    "message": 'Invalid availableResolution: ' + resolution,
                    "field": 'availableResolutions',
                });
                break;
            }
        }
    }
    if (!data.canBeDownloaded ||
        typeof data.canBeDownloaded !== 'boolean') {
        errors.push({
            "message": 'Invalid canBeDownloaded',
            "field": 'canBeDownloaded',
        });
    }
    if (data.minAgeRestriction !== null &&
        (typeof data.minAgeRestriction !== 'number' ||
            data.minAgeRestriction < 1 ||
            data.minAgeRestriction > 18)) {
        errors.push({
            "message": 'Invalid minAgeRestriction',
            "field": 'minAgeRestriction',
        });
    }
    if (!data.publicationDate ||
        typeof data.publicationDate !== 'string' ||
        isNaN(new Date(data.publicationDate).getTime())) {
        errors.push({
            "message": 'Invalid date-time value',
            "field": 'publicationDate',
        });
    }
    return errors;
};
exports.validateUpdateVideoInputModel = validateUpdateVideoInputModel;
const validateCreateVideoInputModel = (data) => {
    const errors = [];
    if (!data.title ||
        typeof data.title !== 'string' ||
        data.title.trim().length > 40 ||
        data.title.trim().length < 1) {
        errors.push({ "message": 'Invalid title', "field": 'title' });
    }
    if (!data.author ||
        typeof data.author !== 'string' ||
        data.author.trim().length > 20 ||
        data.author.trim().length < 1) {
        errors.push({ "message": 'Invalid author', "field": 'author' });
    }
    if (!Array.isArray(data.availableResolutions)) {
        errors.push({
            "message": 'availableResolutions must be array',
            "field": 'Resolutions',
        });
    }
    else if (data.availableResolutions.length) {
        const existingResolutions = Object.values(video_1.Resolutions);
        if (data.availableResolutions.length > existingResolutions.length ||
            data.availableResolutions.length < 1) {
            errors.push({
                "message": 'Invalid availableResolutions',
                "field": 'Resolutions'
            });
        }
        for (const resolution of data.availableResolutions) {
            if (!existingResolutions.includes(resolution)) {
                errors.push({
                    "message": 'Invalid availableResolution: ' + resolution,
                    "field": 'Resolutions'
                });
                break;
            }
        }
    }
    return errors;
};
exports.validateCreateVideoInputModel = validateCreateVideoInputModel;
