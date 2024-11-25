import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(configService:ConfigService){
        super({
            /*
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey:configService.get("JWT_SECRET"),
            ingoreExpiration:false,
            */
           jwtFromRequest:ExtractJwt.fromExtractors([
            (request: Request)=>{
                return request?.cookies?.access_token;
            }
           ])
        })
    }

    async validate(payload:any){
        return{uesrId:payload.sub, email:payload.email}
    }
}