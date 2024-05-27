import { ApiProperty } from '@nestjs/swagger';
import { Auth } from 'src/auth/entities/auth.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';


@Entity()
export class User {
    @PrimaryGeneratedColumn()
    @ApiProperty({ example: 1, description: 'The ID of the user' })
    id: number;

    @Column()
    @ApiProperty({ example: 'John', description: 'The name of the user' })
    name: string;

    @Column()
    @ApiProperty({ example: 'john@example.com', description: 'The email of the user' })
    email: string;

    
    @OneToOne(() => Auth, userData => userData.user)
    @JoinColumn()
    userData: Auth;
}
