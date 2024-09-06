import { Column, PrimaryGeneratedColumn, ViewEntity } from 'typeorm';

@ViewEntity({ name: 'emailpassword_users' })
export class User {
  @PrimaryGeneratedColumn()
  user_id: string;

  @Column({
    type: 'varchar',
    nullable: false,
    unique: true,
  })
  email: string;
}
