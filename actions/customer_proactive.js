  /**
   * Small description of your action
   * @title care of Customer profile & all reservations he have.
   * @category API customer
   * @author Fahd Soliman
   */
  const myAction = async () => {
    console.log(session.userReservations)
    var date = new Date().toJSON().slice(0, 10)
    var reservations = []
    if (session.userReservations) {
      if (session.userReservations.services.length !== 0) {
        session.userReservations.services.resdomain.forEach(async obj => {
          console.log('bill_file: ' + obj.bill_file)
          var is_expire = false,
            is_require_bill = false
          if (obj.bill_file === null) {
            is_require_bill = true
          }
          if (obj.expire_date < date) {
            is_expire = true
          }
          reservations.push({
            my_product: obj.my_product,
            product_type: 'احجز نطاق',
            domain_name: obj.domain_name,
            expired: is_expire,
            bill: is_require_bill
          })
          // console.log(reservations.pop())
        })
        session.userReservations.services.hostdomain.forEach(async obj => {
          console.log('bill_file: ' + obj.bill_file)
        })
        session.userReservations.services.sharedhosting.forEach(async obj => {
          console.log('bill_file: ' + obj.bill_file)
          var is_expire = false,
            is_require_bill = false
          if (obj.bill_file === null) {
            is_require_bill = true
          }
          if (obj.expire_date < date) {
            is_expire = true
          }
          reservations.push({
            my_product: obj.my_product,
            product_type: 'استضافة مشتركة',
            domain_name: obj.website_name,
            expired: is_expire,
            bill: is_require_bill
          })
          // console.log(reservations.pop())
        })
        session.userReservations.services.vps.forEach(async obj => {
          console.log('bill_file: ' + obj.bill_file)
        })
        console.log(reservations)
        session.userCare = reservations
      }
    }
  }

  return myAction()