import { shopifyFetch } from "./shopifyConfigs";
import { Product } from "@/data/products";

// The structure of our local cart item from cartStore
export interface LocalCartItem {
  product: Product;
  quantity: number;
  size: string;
}

const CART_CREATE_MUTATION = `
  mutation cartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        checkoutUrl
      }
      userErrors {
        field
        message
      }
    }
  }
`;

/**
 * Creates a Shopify cart using the local cart items and returns a checkout URL.
 */
export const createShopifyCheckout = async (items: LocalCartItem[]): Promise<string> => {
  // Map local cart items to Shopify cart line items
  const lines = items.map(item => {
    // We need to find the specific Shopify variant ID that matches the selected size
    let variantId = "";
    
    // Check if the product has the variants mapped from Shopify
    if (item.product.variants && item.product.variants.length > 0) {
      const matchedVariant = item.product.variants.find(v => v.title === item.size);
      if (matchedVariant) {
        variantId = matchedVariant.id;
      } else {
        // Fallback to the first variant if size match fails
        variantId = item.product.variants[0].id;
      }
    } else {
      // Fallback: If no variants were fetched (e.g., using mock data), 
      // we can't create a real Shopify checkout for this item.
      console.warn(`No Shopify variant found for product ${item.product.name}`);
      // In a real app, you might want to handle this gracefully or throw an error.
      // For now we'll pass a dummy ID which will cause a userError from Shopify,
      // but won't crash the frontend.
      variantId = `gid://shopify/ProductVariant/unknown`;
    }

    return {
      merchandiseId: variantId,
      quantity: item.quantity
    };
  });

  try {
    const { status, body } = await shopifyFetch<any>({
      query: CART_CREATE_MUTATION,
      variables: {
        input: {
          lines
        }
      }
    });

    if (status !== 200 || !body?.data?.cartCreate) {
      throw new Error("Failed to communicate with Shopify Cart API");
    }

    const { cart, userErrors } = body.data.cartCreate;

    if (userErrors && userErrors.length > 0) {
      console.error("Shopify Cart User Errors:", userErrors);
      throw new Error(userErrors[0].message);
    }

    if (!cart?.checkoutUrl) {
      throw new Error("No checkout URL returned from Shopify");
    }

    return cart.checkoutUrl;

  } catch (error) {
    console.error("Error creating Shopify checkout:", error);
    throw error;
  }
};
