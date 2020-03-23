export const token =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiQWRtaW4iLCJzY29wZSI6WyJkYXRhIiwidXNlciJdLCJkb21haW4iOiJib29tc291cmNpbmcuZG9tby5jb20iLCJleHAiOjE1ODQ5NTMxMTYsImVudiI6InByb2Q0IiwidXNlcklkIjo4MjE2MTI4MCwianRpIjoiODNjZjFkMjMtMmYwYy00ODAzLTkyYmEtN2EzYzE5N2ZjMjNhIiwiY2xpZW50X2lkIjoiYWZmNTliYWYtZTEwZi00YmFlLTg3YTQtNzIxMzQwOTUzYmMyIiwiY3VzdG9tZXIiOiJib29tc291cmNpbmcifQ.foFMELSaQzX0kzHoidif43pRTuYkCAdndj2hlEC296KMtLbqS3uhe70H7EST8VX0qdWjNSB_aP9yb1lOehDSIgEcpn3W7QIL5y_iU0mZ3l1UN1g4aQsV0cdTTEHNNPedyIeKY6Jk8gqP7kkWuWf_joZfjN0FkjKG0ttpUf1qgd_jBSk6yqy232sKw3xDuk6DJnAR_JJZ_jzl9qeGWkABO6x2rmxwvM50QdSWAqXPY8lfvJYLlcThZElM0-PUgnYY3r7yC4MpEcOy2J_5piy9QtJTLn4Vx90cGQwlPp7ojHvZiuOPrpkxnmloqi2tIPcJQaoVTxfypBl6G5oSQEalMg";
export const sql = data => {
  return {
    sql: `SELECT company, campaign, SUM(duration) FROM billable_hours WHERE (DATE(datetime_opened) >= '${data.start}') && (DATE(datetime_opened) <= '${data.end}') AND company = '${data.company}' GROUP BY company, campaign`
  };
};
