  /**
   * Small description of your action
   * @title search for user using telegram username
   * @category API customer
   * @author Fahd_soliman
   */
  const axios = require('axios')

  const myAction = async () => {
    const conf = await bp.bots.getBotById(event.botId)
    const webToken = conf.custom_config.apiToken
    const apiURL = conf.custom_config.apiURL
    const endpoint = apiURL + 'user/telegram/' + session.telegram

    try {
      const response = await axios({
        method: 'get',
        url: endpoint,
        headers: { Authorization: webToken }
      })
      if (response.status === 404) {
        // في حالة عدم وجود بيانات، لا تفعل أي شيء وقم بالعودة
        delete user.telegram
        delete user.userid
        console.log(response)
        console.log(user)
        return
      } else {
        // في حالة وجود بيانات، قم بحفظها في متغير session.telegram_info
        console.log(response.data)
        // session.telegram_info = response.data
        user.userid = response.data.user
        session.is_complete = response.data.is_complete
        console.log(user)
      }
    } catch (error) {
      delete user.telegram
      delete user.userid
      delete user.is_complete
      // delete session.is_complete
      console.log(user)
      console.log('error:')
      console.log(error.response.status)
      return
    }
  }

  return myAction()