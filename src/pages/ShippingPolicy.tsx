import { SEO } from "@/components/SEO";

const ShippingPolicy = () => {
  return (
    <>
      <SEO 
        title="Shipping Policy | Mustafa's Mattress" 
        description="Shipping policy for Mustafa's Mattress."
      />
      <div className="min-h-screen bg-background">
        <div className="bg-primary py-20">
          <div className="container text-center space-y-4">
            <h1 className="text-4xl font-bold text-primary-foreground">Shipping Policy</h1>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto text-lg">
              Everything you need to know about our delivery process.
            </p>
          </div>
        </div>

        <div className="container py-20 max-w-4xl">
          <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground space-y-6">
            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">Free Shipping</h2>
            <p>
              We offer free standard shipping on all mattress orders within India. No hidden fees, no surprises at checkout.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">Processing Time</h2>
            <p>
              All orders are processed within 1-2 business days. Orders are not shipped or delivered on weekends or holidays. If we are experiencing a high volume of orders, shipments may be delayed by a few days.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">Delivery Time</h2>
            <p>
              Standard delivery usually takes 3-7 business days depending on your location. Once your order has shipped, you will receive an email with tracking information.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">Damages</h2>
            <p>
              Mustafa's Mattress is not liable for any products damaged or lost during shipping. If you received your order damaged, please contact the shipment carrier to file a claim. Please save all packaging materials and damaged goods before filing a claim.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShippingPolicy;
