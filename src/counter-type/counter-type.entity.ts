import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CounterType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 96,
  })
  name: string;

  @Column({
    type: 'text',
  })
  informations: string;
}
