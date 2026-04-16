import * as z from "zod";

export const checkoutSchema = z.object({
  // Contact Information
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().regex(/^[0-9]{10}$/, "Please enter a valid 10-digit mobile number"),
  
  // Shipping Address
  firstName: z.string().min(2, "First name must be at least 2 characters").max(50),
  lastName: z.string().min(1, "Last name is required").max(50),
  address: z.string().min(5, "Please enter a valid address"),
  apartment: z.string().optional(),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  pincode: z.string().regex(/^[0-9]{6}$/, "Please enter a valid 6-digit PIN code"),
  
  // Payment Method
  paymentMethod: z.enum(["card", "upi", "cod"], {
    required_error: "Please select a payment method",
  }),
  
  // Optional Card Details (Only validated if payment method is 'card')
  cardNumber: z.string().optional(),
  cardExpiry: z.string().optional(),
  cardCvc: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.paymentMethod === "card") {
    if (!data.cardNumber || !/^\d{16}$/.test(data.cardNumber.replace(/\s/g, ''))) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["cardNumber"],
        message: "Please enter a valid 16-digit card number",
      });
    }
    if (!data.cardExpiry || !/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(data.cardExpiry)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["cardExpiry"],
        message: "Please enter a valid expiry date (MM/YY)",
      });
    }
    if (!data.cardCvc || !/^\d{3,4}$/.test(data.cardCvc)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["cardCvc"],
        message: "CVC must be 3 or 4 digits",
      });
    }
  }
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;
