import { Fuel } from 'src/fuel/fuel.entity';
import { Station } from 'src/stations/station.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Tank {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Station)
  @JoinColumn()
  station: Station;

  @ManyToOne(() => Fuel, (fuel) => fuel.tanks, { eager: true })
  fuel: Fuel;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 36,
  })
  tankname: string;


  @Column({
    type: 'integer',
    nullable: false,
  })
  capacity: number;

  @Column({
    type: 'integer',
    nullable: false,
  })
  alert: number;

  @Column({
    type: 'boolean',
    nullable: false,
    default: true,
  })
  active: boolean;

  @Column({
    type: 'text',
    nullable: true,
  })
  informations: string;
}
