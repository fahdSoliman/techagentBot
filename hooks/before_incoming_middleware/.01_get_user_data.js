 if (event.type === 'session_reset') {
    console.log('heheh')
    // event.setFlag(bp.IO.WellKnownFlags.SKIP_DIALOG_ENGINE, true)
    const axios = require('axios')
    const extractInfo = async () => {
      const config = await bp.bots.getBotById(event.botId)
      const apiToken = config.custom_config.apiToken
      const apiURL = config.custom_config.apiURL
      const customUserId = event.state.user.webchatCustomId
      const botpressurlAPI = apiURL + 'user/botpress/' + customUserId
      const webToken = apiToken

      const { data: userInfo } = await axios({
        method: 'get',
        url: botpressurlAPI,
        headers: { Authorization: webToken }
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
        headers: { Authorization: 'nans 4dfe28da961227ab65c338024079249fccac7396' }
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

      // session storage - full profile data
      event.state.session.userWebData = userWebData
      event.state.session.is_complete = userWebData.profile.is_complete
      event.state.session.userid = userWebData.profile.user
    }
    extractInfo().then(() => {
      console.log('after milddle')
      console.log(event.id)
      console.log(event.state.session)
    })
  }