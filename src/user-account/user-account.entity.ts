import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserAccount {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 36,
  })
  superTokensUserId: string;

  @Column({
    type: 'varchar',
    length: 36,
    nullable: false,
  })
  firstName: string;

  @Column({
    type: 'varchar',
    length: 36,
    nullable: false,
  })
  lastName: string;

  @Column({
    type: 'varchar',
    length: 92,
    nullable: false,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 92,
    nullable: false,
  })
  phoneNumber: string;

  @Column({
    type: 'boolean',
    nullable: false,
    default: false,
  })
  isActive: boolean;
}
