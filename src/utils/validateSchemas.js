export const validateSchemas = (schema) => {
  return (validateSchemas[schema] = (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error)
      throw new Error( {type: "ValidationError", message: error.details.map(({ message }) => message).join(", ") });
    else
      next();
  });
};
