import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../auth/user.entity';

@Entity()
export class Panel {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column()
  title: string;

  @Column('text')
  content: string;

  @Column()
  action: string;

  @Column()
  timezone: string;

  @Column()
  width: number;

  @Column()
  height: number;

  @Column()
  x: number;

  @Column()
  y: number;

  @Column({ default: false })
  isHide: boolean;

  @Column({ default: false })
  isMaximize: boolean;

  @Column({ default: false })
  isMinimize: boolean;

  @Column({ default: false })
  isClose: boolean;

  @Column({ default: false })
  isDrag: boolean;

  @Column({ default: false })
  isResize: boolean;

  @Column({ type: 'bigint', default: 0 })
  order: number;

  @ManyToOne(() => User, (user) => user.panels)
  user: User;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  modifiedAt: Date;

  // @CreateDateColumn({ type: 'datetime' })
  // createdAt: Date;

  // @UpdateDateColumn({ type: 'datetime' })
  // modifiedAt: Date;
}
