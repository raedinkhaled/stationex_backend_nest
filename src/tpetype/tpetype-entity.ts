import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TpeType {
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
    nullable: true,
  })
  informations: string;
}
