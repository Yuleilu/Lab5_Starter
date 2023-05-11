//adds an event listener to the window object for the DOMContentLoaded event
//which fires when the initial HTML document has finished loadedparsed.
//The function init is event handler
window.addEventListener("DOMContentLoaded", init);

function init() {
  //variables are initialized by selecting certain IDs and tags in the html file
  var selectVoice = document.getElementById("voice-select");
  const textToSpeak = document.getElementById("text-to-speak");
  const speakButton = document.querySelector("button");
  const face = document.querySelector("img");
  let synth = null;
  let voices = [];
  // when document of global browser window object is loaded compltely,
  window.addEventListener("load", function () {
    //creates a new SpeechSynthesis object
    synth = window.speechSynthesis;
    voices = synth.getVoices();
    //set the voice-select dropdown list with available voices
    voices.forEach((voice) => {
      const option = document.createElement("option");
      option.textContent = `${voice.name} (${voice.lang})`;
      option.setAttribute("data-lang", voice.lang);
      option.setAttribute("data-name", voice.name);
      selectVoice.add(option);
    });
  });
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
