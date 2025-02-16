import 'dotenv/config';
import TelegramBot from 'node-telegram-bot-api';
import { createClient } from '@supabase/supabase-js';
const supabaseKey = process.env.VITE_SUPABASE_KEY;
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabase = createClient(supabaseUrl, supabaseKey);


const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, {polling: true});

const userState = {};

bot.onText(/\/start/, (msg) => {
    // 'msg' is the received Message from Telegram
    // 'match' is the result of executing the regexp above on the text content
    // of the message

    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Welcome to your task manager!!!!');
});

bot.onText(/\/createAccount/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Please enter your email address');
    console.log("Supabase URL:", process.env.VITE_SUPABASE_URL);
    console.log("Supabase Key:", process.env.VITE_SUPABASE_KEY);

    // tell system we're waiting for user to reply w email
    userState[chatId] = { step: 'waiting for email'};
});

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;

    if (!userState[chatId]) {
        console.log("User state is undefined. Ignoring message.");
        return;  // Ignore messages from users who haven't started `/createAccount`
    }

    // check if we're waiting for email
    if (userState[chatId].step === 'waiting for email') {
        const email = msg.text;
        const { data, error } = await supabase
        .from('users')
        .select('email')
        .eq('email', email);

        if (data.length > 0) {
            console.error("❌ This email is already registered.");
            delete userState[chatId]; // restart the state back to normal/nothing
        } else {
            // new account, ask for password
            userState[chatId] = { step: 'waiting for password', email: email };
            bot.sendMessage(chatId, '🔑 Please enter your password');
            }
        } 
    
    
        // check if we're waiting for password
    else if (userState[chatId].step === 'waiting for password') {
        const password = msg.text;
        const email = userState[chatId].email;

        const { data, error } = await supabase
        .from('users')
        .insert([{ email, password }]);

        if (error) {
            bot.sendMessage(chatId, '⚠️ Error creating account');
        } else {
            bot.sendMessage(chatId, "✅ Account created successfully!");
        }

        delete userState[chatId]; // restart the state back to normal/nothing
    }
});


bot.on("polling_error", (error) => console.log(error));