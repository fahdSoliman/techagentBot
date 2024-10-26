  /**
   * Gets domain info api
   * @title Get domain api
   * @category API Domain
   * @author fahd soliman
   * @param {any} domain - domain which you want to check
   */
  const axios = require('axios')

  const myAction = async domain => {
    const apiKey = 'OAJRWJMPP62UGNVKSTCCJBXHZ1JJKWLG'
    let response

    try {
      response = await axios.get(`https://api.ip2whois.com/v2?key=${apiKey}&domain=${domain}`)
      if (response.status == '200') {
        var bool = false
        var status = 'محجوز و غير متوفر'
        event.state.temp = {
          bool,
          domain,
          status
        }
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status == '404') {
          var status = 'متوفر'
          var bool = true

          event.state.temp = {
            bool,
            domain,
            status
          }
        } else if (['400', '502', '500'].includes(error.response.status)) {
          console.log('Request failed with status code 400. Have you set up your ip2whois API Key properly?')
          temp.err = true
          return
        }
      }
      // throw error - no need
    }
  }

  return myAction(args.domain)