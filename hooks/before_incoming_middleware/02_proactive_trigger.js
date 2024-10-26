  if (event.type === 'proactive-trigger') {
    console.log(event)
    event.state.user.language = 'ar'
    // We only want to trigger a proactive message when the session is new,
    const eventDestination = {
      channel: event.channel,
      target: event.target,
      botId: event.botId,
      threadId: event.threadId
    }
    if (event.state.session.lastMessages.length) {
      // This will tell the dialog engine to skip the processing of this event.
      event.setFlag(bp.IO.WellKnownFlags.SKIP_DIALOG_ENGINE, true)
    } else {
      // This will tell the dialog engine to skip the processing of this event.
      event.setFlag(bp.IO.WellKnownFlags.SKIP_DIALOG_ENGINE, true)
      bp.cms
        .renderElement('builtin_text', { text: 'من الرائع رؤيتك هنا!', typing: true }, eventDestination)
        .then(payloads => {
          bp.events.replyToEvent(event, payloads)
        })
      event.setFlag(bp.IO.WellKnownFlags.SKIP_DIALOG_ENGINE, false)
      const sessionId = bp.dialog.createId(event)
      bp.dialog.jumpTo(sessionId, event, 'flow-chatbot-help.flow.json')
    }
  }