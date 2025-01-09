import { NextRequest } from 'next/server';
import  dbConnect  from '@/app/api/db/dbConnect';
import User, { UserType } from '../../../db/models/user.model';
import { hashPassword, generateToken } from '../../../utils/auth';
import Handler from '@/app/api/utils/handler/responseHandler';
import { registerJoi } from '@/app/api/utils/validations/auth';
import CustomError from '@/app/api/utils/exception/customError';

export async function POST(req: NextRequest) {
 
    // Validation
    try {
     
      const data = await req.json();
      await registerJoi(data)
      const { name , email , password } = data
      console.log('password', password)
      await dbConnect();
      const user = await User.findOne({ email });
      if (user) {
        throw new CustomError(`Customer with email ${email} already exists`,409)
      }

      // Hash the password
      const hashedPassword = await hashPassword(password);
  
      // Create a new user
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        role: UserType.Customer,
        isActive: true,
      });

      const resp:any = await newUser.save();
      // Prepare response data
      const response = {
        _id:resp._id,
        name: resp.name,
        email: resp.email,
        role: resp.role,
      };

      const token = await generateToken(response);

      return Handler({ message: 'Registration successfull', data : { token : token , userInfo : response} },{ status : 200});
    } catch (error: any) {
      return Handler({ message: error.message, status:false },{ status : error.status});
    }
}
