import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDetails {
  @ApiProperty({ example: 'John', description: 'The name of the user' })
  id: string;


}
