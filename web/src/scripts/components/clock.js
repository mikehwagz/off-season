import { component } from 'picoapp'

export default component((node) => {
  update(node)
  setInterval(() => update(node), 1000)
})

function update(el) {
  el.innerHTML = `${getTime()} ET`
}

function getTime() {
  return new Date().toLocaleTimeString('en-GB', {
    timeZone: 'America/New_York',
  })
}
