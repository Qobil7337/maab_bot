# 📄 Setting Up Google Sheets API for Telegram Bot

This guide helps you connect your Telegram bot to Google Sheets to store user data using a service account in Google Cloud Console.

---

## ✅ Step 1: Create a Google Cloud Project

1. Go to the [Google Cloud Console](https://console.cloud.google.com).
2. Click the project dropdown (top left) → **New Project**.
3. Enter a project name (e.g., `TelegramBotGoogleSheet`).
4. Click **Create** and wait for it to set up.

---

## ✅ Step 2: Enable Google Sheets API

1. In Google Cloud Console, make sure your project is selected.
2. Navigate to **☰ Menu → APIs & Services → Library**.
3. Search for **Google Sheets API**.
4. Click it → **Enable**.

---

## ✅ Step 3: Enable Google Drive API

> This allows writing data to the sheet.

1. Go to **☰ Menu → APIs & Services → Library**.
2. Search for **Google Drive API**.
3. Click it → **Enable**.

---

## ✅ Step 4: Create a Service Account

1. In the Cloud Console, go to **☰ Menu → IAM & Admin → Service Accounts**.
2. Click **+ CREATE SERVICE ACCOUNT**.
3. Enter a name (e.g., `TelegramSheetsBot`).
4. Click **Create & Continue**.

---

## ✅ Step 5: Assign Permissions

1. Under **Grant this service account access to the project**, choose:
    - **Role**: `Editor`
2. Click **Continue** → **Done**.

---

## ✅ Step 6: Generate a Private Key (JSON)

1. In the **Service Accounts** list, click your new service account.
2. Go to the **Keys** tab.
3. Click **Add Key → Create New Key**.
4. Choose **JSON** and click **Create**.
5. A `.json` file will download — keep it secure!

---

## ✅ Step 7: Share the Google Sheet with the Service Account

1. Open the Google Sheet where you want to store user data.
2. Click **Share** (top right).
3. From your downloaded `.json`, copy the service account email (e.g., `your-bot@your-project.iam.gserviceaccount.com`).
4. Paste the email into the **Share** dialog.
5. Set the access to **Editor** → Click **Done**.

---

## ✅ Final Step: Use the JSON File in Your Bot

1. Move the downloaded `.json` key file into your bot's project folder.
2. In your code (Node.js, Python, etc.), authenticate using this file.
3. Use the [Google Sheets API documentation](https://developers.google.com/sheets/api) to write user data.

---

## 🎉 All Done!

Now your Telegram bot can securely write user data to Google Sheets using Google Cloud APIs.  
Let me know if you need help with the code! 🚀
