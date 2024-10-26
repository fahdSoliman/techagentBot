  /**
   * Get all product with all details API
   * @title Product Details API
   * @category API products
   * @author Fahd Soliman
   * @param {string} product_type - product type
   * @param {string} product_package - product package
   */
  const axios = require('axios')
  const myAction = async (product_type, product_package) => {
    const conf = await bp.bots.getBotById(event.botId)
    const webToken = conf.custom_config.apiToken
    const webURL = conf.custom_config.webURL
    const apiURL = conf.custom_config.apiURL
    const endpoint = apiURL + 'product/' + product_type
    const { data: product_info } = await axios({
      method: 'get',
      url: encodeURI(endpoint),
      headers: { Authorization: webToken }
    }).catch(function(error) {
      console.log(error.response.status)
      return
    })
    var carouselArr = []
    product_info.products.forEach(async obj => {
      // console.log(obj.product_name)
      // console.log(product_pachage)

      if (obj.product_name == product_package) {
        console.log(obj.product_name)
        carouselArr.push({
          type: 'card',
          title: obj.product_name,
          subtitle: product_package,
          image: obj.product_img,
          actions: [{ title: obj.product_name, action: 'Open URL', url: webURL + 'product/' + obj.id }]
        })
        const mesage = obj.get_descritpion_markdown + '<br>' + obj.get_specification_markdown
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
    })
    if (carouselArr.length === 0) {
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
      const carousel = await bp.cms.renderElement('builtin_card', carouselArr.pop(), event)
      await bp.events.replyToEvent(event, carousel)
    }
  }

  return myAction(args.product_type, args.product_package)