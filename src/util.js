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

export function rank (key, out = 'Rank') {
  return (obj, i, arr) => ({
    [out]: i === arr.findIndex(o => o[key] === obj[key]) ? i + 1 : '',
    ...obj
  })
}
