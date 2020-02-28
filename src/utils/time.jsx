import { post } from "utils/api";

const formatArray = arr => {
  if (arr.length === 1) {
    return arr[0];
  } else if (arr.length === 2) {
    return arr.join(" and ");
  } else if (arr.length > 2) {
    return arr.slice(0, -1).join(", ") + ", and " + arr.slice(-1);
  }
};

const appendLeadingZeroes = n => {
  if (n <= 9) {
    return "0" + n;
  }
  return n;
};
const today = new Date();
const dateToday =
  today.getFullYear() +
  "-" +
  appendLeadingZeroes(today.getMonth() + 1) +
  "-" +
  appendLeadingZeroes(today.getDate());

const postLog = param => {
  const { type, description, invoiceId } = param;
  const logData = {
    date: dateToday,
    time: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    }),
    type,
    description,
    invoiceId
  };
  post("/api/logs/create", logData);
};

export { postLog, formatArray };
