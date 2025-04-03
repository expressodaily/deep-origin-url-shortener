import { User } from "../../database/models/user/types";
import { createUser, findByEmail } from "../../database/repositories/user";
import { AuthFailureError, BadRequestError, NotFoundError } from "../../core/error";
import bcrypt from 'bcrypt';

export const comparePassword = async (password: string, hash: string) => {
    return await bcrypt.compare(password, hash);
};

export const generatePasswordHash = async (password: string)  => {
    return await bcrypt.hash(password, 10)
}

export const SignUp = async (user: User): Promise<User> => {
    const existingUser: User | null = await findByEmail(user.email);

    if (existingUser) {
        throw new BadRequestError('User is already existed!');
    }

    const generatedPassword = await generatePasswordHash(user.password);

    return createUser({ email: user.email, password: generatedPassword });
};

export const LogIn = async (user: User): Promise<User> => {
    
    const existingUser: User | null = await findByEmail(user.email);
    if (!existingUser) {
        throw new NotFoundError('User is not existed!');
    }

    const isPasswordValid = await comparePassword(user.password, existingUser.password); // Fixed function name
    if (!isPasswordValid) {
        throw new AuthFailureError('Invalid credentials!');
    }
    return existingUser;
};