// Selectors

const abt = document.querySelector(".about");

//Event Listeners

abt.addEventListener('click', goToLink);

//Functions

function goToLink(event){
    const item = event.target;
    if(item.classList[0] === 'linkedin-btn'){
        window.location.href = "https://in.linkedin.com/in/shefali-tripathi-529474167";
    }

    if(item.classList[0] === 'git-btn'){
        window.location.href = "https://github.com/sheftrip";
    }
    
}
