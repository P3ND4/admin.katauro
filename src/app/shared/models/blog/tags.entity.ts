import { Blog } from "./blog.entity";

export class Tags {
  id!: string;
  name!: string;
  color!: string;
  bgColor!: string;
}

export class BlogTags {
  blogId!: string;
  tagId!: string;
  blog?: Blog;
  tag!: Tags;
}