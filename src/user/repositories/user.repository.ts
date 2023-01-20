import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async find(): Promise<User[]> {
    return this.userModel.find({});
  }

  async getCurrentUserProfile(userId: string): Promise<User> {
    return this.userModel.findOne({ _id: userId });
  }

  async updateProfile(userDetails: any): Promise<User> {
    const {
      firstName,
      lastName,
      email,
      image,
      DOB,
      mobile,
      gender,
      address,
      city,
      country,
      postalCode,
    } = userDetails;

    let { qualifications } = userDetails;
    qualifications = JSON.parse(qualifications);

    let { skills } = userDetails;
    skills = JSON.parse(skills);

    await this.userModel.updateOne(
      { _id: userDetails.userId },
      {
        $set: {
          firstName,
          lastName,
          email,
          image,
          DOB,
          mobile,
          gender,
          address,
          city,
          country,
          postalCode,
          qualifications,
          skills,
        },
      },
    );
    return null;
  }

  async getUserByEmail(email: string) {
    return this.userModel.findOne({ email: email });
  }
}
