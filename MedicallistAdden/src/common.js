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
var editingId = null;
var form = document.getElementById("form");
var nameInput = document.getElementById("name");
var emailInput = document.getElementById("qty");
var phoneInput = document.getElementById("price");
form.addEventListener("click", function (event) {
    event.preventDefault();
    var name = nameInput.value.trim();
    var email = emailInput.value.trim();
    var phone = phoneInput.value.trim();
    if (editingId !== null) {
        var contact = {
            id: editingId,
            name: name,
            email: email,
            phone: phone
        };
        updateContact(editingId, contact);
    }
    else {
        var contact = {
            id: Math.random().toString(),
            name: name,
            email: email,
            phone: phone
        };
        addContact(contact);
    }
    form.reset();
});
document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('form');
    renderContacts();
});
function fetchContacts() {
    return __awaiter(this, void 0, void 0, function () {
        var apiUrl, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    apiUrl = 'http://localhost:5170/api/contacts';
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
function renderContacts() {
    return __awaiter(this, void 0, void 0, function () {
        var tableBody_1, contacts, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    tableBody_1 = document.getElementById('contactTableBody');
                    return [4 /*yield*/, fetchContacts()];
                case 1:
                    contacts = _a.sent();
                    tableBody_1.innerHTML = '';
                    contacts.forEach(function (contact) {
                        var row = document.createElement('tr');
                        row.innerHTML = "\n        <td>".concat(contact.name, "</td>\n        <td>").concat(contact.email, "</td>\n        <td>").concat(contact.phone, "</td>\n        <td>\n          <button onclick=\"editContact('").concat(contact.id, "')\">Edit</button>\n          <button onclick=\"deleteContact('").concat(contact.id, "')\">Delete</button>\n        </td>\n      ");
                        tableBody_1.appendChild(row);
                    });
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.error('Error fetching contacts:', error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function editContact(id) {
    return __awaiter(this, void 0, void 0, function () {
        var contacts, contact;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    editingId = id;
                    return [4 /*yield*/, fetchContacts()];
                case 1:
                    contacts = _a.sent();
                    contact = contacts.find(function (contact) { return contact.id === id; });
                    if (contact) {
                        nameInput.value = contact.name;
                        emailInput.value = contact.email;
                        phoneInput.value = contact.phone;
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function addContact(contact) {
    return __awaiter(this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch('http://localhost:5170/api/Contacts', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(contact)
                    })];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error('Failed to add contact');
                    }
                    renderContacts();
                    return [2 /*return*/];
            }
        });
    });
}
function updateContact(id, contact) {
    return __awaiter(this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("http://localhost:5170/api/Contacts/".concat(id), {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(contact)
                    })];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error('Failed to update contact');
                    }
                    renderContacts();
                    return [2 /*return*/];
            }
        });
    });
}
function deleteContact(id) {
    return __awaiter(this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("http://localhost:5170/api/Contacts/".concat(id), {
                        method: 'DELETE'
                    })];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error('Failed to delete contact');
                    }
                    renderContacts();
                    return [2 /*return*/];
            }
        });
    });
}
