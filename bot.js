const TelegramBot = require('node-telegram-bot-api');
const userInfo = require('./database/telegramDb');
<<<<<<< HEAD
const token = '6481529792:AAHWeovDl1eJntMzz94yT5CPG1Zc-T9lqqw';
const express = require('express')

const app = express()
app.use(express.json()) 
=======
const token = 'xxxx';
>>>>>>> main
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  let startmenu = {
    reply_to_message_id: msg.message_id,
    reply_markup: JSON.stringify({
      keyboard: [
        
        ['ثبت نام دوره های آموزشی'],
        ['ارتباط با ما', 'درباره ما']
      ],
    }),
  };
  bot.sendMessage(msg.chat.id, "سلام به ربات فرادید خوش آمدید", startmenu);
  bot.sendPhoto(msg.chat.id, 'AgACAgQAAxkBAAMdZQfymDjtDgjamwwlEE1xsN7Y8kIAAh7EMRvOQUFQgqw_-wr4UhIBAAMCAAN5AAMwBA');

});

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  let corses = {
    reply_to_message_id: msg.message_id,
    reply_markup: JSON.stringify({
      keyboard: [
        ['/ بوت کمپ آموزش انگولار🔥']
      ],
      resize_keyboard: true,
    }),
  };

  if (msg.text == 'ثبت نام دوره های آموزشی') {
    bot.sendMessage(chatId, "لطفا دوره مورد نظر را انتخاب کنید", corses);

}});



bot.onText(/\/ بوت کمپ آموزش انگولار🔥/, async msg => {
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
  let startmenu = {
    reply_to_message_id: msg.message_id,
    reply_markup: JSON.stringify({
      keyboard: [
      
        ['ثبت نام دوره های آموزشی'],
        ['ارتباط با ما', 'درباره ما']
      ],
    }),
  };
  const phoneNumber=phoneMsg.text
  console.log(phoneNumber);
  bot.sendMessage(msg.chat.id,'ممنون در اسراع وقت با شما تماس خواهیم گرفت❤️',startmenu)
  const saveUser = new userInfo({
    studentName:name,
    studentPhone:phoneNumber,
    userId: msg.chat.username
  })
  saveUser.save()

})

});
});

//upload image
bot.on('message', (msg) => {
  if (msg.text == 'درباره ما') {
    bot.sendPhoto(msg.chat.id, 'AgACAgQAAxkBAAMdZQfymDjtDgjamwwlEE1xsN7Y8kIAAh7EMRvOQUFQgqw_-wr4UhIBAAMCAAN5AAMwBA');
  } else if (msg.text == 'ارتباط با ما') {
    bot.sendPhoto(msg.chat.id, 'AgACAgQAAxkBAAMdZQfymDjtDgjamwwlEE1xsN7Y8kIAAh7EMRvOQUFQgqw_-wr4UhIBAAMCAAN5AAMwBA');

}});

//timer
function logTimeAndDate() {
  const now = new Date();
  console.log(`Current time and date: ${now.toLocaleString()}`);
}
logTimeAndDate();
setInterval(logTimeAndDate, 5 * 60 * 1000); 

// port connection
const PORT = process.env.PORT||8080;
app.listen(PORT,(err)=>{
    if(err){
        console.log("err in listening PORT:",PORT);
    }else{
        console.log("you listening to:",PORT," port");
    }})

    //api

          //_______________________________________

app.post('/update/call/:id',async(req,res)=>{
const user = await userInfo.findById(req.params.id)
user.isCall=true
user.save()
res.send(user)
console.log("status changed!");
})

//_______________________________________
app.get('/getall',(req,res)=>{
   userInfo.find({}).then((data)=>{
   console.log(data)
   res.send(data);
       }).catch((err)=>{
   console.log(err);
       })
     })

     //pagenashon test
     app.get("/getuser/:pagee/:limitt", async (req, res) => {
      const page=req.params.pagee
      const limit=req.params.limitt
    
      try {
        const posts = await userInfo.find()
          .limit(limit * 1)
          .skip((page - 1) * limit)
          .exec();
    
   
        const count = await userInfo.countDocuments();
    
        res.json({
          posts,
          totalPages: Math.ceil(count / limit),
          currentPage: page,
        });
      } catch (err) {
        console.error(err.message);
      }
    });
    //______________________________________
    app.post('/update/Register/:id',async(req,res)=>{
      const user = await userInfo.findById(req.params.id)
      user.Registered=true
      user.save()
      res.send(user)
      console.log("status changed!");
      })
      //____________________________________