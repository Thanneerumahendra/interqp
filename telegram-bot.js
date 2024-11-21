const { Telegraf } = require('telegraf');
const fs = require('fs');
const path = require('path');

const bot = new Telegraf('7359796965:AAFXKwIV9FRxB1nBpTjjb8JabagPYYWCpg4');

const BASE_DIRECTORY = '2nd_qp_ts';

// Function to construct the file path based on user input
function getFilePath(keyword) {
    const parts = keyword.split('_'); // Split the keyword into parts
    if (parts.length === 4) {
        const [prefix, year, subject, type] = parts;
        if (prefix === 'ts' && type === 'year') {
            const folderPath = path.join(BASE_DIRECTORY, `2_${subject}`, year);
            const filePath = path.join(folderPath, 'question_paper.pdf'); // Assume the file is named question_paper.pdf
            if (fs.existsSync(filePath)) {
                return filePath;
            }
        }
    }
    return null;
}

// Define responses for specific keywords
const textResponses = {
  'ts_2_chemistry_2020': 'Here is the 2020 Chemistry question paper for Inter 2nd Year.',
  'ts_2_english_2021': 'Here is the 2021 English question paper for Inter 2nd Year.',
  'ts_2_physics_2022': 'Here is the 2022 Physics question paper for Inter 2nd Year.',
  'ts_2_telugu_2023': 'Here is the 2023 Telugu question paper for Inter 2nd Year.',
  'ts_2a_math_2024': 'Here is the 2024 2A Math question paper for Inter 2nd Year.',
  'ts_2b_math_2024': 'Here is the 2024 2B Math question paper for Inter 2nd Year.',
  'hi':'hello em chestunnav',
  'hello':'hello em chestunnav',
  'hi em chestunnav':'kali u',
  'nen kuda':'thinnava enthaki',
  'ha':'enkem sangathulu',
  'pooka':'boothulu matladoddu',
  'pooka pooka':'boothulu matladoddu',
  
  // Add more custom text responses as needed
};

bot.start((ctx) => {
    ctx.reply('Send me a keyword like ts_2_chemistry_2020 to get the corresponding PDF and message.');
});

bot.on('text', async (ctx) => {
    const keyword = ctx.message.text.toLowerCase().trim();
    console.log(`Message received: ${keyword}`);

    const filePath = getFilePath(keyword);

    if (filePath) {
        try {
            // Send the text response first
            if (textResponses[keyword]) {
                ctx.reply(textResponses[keyword]);
            }

            // Send the PDF
            await ctx.replyWithDocument({ source: filePath });
        } catch (error) {
            console.error('Failed to send document:', error);
            ctx.reply('Sorry, I encountered an error while trying to send the document.');
        }
    } else {
        ctx.reply('No records found for the given keyword.');
    }
});

// Launch the bot
bot.launch();
