let sign=document.getElementById("signin") as HTMLDivElement;
let signuppage=document.getElementById("signup") as HTMLDivElement;
let details=document.getElementById("medicinedetails") as HTMLDivElement;
let form=document.getElementById("form") as HTMLDivElement;
let takeorders=document.getElementById("takeorder") as HTMLDivElement;
let cancel=document.getElementById("cancelorder") as HTMLDivElement;
let orderhistory=document.getElementById("history")as HTMLDivElement;
let walletbalance=document.getElementById("balance")as HTMLDivElement;
let topup=document.getElementById("topup")as HTMLDivElement;
let submenu=document.getElementById("submenu")as HTMLDivElement;
let user=document.getElementById("user")as HTMLParagraphElement;

let currentUser:object;
interface MedicalData
{
    id: number;
    medicineName:string;
    quantity:number;
    price:number;
}

function add()
{
    let addform=document.getElementById("addform") as HTMLInputElement;
    addform.style.display="block";
}

  

  
  const form1 = document.getElementById("form") as HTMLFormElement;
  const nameInput = document.getElementById("medicinename") as HTMLInputElement;
  const qtyInput = document.getElementById("qty") as HTMLInputElement;
  const priceInput = document.getElementById("price") as HTMLInputElement;
  const tableBody1 = document.getElementById("medicinetable") as HTMLTableSectionElement;
var data:MedicalData[]=[];
function addrow() {
    
    const name = nameInput.value.trim();
    const qty = parseInt(qtyInput.value.trim());
    const price = parseInt(priceInput.value.trim());

    const newData: MedicalData = { id: data.length + 1,medicineName: name, quantity:qty,price: price };
   
    addMedicineapi(newData);
    renderTable();

  }
  
async function renderTable(){
    let medicineList=await fetchmedicine();
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
  };
  
  const edit = (id: number) => {
 
    const item = data.find((item) => item.id === id);
    if (item) {
      nameInput.value = item.medicineName;
      qtyInput.value = String(item.quantity);
      priceInput.value = String(item.price);

    }
  };
  const adden=()=>{
    form1.reset();
    
  }

  const reset = () => {
    form1.reset();
  
  }
  
  const remove1 = (id: number) => {
    data=data.filter((item) => item.id !== id);
    renderTable();
  };


let walletbalancefromuser:number=50;
let status1:boolean=false;
let status2:boolean=false;
let status3:boolean=false;


function Usernamecheck()
{
    let username=(document.getElementById("username")as HTMLInputElement).value;
    let usermsg=(document.getElementById("usermsg")as HTMLSpanElement);

    if(/^[a-zA-Z]+$/.test(username))
    {
        status1=true;
        usermsg.innerHTML=`<span>valid</span>`;
        usermsg.style.color="green";


    }
    else{
        usermsg.innerHTML=`<span>invalid</span>`;
        usermsg.style.color="red";
        
    }
}
let oldpass:string;
function passcheck()
{
    let pass=(document.getElementById("pass")as HTMLInputElement).value;
    let passmsg=(document.getElementById("passmsg")as HTMLSpanElement);

    if(/^[a-zA-Z0-9@]{8,20}$/.test(pass))
    {
        status2=true;
        passmsg.innerHTML=`<span>valid</span>`;
        passmsg.style.color="green";
        oldpass=pass;

    }
    else{
        passmsg.innerHTML=`<span>invalid</span>`;
        passmsg.style.color="red";
        
    }
}

function confirmcheck()
{
    let pass1=(document.getElementById("pass1")as HTMLInputElement).value;
    let passmsg1=(document.getElementById("passmsg1")as HTMLSpanElement);
    if(oldpass==pass1)
    {
        status3=true;
        passmsg1.innerHTML=`<span>valid</span>`;
        passmsg1.style.color="green";
        
    }
    else{
        passmsg1.innerHTML=`<span>invalid</span>`;
        passmsg1.style.color="red";
    }
}
let mailmsg=document.getElementById("mailmsg")as HTMLSpanElement;
function mailcheck()
{
    let email:string=(document.getElementById("email")as HTMLInputElement).value;

    if(/^[a-zA-Z0-9]+@gmail.com$/.test(email))
    {
        mailmsg.innerHTML="valid";
        mailmsg.style.color="green";

    }
    else{
        mailmsg.innerHTML="invalid";
        mailmsg.style.color="red";
    }
}

let customerID:number=0;
let orderID:number=0;
interface Order{
    orderID:number;
    medicineID:number;
    price:number;
    qty:number;
    orderStatus:string;
    
}



interface person
{
    email:string;
    userName:string;
    password:string;
   
    


}
;


