import { Type } from 'class-transformer';
import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToOne,
	JoinColumn,
	Index,
} from 'typeorm';
import { User } from './user';

@Entity()
export class File {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@ManyToOne(() => User, (user) => user.files)
	@JoinColumn({ name: 'user_id' })
	user: User;

	@Column()
	name: string;

	@Column()
	path: string;

	@Column()
	size: number;

	@CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
	created: Date;

	@UpdateDateColumn({
		type: 'datetime',
		default: () => 'CURRENT_TIMESTAMP',
		onUpdate: 'CURRENT_TIMESTAMP',
	})
	updated: Date;
}
