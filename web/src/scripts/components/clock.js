import { component } from 'picoapp'

export default component((node) => {
  update(node)
  setInterval(() => update(node), 1000)
})

function update(el) {
  let d = new Date()
  let h = pad(d.getHours())
  let m = pad(d.getMinutes())
  let s = pad(d.getSeconds())
  el.innerHTML = `${h}:${m}:${s} ET`
}

function pad(n) {
  return n.toString().padStart(2, '0')
}
