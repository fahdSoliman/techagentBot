  /**
   * Small description of your action
   * @title technical profile update
   * @category API customer
   * @author Your_Name
   */
  const axios = require('axios')

  const myAction = async () => {
    const conf = await bp.bots.getBotById(event.botId)
    const webToken = conf.custom_config.apiToken
    const apiURL = conf.custom_config.apiURL
    const tech_endpoint = apiURL + 'user/' + session.userid + '/technical/'

    const tech_update = await axios({
      method: 'put',
      url: tech_endpoint,
      headers: { Authorization: webToken, 'Content-Type': 'application/json' },
      data: {
        technical_name: temp.technical_name,
        phone: temp.tech_phone,
        email: temp.tech_email
      }
    }).catch(function(error) {
      console.log(error.response)
      return
    })
  }

  return myAction()