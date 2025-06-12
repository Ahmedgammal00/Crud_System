var inputName = document.getElementById("inputName");
var inputCat = document.getElementById("inputCat");
var inputPrice = document.getElementById("inputPrice");
var imgUrl = document.getElementById("imgUrl");
var inputDesc = document.getElementById("inputDesc");

var productContiner;
var superIndex;

if (localStorage.getItem("myProducts") == null) {
  productContiner = [];
} else {
  productContiner = JSON.parse(localStorage.getItem("myProducts"));
  display();
}

function add() {
  if (imgUrl.files.length === 0) {
    alert("Please choose an image.");
    return;
  }

  var reader = new FileReader();
  reader.onload = function () {
    var product = {
      name: inputName.value,
      cat: inputCat.value,
      price: inputPrice.value,
      imgUrl: reader.result,
      desc: inputDesc.value,
    };
    productContiner.push(product);
    localStorage.setItem("myProducts", JSON.stringify(productContiner));
    display();
    clearForm();
  };
  reader.readAsDataURL(imgUrl.files[0]);
}

function clearForm() {
  inputName.value = '';
  inputCat.value = '';
  inputPrice.value = '';
  imgUrl.value = '';
  inputDesc.value = '';
}

function display() {
  var cartona = '';
  for (var i = 0; i < productContiner.length; i++) {
    cartona += `
      <div class="col-md-4 mb-4">
        <div class="item border p-3 rounded shadow-sm text-center">
          <img class="img-fluid mb-2" src="${productContiner[i].imgUrl}" alt="Product Image">
          <h5>${productContiner[i].name}</h5>
          <h6>${productContiner[i].cat}</h6>
          <span class="d-block mb-2">${productContiner[i].price}</span>
          <p>${productContiner[i].desc}</p>
          <button onclick="setValue(${i})" class="btn btn-success form-control m-1">Update</button>
          <button onclick="deleteItem(${i})" class="btn btn-danger form-control m-1">Delete</button>
        </div>
      </div>
    `;
  }
  document.getElementById("myRow").innerHTML = cartona;
}

function deleteItem(index) {
  productContiner.splice(index, 1);
  localStorage.setItem("myProducts", JSON.stringify(productContiner));
  display();
}

function search(searchTerm) {
  var cartona = '';
  for (var i = 0; i < productContiner.length; i++) {
    if (productContiner[i].name.toLowerCase().includes(searchTerm.toLowerCase())) {
      cartona += `
        <div class="col-md-4 mb-4">
          <div class="item border p-3 rounded shadow-sm text-center">
            <img class="img-fluid mb-2" src="${productContiner[i].imgUrl}" alt="Product Image">
            <h5>${productContiner[i].name}</h5>
            <h6>${productContiner[i].cat}</h6>
            <span class="d-block mb-2">${productContiner[i].price}</span>
            <p>${productContiner[i].desc}</p>
            <button onclick="setValue(${i})" class="btn btn-success form-control m-1">Update</button>
            <button onclick="deleteItem(${i})" class="btn btn-danger form-control m-1">Delete</button>
          </div>
        </div>
      `;
    }
  }
  document.getElementById("myRow").innerHTML = cartona;
}

function setValue(index) {
  superIndex = index;
  document.getElementById("addBtn").style.display = "none";
  document.getElementById("updateBtn").style.display = "block";

  inputName.value = productContiner[index].name;
  inputCat.value = productContiner[index].cat;
  inputPrice.value = productContiner[index].price;
  inputDesc.value = productContiner[index].desc;
}

function Update() {
  document.getElementById("addBtn").style.display = "block";
  document.getElementById("updateBtn").style.display = "none";

  productContiner[superIndex].name = inputName.value;
  productContiner[superIndex].cat = inputCat.value;
  productContiner[superIndex].price = inputPrice.value;
  productContiner[superIndex].desc = inputDesc.value;

  localStorage.setItem("myProducts", JSON.stringify(productContiner));
  display();
  clearForm();
}
