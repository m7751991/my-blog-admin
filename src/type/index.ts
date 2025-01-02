export interface AddBlogCategoryType {
  open: boolean;
  onSubmit: (category: CategoryType) => void;
  onClose: () => void;
  defaultValues?: CategoryType;
}

export interface CategoryType {
  id?: number;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt?: Date;
}

export interface RouteType {
  path: string;
  element: React.ReactNode;
  children?: RouteType[];
  default?: boolean;
}

export interface MenuItem {
  key: string;
  label: string;
  route?: string;
  children?: MenuItem[];
}

export interface LeftNavProps {
  menuItems: MenuItem[];
}

export interface BlogModelType {
  id: number; // 博客的唯一标识符
  title: string; // 博客标题
  content: string; // 博客内容
  authorId?: number; // 作者ID（可选）
  createdAt: Date; // 博客创建日期
  updatedAt?: Date; // 博客最后更新日期（可选）
  coverImage?: string; // 封面图片的URL（可选）
  seoDescription: string; // 博客的SEO描述
  seoKeywords: string; // 博客的SEO关键词
  categoryId: number; // 分类ID
  categoryName: string; // 分类名称
  summary: string; // 博客摘要
  tags?: string[]; // 与博客相关的标签数组（可选）
  allowReprint: boolean; // 是否允许转载的标志
  isPublic: boolean; // 是否公开的标志
  isPinned: boolean; // 是否置顶的标志
  allowComments: boolean; // 是否允许评论的标志
  status: number; // 博客状态
  statusText: string; // 博客状态文本
}

export interface CategorySearchDataType {
  name?: string;
  id?: number;
}
export interface BlogSearchDataType {
  title?: string;
  id?: number;
}

export interface CategoryModelType {
  id: number;
  name: string;
  description?: string;
  createdAt: bigint;
  updatedAt?: bigint;
  blogs: BlogModelType[];
  blogCount: number;
}
