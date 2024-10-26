  /**
   * Small description of your action
   * @title Train NLU after updating utterances
   * @category Ambiguous
   * @author Fahd_Soliman
   */

  const axios = require('axios')
  const myAction = async () => {
    const axiosConfig = await bp.http.getAxiosConfigForBot(event.botId, { localUrl: true })
    let req = await axios.post('/mod/misunderstood/apply-all-pending', {}, axiosConfig)
  }

  return myAction()