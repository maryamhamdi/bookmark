var inputname = document.getElementById("inputname");
var inputurl = document.getElementById("inputurl");
var sumbtn = document.getElementById("sumbtn");
var modal = document.querySelector(".modal");
var closebtn = document.querySelector(".close-icon i");
var allproduct = JSON.parse(localStorage.getItem("allproducts"));
var allproduct = [];

if (allproduct.length > 0) {
    display();
}

function add() {
    if (Valid() && validUrl()) {
        var product = {
            name: inputname.value,
            url: inputurl.value,
        };
        allproduct.push(product);
        localStorage.setItem("allproducts", JSON.stringify(allproduct));
        display();
        clearForm();
    }
}

function display() {
    let tableContentHTML = '';
    allproduct.forEach((product, i) => {
        tableContentHTML += `
            <tr>
                <td>${i}</td>
                <td>${product.name}</td>              
                <td>
                    <button class="btn btn-visit" data-index="${i}">
                        <i class="fa-solid fa-eye pe-2"></i>Visit
                    </button>
                </td>
                <td>
                    <button class="btn btn-delete" data-index="${i}">
                        <i class="fa-solid fa-trash-can"></i>Delete
                    </button>
                </td> 
            </tr>
        `;
    });

    document.getElementById("tableContent").innerHTML = tableContentHTML;

    
    document.querySelectorAll('.btn-visit').forEach((btn, index) => {
        btn.addEventListener('click', () => visitWeb(index));
    });

    document.querySelectorAll('.btn-delete').forEach((btn, index) => {
        btn.addEventListener('click', () => deleteItem(index));
    });
}

function deleteItem(index) {
    allproduct.splice(index, 1);
    localStorage.setItem("allproducts", JSON.stringify(allproduct));
    display();  
}

function clearForm() {
    inputname.value = '';
    inputurl.value = '';
}

sumbtn.addEventListener("click", function() {
    if (inputname.value == "" || inputurl.value == "") {
        modal.classList.replace("d-none", "d-flex");
    } else {
        add();
    }
});  

closebtn.addEventListener("click", closeModal);
function closeModal() {
    modal.classList.replace("d-flex", "d-none");
}


document.addEventListener("keyup", function(e) {
    if (e.key === "Escape") {
        closeModal();
    }
});

function Valid() {
    var nameregex = /^[A-Z][a-z]{2,35}$/;
    var testing = nameregex.test(inputname.value);
    if (testing) {
        inputname.classList.add("valid");
        inputname.classList.remove("invalid");
        return true;
    } else {
        inputname.classList.add("invalid");
        inputname.classList.remove("valid");
        return false;
    }
}

inputname.addEventListener("change", Valid);
inputurl.addEventListener("change", validUrl);

function validUrl() {
    var urlregex = /^(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
    if (urlregex.test(inputurl.value)) {
        inputurl.classList.add("valid");
        inputurl.classList.remove("invalid");
        return true;
    } else {
        inputurl.classList.add("invalid");
        inputurl.classList.remove("valid");
        return false;
    }
}

function visitWeb(index) {
    var webIndex = index;
    var httpsRegex = /^(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
    if (httpsRegex.test(allproduct[webIndex].url)) {
        open(allproduct[webIndex].url);
    } else {
        open(`https://${allproduct[webIndex].url}`);
    }
}


