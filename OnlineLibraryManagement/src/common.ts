let signupdiv=document.getElementById("newUserPage") as HTMLDivElement;
let signindiv=document.getElementById("signin") as HTMLDivElement;
let Home=document.getElementById("homePage") as HTMLDivElement;
let Submenu=document.getElementById("submenu") as HTMLDivElement;
let bookDetails=document.getElementById("Borrowbook") as HTMLDivElement;
let bookHistory=document.getElementById("history") as HTMLDivElement;
let balance=document.getElementById("balance") as HTMLDivElement;
let recharge=document.getElementById("recharge") as HTMLDivElement;
let currentuser:UserDetails;


function newuser()
{
  

    signupdiv.style.display="block";
    Home.style.display="none";

}
function existingUserPage()
{
    signindiv.style.display="block";
    Home.style.display="none";   
}

// function signup()
// {
//     signupdiv.style.display="none";
//     signindiv.style.display="block";
//     Home.style.display="none";
//     Submenu.style.display="none";
// }


function BorrowBook()
{
    bookDetails.style.display="block";
    bookHistory.style.display="none";
    balance.style.display="none";
    recharge.style.display="none";
    renderTable();
}
function ShowBorrowedhistory()
{

    bookHistory.style.display="block";
    bookDetails.style.display="none";
    balance.style.display="none";
    recharge.style.display="none";
    RenderHistory();
}
function Balance()
{
    bookHistory.style.display="none";
    bookDetails.style.display="none";
    balance.style.display="block";
    recharge.style.display="none";
    let balacerender=document.getElementById("balancemsg")as HTMLHeadingElement;
   
    balacerender.innerHTML=`Your Wallet Balance Is : ${currentuser.balance}`;
}
function Recharge()
{
    bookHistory.style.display="none";
    bookDetails.style.display="none";
    balance.style.display="none";
    recharge.style.display="block";
    let balacerender=document.getElementById("balancemsg")as HTMLDivElement;
    balacerender.innerHTML='Your Wallet Balance Is : ';
}
function Signout()
{
    bookHistory.style.display="none";
    bookDetails.style.display="none";
    balance.style.display="none";
    recharge.style.display="none";
    signindiv.style.display="none";
    signupdiv.style.display="block";
    Submenu.style.display="none";
    
    
    
}
interface BookDetails
{
    bookID:any;
    bookName:string;
    bookAuthor:string;
   
    count:number;

}

interface OrderDetails
{
    orderID:any;
    bookID:any;
    userID:any;
    borrowDate:any;
    borrowCount:number;
    fineAmount:number;
    orderStatus:string;
    
}
interface UserDetails
{
    userID:any;
    userName:string;
    email:string;
    password:string;
    balance:number;
}

async function addRow()
{
   
    let bookName:string=(document.getElementById("bookname") as HTMLInputElement).value.toUpperCase();
    let bookAuthor=(document.getElementById("bookAuthor") as HTMLInputElement).value.toUpperCase();

    let count=(document.getElementById("count") as HTMLInputElement).value;
    const newBookDetail:BookDetails={bookID:undefined,bookName:bookName,bookAuthor:bookAuthor,count:parseInt(count)};
    addbook(newBookDetail);
    renderTable();
    

}
async function renderTable(){
    let data= await fetchBook();
    let table=(document.getElementById("BorrowBookTable") as HTMLTableSectionElement);
    table.innerHTML='';
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


} 
function remove(id:number)
{
    deleteBook(id);
}
async function edit(id:number)
{
    let data=await fetchBook();
    data.forEach(element => {
       if(element.bookID==id)
        {
            (document.getElementById("bookname") as HTMLInputElement).value=element.bookName;
            (document.getElementById("bookAuthor") as HTMLInputElement).value=element.bookAuthor;

            (document.getElementById("count") as HTMLInputElement).value=element.count.toString();
            let bookName:string=(document.getElementById("bookname") as HTMLInputElement).value.toUpperCase();
            let bookAuthor=(document.getElementById("bookAuthor") as HTMLInputElement).value.toUpperCase();

            let count=(document.getElementById("count") as HTMLInputElement).value;
            let updatebook:BookDetails={bookID:id,bookName:bookName,bookAuthor:bookAuthor,count:parseInt(count)};
            Updatebook(id,updatebook);
            renderTable();
        } 
    });
}


