import Joi from 'joi';
import Handler from '../handler/responseHandler';
import CustomError from '../exception/customError';
export async function registerJoi(body : { [key:string]:string}){
    const userSchema = Joi.object({
        name: Joi.string().min(1).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
    });

    const { error } = userSchema.validate(body);
    if (error) {
        throw new CustomError(error.details[0].message?.replace(/\\(.)/g, '$1'),422)
    }
}


export async function loginJoi(body:{ [key:string]:string}){
    const userSchema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
    });

    const { error } = userSchema.validate(body);
    if (error) {
        throw new CustomError(error.details[0].message?.replace(/\\(.)/g, '$1'),422)
    }
}





