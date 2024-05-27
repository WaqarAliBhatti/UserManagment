import { ApiProperty } from '@nestjs/swagger';

export class CreateAuthDto {

    @ApiProperty({ example: 'john@example.com', description: 'The email of the user' })
    email: string;

    @ApiProperty({ example: 'John Wick', description: 'The fullname of the user' })
    fullName: string;

    @ApiProperty({ example: 'Any-P@$$w0rD!-1234', description: 'The password of the user' })
    password: string;

    token:string
}
