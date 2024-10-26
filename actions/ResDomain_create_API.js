  /**
   * Reservation Domain API
   * @title Reservation Domain create API
   * @category API services
   * @author Fahd Soliman
   */

  const axios = require('axios')

  const myAction = async () => {
    const conf = await bp.bots.getBotById(event.botId)
    const webToken = conf.custom_config.apiToken
    const apiURL = conf.custom_config.apiURL
    const endpoint = apiURL + 'product/resdomain/'

    const date = new Date() // for note
    const note = ' <p>registred with agent-bot, Date: ' + date + ' </p><hr/>'
    try {
      const request_info = await axios({
        method: 'post',
        url: encodeURI(endpoint),
        headers: { Authorization: webToken, 'Content-Type': 'application/json' },
        data: {
          user: session.userid,
          my_product: session.my_product,
          domain_name: 'http://' + temp.domain,
          activate: temp.activate,
          primary_name_server: temp.dns1,
          secondary_name_server: temp.dns2,
          hosting_company: temp.company,
          note: note
        }
      })
      session.resdomain == request_info
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
      }
      else {
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
    
     // we need to check that
  
  return myAction()