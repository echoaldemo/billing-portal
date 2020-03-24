export const token =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiQWRtaW4iLCJzY29wZSI6WyJkYXRhIiwidXNlciJdLCJkb21haW4iOiJib29tc291cmNpbmcuZG9tby5jb20iLCJleHAiOjE1ODUwMTU4NTAsImVudiI6InByb2Q0IiwidXNlcklkIjo4MjE2MTI4MCwianRpIjoiODU2YmQzYmEtN2FhMC00ZGUxLTgyNGMtMjBjNWJhOTZmYmVkIiwiY2xpZW50X2lkIjoiYWZmNTliYWYtZTEwZi00YmFlLTg3YTQtNzIxMzQwOTUzYmMyIiwiY3VzdG9tZXIiOiJib29tc291cmNpbmcifQ.LiWqG7frutnQaMzJbthfVmUPUBdxIe2xofrZGYgLr58Kjt2065IoFe7a-RQnAmJQfczo05bzbieDz1VlVsviDsa2XGh6kM6Pu7xeEdk-fImqnylE4Fd-T9teihWmT-6q89Ma6iSC9zByt8KBC_vJcg6kRSEGP7cHXO5g4a5y_VpxuNL4QOhjqyQzE90qjNjcPM6DsFRfmmBxAi3uf6_urE8QlZouuYYJ1El5GlsC_1MmCNbcygRmCYHNjkfPTOeAp-j30E160_bZ40aFtXoFfhOhc5cEahqCQIYXiWLMU7P2GR9P9VS3iJ2zq06XCKoCakA74sFop17FIdaA6iZRgA";
export const sql = data => {
  return {
    sql: `SELECT company, campaign, SUM(duration) FROM billable_hours WHERE (DATE(datetime_opened) >= '${data.start}') && (DATE(datetime_opened) <= '${data.end}') AND company = '${data.company}' GROUP BY company, campaign`
  };
};
