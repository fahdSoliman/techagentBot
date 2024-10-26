  /**
   * Small description of your action
   * @title Check Existing of product
   * @category API products
   * @author Fahd_soliman
   * @param {string} product_type - product type
   * @param {string} product_package - product name
   */
  const axios = require('axios')

  const myAction = async (product_type, product_package) => {
    const conf = await bp.bots.getBotById(event.botId)
    const webToken = conf.custom_config.apiToken
    const webURL = conf.custom_config.webURL
    const apiURL = conf.custom_config.apiURL
    const endpoint = apiURL + 'product/' + product_type
    try {
      const { data: product_info } = await axios({
        method: 'get',
        url: encodeURI(endpoint),
        headers: { Authorization: webToken }
      })
      temp.product_exist = false
      product_info.products.forEach(async obj => {
        console.log(product_package)
        if (obj.product_name === product_package) {
          temp.product_exist = true
          session.my_product = obj.id
        }
      })
    } catch (error) {
      if (error.response) {
        temp.error = true
        console.log('Error status: ', error.response.status)
        console.log('Error data: ', error.response.data)
      } else if (error.request) {
        temp.error = true
        console.log('No response received from the server')
        const mesage = 'حالياً لا أستطيع الوصول الى الموقع لإجراء عملية التحقق من توفر الخدمة'
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
        temp.error = true
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

  return myAction(args.product_type, args.product_package)