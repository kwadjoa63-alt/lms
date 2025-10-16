# Stripe Payment Setup Guide

This guide helps you set up Stripe payments for course enrollment.

## 🔑 Environment Variables

Add these to your `.env` file:

```env
# Stripe Keys (Get from https://dashboard.stripe.com/apikeys)
STRIPE_API_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

# Stripe Webhook Secret (Get from Stripe CLI or webhook dashboard)
STRIPE_WEBHOOK_SECRET=whsec_...

# Your app URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 🚀 Development Setup

### Option 1: Simplified Flow (Recommended for Development)

The app now includes a success callback handler that creates purchases automatically when payment succeeds. No webhook setup needed!

**How it works:**
1. User completes payment in Stripe
2. Stripe redirects to `/api/courses/[courseId]/success?session_id=...`
3. App verifies payment with Stripe
4. Purchase is created in database
5. User is redirected to course

**Requirements:**
- Only need `STRIPE_API_KEY` and `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- Works immediately in development

---

### Option 2: Full Webhook Setup (Recommended for Production)

For production, use webhooks to handle payments reliably:

#### Step 1: Install Stripe CLI

**Windows:**
```bash
scoop install stripe
```

**Mac:**
```bash
brew install stripe/stripe-cli/stripe
```

**Linux:**
```bash
wget https://github.com/stripe/stripe-cli/releases/download/v1.19.4/stripe_1.19.4_linux_x86_64.tar.gz
tar -xvf stripe_1.19.4_linux_x86_64.tar.gz
sudo mv stripe /usr/local/bin
```

#### Step 2: Login to Stripe

```bash
stripe login
```

#### Step 3: Forward Webhooks

```bash
stripe listen --forward-to localhost:3000/api/webhook
```

This will output your webhook secret like:
```
> Ready! Your webhook signing secret is whsec_xxxxxxxxxxxxx
```

#### Step 4: Update Environment Variables

Copy the webhook secret and add to `.env`:
```env
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx
```

#### Step 5: Test a Payment

In another terminal:
```bash
stripe trigger checkout.session.completed
```

---

## 💳 Testing Cards

Use Stripe test cards to simulate payments:

| Card Number | Description |
|------------|-------------|
| 4242 4242 4242 4242 | Success |
| 4000 0000 0000 9995 | Declined |
| 4000 0025 0000 3155 | Requires authentication |

**Details for any test card:**
- Expiry: Any future date (e.g., 12/34)
- CVC: Any 3 digits (e.g., 123)
- ZIP: Any 5 digits (e.g., 12345)

---

## 📝 Setting Up Courses for Sale

1. **Create a course** (as teacher/admin)
2. **Set a price** on the course edit page
3. **Publish the course**
4. **Add chapters** and publish them
5. Students can now enroll by paying

---

## 🔍 Troubleshooting

### Problem: "Course not enrolled after payment"

**Solution 1:** Using success callback (already implemented)
- The app now automatically creates purchases on success
- No webhook needed in development

**Solution 2:** Check webhook status
```bash
# See if webhooks are being received
stripe listen --forward-to localhost:3000/api/webhook

# In another terminal, trigger test event
stripe trigger checkout.session.completed
```

### Problem: "Webhook signature verification failed"

**Causes:**
- `STRIPE_WEBHOOK_SECRET` not set or incorrect
- Webhook secret changed (restart Stripe CLI)
- Using production secret in development

**Fix:**
```bash
# Get new webhook secret
stripe listen --forward-to localhost:3000/api/webhook

# Copy the whsec_... and update .env
```

### Problem: "Payment succeeded but no purchase record"

**Check database:**
```bash
npx prisma studio

# Look in the Purchase table
# Should have userId and courseId
```

**Check logs:**
```bash
# Look for webhook events in terminal
# Should see POST /api/webhook with status 200
```

### Problem: "Course price not showing"

**Requirements:**
- Course must have a price set
- Course must be published
- At least one chapter must be published

---

## 🌐 Production Setup

### 1. Add Webhook Endpoint in Stripe Dashboard

1. Go to https://dashboard.stripe.com/webhooks
2. Click "+ Add endpoint"
3. Enter URL: `https://yourdomain.com/api/webhook`
4. Select events: `checkout.session.completed`
5. Copy the signing secret
6. Add to production environment variables

### 2. Update Environment Variables

```env
STRIPE_API_KEY=sk_live_...  # Use live key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...  # From webhook dashboard
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

### 3. Test in Production

1. Create test course with small price
2. Complete payment with real card
3. Verify purchase appears in database
4. Verify course becomes accessible

---

## 📊 Monitoring Payments

### Check Recent Payments

Stripe Dashboard: https://dashboard.stripe.com/payments

### Check Webhook Logs

Stripe Dashboard: https://dashboard.stripe.com/webhooks

### Check App Logs

Database logs are stored in the `Logging` table:
```bash
npx prisma studio
# Open Logging table to see webhook events
```

---

## 💰 Currency Conversion

The app uses Ghanaian Cedis (₵) but converts to USD for Stripe:

**In code:** `lib/format.ts`
```typescript
export const convertGhsToUsd = (ghs: number): number => {
  const exchangeRate = 0.082; // 1 GHS ≈ $0.082 USD
  return ghs * exchangeRate;
}
```

**To update exchange rate:**
Edit `lib/format.ts` and change the `exchangeRate` value.

---

## 🔒 Security Best Practices

1. **Never commit API keys** to git
2. **Use test keys** in development
3. **Use live keys** only in production
4. **Verify webhook signatures** (already implemented)
5. **Log all webhook events** (already implemented)
6. **Handle errors gracefully** (already implemented)

---

## ✅ Quick Checklist

Development:
- [ ] Add `STRIPE_API_KEY` to `.env`
- [ ] Add `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` to `.env`
- [ ] Payments work via success callback (no webhook needed)

Production:
- [ ] Setup webhook in Stripe dashboard
- [ ] Add `STRIPE_WEBHOOK_SECRET` to environment
- [ ] Update `NEXT_PUBLIC_APP_URL`
- [ ] Test with real payment
- [ ] Monitor webhook logs

---

**Need Help?** Check Stripe docs: https://stripe.com/docs

