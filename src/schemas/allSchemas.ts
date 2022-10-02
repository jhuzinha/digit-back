import { ObjectSchema } from 'joi';
import loginSchema from './loginSchema'
import postSchema from './postSchema';
import registerSchema from './registerSchema';


interface AllSchemas {
    [key: string]: ObjectSchema
}

const allSchema: AllSchemas = {
    'login': loginSchema,
    'register': registerSchema,
    'post': postSchema
}

export default allSchema;