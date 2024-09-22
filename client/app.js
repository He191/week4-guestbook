// store the shop Upgrade from the API
async function getFeedbackFromDB(){
    const response = await fetch ("https://week4-guestbook.onrender.com");
// I need my data to be written in json.
    const data = await response.json();
    return data;
}

const fb = await getFeedbackFromDB();

fb.forEach(function(a,i) {
    const feedbackContainer = document.querySelector("#innerFB");
    const feedback =document.createElement("div");
    feedback.className="indFB";
    feedback.textContent= fb[i].name +" From: "+fb[i].city+" " +fb[i].feedback;
    feedbackContainer.appendChild(feedback);   
});

const form = document.querySelector("#form-container");

function handleSubmit(event) {
    event.preventDefault(); // Prevent form submission
    const formData = new FormData(form);
    const formValues = Object.fromEntries(formData);
    // console.table(formValues);
    fetch("https://week4-guestbook.onrender.com/add", {
        method: "POST", // This is where we set the POST HTTP verb
        headers: {
          "Content-Type": "application/json", // This tells the server we're sending stringified JSON data
        },
        body: JSON.stringify({ formValues }),
      });
      form.reset();
};


form.addEventListener("submit", handleSubmit);



