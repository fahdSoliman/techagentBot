  /**
   * Small description of your action
   * @title The title displayed in the flow editor
   * @category test fields
   * @author Your_Name
   */
  const myAction = async () => {
    console.log('temp: ' + temp)
    console.log('fields to update: ' + temp.fields_to_update)
    console.log(temp.fields_to_update)
    // temp.fields_to_update.forEach(async obj => {
    //   console.log('obj: ' + obj)
    // })
  }

  return myAction()