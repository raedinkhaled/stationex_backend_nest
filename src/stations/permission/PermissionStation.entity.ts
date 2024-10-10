import { UserAccount } from 'src/user-account/user-account.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Station } from '../station.entity';

@Entity()
export class PermissionStation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserAccount)
  @JoinColumn()
  user: UserAccount;

  @Column()
  permissionName: string;

  @Column()
  permissionValue: boolean;

  @ManyToOne(() => Station)
  @JoinColumn()
  station: Station
}
