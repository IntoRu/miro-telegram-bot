




// все работает только без проверки кто пишет (могут писать все)

// import 'dotenv/config'
// import TelegramBot from 'node-telegram-bot-api'
// import axios from 'axios'

// const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true })
// console.log('🤖 Telegram bot started')

// bot.on('message', async (msg) => {
//   console.log('📩 MESSAGE:', msg.text)

//   const chatId = msg.chat.id
//   const text = msg.text?.trim()

//   if (!text) return // пустое сообщение игнорируем

//   try {
//     // Генерация случайных координат около нуля
//     const offset = 300 // максимальное смещение по X и Y
//     const position = {
//       x: Math.random() * offset * 2 - offset, // случайно от -50 до +50
//       y: Math.random() * offset * 2 - offset
//     }

//     console.log('📤 Sending to Miro:', {
//       board: process.env.MIRO_BOARD_ID,
//       text,
//       position
//     })

//     await axios.post(
//       `https://api.miro.com/v2/boards/${process.env.MIRO_BOARD_ID}/sticky_notes`,
//       {
//         data: {
//           content: text,
//           shape: 'square'
//         },
//         position
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.MIRO_ACCESS_TOKEN}`,
//           'Content-Type': 'application/json'
//         }
//       }
//     )

//     bot.sendMessage(chatId, '✅ Задача добавлена в Miro')
//   } catch (err) {
//     console.error('❌ MIRO ERROR:', err.response?.data || err.message)
//     bot.sendMessage(chatId, '❌ Ошибка при создании задачи')
//   }
// })




import 'dotenv/config'
import TelegramBot from 'node-telegram-bot-api'
import axios from 'axios'

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true })
console.log('🤖 Telegram bot started')

// ✅ Вставь сюда свой Telegram ID
const ALLOWED_USER_ID = Number(process.env.TELEGRAM_USER_ID) // например 123456789

bot.on('message', async (msg) => {
  const chatId = msg.chat.id
  const userId = msg.from.id

  // Проверяем, что сообщение от нужного пользователя
  if (userId !== ALLOWED_USER_ID) return

  const text = msg.text?.trim()
  if (!text) return // пустое сообщение игнорируем

  try {
    // Генерация случайных координат около нуля
    const offset = 500 // максимальное смещение по X и Y
    const position = {
      x: Math.random() * offset * 2 - offset, // случайно от -50 до +50
      y: Math.random() * offset * 2 - offset
    }

    console.log('📤 Sending to Miro:', {
      board: process.env.MIRO_BOARD_ID,
      text,
      position
    })

    await axios.post(
      `https://api.miro.com/v2/boards/${process.env.MIRO_BOARD_ID}/sticky_notes`,
      {
        data: {
          content: text,
          shape: 'square'
        },
        position
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.MIRO_ACCESS_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    )

    bot.sendMessage(chatId, '✅ Задача добавлена в Miro')
  } catch (err) {
    console.error('❌ MIRO ERROR:', err.response?.data || err.message)
    bot.sendMessage(chatId, '❌ Ошибка при создании задачи')
  }
})
