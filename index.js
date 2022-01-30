if (typeof window !== "undefined") {
const quotes = document.querySelector(".quote"),
quoteButton = document.querySelector("button"),
author = document.querySelector(".name"),
speech = document.querySelector(".speech"),
copy = document.querySelector(".copy"),
synth = speechSynthesis;

function Quote(){
    quoteButton.classList.add("loading");
    quoteButton.innerText = "Loading...";
    fetch("http://api.quotable.io/random").then(response => response.json()).then(result => {
        quotes.innerText = result.content;
        author.innerText = result.author;
        quoteButton.classList.remove("loading");
        quoteButton.innerText = "Next";
    });
}

copy.addEventListener("click", ()=>{
    navigator.clipboard.writeText(quotes.innerText);
});

speech.addEventListener("click", ()=>{
    if(!quoteButton.classList.contains("loading")){
        let utterance = new SpeechSynthesisUtterance(`${quotes.innerText} by ${author.innerText}`);
        synth.speak(utterance);
        setInterval(()=>{
            !synth.speaking ? speech.classList.remove("active") : speech.classList.add("active");
        }, 10);
    }
});
quoteButton.addEventListener("click", Quote);

}
