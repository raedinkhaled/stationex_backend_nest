import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Currency {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 32,
  })
  currencyname: string;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 32,
  })
  currencysymbol: string;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 32,
  })
  currencyunit: string;
}
