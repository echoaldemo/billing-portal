export const token =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiQWRtaW4iLCJzY29wZSI6WyJkYXRhIiwidXNlciJdLCJkb21haW4iOiJib29tc291cmNpbmcuZG9tby5jb20iLCJleHAiOjE1ODQ5NDgwOTgsImVudiI6InByb2Q0IiwidXNlcklkIjo4MjE2MTI4MCwianRpIjoiMWY5M2FiYmItNTIwNC00NGM2LWJlNjgtMmQ3MDViOWZlN2U4IiwiY2xpZW50X2lkIjoiYWZmNTliYWYtZTEwZi00YmFlLTg3YTQtNzIxMzQwOTUzYmMyIiwiY3VzdG9tZXIiOiJib29tc291cmNpbmcifQ.UvvzBZwEkP_-cdVbU7YZID_qVCUOZpnu0Q7FRMUAsVgZM7lMZBV0Da2fgqp32td3KrkFRC6QsLv35bnNTm4vaxHn73FqnrTIIURQql0ZS2z9QhX2l7LRD9SosA7iq8ACw3b_gbsh0iH00yL_e1ocj-TL4Yp53NjLnA6olCVL5u17WhR2ejTbkzhZdGGuyI1qzahRFU3BW6tuKCCgHykEhZo4JyuoZNtjjPCvK2Avty0pQ0zj7LCl3Qofd1I8pxvY4c-lUaJe2OIcjk7tNOKvdmIjLWSOZKYSRIDhGhNRiTpxacNRzXTQkCiVidCi0IJwrjbx21b05BeeFWJocpDXAg";
export const sql = data => {
  return {
    sql: `SELECT company, campaign, SUM(duration) FROM billable_hours WHERE (DATE(datetime_opened) >= '${data.start}') && (DATE(datetime_opened) <= '${data.end}') AND company = '${data.company}' GROUP BY company, campaign`
  };
};
