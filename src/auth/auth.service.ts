import { BadGatewayException, Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/register.dto';
import { DatabaseService } from '../database/database.service';
import * as bcrypt from 'bcrypt'
import { LoginUserDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly dataService:DatabaseService,
    private readonly jwtService: JwtService
  ){}

  async login(loginData: LoginUserDto){
  
    const user = await this.dataService.user.findFirst({
      where:{
        email: loginData.email
      }
    })
    if (!user){
      throw new BadGatewayException("No such user exist with this email")
    }

    const validatePassword = await bcrypt.compare(loginData.password, user.password)
    if (!validatePassword){
      throw new BadGatewayException("wrong password")
    }

    return {"Token": this.jwtService.sign(loginData)}
  }

  async register(registerData : RegisterUserDto) {
    const user = await this.dataService.user.findFirst({
      where:{
        email: registerData.email
      }
    })
    if (user){
      throw new BadGatewayException("User with this email already exists")
    }
    registerData.password = await bcrypt.hash(registerData.password, 10)
    const res = await this.dataService.user.create({data: registerData})
    return res;
  }

}
