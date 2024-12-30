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
  title: string;
  content: string;
  authorId?: number;
  createdAt?: Date;
  updatedAt?: Date;
  coverImage?: string;
  seoDescription?: string;
  seoKeywords?: string;
  categoryId?: number;
  summary?: string;
  tags?: string[];
  accessMode?: string;
  allowReprint?: boolean;
  isPublic?: boolean;
  isPinned?: boolean;
  immediatePublish?: boolean;
  allowComments?: boolean;
}

export interface CategorySearchDataType {
  name?: string;
  id?: number;
}
