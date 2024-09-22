// store the shop Upgrade from the API
async function getFeedbackFromDB(){
    const response = await fetch ("https://week4-guestbook.onrender.com:8080/");
    // const response = await fetch ("http://localhost:8080/");
// I need my data to be written in json.
    const data = await response.json();
    return data;
};

function handleSubmit(event) {
    
    event.preventDefault(); // Prevent form submission
    
    const form = document.querySelector("#form-container");

    const formData = new FormData(form);
    const formValues = Object.fromEntries(formData);
    fetch("https://week4-guestbook.onrender.com:8080/add", {
    // fetch("http://localhost:8080/add", {
        method: "POST", // This is where we set the POST HTTP verb
        headers: {
          "Content-Type": "application/json", // This tells the server we're sending stringified JSON data
        },
        body: JSON.stringify({ formValues }),
      });
      form.reset();
};

async function main(){

    const fb = await getFeedbackFromDB();

    fb.forEach(function(a,i) {
        const feedbackContainer = document.querySelector("#innerFB");
        const feedback =document.createElement("div");
        feedback.className="indFB";
        feedback.textContent= fb[i].name +" From: "+fb[i].city+" " +fb[i].feedback;
        feedbackContainer.appendChild(feedback);   
    });

    document.querySelector("#form-container").addEventListener("submit", handleSubmit);

}

main();