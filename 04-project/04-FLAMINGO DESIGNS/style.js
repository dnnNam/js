// hàm đổi hình 

function changeImage(element, newImage) {
    element.src = newImage;
}

function resetImage(element, originImage) {
    element.src = originImage;
}

// form validate project 

/*
Name : isRequired , isName
email : isRequired , isEmail
phone: isRequired , isPhone
*/

const REG_EMAIL =
    /^[a-zA-Z\d\.\-\_]+(\+\d+)?@[a-zA-Z\d\.\-\_]{1,65}\.[a-zA-Z]{1,5}$/;
const REG_NAME =
    /^[a-zA-Z\u00C0-\u024F\u1E00-\u1EFF]+((\s[a-zA-Z\u00C0-\u024F\u1E00-\u1EFF]+)+)?$/;

const REG_PHONE = /^[0]\d{9,10}$/;


const isRequired = (value) => value ? "" : "That field is required!!!";
const isEmail = (value) => REG_EMAIL.test(value) ? "" : "Email is invalid";
const isFirstName = (value) => REG_NAME.test(value) ? "" : "firstName is invalid";
const isLastName = (value) => REG_NAME.test(value) ? "" : "lastName is invalid";
const isPhone = (value) => REG_PHONE.test(value) ? "" : "Phone is invalid";
const min = (boundNum) => (value) => {
    return value.length >= boundNum ? "" : `min is ${boundNum}`;
}

const max = (boundNum) => (value) => {
    return value.length <= boundNum ? "" : `min is ${boundNum}`;
}



const createMsg = (parentNode, controlNodes, msg) => {
    let invalidDiv = document.createElement("div");
    invalidDiv.className = "invalid-feedback";
    invalidDiv.innerHTML = msg;
    parentNode.appendChild(invalidDiv);
    controlNodes.forEach((inputNode) => {
        inputNode.classList.add("is-invalid");
    });
}

const isValid = ({ value, funcs, parentNode, controlNodes }) => {
    for (const funcheck of funcs) {
        let msg = funcheck(value);
        if (msg) {
            createMsg(parentNode, controlNodes, msg);
            return msg;
        }
    }
    return "";
}

const clearMsg = () => {
    document.querySelectorAll(".is-invalid").forEach((inputNode) => {
        inputNode.classList.remove("is-invalid");
    });

    document.querySelectorAll(".invalid-feedback").forEach((item) => {
        item.remove();
    });
}



document.querySelectorAll(".blurForm").forEach((inputNode) => {
    inputNode.addEventListener("blur", (event) => {
        if (!event.target.value && !event.target.classList.contains("is-invalid")) {
            createMsg(event.target.parentElement, [event.target], "that field is required!!!");
        }
    });
});

document.querySelectorAll(".blurForm").forEach((inputNode) => {
    inputNode.addEventListener("input", (event) => {
        if (event.target.value != "" || event.target.value != null) {
            event.target.classList.remove("is-invalid");
            if(event.target.nextElementSibling){
                event.target.nextElementSibling.remove();
            }
        }
    });
});


// mảng chứa thông tin của cá chiếc thẻ  
const arr = [
    { id: new Date().toISOString(), img: "./goi1-removebg-preview.png", mouseOver: "./hinh1.jpg", price: "$20.00", link: "file:///D:/F2/homeWork/04-project/page-ph%E1%BB%A5/first-page/index.html" },
    { id: new Date().toISOString(), img: "./goi2-removebg-preview.png", mouseOver: "./hinh3.jpg", price: "$25.00", link: "file:///D:/F2/homeWork/04-project/page-ph%E1%BB%A5/seconde-page/index.html" },
    { id: new Date().toISOString(), img: "./goi3-removebg-preview.png", mouseOver: "./hinh2.jpg", price: "$7.50", link: "file:///D:/F2/homeWork/04-project/page-ph%E1%BB%A5/third-page/index.html" },
    { id: new Date().toISOString(), img: "./goi4.png", mouseOver: "hinh4.jpg", price: "$15.00", link: "file:///D:/F2/homeWork/04-project/page-ph%E1%BB%A5/fourth-page/index.html" },
    { id: new Date().toISOString(), img: "./goi5.png", mouseOver: "hinh5.jpg", price: "$85.00", link: "file:///D:/F2/homeWork/04-project/page-ph%E1%BB%A5/fifth-page/index.html" },
    { id: new Date().toISOString(), img: "./goi6.png", mouseOver: "hinh6.jpg", price: "$80.75", link: "file:///D:/F2/homeWork/04-project/page-ph%E1%BB%A5/sixth-page/index.html" },
    { id: new Date().toISOString(), img: "./goi7.png", mouseOver: "hinh7.jpg", price: "$36.00", link: "file:///D:/F2/homeWork/04-project/page-ph%E1%BB%A5/seventh-page/index.html" },
    { id: new Date().toISOString(), img: "./goi8.png", mouseOver: "hinh8.jpg", price: "$9.50", link: "file:///D:/F2/homeWork/04-project/page-ph%E1%BB%A5/eighthPage/index.html" },
    { id: new Date().toISOString(), img: "./goi9.png", mouseOver: "hinh9.jpg", price: "$130.00", link: "file:///D:/F2/homeWork/04-project/page-ph%E1%BB%A5/ninethPage/index.html" },

];

