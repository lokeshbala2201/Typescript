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
var editingid = null;
var data = [];
var newtravel = { ID: data.length + 1, From: "ARUMBAKKAM", To: "VADAPALANI", Price: 15 };
data.push(newtravel);
function addRow() {
    var from = document.getElementById("from").value.toUpperCase();
    var to = document.getElementById("to").value.toUpperCase();
    var price = document.getElementById("price").value;
    var newtraveldata = { ID: data.length + 1, From: from, To: to, Price: parseInt(price) };
    data.push(newtraveldata);
    renderTable();
    // (document.getElementById("form") as HTMLInputElement).reset();
}
function renderTable() {
    var table = document.getElementById("body");
    var form = document.getElementById("form");
    table.innerHTML = '';
    data.forEach(function (item) {
        var row = document.createElement("tr");
        row.innerHTML = "\n        <td>".concat(item.ID, "</td>\n        <td>").concat(item.From.toUpperCase(), "</td>\n        <td>").concat(item.To.toUpperCase(), "</td>\n        <td>").concat(item.Price, "</td>\n        <td><button onclick=\"edit(").concat(item.ID, ")\">Edit</button><button onclick=\"remove(").concat(item.ID, ")\">Remove</button></td>\n        ");
        table.appendChild(row);
        form.reset();
    });
}
function edit(id) {
    var index = data.findIndex(function (user) { return user.ID === id; });
    var travel = data[index];
    document.getElementById("from").value = travel.From;
    document.getElementById("to").value = travel.To;
    document.getElementById("price").value = travel.Price.toString();
    data.splice(index, 1);
    renderTable();
}
function remove(id) {
    var index = data.findIndex(function (user) { return user.ID === id; });
    data.splice(index, 1);
    renderTable();
}
function newuser() {
    signupdiv.style.display = "block";
    Home.style.display = "none";
}
function signup() {
    signupdiv.style.display = "none";
    signindiv.style.display = "block";
    Home.style.display = "none";
}
function existingUserPage() {
    signindiv.style.display = "block";
    Home.style.display = "none";
}
function signIn() {
    signindiv.style.display = "none";
    signupdiv.style.display = "none";
    Submenu.style.display = "block";
}
function travelDetails() {
    travelDetailsdiv.style.display = "block";
    TicketBookingdiv.style.display = "none";
    form.style.display = "block";
    travelhistorydiv.style.display = "none";
    balancediv.style.display = "none";
    rechargediv.style.display = "none";
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
var order = /** @class */ (function () {
    function order(ID, from, to, members, price) {
        this.OrderID = ID;
        this.From = from;
        this.To = to;
        this.Members = members;
        this.Price = price;
    }
    return order;
}());
var orderList = new Array();
var currentUserWallet = 10;
function Order() {
    var bookingfrom = document.getElementById("bookingfrom").value.toUpperCase();
    var bookingto = document.getElementById("bookingto").value.toUpperCase();
    var bookingmember = document.getElementById("bookingmembers").value;
    data.forEach(function (elemet) {
        if (bookingfrom == elemet.From && bookingto == elemet.To) {
            if (parseInt(bookingmember) * elemet.Price <= currentUserWallet) {
                orderList.push(new order(elemet.ID, elemet.From, elemet.To, parseInt(bookingmember), parseInt(bookingmember) * elemet.Price));
                currentUserWallet -= parseInt(bookingmember) * elemet.Price;
                alert("Ticket Booked Successfully");
                balancemsg();
                updateOrderHistory();
            }
            else {
                alert("Insuufient Balance, Please Recharge your wallet.");
                alert("Do you want recharge");
            }
        }
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
    var historybody = document.getElementById("historybody");
    historybody.innerHTML = '';
    orderList.forEach(function (order) {
        historybody.innerHTML += "<tr><td>".concat(order.OrderID, "</td><td>").concat(order.From, "</td><td>").concat(order.To, "</td><td>").concat(order.Members, "</td><td>").concat(order.Price, "</td><td><button onclick=\"Cancel(").concat(order.OrderID, "\")>Cancel</button></td></tr>");
    });
}
