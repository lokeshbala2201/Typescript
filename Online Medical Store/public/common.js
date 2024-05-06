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
Object.defineProperty(exports, "__esModule", { value: true });
let sign = document.getElementById("signin");
let signuppage = document.getElementById("signup");
let details = document.getElementById("medicinedetails");
let form = document.getElementById("form");
let takeorders = document.getElementById("takeorder");
let cancel = document.getElementById("cancelorder");
let orderhistory = document.getElementById("history");
let walletbalance = document.getElementById("balance");
let topup = document.getElementById("topup");
let submenu = document.getElementById("submenu");
let user = document.getElementById("user");
let currentUser;
function add() {
    let addform = document.getElementById("addform");
    addform.style.display = "block";
}
const form1 = document.getElementById("form");
const nameInput = document.getElementById("medicinename");
const qtyInput = document.getElementById("qty");
const priceInput = document.getElementById("price");
const tableBody1 = document.getElementById("medicinetable");
var data = [];
function addrow() {
    const name = nameInput.value.trim();
    const qty = parseInt(qtyInput.value.trim());
    const price = parseInt(priceInput.value.trim());
    const newData = { id: data.length + 1, medicineName: name, quantity: qty, price: price };
    addMedicineapi(newData);
    renderTable();
}
function renderTable() {
    return __awaiter(this, void 0, void 0, function* () {
        let medicineList = yield fetchmedicine();
        tableBody1.innerHTML = "";
        medicineList.forEach((item) => {
            const row = document.createElement("tr");
            row.innerHTML = `
        <td>${item.id}</td>
        <td>${item.medicineName}</td>
        <td>${item.quantity}</td>
        <td>${item.price}</td>
        <td>
          <button onclick="edit(${item.id})">Edit</button>
          <button onclick="remove(${item.id})">Delete</button>
        </td>
      `;
            tableBody1.appendChild(row);
        });
    });
}
;
const edit = (id) => {
    const item = data.find((item) => item.id === id);
    if (item) {
        nameInput.value = item.medicineName;
        qtyInput.value = String(item.quantity);
        priceInput.value = String(item.price);
    }
};
const adden = () => {
    form1.reset();
};
const reset = () => {
    form1.reset();
};
const remove1 = (id) => {
    data = data.filter((item) => item.id !== id);
    renderTable();
};
let walletbalancefromuser = 50;
let status1 = false;
let status2 = false;
let status3 = false;
function Usernamecheck() {
    let username = document.getElementById("username").value;
    let usermsg = document.getElementById("usermsg");
    if (/^[a-zA-Z]+$/.test(username)) {
        status1 = true;
        usermsg.innerHTML = `<span>valid</span>`;
        usermsg.style.color = "green";
    }
    else {
        usermsg.innerHTML = `<span>invalid</span>`;
        usermsg.style.color = "red";
    }
}
let oldpass;
function passcheck() {
    let pass = document.getElementById("pass").value;
    let passmsg = document.getElementById("passmsg");
    if (/^[a-zA-Z0-9@]{8,20}$/.test(pass)) {
        status2 = true;
        passmsg.innerHTML = `<span>valid</span>`;
        passmsg.style.color = "green";
        oldpass = pass;
    }
    else {
        passmsg.innerHTML = `<span>invalid</span>`;
        passmsg.style.color = "red";
    }
}
function confirmcheck() {
    let pass1 = document.getElementById("pass1").value;
    let passmsg1 = document.getElementById("passmsg1");
    if (oldpass == pass1) {
        status3 = true;
        passmsg1.innerHTML = `<span>valid</span>`;
        passmsg1.style.color = "green";
    }
    else {
        passmsg1.innerHTML = `<span>invalid</span>`;
        passmsg1.style.color = "red";
    }
}
let mailmsg = document.getElementById("mailmsg");
function mailcheck() {
    let email = document.getElementById("email").value;
    if (/^[a-zA-Z0-9]+@gmail.com$/.test(email)) {
        mailmsg.innerHTML = "valid";
        mailmsg.style.color = "green";
    }
    else {
        mailmsg.innerHTML = "invalid";
        mailmsg.style.color = "red";
    }
}
let customerID = 0;
let orderID = 0;
;
function signupbutton() {
    return __awaiter(this, void 0, void 0, function* () {
        let customerList = yield fetchuser();
        let username = document.getElementById("username").value;
        let email = document.getElementById("email").value;
        let pass = document.getElementById("pass").value;
        if (status1 == true && status2 == true && status3 == true) {
            const newPerson = { userName: username, email: email, password: pass };
            addContact(newPerson);
            sign.style.display = "none";
            signuppage.style.display = "block";
            signuppage.innerHTML += `<br>Hi ${customerList[customerList.length - 1].userName},`;
        }
        else {
            alert("Enter the valid data");
        }
    });
}
function signin() {
    sign.style.display = "block";
    signuppage.style.display = "none";
}
function signupPage() {
    sign.style.display = "none";
    signuppage.style.display = "block";
}
function signup() {
    return __awaiter(this, void 0, void 0, function* () {
        let username2 = document.getElementById("username2").value;
        let pass2 = document.getElementById("pass2").value;
        let customerList = yield fetchuser();
        let flag = true;
        customerList.forEach(element => {
            if (username2 == element.email && pass2 == element.password) {
                form.style.display = "none";
                submenu.style.display = "block";
                currentUser = element;
                flag = false;
            }
        });
        if (flag) {
            alert("Enter Correct ID");
        }
        user.innerHTML = `Hi, ${customerList[customerList.length - 1].userName}`;
    });
}
function medicineDetails() {
    form.style.display = "none";
    details.style.display = "block";
    takeorders.style.display = "none";
    cancel.style.display = "none";
    orderhistory.style.display = "none";
    walletbalance.style.display = "none";
    topup.style.display = "none";
    renderTable();
}
function takeorder() {
    form.style.display = "none";
    details.style.display = "block";
    takeorders.style.display = "block";
    cancel.style.display = "none";
    orderhistory.style.display = "none";
    walletbalance.style.display = "none";
    topup.style.display = "none";
}
function cancelorder() {
    form.style.display = "none";
    details.style.display = "none";
    takeorders.style.display = "none";
    cancel.style.display = "block";
    orderhistory.style.display = "none";
    walletbalance.style.display = "none";
    topup.style.display = "none";
}
function historyorder() {
    form.style.display = "none";
    details.style.display = "none";
    takeorders.style.display = "none";
    cancel.style.display = "none";
    orderhistory.style.display = "block";
    walletbalance.style.display = "none";
    topup.style.display = "none";
}
function balance() {
    form.style.display = "none";
    details.style.display = "none";
    takeorders.style.display = "none";
    cancel.style.display = "none";
    orderhistory.style.display = "none";
    walletbalance.style.display = "block";
    topup.style.display = "none";
}
function recharge() {
    form.style.display = "none";
    details.style.display = "none";
    takeorders.style.display = "none";
    cancel.style.display = "none";
    orderhistory.style.display = "none";
    walletbalance.style.display = "none";
    topup.style.display = "block";
}
let balancemsg = document.getElementById("balancemsg");
function WalletRecharge() {
    let recharge1 = document.getElementById("rechargeAmount").value;
    walletbalancefromuser += parseInt(recharge1);
    balancemsg.innerHTML = `Wallet Balance is  : ` + walletbalancefromuser;
}
let historytable = document.getElementById("historytable");
let medicine = document.getElementById("medicinetable");
function moneyUpadate() {
    return __awaiter(this, void 0, void 0, function* () {
        let medicineList = yield fetchmedicine();
        medicineList.forEach(element => {
            medicine.innerHTML += `<td>${element.id}</td><td>${element.medicineName}</td><td>${element.quantity}</td><td>${element.price}</td><br>`;
        });
    });
}
let orderstatus = document.getElementById("orderstatus");
orderstatus.innerHTML = "order placed successfully";
orderstatus.style.display = "none";
function confirmorder() {
    return __awaiter(this, void 0, void 0, function* () {
        let medicineList = yield fetchmedicine();
        let orderList = yield fetchorder();
        let getmedicine = document.getElementById("getmedicine").value;
        let getqty = document.getElementById("getqty").value;
        let getprice = 0;
        medicineList.forEach(element => {
            if (getmedicine.toUpperCase() == element.medicineName) {
                getprice = element.price * parseInt(getqty);
                if (element.quantity >= parseInt(getqty)) {
                    if (element.price * parseInt(getqty) <= walletbalancefromuser) {
                        walletbalancefromuser -= element.price * parseInt(getqty);
                        balancemsg.innerHTML = `Wallet Balance is  : ` + walletbalancefromuser;
                        let newOrder = { orderID: orderList.length + 1, medicineID: parseInt(getmedicine), price: getprice, qty: parseInt(getqty), orderStatus: 'ordered' };
                        addorder(newOrder);
                        orderList.forEach(element1 => {
                            historytable.innerHTML += `<tr><td>${element1.orderID}</td><td>${element1.medicineID}</td><td>${element1.price}</td><td>${element1.qty}</td><td>${element1.orderStatus}</td></tr>`;
                        });
                        element.quantity -= parseInt(getqty);
                        medicine.innerHTML = `<thead>
                                    <th>Medicine ID</th>
                                    <th>Medicine Name</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    </thead>`;
                        medicineList.forEach(element => {
                            medicine.innerHTML += `<tr><td>${element.id}</td><td>${element.medicineName}</td><td>${element.quantity}</td><td>${element.price}</td></tr><br>`;
                        });
                        alert("order confirm succesfully.");
                        orderstatus.style.display = "block";
                    }
                    else {
                        alert("insuffienct Balance");
                        recharge();
                    }
                }
                else {
                    alert("insufficient quantity");
                }
            }
        });
    });
}
const tableBody = document.querySelector("#canceltable tbody");
function cancelOrder() {
    return __awaiter(this, void 0, void 0, function* () {
        let orderList = yield fetchorder();
        tableBody.innerHTML = "";
        orderList.forEach((item) => {
            if (item.orderStatus != 'cancelled') {
                const row = document.createElement("tr");
                row.innerHTML = `
        <td>${item.orderID}</td>
        <td>${item.medicineID}</td>
        <td>${item.qty}</td>
        <td>${item.price}</td>
        <td>${item.orderStatus}</td>
        <td>
        
          <button onclick="remove(${item.orderID})" id=(${item.orderID})>Delete</button>
        </td>
      `;
                tableBody.appendChild(row);
            }
        });
    });
}
// let cancelid:string;
let temp;
let tempqty;
function remove(id) {
    return __awaiter(this, void 0, void 0, function* () {
        let medicineList = yield fetchmedicine();
        let orderList = yield fetchorder();
        orderList.forEach(element => {
            if (id == element.orderID) {
                temp = element.medicineID;
                tempqty = element.qty;
                element.orderStatus = 'cancelled';
                walletbalancefromuser += element.price;
                balancemsg.innerHTML = `Wallet Balance is  : ` + walletbalancefromuser;
                historytable.innerHTML = `<thead>
                        <th>Order ID</th>
                        <th>Medicine ID</th>
                        <th>Quantity</th>
                        <th>Total Price</th>
                        <th>Status</th>
                        </thead>`;
                for (let i = orderList.length - 1; i < orderList.length; i++) {
                    historytable.innerHTML += `<tr><td>${orderList[i].orderID}</td><td>${orderList[i].medicineID}</td><td>${orderList[i].qty}</td><td>${orderList[i].price}</td><td>${orderList[i].orderStatus}</td></tr><br>`;
                }
            }
        });
        medicineList.forEach(element1 => {
            if (element1.id == temp) {
                element1.quantity += tempqty;
            }
        });
        medicine.innerHTML = `<thead>
                        <th>Medicine ID</th>
                        <th>Medicine Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        </thead>`;
        medicineList.forEach(element => {
            medicine.innerHTML += `<tr><td>${element.id}</td><td>${element.medicineName}</td><td>${element.quantity}</td><td>${element.price}</td></tr><br>`;
        });
        cancelOrder();
    });
}
;
function addContact(Person) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5264/person`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Person)
        });
        if (!response.ok) {
            throw new Error('Failed to add contact');
        }
        renderTable();
    });
}
function addMedicineapi(Medicine) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5264/MedicalDataControllers`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Medicine)
        });
        if (!response.ok) {
            throw new Error('Failed to add medicine');
        }
        renderTable();
    });
}
function addorder(Order) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5264/OrderControllers`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Order)
        });
        if (!response.ok) {
            throw new Error('Failed to add order');
        }
        renderTable();
    });
}
function UpdateMedicine(email, Medicine) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5264/medicalDataControllers/${email}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Medicine)
        });
        if (!response.ok) {
            throw new Error('Failed to Update medicine');
        }
        renderTable();
    });
}
function UpdateOrder(id, order) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5264/OrderControllers/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        });
        if (!response.ok) {
            throw new Error('Failed to Update medicine');
        }
        renderTable();
    });
}
function fetchuser() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = `http://localhost:5264/person`;
        const response = yield fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch contacts');
        }
        return yield response.json();
    });
}
function fetchmedicine() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = `http://localhost:5264/medicalDataControllers`;
        const response = yield fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch medicine');
        }
        return yield response.json();
    });
}
function fetchorder() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = `http://localhost:5264/OrderControllers`;
        const response = yield fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch medicine');
        }
        return yield response.json();
    });
}
