import joi from 'joi';

const postSchema = joi.object({
    title: joi.string().required(),
    text: joi.string().required(),
    image: joi.string().uri().required()
});

export default postSchema;