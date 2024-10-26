  /**
   * Small description of your action
   * @title Update HostDomain record API
   * @category API services
   * @author Fahd_soliman
   */

  const axios = require('axios')

  const fields = {
    'عنوان النطاق': 'domain_name',
    'عنوان الشبكة': 'ip_address'
  }
  const myAction = async () => {
    const conf = await bp.bots.getBotById(event.botId)
    const webToken = conf.custom_config.apiToken
    const apiURL = conf.custom_config.apiURL
    const endpoint = apiURL + 'product/hostdomain/' + session.product_to_update.id + '/'
    const date = new Date() // for note
    const note = ' <p>updated with agent-bot, Date:' + date + ' </p><hr/>'
    const data = {
      user: session.product_to_update.user,
      my_product: session.product_to_update.id,
      domain_name: temp.domain,
      note: note + session.product_to_update.note
    }
    const modified_data = Object.assign(data, temp.fields_to_update)
    console.log(modified_data)
    try {
      const request_info = await axios({
        method: 'put',
        url: encodeURI(endpoint),
        headers: { Authorization: webToken, 'Content-Type': 'application/json' },
        data: modified_data
      })
      const mesage = 'تهانينا لقد قمت بالتعديل على الخدمة لك، يمكنك التحقق من الخدمة من خلال صفحة اشتراكاتي في الموقع.'
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
        const mesage = `حدثت مشكلة في عملية التعديل في الخدمة\n ${error.response.data.domain_name}`
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
  }

  return myAction()