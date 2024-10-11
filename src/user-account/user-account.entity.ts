import { Company } from 'src/companies/company.entity';
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

  @OneToMany(() => Company, (company) => company.owner, {
    cascade: true,
  })
  companies: Company[]; // Companies owned by this user

  @ManyToOne(() => Company, (company) => company.users)
  company: Company; // The company the user belongs to

  @Column({ type: 'varchar', nullable: false, default: 'user' })
  role: string; // Roles in company 'user', 'owner',

  @Column({
    type: 'boolean',
    nullable: false,
    default: false,
  })
  isactive: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
