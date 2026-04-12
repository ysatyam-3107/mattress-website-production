import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  type?: string;
  image?: string;
}

export const SEO = ({ 
  title, 
  description, 
  type = "website",
  image = "/og-image.jpg"
}: SEOProps) => {
  const siteName = "Mustafa's Mattress";
  const fullTitle = `${title} | ${siteName}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      
      {/* Open Graph / Standard tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={siteName} />
      {image && <meta property="og:image" content={image} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}
    </Helmet>
  );
};
