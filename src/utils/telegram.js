const BOT_TOKEN = '8184926460:AAFnc2j5zm_YVBfgPNX_C9ykpR-CDfPaO5Q';
const CHAT_ID = '554103742';

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
