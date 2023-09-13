const { MongoGridFSChunkError } = require('mongodb');
const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const token = '6507809020:AAGKxThnPxDXQUR6DRzciaiHWFiq2L_l4nQ';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});
bot.onText(/\/start/, (msg) => {
    let startmenu ={
        reply_to_message_id: msg.message_id,
        reply_markup: JSON.stringify({
          keyboard: [
            ['درباره ما'],
            ['ثبت نام دوره های آموزشی'],
            ['ارطبات با ما']
          ]
        })
      };
    bot.sendMessage(msg.chat.id, "Welcome",startmenu)
    bot.sendPhoto(msg.chat.id,'AgACAgQAAxkBAAIBCmUAAQ50sZ1fSRmM6MJlVNQy5qD3uQACYcAxG54tAAFQW4iTpfYLQh0BAAMCAAN5AAMwBA')

    });



//corsees
    bot.on('message', (msg) => {
        const chatId = msg.chat.id;
        let name;
  
        let corses = {
            reply_to_message_id : msg.message_id,
            reply_markup: JSON.stringify({
keyboard:[
["Angular بوت کمپ تخصصی صفر تا صد"],
]


            })
        }
    
      if(msg.text=='ثبت نام دوره های آموزشی'){
bot.sendMessage(chatId,"لطفا دوره مورد نظر را انتخاب کنید",corses)
}  

})


//about us and contects
bot.on('message',(msg)=>{
if(msg.text=='درباره ما'){
    bot.sendPhoto(msg.chat.id,'AgACAgQAAxkBAAIBj2UAAReYMuaA-LTMH0KB-A4WXj5z3wACdsAxG54tAAFQssVBJUshrtYBAAMCAAN5AAMwBA')
}else if(msg.text=='ارطبات با ما'){bot.sendPhoto(msg.chat.id,'AgACAgQAAxkBAAIBlGUAARgP-xwJzSL70SLOPB8QG3lkSwACd8AxG54tAAFQZXIlrM9ePekBAAMCAAN5AAMwBA')}

})
