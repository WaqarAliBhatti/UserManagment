import { Controller, Get, Post, Body, Patch, Param, Delete,Request, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { forAllUser } from 'src/config/protect';
import { userInfo } from 'os';
import { CreateUserDetails } from './dto/view-details.dto';


@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @forAllUser()
  @Post()
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 201, description: 'The user has been successfully created.', type: User })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  create(@Body() createUserDto: CreateUserDto,@Request() _req) {
    console.log("Request Objects Body ==> ",_req.body);
    
    return this.userService.create(createUserDto);
  }

  @forAllUser()
  @Get()
  @ApiOperation({ summary: 'Get All user' })
  @ApiResponse({ status: 200, description: 'The found record', type: User })
  findAll() {
    return this.userService.findAll();
  }

  @forAllUser()
  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiResponse({ status: 200, description: 'The found record', type: User })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @forAllUser()
  @Post('/search')
  @ApiOperation({ summary: 'Search user by Character' })
  @ApiResponse({ status: 200, description: 'The found record', type: User })
  searchByName(@Body() createUserDto: CreateUserDto) {
    console.log("name @ Controller==> ",createUserDto.name);
    try {
      
      return this.userService.search(createUserDto.name);
    } catch (error) {
      return {message:error,data:null}
    }
  }

  @forAllUser()
  @Patch(':id')
  @ApiOperation({ summary: 'Update user by ID' })
  @ApiResponse({ status: 200, description: 'User is updated', type: User })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @forAllUser()
  @Delete(':id')
  @ApiOperation({ summary: 'Deleted user by ID' })
  @ApiResponse({ status: 200, description: 'User is deleted', type: User })
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @forAllUser()
  @Post('/userDetails')
  @ApiOperation({ summary: 'Get user Details by ID' })
  @ApiResponse({ status: 200, description: 'Get user Details by ID', type: User })
  findUserDetailsOfLoggedIn(@Body() id:CreateUserDetails) {
    try {
      
      return this.userService.findUserDetailsOfLoggedIn(id.id);
    } catch (error) {
      return {message:error};
      
    }
  }

}
