  /**
   * Small description of your action
   * @title HostDomain Reservation API
   * @category API services
   * @author Fahd_soliman
   */
  const axios = require('axios')

  const myAction = async () => {
    const conf = await bp.bots.getBotById(event.botId)
    const webToken = conf.custom_config.apiToken
    const apiURL = conf.custom_config.apiURL
    const endpoint = apiURL + 'product/hostdomain/'

    const date = new Date() // for note
    const note = ' <p>registred with agent-bot, Date: ' + date + ' </p><hr/>'
    try {
      console.log(session.slots.domain.value)
      const request_info = await axios({
        method: 'post',
        url: encodeURI(endpoint),
        headers: { Authorization: webToken, 'Content-Type': 'application/json' },
        data: {
          user: user.userid,
          my_product: session.my_product,
          domain_name: 'http://' + session.slots.domain.value,
          ip_address: temp.ip_address,
          note: note
        }
      })
      session.resdomain == request_info // we need to check that
      const mesage = 'تهانينا لقد قمت بالتسجيل على الخدمة لك، يمكنك التحقق من الخدمة من خلال صفحة اشتراكاتي في الموقع.'
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
    } catch (error) {
      if (error.response) {
        console.log('Error status: ', error.response.status)
        console.log('Error data: ', error.response.data)
        const mesage = `حدثت مشكلة في عملية التسجيل في الخدمة\n ${error.response.data.domain_name}`
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
        const mesage = 'حالياً لا أستطيع الوصول الى الموقع لإجراء عملية التسجيل'
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
    // console.log(request_info) // for test
    // save some info at session memory
  }

  return myAction()