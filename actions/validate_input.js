  /**
   * Small description of your action
   * @title Validate input
   * @category Validate
   * @author fahd_soliman
   * @param {string} entitiy - name of entitiy
   * @param {string} end_node - ending node for exiting
   * @param {string} variable - name of variable to store
   */
  const myAction = async (entitiy, end_node, variable) => {
    const target = event.state.context.currentFlow
    const node = event.state.context.currentNode
    if (!temp.counter) {
      temp.counter = 3
    }
    if (temp.counter === 1) {
      delete temp.counter
      const message = 'لم نحصل على معلومة مناسبة لتسجيل الخدمة، هل ترغب بالحصول على مساعدة من موظف دعم؟'
      const text = await bp.cms.renderElement('builtin_text', { text: message, typing: true }, event)
      await bp.events.replyToEvent(event, text)

      const sessionId = bp.dialog.createId(event)
      bp.dialog.jumpTo(sessionId, event, target, end_node)
      return
    } else if (event.nlu && event.nlu.entities && event.nlu.entities['0']) {
      const e = event.nlu.entities['0'].name
      if (entitiy === e) {
        console.log(e)
        temp[variable] = event.nlu.entities['0'].data.value
        delete temp.counter
      } else {
        const message = 'القيمة التي قدمتها غير مناسبة'
        const text = await bp.cms.renderElement('builtin_text', { text: message, typing: true }, event)
        await bp.events.replyToEvent(event, text)
        const sessionId = bp.dialog.createId(event)
        bp.dialog.jumpTo(sessionId, event, target, node)
        temp.counter--
      }
    } else {
      const message = 'لم تقم بتقديم اي معلومة'
      const text = await bp.cms.renderElement('builtin_text', { text: message, typing: true }, event)
      await bp.events.replyToEvent(event, text)
      const sessionId = bp.dialog.createId(event)
      bp.dialog.jumpTo(sessionId, event, target, node)
      temp.counter--
    }
  }

  return myAction(args.entitiy, args.end_node, args.variable)