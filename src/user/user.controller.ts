// controller: là nơi xử lý các request từ client
import { Controller, Get, Post, Body, Query, Param, Res, Delete, Req, HttpStatus, HttpCode, UseGuards, Request as RequestNest, Render } from "@nestjs/common";
import { UserService } from "./user.service";
import { Response, Request } from "express";
import { UserLoginRequestDTO } from "./dto/user_login_request.dto";
import { UserRegisterRequestDTO } from "./dto/user_register_request.dto";
import { UserResponseDTO } from "./dto/user_response.dto";
import { AuthGuard } from 'src/middlewares/auth.guard';
// url: http://localhost:3000/user

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }
    //url: http://localhost:3000/user/register
    @Post('register')
    async register(@Body() body: UserRegisterRequestDTO, @Res() res: Response) {
        try {
            const responseDTO = await this.userService.register(body);
            return res.status(HttpStatus.OK).json(responseDTO)
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
    }
    @Post('login')
    async login(@Body() body: UserLoginRequestDTO, @Res() res: Response) {
        try {
            const responseDTO = await this.userService.login(body);
            return res.status(HttpStatus.OK).json(responseDTO)
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
    }
    @UseGuards(AuthGuard)
    @Get('getAll')
    async getAll(@RequestNest() req: Request, @Res() res: Response) {
        try {
            const responseDTO = await this.userService.getAllUser();
            return res.status(HttpStatus.OK).json(responseDTO)
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
    }
    @Post('refresh-token')
    async refreshToken(@Body() body: any, @Res() res: Response) {
        try {
            let responseDTO = await this.userService.refreshToken(body);
            return res.status(HttpStatus.OK).json(responseDTO);
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
    }

    @Get('home')
    @Render('index')
    async home(@Res() res: Response) {
        try {
            let responseDTO = await this.userService.getAllUser();
            return { message: responseDTO.data }
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
    }
}