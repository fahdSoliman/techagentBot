  /**
   * Small description of your action
   * @title give user list of product if any
   * @category product
   * @author Fahd_soliman
   * @param {string} product - product slot
   */
  const _ = require('lodash')
  const product_id = {
    'حجز نطاق': 'resdomain',
    'استضافة نطاق': 'hostdomain',
    'استضافة مشتركة': 'sharedhosting',
    'استضافة مستقلة افتراضية': 'vps'
  }
  const myAction = async product => {
    const give_products = session.userReservations.services[product_id[product]]
    undefined
    if (give_products) {
      console.log(give_products)
    }
    if (_.isEmpty(give_products)) {
      console.log('empty')
      const message = `عذراً انت لم تقم بالتسجيل على خدمة ${product} إطلاقاً!`
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
    } else {
      const choices = []
      give_products.forEach(async obj => {
        choices.push({
          title: obj.domain_name.replace('http://', '') || obj.website_name.replace('http://', ''),
          value: obj.domain_name.replace('http://', '') || obj.website_name.replace('http://', '')
        })
      })
      choices.push({ title: 'خروج', value: 'exit' })
      const message = 'أي من هذه الخدمات ترغب بتعديلها؟'
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
      const single_choice = await bp.cms.renderElement(
        'builtin_single-choice',
        {
          type: 'single-choice',
          text: 'ما الخدمة التي تريد تعديلها؟',
          isDropdown: true,
          dropdownPlaceholder: true,
          choices: choices,
          markdown: true,
          disableFreeText: false,
          typing: true,
          variableName: 'choise_domain'
        },
        event
      )
      await bp.events.replyToEvent(event, single_choice)
    }
  }

  return myAction(args.product)