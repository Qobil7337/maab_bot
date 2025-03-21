Setting Up Google Sheets API in Google Cloud Console

Since you're using Google Sheets to store Telegram bot user data, you need to enable the Google Sheets API and authenticate using a service account. Here’s a step-by-step guide to set it up in Google Cloud Console.

Step 1: Create a Google Cloud Project

Go to Google Cloud Console: Google Cloud Console

Click on the project dropdown (top left) and select "New Project".

Give your project a name (e.g., TelegramBotGoogleSheet).

Click Create and wait for the project to be set up.

Step 2: Enable Google Sheets API

In the Google Cloud Console, ensure your project is selected.

Click Navigation Menu (☰) → APIs & Services → Library.

In the search bar, type Google Sheets API.

Click on Google Sheets API → Click Enable.

Step 3: Enable Google Drive API

(This allows the Sheets API to function properly for writing data.)

Go to Navigation Menu (☰) → APIs & Services → Library.

Search for Google Drive API.

Click on Google Drive API → Click Enable.

Step 4: Create a Service Account

A service account allows your bot to access Google Sheets securely.

In Google Cloud Console, go to Navigation Menu (☰) → IAM & Admin → Service Accounts.

Click + CREATE SERVICE ACCOUNT.

Enter a Service Account Name (e.g., TelegramSheetsBot).

Click Create & Continue.

Step 5: Assign Permissions

Under Grant this service account access to the project, select:

Role: Click Editor (this allows writing to Sheets).

Click Continue → Done.

Step 6: Generate a Private Key (JSON)

In the Service Accounts list, find your newly created service account.

Click on it, then go to the Keys tab.

Click Add Key → Create New Key.

Select JSON and click Create.

The JSON file will be downloaded to your computer. (Keep this file safe! It contains your API credentials.)

Step 7: Share Google Sheet with the Service Account

Open your Google Sheet where you want to store user data.

Click the Share button (top-right).

Copy the email from the JSON file (it looks like your-bot@your-project.iam.gserviceaccount.com).

Paste the email in the "Share" field and give it Editor access.

Click Done.

Final Step: Use the JSON File in Your Bot

Move the downloaded JSON file to your bot’s project folder.

Reference it in your Node.js (or Python, etc.) code.

Use the Google Sheets API to write data.

Now, your bot can store user data in Google Sheets! 🚀 Let me know if you need help!
