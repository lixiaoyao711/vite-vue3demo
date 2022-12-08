// 节流（高频事件触发，但在 n 秒内只会执行一次，所以节流会稀释函数的执行频率）
export function throttle(func, delay) {
  let prev = Date.now();
  return function(...args) {
      let now = Date.now();
      if (now - prev >= delay) {
          func.apply(this, args);
          prev = Date.now();
      }
  };
}

/**
 * @name: 自动转换 根据fmt返回时间类型 （yyyy:MM:dd hh:mm:ss 自动转换）
 * 例子：1982-3-27  yy年M月d日 82年3月27日
 * 例子：1982-3-7  yy年MM月dd日 82年03月07日
 * @param {*} timeDate
 * @param {*} fmt
 */
 export function timeFormat(timeDate, fmt = 'yyyy-MM-dd hh:mm:ss') {
  if (!timeDate) {
    return '';
  }
  if (Number(timeDate)) {
    timeDate = Number(timeDate);
  }
  let time = new Date(timeDate); //debugger;
  let o = {
    'M+': time.getMonth() + 1, //月份
    'd+': time.getDate(), //日
    'h+': time.getHours(), //小时
    'm+': time.getMinutes(), //分
    's+': time.getSeconds(), //秒
    'q+': Math.floor((time.getMonth() + 3) / 3), //季度
    S: time.getMilliseconds(), //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (time.getFullYear() + '').substr(4 - RegExp.$1.length));
  for (let k in o)
    if (new RegExp('(' + k + ')').test(fmt))
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
  return fmt;
}

//字符串yyyy-mm-dd转换时间戳
export function yyyymmddFormatTimestamp(time) {
  return new Date(time).getTime() / 1000;
}

// 计算时间(时间类型字符串-数值天数)
export function countTime(time, day) {
  time = new Date(time).getTime() / 1000;
  day = day * 86400;
  //中国标准时间转换年月日
  return timeFormat(new Date((time - day) * 1000));
}
// 生成随机的唯一id
export function guid() {
  return 'xxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = (Math.random() * 16) | 0,
          v = c == 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16).toUpperCase();
  });
}
// 获取url中的token并截取下来
export function getQueryVariable(variable) {
  let query = window.location.search.substring(1);
  let vars = query.split('&');
  for (let i = 0; i < vars.length; i++) {
      let pair = vars[i].split('=');
      if (pair[0] == variable) {
          return pair[1];
      }
  }
  return false;
}



//定时检查tokne是否过期
export const checkTokenTime = (expTime, checkTime) => {
  // 定时时候的时间
  let date = new Date();
  // 转换成秒显示
  date = parseInt(date.getTime() / 1000);
  console.log('expTime', expTime);
  console.log('date', date);
  console.log(expTime - date);
  // 如果<=0证明过期了
  return expTime - date <= checkTime ? true : false;
};

// 如果用户在操作的时候,token过期时间减去当前的时间小于设置的时间,那么更新token到Authorization,并且重新将token的过期时间设置到localStorage
export const updateToken = async (timer, config) => {
  let date = new Date();
  // 获取token过期时间
  let tokenTime = parseInt(JSON.parse(localStorage.userinfo).expirationTime / 1000);
  let countTime = Number(tokenTime) - parseInt(date.getTime() / 1000);
  // 过期时间减去当前时间的值是否小于半小时且大于0,如果是就更新token,如果不是就不用
  if (countTime > 0 && countTime < timer) {
      // 获取新的token过期时间,并且覆盖掉原来得
      const res = await axios.get('/user/getAccessToken');
      localStorage.setItem('userinfo', JSON.stringify(res.data));
  }
};

//获得当前年份和月份有多少天,返回值为数组[0]为年天数,[1]为月天数
export function getDuration() {
  // how many days of this month
  let days = [];
  let dt = new Date();
  let year = new Date().getFullYear();
  // 年天数
  if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
      days[0] = 366;
  } else {
      days[0] = 365;
  }
  var month = dt.getMonth();
  dt.setMonth(dt.getMonth() + 1);
  dt.setDate(0);
  // 月天数
  days[1] = dt.getDate();
  return days;
}
