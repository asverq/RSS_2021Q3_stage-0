const upBtn = document.querySelector('.up-button'),
    downBtn = document.querySelector('.down-button'),
    sidebar = document.querySelector('.sidebar'),
    sliderContainer = document.querySelector('.container'),
    mainSlide = document.querySelector('.main-slide'),
    allSlides = document.getElementsByClassName('slide'),
    allSideSlides = document.getElementsByClassName('side-slide'),
    height = mainSlide.clientHeight,
    duration = 500

let scrollable = true

function setCloneSlides() {
    // Clone MainSlide Slides
    const firstSlide = allSlides[0],
        cloneFirst = firstSlide.cloneNode(true),
        lastSlide = allSlides[allSlides.length - 1],
        cloneLast = lastSlide.cloneNode(true)

    mainSlide.appendChild(cloneFirst);
    mainSlide.insertBefore(cloneLast, firstSlide);

    //Clone Sidebar Slides
    const firstSideSlide = allSideSlides[0],
        cloneSideFirst = firstSideSlide.cloneNode(true),
        lastSideSlide = allSideSlides[allSideSlides.length - 1],
        cloneSideLast = lastSideSlide.cloneNode(true)

    sidebar.appendChild(cloneSideFirst);
    sidebar.insertBefore(cloneSideLast, firstSideSlide);
}
setCloneSlides()

const countSlides = allSlides.length
let activeSlideIndex = Math.floor(countSlides / 2)

function setPosition() {
    mainSlide.style.transitionDuration = "0s"
    sidebar.style.transitionDuration = "0s"
    setActiveSlide()
    setTimeout(normalaizeDuration, 0);    
    sidebar.style.top = `-${(countSlides - 1) * 100}vh`
}
setPosition()

document.addEventListener('keydown', (event) => {
    event.preventDefault()
    if (event.key === 'ArrowUp') scrollable === false || changeSlide('up')
    if (event.key === 'ArrowDown') scrollable === false || changeSlide('down')
})

sliderContainer.addEventListener('mousewheel', event => {
    event.preventDefault()
    if (event.deltaY === -100) scrollable === false || changeSlide('up')
    if (event.deltaY === 100) scrollable === false || changeSlide('down')
})

upBtn.addEventListener('click', () => scrollable === false || changeSlide('up'))
downBtn.addEventListener('click', () => scrollable === false || changeSlide('down'))


function unblockScrollable() {
    scrollable = true
}

function changeSlide(direction) {
    if (direction === 'up' && activeSlideIndex !== countSlides - 2 && activeSlideIndex !== countSlides - 1) {
        scrollable = false
        activeSlideIndex++
        setActiveSlide()
        setTimeout(unblockScrollable, duration + 50)
    } else if (direction === 'up' && activeSlideIndex === countSlides - 2) {
        scrollable = false
        activeSlideIndex++
        setActiveSlide()
        setTimeout(() => resetActiveIndex(1), duration + 100)
        setTimeout(unblockScrollable, duration + 50)
        // console.log(activeSlideIndex);
    }

    if (direction === 'down' && activeSlideIndex !== 1 && activeSlideIndex !== 0) {
        scrollable = false
        activeSlideIndex--
        setActiveSlide()
        setTimeout(unblockScrollable, duration + 50)
        console.log(activeSlideIndex);
    } else if (direction === 'down' && activeSlideIndex === 1) {
        scrollable = false
        activeSlideIndex--
        setActiveSlide()
        setTimeout(() => resetActiveIndex(countSlides - 2), duration + 100)
        setTimeout(unblockScrollable, duration + 50)
        console.log(activeSlideIndex);
    }
}

function setActiveSlide() {
    mainSlide.style.transform = `translateY(-${height * activeSlideIndex}px)`
    sidebar.style.transform = `translateY(${height * activeSlideIndex}px)`
}

function resetActiveIndex(index) {
    mainSlide.style.transitionDuration = "0s"
    sidebar.style.transitionDuration = "0s"
    activeSlideIndex = index
    setActiveSlide()
    setTimeout(normalaizeDuration, 0)
}

function normalaizeDuration() {
    mainSlide.style.transitionDuration = `${duration / 1000}s`
    sidebar.style.transitionDuration = `${duration / 1000}s`
}