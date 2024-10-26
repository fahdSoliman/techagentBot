  const intentMessages = {
    'intent-product-register': 'الاشتراك بخدمة',
    'intent-product-info': 'معلومات عن الخدمات',
    'intent-chatbot-help': 'المساعدة من بوت الدردشة',
    'intent-product-edit': 'تعديل اشتراك أو خدمة',
    'intent-cancel': 'الخروج من الامر'
  }
  /**
   * Small description of your action
   * @title Ambiguous handling with messages to customers
   * @category Ambiguous
   * @author Fahd_soliman
   * @param {string} top - top intent name
   * @param {string} low - low intent name
   */
  const myAction = async (top, low) => {
    const baseMessage = 'عذراً، ارجو توضيح رسالتك السابقة بشكل افضل،'
    const topMessage = intentMessages[top] || ''
    const lowMessage = intentMessages[low] || ''
    // temp.possible_intent === false
    temp.pre_message = event.preview
    if (top !== 'none' && low !== 'none') {
      // حالة عندما تكون top و low ليستان none
      temp.two_intent = true
      const message = `${baseMessage} لقد اختلط الامر عليّ بين "${topMessage}" و "${lowMessage}". `
      const text = await bp.cms.renderElement('builtin_text', { text: message, typing: true }, event)
      await bp.events.replyToEvent(event, text)
      temp.intent_top = top
      temp.intent_low = low
      temp.two_intent = true
    } else if (top === 'none' || low === 'none') {
      // حالة عندما تكون إحدى القيم "none"
      temp.two_intent = false
      const otherIntent = top === 'none' ? low : top
      const otherMessage = intentMessages[otherIntent] || ''
      const message = `${baseMessage} هل ترغب بمعرفة ${otherMessage} ؟`
      const text = await bp.cms.renderElement('builtin_text', { text: message, typing: true }, event)
      await bp.events.replyToEvent(event, text)
      temp.intent_to_update = otherIntent
      temp.two_intent = false
    }
  }
  return myAction(args.top, args.low)