import { ConflictException, Injectable, InternalServerErrorException,NotFoundException,UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credential-dto';
import { User } from './user.entity';
import {JwtService} from "@nestjs/jwt"
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './jwt.payload.interface';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository:UserRepository,
        private  jwtService:JwtService
    ){}

    async signup(authCredentialsDto:AuthCredentialsDto){
        try{
        const salt =await bcrypt.genSalt()
        const password = await this.passwordHash(authCredentialsDto.password,salt)
         await this.userRepository.save({username:authCredentialsDto.username,password,salt})
        }catch(err){
            if(err.code=='ER_DUP_ENTRY'){
                throw new ConflictException()
            }
            console.log(err);
            
            throw new InternalServerErrorException()
        }
    }

   private async passwordHash(password:string,salt:string):Promise<string>{
        return await bcrypt.hash(password,salt)
    }

    async validateUserPassword(authCredentialsDto:AuthCredentialsDto):Promise<{accessToken:string}>{
        const {username,password}=authCredentialsDto
        const user= await this.userRepository.findOne({where:{username}})
        if(!user){
            throw new NotFoundException()
        }
        if(user && await user.validatePassword(password)){
          const  payload:JwtPayload={username}
            const accessToken= await this.jwtService.sign(payload)
            return {accessToken}
        }
        throw new UnauthorizedException("Invalid credentials")
    }
}
