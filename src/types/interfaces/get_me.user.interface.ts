export interface IUserData {
  defaultAddress: {
    isBilling?: boolean;
    addressId: IAddressId;
  };
  billingAddress: {
    isDefault?: boolean;
    addressId: IAddressId;
  };
  _id: string;
  fullName: string;
  isEmailVerified: boolean;
  phoneNumber: string;
  isPhoneNumberVerified: boolean;
  password: string;
  role: string;
  profilePhoto: string;
  isVerified: boolean;
  wishlist?: any[]; // You may want to define a specific type for wishlist items
  cart?: any[]; // You may want to define a specific type for cart items
  createdAt?: string;
  updatedAt?: string;
  uid?: string;
  __v?: number;
  id?: string;
}

export interface IAddressId {
  _id: string;
  firstName: string;
  lastName: string;
  state: string;
  country: string;
  streetAddress: string;
  phoneNumber: string;
  zipCode: number;
  userId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;
}
