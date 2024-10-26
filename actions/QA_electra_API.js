  /**
   * Small description of your action
   * @title QA with knowledge Base using electra model
   * @category QA_ELECTRA
   * @author Fahd_Soliman
   * @param {string} q - An example string variable
   */
  const axios = require('axios')

  const myAction = async q => {
    console.log(q)
    const config = await bp.bots.getBotById(event.botId)
    const webToken = config.custom_config.apiToken
    const webURL = config.custom_config.webURL
    const endpoint = webURL + 'qa/api/araELECTRA/predict/'

    const answer = await axios({
      method: 'post',
      url: endpoint,
      headers: { Authorization: webToken, 'Content-Type': 'application/json' },
      data: { question: q }
    }).catch(function(error) {
      console.log(error.response.statusText)
      return
    })
    console.log(answer.data)

    if (answer.data.answer === '0') {
      temp.is_qa_answered = false
      return
    }
    temp.is_qa_answered = true
    const text = answer.data.answer
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
  }

  return myAction(args.q)