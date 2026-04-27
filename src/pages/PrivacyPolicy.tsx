import { SEO } from "@/components/SEO";

const PrivacyPolicy = () => {
  return (
    <>
      <SEO 
        title="Privacy Policy | Mustafa's Mattress" 
        description="Privacy policy for Mustafa's Mattress."
      />
      <div className="min-h-screen bg-background">
        <div className="bg-primary py-20">
          <div className="container text-center space-y-4">
            <h1 className="text-4xl font-bold text-primary-foreground">Privacy Policy</h1>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto text-lg">
              Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </div>
        </div>

        <div className="container py-20 max-w-4xl">
          <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground space-y-6">
            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">1. Information We Collect</h2>
            <p>
              At Mustafa's Mattress, we collect information that you provide directly to us, such as when you create an account, make a purchase, or contact customer support. This may include your name, email address, phone number, shipping address, and payment information.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">2. How We Use Your Information</h2>
            <p>
              We use the information we collect to process your orders, communicate with you about products and promotions, improve our website, and provide customer support.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">3. Information Sharing</h2>
            <p>
              We do not sell your personal information to third parties. We may share your information with trusted service providers who assist us in operating our website, conducting our business, or serving our users, so long as those parties agree to keep this information confidential.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">4. Your Rights</h2>
            <p>
              You have the right to access, update, or delete your personal information. You may also opt-out of marketing communications at any time.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">5. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at hello@mustafasmattress.in.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
