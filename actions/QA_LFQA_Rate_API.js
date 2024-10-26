  /**
   * Small description of your action
   * @title Rate QA given from BART LFQA model
   * @category QA_BART
   * @author Fahd_soliman
   */

  const axios = require('axios')

  const myAction = async () => {
    try {
      const config = await bp.bots.getBotById(event.botId)
      const webToken = config.custom_config.apiToken
      const webURL = config.custom_config.webURL
      const endpoint = webURL + 'qa/api/BART_LFQA/rate/'
      const user_rate = temp['skill-choice-ret-user_rate']
      console.log('user rate: ', user_rate)
      const data = { qa_id: session.qa_id, qa_user_rate: user_rate }
      const answer = await axios({
        method: 'post',
        url: endpoint,
        headers: { Authorization: webToken, 'Content-Type': 'application/json' },
        data: data
      })
      const text = 'شكراً ، تقييمك سيزيد من جودة الاسئلة مستقبلاً'
      const message = await bp.cms.renderElement(
        'builtin_text',
        {
          type: 'text',
          text: text,
          typing: true,
          markdown: true
        },
        event
      )
      await bp.events.replyToEvent(event, message)
    } catch (error) {
      if (error.response) {
        console.log('Error status: ', error.response.status)
        // console.log('Error data: ', error.response.data)
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