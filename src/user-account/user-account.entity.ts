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
  supertokensuserid: string;

  @Column({
    type: 'varchar',
    length: 36,
    nullable: false,
  })
  firstname: string;

  @Column({
    type: 'varchar',
    length: 36,
    nullable: false,
  })
  lastname: string;

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
  phonenumber: string;

  @Column({
    type: 'boolean',
    nullable: false,
    default: false,
  })
  isactive: boolean;
}
