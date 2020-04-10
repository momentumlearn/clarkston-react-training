/* globals fetch */

function getJSON (url) {
  return fetch(url, { headers: { Accept: 'application/json' } })
    .then(res => res.json())
}

export default getJSON
