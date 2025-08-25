function maskPaasword(pass) {
  let str = "";
  for (let index = 0; index < pass.length; index++) {
    str += "*";
  }
  return str;
}

function copyText(text) {

  navigator.clipboard.writeText(text).then(() => {
    Toastify({
      text: "📋 Copied",
      duration: 2000,
      gravity: "top",
      position: "right",
      backgroundColor: "#1E293B",
      border: "2px solid #F1F5F9",
      stopOnFocus: true,
      style: {
        borderRadius: "8px",
        fontWeight: "bold",
        color: "#F1F5F9",
        boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
      },
    }).showToast();
  }).catch(() => {
    Toastify({
      text: "❌ Failed to copy!",
      duration: 2000,
      gravity: "top",
      position: "right",
      backgroundColor: "#ef4444",
      style: {
        borderRadius: "8px",
        fontWeight: "bold",
        color: "#fff",
        boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
      },
    }).showToast();
  });
}

const deletePaasword = (Website) => {
  let data = localStorage.getItem("paaswords");
  let arr = JSON.parse(data);
  arrUpdated = arr.filter((e) => {
    return e.Website != Website;
  });
  localStorage.setItem("paaswords", JSON.stringify(arrUpdated));
  Toastify({
    text: " Successfully deleted website’s password",
    duration: 3000,
    gravity: "top",
    position: "right",
    backgroundColor: " #1E293B",
    border: "2px solid #F1F5F9",
    stopOnFocus: true,
    style: {
      borderRadius: "8px",
      fontWeight: "bold",
      boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
    },
  }).showToast();

  Showpaasword();
};

const Showpaasword = (searchTerm = "") => {
  let tb = document.querySelector("table");
  let data = localStorage.getItem("paaswords");

  if (data == null || JSON.parse(data).length === 0) {
    tb.innerHTML = "<tr><td colspan='4'>No Data To Show</td></tr>";
    return;
  }

  let arr = JSON.parse(data);

  if (searchTerm) {
    searchTerm = searchTerm.toLowerCase();
    arr = arr.filter(
      (item) =>
        item.Website.toLowerCase().includes(searchTerm) ||
        item.username.toLowerCase().includes(searchTerm) ||
        item.paasword.toLowerCase().includes(searchTerm)
    );
  }

  tb.innerHTML = `<tr>
    <th>Website/App Name</th>
    <th>Username</th>
    <th>Paasword</th>
    <th>Delete</th>
  </tr>`;

  if (arr.length === 0) {
    tb.innerHTML += "<tr><td colspan='4'>No matching results.</td></tr>";
    return;
  }

  arr.forEach((element) => {
    tb.innerHTML += `<tr>
      <td>${element.Website} <img onclick="copyText('${
      element.Website
    }')" src="copy.svg" alt="Copy Button" width="19" height="19"></td>
      <td>${element.username} <img onclick="copyText('${
      element.username
    }')" src="copy.svg" alt="Copy Button" width="19" height="19"></td>
      <td>${maskPaasword(element.paasword)} <img onclick="copyText('${
      element.paasword
    }')" src="copy.svg" alt="Copy Button" width="19" height="19"></td>
      <td><button id="btns" onclick="deletePaasword('${
        element.Website
      }')">Delete</button></td>
    </tr>`;
  });

  Website.value = "";
  username.value = "";
  paasword.value = "";
};

console.log("working");
Showpaasword();
document.querySelector("#btn").addEventListener("click", (e) => {
  e.preventDefault();
  console.log("clicked....");
  console.log(username.value, paasword.value);
  let paaswords = localStorage.getItem("paaswords");
  console.log(paaswords);
  if (paaswords == null) {
    let json = [];
    json.push({
      Website: Website.value,
      username: username.value,
      paasword: paasword.value,
    });
    console.log("Paaswod Saved");
    localStorage.setItem("paaswords", JSON.stringify(json));
  } else {
    let json = JSON.parse(localStorage.getItem("paaswords"));
    json.push({
      Website: Website.value,
      username: username.value,
      paasword: paasword.value,
    });
    console.log("Paasword Saved");
    localStorage.setItem("paaswords", JSON.stringify(json));
  }
  Showpaasword();
});
document.getElementById("searchInput").addEventListener("input", function () {
  const searchValue = this.value;
  Showpaasword(searchValue);
});
