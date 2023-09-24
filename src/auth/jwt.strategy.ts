import {PassportStrategy} from "@nestjs/passport"
import {Strategy,ExtractJwt} from "passport-jwt"
import {Injectable,UnauthorizedException}from "@nestjs/common"
import { JwtPayload } from "./jwt.payload.interface"
import { InjectRepository } from "@nestjs/typeorm"
import { UserRepository } from "./user.repository"
import { User } from "./user.entity"

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        @InjectRepository(User)
        private userRepository: UserRepository
    ){
        super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey:"secretkey"
        })
    }

    async validate(payload:JwtPayload):Promise<User>{
        const user= await this.userRepository.findOne({where:{username:payload.username}})
        if(!user){
            throw new UnauthorizedException
        }
        return user
    }
}