async function signupbutton()
{
    let customerList=await fetchuser();
    let username:string=(document.getElementById("username")as HTMLInputElement).value;
    let email:string=(document.getElementById("email")as HTMLInputElement).value;
    let pass:string=(document.getElementById("pass")as HTMLInputElement).value;
    
    if(status1==true && status2==true&&status3==true)
        {
            const newPerson:person={userName:username,email:email,password:pass};
            addContact(newPerson);
            sign.style.display="none";
            signuppage.style.display="block";
            signuppage.innerHTML+=`<br>Hi ${customerList[customerList.length-1].userName},`;  
        }
        else{
            alert("Enter the valid data");
        }
    
    

}
function signin()
{
    
    sign.style.display="block";
    signuppage.style.display="none";
}

function signupPage()
{
    sign.style.display="none";
    signuppage.style.display="block";
    

}
async function signup(){
    let username2:string=(document.getElementById("username2")as HTMLInputElement).value;
    let pass2:string=(document.getElementById("pass2")as HTMLInputElement).value;
    let customerList=await fetchuser();
    let flag:boolean=true;
    customerList.forEach(element => {
        if(username2==element.email && pass2==element.password)
        {
           form.style.display="none"; 
           submenu.style.display="block";
           currentUser=element;
           flag=false;

        }
        
    });
    if(flag)
        {
            alert("Enter Correct ID")
        }
    user.innerHTML=`Hi, ${customerList[customerList.length-1].userName}`
    
}
function medicineDetails()
{
    form.style.display="none";
    details.style.display="block";
    takeorders.style.display="none";
    cancel.style.display="none";
    orderhistory.style.display="none";
    walletbalance.style.display="none";
    topup.style.display="none";
    renderTable();

}
function takeorder()
{
    form.style.display="none";
    details.style.display="block";
    takeorders.style.display="block";
    cancel.style.display="none";
    orderhistory.style.display="none";
    walletbalance.style.display="none";
    topup.style.display="none";
}
function cancelorder()
{
    
    form.style.display="none";
    details.style.display="none";
    takeorders.style.display="none";
    cancel.style.display="block";
    orderhistory.style.display="none";
    walletbalance.style.display="none";
    topup.style.display="none";
    
}
function historyorder()
{
    form.style.display="none";
    details.style.display="none";
    takeorders.style.display="none";
    cancel.style.display="none";
    orderhistory.style.display="block";
    walletbalance.style.display="none";
    topup.style.display="none";
}
function balance()
{
    form.style.display="none";
    details.style.display="none";
    takeorders.style.display="none";
    cancel.style.display="none";
    orderhistory.style.display="none";
    walletbalance.style.display="block";
    topup.style.display="none";
}
function recharge()
{
    form.style.display="none";
    details.style.display="none";
    takeorders.style.display="none";
    cancel.style.display="none";
    orderhistory.style.display="none";
    walletbalance.style.display="none";
    topup.style.display="block";
}



let balancemsg=document.getElementById("balancemsg") as HTMLInputElement;



function WalletRecharge()
{
    
    let recharge1=(document.getElementById("rechargeAmount") as HTMLInputElement).value;
    walletbalancefromuser+=parseInt(recharge1);
    
    balancemsg.innerHTML=`Wallet Balance is  : `+walletbalancefromuser;

}
let historytable=document.getElementById("historytable")as HTMLTableElement;

let medicine=document.getElementById("medicinetable")as HTMLTableElement;
async function moneyUpadate()
{
    let medicineList=await fetchmedicine();
    medicineList.forEach(element => {
        medicine.innerHTML+=`<td>${element.id}</td><td>${element.medicineName}</td><td>${element.quantity}</td><td>${element.price}</td><br>`;
    });
}

