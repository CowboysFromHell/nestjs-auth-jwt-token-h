import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name)
        private readonly userModel:Model<UserDocument>
    ){}

    async create(registerDto: RegisterDto):Promise<User>{
        const newUser = new this.userModel(registerDto)
        return await newUser.save()
    }

    async findByEmail(email:string):Promise<UserDocument>{
        return await this.userModel.findOne({email}).exec()
    }
}
