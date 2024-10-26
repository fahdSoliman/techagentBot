  /**
   * Small description of your action
   * @title set resDomain fields to session storage
   * @category fields
   * @author Fahd_soliman
   * @param {string} value - value of field
   * @param {string} jump - name of the node to jumpTo if excist
   */
  const fields = {
    'عنوان النطاق': 'domain_name',
    'مخدم الأسماء الاولي': 'primary_name_server',
    'مخدم الاسماء الثانوي': 'secondary_name_server',
    'شركة الاستضافة': 'hosting_company'
  }

  const myAction = async (value, jump) => {
    console.log(value)
    const target = event.state.context.currentFlow
    if (temp.fields_to_update[fields[session.slots.fields.value]]) {
      const sessionId = bp.dialog.createId(event)
      bp.dialog.jumpTo(sessionId, event, target, jump)
    } else {
      if (fields[session.slots.fields.value] === 'domain_name') {
        temp.fields_to_update[fields[session.slots.fields.value]] = 'http://' + value
      } else {
        temp.fields_to_update[fields[session.slots.fields.value]] = value
      }
    }
  }

  return myAction(args.value, args.jump)