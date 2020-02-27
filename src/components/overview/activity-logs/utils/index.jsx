import React from "react";
import moment from "moment";

const getFromNow = (date, time) => {
  let temp = moment(time, "h:mm A").format("HH:mm");
  const s = `${date} ${temp}`;
  const bits = s.split(/\D/);
  const newDate = new Date(bits[0], --bits[1], bits[2], bits[3], bits[4]);
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
