import Joi from 'joi';

export const createTodoSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string(),
  startDate: Joi.string().isoDate(),
  recurrenceRule: Joi.string(),
  priority: Joi.string().valid('low', 'medium', 'high'),
});

export const updateTodoSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string(),
  startDate: Joi.string().isoDate(),
  recurrenceRule: Joi.string(),
  priority: Joi.string().valid('low', 'medium', 'high'),
  status: Joi.string().valid('pending', 'completed'),
  completedAt: Joi.date(),
});
