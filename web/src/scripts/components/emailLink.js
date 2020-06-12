import { component } from 'picoapp'
import { on, add, remove } from '@selfaware/martha'
import gsap from 'gsap'

export default component((node, ctx) => {
  add(node, 'rel')

  let idle = true

  let offClick = on(node, 'click', (ev) => {
    ev.preventDefault()

    if (!idle) return

    idle = false

    add(node, 'is-active')

    let email = node.getAttribute('href').slice('mailto:'.length)

    clipboardCopy(email).then(() => {
      let el = document.createElement('span')
      el.textContent = 'COPIED'
      add(el, 'sans', 'f14', 'ba', 'br50', 'bg-gray', 'abs', 'pt5', 'ph5')

      gsap.set(el, {
        paddingBottom: '3px',
        left: '50%',
        top: '50%',
        xPercent: -50,
        yPercent: -50,
        rotation: 3,
      })

      node.append(el)

      gsap.to(el, {
        delay: 3,
        duration: 0.2,
        ease: 'quart',
        opacity: 0,
        onComplete: () => {
          el.remove()
          remove(node, 'is-active')
          idle = true
        },
      })
    })
  })

  return () => {
    offClick()
  }
})

function clipboardCopy(text) {
  // Use the Async Clipboard API when available. Requires a secure browsing
  // context (i.e. HTTPS)
  if (navigator.clipboard) {
    return navigator.clipboard.writeText(text).catch(function(err) {
      throw err !== undefined
        ? err
        : new DOMException('The request is not allowed', 'NotAllowedError')
    })
  }

  // ...Otherwise, use document.execCommand() fallback

  // Put the text to copy into a <span>
  var span = document.createElement('span')
  span.textContent = text

  // Preserve consecutive spaces and newlines
  span.style.whiteSpace = 'pre'

  // Add the <span> to the page
  document.body.appendChild(span)

  // Make a selection object representing the range of text selected by the user
  var selection = window.getSelection()
  var range = window.document.createRange()
  selection.removeAllRanges()
  range.selectNode(span)
  selection.addRange(range)

  // Copy text to the clipboard
  var success = false
  try {
    success = window.document.execCommand('copy')
  } catch (err) {
    console.log('error', err)
  }

  // Cleanup
  selection.removeAllRanges()
  window.document.body.removeChild(span)

  return success
    ? Promise.resolve()
    : Promise.reject(
        new DOMException('The request is not allowed', 'NotAllowedError'),
      )
}
