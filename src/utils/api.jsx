import axios from 'axios'

// const token =
//   'Bearer eyJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiZGlyIn0..JiK94QRzJr9b0Xu9T4NYpw.Gtom-h9GyiB_D497_3ZBzT2wsXmjqvISCOwPSE71KPgesHf9TEonQWj9uY2_b2WPlWtYIHTI7P5lwvrBoMxyHZxfxiwNM2qt4rRKz2PVEx4xb5ZFUGHprXHnG7fVZSrLyhQWwTl1U63Ztnd1N01I72K5uXYqG81fnsdDbxEgMt2OrXu-Cze1gQNZs4Bn3_Xlm1YDH2p3IxdaK5M9gF4nR1eCQc_TDQdiT9nfFZk0QnGGZWlELE_oTWD2H24d-SZil0JLzYcY1GhyMB7I7mBgb6wIAPU53vtviqzH0WnQviZPUmz123dpEfbSJh_bUtjjqU3_QC0exaU1OHhi2xQtTM_CIXmkT5_IZw2lK5qxrCMIrAsIN99ctV_0SA4uZHtQv-jLKnSOossrT_3j1wCBU7uExp08sSEdFbQrTtcerm1EJqDWVq-oNAytlhv4UACD3IwhYEX6ook09PeSuxDPGRQGI5siN4-u0lVzDWAXrw313XSUEgaw19HHzLx9aVesZYz6cG31bHp-b4p1KxFy542zuk_0T9KYq3UMVvF2Pvak7toh3aiFJiePVBy-6uiztWaVyg3kyx17HqGhuUqJHd0VLv8pOBZ-EIzucOnhW1oLnXFV52D0qZGRUOxPAF2YJ0at2xZGBddmNH4HWG69afhR2CgtXbZ82niBh3LdjUwFkAcIsBpJmfMIQjVj7t6HUuoZuVc6iBFckgLrbrKZLnyMwAORNxDq_ZVSfIngxDlOQd1rgRXaCbx8ZLTpYUpTrc4NmPUXi8FQvqj1KEHeM2tQ1bvfF_l54pW_CFKIIk1nIxMgWI_D38wkEhnsWP3fiEhYPl12AB7v6Nhc4vN2ytMHKIp0QPA6ZVzZvtD1SeAjX3ywcuHMQ1Y4y04ntP9QeNug-UbF_vCBb5Zc3dZvoA.uMF8fvbbGfB522FrL1tpZA'
axios.defaults.headers.common.Accept = 'application/json'
axios.defaults.headers.post['Content-Type'] = 'application/json'
// if (token != null) {
//   axios.defaults.headers.common['Authorization'] = `${token}`
// }

const baseUrl = 'http://localhost:8000'

const get = (endpoint, data) => axios.get(`${baseUrl}${endpoint}`, { data })
const post = (endpoint, data) => axios.post(`${baseUrl}${endpoint}`, { data })

export { get, post }
