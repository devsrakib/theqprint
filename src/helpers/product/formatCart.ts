interface ICartData {
    productId: string;
    variant: { variantName: string };
    orderQuantity: number;
  }

  export const formatExistingCart = (existCart: Array<ICartData>) => {
    return [
      ...existCart.map((cartItem) => ({
        ...cartItem,
        productId: cartItem?.productId,
        variantName: cartItem?.variant?.variantName,
        orderQuantity: cartItem?.orderQuantity,
      })),
    ];
  };