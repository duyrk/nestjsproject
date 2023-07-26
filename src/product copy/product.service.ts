
import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { UserRegisterRequestDTO } from './dto/user_register_request.dto';
import { UserLoginRequestDTO } from './dto/user_login_request.dto';
import { UserResponseDTO } from './dto/user_response.dto';
export class UserService{
    constructor(@InjectModel(User.name)
    private readonly userModel: Model<UserDocument>){}

    async register(requestDTO: UserRegisterRequestDTO): Promise<UserResponseDTO>{
        let responseDTO: UserResponseDTO = {
            status: true,
            message: 'Insert product successfully',
            data: null
        };
        try {
     
            const { email, name, password, confirmPassword} = requestDTO;
            if(password!= confirmPassword){
                throw new Error('Register Successfully!');
            }
            const user: User = {
                name:name,
                email: email,
                password: password
            }
            const model = new this.userModel(user);
            await model.save();
         return responseDTO;
        } catch (error) {
            responseDTO =  {...responseDTO, status: false, message:'Register failed'};
        }
       return responseDTO;
    }
   
}
