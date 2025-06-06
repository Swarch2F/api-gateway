/* const fetch = require('node-fetch');

async function fetchHolaMundo(url) {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: '{ holaMundo }' })
  });
  const json = await response.json();
  return json.data.holaMundo;
}

module.exports = { fetchHolaMundo }; */