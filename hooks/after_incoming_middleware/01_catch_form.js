  if (event.type === 'form-data' && event.payload.data) {
    const { firstName, lastName, phoneNumber, businessEmail } = event.payload.data
    console.log(firstName + lastName + businessEmail + phoneNumber)
    // do something
  }