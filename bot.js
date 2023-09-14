const { mapSeries } = require('async');
const TelegramBot = require('node-telegram-bot-api');
const saveUser = require('./database/telegramDb');
const userInfo = require('./database/telegramDb');
const token = '6507809020:AAGKxThnPxDXQUR6DRzciaiHWFiq2L_l4nQ';
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  let startmenu = {
    reply_to_message_id: msg.message_id,
    reply_markup: JSON.stringify({
      keyboard: [
        ['درباره ما'],
        ['ثبت نام دوره های آموزشی'],
        ['ارتباط با ما']
      ],
    }),
  };
  bot.sendMessage(msg.chat.id, "سلام به ربات فرادید خوش آمدید", startmenu);
  bot.sendPhoto(msg.chat.id, 'AgACAgQAAxkBAAIBCmUAAQ50sZ1fSRmM6MJlVNQy5qD3uQACYcAxG54tAAFQW4iTpfYLQh0BAAMCAAN5AAMwBA');
});

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  let corses = {
    reply_to_message_id: msg.message_id,
    reply_markup: JSON.stringify({
      keyboard: [
        ['/angular_boot_camp']
      ],
      resize_keyboard: true,
    }),
  };

  if (msg.text == 'ثبت نام دوره های آموزشی') {
    bot.sendMessage(chatId, "لطفا دوره مورد نظر را انتخاب کنید", corses);

}});



bot.onText(/\/angular_boot_camp/, async msg => {
  const namePrompt = await bot.sendMessage(msg.chat.id, "اسم خود را وارد کنید", {
      reply_markup: {
          force_reply: true,
      },
  });
  bot.onReplyToMessage(msg.chat.id, namePrompt.message_id, async (nameMsg) => {
      const name = nameMsg.text;

      console.log(name);
      // save name in DB if you want to ...
      let x=await bot.sendMessage(msg.chat.id, `${name} جان شماره خود را وارد کنید`,{
        reply_markup: {
          force_reply: true,
      },
    })

bot.onReplyToMessage(msg.chat.id,x.message_id,async(phoneMsg)=>{
  const phoneNumber=phoneMsg.text
  console.log(phoneNumber);
  bot.sendMessage(msg.chat.id,'ممنون در اسراع وقت با شما تماس خواهیم گرفت❤️')
  const saveUser = new userInfo({
    studentName:name,
    studentPhone:phoneNumber,
    userId: msg.chat.username
  })
  saveUser.save()

})

});
});


bot.on('message', (msg) => {
  if (msg.text == 'درباره ما') {
    bot.sendPhoto(msg.chat.id, 'AgACAgQAAxkBAAIBj2UAAReYMuaA-LTMH0KB-A4WXj5z3wACdsAxG54tAAFQssVBJUshrtYBAAMCAAN5AAMwBA');
  } else if (msg.text == 'ارتباط با ما') {
    bot.sendPhoto(msg.chat.id, 'AgACAgQAAxkBAAIBlGUAARgP-xwJzSL70SLOPB8QG3lkSwACd8AxG54tAAFQZXIlrM9ePekBAAMCAAN5AAMwBA');

}});
