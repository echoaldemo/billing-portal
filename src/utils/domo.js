export const token =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiQWRtaW4iLCJzY29wZSI6WyJkYXRhIiwidXNlciJdLCJkb21haW4iOiJib29tc291cmNpbmcuZG9tby5jb20iLCJleHAiOjE1ODUxMjU5MDIsImVudiI6InByb2Q0IiwidXNlcklkIjo4MjE2MTI4MCwianRpIjoiYjc5MDZlN2MtZmMyZC00MWEzLWE4YzAtZjE2NmE5NDA5NzQwIiwiY2xpZW50X2lkIjoiYWZmNTliYWYtZTEwZi00YmFlLTg3YTQtNzIxMzQwOTUzYmMyIiwiY3VzdG9tZXIiOiJib29tc291cmNpbmcifQ.v7qiG3I1gQh0c2Firz4jCVRmK8N7waSMZCbVNoAqfT7TjjdLOlJKbxm1Ajz-nOjMkKOLTu31k4Qd2Aafl77IbchB9wNz_7Vxvd3G9cIMbUeRtXRBNLtNZUG1F7J9UUNvnkgViCtT4vZjuQFMOZgYekgGUVrR7-RvWQkuBY6HLWhzPSS4FebgfNNRcbV7zYpShC4craez-zY9NbCILVreO3MD9i7Zl17hJK2OqlfM5QgVGBZBxkwgN3zVnkhlHMpdPvqOvseETrbzf7PtRbEqupCMbmYsJGA9IwRa2Zik5H5cNxt4_A4GZVY4BJa55TLS4eEmOh7qkgzTD_74XcJF6g";
export const sql = data => {
  return {
    sql: `SELECT company, campaign, SUM(duration) FROM billable_hours WHERE (DATE(datetime_opened) >= '${data.start}') && (DATE(datetime_opened) <= '${data.end}') AND company = '${data.company}' GROUP BY company, campaign`
  };
};
