"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let signUpPage = document.getElementById("SignUp");
let signInPage = document.getElementById("Signin");
let himsg = document.getElementById("home");
let stocks = document.getElementById("stock");
let topup = document.getElementById("topup");
let submenu = document.getElementById("submenu");
let home = document.getElementById("home");
let cartItem = document.getElementById("cartItem");
let confirmOrder = document.getElementById("confirmOrder");
let historyorder = document.getElementById("history");
let confirmbutton = document.getElementById("confirmbutton");
let main = document.getElementById("Home");
let currentUser;
function UserNameValidation() {
    let UserName = document.getElementById("username");
    let usermsg = document.getElementById("UserMsg");
    if ((/^[a-zA-Z]+$/).test(UserName.value)) {
        usermsg.innerHTML = "valid";
        usermsg.style.color = "green";
    }
    else {
        usermsg.innerHTML = "Invalid";
        usermsg.style.color = "red";
    }
}
function Emailvalidation() {
    let email = document.getElementById("email");
    let emailmsg = document.getElementById("emailmsg");
    if ((/^[a-zA-Z]+@gmail.com$/).test(email.value)) {
        emailmsg.innerHTML = "valid";
        emailmsg.style.color = "green";
    }
    else {
        emailmsg.innerHTML = "Invalid";
        emailmsg.style.color = "red";
    }
}
function newUserPage() {
    signUpPage.style.display = "block";
    signInPage.style.display = "none";
}
function Login() {
    signInPage.style.display = "block";
    signUpPage.style.display = "none";
}
function registration() {
    var _a;
    let UserName = document.getElementById("username");
    let email = document.getElementById("email");
    let phone = document.getElementById("phone");
    let password = document.getElementById("password");
    let address = document.getElementById("address");
    let balance = document.getElementById("balance");
    let newUserProfile = document.getElementById("profileimage");
    const file = (_a = newUserProfile.files) === null || _a === void 0 ? void 0 : _a[0];
    let base64String = "";
    if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function (event) {
            var _a;
            base64String = (_a = event.target) === null || _a === void 0 ? void 0 : _a.result;
            console.log(base64String);
            let createUser = { userID: undefined, userName: UserName.value, email: email.value, password: password.value, phoneNumber: phone.value, address: address.value, balance: parseInt(balance.value), userProfile: [base64String] };
            addUser(createUser);
        };
    }
}
function loggedIn() {
    return __awaiter(this, void 0, void 0, function* () {
        let UserList = yield fetchuser();
        let exsititinUser = document.getElementById("exsititinUser").value;
        let exsititingPassword = document.getElementById("exsititingPassword").value;
        UserList.forEach(user => {
            if (user.email == exsititinUser && user.password == exsititingPassword) {
                let Home = document.getElementById("Home");
                currentUser = user;
                submenu.style.display = "block";
                signInPage.style.display = "none";
                signUpPage.style.display = "none";
                Home.style.display = "none";
                alert("looged in successfully");
            }
        });
    });
}
function Home() {
    himsg.innerHTML = `Hi, ${currentUser.userName}<br><img width=150px height=150px src="${currentUser.userProfile[0]}" alt="profile">`;
    himsg.style.display = "block";
    stocks.style.display = "none";
    topup.style.display = "none";
    cartItem.style.display = "none";
    historyorder.style.display = "none";
}
function stockshow() {
    himsg.style.display = "none";
    stocks.style.display = "block";
    topup.style.display = "none";
    cartItem.style.display = "none";
    historyorder.style.display = "none";
    confirmOrder.style.display = "none";
    confirmbutton.style.display = "none";
    RenderTable();
}
function walletshow() {
    himsg.style.display = "none";
    stocks.style.display = "none";
    topup.style.display = "block";
    cartItem.style.display = "none";
    historyorder.style.display = "none";
    confirmOrder.style.display = "none";
    confirmbutton.style.display = "none";
    renderWallet();
}
function TopUp() {
    let getAmount = document.getElementById("topupAmount");
    currentUser.balance += parseInt(getAmount.value);
    UpdateUser(currentUser.userID, currentUser);
    renderWallet();
}
function OrderHistory() {
    historyorder.style.display = "block";
    himsg.style.display = "none";
    stocks.style.display = "none";
    topup.style.display = "none";
    cartItem.style.display = "none";
    confirmOrder.style.display = "none";
    confirmbutton.style.display = "none";
    renderorderList();
}
function Loggedout() {
    historyorder.style.display = "none";
    himsg.style.display = "none";
    stocks.style.display = "none";
    topup.style.display = "none";
    cartItem.style.display = "none";
    confirmOrder.style.display = "none";
    confirmbutton.style.display = "none";
    submenu.style.display = "none";
    signInPage.style.display = "none";
    signUpPage.style.display = "none";
    main.style.display = "block";
    currentUser: Object;
}
function itemHistory() {
    confirmOrder.style.display = "block";
    historyorder.style.display = "none";
    himsg.style.display = "none";
    stocks.style.display = "none";
    topup.style.display = "none";
    cartItem.style.display = "none";
    confirmbutton.style.display = "block";
}
function ItemCard() {
    return __awaiter(this, void 0, void 0, function* () {
        cartItem.style.display = "block";
        himsg.style.display = "none";
        stocks.style.display = "none";
        topup.style.display = "none";
        historyorder.style.display = "none";
        confirmOrder.style.display = "block";
        confirmbutton.style.display = "none";
        let itemCard = document.getElementById("itemCard");
        let ItemList = yield fetchItemData();
        itemCard.innerHTML = "";
        ItemList.forEach(item => {
            itemCard.innerHTML += `
       <div id="Photocard">
            <div id="imagediv">
                <img src="${item.itemImage[0]}" alt="" width="150px" height="150px">
            </div>
            <div id="listdiv">
                <ol >
                    <li> Item No:${item.itemID}</li>
                    
                    <li>ItemName:${item.itemName}</li>
                    <li>${item.price}</li>
                    
                    <li><input type="number" id="${item.itemID}" placeholder="Quantity"></li>
                    <br>
                    <li><button onclick="AddCart(${item.itemID})">Buy</button></li>
                
                </ol>
            </div>
           
            </div>`;
        });
    });
}
let tempCartList = new Array();
function AddCart(id) {
    return __awaiter(this, void 0, void 0, function* () {
        let itemid = parseInt(document.getElementById(`${id}`).value);
        let ItemList = yield fetchItemData();
        ItemList.forEach(Item => {
            if (Item.itemID == id) {
                if (Item.quantity >= itemid) {
                    // let currentDate:Date=new Date();
                    // if(currentDate<=Item.expiryDate)
                    // {
                    let NewCart = { itemID: id, itemName: Item.itemName, quantity: itemid, price: Item.price * itemid };
                    tempCartList.push(NewCart);
                    rendercartItemList();
                    alert(`${Item.itemName} Added to Cart`);
                    let updateCartItem = { itemID: Item.itemID, itemName: Item.itemName, quantity: Item.quantity - itemid, purchaseDate: Item.purchaseDate, expiryDate: Item.expiryDate, price: Item.price, itemImage: Item.itemImage };
                    UpdateItemData(id, updateCartItem);
                    RenderTable();
                    // }
                    // else
                    // {
                    //     alert("prodcut was expired");
                    // }
                }
                else {
                    alert("Insuffient Quantity");
                }
            }
        });
    });
}
function ConfirmOrder() {
    return __awaiter(this, void 0, void 0, function* () {
        let gettotalAmount = 0;
        let totalQuantity = 0;
        tempCartList.forEach(item => {
            gettotalAmount += item.price;
            totalQuantity += item.quantity;
        });
        if (currentUser.balance >= gettotalAmount) {
            currentUser.balance -= gettotalAmount;
            UpdateUser(currentUser.userID, currentUser);
            renderWallet();
            let newOrder = { orderID: undefined, userID: currentUser.userID, itemID: undefined, totalAmount: gettotalAmount, totalQuantity: totalQuantity, purchaseDate: new Date() };
            addOrder(newOrder);
            renderorderList();
        }
        else {
            alert(`Sorry ${currentUser.userName}, Insuffient Balance for ${gettotalAmount - currentUser.balance}`);
        }
    });
}
function renderorderList() {
    return __awaiter(this, void 0, void 0, function* () {
        let orderList = yield fetchorder();
        let orderbody = document.getElementById("orderbody");
        orderbody.innerHTML = "";
        orderList.forEach(item => {
            orderbody.innerHTML += `<tr><td>${item.orderID}</td><td>${item.userID}</td><td>${item.itemID}</td><td>${item.totalQuantity}</td><td>${item.totalAmount}</td><td>${item.purchaseDate}</td></tr><br>`;
        });
    });
}
function rendercartItemList() {
    let cartbody = document.getElementById("tempcart");
    cartbody.innerHTML = "";
    tempCartList.forEach(item => {
        cartbody.innerHTML += `<tr><td>${item.itemID}</td><td>${item.itemName}</td><td>${item.quantity}</td><td>${item.price}</td></tr><br>`;
    });
}
function renderWallet() {
    let balanceshow = document.getElementById("balanceshow");
    balanceshow.innerHTML = `Your Wallet Balance is ${currentUser.balance}`;
}
function stock() {
    var _a;
    let itemName = document.getElementById("ItemName");
    let quantity = document.getElementById("Quantity");
    let purchase = document.getElementById("Purchase");
    let expiry = document.getElementById("Expiry");
    let price = document.getElementById("Price");
    let itemImage = document.getElementById("ItemImage");
    const file = (_a = itemImage.files) === null || _a === void 0 ? void 0 : _a[0];
    let base64String = "";
    if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function (event) {
            var _a;
            base64String = (_a = event.target) === null || _a === void 0 ? void 0 : _a.result;
            let newitem = { itemID: undefined, itemName: itemName.value.toLocaleUpperCase(), quantity: parseInt(quantity.value), purchaseDate: new Date(purchase.value), expiryDate: new Date(expiry.value), price: parseInt(price.value), itemImage: [base64String] };
            addItemData(newitem);
            RenderTable();
        };
    }
}
function RenderTable() {
    return __awaiter(this, void 0, void 0, function* () {
        let tbody = document.getElementById("stockbody");
        let ItemList = yield fetchItemData();
        tbody.innerHTML = "";
        ItemList.forEach(item => {
            tbody.innerHTML += `<tr>
        <td>${item.itemID}</td>
        <td>${item.itemName}</td>
        <td>${item.quantity}</td>
        <td>${item.purchaseDate.toString().slice(0, 10)}</td>
        <td>${item.expiryDate.toString().slice(0, 10)}</td>
        <td>${item.price}</td>
        <td><img src="${item.itemImage[0]}" width=120px height=120px</td>
        <td><button onclick="RemoveItem(${item.itemID})">Edit</button><button onclick="DeleteItem(${item.itemID})">Remove</button></td>
        </tr><br>`;
        });
    });
}
function DeleteItem(id) {
    return __awaiter(this, void 0, void 0, function* () {
        deleteItem(id);
    });
}
function addUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const responce = yield fetch(`http://localhost:5013/api/UserDetails`, {
            method: 'POST',
            headers: {
                'content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        if (!responce.ok) {
            throw new Error('Failed to add contact');
        }
    });
}
function addItemData(ItemData) {
    return __awaiter(this, void 0, void 0, function* () {
        const responce = yield fetch(`http://localhost:5013/api/ItemDetails`, {
            method: 'POST',
            headers: {
                'content-Type': 'application/json'
            },
            body: JSON.stringify(ItemData)
        });
        if (!responce.ok) {
            throw new Error('Failed to add Item Data');
        }
    });
}
function addOrder(Order) {
    return __awaiter(this, void 0, void 0, function* () {
        const responce = yield fetch(`http://localhost:5013/api/OrderDetails`, {
            method: 'POST',
            headers: {
                'content-Type': 'application/json'
            },
            body: JSON.stringify(Order)
        });
        if (!responce.ok) {
            throw new Error('Failed to add order');
        }
    });
}
function UpdateItemData(id, ItemData) {
    return __awaiter(this, void 0, void 0, function* () {
        const responce = yield fetch(`http://localhost:5013/api/ItemDetails/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ItemData)
        });
        if (responce.ok) {
            throw new Error('Failed to update ItemData');
        }
        RenderTable();
    });
}
function UpdateOrder(id, Order) {
    return __awaiter(this, void 0, void 0, function* () {
        const responce = yield fetch(`http://localhost:5013/api/OrderDetails/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Order)
        });
        if (responce.ok) {
            throw new Error('Failed to update order');
        }
    });
}
function UpdateUser(id, user) {
    return __awaiter(this, void 0, void 0, function* () {
        const responce = yield fetch(`http://localhost:5013/api/UserDetails/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        if (responce.ok) {
            throw new Error('Failed to update User');
        }
        renderWallet();
    });
}
function fetchuser() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = `http://localhost:5013/api/UserDetails`;
        const response = yield fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch contacts');
        }
        return yield response.json();
    });
}
function fetchorder() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = `http://localhost:5013/api/OrderDetails`;
        const response = yield fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch contacts');
        }
        return yield response.json();
    });
}
function fetchItemData() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = `http://localhost:5013/api/ItemDetails`;
        const response = yield fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch contacts');
        }
        return yield response.json();
    });
}
function deleteOrder(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5013/api/OrderDetails/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Failed to delete contact');
        }
    });
}
function deleteItem(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5013/api/ItemDetails/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Failed to delete contact');
        }
        RenderTable();
    });
}
