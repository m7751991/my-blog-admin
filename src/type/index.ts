export interface Blog {
  key: number;
  name: string;
  publishDate: string;
  status: string;
  tags: string[];
  category: string;
  isPinned: boolean;
  isPopular: boolean;
  isRecommended: boolean;
  accessMode: string;
}

export interface AddBlogCategoryType {
  open: boolean;
  onSubmit: (category: string) => void;
  onClose: () => void;
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
