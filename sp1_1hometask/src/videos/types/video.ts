export enum Resolutions {
  P144 = "P144",
  P240 = "P240",
  P360 = "P360",
  P480 = "P480",
  P720 = "P720",
  P1080 = "P1080",
  P1440 = "P1440",
  P2160 = "P2160"
}
export type Video = {
    id: number;               // integer($int32)
    title: string;            // обязательное поле (*)
    author: string;           // обязательное поле (*)
    canBeDownloaded: boolean; // default = false
    minAgeRestriction: number | null; // integer, 1-18 или null
    createdAt: string;        // ISO date-time (например, "2023-01-01T12:00:00Z")
    publicationDate: string;  // default = createdAt + 1 день
    availableResolutions: Resolutions[]; // массив из enum
}