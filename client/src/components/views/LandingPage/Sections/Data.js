const continents = [
  {
    _id: 1,
    name: "Africa",
  },
  {
    _id: 2,
    name: "Europe",
  },
  {
    _id: 3,
    name: "Asia",
  },
  {
    _id: 4,
    name: "North America",
  },
  {
    _id: 5,
    name: "South America",
  },
  {
    _id: 6,
    name: "Australia",
  },
  {
    _id: 7,
    name: "Antarctica",
  },
];

const price = [
  {
    _id: 0,
    name: "Any",
    array: [],
  },
  {
    _id: 1,
    name: "$0 to $ 2999",
    array: [0, 2999],
  },
  {
    _id: 2,
    name: "$3000 to $ 4999",
    array: [3000, 4999],
  },
  {
    _id: 3,
    name: "$5000 to $ 6999",
    array: [5000, 6999],
  },
  {
    _id: 4,
    name: "$7000 to $ 8999",
    array: [7000, 8999],
  },
  {
    _id: 5,
    name: "More than $9000",
    array: [9000, 999999999],
  },
];

export { continents, price };
