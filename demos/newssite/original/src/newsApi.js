/*
The free tier of News API has a limit of 500 requests per day,
so I am caching those requests for 5 minutes to prevent going
over that limit.
*/

import axios from 'axios'
import lscache from 'lscache'

const newsApiKey = process.env.REACT_APP_NEWS_API_KEY

export const newsApi = axios.create({
  baseURL: 'https://newsapi.org/v2/'
})
newsApi.defaults.headers.common['X-Api-Key'] = newsApiKey

const fetchSources = function () {
  return newsApi.get('sources?country=us')
}

const fetchHeadlines = function () {
  return newsApi.get('top-headlines?country=us')
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
    }
  })
}

export const getSources = function () {
  const trustedSources = [
    'the-washington-post',
    'techcrunch',
    'google-news',
    'cnn',
    'cbs-news',
    'reuters'
  ]

  return getFromCacheOrFetch('newsSources', fetchSources, 10)
}

export const getHeadlines = function () {
  return getFromCacheOrFetch('newsHeadlines', fetchHeadlines, 5)
}
