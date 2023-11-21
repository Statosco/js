const initSlider = ()=> {
    const imageList = document.querySelector(".image-list");
    const slideButons = document.querySelectorAll(".slider-wraper .slide-btn");
    const sliderSrollBar = document.querySelector(".container .slider-scroll");
    const sliderSrollBarThumb = document.querySelector(".scrollbar-thumb");
    const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;

    sliderSrollBarThumb.addEventListener("mousedown", (e) => {
        const startX = e.clientX;
        const thumbPosition = sliderSrollBarThumb.offsetLeft;

        const handleMouseMove = (e) => {
            const deltaX = e.clientX - startX;
            const newThumbPosition = thumbPosition + deltaX;
            const maxThumbPosition = sliderSrollBar.getBoundingClientRect().width - sliderSrollBarThumb.offsetWidth;

            const boundedPOs = Math.max(0, Math.min(maxThumbPosition, newThumbPosition))

            sliderSrollBarThumb.style.left = `${boundedPOs}px`;
        }

        const handleMouseUp = () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
      
        } 

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    });

    slideButons.forEach(btn => {
        btn.addEventListener("click", () => {
            const direction = btn.id === "prev-slide" ? -1 : 1;
            const scrollAmount = imageList.clientWidth * direction;
            imageList.scrollBy({ left: scrollAmount, behavior: "smooth"});
        });
    });

    const handleSlideBtn = () =>{
        slideButons[0].style.display = imageList.scrollLeft <= 0 ? "none" : "block";
        slideButons[1].style.display = imageList.scrollLeft >= maxScrollLeft ? "none" : "block";
    }
    const updateScollThumbPos = () => {
        const scollPosition = imageList.scrollLeft;
        const thumbPosition = (scollPosition / maxScrollLeft) * (sliderSrollBar.clientWidth - sliderSrollBarThumb.offsetWidth);
        sliderSrollBarThumb.style.left = `${thumbPosition}px`
    };

    imageList.addEventListener("scroll", () => {
        handleSlideBtn();
        updateScollThumbPos();
    });
}

window.addEventListener("load", initSlider)