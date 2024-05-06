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


interface travelData{
    ID:number;
    From:string;
    To:string;
    Price:number;
}
let editingid:null|number=null;

const data:travelData[]=[];
const newtravel:travelData={ID:data.length+1,From:"ARUMBAKKAM",To:"VADAPALANI",Price:15};
data.push(newtravel);

function addRow()
{
    
    let from:string=(document.getElementById("from") as HTMLInputElement).value.toUpperCase();
    let to=(document.getElementById("to") as HTMLInputElement).value.toUpperCase();
    let price=(document.getElementById("price") as HTMLInputElement).value;
    const newtraveldata:travelData={ID:data.length+1,From:from,To:to,Price:parseInt(price)};
    data.push(newtraveldata);
    renderTable();
    // (document.getElementById("form") as HTMLInputElement).reset();


}

    
   

function renderTable(){
    let table=(document.getElementById("body") as HTMLTableSectionElement);
    let form=document.getElementById("form") as HTMLFormElement;
    table.innerHTML='';
    data.forEach((item) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${item.ID}</td>
        <td>${item.From.toUpperCase()}</td>
        <td>${item.To.toUpperCase()}</td>
        <td>${item.Price}</td>
        <td><button onclick="edit(${item.ID})">Edit</button><button onclick="remove(${item.ID})">Remove</button></td>
        `;
      table.appendChild(row);
      form.reset();
    });
}
function edit(id:number)
{
    const index=data.findIndex(user=> user.ID===id);
    const travel=data[index];
    (document.getElementById("from") as HTMLInputElement).value=travel.From;
    (document.getElementById("to") as HTMLInputElement).value=travel.To;
    (document.getElementById("price") as HTMLInputElement).value=travel.Price.toString();
    data.splice(index,1);
    renderTable();


}
function remove(id:number)
{
    const index=data.findIndex(user=> user.ID===id);
    data.splice(index,1);
    renderTable();

}




function newuser()
{
    signupdiv.style.display="block";
    Home.style.display="none";
}
function signup()
{
    signupdiv.style.display="none";
    signindiv.style.display="block";
    Home.style.display="none";
}
function existingUserPage()
{
    signindiv.style.display="block";
    Home.style.display="none";   
}
function signIn()
{
    signindiv.style.display="none";
    signupdiv.style.display="none";
    Submenu.style.display="block";
}
function travelDetails()
{
    travelDetailsdiv.style.display="block";
    TicketBookingdiv.style.display="none";
    form.style.display="block";
    travelhistorydiv.style.display="none";
    balancediv.style.display="none";
    rechargediv.style.display="none"


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
class order{
    OrderID:number;
    From:string;
    To:string;
    Members:number;
    Price:number;

    constructor(ID:number,from:string,to:string,members:number,price:number)
    {
        this.OrderID=ID;
        this.From=from;
        this.To=to;
        this.Members=members;
        this.Price=price;
    }

}
let orderList:Array<order>=new Array<order>();
let currentUserWallet:number=10;
function Order()
{
    let bookingfrom=(document.getElementById("bookingfrom")as HTMLInputElement).value.toUpperCase();
    let bookingto=(document.getElementById("bookingto")as HTMLInputElement).value.toUpperCase();
    let bookingmember=(document.getElementById("bookingmembers")as HTMLInputElement).value;
    data.forEach(elemet =>
        {
            if(bookingfrom==elemet.From && bookingto==elemet.To)
            {
                if(parseInt(bookingmember)*elemet.Price<=currentUserWallet)
                {
                    orderList.push(new order(elemet.ID,elemet.From,elemet.To,parseInt(bookingmember),parseInt(bookingmember)*elemet.Price));
                    currentUserWallet-=parseInt(bookingmember)*elemet.Price;
                    alert("Ticket Booked Successfully");
                    balancemsg();
                    updateOrderHistory();
                    

                }
                else
                {
                    alert("Insuufient Balance, Please Recharge your wallet.");
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
function updateOrderHistory()
{
    let historybody=document.getElementById("historybody")as HTMLTableSectionElement;

    historybody.innerHTML='';
    orderList.forEach(order=>
        {
            historybody.innerHTML+=`<tr><td>${order.OrderID}</td><td>${order.From}</td><td>${order.To}</td><td>${order.Members}</td><td>${order.Price}</td><td><button onclick="Cancel(${order.OrderID}")>Cancel</button></td></tr>`
        }
    )   
}




