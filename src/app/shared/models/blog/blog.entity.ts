
import { BlogContent } from './blog-content.entity';
import { BlogImage } from './blog-image.entity';
import { BlogView } from './blog-view.entity';


export class Blog {
    id!: string;
    title!: string;
    createdAt!: Date;
    updatedAt!: Date;
    images!: BlogImage[];
    blogContent!: BlogContent[];
    BlogView!: BlogView[];
}
