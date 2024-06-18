import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Panel } from '../panel/panel.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @OneToMany(() => Panel, (panel) => panel.user)
  panels: Panel[];

  // @CreateDateColumn()
  // createdAt: Date;

  // @UpdateDateColumn({ type: 'timestamp' })
  // modifiedAt: Date;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  modifiedAt: Date;
}
