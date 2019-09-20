// const moment = require("moment");
// date_of_birth = moment(toNumber).format("DD-MM-YYYY");
// console.log(date_of_birth);

// let today = Date.now()
// today = moment(today).format("DD-MM-YYYY");
// console.log(today)

const dateTodayWithoutYear = () => {
  const today = new Date();
  // console.log(today);
  const monthFromToday = today.getMonth();
  const dateFromToday = today.getDate();
  const monthDatePairFromToday = [monthFromToday, dateFromToday];
  // console.log(dateFromToday, monthFromToday);
  return monthDatePairFromToday;
}

const isBirthday = (date_of_birth) => {
  const toNumber = new Number(date_of_birth);
  date_of_birth = new Date(toNumber);
  // console.log(date_of_birth);
  const monthFromBirthday = date_of_birth.getMonth();
  const dateFromBirthday = date_of_birth.getDate();
  const monthDatePairFromUser = [monthFromBirthday, dateFromBirthday];
  // console.log(monthFromBirthday, dateFromBirthday);

  const monthDatePairFromToday = dateTodayWithoutYear();
  // console.log(dateFromToday, monthFromToday);

  const conclusion = monthDatePairFromUser === monthDatePairFromToday

  if (conclusion) {
    console.log("Today is his birthday.")
  } else {
    console.log("Today is not his birthday.")
  }
  return conclusion
}

const isBlackFriday = () => {
  const monthDatePairFromToday = dateTodayWithoutYear();
  const monthDatePairFromBlackfriday = [10, 24] // month and day start from 0 11/25

  const conclusion = monthDatePairFromToday === monthDatePairFromBlackfriday;

  if (conclusion) {
    console.log("Today is the black friday.")
  } else {
    console.log("Today is not black friday.")
  }
  return conclusion
}

module.exports = {
  isBirthday,
  isBlackFriday
}