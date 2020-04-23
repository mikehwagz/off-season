export function toggleVisibilityOnKey(s, k) {
  let el = document.querySelector(s)
  el.style.zIndex = '99999'
  el.classList.add('dn')
  window.addEventListener('keyup', ({ key }) => {
    key === k && el.classList.toggle('dn')
  })
}
