import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum TodoStatus {
  ACTIVE = 'active',
  DONE = 'done',
}

@Entity('todos')
export class Todo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  title: string;

  @Column({ type: 'enum', enum: TodoStatus, default: TodoStatus.ACTIVE })
  status: TodoStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
