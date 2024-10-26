  /**
   * Small description of your action
   * @title update company profile
   * @category API customer
   * @author Your_Name
   */
  const axios = require('axios')

  const myAction = async () => {
    const conf = await bp.bots.getBotById(event.botId)
    const webToken = conf.custom_config.apiToken
    const apiURL = conf.custom_config.apiURL
    const company_endpoint = apiURL + 'user/' + session.userid + '/company/'

    const company_update = await axios({
      method: 'put',
      url: company_endpoint,
      headers: { Authorization: webToken, 'Content-Type': 'application/json' },
      data: {
        customer_type: temp.customer_type,
        customer_name: temp.customer_name,
        country: temp.country,
        phone: temp.company_phone,
        email: temp.company_email
      }
    }).catch(function(error) {
      console.log('status: ' + error.response.status)
      console.log('status text: ' + error.response.statustext)
      return
    })
  }

  return myAction()