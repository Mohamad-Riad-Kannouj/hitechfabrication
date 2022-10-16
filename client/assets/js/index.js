fetch("https://example.com/data")
  .then(response => response.json())
  .then(json => {
    let homeTitle = document.getElementById("home-title");
    homeTitle.innerHTML =
      json.home[0].title +
      " " +
      `<span id="title-span">${json.home[0].span}</span>`;
    let subtitle = document.getElementById("subtitle");
    subtitle.innerHTML = json.home[0].subtitle;
    let about = document.getElementById("about-content");
    let title = document.createElement("h3");
    let desc1 = document.createElement("p");
    let list = document.createElement("ul");
    let item1 = document.createElement("li");
    let item2 = document.createElement("li");
    let item3 = document.createElement("li");
    let desc2 = document.createElement("p");
    desc1.classList.add("fst-italic");
    title.innerText = json.about[0].title;
    desc1.innerText = json.about[0].desc1;
    item1.innerHTML =
      `<i class="bi bi-check-circle"></i> ` + json.about[0].item1;
    item2.innerHTML =
      `<i class="bi bi-check-circle"></i> ` + json.about[0].item2;
    item3.innerHTML =
      `<i class="bi bi-check-circle"></i> ` + json.about[0].item3;
    desc2.innerText = json.about[0].desc2;
    list.append(item1, item2, item3);
    about.append(title, desc1, list, desc2);
    let address = document.getElementsByClassName("address");
    let open = document.getElementsByClassName("open-hours");
    let email = document.getElementsByClassName("email");
    let phone = document.getElementsByClassName("phone");
    let location = document.createElement("p");
    location.innerHTML = json.contact[0].address;
    address[0].appendChild(location);
    let open_DH = document.createElement("p");
    open_DH.innerHTML =
      json.contact[0].open_days + "<br />" + json.contact[0].open_hours;
    open[0].appendChild(open_DH);
    let mail = document.createElement("p");
    mail.innerHTML = json.contact[0].email;
    email[0].appendChild(mail);
    let telephone = document.createElement("p");
    telephone.innerHTML = json.contact[0].telephone;
    telephone.id = "phone";
    phone[0].appendChild(telephone);
  });