import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class DispenserType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 96,
    nullable: false,
  })
  name: string;

  @Column({
    type: 'text',
  })
  informations: string;

  @Column({
    type: 'integer',
    nullable: false,
  })
  pistolnumber: number;
}
