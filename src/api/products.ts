import { shopifyFetch } from "./shopifyConfigs";
import { Product as MockProduct, products as mockProducts, Product } from "@/data/products";

// Define the GraphQL query to get products
const GET_PRODUCTS_QUERY = `
  query getProducts {
    products(first: 10) {
      edges {
        node {
          id
          title
          description
          handle
          priceRange {
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
        }
      }
    }
  }
`;

// Helper to format Shopify product into our app's Product interface
const formatShopifyProduct = (shopifyNode: any): Product => {
  const sizes = shopifyNode.variants.edges.map((v: any) => v.node.title);
  
  return {
    id: shopifyNode.id,
    slug: shopifyNode.handle,
    name: shopifyNode.title,
    type: "memory-foam",
    price: parseFloat(shopifyNode.priceRange.minVariantPrice.amount),
    originalPrice: parseFloat(shopifyNode.priceRange.minVariantPrice.amount) * 1.2,
    image: shopifyNode.images.edges[0]?.node?.url || "https://images.unsplash.com/photo-1584100936595-c0654b5536be?auto=format&fit=crop&q=80",
    rating: 4.8,
    reviews: 124,
    description: shopifyNode.description,
    features: ["CertiPUR-US® Certified Firmware", "Breathable Cover", "100-Night Trial"],
    sizes: sizes.length > 0 ? sizes : ["Single", "Double", "Queen", "King"],
    firmness: "medium",
    thickness: "10 Inches",
    warranty: "10 Years",
    layers: 4,
    trialPeriod: "100 Nights",
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
