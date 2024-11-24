import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(
        private userService:UserService,
        private jwtService:JwtService
    ){}

    //สำหรับตรวจสอบ email, password ว่าถูกต้องหรือไม่
    async validateUser(email:string, pass:string):Promise<any>{
        const user = await this.userService.findByEmail(email)
        if(user && (await bcrypt.compare(pass, user.password))){
            const{password, ...result} = user.toObject()
            return result
        }
        return null
    }

    //สำหรับเข้า jwt token เมื่อ email และ password ผ่านแล้วเรียบร้อย
    async login(user:any){
        const payload = {email:user.email, sub:user.userId}
        return{
            access_token: this.jwtService.sign(payload)
        }
    }
}
