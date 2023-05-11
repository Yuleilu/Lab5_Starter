//adds an event listener to the window object for the DOMContentLoaded event
//which fires when the initial HTML document has finished loadedparsed.
//The function init is event handler
window.addEventListener("DOMContentLoaded", init);

function init() {
  //variables are initialized by selecting certain IDs and tags in the html file
  const selectVoice = document.getElementById("voice-select");
  const textToSpeak = document.getElementById("text-to-speak");
  const speakButton = document.querySelector("button");
  const face = document.querySelector("img");
  let synth = speechSynthesis;
  function populateVoiceList() {
    //check if objects exists (if speechSynthesis API is supported)
    if (typeof speechSynthesis === "undefined") {
      return;
    }

    const voices = speechSynthesis.getVoices();

    for (let i = 0; i < voices.length; i++) {
      const option = document.createElement("option");
      option.textContent = `${voices[i].name} (${voices[i].lang})`;
      option.setAttribute("data-lang", voices[i].lang);
      option.setAttribute("data-name", voices[i].name);
      selectVoice.appendChild(option);
    }
  }

  populateVoiceList();
  if (
    typeof speechSynthesis !== "undefined" &&
    speechSynthesis.onvoiceschanged !== undefined
  ) {
    //populateVoiceList function is called whenever the onvoiceschanged event is triggered
    speechSynthesis.onvoiceschanged = populateVoiceList;
  }

  //fire an callbakc function when the button is clicked
  speakButton.addEventListener("click", () => {
    //retrieves the selected option using selectedOptions[0]
    const selectedOption = selectVoice.selectedOptions[0];
    const utterance = new SpeechSynthesisUtterance(textToSpeak.value);
    const voiceName = selectedOption.getAttribute("data-name");
    const voiceLang = selectedOption.getAttribute("data-lang");
    synth.getVoices().forEach((v) => {
      if (v.name === voiceName && v.lang === voiceLang) {
        utterance.voice = v;
      }
    });
    // speech is spoken using speak method of the SpeechSynthesis object
    synth.speak(utterance);
    face.src = "assets/images/smiling-open.png";
    //show an open mouth image while the speech is being spoken
    //attach an event listener to the utterance object
    //When end is fired, updates the src attribute of the face element to smiling face
    utterance.addEventListener("end", function () {
      if (!synth.pending) {
        face.src = "assets/images/smiling.png";
      }
    });
  });
}
