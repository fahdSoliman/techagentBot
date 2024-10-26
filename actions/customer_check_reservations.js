  /**
   * Small description of your action
   * @title Check Customer reservations
   * @category API customer
   * @author Fahd Soliman
   */
  const myAction = async () => {
    if (session.userCare === undefined) {
      var message = `لا يمكنني الوصول الى معلوماتك الخاصة على الموقع حالياً`
      const text = await bp.cms.renderElement('builtin_text', { text: message, typing: true }, event)
      await bp.events.replyToEvent(event, text)
      return
    }
    console.log(session.userCare)
    var obj = session.userCare.pop()
    console.log(obj)
    if (obj !== undefined) {
      var message = `لديك اشتراك ${obj.product_type} بعنوان موقع ${obj.domain_name} بحاجة الى مراجعة`
      const text = await bp.cms.renderElement('builtin_text', { text: message, typing: true }, event)
      await bp.events.replyToEvent(event, text)
      if (obj.expired === true) {
        var message = `يتوجب عليك تجديد هذا الاشتراك`
        const text = await bp.cms.renderElement('builtin_text', { text: message, typing: true }, event)
        await bp.events.replyToEvent(event, text)
      }
      if (obj.bill === true) {
        var message = `بحاجة الى وصل دفع جديد`
        const text = await bp.cms.renderElement('builtin_text', { text: message, typing: true }, event)
        await bp.events.replyToEvent(event, text)
      }
      // session.userCare.forEach(async obj => {
      //   console.log(obj.my_product)
      // })
      // console.log(session.userCare)
      // console.log('last record: ' + session.userCare.pop())
      // console.log(session.userCare)
    } else {
      // send message
      var message = `ليس لديك أي اشتراك بحاجة الى مراجعة`
      const text = await bp.cms.renderElement('builtin_text', { text: message, typing: true }, event)
      await bp.events.replyToEvent(event, text)
    }
  }

  return myAction()