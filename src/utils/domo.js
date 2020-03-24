export const token =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiQWRtaW4iLCJzY29wZSI6WyJkYXRhIiwidXNlciJdLCJkb21haW4iOiJib29tc291cmNpbmcuZG9tby5jb20iLCJleHAiOjE1ODUwMjE2ODEsImVudiI6InByb2Q0IiwidXNlcklkIjo4MjE2MTI4MCwianRpIjoiN2NlODc5MWQtNGNiYy00ODE3LWFkNjgtZTQ5YTlhMGI4ODhhIiwiY2xpZW50X2lkIjoiYWZmNTliYWYtZTEwZi00YmFlLTg3YTQtNzIxMzQwOTUzYmMyIiwiY3VzdG9tZXIiOiJib29tc291cmNpbmcifQ.GjjYcbpNnrmRfKqLwENTCcgl1oDzel-TbUvH6wVCnFQByTgVB0i2qpsT2sXi5nquwrLSU6JcItr6RwTXAz9cGluOhzbShy5phwdgLLFEwIED3THHwmWQ000vqYJ1NNRmErAoa4leNxW309k6TjLSM9YrHtJDruwj_nEwO51Q7xpuBV1fabRl8zRAOpui_yEF1zKOnH-we6dQmkK3LBMTeRUgXWp63rm_lRvlcda71uIWxOFKD4BRbR7BMjfO6RgrR8OuHPChVDRQHQGMXva9DBJZWCA5gz1DOZgNXvT6NaindgjXuxfLe5_HZfE5eCazDHsNxECx81rrLbATyfcJJQ";
export const sql = data => {
  return {
    sql: `SELECT company, campaign, SUM(duration) FROM billable_hours WHERE (DATE(datetime_opened) >= '${data.start}') && (DATE(datetime_opened) <= '${data.end}') AND company = '${data.company}' GROUP BY company, campaign`
  };
};
