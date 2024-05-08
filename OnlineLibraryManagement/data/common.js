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
let bookDetails = document.getElementById("Borrowbook");
let bookHistory = document.getElementById("history");
let balance = document.getElementById("balance");
let recharge = document.getElementById("recharge");
let currentuser;
let currentuserWallet = 50;
function newuser() {
    signupdiv.style.display = "block";
    Home.style.display = "none";
}
function existingUserPage() {
    signindiv.style.display = "block";
    Home.style.display = "none";
}
// function signup()
// {
//     signupdiv.style.display="none";
//     signindiv.style.display="block";
//     Home.style.display="none";
//     Submenu.style.display="none";
// }
function BorrowBook() {
    bookDetails.style.display = "block";
    bookHistory.style.display = "none";
    balance.style.display = "none";
    recharge.style.display = "none";
    renderTable();
}
function ShowBorrowedhistory() {
    bookHistory.style.display = "block";
    bookDetails.style.display = "none";
    balance.style.display = "none";
    recharge.style.display = "none";
    RenderHistory();
}
function Balance() {
    bookHistory.style.display = "none";
    bookDetails.style.display = "none";
    balance.style.display = "block";
    recharge.style.display = "none";
    let balacerender = document.getElementById("balancemsg");
    balacerender.innerHTML = `Your Wallet Balance Is : ${currentuser.balance}`;
}
function Recharge() {
    bookHistory.style.display = "none";
    bookDetails.style.display = "none";
    balance.style.display = "none";
    recharge.style.display = "block";
    let balacerender = document.getElementById("balancemsg");
    balacerender.innerHTML = 'Your Wallet Balance Is : ';
}
function Signout() {
    bookHistory.style.display = "none";
    bookDetails.style.display = "none";
    balance.style.display = "none";
    recharge.style.display = "none";
    signindiv.style.display = "none";
    signupdiv.style.display = "block";
    Submenu.style.display = "none";
}
function addRow() {
    return __awaiter(this, void 0, void 0, function* () {
        let bookName = document.getElementById("bookname").value.toUpperCase();
        let bookAuthor = document.getElementById("bookAuthor").value.toUpperCase();
        let count = document.getElementById("count").value;
        const newBookDetail = { bookID: undefined, bookName: bookName, bookAuthor: bookAuthor, count: parseInt(count) };
        addbook(newBookDetail);
        renderTable();
    });
}
function renderTable() {
    return __awaiter(this, void 0, void 0, function* () {
        let data = yield fetchBook();
        let table = document.getElementById("BorrowBookTable");
        table.innerHTML = '';
        data.forEach((item) => {
            const row = document.createElement("tr");
            row.innerHTML = `
        <td>${item.bookID}</td>
        <td>${item.bookName}</td>
        <td>${item.bookAuthor}</td>
        <td>${item.count}</td>
        <td><button onclick="edit(${item.bookID})">Edit</button><button onclick="remove(${item.bookID})">Remove</button></td>
        `;
            table.appendChild(row);
        });
    });
}
function remove(id) {
    deleteBook(id);
}
function edit(id) {
    return __awaiter(this, void 0, void 0, function* () {
        let data = yield fetchBook();
        data.forEach(element => {
            if (element.bookID == id) {
                document.getElementById("bookname").value = element.bookName;
                document.getElementById("bookAuthor").value = element.bookAuthor;
                document.getElementById("count").value = element.count.toString();
                let bookName = document.getElementById("bookname").value.toUpperCase();
                let bookAuthor = document.getElementById("bookAuthor").value.toUpperCase();
                let count = document.getElementById("count").value;
                let updatebook = { bookID: id, bookName: bookName, bookAuthor: bookAuthor, count: parseInt(count) };
                Updatebook(id, updatebook);
                renderTable();
            }
        });
    });
}
function borrow() {
    return __awaiter(this, void 0, void 0, function* () {
        let quantity = document.getElementById("getquantity").value;
        let id = document.getElementById("getbookID").value;
        let orderList = yield fetchorder();
        let data = yield fetchBook();
        let flag = true;
        data.forEach(element => {
            if (element.bookID == parseInt(id)) {
                if (element.count >= parseInt(quantity)) {
                    if (element.count >= parseInt(quantity) && parseInt(quantity) <= 3) {
                        orderList.forEach(order => {
                            if (currentuser == order.userID) {
                                flag = false;
                                if (order.borrowCount + parseInt(quantity) <= 3) {
                                    let newOrder = { orderID: undefined, bookID: id, userID: currentuser, borrowDate: Date.now, borrowCount: parseInt(quantity), fineAmount: 0, orderStatus: 'Borrowed' };
                                    addOrder(newOrder);
                                    alert("Borrowed Successfully.");
                                    let updatebook = { bookID: id, bookName: element.bookName, bookAuthor: element.bookAuthor, count: element.count - parseInt(quantity) };
                                    Updatebook(parseInt(id), updatebook);
                                    renderTable();
                                }
                                else {
                                    alert("Purchase count exceeds 3");
                                }
                            }
                        });
                        if (flag) {
                            let newOrder = { orderID: undefined, bookID: id, userID: currentuser.userID, borrowDate: new Date(), borrowCount: parseInt(quantity), fineAmount: 0, orderStatus: 'Borrowed' };
                            addOrder(newOrder);
                            alert("Borrowed Successfully.");
                            let updatebook = { bookID: id, bookName: element.bookName, bookAuthor: element.bookAuthor, count: element.count - parseInt(quantity) };
                            Updatebook(parseInt(id), updatebook);
                            renderTable();
                        }
                    }
                    else {
                        orderList.forEach(element => {
                            if (id == element.bookID) {
                                alert("book availabe in " + addDays(element.borrowDate, 15));
                            }
                        });
                        if (parseInt(quantity) >= 3) {
                            alert("Maximum borrow 3 book at a time");
                        }
                    }
                }
                else {
                    alert("insuffient book");
                }
            }
        });
    });
}
function addDays(date, days) {
    let result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}
