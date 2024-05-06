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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};

var sign = document.getElementById("signin");
var signuppage = document.getElementById("signup");
var details = document.getElementById("medicinedetails");
var form = document.getElementById("form");
var takeorders = document.getElementById("takeorder");
var cancel = document.getElementById("cancelorder");
var orderhistory = document.getElementById("history");
var walletbalance = document.getElementById("balance");
var topup = document.getElementById("topup");
var submenu = document.getElementById("submenu");
var user = document.getElementById("user");
var currentUser;
function add() {
    var addform = document.getElementById("addform");
    addform.style.display = "block";
}
var form1 = document.getElementById("form");
var nameInput = document.getElementById("medicinename");
var qtyInput = document.getElementById("qty");
var priceInput = document.getElementById("price");
var tableBody1 = document.getElementById("medicinetable");
var data = [];
function addrow() {
    var name = nameInput.value.trim();
    var qty = parseInt(qtyInput.value.trim());
    var price = parseInt(priceInput.value.trim());
    var newData = { id: data.length + 1, medicineName: name, quantity: qty, price: price };
    addMedicineapi(newData);
    renderTable();
}
function renderTable() {
    return __awaiter(this, void 0, void 0, function () {
        var medicineList;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetchmedicine()];
                case 1:
                    medicineList = _a.sent();
                    tableBody1.innerHTML = "";
                    medicineList.forEach(function (item) {
                        var row = document.createElement("tr");
                        row.innerHTML = "\n        <td>".concat(item.id, "</td>\n        <td>").concat(item.medicineName, "</td>\n        <td>").concat(item.quantity, "</td>\n        <td>").concat(item.price, "</td>\n        <td>\n          <button onclick=\"edit(").concat(item.id, ")\">Edit</button>\n          <button onclick=\"remove(").concat(item.id, ")\">Delete</button>\n        </td>\n      ");
                        tableBody1.appendChild(row);
                    });
                    return [2 /*return*/];
            }
        });
    });
}
;
var edit = function (id) {
    var item = data.find(function (item) { return item.id === id; });
    if (item) {
        nameInput.value = item.medicineName;
        qtyInput.value = String(item.quantity);
        priceInput.value = String(item.price);
    }
};
var adden = function () {
    form1.reset();
};
var reset = function () {
    form1.reset();
};
var remove1 = function (id) {
    data = data.filter(function (item) { return item.id !== id; });
    renderTable();
};
var walletbalancefromuser = 50;
var status1 = false;
var status2 = false;
var status3 = false;
function Usernamecheck() {
    var username = document.getElementById("username").value;
    var usermsg = document.getElementById("usermsg");
    if (/^[a-zA-Z]+$/.test(username)) {
        status1 = true;
        usermsg.innerHTML = "<span>valid</span>";
        usermsg.style.color = "green";
    }
    else {
        usermsg.innerHTML = "<span>invalid</span>";
        usermsg.style.color = "red";
    }
}
var oldpass;
function passcheck() {
    var pass = document.getElementById("pass").value;
    var passmsg = document.getElementById("passmsg");
    if (/^[a-zA-Z0-9@]{8,20}$/.test(pass)) {
        status2 = true;
        passmsg.innerHTML = "<span>valid</span>";
        passmsg.style.color = "green";
        oldpass = pass;
    }
    else {
        passmsg.innerHTML = "<span>invalid</span>";
        passmsg.style.color = "red";
    }
}
function confirmcheck() {
    var pass1 = document.getElementById("pass1").value;
    var passmsg1 = document.getElementById("passmsg1");
    if (oldpass == pass1) {
        status3 = true;
        passmsg1.innerHTML = "<span>valid</span>";
        passmsg1.style.color = "green";
    }
    else {
        passmsg1.innerHTML = "<span>invalid</span>";
        passmsg1.style.color = "red";
    }
}
var mailmsg = document.getElementById("mailmsg");
function mailcheck() {
    var email = document.getElementById("email").value;
    if (/^[a-zA-Z0-9]+@gmail.com$/.test(email)) {
        mailmsg.innerHTML = "valid";
        mailmsg.style.color = "green";
    }
    else {
        mailmsg.innerHTML = "invalid";
        mailmsg.style.color = "red";
    }
}
var customerID = 0;
var orderID = 0;
;
function signupbutton() {
    return __awaiter(this, void 0, void 0, function () {
        var customerList, username, email, pass, newPerson;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetchuser()];
                case 1:
                    customerList = _a.sent();
                    username = document.getElementById("username").value;
                    email = document.getElementById("email").value;
                    pass = document.getElementById("pass").value;
                    if (status1 == true && status2 == true && status3 == true) {
                        newPerson = { userName: username, email: email, password: pass };
                        addContact(newPerson);
                        sign.style.display = "none";
                        signuppage.style.display = "block";
                        signuppage.innerHTML += "<br>Hi ".concat(customerList[customerList.length - 1].userName, ",");
                    }
                    else {
                        alert("Enter the valid data");
                    }
                    return [2 /*return*/];
            }
        });
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
    return __awaiter(this, void 0, void 0, function () {
        var username2, pass2, customerList, flag;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    username2 = document.getElementById("username2").value;
                    pass2 = document.getElementById("pass2").value;
                    return [4 /*yield*/, fetchuser()];
                case 1:
                    customerList = _a.sent();
                    flag = true;
                    customerList.forEach(function (element) {
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
                    user.innerHTML = "Hi, ".concat(customerList[customerList.length - 1].userName);
                    return [2 /*return*/];
            }
        });
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
var balancemsg = document.getElementById("balancemsg");
function WalletRecharge() {
    var recharge1 = document.getElementById("rechargeAmount").value;
    walletbalancefromuser += parseInt(recharge1);
    balancemsg.innerHTML = "Wallet Balance is  : " + walletbalancefromuser;
}
var historytable = document.getElementById("historytable");
var medicine = document.getElementById("medicinetable");
function moneyUpadate() {
    return __awaiter(this, void 0, void 0, function () {
        var medicineList;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetchmedicine()];
                case 1:
                    medicineList = _a.sent();
                    medicineList.forEach(function (element) {
                        medicine.innerHTML += "<td>".concat(element.id, "</td><td>").concat(element.medicineName, "</td><td>").concat(element.quantity, "</td><td>").concat(element.price, "</td><br>");
                    });
                    return [2 /*return*/];
            }
        });
    });
}
var orderstatus = document.getElementById("orderstatus");
orderstatus.innerHTML = "order placed successfully";
orderstatus.style.display = "none";
function confirmorder() {
    return __awaiter(this, void 0, void 0, function () {
        var medicineList, orderList, getmedicine, getqty, getprice;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetchmedicine()];
                case 1:
                    medicineList = _a.sent();
                    return [4 /*yield*/, fetchorder()];
                case 2:
                    orderList = _a.sent();
                    getmedicine = document.getElementById("getmedicine").value;
                    getqty = document.getElementById("getqty").value;
                    getprice = 0;
                    medicineList.forEach(function (element) {
                        if (getmedicine.toUpperCase() == element.medicineName) {
                            getprice = element.price * parseInt(getqty);
                            if (element.quantity >= parseInt(getqty)) {
                                if (element.price * parseInt(getqty) <= walletbalancefromuser) {
                                    walletbalancefromuser -= element.price * parseInt(getqty);
                                    balancemsg.innerHTML = "Wallet Balance is  : " + walletbalancefromuser;
                                    var newOrder = { orderID: orderList.length + 1, medicineID: parseInt(getmedicine), price: getprice, qty: parseInt(getqty), orderStatus: 'ordered' };
                                    addorder(newOrder);
                                    orderList.forEach(function (element1) {
                                        historytable.innerHTML += "<tr><td>".concat(element1.orderID, "</td><td>").concat(element1.medicineID, "</td><td>").concat(element1.price, "</td><td>").concat(element1.qty, "</td><td>").concat(element1.orderStatus, "</td></tr>");
                                    });
                                    element.quantity -= parseInt(getqty);
                                    medicine.innerHTML = "<thead>\n                                    <th>Medicine ID</th>\n                                    <th>Medicine Name</th>\n                                    <th>Quantity</th>\n                                    <th>Price</th>\n                                    </thead>";
                                    medicineList.forEach(function (element) {
                                        medicine.innerHTML += "<tr><td>".concat(element.id, "</td><td>").concat(element.medicineName, "</td><td>").concat(element.quantity, "</td><td>").concat(element.price, "</td></tr><br>");
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
                    return [2 /*return*/];
            }
        });
    });
}
var tableBody = document.querySelector("#canceltable tbody");
function cancelOrder() {
    return __awaiter(this, void 0, void 0, function () {
        var orderList;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetchorder()];
                case 1:
                    orderList = _a.sent();
                    tableBody.innerHTML = "";
                    orderList.forEach(function (item) {
                        if (item.orderStatus != 'cancelled') {
                            var row = document.createElement("tr");
                            row.innerHTML = "\n        <td>".concat(item.orderID, "</td>\n        <td>").concat(item.medicineID, "</td>\n        <td>").concat(item.qty, "</td>\n        <td>").concat(item.price, "</td>\n        <td>").concat(item.orderStatus, "</td>\n        <td>\n        \n          <button onclick=\"remove(").concat(item.orderID, ")\" id=(").concat(item.orderID, ")>Delete</button>\n        </td>\n      ");
                            tableBody.appendChild(row);
                        }
                    });
                    return [2 /*return*/];
            }
        });
    });
}
// let cancelid:string;
var temp;
var tempqty;
function remove(id) {
    return __awaiter(this, void 0, void 0, function () {
        var medicineList, orderList;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetchmedicine()];
                case 1:
                    medicineList = _a.sent();
                    return [4 /*yield*/, fetchorder()];
                case 2:
                    orderList = _a.sent();
                    orderList.forEach(function (element) {
                        if (id == element.orderID) {
                            temp = element.medicineID;
                            tempqty = element.qty;
                            element.orderStatus = 'cancelled';
                            walletbalancefromuser += element.price;
                            balancemsg.innerHTML = "Wallet Balance is  : " + walletbalancefromuser;
                            historytable.innerHTML = "<thead>\n                        <th>Order ID</th>\n                        <th>Medicine ID</th>\n                        <th>Quantity</th>\n                        <th>Total Price</th>\n                        <th>Status</th>\n                        </thead>";
                            for (var i = orderList.length - 1; i < orderList.length; i++) {
                                historytable.innerHTML += "<tr><td>".concat(orderList[i].orderID, "</td><td>").concat(orderList[i].medicineID, "</td><td>").concat(orderList[i].qty, "</td><td>").concat(orderList[i].price, "</td><td>").concat(orderList[i].orderStatus, "</td></tr><br>");
                            }
                        }
                    });
                    medicineList.forEach(function (element1) {
                        if (element1.id == temp) {
                            element1.quantity += tempqty;
                        }
                    });
                    medicine.innerHTML = "<thead>\n                        <th>Medicine ID</th>\n                        <th>Medicine Name</th>\n                        <th>Quantity</th>\n                        <th>Price</th>\n                        </thead>";
                    medicineList.forEach(function (element) {
                        medicine.innerHTML += "<tr><td>".concat(element.id, "</td><td>").concat(element.medicineName, "</td><td>").concat(element.quantity, "</td><td>").concat(element.price, "</td></tr><br>");
                    });
                    cancelOrder();
                    return [2 /*return*/];
            }
        });
    });
}
;
function addContact(Person) {
    return __awaiter(this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("http://localhost:5264/person", {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(Person)
                    })];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error('Failed to add contact');
                    }
                    renderTable();
                    return [2 /*return*/];
            }
        });
    });
}
function addMedicineapi(Medicine) {
    return __awaiter(this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("http://localhost:5264/MedicalDataControllers", {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(Medicine)
                    })];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error('Failed to add medicine');
                    }
                    renderTable();
                    return [2 /*return*/];
            }
        });
    });
}
function addorder(Order) {
    return __awaiter(this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("http://localhost:5264/OrderControllers", {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(Order)
                    })];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error('Failed to add order');
                    }
                    renderTable();
                    return [2 /*return*/];
            }
        });
    });
}
function UpdateMedicine(email, Medicine) {
    return __awaiter(this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("http://localhost:5264/medicalDataControllers/".concat(email), {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(Medicine)
                    })];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error('Failed to Update medicine');
                    }
                    renderTable();
                    return [2 /*return*/];
            }
        });
    });
}
function UpdateOrder(id, order) {
    return __awaiter(this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("http://localhost:5264/OrderControllers/".concat(id), {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(order)
                    })];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error('Failed to Update medicine');
                    }
                    renderTable();
                    return [2 /*return*/];
            }
        });
    });
}
function fetchuser() {
    return __awaiter(this, void 0, void 0, function () {
        var apiUrl, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    apiUrl = "http://localhost:5264/person";
                    return [4 /*yield*/, fetch(apiUrl)];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error('Failed to fetch contacts');
                    }
                    return [4 /*yield*/, response.json()];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function fetchmedicine() {
    return __awaiter(this, void 0, void 0, function () {
        var apiUrl, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    apiUrl = "http://localhost:5264/medicalDataControllers";
                    return [4 /*yield*/, fetch(apiUrl)];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error('Failed to fetch medicine');
                    }
                    return [4 /*yield*/, response.json()];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function fetchorder() {
    return __awaiter(this, void 0, void 0, function () {
        var apiUrl, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    apiUrl = "http://localhost:5264/OrderControllers";
                    return [4 /*yield*/, fetch(apiUrl)];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error('Failed to fetch medicine');
                    }
                    return [4 /*yield*/, response.json()];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
