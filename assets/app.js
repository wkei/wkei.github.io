// type anime
function type(el, text, timeout = 20) {
  clearInterval(el.timer)
  const list = text.split("")
  return new Promise(resolve => {
    el.textContent = ""
    el.timer = setInterval(() => {
      el.textContent += list.shift()
      if (!list.length) {
        clearInterval(el.timer)
        delete el.timer
        resolve()
      }
    }, timeout)
  })
}

function erase(el, timeout = 20) {
  return new Promise(resolve => {
    clearInterval(el.timer)
    el.timer = setInterval(() => {
      el.textContent = el.textContent.slice(0, el.textContent.length - 1)
      if (!el.textContent.length) {
        clearInterval(el.timer)
        delete el.timer
        resolve()
      }
    }, timeout)
  })
}

function typeAbout() {
  const about = document.querySelector(".about")
  return type(about, about.textContent, 10)
}

async function typeLinks() {
  const links = document.querySelectorAll(".link")
  for (let i = 0; i < links.length; i++) {
    await type(links[i], links[i].getAttribute("aria-label"))
  }
}

async function typeKeyword(el, keywords, idx = 0) {
  await type(el, keywords[idx], 80)
  setTimeout(async () => {
    await erase(el, 100) 
    setTimeout(() => {
      typeKeyword(el, keywords, idx + 1 >= keywords.length ? 0 : idx + 1)
    }, 1000)
  }, 1000)
}
function keywordAnime() {
  const el = document.querySelector(".header span")
  const keywords = document.querySelector("meta[name=keywords]")?.getAttribute("content")?.split(/\W*,\W*/)
  setTimeout(() => {
    typeKeyword(el, keywords.sort(() => Math.random() - 0.5))
  }, 1000)
}

async function typeAnime() {
  await typeAbout()
  await typeLinks()
  await keywordAnime()
}
typeAnime()

// mode
function changeMode(mode) {
  document.documentElement.setAttribute("data-mode", mode)
}

function initModeSwitcher() {
  const switcher = document.querySelector(".mode")
  const darkMode = window.matchMedia("(prefers-color-scheme: dark)")

  if (darkMode.matches) {
    switcher.checked = true
  }

  switcher.addEventListener("input", (e) => {
    e.target.checked ? changeMode("dark") : changeMode("light")
  })
}
initModeSwitcher();
