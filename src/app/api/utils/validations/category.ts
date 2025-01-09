import Joi from 'joi';
import CustomError from '../exception/customError';
export async function createUpdateCategory(body : { [key:string]:string}){
    const userSchema = Joi.object({
        title: Joi.string().min(3).required(),
        description: Joi.string().min(10).required(),
    });

    const { error } = userSchema.validate(body);
    if (error) {
        throw new CustomError(error.details[0].message?.replace(/\\(.)/g, '$1'),422)
    }
}
