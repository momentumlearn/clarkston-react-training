/*
The free tier of News API has a limit of 500 requests per day,
so I am caching those requests for 5 minutes to prevent going
over that limit.
*/

import axios from 'axios'
import lscache from 'lscache'

export const newsApi = axios.create({
  baseURL: 'https://newsapi.org/v2/'
})

const fetchSources = function (apiKey) {
  return newsApi.get('sources?country=us', {
    headers: { 'X-Api-Key': apiKey }
  })
}

const fetchHeadlines = function (apiKey) {
  return newsApi.get('top-headlines?country=us', {
    headers: { 'X-Api-Key': apiKey }
  })
}

const fetchSourceHeadlines = function (apiKey, ...sourceIds) {
  return newsApi.get(`everything?sources=${sourceIds.join(',')}`, {
    headers: { 'X-Api-Key': apiKey }
  })
}

const getFromCacheOrFetch = function (key, fetchFn, expiration) {
  return new Promise(function (resolve, reject) {
    const cachedData = lscache.get(key)
    if (cachedData) {
      resolve(JSON.parse(cachedData))
    } else {
      fetchFn()
        .then(res => {
          if (res.status === 200 && res.data) {
            lscache.set(key, JSON.stringify(res.data), expiration)
            resolve(res.data)
          } else {
            reject(res.data)
          }
        })
        .catch(err => reject(err))
    }
  })
}

export const getSources = function (apiKey) {
  return getFromCacheOrFetch('newsSources', () => fetchSources(apiKey), 10)
}

export const getHeadlines = function (apiKey) {
  return getFromCacheOrFetch('newsHeadlines', () => fetchHeadlines(apiKey), 5)
}

export const getSourceHeadlines = function (apiKey, ...sourceIds) {
  return getFromCacheOrFetch(
    `headlines-${sourceIds.join('-')}`,
    () => fetchSourceHeadlines(apiKey, ...sourceIds),
    5)
}
