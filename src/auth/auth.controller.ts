import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth } from './entities/auth.entity';

@ApiTags('Users')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  @ApiOperation({ summary: 'Sign Up' })
  @ApiResponse({ status: 201, description: 'The user has been signed up.', type: Auth })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  signUp(@Body() createAuthDto: CreateAuthDto) {
    console.log("createAuthDto ==> ",createAuthDto);
    
    return this.authService.create(createAuthDto);
  }
  @Post('/login')
  @ApiOperation({ summary: 'Login Up' })
  @ApiResponse({ status: 201, description: 'The user has been logged in.', type: Auth })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  login(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.login(createAuthDto);
  }

}
