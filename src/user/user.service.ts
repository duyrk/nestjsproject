
import { Injectable, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { UserRegisterRequestDTO } from './dto/user_register_request.dto';
import { UserLoginRequestDTO } from './dto/user_login_request.dto';
import { UserResponseDTO } from './dto/user_response.dto';
import { response } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
        private jwtService: JwtService) { }

    async register(requestDTO: UserRegisterRequestDTO): Promise<UserResponseDTO> {
        let responseDTO: UserResponseDTO = {
            status: true,
            message: 'Register successfully',
            data: null
        };
        try {

            const { email, name, password, confirmPassword } = requestDTO;
            if (password != confirmPassword) {
                throw new Error('Confirm password and password are not the same');
            }
            const user: User = {
                name: name,
                email: email,
                password: password
            }
            const model = new this.userModel(user);
            await model.save();
            return responseDTO;
        } catch (error) {
            responseDTO = { ...responseDTO, status: false, message: 'Register failed' };
        }
        return responseDTO;
    }
    async login(requestDTO: UserLoginRequestDTO): Promise<UserResponseDTO> {
        let responseDTO: UserResponseDTO = {
            status: true,
            message: 'Login successfully',
            data: null
        };
        try {
            const { email, password } = requestDTO;

            const user = await this.userModel.findOne({ email });
            if (user) {
                if (password != user.password) {
                    throw new Error('Incorrect password');
                }
                responseDTO.data = {
                    user: user,
                    access_token: this.jwtService.sign({ email: user.email, id: user._id }),
                    refresh_token: this.jwtService.sign({ email: user.email, id: user._id }, { expiresIn: '30d' })
                }
            }
            return responseDTO;
        } catch (error) {
            return responseDTO = { ...responseDTO, status: false, message: error.message };
        }
    }
    async refreshToken(requestDTO: any): Promise<UserResponseDTO> {
        let responseDTO: UserResponseDTO = {
            status: true,
            message: 'Refresh token successfully',
            data: null
        };
        try {
            const { email, refresh_token } = requestDTO;
            //check refresh token con han hay khong
            const decode = this.jwtService.verify(refresh_token);
            if (decode.email !== email) {
                throw new Error('Invalid refresh token');
            }
            responseDTO.data = {
                access_token: this.jwtService.sign({ email: decode.email, id: decode.id })
            }
        } catch (error) {
            responseDTO = { ...responseDTO, status: false, message: 'Refresh token failed' };
        }
        return responseDTO;
    }
    async getAllUser(): Promise<UserResponseDTO> {
        let responseDTO: UserResponseDTO = {
            status: true,
            message: 'Get all users successfully',
            data: null
        };

        try {
            const users = await this.userModel.find();
            responseDTO.data = users;
            return responseDTO;
        } catch (error) {
            return responseDTO = { ...responseDTO, status: false, message: error }
        }
    }
}
