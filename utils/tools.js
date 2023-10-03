// 格式化时间日期
export function formDate(time, type) {
  let year = new Date(time).getFullYear();
  let month = new Date(time).getMonth() + 1;
  let day = new Date(time).getDate();

  let hour = new Date(time).getHours();
  let minute = new Date(time).getMinutes();
  let seconds = new Date(time).getSeconds();

  month < 10 && (month = "0" + month);
  day < 10 && (day = "0" + day);
  hour < 10 && (hour = "0" + hour);
  minute < 10 && (minute = "0" + minute);
  seconds < 10 && (seconds = "0" + seconds);

  switch (type) {
    case "yyyy-mm-dd hh:mm:ss": {
      return `${year}-${month}-${day} ${hour}:${minute}:${seconds}`;
    }
    case "hh:mm:ss": {
      return `${hour}:${minute}:${seconds}`;
    }
    default: {
      return `${year}-${month}-${day}`;
    }
  }
}
