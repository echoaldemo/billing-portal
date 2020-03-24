export const token =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiQWRtaW4iLCJzY29wZSI6WyJkYXRhIiwidXNlciJdLCJkb21haW4iOiJib29tc291cmNpbmcuZG9tby5jb20iLCJleHAiOjE1ODUwNDM2NDksImVudiI6InByb2Q0IiwidXNlcklkIjo4MjE2MTI4MCwianRpIjoiOTViMjE3NmYtMDM3Yy00OGNlLWEzYjMtMjgzMjJlMmI0N2ZjIiwiY2xpZW50X2lkIjoiYWZmNTliYWYtZTEwZi00YmFlLTg3YTQtNzIxMzQwOTUzYmMyIiwiY3VzdG9tZXIiOiJib29tc291cmNpbmcifQ.sTPwvy1ZIrkYpKgevydTXPUAIdA9jKyd1aNvEwIxCh5YqGdLfAE7DcPfDqe5EZtIV7dt_QfKyR-W1ID1S2vDD-GUb1lxwp7nJDyuyw7dJLk95euTjqCfCnGRDUtp7MoXN8H3w06rGEDqIb_v1x9cL__FNV_9BDgcxiZEfwFRGBxARHtdO3Iv4gEDFvUtKlPqKqF0k31KWRcRGqDKpDsPeOtWui81hfHhBnAxWfOCYnG7btAC2_Gxua27pL2UM-ZfNCBE-HQncuvi0y8VlPV2spnI_I82iixpAi8mB6MMgXaVf-ea-Psm2btiZJGyqMrS5yfo9DdEEVbQU7DZADLwug";
export const sql = data => {
  return {
    sql: `SELECT company, campaign, SUM(duration) FROM billable_hours WHERE (DATE(datetime_opened) >= '${data.start}') && (DATE(datetime_opened) <= '${data.end}') AND company = '${data.company}' GROUP BY company, campaign`
  };
};
