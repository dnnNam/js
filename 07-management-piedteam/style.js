
// chức năng add thêm sản phẩm 
document.querySelector("#btn-one").addEventListener("click" , (event) =>{
        let nameProduct = document.querySelector(".name").value;
        let priceProduct = document.querySelector(".price").value;
        let amountProduct = document.querySelector(".amount").value;
        let decsProduct = document.querySelector(".decs").value;
       
        
        let item = {
            id: new Date().toISOString(),
            name: nameProduct.trim(),
            price: priceProduct.trim(),
            amount: amountProduct.trim(),
            decs: decsProduct.trim(),
        };
       
        
        // hiển thị lên UI
        addItemToUI(item);
        // hiển thị lên LS
        addItemToLS(item);
});

const addItemToUI = (item) =>{
    
    // tạo ra cái card 
    let newCard = document.createElement("div");
    newCard.className = "cardBlock";
    newCard.innerHTML = `
        <div class="img-card">
            <img data-id= "${item.id}" class="img-1" src="${item.decs}" alt="">
        </div>
        <div class="decs-card">
            <p class="decs-content">
                <strong> ${item.name}</strong><br>
                <strong>Giá:${item.price}</strong><br>
                <strong>Số lượng:${item.amount}</strong><br>
                    
            </p>
        </div>
    
    `
    document.querySelector(".list__card").appendChild(newCard);
};
// hàm lấy các item trên localStorage, nếu list có phần tử thì parse ép kiểu trả ra mảng , còn không mảng là true trả ra mảng rỗng  
const getList = () =>{
    return JSON.parse(localStorage.getItem("list__card")) || [] ;
}; 
// hàm hiển thị trên localStorage 
const addItemToLS = (item) =>{
    let list = getList();
    list.push(item); // nhét item 
    localStorage.setItem("list__card" , JSON.stringify(list));
}

const init = () =>{
    let list = getList();
    list.forEach((item) => {
        addItemToUI(item);
    });
};

init();

// khi bấm vào card thì sẽ hiển thị thông tin trên thanh nhập dữ liệu 
var idCard;
var getInfor
document.querySelector(".list__card").addEventListener("click" , (event) =>{
        idCard = event.target.dataset.id; // lấy ra id của đứa bị click
    
        // lấy phần tử bị click trên localStorage
        let list = getList();
         getInfor = list.find((item) =>{
            return item.id === idCard;
        });
        
        //hiên thị lên cho người dùng 
        if(getInfor){
            document.querySelector(".name").value = getInfor.name;
             document.querySelector(".price").value = getInfor.price;
             document.querySelector(".amount").value = getInfor.amount;
             document.querySelector(".decs").value = getInfor.decs;
        }

});

// khi bấm delete thì xóa 
document.querySelector("#btn-two").addEventListener("click" , (event) =>{
        let listCard = getList();

       
        listCard = listCard.filter((item) =>{
            return item.id != idCard;
        });

        let isConfirmed = confirm(`Bạn có chắc là muốn xóa item : ${getInfor.name}`);
        // hiển thị lên UI
        if(isConfirmed){
            // xóa trong localStorage 
             localStorage.setItem("list__card" , JSON.stringify(listCard));
             // render ra lại giao diện 
            document.querySelector(".list__card").innerHTML = "";
            listCard.forEach((item) =>{
                addItemToUI(item);
            });
        }
    
});

// clear 
document.querySelector("#btn-three").addEventListener("click" , (event) =>{
    document.querySelector(".name").value = "";
    document.querySelector(".price").value = "";
    document.querySelector(".amount").value = "";
    document.querySelector(".decs").value = "";
});

// tìm kiếm
var inputValue; 
document.querySelector("#inputSearch").addEventListener("keyup" , (event) =>{
        inputValue = event.target.value.toLowerCase();
});

document.querySelector("#search").addEventListener("click" , (event) =>{
     
     event.preventDefault();
     let list = getList();

     list = list.filter((item) =>{
         return item.name.toLowerCase().includes(inputValue);
     });

     // xóa màn hình và render ra lại 
        document.querySelector(".list__card").innerHTML = "";
        list.forEach((item) =>{
           addItemToUI(item);
        });
});










