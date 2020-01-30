/* eslint-disable */
import { getRandomInt } from "utils/func"
const createData = (invoice, invoice_type, company, campaigns, start_date, due_date, total, status) => {

  return { invoice, invoice_type, company, campaigns, start_date, due_date, total, status }
}

const getRandomMonth = () => {
  const months = ["January", "February", "December"]

  return `${months[getRandomInt(3)]} ${getRandomInt(30)}, 201${getRandomInt(9)} `

}

const mockData = () => {


  const Arr = []

  for (let i = 1; i <= 100; i++) {
    Arr.push(createData(`${getRandomInt(32), getRandomInt(452), getRandomInt(42214214)}`, `${getRandomInt(2) === 1 ? "Automatic" : "Manual"}`, `Company ${i}`, `n/a`, `${getRandomMonth()}`, getRandomMonth(), getRandomInt(10000)))
  }
  return Arr


}

export { mockData }