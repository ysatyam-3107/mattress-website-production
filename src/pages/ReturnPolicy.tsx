import { SEO } from "@/components/SEO";

const ReturnPolicy = () => {
  return (
    <>
      <SEO 
        title="Return & Refund Policy | Mustafa's Mattress" 
        description="Return and refund policy for Mustafa's Mattress."
      />
      <div className="min-h-screen bg-background">
        <div className="bg-primary py-20">
          <div className="container text-center space-y-4">
            <h1 className="text-4xl font-bold text-primary-foreground">Return & Refund Policy</h1>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto text-lg">
              Our 100-Night Trial and Return process explained.
            </p>
          </div>
        </div>

        <div className="container py-20 max-w-4xl">
          <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground space-y-6">
            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">100-Night Sleep Trial</h2>
            <p>
              We want you to be completely satisfied with your purchase. That's why we offer a 100-night sleep trial on all our mattresses. We ask that you sleep on the mattress for at least 30 nights to allow your body to adjust to the new support system.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">How to Initiate a Return</h2>
            <p>
              If after 30 nights you are not satisfied, you can initiate a return up to the 100th night from the date of delivery. Please contact our customer support team at hello@mustafasmattress.in with your order number to begin the process.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">Return Condition</h2>
            <p>
              To be eligible for a return, the mattress must be in good condition, free of stains, tears, or other damage. We reserve the right to refuse a return if the mattress is deemed unsanitary or damaged beyond normal wear and tear.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">Refunds</h2>
            <p>
              Once your return is received and inspected, we will initiate a refund to your original method of payment. You will receive the credit within a certain amount of days, depending on your card issuer's policies.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReturnPolicy;
