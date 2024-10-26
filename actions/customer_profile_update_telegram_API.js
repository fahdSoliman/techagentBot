  /**
   * Small description of your action
   * @title Update telegram field of profile
   * @category API customer
   * @author Fahd_soliman
   */
  const axios = require('axios')

  const myAction = async () => {
    const conf = await bp.bots.getBotById(event.botId)
    const webToken = conf.custom_config.apiToken
    const apiURL = conf.custom_config.apiURL

    const profile_endpoint = apiURL + 'user/' + user.userid + '/profile/'
    
    const profile_update = await axios({
      method: 'put',
      url: profile_endpoint,
      headers: { Authorization: webToken, 'Content-Type': 'application/json' },
      data: {
        telegram: session.telegram
      }
    }).catch(function(error) {
      console.log(error.response)
      return
    })
  }

  return myAction()