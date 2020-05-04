import { component } from 'picoapp'
import { on, add, rect } from '@selfaware/martha'
import { gsap } from 'gsap'

export default component((node, ctx) => {
  const speed = node.dataset.speed || 0.25
  const pausable = typeof node.dataset.pausable !== 'undefined'
  const reverse = node.dataset.reverse
  const parentBounds = node.parentElement.getBoundingClientRect()

  let offset = 0
  let isPaused = false
  let contentWidth = null
  let requiredReps = null

  const wrapper = setupWrapper()
  const content = setupContent()

  setupEvents()

  wrapper.appendChild(content)
  node.appendChild(wrapper)

  function setupWrapper() {
    const wrapper = document.createElement('div')
    add(wrapper, 'nowrap')
    add(wrapper, 'wct')
    return wrapper
  }

  function setupContent() {
    const content = node.children[0]
    add(content, 'dib')
    contentWidth = getWidth(content)

    requiredReps =
      contentWidth > parentBounds.width
        ? 2
        : Math.ceil((parentBounds.width - contentWidth) / contentWidth) + 1

    for (let i = 0; i < requiredReps; i++) {
      createClone(content)
    }

    if (reverse) {
      offset = contentWidth * -1
    }

    add(node, 'is-init')

    return content
  }

  function createClone(content) {
    const clone = content.cloneNode(true)
    add(clone, 'dib')
    wrapper.appendChild(clone)
  }

  function setupEvents() {
    let previousWidth = ctx.getState().width

    ctx.on('resize', ({ width }) => {
      const isLarger = previousWidth < width
      const difference = width - previousWidth

      repopulate(difference, isLarger)

      previousWidth = width
    })

    ctx.on('tick', () => {
      if (isPaused) return

      contentWidth = getWidth(content)

      const isScrolled = reverse ? offset < 0 : offset > contentWidth * -1
      const direction = reverse ? -1 : 1
      const reset = reverse ? contentWidth * -1 : 0

      if (isScrolled) {
        offset -= speed * direction
      } else {
        offset = reset
      }

      gsap.set(wrapper, { x: offset })
    })

    if (pausable) {
      on(node, 'mouseenter', () => {
        isPaused = true
      })

      on(node, 'mouseleave', () => {
        isPaused = false
      })
    }
  }

  function repopulate(difference, isLarger) {
    contentWidth = getWidth(content)

    if (isLarger) {
      const amount = Math.ceil(difference / contentWidth) + 1

      for (let i = 0; i < amount; i++) {
        createClone(content)
      }
    }
  }
})

function getWidth(el) {
  return rect(el).width
}
