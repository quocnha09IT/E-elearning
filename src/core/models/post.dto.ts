import { Expose, Transform } from 'class-transformer';
import { AuditingDto } from './auditing.dto';
import { PostMetaDto } from './post-meta.dto';
import { TagDto } from './tag.dto';
import { UserDto } from './user.dto';

export enum PostVisibility {
  PUBLIC = 'public',
  MEMBER = 'member',
  PAID_MEMBER = 'paid_member',
}

export enum PostStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  SCHEDULED = 'scheduled',
}

export class PostDto {
  @Transform(({ value }) => Number(value))
  id: number;
  cover?: string;
  title: string;
  slug: string;
  excerpt: string;

  @Expose({ groups: ['detail'] })
  lexical?: string;

  status: PostStatus;

  visibility: PostVisibility;

  wordCount: number;
  featured: boolean;
  publishedAt?: string;
  authors: UserDto[];
  tags: TagDto[];
  meta?: PostMetaDto;
  audit?: AuditingDto;

  constructor(partial: Partial<PostDto> = {}) {
    Object.assign(this, partial);
  }
}
