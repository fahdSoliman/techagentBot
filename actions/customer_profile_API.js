  /**
   * Small description of your action
   * @title GET user profile
   * @category API customer
   * @author Fahd_Soliman
   */
  const axios = require('axios')

  const myAction = async () => {
    const conf = await bp.bots.getBotById(event.botId)
    const webToken = conf.custom_config.apiToken
    const apiURL = conf.custom_config.apiURL
    const user_data_url = apiURL + 'user/' + user.userid
    try {
      const user_data = await axios({
        method: 'get',
        url: user_data_url,
        headers: { Authorization: webToken }
      })
      console.log(user_data.data)
      console.log('-----------')
      user.userid = user_data.data.profile.user
      user.email = user_data.data.email
      user.fullName = user_data.data.first_name + ' ' + user_data.data.last_name

      session.is_complete = user_data.data.profile.is_complete
      session.profile = user_data.data.profile
      session.companyprofile = user_data.data.companyprofile
      session.technicalresponse = user_data.data.technicalresponse
      session.finanicalresponse = user_data.data.finanicalresponse
    } catch (error) {
      console.log('no user profile get')
      console.log(error.data)
    }
  }

  return myAction()