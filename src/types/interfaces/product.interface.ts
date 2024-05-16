export interface IBrand {
  brandName: string;
  brandPhoto: string;
  brandId: string;
}

export interface ISubcategory {
  subcategoryName: string;
  subcategoryId: string;
}

export interface ICategory {
  categoryName: string;
  categoryPhoto: string;
  categoryId: string;
  subcategory: ISubcategory;
}

export interface IVariant {
  isDefault: boolean;
  variantName: string;
  variantPhotos: string[];
  inStock: number;
  stockAlert: number;
  sellingPrice: number;
  discountPercentage?: number;
  _id: string;
  createdAt: string;
  updatedAt: string;
  soldQuantity: number;
  discountedPrice?: number;
}

export interface IBlock {
  title: string;
  description: string;
  _id: string;
}

export interface ISpecification {
  sectionName: string;
  blocks: IBlock[];
  _id: string;
}

export interface IDescription {
  type: string;
  data: {
      title: string;
  };
  _id: string;
}

export interface IBulk {
  minOrder: number;
  discount: number;
}

export interface Seo {
  metaTitle: string;
  metaDescription: string;
  metaPhoto: string;
}

export interface IProduct {
  _id: string;
  productName: string;
  brand: IBrand;
  category: ICategory;
  productPhotos: string[];
  variants: IVariant[];
  series: string;
  productModel: string;
  specifications: ISpecification[];
  description: IDescription[];
  isQuickOrderActive: boolean;
  bulk: IBulk;
  seo: Seo;
  __v: number;
  totalReview: number;
  averageRating: number | null;
  quantity:number
}
