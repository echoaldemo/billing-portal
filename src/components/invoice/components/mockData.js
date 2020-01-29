const createData = (invoice, invoice_type, company, campaigns, start_date, due_date, total, status) => {

  return { invoice, invoice_type, company, campaigns, start_date, due_date, total, status }
}

const mockData = () => {
  const Arr = [
    createData("x", "asd", "sd", "Asd", "ad", "asd", "asdf", "adf"),
    createData("x", "asd", "sd", "Asd", "ad", "asd", "asdf", "adf"),
    createData("x", "asd", "sd", "Asd", "ad", "asd", "asdf", "adf"),
    createData("x", "asd", "sd", "Asd", "ad", "asd", "asdf", "adf"),
    createData("x", "asd", "sd", "Asd", "ad", "asd", "asdf", "adf"),
    createData("x", "asd", "sd", "Asd", "ad", "asd", "asdf", "adf"),
    createData("x", "asd", "sd", "Asd", "ad", "asd", "asdf", "adf"),
    createData("x", "asd", "sd", "Asd", "ad", "asd", "asdf", "adf"),
    createData("x", "asd", "sd", "Asd", "ad", "asd", "asdf", "adf"),
    createData("x", "asd", "sd", "Asd", "ad", "asd", "asdf", "adf"),
    createData("x", "asd", "sd", "Asd", "ad", "asd", "asdf", "adf"),
    createData("x", "asd", "sd", "Asd", "ad", "asd", "asdf", "adf"),
    createData("x", "asd", "sd", "Asd", "ad", "asd", "asdf", "adf"),


  ]

  return Arr


}

export { mockData }