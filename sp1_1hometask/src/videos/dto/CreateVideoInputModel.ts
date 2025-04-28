import { Resolutions } from "../types/video";

export type CreateVideoInputModel = {
  title: string;               // Обязательное, макс. 40 символов
  author: string;              // Обязательное, макс. 20 символов
  availableResolutions: Resolutions[]; // Минимум 1 элемент
};