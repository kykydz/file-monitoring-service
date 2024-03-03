import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	OneToMany,
} from 'typeorm';
import { uuid } from 'uuidv4';
import { File } from './files';

@Entity()
export class User {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	name: string;

	@CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
	created: Date;

	@Column()
	quota: number = 0;

	@Column()
	quota_used: number = 0;

	@UpdateDateColumn({
		type: 'datetime',
		default: () => 'CURRENT_TIMESTAMP',
		onUpdate: 'CURRENT_TIMESTAMP',
	})
	updated: Date;

	@OneToMany(() => File, (file) => file.user)
	files: File[];
}
