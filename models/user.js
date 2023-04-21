const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError, patterns } = require("../helpers");

const SUBSCRIPTION_TYPES = ["starter", "pro", "business"];

// registration validation user
const validationRegistrationUser = Joi.object({
  password: Joi.string().required(),
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .pattern(patterns.emailPattern)
    .required(),
  subscription: Joi.string(),
  // token: Joi.string().required(),
});

// login validation user
const validationLoginUser = Joi.object({
  password: Joi.string().required(),
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .pattern(patterns.emailPattern)
    .required(),
  subscription: Joi.string(),
  // token: Joi.string().required(),
});

// validate data after validation of input data before saving this data in DB
const userSchema = new Schema(
  {
    password: {
      type: String,
      validate: [
        {
          validator: (v) => v.length >= 6,
          message: (props) =>
            `Invalid password. Must be at least 6 characters. Got ${props.value.length}`,
        },
        {
          validator: (v) => v.length <= 30,
          message: (props) =>
            `Invalid password. Must be no more 30 characters. Got ${props.value.length}`,
        },
      ],
      required: [true, "The password is required. Set it for user"],
    },
    email: {
      type: String,
      unique: true,
      match: patterns.emailPattern,
      required: [
        true,
        "The email is required. Please provide an email address for user",
      ],
    },
    subscription: {
      type: String,
      default: "starter",
      validate: {
        validator: function (v) {
          return SUBSCRIPTION_TYPES.includes(v);
        },
        message: (props) =>
          `${
            props.value
          } is not a valid subscription type. Must be: ${SUBSCRIPTION_TYPES.join(
            ", or "
          )}`,
      },
    },
    token: String,
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);
const User = model("user", userSchema);

module.exports = {
  User,
  validationRegistrationUser,
  validationLoginUser,
};
