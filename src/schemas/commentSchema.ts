import Joi from 'joi';

const commentSchema = Joi.object({
  post_id: Joi.number().integer().required(),
  user_id: Joi.number().integer().required(),
  comment: Joi.string().required()
});

export {
  commentSchema
};
