
export interface AddressFormState {
    firstName: string;
    lastName: string;
    streetAddress: string;
    state: string;
    companyName: string;
    phoneNumber: string;
    zipCode: number;
    country: string;
    isDefault: boolean;
  }

export interface SingUpFormState {
    fullName: string;
    email: string;
    password: any;
    confirmPassword: any;
}