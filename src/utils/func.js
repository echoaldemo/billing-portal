function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
const truncate = (input, length, end) =>
  input.length > 5 ? `${input.substring(0, length)}${end}` : input;

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}
function getSorting(order, orderBy) {
  return order === "desc"
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}

const compute = (x, y) => {
  if (x * y) return formatter.format(x * y);
  else return "";
};

const computeInt = (x, y) => {
  return x * y;
};

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2
});
export {
  truncate,
  createData,
  getRandomInt,
  desc,
  stableSort,
  getSorting,
  formatter,
  compute,
  computeInt
};
