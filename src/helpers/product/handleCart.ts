import { useAddCartMutation, useGetCartQuery } from "../../redux/api/addToCartSlice";
import { IProduct } from "../../types/interfaces/product.interface";
import { formatExistingCart } from "./formatCart";
const { data: cartData, refetch } = useGetCartQuery('');
const [addCart] = useAddCartMutation();

export const handleAddToCart = async (product: IProduct, selectedVariant: any) => {
    // Ensure selectedVariant is updated before proceeding
    if (!selectedVariant) return;

    const isAlreadyExistItem = cartData?.data?.products?.find(
      (item: any) =>
        item.productId === product._id && item.variant.variantName === selectedVariant.variantName
    );

    const isAlreadyExistIndex = cartData?.data?.products?.findIndex(
      (item: any) =>
        item.productId === product._id && item.variant.variantName === selectedVariant.variantName
    );

    let updateData;
    if (isAlreadyExistIndex === -1) {
      updateData = [
        ...formatExistingCart(cartData?.data?.products),
        { productId: product?._id, variantName: selectedVariant.variantName, orderQuantity: 1 },
      ];
    } else {
      updateData = [
        ...formatExistingCart(cartData?.data?.products.slice(0, isAlreadyExistIndex)),
        {
          productId: product._id,
          variantName: selectedVariant.variantName,
          orderQuantity: isAlreadyExistItem.orderQuantity + 1,
        },
        ...formatExistingCart(cartData?.data?.products?.slice(isAlreadyExistIndex + 1)),
      ];
    }

    const res = await addCart({ products: updateData });
    refetch();
  };