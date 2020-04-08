// 除法
export const accDiv = (arg1, arg2) => {
  var t1 = 0; var t2 = 0; var r1; var r2
  try { t1 = arg1.toString().split('.')[1].length } catch (e) { }
  try { t2 = arg2.toString().split('.')[1].length } catch (e) { }
  r1 = Number(arg1.toString().replace('.', ''))
  r2 = Number(arg2.toString().replace('.', ''))
  return accMul((r1 / r2), Math.pow(10, t2 - t1))
}

// 乘法
export const accMul = (arg1, arg2) => {
  let m = 0
  let s1 = (arg1 == null || arg1 === undefined) ? '0' : arg1.toString()
  let s2 = (arg2 == null || arg2 === undefined) ? '0' : arg2.toString()
  try { m += s1.split('.')[1].length } catch (e) { }
  try { m += s2.split('.')[1].length } catch (e) { }
  return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m)
}

// 加法
export const accAdd = (arg1, arg2) => {
  let r1, r2, m
  try { r1 = arg1.toString().split('.')[1].length } catch (e) { r1 = 0 }
  try { r2 = arg2.toString().split('.')[1].length } catch (e) { r2 = 0 }
  m = Math.pow(10, Math.max(r1, r2))
  return (accMul(arg1, m) + accMul(arg2, m)) / m
}
// 减法
export const accSub = (arg1, arg2) => {
  let r1, r2, m
  try { r1 = arg1.toString().split('.')[1].length } catch (e) { r1 = 0 }
  try { r2 = arg2.toString().split('.')[1].length } catch (e) { r2 = 0 }
  m = Math.pow(10, Math.max(r1, r2))
  return (accMul(arg1, m) - accMul(arg2, m)) / m
}
// 金额处理
export const formatCurrency = (num) => {
  num = num.toString().replace(/\$/g, '')
  if (isNaN(num)) { num = '0' }
  let sign = (num - 0 === (num = Math.abs(num)))
  num = Math.floor(num * 100 + 0.50000000001)
  let cents = num % 100
  num = Math.floor(num / 100).toString()
  if (cents < 10) { cents = '0' + cents }
  for (let i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++) {
    num = num.substring(0, num.length - (4 * i + 3)) + ',' +
      num.substring(num.length - (4 * i + 3))
  }
  return (((sign) ? '' : '-') + num + '.' + cents)
}
/**
 * 生成Guid
 * @param
 */
export const createGuid = () => {
  var CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
  var chars = CHARS
  var uuid = []
  var i
  // rfc4122, version 4 form
  var r
  // rfc4122 requires these characters
  uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
  uuid[14] = '4'
  for (i = 0; i < 36; i++) {
    if (!uuid[i]) {
      r = 0 | (Math.random() * 16)
      uuid[i] = chars[i === 19 ? (r & 0x3) | 0x8 : r]
    }
  }
  var ret = uuid.join('')
  return ret
}
