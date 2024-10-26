  /**
   * Small description of your action
   * @title Get Product's Price
   * @category API products
   * @author fahd soliman
   * @param {string} product_type - product type
   * @param {string} product_package - product package
   */
  const axios = require('axios')
  const myAction = async (product_type, product_package) => {
    const config = await bp.bots.getBotById(event.botId)
    const webToken = config.custom_config.apiToken
    const webURL = config.custom_config.webURL
    const apiURL = config.custom_config.apiURL
    const endpoint = apiURL + 'product/' + product_type
    const { data: product_info } = await axios({
      method: 'get',
      url: encodeURI(endpoint),
      headers: { Authorization: webToken }
    }).catch(function(error) {
      if (error.response) {
        console.log(error.response.status)
        return
      }
      console.log(error.response)
    })
    var cardjson = []

    product_info.products.forEach(async obj => {
      if (obj.product_name == product_package) {
        cardjson.push({
          type: 'card',
          title: obj.product_name,
          subtitle: 'السعر: ' + obj.year_fees,
          image: obj.product_img,
          actions: [{ title: 'اشترك من خلال الموقع!', action: 'Open URL', url: webURL + 'product/' + obj.id }]
        })
        const message = 'سعر الخدمة: ' + obj.year_fees + ' ل.س فقط'
        const text = await bp.cms.renderElement(
          'builtin_text',
          {
            type: 'text',
            text: message,
            typing: true,
            markdown: true
          },
          event
        )
        await bp.events.replyToEvent(event, text)
      }
    })
    console.log(cardjson.length)
    if (cardjson.length === 0) {
      const mesage = 'الخدمة التي اخترتها غير موجودة'
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
      const card = await bp.cms.renderElement('builtin_card', cardjson.pop(), event)
      await bp.events.replyToEvent(event, card)
    }
  }
  return myAction(args.product_type, args.product_package)