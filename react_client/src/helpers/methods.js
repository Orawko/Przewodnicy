function formatDate(date) {
  let day = date.substr(0, date.indexOf("T"));
  let hour = date.substr(date.indexOf("T") + 1, 5);
  return day + " " + hour;
}

module.exports = {
  formatDate
};