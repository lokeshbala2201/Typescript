let signupdiv=document.getElementById("newUserPage") as HTMLDivElement;
let signindiv=document.getElementById("signin") as HTMLDivElement;
let Home=document.getElementById("homePage") as HTMLDivElement;
let Submenu=document.getElementById("submenu") as HTMLDivElement;
let travelDetailsdiv=document.getElementById("travelDetails") as HTMLDivElement;
let TicketBookingdiv=document.getElementById("TicketBooking1") as HTMLDivElement;
let form=document.getElementById("form") as HTMLDivElement;
let travelhistorydiv=document.getElementById("travelhistory") as HTMLDivElement;
let balancediv=document.getElementById("balance") as HTMLDivElement;
let rechargediv=document.getElementById("recharge") as HTMLDivElement;
let travelIDAssign:number =100;
let currentLoggedUser:any;


interface TravelData{
    id:any;
    from:string;
    to:string;
    price:number;
}
let editingid:null|number=null;





function addRow()
{
     
    let from:string=(document.getElementById("from") as HTMLInputElement).value.toUpperCase();
    let to=(document.getElementById("to") as HTMLInputElement).value.toUpperCase();
    let price=(document.getElementById("price") as HTMLInputElement).value;
    const newtraveldata:TravelData={id:undefined,from:from,to:to,price:parseInt(price)};
    addTravelData(newtraveldata);
    renderTable();
    // (document.getElementById("form") as HTMLInputElement).reset();


}

    
   

async function renderTable(){
    let data=await fetchTravelData();   
    let table=(document.getElementById("body") as HTMLTableSectionElement);
    let form=document.getElementById("form") as HTMLFormElement;
    table.innerHTML='';
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
}
async function edit(id:number)
{
    let data = await fetchTravelData();
    const index=data.findIndex(user=> user.id===id);
    const travel=data[index];
    (document.getElementById("from") as HTMLInputElement).value=travel.from;
    (document.getElementById("to") as HTMLInputElement).value=travel.to;
    (document.getElementById("price") as HTMLInputElement).value=travel.price.toString();

    let newFrom=(document.getElementById("from") as HTMLInputElement).value
    let newTo=(document.getElementById("to") as HTMLInputElement).value
    let newPrice=parseInt((document.getElementById("price") as HTMLInputElement).value)
    let newTravelData:TravelData={id:id,from:newFrom,to:newTo,price:newPrice};
    UpdateTravelData(id,newTravelData);
    
    renderTable();
    


}
async function remove(id:number)
{
    deleteBook(id);
    

}




function newuser()
{
    signupdiv.style.display="block";
    Home.style.display="none";
}
function signup()
{
    
    if(status1&&status2&&status3&&status4)
        {
           
            
            
            signupdiv.style.display="none";
            signindiv.style.display="block";
            Home.style.display="none";

        }
        else{
            alert("check the fields");
        }
}
function existingUserPage()
{
    signindiv.style.display="block";
    Home.style.display="none";   
}

function travelDetails()
{
    travelDetailsdiv.style.display="block";
    TicketBookingdiv.style.display="none";
    form.style.display="block";
    travelhistorydiv.style.display="none";
    balancediv.style.display="none";
    rechargediv.style.display="none"
    renderTable();


}
function TicketBooking()
{
    TicketBookingdiv.style.display="block";
    travelDetailsdiv.style.display="block";
    form.style.display="none";
    travelhistorydiv.style.display="none";
    balancediv.style.display="none";
    rechargediv.style.display="none"




}
function Tickethistory()
{
    travelhistorydiv.style.display="block";
    TicketBookingdiv.style.display="none";
    travelDetailsdiv.style.display="none";
    form.style.display="none";
    balancediv.style.display="none";
    rechargediv.style.display="none"
    updateOrderHistory();


}
function Balance()
{
    travelhistorydiv.style.display="none";
    TicketBookingdiv.style.display="none";
    travelDetailsdiv.style.display="none";
    form.style.display="none";
    balancediv.style.display="block";
    rechargediv.style.display="none"


}
function Recharge()
{
    travelhistorydiv.style.display="none";
    TicketBookingdiv.style.display="none";
    travelDetailsdiv.style.display="none";
    form.style.display="none";
    balancediv.style.display="none";
    rechargediv.style.display="block";
}
function Signout()
{
    rechargediv.style.display="none";
    Submenu.style.display="none";
    
    newuser();
}
interface OrderDetails{
    orderID:any;
    from:string;
    to:string;
    members:number;
    price:number;

    

}

