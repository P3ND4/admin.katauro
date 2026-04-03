import { Blog } from './blog.entity';

export class BlogContent {
  id!: string;
  blogId!: string;
  text!: string;
  position!: number;
  blog?: Blog;
}
