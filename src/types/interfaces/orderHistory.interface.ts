export interface IOrderHistory {
  productName: string;
  productPhotos: string[];
  productId: string;
  brand: {
    brandName: string;
    brandId: string;
  };
  category: {
    categoryName: string;
    categoryId: string;
    subcategory: {
      subcategoryName: string;
      subcategoryId: string;
    };
    _id: string;
  };
  variant: {
    variantName: string;
    sellingPrice: number;
    discountPercentage: number;
    discountedPrice: number;
    _id: string;
  };
  orderQuantity: number;
  subTotalPayable: number;
  isReviewed: boolean;
  _id: string;
}

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  streetAddress: string;
  state: string;
  country: string;
  zipCode: number;
  phoneNumber: string;
  _id: string;
  companyName:string
}

export interface BillingAddress {
  firstName: string;
  lastName: string;
  streetAddress: string;
  state: string;
  country: string;
  zipCode: number;
  phoneNumber: string;
  _id: string;
}

export interface Buyer {
  userId: string;
  fullName: string;
  email: string;
  shippingAddress: ShippingAddress;
  billingAddress: BillingAddress;
}

export interface Payment {
  paymentMethod: string;
  paymentStatus: string;
  paymentGateway: string;
  paymentRequestId: string

}

export interface IOrderStatus {
  status: string;
  time: string;
  _id: string;
}

export interface IOrder {
  _id: string;
  orderItems: IOrderHistory[];
  buyer: Buyer;
  totalQuantity: number;
  totalDiscount: number;
  additionalDiscount: number;
  payment: Payment;
  orderStatus: IOrderStatus;
  createdAt: string;
  updatedAt: string;
  orderId: string;
  totalPrice: number;
  shippingCharge: number;
  totalPayable: number;
  status:string
  __v: number;
}
