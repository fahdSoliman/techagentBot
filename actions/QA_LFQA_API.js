  /**
   * Small description of your action
   * @title QA with knowledge Base using LFQA_BART model
   * @category QA_BART
   * @author Fahd_soliman
   * @param {string} q - An example string variable
   */

  const axios = require('axios')

  const myAction = async q => {
    console.log(q)
    try {
      const config = await bp.bots.getBotById(event.botId)
      const webToken = config.custom_config.apiToken
      const webURL = config.custom_config.webURL
      const endpoint = webURL + 'qa/api/BART_LFQA/predict/'

      const answer = await axios({
        method: 'post',
        url: endpoint,
        headers: { Authorization: webToken, 'Content-Type': 'application/json' },
        data: { question: q }
      })
      if (answer.data.answer === '0') {
        temp.is_qa_answered = false
        return
      }
      temp.is_qa_answered = true
      session.qa_id = answer.data.qa_instance
      session.qa_score = answer.data.score
      const text = answer.data.answer
      console.log('qa_id: ', session.qa_id)
      console.log('qa_score: ', session.qa_score)
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
        console.log('Error data: ', error.response.data)
        const mesage = `لقد حصل خطأ في اعداد الطلب الى قاعدة المعرفة`
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
      } else if (error.request) {
        console.log('No response received from the server')
        const mesage = 'حالياً لا أستطيع الوصول الى الموقع لإجراء البحث عن جواب ضمن قاعدة المعرفة'
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

  return myAction(args.q)