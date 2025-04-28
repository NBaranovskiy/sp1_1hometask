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
        errors.push({ field: 'title', message: 'Invalid title' });
    }
    if (!data.author ||
        typeof data.author !== 'string' ||
        data.author.trim().length > 20 ||
        data.author.trim().length < 1) {
        errors.push({ field: 'author', message: 'Invalid author' });
    }
    if (!Array.isArray(data.availableResolutions)) {
        errors.push({
            field: 'availableResolutions',
            message: 'availableResolutions must be array'
        });
    }
    else if (data.availableResolutions.length) {
        const existingResolutions = Object.values(video_1.Resolutions);
        if (data.availableResolutions.length > existingResolutions.length ||
            data.availableResolutions.length < 1) {
            errors.push({
                field: 'availableResolutions',
                message: 'Invalid availableResolutions'
            });
        }
        for (const resolution of data.availableResolutions) {
            if (!existingResolutions.includes(resolution)) {
                errors.push({
                    field: 'Resolutions',
                    message: 'Invalid availableResolution: ' + resolution
                });
                break;
            }
        }
    }
    if (!data.canBeDownloaded ||
        typeof data.canBeDownloaded !== 'boolean') {
        errors.push({
            field: 'canBeDownloaded',
            message: 'Invalid canBeDownloaded'
        });
    }
    if (data.minAgeRestriction !== null &&
        (typeof data.minAgeRestriction !== 'number' ||
            data.minAgeRestriction < 1 ||
            data.minAgeRestriction > 18)) {
        errors.push({
            field: 'minAgeRestriction',
            message: 'Invalid minAgeRestriction'
        });
    }
    if (!data.publicationDate ||
        typeof data.publicationDate !== 'string' ||
        isNaN(new Date(data.publicationDate).getTime())) {
        errors.push({
            field: 'publicationDate',
            message: 'Invalid date-time value'
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
        errors.push({ field: 'title', message: 'Invalid title' });
    }
    if (!data.author ||
        typeof data.author !== 'string' ||
        data.author.trim().length > 20 ||
        data.author.trim().length < 1) {
        errors.push({ field: 'author', message: 'Invalid author' });
    }
    if (!Array.isArray(data.availableResolutions)) {
        errors.push({
            field: 'availableResolutions',
            message: 'availableResolutions must be array'
        });
    }
    else if (data.availableResolutions.length) {
        const existingResolutions = Object.values(video_1.Resolutions);
        if (data.availableResolutions.length > existingResolutions.length ||
            data.availableResolutions.length < 1) {
            errors.push({
                field: 'availableResolutions',
                message: 'Invalid availableResolutions'
            });
        }
        for (const resolution of data.availableResolutions) {
            if (!existingResolutions.includes(resolution)) {
                errors.push({
                    field: 'Resolutions',
                    message: 'Invalid availableResolution: ' + resolution
                });
                break;
            }
        }
    }
    return errors;
};
exports.validateCreateVideoInputModel = validateCreateVideoInputModel;
