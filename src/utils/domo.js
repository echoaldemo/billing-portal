export const token =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiQWRtaW4iLCJzY29wZSI6WyJkYXRhIiwidXNlciJdLCJkb21haW4iOiJib29tc291cmNpbmcuZG9tby5jb20iLCJleHAiOjE1ODUwMzk4NTYsImVudiI6InByb2Q0IiwidXNlcklkIjo4MjE2MTI4MCwianRpIjoiNzhlYTgwNGQtZDBiMC00Y2I3LTk3M2ItZmQ2MmQ5MDZjNDQzIiwiY2xpZW50X2lkIjoiYWZmNTliYWYtZTEwZi00YmFlLTg3YTQtNzIxMzQwOTUzYmMyIiwiY3VzdG9tZXIiOiJib29tc291cmNpbmcifQ.D76llINOWvlYx1k3Yxuif1JBmwjHHtxpv29aL_ojVFI0PFkeKWClzmi5odNZZuGS2dJvYBcH0T-qWs3W8R2ctE5OWQTFgJlmLVyV69vCRG1CQhaMtkKIJ09-LbrHtGwRhC3BYDgvw60U199z7-DMDm5TFvzeh_ck5xe29ms7lnxzYc2ZjfugIVWQH_cOCApayGxFvv2HBe0R-ZHuAmT5NAg7pH153Zrm9Y6Mmoty4zcLQ1ZREDzVslN7lVadCmuOqMFN17oBI0L0vBWBgkVJXzTS47l87d13LGCd-Yrkq5Wnsu3J-xuEqzxvxa9xVPudvnbxURPmgpQ12x3meo2k1Q";
export const sql = data => {
  return {
    sql: `SELECT company, campaign, SUM(duration) FROM billable_hours WHERE (DATE(datetime_opened) >= '${data.start}') && (DATE(datetime_opened) <= '${data.end}') AND company = '${data.company}' GROUP BY company, campaign`
  };
};
