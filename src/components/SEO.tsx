import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

interface SEOProps {
  title: string;
  description: string;
  type?: string;
  image?: string;
  canonical?: string;
  noIndex?: boolean;
}

const SITE_URL = "https://mustafasmattress.in";

export const SEO = ({ 
  title, 
  description, 
  type = "website",
  image = "/og-image.jpg",
  canonical,
  noIndex = false,
}: SEOProps) => {
  const location = useLocation();
  const siteName = "Mustafa's Mattress";
  const fullTitle = `${title} | ${siteName}`;
  const canonicalUrl = canonical || `${SITE_URL}${location.pathname}`;
  const absoluteImage = image.startsWith("http") ? image : `${SITE_URL}${image}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:url" content={canonicalUrl} />
      {image && <meta property="og:image" content={absoluteImage} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={absoluteImage} />}
    </Helmet>
  );
};

