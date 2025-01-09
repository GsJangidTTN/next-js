import { NextRequest } from 'next/server';
import dbConnect from '@/app/api/db/dbConnect';
import User from '../../../db/models/user.model';
import { generateToken, verifyPassword } from '../../../utils/auth';
import Handler from '@/app/api/utils/handler/responseHandler';
import { loginJoi } from '@/app/api/utils/validations/auth';  // Assuming you have a Joi validation for login
import CustomError from '@/app/api/utils/exception/customError';

export async function POST(req: NextRequest) {
  // Validation
  try {
    
    const data = await req.json();
    await loginJoi(data); // Assuming you have Joi validation for login

    const { email, password } = data;
    
    // Connect to the database
    await dbConnect();
    
    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      throw new CustomError(`No user found with email: ${email}`, 404);
    }

    // Check if password matches
    const isPasswordCorrect = await verifyPassword(password, user.password);

    if (!isPasswordCorrect) {
      throw new CustomError('Invalid email or password', 401);
    }

     // Prepare response data
     const response = {
        _id:user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      };

    // Generate JWT token
    const token = await generateToken(response);

    // Send response
    return Handler(
      { message: 'Login successful', data: { token, userInfo: response } },
      { status: 200 }
    );
  } catch (error: any) {
    return Handler(
      { message: error.message, status: false },
      { status: error.status || 500 }
    );
  }
}