function RenderHistory() {
    return __awaiter(this, void 0, void 0, function* () {
        let orderList = yield fetchorder();
        let historyTable = document.getElementById("historyTable");
        historyTable.innerHTML = '';
        orderList.forEach(order => {
            if (order.userID == currentuser.userID) {
                historyTable.innerHTML += `<tr><td>${order.orderID}</td><td>${order.bookID}</td><td>${order.userID}</td><td>${order.borrowDate.split("T")[0].split("-").reverse().join("/")}</td><td>${order.borrowCount}</td><td>${order.orderStatus}</td><td>${order.fineAmount}</td><td><button onclick="returnBook(${order.orderID})">Return</button></td></tr>`;
            }
        });
    });
}
function getdaydiff(startDate, endDate) {
    const msInDay = 24 * 60 * 60 * 1000;
    return Math.round(Math.abs(Number(endDate) - Number(startDate)) / msInDay);
}
function returnBook(id) {
    return __awaiter(this, void 0, void 0, function* () {
        let orderList = yield fetchorder();
        let data = yield fetchBook();
        let quantity = document.getElementById("getquantity").value;
        let currentDate = new Date();
        orderList.forEach(order => {
            let fine = getdaydiff(currentDate, order.borrowDate);
            if (fine >= 15) {
                let newOrder = { orderID: order.orderID, bookID: order.bookID, userID: order.userID, borrowDate: order.borrowDate, borrowCount: order.borrowCount, fineAmount: fine - 15, orderStatus: 'Borrowed' };
                UpdateOrder(order.orderID, newOrder);
            }
        });
        orderList.forEach(order => {
            if (order.orderID == id) {
                if (order.userID == currentuser.userID) {
                    if (currentuser.balance >= order.fineAmount) {
                        currentuser.balance -= order.fineAmount;
                        alert(`fine amount is ${order.fineAmount}`);
                    }
                    else {
                        alert("insuffient Balance");
                    }
                    data.forEach(book => {
                        if (order.bookID == book.bookID) {
                            let bookCount = order.orderID;
                            let bookupdate = { bookID: book.bookID, bookName: book.bookName, bookAuthor: book.bookAuthor, count: book.count + bookCount };
                            Updatebook(order.bookID, bookupdate);
                            renderTable();
                        }
                    });
                }
            }
        });
        deleteOrder(id);
    });
}
function topUp() {
    let getAmount = document.getElementById("rechargeAmount");
    currentuser.balance += parseInt(getAmount.value);
    let updateWallet = { userID: currentuser.userID, userName: currentuser.userName, email: currentuser.email, password: currentuser.password, balance: currentuser.balance };
    UpdateUser(currentuser.userID, updateWallet);
    let balacerender = document.getElementById("balancemsg");
    balacerender.innerHTML = `Your Wallet Balance Is : ${currentuser.balance}`;
}
function adduser(User) {
    return __awaiter(this, void 0, void 0, function* () {
        const responce = yield fetch(`http://localhost:5248/api/UserDetails`, {
            method: 'POST',
            headers: {
                'content-Type': 'application/json'
            },
            body: JSON.stringify(User)
        });
        if (!responce.ok) {
            throw new Error('Failed to add contact');
        }
        renderTable();
    });
}
function addbook(Book) {
    return __awaiter(this, void 0, void 0, function* () {
        const responce = yield fetch(`http://localhost:5248/api/BookDetails`, {
            method: 'POST',
            headers: {
                'content-Type': 'application/json'
            },
            body: JSON.stringify(Book)
        });
        if (!responce.ok) {
            throw new Error('Failed to add book');
        }
        renderTable();
    });
}
function addOrder(Order) {
    return __awaiter(this, void 0, void 0, function* () {
        const responce = yield fetch(`http://localhost:5248/api/OrderDetails`, {
            method: 'POST',
            headers: {
                'content-Type': 'application/json'
            },
            body: JSON.stringify(Order)
        });
        if (!responce.ok) {
            throw new Error('Failed to add order');
        }
        renderTable();
        RenderHistory();
    });
}
function Updatebook(id, book) {
    return __awaiter(this, void 0, void 0, function* () {
        const responce = yield fetch(`http://localhost:5248/api/BookDetails/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(book)
        });
        if (responce.ok) {
            throw new Error('Failed to update book');
        }
        renderTable();
    });
}
function UpdateOrder(id, Order) {
    return __awaiter(this, void 0, void 0, function* () {
        const responce = yield fetch(`http://localhost:5248/api/OrderDetails/${id}`, {
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
function UpdateUser(id, User) {
    return __awaiter(this, void 0, void 0, function* () {
        const responce = yield fetch(`http://localhost:5248/api/UserDetails/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(User)
        });
        if (responce.ok) {
            throw new Error('Failed to update user');
        }
    });
}
function fetchuser() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = `http://localhost:5248/api/UserDetails`;
        const response = yield fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch contacts');
        }
        return yield response.json();
    });
}
function fetchorder() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = `http://localhost:5248/api/OrderDetails`;
        const response = yield fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch order');
        }
        return yield response.json();
    });
}
function fetchBook() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = `http://localhost:5248/api/BookDetails`;
        const response = yield fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch book');
        }
        return yield response.json();
    });
}
function deleteOrder(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5248/api/OrderDetails/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Failed to delete order');
        }
        RenderHistory();
    });
}
function deleteBook(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5248/api/BookDetails/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Failed to delete book');
        }
        renderTable();
    });
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
        let flag = true;
        if (existingUserId == mail && existingUserPassword == oldpass) {
            signindiv.style.display = "none";
            signupdiv.style.display = "none";
            Submenu.style.display = "block";
            currentuser = { userID: undefined, userName: username, email: mail, password: oldpass, balance: 0 };
            adduser(currentuser);
            user.innerText = `Hi, ${username}`;
            flag = false;
        }
        personalList.forEach(element => {
            if (element.email == existingUserId && element.password == existingUserPassword) {
                signindiv.style.display = "none";
                signupdiv.style.display = "none";
                Submenu.style.display = "block";
                user.innerText = `Hi, ${element.userName}`;
                currentuser = { userID: element.userID, userName: element.userName, email: element.email, password: element.password, balance: element.balance };
                flag = false;
            }
        });
        if (flag) {
            alert("Enter Correct Email & PassWord.");
        }
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
