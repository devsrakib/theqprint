export interface IUser {
    _id: string;
    fullName: string;
    email: string;
    isEmailVerified: boolean;
    isPhoneNumberVerified: boolean;
    role: string;
    profilePhoto: string;
    defaultAddress: {
      isBilling: boolean;
    };
    billingAddress: {
      isDefault: boolean;
    };
    isVerified: boolean;
    createdAt: string;
    updatedAt: string;
    uid: string;
    __v: number;
  }