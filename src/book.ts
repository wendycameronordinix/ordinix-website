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

function initSubscribeForm(): void {
  const form = document.getElementById('subscribeForm') as HTMLFormElement | null
  const successDiv = document.getElementById('formSuccess') as HTMLElement | null
  const submitBtn = document.getElementById('submitBtn') as HTMLButtonElement | null
  const nextUrlInput = document.getElementById('nextUrl') as HTMLInputElement | null

  if (!form || !successDiv || !submitBtn) return

  // Set the redirect URL to the current page with ?success=true
  if (nextUrlInput) {
    nextUrlInput.value = window.location.href.split('?')[0] + '?success=true'
  }

  // Check if returning from FormSubmit redirect
  const params = new URLSearchParams(window.location.search)
  if (params.get('success') === 'true') {
    form.hidden = true
    successDiv.hidden = false
    // Clean URL
    window.history.replaceState({}, '', window.location.pathname)
    return
  }

  form.addEventListener('submit', () => {
    submitBtn.classList.add('loading')
    // Form submits natively to FormSubmit — no JS interception needed.
    // The loading state shows until the redirect happens.
  })
}

document.addEventListener('DOMContentLoaded', () => {
  initNavbar()
  initReveal()
  initYear()
  initSubscribeForm()
})