let currentUserWallet:number=10;
async function Order()
{
    let data = await fetchTravelData();
    let bookingfrom=(document.getElementById("bookingfrom")as HTMLInputElement).value.toUpperCase();
    let bookingto=(document.getElementById("bookingto")as HTMLInputElement).value.toUpperCase();
    let bookingmember=(document.getElementById("bookingmembers")as HTMLInputElement).value;
    data.forEach(elemet =>
        {
            if(bookingfrom==elemet.from && bookingto==elemet.to)
            {
                if(parseInt(bookingmember)*elemet.price<=currentUserWallet)
                {
                   
                    let orderitem:OrderDetails={orderID:undefined,from:bookingfrom,to:bookingto,members:parseInt(bookingmember),price:parseInt(bookingmember)*elemet.price};
                    addOrder(orderitem);
                    currentUserWallet-=parseInt(bookingmember)*elemet.price;
                    alert("Ticket Booked Successfully");
                    balancemsg();
                    updateOrderHistory();
                
                }
                else
                {
                    alert("Insuffient Balance, Please Recharge your wallet.");
                    alert("Do you want recharge");
                    
                }
            }
        }
    )



}
function topup()
{
    let rechargeAmount=document.getElementById("rechargeAmount")as HTMLInputElement;
    currentUserWallet+=parseInt(rechargeAmount.value);
    alert("Recharged Successfully, Current balance is : "+currentUserWallet);
    balancemsg();
}
function balancemsg()
{
    let msg=document.getElementById("balancemsg")as HTMLHeadingElement;
    msg.innerHTML=`Your balance is : ${currentUserWallet}`;
   
}
async function updateOrderHistory()
{
    let historybody=document.getElementById("historybody")as HTMLTableSectionElement;
    let orderList=await fetchorder();
    historybody.innerHTML='';
    orderList.forEach(order=>
        {
            historybody.innerHTML+=`<tr><td>${order.orderID}</td><td>${order.from}</td><td>${order.to}</td><td>${order.members}</td><td>${order.price}</td><td><button onclick="returnBook(${order.orderID})">Remove</button></td></tr>`
        }
    )   
}
function returnBook(id:number)
{
    deleteOrder(id);
}


let status1:boolean=false;
let status2:boolean=false;
let status3:boolean=false;
let status4:boolean=false;

let currentUserName:string;
function checkNewUserName()
{
    let username=(document.getElementById("newUserName")as HTMLInputElement).value;
    let usermsg=(document.getElementById("usernamemsg")as HTMLSpanElement);

    if(/^[a-zA-Z]+$/.test(username))
    {
        status1=true;
        usermsg.innerHTML=`<span>valid</span>`;
        usermsg.style.color="green";
        currentUserName=username;
        status1=true;
        


    }
    else{
        usermsg.innerHTML=`<span>invalid</span>`;
        usermsg.style.color="red";
        
    }
}
let oldpass:string;
function CheckPassword()
{
    let pass=(document.getElementById("pass")as HTMLInputElement).value;
    let passmsg=(document.getElementById("passmsg")as HTMLSpanElement);

    if(/^[a-zA-z0-9]+$/.test(pass))
    {
        status2=true;
        passmsg.innerHTML=`<span>valid</span>`;
        passmsg.style.color="green";
        oldpass=pass
        status3=true;

    }
    else{
        passmsg.innerHTML=`<span>invalid</span>`;
        passmsg.style.color="red";
        
    }
}
let currentUsermail:string;
function Checkmail()
{
    let mail=(document.getElementById("newUserEmail")as HTMLInputElement).value;
    let mailmsg=(document.getElementById("mailmsg")as HTMLSpanElement);

    if(/^[a-zA-z][a-zA-z0-9]+@gmail.com$/.test(mail))
    {
        status2=true;
        mailmsg.innerHTML=`<span>valid</span>`;
        mailmsg.style.color="green";
        currentUserName=mail;
        status2=true;

    }
    else{
        mailmsg.innerHTML=`<span>invalid</span>`;
        mailmsg.style.color="red";
        
    }
}
async function signIn()
{
    let mail=(document.getElementById("newUserEmail")as HTMLInputElement).value;
    let existingUserId=(document.getElementById("existingUserId")as HTMLInputElement).value;
    let existingUserPassword=(document.getElementById("existingUserPassword")as HTMLInputElement).value;
    let user =document.getElementById("user")as  HTMLHeadingElement;
    let username=(document.getElementById("newUserName")as HTMLInputElement).value;
    let personalList=await fetchuser();
    if(existingUserId==mail&&existingUserPassword==oldpass)
    {
        signindiv.style.display="none";
        signupdiv.style.display="none";
        Submenu.style.display="block";
        let currentLoggedUser:PersonDetails={id:undefined,userName:username,email:mail,password:oldpass};
        addPerson(currentLoggedUser);
        user.innerText=`Hi, ${username}`;
    }
    personalList.forEach(element => {
        if(element.email==existingUserId&&element.password==existingUserPassword)
        {
            signindiv.style.display="none";
            signupdiv.style.display="none";
            Submenu.style.display="block";
            user.innerText=`Hi, ${element.userName}`;
        }
        
    });
    
    
}


