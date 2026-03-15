const BOT_TOKEN = '7665793444:AAEhVp6q1rYh659msh7D5428L2r7Dozq-3M'; // Token provided implicitly or as placeholder
const CHAT_ID = '5219597711'; // Chat ID provided implicitly or as placeholder

export const sendToTelegram = async (message) => {
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: 'HTML',
      }),
    });
    
    return response.ok;
  } catch (error) {
    console.error('Telegram Error:', error);
    return false;
  }
};
