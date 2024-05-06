interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
}

let editingId: string | null = null;
const form = document.getElementById("form") as HTMLFormElement;
const nameInput = document.getElementById("name") as HTMLInputElement;
const emailInput = document.getElementById("qty") as HTMLInputElement;
const phoneInput = document.getElementById("price") as HTMLInputElement;

form.addEventListener("click", (event) => {
  event.preventDefault();
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const phone = phoneInput.value.trim();
  if (editingId !== null) 
  {
      const contact: Contact = {
          id: editingId,
          name: name,
          email: email,
          phone: phone
      };
      updateContact(editingId, contact);
  }
  else
  {
      const contact: Contact = {
          id: Math.random().toString(),
          name: name,
          email: email,
          phone: phone
      };
      addContact(contact);
  }
  form.reset();
});

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('form') as HTMLFormElement;
  renderContacts();
});

async function fetchContacts(): Promise<Contact[]> {
  const apiUrl = 'http://localhost:5170/api/contacts';
  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error('Failed to fetch contacts');
  }
  return await response.json();
}

async function renderContacts() {
try {
  const tableBody = document.getElementById('contactTableBody') as HTMLTableSectionElement;
    const contacts = await fetchContacts();
    tableBody.innerHTML = '';
    contacts.forEach(contact => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${contact.name}</td>
        <td>${contact.email}</td>
        <td>${contact.phone}</td>
        <td>
          <button onclick="editContact('${contact.id}')">Edit</button>
          <button onclick="deleteContact('${contact.id}')">Delete</button>
        </td>
      `;
      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error('Error fetching contacts:', error);
  }
}

async function editContact(id: string) {
  editingId = id;
  const contacts = await fetchContacts();
  const contact = contacts.find(contact => contact.id === id);
  if (contact) {
    nameInput.value = contact.name;
    emailInput.value = contact.email;
    phoneInput.value = contact.phone;
  }
}

    async function addContact(contact: Contact): Promise<void> {
      const response = await fetch('http://localhost:5170/api/Contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(contact)
      });
      if (!response.ok) {
        throw new Error('Failed to add contact');
      }
      renderContacts();
    }
    
    async function updateContact(id: string, contact: Contact): Promise<void> {
      const response = await fetch(`http://localhost:5170/api/Contacts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(contact)
      });
      if (!response.ok) {
        throw new Error('Failed to update contact');
      }
      renderContacts();
    }
    
    async function deleteContact(id: string): Promise<void> {
      const response = await fetch(`http://localhost:5170/api/Contacts/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Failed to delete contact');
      }
      renderContacts();
    }

