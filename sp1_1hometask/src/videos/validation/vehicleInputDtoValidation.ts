import { ValidationError } from '../types/validationError';
import {Resolutions} from "../types/video";
import {UpdateVideoInputModel} from "../dto/UpdateVideoInputModel";
import {CreateVideoInputModel} from "../dto/CreateVideoInputModel";

export const validateUpdateVideoInputModel = (
    data: UpdateVideoInputModel
): ValidationError[] => {
    const errors: ValidationError[] = [];

    if(
        !data.title ||
        typeof data.title !== 'string' ||
        data.title.trim().length > 40 ||
        data.title.trim().length < 1
    ) {
        errors.push({"message":'Invalid title',"field":'title'})
    }

    if(
        !data.author ||
        typeof data.author !== 'string' ||
        data.author.trim().length > 20 ||
        data.author.trim().length < 1
    ) {
        errors.push({"message":'Invalid author',"field":'author'})
    }
    if(!Array.isArray(data.availableResolutions)) {
        errors.push({
            "message": 'availableResolutions must be array',
            "field": 'availableResolutions',
        })
    } else if(data.availableResolutions.length) {
        const existingResolutions = Object.values(Resolutions)
        if (
            data.availableResolutions.length > existingResolutions.length ||
            data.availableResolutions.length < 1
        ) {
            errors.push({
                "message": 'Invalid availableResolutions',
                "field": 'availableResolutions',
            })
        }

        for (const resolution of data.availableResolutions) {
            if (!existingResolutions.includes(resolution)){
                errors.push({
                    "message": 'Invalid availableResolution: ' + resolution,
                    "field": 'availableResolutions',
                })
                break;
            }
        }
    }
    if(
        !data.canBeDownloaded ||
        typeof data.canBeDownloaded !== 'boolean'
    ) {
        errors.push({
            "message": 'Invalid canBeDownloaded',
            "field": 'canBeDownloaded',
            }
        )
    }
    if(
        data.minAgeRestriction !== null &&
        (typeof data.minAgeRestriction !== 'number' ||
        data.minAgeRestriction < 1 ||
        data.minAgeRestriction  > 18)
    ) {
        errors.push({
            "message": 'Invalid minAgeRestriction',
            "field": 'minAgeRestriction',
        })
    }
    if (
        !data.publicationDate ||
        typeof data.publicationDate !== 'string' ||
        isNaN(new Date(data.publicationDate).getTime())
    ) {
        errors.push({
            "message": 'Invalid date-time value',
            "field": 'publicationDate',
        });
    }
    return errors;
}

export const validateCreateVideoInputModel = (
    data: CreateVideoInputModel
): ValidationError[] => {
    const errors: ValidationError[] = [];

    if(
        !data.title ||
        typeof data.title !== 'string' ||
        data.title.trim().length > 40 ||
        data.title.trim().length < 1
    ) {
        errors.push({"message":'Invalid title',"field":'title'})
    }

    if(
        !data.author ||
        typeof data.author !== 'string' ||
        data.author.trim().length > 20 ||
        data.author.trim().length < 1
    ) {
        errors.push({"message":'Invalid author',"field":'author'})
    }

    if(!Array.isArray(data.availableResolutions)) {
        errors.push({
            "message": 'availableResolutions must be array',
            "field": 'Resolutions',
        })
    } else if(data.availableResolutions.length) {
        const existingResolutions = Object.values(Resolutions)
        if (
            data.availableResolutions.length > existingResolutions.length ||
            data.availableResolutions.length < 1
        ) {
            errors.push({
                "message": 'Invalid availableResolutions',
                "field": 'Resolutions'
            })
        }

        for (const resolution of data.availableResolutions) {
            if (!existingResolutions.includes(resolution)){
                errors.push({
                    "message": 'Invalid availableResolution: ' + resolution,
                    "field": 'availableResolutions'
                })
                break;
            }
        }
    }
    return errors
}