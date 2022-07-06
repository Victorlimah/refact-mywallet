import Joi from "joi";

export const newFinancialSchema = Joi.object({
  value: Joi.number().required(),
  type: Joi.string().required()
});
