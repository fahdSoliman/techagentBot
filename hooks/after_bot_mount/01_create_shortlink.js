  const chatOptions = {
    hideWidget: true,
    config: {
      enableReset: true,
      enableTranscriptDownload: true,
      extraStylesheet: '/assets/modules/channel-web/goldstyle.css',
      enableConversationDeletion: true,
      showConversationsButton: false
    }
  }

  const params = {
    m: 'channel-web',
    v: 'Fullscreen',
    options: JSON.stringify(chatOptions)
  }

  setTimeout(() => {
    try {
      bp.http.deleteShortLink(botId)
    } catch (e) {}

    // Chatbot will be available at $EXTERNAL_URL/s/$BOT_NAME
    bp.http.createShortLink(botId, `${process.EXTERNAL_URL}/lite/${botId}/`, params)
  }, 500)