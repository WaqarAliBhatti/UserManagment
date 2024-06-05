import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResponseDto } from './common/response.dto';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
    async create(createUserDto: CreateUserDto):Promise<ResponseDto> {
    try {
      const user =await this.userRepository.create(createUserDto)
      const savedUser= await this.userRepository.save(user);  
      console.log("savedUser==>",savedUser);
      
      return { message: "User Created", data: user  };
    } catch (error) {
      return error    
    }
    
  }

 async findAll():Promise<ResponseDto> {
  //  const allUsers=await this.userRepository.find();
   const allUsers= await this.userRepository.createQueryBuilder('users').getMany();
   console.log("allUsers ==> ",allUsers);
   
   return { message: "User Created", data: allUsers  };

  }

 async findOne(id: number):Promise<ResponseDto> {
  const user = await this.userRepository.findOne({where: {id: id}});
    return { message: `Fetched User with ${id}` , data: user  };

  }
  
  async search(name: string):Promise<ResponseDto> {
    console.log("name ==>",name);
    if(!name){
      return { message: `Cant Fetch User ==> ${name}` , data: null  }
    }
   try {
    
     const user = await this.userRepository.find({where: {name}});
     if(user.length<1){
      return { message: `Cant Fetch User ==> ${name}` , data: null  }
    }
     console.log("user==>",user);
     
       return { message: `Fetched User ==> ${name}` , data: user  };
   
   } catch (error) {
    console.log("Error In Catch",error);
    
    return { message: `Error ==> ${error}` , data: null  };
   
   } 
    }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.userRepository.update(id,updateUserDto)
    const updatedUser=await this.userRepository.findOne({where :{id}});
    return {message:"User Updated",data:updatedUser}
  }

 async remove(id: number) {
    const deletedUser=await this.userRepository.findOne({where :{id}});
    await this.userRepository.delete(id)
    let message=!deletedUser?"User Not Found Or Already deleted":"User Deleted";
    return {message,data:deletedUser}
  }
  async findUserDetailsOfLoggedIn (id: string) {
    const uid=+id;
    if (isNaN(uid)) {
      return { message: "Invalid user ID", data: null };
    }
    const fullData= await this.userRepository
    .createQueryBuilder('u')
    .where('u.id=:uid',{uid})
    .leftJoinAndSelect("u.userData",'ud')
    .getOne();
    console.log("fullData ==>",fullData);
    
    let message=!fullData?"User Not Found ":"User Found";
    return {message,data:fullData}
  }
}
