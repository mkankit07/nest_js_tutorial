import { Controller,Post,Body, ValidationPipe,
    // UseGuards,
    // Req
 } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credential-dto';
import { AuthService } from './auth.service';
// import {AuthGuard} from "@nestjs/passport";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }
    @Post('/signup')
    signUp(@Body(ValidationPipe) authCredentialsDto:AuthCredentialsDto):Promise<void>{
        return this.authService.signup(authCredentialsDto)
    }
    @Post("/login")
    login(@Body(ValidationPipe) authCredentialsDto:AuthCredentialsDto):Promise<{accessToken:string}>{
        return this.authService.validateUserPassword(authCredentialsDto)
    }

    // @Post("/logout")
    // @UseGuards(AuthGuard())
    // test(@Req() req){
    //     console.log(req.user)
    // }
    
}
