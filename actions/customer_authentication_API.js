  /**
   * Small description of your action
   * @title authenticate user with website
   * @category API customer
   * @author Fahd_soliman
   */
  const axios = require('axios')

  const myAction = async () => {
    const conf = await bp.bots.getBotById(event.botId)
    const webToken = conf.custom_config.apiToken
    const apiURL = conf.custom_config.apiURL
    const endpoint = apiURL + 'auth/'

    try {
      const data = await axios({
        method: 'post',
        url: endpoint,
        data: {
          username: temp.username,
          password: temp.password
        }
      })
      console.log('the user authenticated to system')

      // getting user information by username
      const user_data_url = apiURL + 'user/username/' + temp.username
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
    } catch (error) {
      console.log('no authentication user ')
      console.log(error.data)
    }
  }

  return myAction()