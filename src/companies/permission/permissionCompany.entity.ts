import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PermissionCompany {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userid: string;

  @Column()
  permissionName: string;

  @Column()
  permissionValue: number;
}
