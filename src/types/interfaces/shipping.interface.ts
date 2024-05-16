export interface IShippingAddress{
    _id: string,
    isDefault: string,
    isBilling: string,
    firstName: string
    lastName:string
    state: string
    country: string,
    streetAddress: string,
    phoneNumber: string,
    zipCode: number,
    userId?: string,
    createdAt?: string,
    updatedAt?: string,
    __v?: number
}