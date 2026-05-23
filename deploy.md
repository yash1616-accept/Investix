# 🚀 Deploying Investix to Vercel

This guide provides step-by-step instructions for deploying the **Investix** application (Frontend, Dashboard, and Backend) to **Vercel**.

---

## 📁 Project Structure Recap

Investix is organized as a monorepo with three independent subfolders:
*   `frontend/` - React application (Landing Page)
*   `dashboard/` - React application (Trading & Portfolio Management)
*   `backend/` - Node.js/Express API server & MongoDB connection

---

## 1️⃣ Preparing the Backend for Vercel

Since Vercel runs Node.js applications as **Serverless Functions**, we need to configure a serverless entry point and routes.

### Step A: Create `vercel.json` inside the `backend` folder
Create a file named `vercel.json` at [backend/vercel.json](file:///d:/Investex/Investix/backend/vercel.json) with the following content:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "index.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "index.js"
    }
  ]
}
```

### Step B: Modify `backend/index.js` to Export the App
For Vercel to load the Express app as a serverless handler, we must export `app` and ensure `app.listen()` only runs when working locally.

Update the database connection and listener block at the end of [backend/index.js](file:///d:/Investex/Investix/backend/index.js#L465-L480):

```javascript
// Connect to MongoDB
mongoose
  .connect(uri)
  .then(() => console.log("DB connected!"))
  .catch((err) => console.error("MongoDB connection failed:", err));

// Only start the HTTP server locally (not in serverless environments)
if (process.env.NODE_ENV !== "production" || !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`App started on port ${PORT}`);
  });
}

// Export Express app for Vercel Serverless Functions
module.exports = app;
```

---

## 2️⃣ Deploying the Projects to Vercel

We recommend deploying **three separate projects** on Vercel (one for the landing page, one for the dashboard, and one for the backend API).

### 🛠 Method A: Using Vercel Web Dashboard (Recommended)

1. Go to the [Vercel Dashboard](https://vercel.com/) and click **Add New** -> **Project**.
2. Import your GitHub repository.
3. Deploy each folder as a separate project with the configurations below:

#### 1. Deploy the Backend API (`backend/`)
*   **Project Name:** `investix-backend`
*   **Framework Preset:** `Other` (or auto-detected Node.js)
*   **Root Directory:** `backend`
*   **Environment Variables:** Add the following:
    *   `MONGO_URI` = `your_mongodb_connection_string`
    *   `CASHFREE_APP_ID` = `your_cashfree_app_id`
    *   `CASHFREE_SECRET_KEY` = `your_cashfree_secret_key`
    *   `CASHFREE_ENV` = `TEST` (or `PROD` for live production)
*   Click **Deploy**.

#### 2. Deploy the Landing Page (`frontend/`)
*   **Project Name:** `investix-frontend`
*   **Framework Preset:** `Create React App`
*   **Root Directory:** `frontend`
*   *Note: If you have hardcoded API URLs in your frontend pointing to `localhost:3002`, update them to point to your backend Vercel URL (e.g. `https://investix-backend.vercel.app`).*
*   Click **Deploy**.

#### 3. Deploy the Dashboard (`dashboard/`)
*   **Project Name:** `investix-dashboard`
*   **Framework Preset:** `Create React App`
*   **Root Directory:** `dashboard`
*   *Note: Ensure all API and redirect URLs in the dashboard code (e.g., in `Funds.js` and `WatchList.js`) are updated from `localhost:3002` to your production backend Vercel URL.*
*   Click **Deploy**.

---

### 💻 Method B: Using the Vercel CLI

If you prefer deploying via terminal, install the Vercel CLI and deploy from the root of your project:

```bash
# Install Vercel CLI globally
npm install -g vercel

# 1. Deploy the backend
cd backend
vercel --prod

# 2. Deploy the dashboard
cd ../dashboard
vercel --prod

# 3. Deploy the frontend
cd ../frontend
vercel --prod
```

Follow the CLI prompts to link and deploy each project.

---

## 3️⃣ Post-Deployment Checks
*   **Update Redirect Links:** In `frontend` and `dashboard`, verify that links between the landing page and the trading dashboard are updated to their live Vercel domains (e.g., redirecting from the signup page to `https://investix-dashboard.vercel.app`).
*   **IP Whitelisting:** Since Vercel uses dynamic IP addresses for its serverless functions, you must whitelist all requests (IP: `0.0.0.0/0`) in your **MongoDB Atlas** Network Access settings to ensure the backend can connect to the database.
*   **Cashfree Webhooks:** If you are using Cashfree webhooks, update the webhook URL in the Cashfree dashboard to point to your live backend endpoint.
