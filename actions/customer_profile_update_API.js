  /**
   * Small description of your action
   * @title Update Customers Profile
   * @category API customer
   * @author fahd_Soliman
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
        gender: temp['skill-choice-ret-gender'],
        is_complete: true
      }
    }).catch(function(error) {
      console.log(error.response)
      return
    })
  }

  return myAction()