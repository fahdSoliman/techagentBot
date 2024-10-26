  /**
   * Small description of your action
   * @title The title displayed in the flow editor
   * @category API customer
   * @author fahd_soliman
   */

  const axios = require('axios')
  const myAction = async () => {
    try {
      const config = await bp.bots.getBotById(event.botId)
      const apiToken = config.custom_config.apiToken
      const apiURL = config.custom_config.apiURL
      const endpoint = apiURL + 'user/' + user.userid + '/reservations/'
      const { data: userRes } = await axios({
        method: 'get',
        url: endpoint,
        headers: { Authorization: apiToken }
      })
      session.userReservations = userRes
    } catch (error) {
      if (error.response) {
        console.log('Error status: ', error.response.status)
        console.log('Error data: ', error.response.data)
      } else if (error.request) {
        console.log('No response received from the server')
        const mesage = 'حالياً لا أستطيع الوصول الى الموقع لإجراء عملية التحقق من الاشتراكات لديك'
        const text = await bp.cms.renderElement(
          'builtin_text',
          {
            type: 'text',
            text: mesage,
            typing: true,
            markdown: true
          },
          event
        )
        await bp.events.replyToEvent(event, text)
      } else {
        console.log('Error in request setup: ', error.message)
        const mesage = 'لقد حصل خطأ عند اعداد الطلب الى الموقع'
        const text = await bp.cms.renderElement(
          'builtin_text',
          {
            type: 'text',
            text: mesage,
            typing: true,
            markdown: true
          },
          event
        )
        await bp.events.replyToEvent(event, text)
      }
    }
  }

  return myAction()