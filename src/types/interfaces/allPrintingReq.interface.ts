export interface IpringtingPaperSize {
    height: number;
    width: number;
  }
  
  export interface IpringtingShippingAddress {
    firstName: string;
    lastName: string;
    streetAddress: string;
    state: string;
    country: string;
    zipCode: number;
    phoneNumber: string;
    _id: string;
  }
  
  export interface IpringtingBillingAddress {
    firstName: string;
    lastName: string;
    streetAddress: string;
    state: string;
    country: string;
    zipCode: number;
    phoneNumber: string;
    _id: string;
  }
  
  export interface IpringtingBuyer {
    userId: string;
    fullName: string;
    email: string;
    shippingAddress: IpringtingShippingAddress;
    billingAddress: IpringtingBillingAddress;
  }
  
  export interface IpringtingPayment {
    paymentGateway: string;
    paymentStatus: string;
    paymentRequestId: string;
  }
  
  export interface IpringtingOrderStatus {
    status: string;
    time: string;
    _id: string;
  }
  
  export interface IPrintingOrder {
    _id: string;
    orderId: string;
    printingRequestFile: string;
    paperSize: IpringtingPaperSize;
    unit: string;
    paperType: string;
    printingColorMode: string;
    paperUnitPrice: number;
    colorModeUnitPrice: number;
    buyer: IpringtingBuyer;
    totalQuantity: number;
    totalDiscount: number;
    additionalDiscount: number;
    payment: IpringtingPayment;
    orderStatus: IpringtingOrderStatus;
    createdAt: string;
    updatedAt: string;
    totalPrice: number;
    shippingCharge: number;
    totalPayable: number;
    __v: number;
  }
  

  