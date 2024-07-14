import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register.dto';
import { LoginUserDto } from './dto/login.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({description: 'To register a new user using email.', summary: 'Register new user'})
  @Post('register')
  create(@Body() createAuthDto: RegisterUserDto) {
    return this.authService.register(createAuthDto);
  }

  @ApiOperation({description: 'To login the user using email and password.', summary: 'Login'})
  @Post('login')
  login(@Body() loginData: LoginUserDto){
    return this.authService.login(loginData)
  }
 
}
