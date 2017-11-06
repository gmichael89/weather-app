export default (url) => fetch(url).then((response) => {
  if (response.status >= 400) {
    throw new Error('Bad response from server')
  }
  return response.json()

});
