const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);



const PORT = 3000;

app.use(express.static('public'));



io.on('connection', (socket) => {
  console.log('A user connected');

  const messages = [
    "?הי חבר/ה 👋 מה נשמע בוא/י נתכנן את העתיד שלך! מה השם שלך",
    "?האם אתה יודע מהי קרן פנסיה 🤔",
    "?תגיד לי 👀 כמה שנים יש לך עד הפנסיה",
    "?מה המשכורת החודשית שלך 💰",
    "?יש לך כבר קופת חיסכון לפנסיה 🤑",
    "?אם כן, כמה כסף צברת בה עד כה 💵",
    "?באיזה גיל אתה רוצה לפרוש מהעבודה 🕰️",
    "?יש לך נכסים אחרים כמו דירה או רכב 🏠 🚗",
    "?מהי רמת הסיכון שאתה מוכן לקחת בהשקעות - גבוהה 🔥, בינונית 💪 או נמוכה 🐢",
    "?האם יש לך העדפות או מגבלות מסוימות בנוגע להשקעות (אתיות, דתיות וכו') ⚠️",
    "?אתה נשוי/אה ויש לך ילדים שצריך לקחת בחשבון 👪"
  ];
  

  let currentMessageIndex = 0; // מתחילים מההודעה הראשונה

  // שלח את ההודעה הראשונה מיד עם התחברות הלקוח
  if (messages.length > 0) {
    socket.emit('message', messages[currentMessageIndex]);
    currentMessageIndex++;
  }

  // כאשר מתקבלת תגובה, שלח את ההודעה הבאה בתור
  socket.on('reply', (reply) => {
    console.log('Reply from client:', reply);

//   // בדוק אם התשובה היא "לא" לשאלה על קרן פנסיה
if (currentMessageIndex === 2 && reply.toLowerCase().includes('לא')) {
    // שלב את הקישור לסרטון בתוך ההודעה הבאה
    const nextMessage = messages[currentMessageIndex];
    const messageWithVideo = `https://www.youtube.com/watch?v=FgYaNzH-iuU`;
    socket.emit('message', messageWithVideo);
    currentMessageIndex++;
  }


    if (currentMessageIndex < messages.length) {
      socket.emit('message', messages[currentMessageIndex]);
      currentMessageIndex++;
    } else {
      // כאשר אין יותר הודעות לשלוח
      console.log('No more messages to send');
    }
  });
});

// // Redirect the base URL to the sign-in page
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'sign-in.html'));
// });

// // Redirect after sign-in to the chat page
// app.post('/submit-your-form', (req, res) => {
//   // Here you might handle the sign-in data
//   res.redirect('/chat');
// });

// // Serving the chat page
// app.get('/chat', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'chat.html'));
// });
  


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'sign-in.html'));
});

app.post('/submit-your-form', (req, res) => {
  // כאן יכול להיות טיפול בנתוני הטופס
  res.redirect('/chat');
});

// מגדיר נתיב לעמוד הצ'אט
app.get('/chat', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'chat.html'));
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
