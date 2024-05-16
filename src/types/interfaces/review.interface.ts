export interface IBuyer {
    userId: string;
    fullName: string;
    phoneNumber: string;
    shippingAddress: IAddress;
    billingAddress: IAddress;
}

export interface IAddress {
    firstName: string;
    lastName: string;
    streetAddress: string;
    state: string;
    country: string;
    zipCode: number;
    phoneNumber: string;
    _id: string;
}

export interface IPayment {
    paymentMethod: string;
    paymentStatus: string;
}

export interface IBrand {
    brandName: string;
    brandId: string;
}

export interface ISubcategory {
    subcategoryName: string;
    subcategoryId: string;
}

export interface ICategory {
    subcategory: ISubcategory;
    categoryName: string;
    categoryId: string;
    _id: string;
}

export interface IVariant {
    variantName: string;
    sellingPrice: number;
    discountPercentage: number;
    discountedPrice: number;
    _id: string;
}

export interface IOrderItems {
    brand: IBrand;
    productName: string;
    productPhotos: string[];
    productId: string;
    category: ICategory;
    variant: IVariant;
    orderQuantity: number;

    subTotalPayable: number;
    isReviewed: boolean;
    _id: string;
    id: string;
}

export interface IOrderStatus {
    status: string;
    time: string;
    _id: string;
    id: string;
}

export interface IOrderReview {
    buyer: IBuyer;
    payment: IPayment;
    _id: string;
    orderItems: IOrderItems[];
    totalQuantity: number;
    totalDiscount: number;
    additionalDiscount: number;
    orderStatus: IOrderStatus[];
    createdAt: string;
    updatedAt: string;
    orderId: string;
    totalPrice: number;
    shippingCharge: number;
    totalPayable: number;
    __v: number;
    id: string;
}




export interface IReviewHistory {
    _id: string;
    orderId: string;
    reviewer: {
        fullName: string;
        profilePhoto: string;
        email: string;
        userId: string;
    };
    product: {
        productName: string;
        brandName: string;
        productPhoto: string;
        productId: string;
    };
    rating: number;
    comment: string;
    reviewPhotos: string[];
    createdAt: string;
    updatedAt: string;
    __v: number;
}
