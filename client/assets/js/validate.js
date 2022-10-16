function handleFormSubmit(event) {
  event.preventDefault();
  var response = grecaptcha.getResponse();
  if(response.length == 0) 
  { 
    let error_message = document.querySelector(".error-message");
    error_message.innerHTML = "Please select CAPTCHA";
    error_message.classList.add("d-block");
    return false;
  }
  const form = event.currentTarget;
  const url = form.action;
  const formData = new FormData(form);
  const files = document.getElementById("inputfile").files;
  let dataUrl = [];
  let i = 1;
  function readAndPreview(file) {
    const reader = new FileReader();
    reader.addEventListener(
      "load",
      function() {
        dataUrl.push({ path: this.result });
        i++;
        if (i > files.length) {
          formData.delete("inputfile");
          dataUrl = JSON.stringify(dataUrl);
          formData.append("files", dataUrl);
          email_form_submit(form, url, formData);
        }
      },
      false
    );
    reader.readAsDataURL(file);
  }
  if (files) {
    for (let j = 0; j < files.length; j++) {
      readAndPreview(files[j]);
    }
  }
  if (!document.getElementById("inputfile").value) {
    email_form_submit(form, url, formData);
  }
}
function email_form_submit(form, url, formData) {
  const plainFormData = Object.fromEntries(formData.entries());
  const formDataJsonString = JSON.stringify(plainFormData);
  fetch(url, {
    method: "POST",
    body: formDataJsonString,
    headers: {
      "Content-Type": "application/json",
      Accept: "text/plain"
    }
  })
    .then(response => {
      if (response.ok) {
        return response.text();
      } else {
        throw new Error(
          `${response.status} ${response.statusText} ${response.url}`
        );
      }
    })
    .then(data => {
      if (data.trim() == "sent") {
        let error_message = form.querySelector(".error-message");
        if (error_message.classList.contains("d-block")) {
          form.querySelector(".error-message").classList.remove("d-block");
        }
        form.querySelector(".sent-message").classList.add("d-block");
        form.reset();
        grecaptcha.reset();
      } else {
        throw new Error("Something went wrong");
      }
    })
    .catch(error => {
      let error_message = document.querySelector(".error-message");
      error_message.innerHTML = "Oops! Form submission failed.";
      error_message.classList.add("d-block");
    });
}
const form = document.getElementById("form");
form.addEventListener("submit", handleFormSubmit);