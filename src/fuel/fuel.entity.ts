import { Tank } from 'src/tank/tank.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Fuel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 30,
    nullable: false,
  })
  fuelname: string;

  @Column({
    type: 'varchar',
    length: 30,
    nullable: false,
  })
  color: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  informations: string;

  @Column({
    type: 'boolean',
    default: true,
  })
  active: boolean;
  @OneToMany(() => Tank, (tank) => tank.fuel)
  tanks: Tank[];
}
