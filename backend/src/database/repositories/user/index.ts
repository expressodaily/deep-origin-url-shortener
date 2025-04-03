import {User} from "../../models/user/types";
import {UserModel} from "../../models/user";

async function findByEmail(email: string): Promise<User | null> {
  const mail =  UserModel.findOne({email: email}).select(
      '+email +password',
  ).lean().exec();
  return mail; 
}

async function createUser(
    user:User,
): Promise<User> {
  await UserModel.create(user);
  return user
}

async function updateUser(user: User): Promise<any> {
    user.updatedAt = new Date();
    return UserModel.updateOne({ _id: user._id }, { $set: { ...user } })
        .lean()
        .exec();
}

export {
    findByEmail,
    createUser,
    updateUser,

}