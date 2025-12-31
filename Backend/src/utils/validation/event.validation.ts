import Joi from 'joi';

const validTimezones = Intl.supportedValuesOf('timeZone');

export const createEventSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string(),
  eventThumbnail: Joi.string(),
  eventImages: Joi.array().items(Joi.string()),
  eventUrl: Joi.string().uri(),
  eventCapacity: Joi.number().integer(),
  time: Joi.string().isoDate().required(),
  timezone: Joi.string().valid(...validTimezones).required(),
  eventType: Joi.string().valid('online', 'offline'),
});

export const updateEventSchema = Joi.object({
  id: Joi.string().uuid().required(),
  title: Joi.string(),
  description: Joi.string(),
  eventThumbnail: Joi.string(),
  eventImages: Joi.array().items(Joi.string()),
  eventUrl: Joi.string().uri(),
  eventCapacity: Joi.number().integer(),
  time: Joi.string().isoDate(),
  timezone: Joi.string().valid(...validTimezones),
  eventType: Joi.string().valid('online', 'offline'),
});
