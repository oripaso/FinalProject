// public/js/chat.js

const initChat = (io) => {
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

        let currentMessageIndex = 0;

        if (messages.length > 0) {
            socket.emit('message', messages[currentMessageIndex]);
            currentMessageIndex++;
        }

        socket.on('reply', (reply) => {
            console.log('Reply from client:', reply);

            if (currentMessageIndex === 2 && reply.toLowerCase().includes('לא')) {
                const messageWithVideo = `https://www.youtube.com/watch?v=FgYaNzH-iuU`;
                socket.emit('message', messageWithVideo);
                currentMessageIndex++;
            }

            if (currentMessageIndex < messages.length) {
                socket.emit('message', messages[currentMessageIndex]);
                currentMessageIndex++;
            } else {
                console.log('No more messages to send');
            }
        });
    });
}





module.exports = initChat;
