  /**
   * Small description of your action
   * @title update financial profile
   * @category API customer
   * @author Your_Name
   */
  const axios = require('axios')

  const myAction = async () => {
    const conf = await bp.bots.getBotById(event.botId)
    const webToken = conf.custom_config.apiToken
    const apiURL = conf.custom_config.apiURL
    const finan_endpoint = apiURL + 'user/' + session.userid + '/finanical/'

    const finan_update = await axios({
      method: 'put',
      url: finan_endpoint,
      headers: { Authorization: webToken, 'Content-Type': 'application/json' },
      data: {
        financial_name: temp.financial_name,
        phone: temp.fin_phone,
        email: temp.fin_email
      }
    }).catch(function(error) {
      console.log(error.response)
      return
    })
  }

  return myAction()