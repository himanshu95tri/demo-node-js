import Joi from 'joi';

export const createSupplementTrackerSchema = Joi.object({
  supplementId: Joi.string().uuid().required(),
  intakeDate: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).required(), // YYYY-MM-DD
  timeSlot: Joi.string().valid("Morning", "Afternoon", "Evening", "Night").required(),
  taken: Joi.boolean(),
  takenTime: Joi.string().pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/), // HH:mm
  notes: Joi.string(),
});

export const updateSupplementTrackerSchema = Joi.object({
  id: Joi.string().uuid().required(),
  supplementId: Joi.string().uuid(),
  intakeDate: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/), // YYYY-MM-DD
  timeSlot: Joi.string().valid("Morning", "Afternoon", "Evening", "Night"),
  taken: Joi.boolean(),
  takenTime: Joi.string().pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/), // HH:mm
  notes: Joi.string(),
});
