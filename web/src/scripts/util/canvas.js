export default function createCanvas(parent) {
  let canvas = document.createElement('canvas')
  let ctx = canvas.getContext('2d', {
    antialias: false,
    depth: false,
  })

  if (parent) {
    parent.appendChild(canvas)
  }

  return {
    el: canvas,
    ctx,
    resize({ width, height, dpr }) {
      this.w = width * dpr
      this.h = height * dpr
      canvas.width = this.w
      canvas.height = this.h
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
    },
  }
}
