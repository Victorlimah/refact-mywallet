export const validateSchemas = (schema) => {
  return (req, res, next) => {
    const result = schema.validate(req.body);
    if (result.error) {
      return res.status(400).json({ error: result.error.details[0].message });
    }
    next();
  };
}