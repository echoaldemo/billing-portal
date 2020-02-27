import React from "react";
import moment from "moment";

const getFromNow = (date, time) => {
  const s = `${date} ${time}`;
  const bits = s.split(/\D/);
  const newDate = new Date(bits[0], bits[1], bits[2], bits[3], bits[4]);
  let fromNow = moment(newDate).fromNow();
  let value = `  ${date} ${time}`;
  const style = {
    fontSize: 10,
    letterSpacing: 1
  };
  return (
    <div>
      <span style={{ fontSize: 10 }}>{fromNow}</span> •
      <span style={style}>{value}</span>
    </div>
  );
};
const bubbleColor = summary => {
  if (summary.indexOf("deleted") !== -1) {
    return { border: "2px solid rgb(255, 43, 43)" };
  } else if (summary.indexOf("modified") !== -1) {
    return { border: "2px solid rgb(206, 193, 44)" };
  } else {
    return { border: "2px solid rgb(33, 154, 42)" };
  }
};
const getPronoun = (desc, name) => {
  if (desc.indexOf(name) !== -1) return desc.replace(name, "You");
  else return desc;
};

export { getFromNow, bubbleColor, getPronoun };

/* const mock = [
  {
    summary: "Jude Agagad sent an invoice to Rapid Response.",
    icon: <Email />,
    time: "2020-28-01 10:06 PM"
  },
  {
    summary: "You issued an invoice to Shift44.",
    icon: <Add />,
    time: "2020-28-01 10:06 PM"
  },
  {
    summary: "Jomar Bandol modified an invoice for Rapid Response.",
    icon: <Edit />,
    time: "2020-28-01 10:06 PM"
  },
  {
    summary: "John Paul Garcia modified information of Shift44",
    icon: <Edit />,
    time: "2020-28-01 10:06 PM"
  },
  {
    summary: "Jules Ballaran deleted an invoice for Rapid Response.",
    icon: <Delete />,
    time: "2020-28-01 10:06 PM"
  },
  {
    summary: "You sent an invoice to Rapid Response.",
    icon: <Email />,
    time: "2020-28-01 10:06 PM"
  },
  {
    summary: "Sidney Bercasio deleted an invoice for Shift44.",
    icon: <Delete />,
    time: "2020-28-01 10:06 PM"
  },
  {
    summary: "John Paul Garcia modified information of Shift44",
    icon: <Edit />,
    time: "2020-28-01 10:06 PM"
  },
  {
    summary: "Samuel Lopez issued an invoice for Rapid Response.",
    icon: <Add />,
    time: "2020-28-01 10:06 PM"
  },
  {
    summary: "Samuel Lopez issued an invoice for Rapid Response.",
    icon: <Add />,
    time: "2020-28-01 10:06 PM"
  },
  {
    summary: "Sidney Bercasio deleted an invoice for Shift44.",
    icon: <Delete />,
    time: "2020-28-01 10:06 PM"
  }
]; */
