import moment from 'moment'

export function cap (str) {
  return str[0].toUpperCase() + str.slice(1).toLowerCase()
}

export function replace (obj, k) {
  const [org, dst] = k.split(':')
  return { [cap(dst || org)]: obj[org] }
}

export function peek (...keys) {
  return obj => keys
    .map(k => replace(obj, k))
    .reduce((a, b) => ({ ...a, ...b }), {})
}

export function rank (key, out = 'rank') {
  return (obj, i, arr) => ({
    ...obj,
    [out]: i === arr.findIndex(o => o[key] === obj[key]) ? `#${i + 1}` : ''
  })
}

export function played (key, out = 'played') {
  return obj => ({ ...obj, [out]: moment(obj[key] || 0).fromNow() })
}
