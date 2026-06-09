import Joi from "joi";

export const taskValidator = Joi.object().keys({
    title: Joi.string().required().trim().messages({
        'string.empty': 'Title field cannot be empty',
        'any.required': "Title is a required field"
    }),
    description: Joi.string().optional().trim(),
    dueDate: Joi.date().required()
})