const getList = function () {
    return JSON.parse(localStorage.getItem("flamingoStore")) || [];
};

//  add tất cả  các object lên localStorage 
const addToLs = function (arr) {
    let flamingoStore = [...arr];
    localStorage.setItem("flamingoStore", JSON.stringify(flamingoStore));
}

addToLs(arr);

const renderAll = function () {
    let flamingoStore = getList();
    flamingoStore.forEach(({ img, mouseOver, price, link }) => {
        let cardBlock = document.createElement("div");
        cardBlock.className = "card__block";
        cardBlock.innerHTML = `
            <div class="card-img">
                <a  onclick="transitionToPage('${link}')">
                    <img class="img" src="${img}"
                         onmouseover = "changeImage(this, '${mouseOver}' )" 
                         onmouseout="resetImage(this , '${img}')" > 
                </a>          
             </div>
            <div class="product-decs">
                    I'm a Product <br>
                    ${price}
            </div>                         
            <button class="btn">Add to Cart</button>
        `
        document.querySelector(".card-carousel").appendChild(cardBlock);
    });
}

document.addEventListener("DOMContentLoaded", (event) => {
    renderAll();
});


window.transitionToPage = function (href) {
    document.querySelector('body').style.opacity = 0
    setTimeout(function () {
        window.location.href = href
    }, 1500);
}

document.addEventListener('DOMContentLoaded', function (event) {
    document.querySelector('body').style.opacity = 1
});

// xử lí phần form để lưu lên LocalStorage 

function Customer(firstName, lastName, email, phone, message) {
    this.id = new Date().toISOString();
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phone = phone;
    this.message = message;
}
// đúc ra anh quản lý local Storage 

function Store() { };
Store.prototype.getCustomers = function () {
    return JSON.parse(localStorage.getItem("flamingoCustomers")) || [];
}

Store.prototype.add = function (Customer) {
    let flamingoCustomers = this.getCustomers();
    flamingoCustomers.push(Customer);
    localStorage.setItem("flamingoCustomers", JSON.stringify(flamingoCustomers));
}

// renderUI 
function RenderUI() { };

RenderUI.prototype.alert = function (msg, type = "success") {
    let alertDiv = document.createElement("div");
    alertDiv.className = `alert  alert-${type}`;
    alertDiv.textContent = msg;
    document.querySelector(".notification").appendChild(alertDiv);

    setTimeout(() => {
        alertDiv.remove();
    }, 3000);
}


document.querySelector(".form").addEventListener("submit", (event) => {
    event.preventDefault();// chặn reset trang 
    clearMsg();
    const firstNameNode = document.querySelector("#firstName");
    const lastNameNode = document.querySelector("#lastName");
    const emailNode = document.querySelector("#email");
    const phoneNode = document.querySelector("#phone");
    const messageNode = document.querySelector("#message");
    // phần xử lí 
    let checkFormValid = [
        isValid({
            value: firstNameNode.value,
            funcs: [isRequired, isFirstName],
            parentNode: firstNameNode.parentElement,
            controlNodes: [firstNameNode],
        }),




        isValid({
            value: lastNameNode.value,
            funcs: [isRequired, isLastName],
            parentNode: lastNameNode.parentElement,
            controlNodes: [lastNameNode],
        }),

        isValid({
            value: emailNode.value,
            funcs: [isRequired, isEmail],
            parentNode: emailNode.parentElement,
            controlNodes: [emailNode],
        }),

        isValid({
            value: phoneNode.value,
            funcs: [isRequired, isPhone],
            parentNode: phoneNode.parentElement,
            controlNodes: [phoneNode],
        }),

        isValid({
            value: messageNode.value,
            funcs: [isRequired, min(8), max(50)],
            parentNode: messageNode.parentElement,
            controlNodes: [messageNode],
        }),
    ];

    let checkForm = checkFormValid.every((item) =>{
            return item == "";
    });

    

    let store = new Store();
    let ui = new RenderUI();

    if(checkForm){

        let newCustomer = new Customer(
            firstNameNode.value,
            lastNameNode.value,
            emailNode.value,
            phoneNode.value,
            messageNode.value
        );
        
        // thêm vào local storage 
        store.add(newCustomer);
        // hiện thông báo 
        ui.alert(`cảm ơn phần đóng góp thông tin cải thiện của bạn ${newCustomer.firstName}`);
        firstNameNode.value = "";
        lastNameNode.value = "";
        emailNode.value = "";
        phoneNode.value ="";
        messageNode.value = ""; 
    }else{
        ui.alert("bạn đã điền sai thông tin vui lòng điền lại", "danger");    
    }
    
});