async function borrow()
{

    
    let quantity=(document.getElementById("getquantity")as HTMLInputElement).value;
    let id=(document.getElementById("getbookID")as HTMLInputElement).value;
    
    
    
    let orderList=await fetchorder();
    let data=await fetchBook();
    let flag:boolean=true;
    data.forEach(element => {
        if(element.bookID==parseInt(id))
        {
            if(element.count>=parseInt(quantity))
            {
                if(element.count>=parseInt(quantity)&&parseInt(quantity)<=3)
                    {
                        orderList.forEach(order => {
                            if(currentuser.userID==order.userID )
                            {
                                flag=false;
                                if(order.borrowCount+parseInt(quantity)<=3)
                                {
                                    let newOrder:OrderDetails={orderID:undefined,bookID:id,userID:currentuser,borrowDate:Date.now,borrowCount:parseInt(quantity),fineAmount:0,orderStatus:'Borrowed'};
                                    addOrder(newOrder);
                                    alert("Borrowed Successfully.");
                                    let updatebook:BookDetails={bookID:id,bookName:element.bookName,bookAuthor:element.bookAuthor,count:element.count-parseInt(quantity)};
                                    Updatebook(parseInt(id),updatebook);
                                    renderTable();
        
                                }
                                else{
                                    alert("Purchase count exceeds 3")
                                }
                            }
                        });
                        if(flag)
                        {
                            let newOrder:OrderDetails={orderID:undefined,bookID:id,userID:currentuser.userID,borrowDate:new Date(),borrowCount:parseInt(quantity),fineAmount:0,orderStatus:'Borrowed'};
                            addOrder(newOrder);
                            alert("Borrowed Successfully.");
                            let updatebook:BookDetails={bookID:id,bookName:element.bookName,bookAuthor:element.bookAuthor,count:element.count-parseInt(quantity)};
                            Updatebook(parseInt(id),updatebook);
                            renderTable();
                           
                        }
                    }
                    else{
                        orderList.forEach(element => {
                            if(id==element.bookID)
                            {
                                alert("book availabe in "+addDays(element.borrowDate,15));
                            }
                        });
                        if(parseInt(quantity)>=3)
                        {
                            alert("Maximum borrow 3 book at a time");
                        }
                        
                    }
            }
            else{
                alert("insuffient book");
            }
        }
    });


}
function addDays(date: Date, days: number): Date {
    let result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }
async function RenderHistory()
{
    let orderList=await fetchorder();
    let historyTable=document.getElementById("historyTable")as HTMLTableSectionElement;
   
    historyTable.innerHTML='';
    orderList.forEach(order=>
        {
            if(order.userID==currentuser.userID)
                {
                    historyTable.innerHTML+=`<tr><td>${order.orderID}</td><td>${order.bookID}</td><td>${order.userID}</td><td>${order.borrowDate.split("T")[0].split("-").reverse().join("/")}</td><td>${order.borrowCount}</td><td>${order.orderStatus}</td><td>${order.fineAmount}</td><td><button onclick="returnBook(${order.orderID})">Return</button></td></tr>`;

                }
        }
    ) 
}
function getdaydiff(startDate:Date, endDate: Date):number {
    const msInDay=24*60*60*1000;

    return Math.round(
        Math.abs(Number(endDate) - Number(startDate))/msInDay

    );
}
async function returnBook(id:number)
{
    let orderList=await fetchorder();
    let data= await fetchBook();
    let quantity=(document.getElementById("getquantity")as HTMLInputElement).value;
    let currentDate=new Date();
    orderList.forEach(order => {
        let fine=getdaydiff(currentDate,order.borrowDate);
        if(fine>=15)
        {
            let newOrder:OrderDetails={orderID:order.orderID,bookID:order.bookID,userID:order.userID,borrowDate:order.borrowDate,borrowCount:order.borrowCount,fineAmount:fine-15,orderStatus:'Borrowed'};
            UpdateOrder(order.orderID,newOrder);
        }
        
    });


    

    orderList.forEach(order => {
        
        if(order.orderID==id)
        {
            
            if(order.userID==currentuser.userID)
            {

                if(currentuser.balance>=order.fineAmount)
                {
                    currentuser.balance-=order.fineAmount;
                    alert(`fine amount is ${order.fineAmount}`);
                }
                else{
                    alert("insuffient Balance");
                    
                }
                data.forEach(book => {
                    if(order.bookID==book.bookID)
                    {
                        
                            
                                let bookCount:number=order.orderID;
                                let bookupdate:BookDetails={bookID:book.bookID,bookName:book.bookName,bookAuthor:book.bookAuthor,count:book.count+bookCount};
                                Updatebook(order.bookID,bookupdate);
                                renderTable();
                            
                        
                    }
                });

            }
        }
        
    });
    deleteOrder(id);
    

}

