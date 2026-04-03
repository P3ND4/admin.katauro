import { Blog } from './blog.entity';

export class BlogImage {
  id!: string;
  link!: string;
  publicId?: string;
  position!: number;
  blogId!: string;
  blog?: Blog;
}
