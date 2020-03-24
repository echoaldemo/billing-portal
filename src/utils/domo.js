export const token =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiQWRtaW4iLCJzY29wZSI6WyJkYXRhIiwidXNlciJdLCJkb21haW4iOiJib29tc291cmNpbmcuZG9tby5jb20iLCJleHAiOjE1ODUwMzkwNTgsImVudiI6InByb2Q0IiwidXNlcklkIjo4MjE2MTI4MCwianRpIjoiNjYwYWEwYTQtNjJmYy00NzRhLWE2OTAtNDU5NGM2MWIyNjBkIiwiY2xpZW50X2lkIjoiYWZmNTliYWYtZTEwZi00YmFlLTg3YTQtNzIxMzQwOTUzYmMyIiwiY3VzdG9tZXIiOiJib29tc291cmNpbmcifQ.EgQdJFt6W4hpgMtCDJk2Q8cyknaIAZE1fRPDx0HsF2UBEUf1v9mCT7vzARrDPxtxZzMGghXoNB_qxuHBZmeNE0lb5c6vbdn-tLFYBk8s_q-sg-4YqMMD88h7psga0I8A4S2aPhQiLSUr7fn9rm0q0n1Zv_MoHKj8cnkWnCozo88tOc5AP1mAxbz6O0geT3pDlu778yQClyjAal_d_HVljdOPyEbWWWro2BLAVOwVkAN4c0_ivqB6u9Jh-NszM4mOy0vgG9Af-G6jvWYqOyHjtcHkLcWSoZC0okAqSM135hw_p_8TPetY2V7V4PF_kljNXnsit07nWLLhQLqc8JFwcg";
export const sql = data => {
  return {
    sql: `SELECT company, campaign, SUM(duration) FROM billable_hours WHERE (DATE(datetime_opened) >= '${data.start}') && (DATE(datetime_opened) <= '${data.end}') AND company = '${data.company}' GROUP BY company, campaign`
  };
};
