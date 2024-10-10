import { Company } from 'src/companies/company.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Station {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 96,
    nullable: false,
  })
  stationName: string;

  @ManyToOne(() => Company, (company) => company.stations)
  company: Company;

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
  crn: string;
  @Column({
    type: 'varchar',
    length: 96,
    nullable: false,
  })
  nif: string;
  @Column({
    type: 'varchar',
    length: 96,
    nullable: false,
  })
  nis: string;

  @Column({
    type: 'varchar',
    length: 96,
    nullable: true,
  })
  article: string;

  @Column({
    type: 'boolean',
    nullable: false,
    default: false,
  })
  active: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
