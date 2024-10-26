  /**
   * Small description of your action
   * @title Log some info you code
   * @category Test
   * @author Your_Name
   */
  const myAction = async () => {
    // console.log(event.id)
    // console.log(session.userid)
    console.log('event: ')
    console.log(event)
        console.log('session storage: ')
        console.log(session)
    console.log('user storage: ')

    console.log(user)
  }

  return myAction()