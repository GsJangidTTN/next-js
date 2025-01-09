import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Hash password
export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10); // 10 rounds of salt
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

// Verify password
export const verifyPassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
};

// Generate JWT Token
export const generateToken = (data : { [key:string]:any}): string => {
  return jwt.sign(data, process.env.JWT_SECRET as string, { expiresIn: '1d' });
};
