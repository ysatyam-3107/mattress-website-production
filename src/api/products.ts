import { shopifyFetch } from "./shopifyConfigs";
import { Product as MockProduct, products as mockProducts, Product } from "@/data/products";

// Define the GraphQL query to get products
const GET_PRODUCTS_QUERY = `
  query getProducts {
    products(first: 20) {
      edges {
        node {
          id
          title
          description
          handle
          productType
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          compareAtPriceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 1) {
            edges {
              node {
                url
                altText
              }
            }
          }
          variants(first: 10) {
            edges {
              node {
                id
                title
              }
            }
          }
          # Fetching Custom Metafields
          firmness: metafield(namespace: "custom", key: "firmness") { value }
          thickness: metafield(namespace: "custom", key: "thickness") { value }
          layers: metafield(namespace: "custom", key: "layers") { value }
          warranty: metafield(namespace: "custom", key: "warranty") { value }
          trial: metafield(namespace: "custom", key: "trial_period") { value }
        }
      }
    }
  }
`;

// Helper to format Shopify product into our app's Product interface
const formatShopifyProduct = (shopifyNode: any): Product => {
  const sizes = shopifyNode.variants?.edges?.map((v: any) => v.node.title) || [];
  
  const currentPrice = parseFloat(shopifyNode.priceRange?.minVariantPrice?.amount || "0");
  const compareAtPrice = shopifyNode.compareAtPriceRange?.minVariantPrice?.amount 
    ? parseFloat(shopifyNode.compareAtPriceRange.minVariantPrice.amount)
    : currentPrice * 1.2; // Fallback to 20% markup if not set in Shopify

  
  return {
    id: shopifyNode.id,
    slug: shopifyNode.handle,
    name: shopifyNode.title,
    type: shopifyNode.productType?.toLowerCase() || "memory-foam",
    price: currentPrice,
    originalPrice: compareAtPrice,
    image: shopifyNode.images?.edges[0]?.node?.url || "https://images.unsplash.com/photo-1584100936595-c0654b5536be?auto=format&fit=crop&q=80",
    rating: 4.8, // Ratings usually come from a separate review app in Shopify
    reviews: 124,
    description: shopifyNode.description,
    features: ["CertiPUR-US® Certified Foam", "Breathable Cover", "100-Night Trial"], // Could also be mapped to a list metafield
    sizes: sizes.length > 0 ? sizes : ["Single", "Double", "Queen", "King"],
    firmness: shopifyNode.firmness?.value || "medium",
    thickness: shopifyNode.thickness?.value || "10 Inches",
    warranty: shopifyNode.warranty?.value || "10 Years",
    layers: shopifyNode.layers?.value ? parseInt(shopifyNode.layers.value) : 4,
    trialPeriod: shopifyNode.trial?.value || "100 Nights",
    variants: shopifyNode.variants?.edges?.map((v: any) => ({
      id: v.node.id,
      title: v.node.title,
    })) || [],
  };
};

export const fetchShopifyProducts = async (): Promise<Product[]> => {
  try {
    const { status, body } = await shopifyFetch<any>({
      query: GET_PRODUCTS_QUERY,
    });

    if (status !== 200 || !body?.data?.products?.edges) {
      console.warn("Returning mock products. Shopify query failed or token missing.");
      return mockProducts;
    }

    const shopifyData = body.data.products.edges;
    
    // If store is completely new and has 0 products, use our mocks to prevent blank screen
    if (shopifyData.length === 0) {
      console.info("Shopify store is empty! Displaying mock products for now.");
      return mockProducts;
    }

    return shopifyData.map((edge: any) => formatShopifyProduct(edge.node));
  } catch (error) {
    console.error("Fetch Shopify Error:", error);
    return mockProducts; // Fallback
  }
};
