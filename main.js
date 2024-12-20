var productNameInput = document.getElementById('ProductName');
var productPriceInput = document.getElementById('ProductPrice');
var productTypeInput = document.getElementById('ProductType');
var productImageInput = document.getElementById('ProductImage');
var searchInput = document.getElementById('searchInput');
var addBtn = document.getElementById('addBtn');
var updateBtn = document.getElementById('updateBtn');
var productContainer = [];
if (localStorage.getItem('products') !== null) {
    productContainer = JSON.parse(localStorage.getItem('products'));
    displayProduct();
}
function addProduct(){
    var reader = new FileReader();
    reader.onload = function (e) {
        var product = {
            Name: productNameInput.value,
            price: productPriceInput.value,
            Type: productTypeInput.value,
            image: e.target.result, // تخزين الصورة كـ Base64
        };
        productContainer.push(product);
        clearForm();
        localStorage.setItem("products", JSON.stringify(productContainer));
        displayProduct();
    };
    reader.readAsDataURL(productImageInput.files[0]); // قراءة الصورة كـ Base64
}
function clearForm() {
    productNameInput.value = "";
    productImageInput.value = "";
    productPriceInput.value = "";
    productTypeInput.value = "";
}
function displayProduct() {
    var cartoona = ``;
    for (var i = 0; i < productContainer.length; i++) {
        cartoona += `<div class="col-md-3 col-sm-6">
        <div class="product">
        <img src="${productContainer[i].image}" class="w-50" alt="">
        <h2 class="h4 mt text-white">${productContainer[i].Name}</h2>
        <h3 class="h5"><span class="text-white fw-bolder">${productContainer[i].price}</span></h3>
        <h3 class="h5 text-white">${productContainer[i].Type}</h3>
        <button onclick="deleteProduct(${i})" class="btn btn-outline-danger btn-sm w-100 my-2">
        Delete <i class="fas fa-trash-alt"></i>
        </button>
        <button onclick="SetFormUpdate(${i})" class="btn btn-outline-warning btn-sm w-100 my-2">Update<i class="fas fa-pen"></i></button>
        </div>
        </div>`;
    }
    document.getElementById('rowData').innerHTML = cartoona;
}
function deleteProduct(deleteIndex){
    productContainer.splice(deleteIndex, 1);
    displayProduct();
    localStorage.setItem("products", JSON.stringify(productContainer));
}
function searchProduct() {
    var cartoona = ``;
    var term = searchInput.value.toLowerCase();

    for (var i = 0; i < productContainer.length; i++) {
        if (productContainer[i].Type.toLowerCase().includes(term)) {
            cartoona += `<div class="col-md-3 col-sm-6">
            <div class="product">
            <img src="${productContainer[i].image}" class="w-50" alt="">
            <h2 class="h4 mt text-white">${productContainer[i].Name}</h2>
            <h3 class="h5 text-white"><span class="fw-bolder">${productContainer[i].price}</span></h3>
            <h3 class="h5 text-white">${productContainer[i].Type}</h3>
            <button onclick="deleteProduct(${i})" class="btn btn-outline-danger btn-sm w-100 my-2">Delete <i class="fas fa-trash-alt"></i></button>
            <button onclick="SetFormUpdate(${i})" class="btn btn-outline-warning btn-sm w-100 my-2">Update <i class="fas fa-pen"></i></button>
            </div>
            </div>`;
        }
    }
    if (cartoona === '') {
        cartoona = `<p>No products found</p>`;
    }
    document.getElementById('rowData').innerHTML = cartoona;
}

var updateIndex;
function SetFormUpdate(i) {
    updateIndex = i;
    addBtn.classList.add('d-none');
    updateBtn.classList.remove('d-none');
    productNameInput.value = productContainer[i].Name;
    productPriceInput.value = productContainer[i].price;
    productImageInput.value = productContainer[i].image;
    productTypeInput.value = productContainer[i].Type;
}

function updateProduct() {
    var reader = new FileReader();
    reader.onload = function (e) {
        productContainer[updateIndex].Name = productNameInput.value;
        productContainer[updateIndex].price = productPriceInput.value;
        productContainer[updateIndex].Type = productTypeInput.value;
        productContainer[updateIndex].image = e.target.result; // تحديث الصورة كـ Base64
        displayProduct();
        addBtn.classList.remove('d-none');
        updateBtn.classList.add('d-none');
        localStorage.setItem("products", JSON.stringify(productContainer));
        clearForm();
    };
    reader.readAsDataURL(productImageInput.files[0]); // قراءة الصورة كـ Base64
}
