import { component } from 'picoapp'

export default component((node) => {
  setInterval(() => {
    let d = new Date()
    let h = pad(d.getHours())
    let m = pad(d.getMinutes())
    let s = pad(d.getSeconds())
    node.innerHTML = `${h}:${m}:${s} ET`
  }, 1000)
})

function pad(n) {
  return n.toString().padStart(2, '0')
}
