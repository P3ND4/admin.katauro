import { Blog } from './blog.entity';
import { User } from '../User';


export class BlogView {
  blogId!: string;
  userId!: string;
  viewedAt!: Date;
  user?: User;
  blog?: Blog;
}
