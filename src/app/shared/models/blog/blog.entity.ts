
import { BlogContent } from './blog-content.entity';
import { BlogImage } from './blog-image.entity';
import { BlogView } from './blog-view.entity';
import { BlogTags } from './tags.entity';


export class Blog {
    id!: string;
    title!: string;
    createdAt!: Date;
    updatedAt!: Date;
    images!: BlogImage[];
    blogContent!: BlogContent[];
    BlogView!: BlogView[];
    tags!: BlogTags[];
    introduction!: string;
    publishedDate?: Date;
    draft?: boolean;
}