function confirmcheck()
{
    let pass1=(document.getElementById("passagain")as HTMLInputElement).value;
    let passmsg1=(document.getElementById("passagainmsg")as HTMLSpanElement);
    if(oldpass==pass1)
    {
        status4=true;
        passmsg1.innerHTML=`<span>valid</span>`;
        passmsg1.style.color="green";
        
    }
    else{
        passmsg1.innerHTML=`<span>invalid</span>`;
        passmsg1.style.color="red";
    }
}


interface PersonDetails
{
    id:any;
    userName:string;
    email:string;
    password:string;
}



async function addPerson(Person:PersonDetails):Promise<void>{
    const responce = await fetch(`http://localhost:5222/api/PersonDetailsControllers`,
        {
            method:'POST',
            headers:{
                'content-Type':'application/json'

            },
            body:JSON.stringify(Person)
        }
    );
    if(!responce.ok){
        throw new Error('Failed to add contact')
    }
    renderTable();
}

async function addTravelData(TravelData:TravelData):Promise<void>{
    const responce = await fetch(`http://localhost:5222/api/travelDataControllers`,
        {
            method:'POST',
            headers:{
                'content-Type':'application/json'

            },
            body:JSON.stringify(TravelData)
        }
    );
    if(!responce.ok){
        throw new Error('Failed to add contact');
    }
    renderTable();
}

async function addOrder(Order:OrderDetails):Promise<void>{
    const responce = await fetch(`http://localhost:5222/api/OrderDetailsControllers`,
        {
            method:'POST',
            headers:{
                'content-Type':'application/json'

            },
            body:JSON.stringify(Order)
        }
    );
    if(!responce.ok){
        throw new Error('Failed to add contact');
    }
    renderTable();
}


async function UpdateTravelData(id:number,TravelData:TravelData) {
    const responce=await fetch(`http://localhost:5222/api/travelDataControllers/${id}`,
        {
            method:'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(TravelData)
        }
    );
    if(responce.ok)
    {
        throw new Error('Failed to update medicine')
    }
    renderTable();
}


async function UpdateOrder(id:number,Order:OrderDetails) {
    const responce=await fetch(`http://localhost:5222/api/OrderDetailsControllers/${id}`,
        {
            method:'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(Order)
        }
    );
    if(responce.ok)
    {
        throw new Error('Failed to update medicine')
    }
    updateOrderHistory();
}

async function fetchuser():Promise<PersonDetails[]> {
    const apiUrl=`http://localhost:5222/api/PersonDetailsControllers`;
    const response=await fetch(apiUrl);
    if(!response.ok)
        {
            throw new Error('Failed to fetch contacts');
        }
    return await response.json();
}

async function fetchorder():Promise<OrderDetails[]> {
    const apiUrl=`http://localhost:5222/api/OrderDetailsControllers`;
    const response=await fetch(apiUrl);
    if(!response.ok)
        {
            throw new Error('Failed to fetch contacts');
        }
    return await response.json();
}

async function fetchTravelData():Promise<TravelData[]> {
    const apiUrl=`http://localhost:5222/api/TravelDataControllers`;
    const response=await fetch(apiUrl);
    if(!response.ok)
        {
            throw new Error('Failed to fetch contacts');
        }
    return await response.json();
}

async function deleteOrder(id: number): Promise<void> {
    const response = await fetch(`http://localhost:5222/api/OrderDetailsControllers/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error('Failed to delete contact');
    }
    updateOrderHistory();
}

async function deleteBook(id:number):Promise<void> {
    const response = await fetch(`http://localhost:5222/api/traveldatacontrollers/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error('Failed to delete contact');
    }
    let orderList=await fetchorder();
    orderList.forEach(element => {
        if(id==element.orderID)
            {
                currentUserWallet+=element.price;
            }
    });
    renderTable();
}
