import {Resolutions} from "../types/video";

export type UpdateVideoInputModel = {
    title: string;
    author: string;
    availableResolutions:Resolutions[];
    canBeDownloaded: boolean;
    minAgeRestriction: number | null;
    publicationDate: string
}
