  /**
   * Small description of your action
   * @title Next message correction
   * @category Ambiguous
   * @author Fahd_Soliman
   */
  const myAction = async () => {
    const intent = event.nlu.intent.name
    if (temp.two_intent === true) {
      if (intent === temp.intent_top) {
        temp.intent = intent
      } else if (intent === temp.intent_low) {
        temp.intent = intent
      }
    } else if (temp.two_intent === false) {
      if (temp.intent_to_update === intent) {
        temp.intent = intent
      }
    }
    console.log(temp)

  }

  return myAction()