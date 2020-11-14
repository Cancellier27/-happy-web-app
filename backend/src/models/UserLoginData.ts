import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity('users_login')
export default class UsersLogin {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  userEmail: string;

  @Column()
  password: string;
}