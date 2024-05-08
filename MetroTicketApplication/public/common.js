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
let signupdiv = document.getElementById("newUserPage");
let signindiv = document.getElementById("signin");
let Home = document.getElementById("homePage");
let Submenu = document.getElementById("submenu");
let travelDetailsdiv = document.getElementById("travelDetails");
let TicketBookingdiv = document.getElementById("TicketBooking1");
let form = document.getElementById("form");
let travelhistorydiv = document.getElementById("travelhistory");
let balancediv = document.getElementById("balance");
let rechargediv = document.getElementById("recharge");
let travelIDAssign = 100;
let currentLoggedUser;
let editingid = null;
function addRow() {
    let from = document.getElementById("from").value.toUpperCase();
    let to = document.getElementById("to").value.toUpperCase();
    let price = document.getElementById("price").value;
    const newtraveldata = { id: undefined, from: from, to: to, price: parseInt(price) };
    addTravelData(newtraveldata);
    renderTable();
    // (document.getElementById("form") as HTMLInputElement).reset();
}
function renderTable() {
    return __awaiter(this, void 0, void 0, function* () {
        let data = yield fetchTravelData();
        let table = document.getElementById("body");
        let form = document.getElementById("form");
        table.innerHTML = '';
        data.forEach((item) => {
            const row = document.createElement("tr");
            row.innerHTML = `
        <td>${item.id}</td>
        <td>${item.from.toUpperCase()}</td>
        <td>${item.to.toUpperCase()}</td>
        <td>${item.price}</td>
        <td><button onclick="edit(${item.id})">Edit</button><button onclick="remove(${item.id})">Remove</button></td>
        `;
            table.appendChild(row);
        });
    });
}
function edit(id) {
    return __awaiter(this, void 0, void 0, function* () {
        let data = yield fetchTravelData();
        const index = data.findIndex(user => user.id === id);
        const travel = data[index];
        document.getElementById("from").value = travel.from;
        document.getElementById("to").value = travel.to;
        document.getElementById("price").value = travel.price.toString();
        let newFrom = document.getElementById("from").value;
        let newTo = document.getElementById("to").value;
        let newPrice = parseInt(document.getElementById("price").value);
        let newTravelData = { id: id, from: newFrom, to: newTo, price: newPrice };
        UpdateTravelData(id, newTravelData);
        renderTable();
    });
}
function remove(id) {
    return __awaiter(this, void 0, void 0, function* () {
        deleteBook(id);
    });
}
function newuser() {
    signupdiv.style.display = "block";
    Home.style.display = "none";
}
function signup() {
    if (status1 && status2 && status3 && status4) {
        signupdiv.style.display = "none";
        signindiv.style.display = "block";
        Home.style.display = "none";
    }
    else {
        alert("check the fields");
    }
}
function existingUserPage() {
    signindiv.style.display = "block";
    Home.style.display = "none";
}
function travelDetails() {
    travelDetailsdiv.style.display = "block";
    TicketBookingdiv.style.display = "none";
    form.style.display = "block";
    travelhistorydiv.style.display = "none";
    balancediv.style.display = "none";
    rechargediv.style.display = "none";
    renderTable();
}
function TicketBooking() {
    TicketBookingdiv.style.display = "block";
    travelDetailsdiv.style.display = "block";
    form.style.display = "none";
    travelhistorydiv.style.display = "none";
    balancediv.style.display = "none";
    rechargediv.style.display = "none";
}
function Tickethistory() {
    travelhistorydiv.style.display = "block";
    TicketBookingdiv.style.display = "none";
    travelDetailsdiv.style.display = "none";
    form.style.display = "none";
    balancediv.style.display = "none";
    rechargediv.style.display = "none";
    updateOrderHistory();
}
function Balance() {
    travelhistorydiv.style.display = "none";
    TicketBookingdiv.style.display = "none";
    travelDetailsdiv.style.display = "none";
    form.style.display = "none";
    balancediv.style.display = "block";
    rechargediv.style.display = "none";
}
function Recharge() {
    travelhistorydiv.style.display = "none";
    TicketBookingdiv.style.display = "none";
    travelDetailsdiv.style.display = "none";
    form.style.display = "none";
    balancediv.style.display = "none";
    rechargediv.style.display = "block";
}
function Signout() {
    rechargediv.style.display = "none";
    Submenu.style.display = "none";
    newuser();
}
let currentUserWallet = 10;
function Order() {
    return __awaiter(this, void 0, void 0, function* () {
        let data = yield fetchTravelData();
        let bookingfrom = document.getElementById("bookingfrom").value.toUpperCase();
        let bookingto = document.getElementById("bookingto").value.toUpperCase();
        let bookingmember = document.getElementById("bookingmembers").value;
        data.forEach(elemet => {
            if (bookingfrom == elemet.from && bookingto == elemet.to) {
                if (parseInt(bookingmember) * elemet.price <= currentUserWallet) {
                    let orderitem = { orderID: undefined, from: bookingfrom, to: bookingto, members: parseInt(bookingmember), price: parseInt(bookingmember) * elemet.price };
                    addOrder(orderitem);
                    currentUserWallet -= parseInt(bookingmember) * elemet.price;
                    alert("Ticket Booked Successfully");
                    balancemsg();
                    updateOrderHistory();
                }
                else {
                    alert("Insuffient Balance, Please Recharge your wallet.");
                    alert("Do you want recharge");
                }
            }
        });
    });
}
function topup() {
    let rechargeAmount = document.getElementById("rechargeAmount");
    currentUserWallet += parseInt(rechargeAmount.value);
    alert("Recharged Successfully, Current balance is : " + currentUserWallet);
    balancemsg();
}
function balancemsg() {
    let msg = document.getElementById("balancemsg");
    msg.innerHTML = `Your balance is : ${currentUserWallet}`;
}
function updateOrderHistory() {
    return __awaiter(this, void 0, void 0, function* () {
        let historybody = document.getElementById("historybody");
        let orderList = yield fetchorder();
        historybody.innerHTML = '';
        orderList.forEach(order => {
            historybody.innerHTML += `<tr><td>${order.orderID}</td><td>${order.from}</td><td>${order.to}</td><td>${order.members}</td><td>${order.price}</td><td><button onclick="returnBook(${order.orderID})">Remove</button></td></tr>`;
        });
    });
}
function returnBook(id) {
    deleteOrder(id);
}
let status1 = false;
let status2 = false;
let status3 = false;
let status4 = false;
let currentUserName;
function checkNewUserName() {
    let username = document.getElementById("newUserName").value;
    let usermsg = document.getElementById("usernamemsg");
    if (/^[a-zA-Z]+$/.test(username)) {
        status1 = true;
        usermsg.innerHTML = `<span>valid</span>`;
        usermsg.style.color = "green";
        currentUserName = username;
        status1 = true;
    }
    else {
        usermsg.innerHTML = `<span>invalid</span>`;
        usermsg.style.color = "red";
    }
}
let oldpass;
function CheckPassword() {
    let pass = document.getElementById("pass").value;
    let passmsg = document.getElementById("passmsg");
    if (/^[a-zA-z0-9]+$/.test(pass)) {
        status2 = true;
        passmsg.innerHTML = `<span>valid</span>`;
        passmsg.style.color = "green";
        oldpass = pass;
        status3 = true;
    }
    else {
        passmsg.innerHTML = `<span>invalid</span>`;
        passmsg.style.color = "red";
    }
}
let currentUsermail;
function Checkmail() {
    let mail = document.getElementById("newUserEmail").value;
    let mailmsg = document.getElementById("mailmsg");
    if (/^[a-zA-z][a-zA-z0-9]+@gmail.com$/.test(mail)) {
        status2 = true;
        mailmsg.innerHTML = `<span>valid</span>`;
        mailmsg.style.color = "green";
        currentUserName = mail;
        status2 = true;
    }
    else {
        mailmsg.innerHTML = `<span>invalid</span>`;
        mailmsg.style.color = "red";
    }
}
function signIn() {
    return __awaiter(this, void 0, void 0, function* () {
        let mail = document.getElementById("newUserEmail").value;
        let existingUserId = document.getElementById("existingUserId").value;
        let existingUserPassword = document.getElementById("existingUserPassword").value;
        let user = document.getElementById("user");
        let username = document.getElementById("newUserName").value;
        let personalList = yield fetchuser();
        if (existingUserId == mail && existingUserPassword == oldpass) {
            signindiv.style.display = "none";
            signupdiv.style.display = "none";
            Submenu.style.display = "block";
            let currentLoggedUser = { id: undefined, userName: username, email: mail, password: oldpass };
            addPerson(currentLoggedUser);
            user.innerText = `Hi, ${username}`;
        }
        personalList.forEach(element => {
            if (element.email == existingUserId && element.password == existingUserPassword) {
                signindiv.style.display = "none";
                signupdiv.style.display = "none";
                Submenu.style.display = "block";
                user.innerText = `Hi, ${element.userName}`;
            }
        });
    });
}
function confirmcheck() {
    let pass1 = document.getElementById("passagain").value;
    let passmsg1 = document.getElementById("passagainmsg");
    if (oldpass == pass1) {
        status4 = true;
        passmsg1.innerHTML = `<span>valid</span>`;
        passmsg1.style.color = "green";
    }
    else {
        passmsg1.innerHTML = `<span>invalid</span>`;
        passmsg1.style.color = "red";
    }
}
function addPerson(Person) {
    return __awaiter(this, void 0, void 0, function* () {
        const responce = yield fetch(`http://localhost:5222/api/PersonDetailsControllers`, {
            method: 'POST',
            headers: {
                'content-Type': 'application/json'
            },
            body: JSON.stringify(Person)
        });
        if (!responce.ok) {
            throw new Error('Failed to add contact');
        }
        renderTable();
    });
}
function addTravelData(TravelData) {
    return __awaiter(this, void 0, void 0, function* () {
        const responce = yield fetch(`http://localhost:5222/api/travelDataControllers`, {
            method: 'POST',
            headers: {
                'content-Type': 'application/json'
            },
            body: JSON.stringify(TravelData)
        });
        if (!responce.ok) {
            throw new Error('Failed to add contact');
        }
        renderTable();
    });
}
function addOrder(Order) {
    return __awaiter(this, void 0, void 0, function* () {
        const responce = yield fetch(`http://localhost:5222/api/OrderDetailsControllers`, {
            method: 'POST',
            headers: {
                'content-Type': 'application/json'
            },
            body: JSON.stringify(Order)
        });
        if (!responce.ok) {
            throw new Error('Failed to add contact');
        }
        renderTable();
    });
}
function UpdateTravelData(id, TravelData) {
    return __awaiter(this, void 0, void 0, function* () {
        const responce = yield fetch(`http://localhost:5222/api/travelDataControllers/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(TravelData)
        });
        if (responce.ok) {
            throw new Error('Failed to update medicine');
        }
        renderTable();
    });
}
function UpdateOrder(id, Order) {
    return __awaiter(this, void 0, void 0, function* () {
        const responce = yield fetch(`http://localhost:5222/api/OrderDetailsControllers/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Order)
        });
        if (responce.ok) {
            throw new Error('Failed to update medicine');
        }
        updateOrderHistory();
    });
}
function fetchuser() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = `http://localhost:5222/api/PersonDetailsControllers`;
        const response = yield fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch contacts');
        }
        return yield response.json();
    });
}
function fetchorder() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = `http://localhost:5222/api/OrderDetailsControllers`;
        const response = yield fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch contacts');
        }
        return yield response.json();
    });
}
function fetchTravelData() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = `http://localhost:5222/api/TravelDataControllers`;
        const response = yield fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch contacts');
        }
        return yield response.json();
    });
}
function deleteOrder(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5222/api/OrderDetailsControllers/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Failed to delete contact');
        }
        updateOrderHistory();
    });
}
function deleteBook(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5222/api/traveldatacontrollers/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Failed to delete contact');
        }
        let orderList = yield fetchorder();
        orderList.forEach(element => {
            if (id == element.orderID) {
                currentUserWallet += element.price;
            }
        });
        renderTable();
    });
}
