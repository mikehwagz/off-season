import { component } from 'picoapp'
import choozy from 'choozy'
import { map } from '@selfaware/martha'

export default component((node, ctx) => {
  let { topText, bottomText } = choozy(node)

  let topSplits = split(topText)
  // let bottomSplits = split(bottomText)

  topSplits.forEach((char, i) => {
    let angle = map(i, 0, topSplits.length - 1, -70, 70)
    char.style.transform = `translateX(-50%) rotate(${angle}deg)`
  })
})

function split(el) {
  let text = el.textContent
  el.setAttribute('aria-label', text)
  el.innerHTML = `
    <span aria-hidden="true">${text
      .split('')
      .map((char) => `<span class="badge__char abs">${char}</span>`)
      .join('')}</span>`

  return Array.from(el.firstElementChild.children)
}
