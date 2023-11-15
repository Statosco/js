const generateForm = document.querySelector(".genarate-form");
const generateGallery = document.querySelector(".img-gallery");

const generateAiImage =  async (userPrompt, userImgQuant) => {
    try{
        const response = await fetch("POSThttps://api.openai.com/v1/images/generations", {
            method : "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${OPENAI_API_KEY}`
            }
        })
    }catch(error){
        console.log(error)
    }
}

const handleFormSubmission = (e) => {
    e.preventDefault();
    
    const userPrompt = e.target.elements[0].value;
    const userImgQuant = e.target.elements[1].value;

    const imgCardMarkUp = Array.from({length: userImgQuant}, () =>
        ` <div class="img-card">
        <img src="Spinner-1s-200px.svg" alt="">
        <a href="" class="download-btn">
            <i class='bx bx-download'></i>
        </a>
        </div>`
    ).join("");
    generateGallery.innerHTML =imgCardMarkUp;
    generateAiImage(userPrompt, userImgQuant);
}

generateForm.addEventListener("submit", handleFormSubmission);
