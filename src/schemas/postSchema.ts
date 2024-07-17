import Joi from 'joi';

const postSchema = Joi.object({
  user_id: Joi.number().integer().required(),
  title: Joi.string().required(),
  body: Joi.string().required()
});

export {
  postSchema
};
