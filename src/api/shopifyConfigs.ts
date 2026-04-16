export const SHOPIFY_DOMAIN = import.meta.env.VITE_SHOPIFY_DOMAIN;
export const SHOPIFY_STOREFRONT_TOKEN = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN;

/**
 * Standard utility to query Shopify's Storefront GraphQL API 
 */
export async function shopifyFetch<T>({
  query,
  variables,
}: {
  query: string;
  variables?: object;
}): Promise<{ status: number; body?: T; error?: string }> {
  try {
    const endpoint = `https://${SHOPIFY_DOMAIN}/api/2025-04/graphql.json`;

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    const body = await response.json();

    return {
      status: response.status,
      body,
    };
  } catch (error) {
    console.error("Error connecting to Shopify API", error);
    return {
      status: 500,
      error: "Error connecting to Shopify API",
    };
  }
}
