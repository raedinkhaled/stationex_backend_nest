import { UserAccount } from 'src/user-account/user-account.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Station } from '../station.entity';

@Entity()
export class PermissionStation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserAccount)
  @JoinColumn()
  user: UserAccount;

  @Column({
    default: false,
  })
  permissionName: string;

  @Column({ type: 'boolean', nullable: false })
  permissionValue: boolean;

  @ManyToOne(() => Station)
  @JoinColumn()
  station: Station;
}
