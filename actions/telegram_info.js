  /**
   * Action to retrive some info about telegram user
   * @title telegram user info
   * @category API Telegram
   * @author Fahd_soliman
   */
  const axios = require('axios')
  const extractInfo = async () => {
    const config = await bp.bots.getBotById(event.botId)
    const channels = config.messaging.channels

    if (event.channel !== 'telegram') {
      return
    }

    const getMessagingInfo = async () => {
      const getName = async query => {
        const result = await bp.database.raw(query)
        return result.rows ? result.rows[0].name : result[0].name
      }
      const userId = await getName(
        `SELECT name FROM msg_senders s, msg_usermap m WHERE s.id = m.senderId AND m.userId = '${event.target}'`
      )
      //Uncomment if you use it (conversation Id)
      /*const convId = await getName(
      `SELECT name FROM msg_threads s, msg_convmap m WHERE s.id = m.threadId AND m.conversationId = '${event.threadId}'`
    )*/
      return { userId }
    }

    const { userId } = await getMessagingInfo()
    const botToken = channels.telegram.botToken
    // https://api.telegram.org/bot<token>/METHOD_NAME
    const userInfoUrl = 'https://api.telegram.org/bot' + botToken + '/getChat'
    // Query Telegram API
    const { data: userInfo } = await axios({
      method: 'post',
      url: userInfoUrl,
      data: {
        chat_id: userId
      }
    })
    console.log(userInfo)
    session.telegram = userInfo.result.username
    user.fullName = userInfo.result.first_name + ' ' + userInfo.result.last_name
  }

  return extractInfo()