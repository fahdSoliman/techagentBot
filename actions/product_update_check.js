  /**
   * Small description of your action
   * @title check if the product is related to user
   * @category product
   * @author Fahd_soliman
   * @param {string} domain - An example string variable
   * @param {any} product - Another Example value
   */

  const product_id = {
    'حجز نطاق': 'resdomain',
    'استضافة نطاق': 'hostdomain',
    'استضافة مشتركة': 'sharedhosting',
    'استضافة مستقلة افتراضية': 'vps'
  }
  const myAction = async (domain, product) => {
    if (session.userReservations === undefined) {
      const mesage = 'ليس لدي أي معلومات عن حسابك قد يكون هنالك فشل في جلبها من الموقع'
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
      return
    }
    const normalized_domain = 'http://' + domain
    console.log(product_id[product])
    console.log(session.userReservations.services[product_id[product]])
    console.log(normalized_domain)
    const product_founded = session.userReservations.services[product_id[product]].find(
      p => p.domain_name === normalized_domain || p.website_name === normalized_domain
    )
    undefined
    if (product_founded) {
      console.log(product_founded)
      temp.product_founded = true
      session.product_to_update = product_founded
      temp.fields_to_update = {}
      temp.domain = normalized_domain
    } else {
      temp.product_founded = false
    }
  }

  return myAction(args.domain, args.product)