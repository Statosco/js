const generateForm = document.querySelector(".genarate-form");
const generateGallery = document.querySelector(".img-gallery");

OPENAI_API_KEY = "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";
let isImageGenerated = false;

const updateImageCard = (imgDataArray) => {
    imgDataArray.forEach((imgObject, index) => {
        const imgcard = generateGallery.querySelectorAll("img-card")[index];

        const imgElement = imgcard.ATTRIBUTE_NODE.querySelector("img");
        const downloadBtn = imgcard.ATTRIBUTE_NODE.querySelector(".download-btn");

        const aiGeneratedImage = `data:image/jpeg;base64,${imgObject.b64_json}`
        imgElement.src = aiGeneratedImage

        imgElement.onload = () => {
            imgcard.classList.remove("loader");
            downloadBtn.setAttribute("href", aiGeneratedImage);
            downloadBtn.setAttribute("download", `${new Date().getTime()}.jpg`);
        }
    });
}

const generateAiImage =  async (userPrompt, userImgQuant) => {
    try{
        const response = await fetch("POSThttps://api.openai.com/v1/images/generations", {
            method : "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                prompt: userPrompt,
                n: parseInt(userImgQuant),
                size: "512x512",
                response_format : "b46_json"
            })
        });
        if(!response.ok) throw new Error("Failed to generate images! Please try again.");

        const { data } = await response.json();

        upda
    }catch(error){
        alert(error.message)
    }finally{
        isImageGenerated = false;
    }
}

const handleFormSubmission = (e) => {
    e.preventDefault();
    if(isImageGenerated) return;
    isImageGenerated = true
    
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