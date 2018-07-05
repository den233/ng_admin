export class CreateCategoryDto {
    name: string;
    slug: string;
    order: number;
    parent: string;
    paths: string[];
    description: string;
}

export class EditCategoryDto {
    id: string;
    name: string;
    slug: string;
    order: number;
    parent: string;
    paths: string[];
    description: string;
}

export class CategoryResponse {
    id: string;
    name: string;
    slug: string;
    order: number;
    parent: string;
    paths: string[];
    description: string;
}

export declare interface PaginateCategory {
    error?: Error;
    list: Array<CategoryResponse>;
    total: number;
}


export const CategoryResponseFields = [
    'id',
    'name',
    'slug',
    'order',
    'parent',
    'paths',
    'description'
];
