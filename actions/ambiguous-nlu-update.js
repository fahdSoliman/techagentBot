  /**
   * Small description of your action
   * @title update NLU utterances
   * @category Ambiguous
   * @author Fahd_Soliman
   * @param {string} utterance - user massage to be entred to nlu
   * @param {any} intent - intent that possible to update
   */

  const axios = require('axios')
  const myAction = async (utterance, intent) => {
    const getID = async query => {
      const result = await bp.database.raw(query)
      return result
    }
    const misId = await getID(`SELECT * FROM misunderstood s WHERE s.preview = '${utterance}'`)
    const axiosConfig = await bp.http.getAxiosConfigForBot(event.botId, { localUrl: true })
    const ids = misId.map(record => record.id)

    const requestBody = {
      ids: ids,
      status: 'pending',
      resolutionType: 'intent',
      resolution: intent
    }

    let req = await axios.post('/mod/misunderstood/events/status', requestBody, axiosConfig)
  }

  return myAction(args.utterance, args.intent)