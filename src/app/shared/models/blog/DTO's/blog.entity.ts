
import { CreateBlogContent } from './blog-content.entity';
import { CreateBlogImage } from './blog-image.entity';
import { CreateBlogView } from './blog-view.entity';


export class Blog {

    title!: string;
    images!: CreateBlogImage[];
    blogContent!: CreateBlogContent[];
    BlogView!: CreateBlogView[];
    tags!: string[];
    introduction!: string;
    publishedDate?: Date;
    draft?: boolean;
}
