import { Station } from 'src/stations/station.entity';
import { UserAccount } from 'src/user-account/user-account.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 30,
    nullable: false,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 96,
    nullable: false,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 13,
    nullable: false,
  })
  phoneFirst: string;

  @Column({
    type: 'varchar',
    length: 13,
    nullable: true,
  })
  phoneSecond: string;

  @Column({
    type: 'varchar',
    length: 96,
    nullable: false,
  })
  address: string;

  @Column({
    type: 'varchar',
    length: 96,
    nullable: false,
  })
  city: string;

  @Column({
    type: 'varchar',
    length: 96,
    nullable: false,
  })
  state: string;

  @Column({
    type: 'varchar',
    length: 96,
    nullable: false,
  })
  zip: string;

  @OneToMany(() => Station, (station) => station.company, {
    cascade: true,
  })
  stations: Station[];

  @ManyToOne(() => UserAccount, (user) => user.companies)
  owner: UserAccount;

  @OneToMany(() => UserAccount, (user) => user.company)
  users: UserAccount[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
