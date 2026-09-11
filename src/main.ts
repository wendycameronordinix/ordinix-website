import './style.css'

function initNavbar(): void {
  const navbar = document.getElementById('navbar')
  const navToggle = document.getElementById('navToggle')
  const navLinks = document.getElementById('navLinks')

  if (navbar) {
    const onScroll = (): void => {
      if (window.scrollY > 20) {
        navbar.classList.add('scrolled')
      } else {
        navbar.classList.remove('scrolled')
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
  }

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active')
      navLinks.classList.toggle('open')
    })

    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active')
        navLinks.classList.remove('open')
      })
    })
  }
}

function initReveal(): void {
  const reveals = document.querySelectorAll<HTMLElement>('.reveal')
  if (!('IntersectionObserver' in window)) {
    reveals.forEach((el) => el.classList.add('visible'))
    return
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement
          const delay = el.dataset.revealDelay ? parseInt(el.dataset.revealDelay) : i * 80
          setTimeout(() => el.classList.add('visible'), delay)
          observer.unobserve(el)
        }
      })
    },
    { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
  )

  reveals.forEach((el) => observer.observe(el))
}

function initYear(): void {
  const yearEl = document.getElementById('year')
  if (yearEl) yearEl.textContent = String(new Date().getFullYear())
}

document.addEventListener('DOMContentLoaded', () => {
  initNavbar()
  initReveal()
  initYear()
})
