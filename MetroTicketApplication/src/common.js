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
var signupdiv = document.getElementById("newUserPage");
var signindiv = document.getElementById("signin");
var Home = document.getElementById("homePage");
var Submenu = document.getElementById("submenu");
var travelDetailsdiv = document.getElementById("travelDetails");
var TicketBookingdiv = document.getElementById("TicketBooking1");
var form = document.getElementById("form");
var travelhistorydiv = document.getElementById("travelhistory");
var balancediv = document.getElementById("balance");
var rechargediv = document.getElementById("recharge");
var travelIDAssign = 100;
var currentLoggedUser;
var editingid = null;
function addRow() {
    var from = document.getElementById("from").value.toUpperCase();
    var to = document.getElementById("to").value.toUpperCase();
    var price = document.getElementById("price").value;
    var newtraveldata = { id: undefined, from: from, to: to, price: parseInt(price) };
    addTravelData(newtraveldata);
    renderTable();
    // (document.getElementById("form") as HTMLInputElement).reset();
}
function renderTable() {
    return __awaiter(this, void 0, void 0, function () {
        var data, table, form;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetchTravelData()];
                case 1:
                    data = _a.sent();
                    table = document.getElementById("body");
                    form = document.getElementById("form");
                    table.innerHTML = '';
                    data.forEach(function (item) {
                        var row = document.createElement("tr");
                        row.innerHTML = "\n        <td>".concat(item.id, "</td>\n        <td>").concat(item.from.toUpperCase(), "</td>\n        <td>").concat(item.to.toUpperCase(), "</td>\n        <td>").concat(item.price, "</td>\n        <td><button onclick=\"edit(").concat(item.id, ")\">Edit</button><button onclick=\"remove(").concat(item.id, ")\">Remove</button></td>\n        ");
                        table.appendChild(row);
                    });
                    return [2 /*return*/];
            }
        });
    });
}
function edit(id) {
    return __awaiter(this, void 0, void 0, function () {
        var data, index, travel, newFrom, newTo, newPrice, newTravelData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetchTravelData()];
                case 1:
                    data = _a.sent();
                    index = data.findIndex(function (user) { return user.id === id; });
                    travel = data[index];
                    document.getElementById("from").value = travel.from;
                    document.getElementById("to").value = travel.to;
                    document.getElementById("price").value = travel.price.toString();
                    newFrom = document.getElementById("from").value;
                    newTo = document.getElementById("to").value;
                    newPrice = parseInt(document.getElementById("price").value);
                    newTravelData = { id: id, from: newFrom, to: newTo, price: newPrice };
                    UpdateTravelData(id, newTravelData);
                    renderTable();
                    return [2 /*return*/];
            }
        });
    });
}
function remove(id) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            deleteTravelData(id);
            return [2 /*return*/];
        });
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
var currentUserWallet = 10;
function Order() {
    return __awaiter(this, void 0, void 0, function () {
        var data, bookingfrom, bookingto, bookingmember;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetchTravelData()];
                case 1:
                    data = _a.sent();
                    bookingfrom = document.getElementById("bookingfrom").value.toUpperCase();
                    bookingto = document.getElementById("bookingto").value.toUpperCase();
                    bookingmember = document.getElementById("bookingmembers").value;
                    data.forEach(function (elemet) {
                        if (bookingfrom == elemet.from && bookingto == elemet.to) {
                            if (parseInt(bookingmember) * elemet.price <= currentUserWallet) {
                                var orderitem = { orderID: undefined, from: bookingfrom, to: bookingto, members: parseInt(bookingmember), price: parseInt(bookingmember) * elemet.price };
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
                    return [2 /*return*/];
            }
        });
    });
}
function topup() {
    var rechargeAmount = document.getElementById("rechargeAmount");
    currentUserWallet += parseInt(rechargeAmount.value);
    alert("Recharged Successfully, Current balance is : " + currentUserWallet);
    balancemsg();
}
function balancemsg() {
    var msg = document.getElementById("balancemsg");
    msg.innerHTML = "Your balance is : ".concat(currentUserWallet);
}
function updateOrderHistory() {
    return __awaiter(this, void 0, void 0, function () {
        var historybody, orderList;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    historybody = document.getElementById("historybody");
                    return [4 /*yield*/, fetchorder()];
                case 1:
                    orderList = _a.sent();
                    historybody.innerHTML = '';
                    orderList.forEach(function (order) {
                        historybody.innerHTML += "<tr><td>".concat(order.orderID, "</td><td>").concat(order.from, "</td><td>").concat(order.to, "</td><td>").concat(order.members, "</td><td>").concat(order.price, "</td><td><button onclick=\"deleteOrder(").concat(order.orderID, ")\">Remove</button></td></tr>");
                    });
                    return [2 /*return*/];
            }
        });
    });
}
var status1 = false;
var status2 = false;
var status3 = false;
var status4 = false;
var currentUserName;
function checkNewUserName() {
    var username = document.getElementById("newUserName").value;
    var usermsg = document.getElementById("usernamemsg");
    if (/^[a-zA-Z]+$/.test(username)) {
        status1 = true;
        usermsg.innerHTML = "<span>valid</span>";
        usermsg.style.color = "green";
        currentUserName = username;
        status1 = true;
    }
    else {
        usermsg.innerHTML = "<span>invalid</span>";
        usermsg.style.color = "red";
    }
}
var oldpass;
function CheckPassword() {
    var pass = document.getElementById("pass").value;
    var passmsg = document.getElementById("passmsg");
    if (/^[a-zA-z0-9]+$/.test(pass)) {
        status2 = true;
        passmsg.innerHTML = "<span>valid</span>";
        passmsg.style.color = "green";
        oldpass = pass;
        status3 = true;
    }
    else {
        passmsg.innerHTML = "<span>invalid</span>";
        passmsg.style.color = "red";
    }
}
var currentUsermail;
function Checkmail() {
    var mail = document.getElementById("newUserEmail").value;
    var mailmsg = document.getElementById("mailmsg");
    if (/^[a-zA-z][a-zA-z0-9]+@gmail.com$/.test(mail)) {
        status2 = true;
        mailmsg.innerHTML = "<span>valid</span>";
        mailmsg.style.color = "green";
        currentUserName = mail;
        status2 = true;
    }
    else {
        mailmsg.innerHTML = "<span>invalid</span>";
        mailmsg.style.color = "red";
    }
}
function signIn() {
    return __awaiter(this, void 0, void 0, function () {
        var mail, existingUserId, existingUserPassword, user, username, personalList, currentLoggedUser_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mail = document.getElementById("newUserEmail").value;
                    existingUserId = document.getElementById("existingUserId").value;
                    existingUserPassword = document.getElementById("existingUserPassword").value;
                    user = document.getElementById("user");
                    username = document.getElementById("newUserName").value;
                    return [4 /*yield*/, fetchuser()];
                case 1:
                    personalList = _a.sent();
                    if (existingUserId == mail && existingUserPassword == oldpass) {
                        signindiv.style.display = "none";
                        signupdiv.style.display = "none";
                        Submenu.style.display = "block";
                        currentLoggedUser_1 = { id: undefined, userName: username, email: mail, password: oldpass };
                        addPerson(currentLoggedUser_1);
                        user.innerText = "Hi, ".concat(username);
                    }
                    personalList.forEach(function (element) {
                        if (element.email == existingUserId && element.password == existingUserPassword) {
                            signindiv.style.display = "none";
                            signupdiv.style.display = "none";
                            Submenu.style.display = "block";
                            user.innerText = "Hi, ".concat(element.userName);
                        }
                    });
                    return [2 /*return*/];
            }
        });
    });
}
function confirmcheck() {
    var pass1 = document.getElementById("passagain").value;
    var passmsg1 = document.getElementById("passagainmsg");
    if (oldpass == pass1) {
        status4 = true;
        passmsg1.innerHTML = "<span>valid</span>";
        passmsg1.style.color = "green";
    }
    else {
        passmsg1.innerHTML = "<span>invalid</span>";
        passmsg1.style.color = "red";
    }
}
function addPerson(Person) {
    return __awaiter(this, void 0, void 0, function () {
        var responce;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("http://localhost:5222/api/PersonDetailsControllers", {
                        method: 'POST',
                        headers: {
                            'content-Type': 'application/json'
                        },
                        body: JSON.stringify(Person)
                    })];
                case 1:
                    responce = _a.sent();
                    if (!responce.ok) {
                        throw new Error('Failed to add contact');
                    }
                    renderTable();
                    return [2 /*return*/];
            }
        });
    });
}
function addTravelData(TravelData) {
    return __awaiter(this, void 0, void 0, function () {
        var responce;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("http://localhost:5222/api/travelDataControllers", {
                        method: 'POST',
                        headers: {
                            'content-Type': 'application/json'
                        },
                        body: JSON.stringify(TravelData)
                    })];
                case 1:
                    responce = _a.sent();
                    if (!responce.ok) {
                        throw new Error('Failed to add contact');
                    }
                    renderTable();
                    return [2 /*return*/];
            }
        });
    });
}
function addOrder(Order) {
    return __awaiter(this, void 0, void 0, function () {
        var responce;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("http://localhost:5222/api/OrderDetailsControllers", {
                        method: 'POST',
                        headers: {
                            'content-Type': 'application/json'
                        },
                        body: JSON.stringify(Order)
                    })];
                case 1:
                    responce = _a.sent();
                    if (!responce.ok) {
                        throw new Error('Failed to add contact');
                    }
                    renderTable();
                    return [2 /*return*/];
            }
        });
    });
}
function UpdateTravelData(id, TravelData) {
    return __awaiter(this, void 0, void 0, function () {
        var responce;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("http://localhost:5222/api/travelDataControllers/".concat(id), {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(TravelData)
                    })];
                case 1:
                    responce = _a.sent();
                    if (responce.ok) {
                        throw new Error('Failed to update medicine');
                    }
                    renderTable();
                    return [2 /*return*/];
            }
        });
    });
}
function UpdateOrder(id, Order) {
    return __awaiter(this, void 0, void 0, function () {
        var responce;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("http://localhost:5222/api/OrderDetailsControllers/".concat(id), {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(Order)
                    })];
                case 1:
                    responce = _a.sent();
                    if (responce.ok) {
                        throw new Error('Failed to update medicine');
                    }
                    updateOrderHistory();
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
                    apiUrl = "http://localhost:5222/api/PersonDetailsControllers";
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
function fetchorder() {
    return __awaiter(this, void 0, void 0, function () {
        var apiUrl, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    apiUrl = "http://localhost:5222/api/OrderDetailsControllers";
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
function fetchTravelData() {
    return __awaiter(this, void 0, void 0, function () {
        var apiUrl, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    apiUrl = "http://localhost:5222/api/TravelDataControllers";
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
function deleteOrder(id) {
    return __awaiter(this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("http://localhost:5222/api/OrderDetailsControllers/".concat(id), {
                        method: 'DELETE'
                    })];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error('Failed to delete contact');
                    }
                    updateOrderHistory();
                    return [2 /*return*/];
            }
        });
    });
}
function deleteTravelData(id) {
    return __awaiter(this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("http://localhost:5222/api/traveldatacontrollers/".concat(id), {
                        method: 'DELETE'
                    })];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error('Failed to delete contact');
                    }
                    renderTable();
                    return [2 /*return*/];
            }
        });
    });
}
