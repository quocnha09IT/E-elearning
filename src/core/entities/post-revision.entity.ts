import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { PostStatus } from '../models/post.dto';
import { PostEntity } from './post.entity';
import { UserEntity } from './user.entity';

@Entity({ name: 'post_revision' })
export class PostRevisionEntity {
  @PrimaryColumn({ name: 'post_id', type: 'bigint' })
  postId: number;

  @PrimaryColumn({ name: 'author_id' })
  authorId: string;

  @PrimaryColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @Column({ type: 'varchar', length: 2000, nullable: true })
  title?: string | null;

  @Column({ type: 'varchar', length: 100 })
  reason: string;

  @Column({ type: 'text', nullable: true })
  lexical?: string | null;

  @Column({ type: 'varchar', length: 2000, nullable: true })
  cover?: string | null;

  @Column({
    type: 'enum',
    enum: PostStatus,
    default: PostStatus.DRAFT,
  })
  status: PostStatus;

  @ManyToOne(() => PostEntity, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'post_id' })
  post?: PostEntity;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'author_id' })
  author: UserEntity;
}
