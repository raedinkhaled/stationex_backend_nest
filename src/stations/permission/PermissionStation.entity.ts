import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PermissionStation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userid: string;

  @Column()
  PermissionName: string;

  @Column()
  PermissionValue: number;
}
