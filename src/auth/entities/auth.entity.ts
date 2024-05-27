import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Entity()
export class Auth {
    @PrimaryGeneratedColumn()
    @ApiProperty({ example: 1, description: 'The ID of the user' })
    id: number;

    @Column()
    @ApiProperty({ example: 'john@example.com', description: 'The email of the user' })
    email: string;

    @Column()
    @ApiProperty({ example: 'John Wick', description: 'The fullname of the user' })
    fullName: string;

    @Column()
    @ApiProperty({ example: 'Any-P@$$w0rD!-1234', description: 'The password of the user' })
    password: string;

    @OneToOne(() => User, user => user.userData)
    user: User;
}