let orderstatus=(document.getElementById("orderstatus") as HTMLInputElement);
orderstatus.innerHTML="order placed successfully";
orderstatus.style.display="none";
async function  confirmorder()
{
    let medicineList=await fetchmedicine();
    let orderList=await fetchorder();
    let getmedicine:string=(document.getElementById("getmedicine")as HTMLInputElement).value;
    let getqty:string=(document.getElementById("getqty")as HTMLInputElement).value;
    let getprice:number=0;
    
    
    medicineList.forEach(element=>
        {
            
            if(getmedicine.toUpperCase()==element.medicineName)
                {
                    getprice=element.price*parseInt(getqty);
                    if(element.quantity>=parseInt(getqty))
                        {

                            if(element.price*parseInt(getqty)<=walletbalancefromuser)
                                {
                                    walletbalancefromuser-=element.price*parseInt(getqty);
                                    balancemsg.innerHTML=`Wallet Balance is  : `+walletbalancefromuser;
                                    let newOrder:Order={orderID:orderList.length+1,medicineID:parseInt(getmedicine),price:getprice,qty:parseInt(getqty),orderStatus:'ordered'}
                                    addorder(newOrder);
                                    
                                    orderList.forEach(element1=>
                                        {
                                            historytable.innerHTML+=`<tr><td>${element1.orderID}</td><td>${element1.medicineID}</td><td>${element1.price}</td><td>${element1.qty}</td><td>${element1.orderStatus}</td></tr>`;
                                        }
                                    )
                                    
                                    
                                    
                                    element.quantity-=parseInt(getqty);
                                    medicine.innerHTML=`<thead>
                                    <th>Medicine ID</th>
                                    <th>Medicine Name</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    </thead>`
                                    medicineList.forEach(element => {
                                        medicine.innerHTML+=`<tr><td>${element.id}</td><td>${element.medicineName}</td><td>${element.quantity}</td><td>${element.price}</td></tr><br>`;
                                    });
                                    alert("order confirm succesfully.")
                                    orderstatus.style.display="block";
                                }
                                else{
                                    alert("insuffienct Balance");
                                    recharge();
                                }
                        }
                        else{
                            alert("insufficient quantity")
                        }
                    
                }
        });
    
    

}
const tableBody = document.querySelector("#canceltable tbody") as HTMLTableSectionElement;
async function  cancelOrder(){
    

   
    let orderList=await fetchorder();
    tableBody.innerHTML = "";
    orderList.forEach((item) => {
      if(item.orderStatus!='cancelled')
        {
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

}

// let cancelid:string;
let temp:number;
let tempqty:number;
async function remove(id: number){
    let medicineList=await fetchmedicine();
    let orderList=await fetchorder();
        orderList.forEach(element=>
            {
                if(id==element.orderID)
                    {
                        temp=element.medicineID;
                        tempqty=element.qty;
                        element.orderStatus='cancelled';
                        walletbalancefromuser+=element.price;
                        balancemsg.innerHTML=`Wallet Balance is  : `+walletbalancefromuser;
                       
                        historytable.innerHTML=`<thead>
                        <th>Order ID</th>
                        <th>Medicine ID</th>
                        <th>Quantity</th>
                        <th>Total Price</th>
                        <th>Status</th>
                        </thead>`
                        for(let i=orderList.length-1;i<orderList.length;i++)
                        {
                                historytable.innerHTML+=`<tr><td>${orderList[i].orderID}</td><td>${orderList[i].medicineID}</td><td>${orderList[i].qty}</td><td>${orderList[i].price}</td><td>${orderList[i].orderStatus}</td></tr><br>`;

                        }
                        

                    }
            }
        );
        medicineList.forEach(element1 => {
                            
            if(element1.id==temp)
                {
                    element1.quantity+=tempqty;

                }
           
        });
        medicine.innerHTML=`<thead>
                        <th>Medicine ID</th>
                        <th>Medicine Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        </thead>`
                        medicineList.forEach(element => {
                            medicine.innerHTML+=`<tr><td>${element.id}</td><td>${element.medicineName}</td><td>${element.quantity}</td><td>${element.price}</td></tr><br>`;
                        });
        cancelOrder();

  };  
 

async function addContact(Person:person) :Promise<void>{
    const response=await fetch(`http://localhost:5264/person`,
        {
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(Person)
        });
        if(!response.ok){
            throw new Error('Failed to add contact');

        }
        renderTable();

    
    
}

async function addMedicineapi(Medicine:MedicalData) :Promise<void>{
    const response=await fetch(`http://localhost:5264/MedicalDataControllers`,
        {
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(Medicine)
        });
        if(!response.ok){
            throw new Error('Failed to add medicine');

        }
        renderTable();

    
    
}
async function addorder(Order:Order) :Promise<void>{
    const response=await fetch(`http://localhost:5264/OrderControllers`,
        {
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(Order)
        });
        if(!response.ok){
            throw new Error('Failed to add order');

        }
        renderTable();

}

async function UpdateMedicine(email:string, Medicine:MedicalData) {
    const response=await fetch(`http://localhost:5264/medicalDataControllers/${email}`,{
        method:'PUT',
        headers:{
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(Medicine)
    });
    if(!response.ok)
        {
            throw new Error('Failed to Update medicine')
        }
    renderTable();
    

}
async function UpdateOrder(id:number, order:Order) {
    const response=await fetch(`http://localhost:5264/OrderControllers/${id}`,{
        method:'PUT',
        headers:{
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(order)
    });
    if(!response.ok)
        {
            throw new Error('Failed to Update medicine')
        }
    renderTable();
    

}

async function fetchuser():Promise<person[]> {
    const apiUrl=`http://localhost:5264/person`;
    const response=await fetch(apiUrl);
    if(!response.ok)
        {
            throw new Error('Failed to fetch contacts');
        }
    return await response.json();
}

async function fetchmedicine():Promise<MedicalData[]> {
    const apiUrl=`http://localhost:5264/medicalDataControllers`;
    const response=await fetch(apiUrl);
    if(!response.ok)
        {
            throw new Error('Failed to fetch medicine');
        }
    return await response.json();
}

async function fetchorder():Promise<Order[]> {
    const apiUrl=`http://localhost:5264/OrderControllers`;
    const response=await fetch(apiUrl);
    if(!response.ok)
        {
            throw new Error('Failed to fetch medicine');
        }
    return await response.json();
}







export { };

