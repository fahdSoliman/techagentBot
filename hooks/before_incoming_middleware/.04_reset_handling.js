  const axios = require('axios')
  if (event.type === 'session_reset') {
    console.log(event.state.user.webchatCustomId)
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
      const axios = require('axios')
      const extractInfo = async () => {
        const config = await bp.bots.getBotById(event.botId)
        const apiToken = config.custom_config.apiToken
        const apiURL = config.custom_config.apiURL
        const customUserId = event.state.user.webchatCustomId
        const botpressurlAPI = apiURL + 'user/botpress/' + customUserId

        const { data: userInfo } = await axios({
          method: 'get',
          url: botpressurlAPI,
          headers: { Authorization: apiToken }
        }).catch(function(error) {
          if (error.response) {
            console.log(error.response.status)
          }
          console.log('error: ' + error.response.body)
          return error
        })
        const webId = userInfo.user

        // console.log(userInfo)
        const userurlAPI = apiURL + 'user/' + webId + '/'
        const { data: userWebData } = await axios({
          method: 'get',
          url: userurlAPI,
          headers: { Authorization: apiToken }
        })
        // update fullName on DB
        const fullname = userWebData.first_name + ' ' + userWebData.last_name
        const updateName = async query => {
          const result = await bp.database.raw(query)
          return result
        }
        await updateName(`UPDATE hitl_sessions SET full_name = '${fullname}' WHERE thread_id = '${event.threadId}'`)
        // console.log(userWebData)
        // user storage - most used data
        event.state.user.language = 'ar'
        event.state.user.email = userWebData.email
        event.state.user.fullName = fullname
        event.state.user.userid = userWebData.profile.user
        // event.state.user.userData = userWebData

        // session storage - full profile data
        event.state.session.is_complete = userWebData.profile.is_complete
        event.state.session.userid = userWebData.profile.user
        event.state.session.profile = userWebData.profile
        event.state.session.companyprofile = userWebData.companyprofile
        event.state.session.technicalresponse = userWebData.technicalresponse
        event.state.session.finanicalresponse = userWebData.finanicalresponse
        console.log(event.state.session)
      }
      extractInfo()
      // console.log(event.state.session.is_complete)
      // bp.cms
      //   .renderElement(
      //     'builtin_text',
      //     { text: 'من الرائع رؤيتك هنا {{user.fullName}}!', typing: true },
      //     eventDestination
      //   )
      //   .then(payloads => {
      //     bp.events.replyToEvent(event, payloads)
      //   })
      event.setFlag(bp.IO.WellKnownFlags.SKIP_DIALOG_ENGINE, false)
      const sessionId = bp.dialog.createId(event)
      bp.dialog.jumpTo(sessionId, event, 'flow-customer-proactive.flow.json')
    }
    console.log(event.state.user)
  }