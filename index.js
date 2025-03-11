const TelegramBot = require('node-telegram-bot-api');
const { google } = require("googleapis");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

// Load environment variables
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const SPREADSHEET_ID = process.env.SPREADSHEET_ID;

const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: true });

// Google Sheets Authentication
const auth = new google.auth.GoogleAuth({
  credentials: JSON.parse(process.env.GOOGLE_CREDENTIALS),
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

// Step-tracking object to store user details temporarily
const userSteps = {};

// Start command
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "Assalomu aleykum! Iltimos, ismingizni kiriting:");
  userSteps[chatId] = { step: "name" }; // Start data collection
});

// Handle messages
bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  // Ignore messages that contain a contact
  if (msg.contact) return;  // ✅ Prevents duplicate execution

  // Check the user's current step
  if (!userSteps[chatId]) return;

  const userData = userSteps[chatId];

  if (userData.step === "name") {
    userData.name = text;
    userData.step = "surname";
    bot.sendMessage(chatId, "Ajoyib! Endi familiyangizni kiriting:");
  } else if (userData.step === "surname") {
    userData.surname = text;
    userData.step = "phone";
    bot.sendMessage(chatId, "Nihoyat, telefon raqamingizni (998907777777) formatida yuboring yo'ki Telegramdagi “Kontaktni yuborish” tugmasidan foydalaning).", {
      reply_markup: {
        keyboard: [[{ text: "📞 Raqamimni yuborish", request_contact: true }]],
        resize_keyboard: true,
        one_time_keyboard: true,
      },
    });
  } else if (userData.step === "phone") {
    if (isValidPhoneNumber(text)) {
        userData.phone = text;
        await processUserData(chatId);
    } else {
      bot.sendMessage(chatId, "❌ Iltimos, telefon raqamingizni to'g'ri formatda (998907777777) kiriting yoki pastdagi tugmadan foydalaning.");
    }
  }
});

// Handle phone number
bot.on("contact", async (msg) => {
  const chatId = msg.chat.id;

  if (!userSteps[chatId] || userSteps[chatId].step !== "phone") return;

  userSteps[chatId].phone = msg.contact.phone_number;
  const { name, surname, phone } = userSteps[chatId];

  // Save data to Google Sheets
  await addUserToSheet(name, surname, phone);
  const youtubeLink = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";

        bot.sendMessage(
            chatId,
            `Salom, ${name} ${surname}!.\nMana sizning YouTube havolangiz: ${youtubeLink}`
        );

  bot.sendMessage(chatId, "✅ Sizning ma'lumotlaringiz saqlandi! Rahmat.");
  delete userSteps[chatId]; // Clear user data after saving
});

// Function to Add Data to Google Sheets
async function addUserToSheet(name, surname, phone) {
  try {
    const client = await auth.getClient();
    const sheets = google.sheets({ version: "v4", auth: client });

    const values = [[name, surname, phone]];

    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID, 
      range: "Sheet1!A:C", // ✅ Use "Sheet1!A:C" to specify columns
      valueInputOption: "RAW",
      insertDataOption: "INSERT_ROWS",
      resource: { values },
    });

    console.log("✅ User data added to Google Sheets!");
  } catch (error) {
    console.error("❌ Error adding data to Google Sheets:", error);
  }
}

// Start the bot
console.log("🤖 Telegram bot is running...");


function isValidPhoneNumber(phone) {
  const phoneRegex = /^\+?\d{10,15}$/;
  return phoneRegex.test(phone);
}

async function processUserData(chatId) {
  const { name, surname, phone } = userSteps[chatId];

  await addUserToSheet(name, surname, phone);
  const youtubeLink = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";

  bot.sendMessage(
    chatId,
    `Salom, ${name} ${surname}!.\nMana sizning YouTube havolangiz: ${youtubeLink}`
  );

  bot.sendMessage(chatId, "✅ Sizning ma'lumotlaringiz saqlandi! Rahmat.");
  delete userSteps[chatId]; // Clear user data after saving
}
