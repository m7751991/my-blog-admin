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
