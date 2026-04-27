import { SEO } from "@/components/SEO";

const TermsOfService = () => {
  return (
    <>
      <SEO 
        title="Terms of Service | Mustafa's Mattress" 
        description="Terms of service for Mustafa's Mattress."
      />
      <div className="min-h-screen bg-background">
        <div className="bg-primary py-20">
          <div className="container text-center space-y-4">
            <h1 className="text-4xl font-bold text-primary-foreground">Terms of Service</h1>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto text-lg">
              Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </div>
        </div>

        <div className="container py-20 max-w-4xl">
          <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground space-y-6">
            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing and using the Mustafa's Mattress website, you accept and agree to be bound by the terms and provision of this agreement.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">2. Products and Pricing</h2>
            <p>
              All products and prices are subject to change. We reserve the right to modify or discontinue any product without notice. We are not liable to you or any third party for any modification, price change, suspension, or discontinuance of the service.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">3. Accuracy of Information</h2>
            <p>
              We attempt to be as accurate as possible. However, we do not warrant that product descriptions or other content is accurate, complete, reliable, current, or error-free.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">4. Intellectual Property</h2>
            <p>
              All content on this site, including text, graphics, logos, images, and software, is the property of Mustafa's Mattress or its content suppliers and protected by copyright laws.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default TermsOfService;
