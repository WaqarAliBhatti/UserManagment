import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';
import { Repository } from 'typeorm';
import { ResponseDto } from 'src/user/common/response.dto';
import { JwtService } from 'src/config/jwt.service';


@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private authRepository: Repository<Auth>,
    private readonly jwtService: JwtService, // Inject AuthToken service
  ) {}
  createToken(payload: any): Promise<string> {
    return this.jwtService.sign(payload);
  }
  async verifyToken(token: string): Promise<any> {
    return this.jwtService.verify(token);
  }
  async create(createAuthDto: CreateAuthDto):Promise<ResponseDto>  {
   try {
    
    const newSinUp=await this.authRepository.create(createAuthDto);
    const u=await this.authRepository.save(newSinUp);
    console.log("Signed Up User==>",u);
    // const token =await this.createToken({email:u.email,fullName:u.fullName})

    return { message: "You Signed Up, Login please", data: {u}  };

    } catch (error) {
      console.log("Error ==> ",error);
      
      return error
    } 
  }

  async login(createAuthDto: CreateAuthDto):Promise<ResponseDto>  {
    try {
     const signedUser=await this.authRepository.findOne({where:{email:createAuthDto.email}});
     if(!signedUser){
      return { message: "Invalid Email"};
     }
     if(signedUser.password!==createAuthDto.password){
      return { message: "Your Password in wrong"};
     }

      // Assign token
      const token =await this.createToken({email:signedUser.email,fullName:signedUser.fullName})

      console.log("Created Token ==> ",token);
      
     
     return { message: "You Logged In, Perfrom Operations please", data: {signedUser,token}  };

 
 
     } catch (error) {
       console.log("Error ==> ",error);
       
       return error
     } 
   }


}
