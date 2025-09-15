import Joi from "joi";
import ErrorHandler from "../utils/ErrorHander.js";

export const validateSignupSchema = (req, res, next) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(30).trim().required(),
    email: Joi.string().email().trim().required(),
    password: Joi.string().min(6).trim().required(),
  });

  const validation = schema.validate(req.body);
  if (validation.error) {
    return res
      .status(400)
      .json(new ErrorHandler(validation.error.details[0].message, 400));
  }
  next();
};

export const validateLoginSchema = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().trim().required(),
    password: Joi.string().min(6).trim().required(),
  });

  const validation = schema.validate(req.body);
  if (validation.error) {
    return res
      .status(400)
      .json(new ErrorHandler(validation.error.details[0].message, 400));
  }
  next();
};
