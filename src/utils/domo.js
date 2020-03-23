export const token =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiQWRtaW4iLCJzY29wZSI6WyJkYXRhIiwidXNlciJdLCJkb21haW4iOiJib29tc291cmNpbmcuZG9tby5jb20iLCJleHAiOjE1ODQ5NTcwNjAsImVudiI6InByb2Q0IiwidXNlcklkIjo4MjE2MTI4MCwianRpIjoiZTljMmM5MzMtMGE1NS00N2VjLWFhZWEtODg5MTY5MzM1MjUxIiwiY2xpZW50X2lkIjoiYWZmNTliYWYtZTEwZi00YmFlLTg3YTQtNzIxMzQwOTUzYmMyIiwiY3VzdG9tZXIiOiJib29tc291cmNpbmcifQ.vuLYdwKapYWPhW4oeTCUVhcM-cpvQ_FefqdNbgAnKHbp2QP-X5FOZqQDYdeCoJulu8maI_6pcczDWRVHn0SHOJKDWAaK1IC1S7sw5tVuW0ANaPjJF7sjeDyH1FsYu56LIqdg_ou45NrRoC55V5UY3xKpebWAwnwRVz0gCRp7kRclctZhLeQFBtzMkYOHG3i42lcdZCVX1x6I4Reb0KTSawWTkH6Xxw-P79HWQ-XNHOhM-9jQgodXaxOzvWEI4fmzm_zFY0L6qvYmWMwWod83OlIkX_rZnuvQ6CPq0NNk5kztYLMLQ-LD1hjI-20hpPWcMA2CkBvJ8GcWWtobuixm5Q";
export const sql = data => {
  return {
    sql: `SELECT company, campaign, SUM(duration) FROM billable_hours WHERE (DATE(datetime_opened) >= '${data.start}') && (DATE(datetime_opened) <= '${data.end}') AND company = '${data.company}' GROUP BY company, campaign`
  };
};
