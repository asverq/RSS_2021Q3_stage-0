function verticalSlider() {
    const upBtn = document.querySelector('.up-button'),
        downBtn = document.querySelector('.down-button'),
        sidebar = document.querySelector('.left-slide'),
        sliderContainer = document.querySelector('.slider-container'),
        mainSlide = document.querySelector('.main-slide'),
        allSlides = document.getElementsByClassName('main-slide__item'),
        allSideSlides = document.getElementsByClassName('left-slide__item'),
        height = mainSlide.clientHeight,
        duration = 500

    let scrollable = true

    function setCloneSlides() {
        // Clone MainSlide Slides
        const firstSlide = allSlides[0],
            cloneFirst = firstSlide.cloneNode(true),
            lastSlide = allSlides[allSlides.length - 1],
            cloneLast = lastSlide.cloneNode(true)
        mainSlide.appendChild(cloneFirst)
        mainSlide.insertBefore(cloneLast, firstSlide)
        //Clone Sidebar Slides
        const firstSideSlide = allSideSlides[0],
            cloneSideFirst = firstSideSlide.cloneNode(true),
            lastSideSlide = allSideSlides[allSideSlides.length - 1],
            cloneSideLast = lastSideSlide.cloneNode(true)
        sidebar.appendChild(cloneSideFirst)
        sidebar.insertBefore(cloneSideLast, firstSideSlide)
    }
    setCloneSlides()

    const countSlides = allSlides.length
    let activeSlideIndex = 1

    function setPosition() {
        setActiveSlide()
        setTimeout(normalaizeDuration, 0)
        sidebar.style.top = `-${(countSlides - 1) * 100}%`
    }
    setPosition()


    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowUp') {
            event.preventDefault()
            if (scrollable === true) {
                changeSlide('up')
            }
        }
        if (event.key === 'ArrowDown') {
            event.preventDefault()
            if (scrollable === true) {
                changeSlide('down')
            }
        }
    })

    sliderContainer.addEventListener('wheel', event => {
        event.preventDefault()
        if (event.deltaY < 0 && scrollable === true) changeSlide('up')
        if (event.deltaY > 0 && scrollable === true) changeSlide('down')
    })

    upBtn.addEventListener('click', () => {
        if (scrollable === true) changeSlide('up')
    })
    downBtn.addEventListener('click', () => {
        if (scrollable === true) changeSlide('down')
    })

    sliderContainer.addEventListener('mousedown', moveStart)
    sliderContainer.addEventListener('mouseup', moveEnd)

    let startPosY
    let endPosY
    let inDrag

    function moveStart(event) {
        event.preventDefault()
        sliderContainer.addEventListener('mousemove', moveAction)
        sliderContainer.style.cursor = 'grabbing'
        startPosY = event.clientY
    }

    function moveAction(event) {
        blockDuration()
        inDrag = startPosY - event.clientY
        mainSlide.style.transform = `translateY(-${height * activeSlideIndex + inDrag}px)`
        sidebar.style.transform = `translateY(${height * activeSlideIndex + inDrag}px)`
    }

    function moveEnd(event) {
        sliderContainer.style.cursor = 'default'
        endPosY = event.clientY
        sliderContainer.removeEventListener('mousemove', moveAction)
        normalaizeDuration()
        detectDrag()
    }

    sliderContainer.addEventListener('touchstart', touchStart)
    sliderContainer.addEventListener('touchend', touchEnd)

    function touchStart(event) {
        event.preventDefault()
        if (event.target.classList.contains('up-button') ||
            event.target.classList.contains('fa-arrow-up') &&
            scrollable === true) {
            changeSlide('up')
        }
        if (event.target.classList.contains('down-button') ||
            event.target.classList.contains('fa-arrow-down') &&
            scrollable === true) {
            changeSlide('down')
        }
        let touchObj = event.changedTouches[0]
        sliderContainer.addEventListener('touchmove', touchAction)
        startPosY = touchObj.clientY
    }

    function touchAction(event) {
        let touchObj = event.changedTouches[0]
        blockDuration()
        inDrag = startPosY - touchObj.clientY
        mainSlide.style.transform = `translateY(-${height * activeSlideIndex + inDrag}px)`
        sidebar.style.transform = `translateY(${height * activeSlideIndex + inDrag}px)`
    }

    function touchEnd(event) {
        let touchObj = event.changedTouches[0]
        endPosY = touchObj.clientY
        sliderContainer.removeEventListener('mousemove', moveAction)
        normalaizeDuration()
        detectDrag()
    }

    function detectDrag() {
        if (scrollable === true) {
            if (Math.abs(startPosY - endPosY) > 15) {
                if (startPosY - endPosY > 0) {
                    changeSlide('up')
                } else {
                    changeSlide('down')
                }
            }
        }
    }


    function unblockScrollable() {
        scrollable = true
    }

    function changeSlide(direction) {
        if (direction === 'up' && activeSlideIndex !== countSlides - 2) {
            scrollable = false
            activeSlideIndex++
            setActiveSlide()
            setTimeout(unblockScrollable, duration + 100)
        } else if (direction === 'up' && activeSlideIndex === countSlides - 2) {
            scrollable = false
            activeSlideIndex++
            setActiveSlide()
            setTimeout(() => resetActiveIndex(1), duration + 100)
            setTimeout(unblockScrollable, duration + 100)
        }

        if (direction === 'down' && activeSlideIndex !== 1) {
            scrollable = false
            activeSlideIndex--
            setActiveSlide()
            setTimeout(unblockScrollable, duration + 100)
        } else if (direction === 'down' && activeSlideIndex === 1) {
            scrollable = false
            activeSlideIndex--
            setActiveSlide()
            setTimeout(() => resetActiveIndex(countSlides - 2), duration + 100)
            setTimeout(unblockScrollable, duration + 100)
        }
    }

    function setActiveSlide() {
        mainSlide.style.transform = `translateY(-${height * activeSlideIndex}px)`
        sidebar.style.transform = `translateY(${height * activeSlideIndex}px)`
    }

    function resetActiveIndex(index) {
        blockDuration()
        activeSlideIndex = index
        setActiveSlide()
        setTimeout(normalaizeDuration, 0)
    }

    function blockDuration() {
        mainSlide.style.transitionDuration = "0s"
        sidebar.style.transitionDuration = "0s"
    }

    function normalaizeDuration() {
        mainSlide.style.transitionDuration = `${duration / 1000}s`
        sidebar.style.transitionDuration = `${duration / 1000}s`
    }
}

verticalSlider()


console.log('Самооценка проекта:\n\nПервый этап - воспроизвести исходный проект сделано 10 баллов\n\nВторой этап - обязательный дополнительный функционал:\nСделать слайдер бесконечным - сделано 10 баллов\n\nТретий этап - дополнительный функционал на выбор, сделано:\n1) Ппролистывание колёсиком мышки 10\n2) Пролистывание свайпами мышки 10\n\nИтого задание сделано на 40 баллов из 30 возможных итоговая оценка 30');