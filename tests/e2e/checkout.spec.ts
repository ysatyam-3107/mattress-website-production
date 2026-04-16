import { test, expect } from '@playwright/test';

test.describe('Checkout Flow', () => {
  test('User can browse, add product to cart, and reach checkout', async ({ page }) => {
    // 1. Visit Homepage
    await page.goto('http://localhost:8080');
    await expect(page).toHaveTitle(/Mustafa's Mattress/);

    // 2. Navigate to Products
    await page.click('text=Mattresses');
    await expect(page).toHaveURL(/.*products/);

    // 3. Wait for Products to load
    // Since we mock data fallback, this should quickly appear
    await page.waitForSelector('text=CloudRest');

    // 4. Click a product to open detail page
    const firstProduct = page.locator('text=CloudRest').first();
    await firstProduct.click();
    await expect(page).toHaveURL(/.*product\/1/);

    // 5. Select Size and Add to Cart
    await page.getByRole('button', { name: 'Double' }).click();
    await page.getByRole('button', { name: /Add to Cart/i }).click();

    // 6. Verify Cart Drawer opened
    const cartDrawer = page.locator('h3:has-text("Your Cart")');
    await expect(cartDrawer).toBeVisible();

    // 7. Proceed to Checkout
    await page.click('text=Proceed to Checkout');
    await expect(page).toHaveURL(/.*checkout/);

    // 8. Test Form Validation (Phase 2 resilience)
    await page.locator('text=Proceed to Payment').click();
    
    // Assert Validation Errors appeared for empty fields
    await expect(page.locator('text=Please enter a valid email address')).toBeVisible();
    await expect(page.locator('text=First name must be at least 2 characters')).toBeVisible();
    await expect(page.locator('text=Please enter a valid 10-digit mobile number')).toBeVisible();

    // 9. Fill Form Valid Data
    await page.fill('input[name="firstName"]', 'Jane');
    await page.fill('input[name="lastName"]', 'Doe');
    await page.fill('input[name="email"]', 'jane@example.com');
    await page.fill('input[name="phone"]', '9876543210');
    await page.fill('input[name="address"]', '123 Test Street');
    await page.fill('input[name="city"]', 'Mumbai');
    await page.fill('input[name="state"]', 'Maharashtra');
    await page.fill('input[name="pincode"]', '400001');

    // Proceed to Step 2
    await page.locator('text=Proceed to Payment').click();
    
    // Check Step 2 is active
    await expect(page.locator('h2:has-text("Secure Payment")')).toBeVisible();

    // Select COD option
    await page.locator('text=Cash on Delivery').click();

    // Submit Order
    await page.locator('text=Pay ₹').click();

    // Assert Success Page
    await expect(page.locator('text=Order Confirmed!')).toBeVisible();
  });
});