function topUp()
{
    let getAmount=document.getElementById("rechargeAmount")as HTMLInputElement;
    currentuser.balance+=parseInt(getAmount.value);
    let updateWallet:UserDetails={userID:currentuser.userID,userName:currentuser.userName,email:currentuser.email,password:currentuser.password,balance:currentuser.balance};
    UpdateUser(currentuser.userID,updateWallet);

    let balacerender=document.getElementById("balancemsg")as HTMLHeadingElement;
   
    balacerender.innerHTML=`Your Wallet Balance Is : ${currentuser.balance}`;
 

}


async function adduser(User:UserDetails):Promise<void>{
    const responce = await fetch(`http://localhost:5248/api/UserDetails`,
        {
            method:'POST',
            headers:{
                'content-Type':'application/json'

            },
            body:JSON.stringify(User)
        }
    );
    if(!responce.ok){
        throw new Error('Failed to add contact')
    }
    renderTable();
}

async function addbook(Book:BookDetails):Promise<void>{
    const responce = await fetch(`http://localhost:5248/api/BookDetails`,
        {
            method:'POST',
            headers:{
                'content-Type':'application/json'

            },
            body:JSON.stringify(Book)
        }
    );
    if(!responce.ok){
        throw new Error('Failed to add book');
    }
    renderTable();
}

async function addOrder(Order:OrderDetails):Promise<void>{
    const responce = await fetch(`http://localhost:5248/api/OrderDetails`,
        {
            method:'POST',
            headers:{
                'content-Type':'application/json'

            },
            body:JSON.stringify(Order)
        }
    );
    if(!responce.ok){
        throw new Error('Failed to add order');
    }
  
    RenderHistory();
}


async function Updatebook(id:number,book:BookDetails) {
    const responce=await fetch(`http://localhost:5248/api/BookDetails/${id}`,
        {
            method:'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(book)
        }
    );
    if(responce.ok)
    {
        throw new Error('Failed to update book')
    }
    renderTable();
}


async function UpdateOrder(id:number,Order:OrderDetails) {
    const responce=await fetch(`http://localhost:5248/api/OrderDetails/${id}`,
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
        throw new Error('Failed to update order')
    }
    
}

async function UpdateUser(id:number,User:UserDetails) {
    const responce=await fetch(`http://localhost:5248/api/UserDetails/${id}`,
        {
            method:'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(User)
        }
    );
    if(responce.ok)
    {
        throw new Error('Failed to update user')
    }
    
}

async function fetchuser():Promise<UserDetails[]> {
    const apiUrl=`http://localhost:5248/api/UserDetails`;
    const response=await fetch(apiUrl);
    if(!response.ok)
        {
            throw new Error('Failed to fetch contacts');
        }
    return await response.json();
}

async function fetchorder():Promise<OrderDetails[]> {
    const apiUrl=`http://localhost:5248/api/OrderDetails`;
    const response=await fetch(apiUrl);
    if(!response.ok)
        {
            throw new Error('Failed to fetch order');
        }
    return await response.json();
}

async function fetchBook():Promise<BookDetails[]> {
    const apiUrl=`http://localhost:5248/api/BookDetails`;
    const response=await fetch(apiUrl);
    if(!response.ok)
        {
            throw new Error('Failed to fetch book');
        }
    return await response.json();
}

async function deleteOrder(id: number): Promise<void> {
    const response = await fetch(`http://localhost:5248/api/OrderDetails/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error('Failed to delete order');
    }
    RenderHistory();
   
}

async function deleteBook(id:number):Promise<void> {
    const response = await fetch(`http://localhost:5248/api/BookDetails/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error('Failed to delete book');
    }
    
    renderTable();
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
    let flag=true;
    if(existingUserId==mail&&existingUserPassword==oldpass)
    {
        signindiv.style.display="none";
        signupdiv.style.display="none";
        Submenu.style.display="block";
        currentuser={userID:undefined,userName:username,email:mail,password:oldpass,balance:0};
        adduser(currentuser);
        user.innerText=`Hi, ${username}`;
        flag=false;
    }
    personalList.forEach(element => {
        if(element.email==existingUserId&&element.password==existingUserPassword)
        {
            signindiv.style.display="none";
            signupdiv.style.display="none";
            Submenu.style.display="block";
            user.innerText=`Hi, ${element.userName}`;
            currentuser={userID:element.userID,userName:element.userName,email:element.email,password:element.password,balance:element.balance};
            flag=false;

        }
        
    });
    if(flag)
        {
            alert("Enter Correct Email & PassWord.")
        }
    
    
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
