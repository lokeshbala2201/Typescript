let signUpPage=document.getElementById("SignUp")as HTMLDivElement;
let signInPage=document.getElementById("Signin")as HTMLDivElement;
let himsg=document.getElementById("home")as HTMLHeadingElement;
let stocks=document.getElementById("stock")as HTMLHeadingElement;
let topup=document.getElementById("topup")as HTMLHeadingElement;
let submenu=document.getElementById("submenu")as HTMLHeadingElement;
let home=document.getElementById("home")as HTMLHeadingElement;
let cartItem=document.getElementById("cartItem")as HTMLHeadingElement;
let confirmOrder=document.getElementById("confirmOrder")as HTMLHeadingElement;
let historyorder=document.getElementById("history")as HTMLHeadingElement;
let confirmbutton=document.getElementById("confirmbutton")as HTMLHeadingElement;
let main=document.getElementById("Home")as HTMLHeadingElement;




let currentUser:UserDetails;


// interfaces
interface UserDetails
{
    userID:any
    userName:string
    email:string
    password:string
    phoneNumber:string
    address:string
    balance:number
    userProfile:string[]
}

interface ItemDetails
{
    itemID:any
    itemName:string
    quantity:number
    purchaseDate:Date
    expiryDate:Date
    price:number
    itemImage:string[]
}

interface OrderDetails
{
    orderID:any
    userID:any
    itemID:any
    purchaseDate:Date
    totalQuantity:number
    totalAmount:number
}

function UserNameValidation()
{
    let UserName=document.getElementById("username")as HTMLInputElement;
    let usermsg=document.getElementById("UserMsg")as HTMLInputElement;
    if((/^[a-zA-Z]+$/).test(UserName.value))
    {
        usermsg.innerHTML="valid";
        usermsg.style.color="green";
    }
    else
    {
        usermsg.innerHTML="Invalid";
        usermsg.style.color="red";
    }


}

function Emailvalidation()
{
    let email=document.getElementById("email")as HTMLInputElement;
    let emailmsg=document.getElementById("emailmsg")as HTMLInputElement;
    if((/^[a-zA-Z]+@gmail.com$/).test(email.value))
    {
        emailmsg.innerHTML="valid";
        emailmsg.style.color="green";
    }
    else
    {
        emailmsg.innerHTML="Invalid";
        emailmsg.style.color="red";
    }

}








function newUserPage()
{
    signUpPage.style.display="block";
    signInPage.style.display="none";
}
function Login()
{
    signInPage.style.display="block";
    signUpPage.style.display="none";
 
}

function registration()
{
    let UserName=document.getElementById("username")as HTMLInputElement;
    let email=document.getElementById("email")as HTMLInputElement;
    let phone=document.getElementById("phone")as HTMLInputElement;
    let password=document.getElementById("password")as HTMLInputElement;
    let address=document.getElementById("address")as HTMLInputElement;
    let balance=document.getElementById("balance")as HTMLInputElement;
    let newUserProfile=document.getElementById("profileimage")as HTMLInputElement;
    
    const file:any= newUserProfile.files?.[0];
    let base64String: any = "";
    if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function (event) {
            base64String = event.target?.result as string;
       
            console.log(base64String);
            let createUser:UserDetails={userID:undefined,userName:UserName.value,email:email.value,password:password.value,phoneNumber:phone.value,address:address.value,balance:parseInt(balance.value),userProfile:[base64String]};
            addUser(createUser);
       
 
        }
    }




}


async function loggedIn()
{
    let UserList=await fetchuser();
    let exsititinUser=(document.getElementById("exsititinUser")as HTMLInputElement).value
    let exsititingPassword=(document.getElementById("exsititingPassword")as HTMLInputElement).value

    UserList.forEach(user => {
       if(user.email==exsititinUser && user.password==exsititingPassword)
        {
            let Home=document.getElementById("Home") as HTMLDivElement;
            currentUser=user;
            submenu.style.display="block";
            signInPage.style.display="none";
            signUpPage.style.display="none";
            Home.style.display="none";
            alert("looged in successfully");
            
        } 
    });

}
function Home()
{
 
    
    himsg.innerHTML=`Hi, ${currentUser.userName}<br><img width=150px height=150px src="${currentUser.userProfile[0]}" alt="profile">`;
    himsg.style.display="block";
    stocks.style.display="none";
    topup.style.display="none";
    cartItem.style.display="none";
    historyorder.style.display="none";
    

}

function stockshow()
{
    himsg.style.display="none";
    stocks.style.display="block";
    topup.style.display="none";
    cartItem.style.display="none";
    historyorder.style.display="none";
    confirmOrder.style.display="none";
    confirmbutton.style.display="none";


    RenderTable();
}
function walletshow()
{
    himsg.style.display="none";
    stocks.style.display="none";
    topup.style.display="block";
    cartItem.style.display="none";
    historyorder.style.display="none";
    confirmOrder.style.display="none";
    confirmbutton.style.display="none";

    renderWallet();
}

function TopUp()
{
    let getAmount=document.getElementById("topupAmount") as HTMLInputElement;
    currentUser.balance+=parseInt(getAmount.value);
    UpdateUser(currentUser.userID,currentUser);
    renderWallet();
}
function OrderHistory()
{
    historyorder.style.display="block";
    himsg.style.display="none";
    stocks.style.display="none";
    topup.style.display="none";
    cartItem.style.display="none";
    confirmOrder.style.display="none";
    confirmbutton.style.display="none";

    renderorderList();

}
function Loggedout()
    {
        historyorder.style.display="none";
        himsg.style.display="none";
        stocks.style.display="none";
        topup.style.display="none";
        cartItem.style.display="none";
        confirmOrder.style.display="none";
        confirmbutton.style.display="none";
        submenu.style.display="none";
        signInPage.style.display="none";
        signUpPage.style.display="none";
        main.style.display="block";
        currentUser:Object;
    }

function itemHistory()
{
    confirmOrder.style.display="block";
    historyorder.style.display="none";
    himsg.style.display="none";
    stocks.style.display="none";
    topup.style.display="none";
    cartItem.style.display="none";
    confirmbutton.style.display="block";
}
async function ItemCard()
{
    cartItem.style.display="block";
    himsg.style.display="none";
    stocks.style.display="none";
    topup.style.display="none";
    historyorder.style.display="none";
    confirmOrder.style.display="block";
    confirmbutton.style.display="none";
    let itemCard=document.getElementById("itemCard")as HTMLDivElement;
    let ItemList=await fetchItemData();
    itemCard.innerHTML="";
    ItemList.forEach(item => {
       itemCard.innerHTML+=`
       <div id="Photocard">
            <div id="imagediv">
                <img src="${item.itemImage[0]}" alt="" width="150px" height="150px">
            </div>
            <div id="listdiv">
                <ol >
                    <li> Item No:${item.itemID}</li>
                    
                    <li>ItemName:${item.itemName}</li>
                    <li>${item.price}</li>
                    
                    <li><input type="number" id="${item.itemID}" placeholder="Quantity"></li>
                    <br>
                    <li><button onclick="AddCart(${item.itemID})">Buy</button></li>
                
                </ol>
            </div>
           
            </div>` 
    });

}
interface cartitem
{
    itemID:any
    itemName:string;
    quantity:number;
    price:number
    
}
let tempCartList:Array<cartitem>=new Array<cartitem>();
async function AddCart(id:number)
{
    let itemid=parseInt((document.getElementById(`${id}`)as HTMLInputElement).value);
    let ItemList=await fetchItemData();
    
    
    ItemList.forEach(Item => {
        if(Item.itemID==id)
        {
            
            if(Item.quantity>=itemid)
            {
                // let currentDate:Date=new Date();
                // if(currentDate<=Item.expiryDate)
                // {
                    let NewCart:cartitem={itemID:id,itemName:Item.itemName,quantity:itemid,price:Item.price*itemid};
                    tempCartList.push(NewCart);
                    rendercartItemList();
                    alert(`${Item.itemName} Added to Cart`);
                    let updateCartItem:ItemDetails={itemID:Item.itemID,itemName:Item.itemName,quantity:Item.quantity-itemid,purchaseDate:Item.purchaseDate,expiryDate:Item.expiryDate,price:Item.price,itemImage:Item.itemImage};
                    UpdateItemData(id,updateCartItem);
                    RenderTable();

                // }
                // else
                // {
                //     alert("prodcut was expired");
                // }
            }
            else{
                alert("Insuffient Quantity");
            }
        }
    });
}

async function ConfirmOrder() {
    let gettotalAmount:number=0;
    let totalQuantity:number=0;
    tempCartList.forEach(item => {
        gettotalAmount+=item.price;
        totalQuantity+=item.quantity;
    });
    if(currentUser.balance>=gettotalAmount)
    {
        currentUser.balance-=gettotalAmount;
        UpdateUser(currentUser.userID,currentUser);
        renderWallet();
        let newOrder:OrderDetails={orderID:undefined,userID:currentUser.userID,itemID:undefined,totalAmount:gettotalAmount,totalQuantity:totalQuantity,purchaseDate:new Date()};
        addOrder(newOrder);
        renderorderList();
    }
    else{
        alert(`Sorry ${currentUser.userName}, Insuffient Balance for ${gettotalAmount-currentUser.balance}`);
    }
}
async  function renderorderList()
{
    let orderList=await fetchorder();
    let orderbody=document.getElementById("orderbody")as HTMLTableSectionElement;
    orderbody.innerHTML="";
    orderList.forEach(item => {
        orderbody.innerHTML+=`<tr><td>${item.orderID}</td><td>${item.userID}</td><td>${item.itemID}</td><td>${item.totalQuantity}</td><td>${item.totalAmount}</td><td>${item.purchaseDate}</td></tr><br>`
    });
}
function rendercartItemList() {
    let cartbody=document.getElementById("tempcart")as HTMLTableSectionElement;
    cartbody.innerHTML="";
    tempCartList.forEach(item => {
        cartbody.innerHTML+=`<tr><td>${item.itemID}</td><td>${item.itemName}</td><td>${item.quantity}</td><td>${item.price}</td></tr><br>`
    });
}
function renderWallet()
{
    let balanceshow=document.getElementById("balanceshow")as HTMLHeadingElement;
    balanceshow.innerHTML=`Your Wallet Balance is ${currentUser.balance}`;
}
function stock()
{
    let itemName=document.getElementById("ItemName")as HTMLInputElement;
    let quantity=document.getElementById("Quantity")as HTMLInputElement;
    let purchase=document.getElementById("Purchase")as HTMLInputElement;
    let expiry=document.getElementById("Expiry")as HTMLInputElement;
    let price=document.getElementById("Price")as HTMLInputElement;
    let itemImage=document.getElementById("ItemImage")as HTMLInputElement;
    const file:any= itemImage.files?.[0];
    let base64String: any = "";
    if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function (event) {

            base64String = event.target?.result as string;
            let newitem:ItemDetails={itemID:undefined,itemName:itemName.value.toLocaleUpperCase(),quantity:parseInt(quantity.value),purchaseDate:new Date(purchase.value),expiryDate:new Date(expiry.value),price:parseInt(price.value),itemImage:[base64String]};
            addItemData(newitem);
            RenderTable();
            
 
        }
    }

}
async function RenderTable()
{
    let tbody=document.getElementById("stockbody")as HTMLTableSectionElement;
    let ItemList=await fetchItemData();
    tbody.innerHTML="";
    ItemList.forEach(item => {
        tbody.innerHTML+=`<tr>
        <td>${item.itemID}</td>
        <td>${item.itemName}</td>
        <td>${item.quantity}</td>
        <td>${item.purchaseDate.toString().slice(0,10)}</td>
        <td>${item.expiryDate.toString().slice(0,10)}</td>
        <td>${item.price}</td>
        <td><img src="${item.itemImage[0]}" width=120px height=120px</td>
        <td><button onclick="RemoveItem(${item.itemID})">Edit</button><button onclick="DeleteItem(${item.itemID})">Remove</button></td>
        </tr><br>`
    });
}
async function DeleteItem(id:number) {
    deleteItem(id);
}


async function addUser(user:UserDetails):Promise<void>{
    const responce = await fetch(`http://localhost:5013/api/UserDetails`,
        {
            method:'POST',
            headers:{
                'content-Type':'application/json'

            },
            body:JSON.stringify(user)
        }
    );
    if(!responce.ok){
        throw new Error('Failed to add contact')
    }
    
}

async function addItemData(ItemData:ItemDetails):Promise<void>{
    const responce = await fetch(`http://localhost:5013/api/ItemDetails`,
        {
            method:'POST',
            headers:{
                'content-Type':'application/json'

            },
            body:JSON.stringify(ItemData)
        }
    );
    if(!responce.ok){
        throw new Error('Failed to add Item Data');
    }
  
}

async function addOrder(Order:OrderDetails):Promise<void>{
    const responce = await fetch(`http://localhost:5013/api/OrderDetails`,
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
   
}


async function UpdateItemData(id:number,ItemData:ItemDetails) {
    const responce=await fetch(`http://localhost:5013/api/ItemDetails/${id}`,
        {
            method:'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(ItemData)
        }
    );
    if(responce.ok)
    {
        throw new Error('Failed to update ItemData')
    }
    RenderTable();

}


async function UpdateOrder(id:number,Order:OrderDetails) {
    const responce=await fetch(`http://localhost:5013/api/OrderDetails/${id}`,
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
async function UpdateUser(id:number,user:UserDetails) {
    const responce=await fetch(`http://localhost:5013/api/UserDetails/${id}`,
        {
            method:'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(user)
        }
    );
    if(responce.ok)
    {
        throw new Error('Failed to update User')
    }
    renderWallet();
    
}

async function fetchuser():Promise<UserDetails[]> {
    const apiUrl=`http://localhost:5013/api/UserDetails`;
    const response=await fetch(apiUrl);
    if(!response.ok)
        {
            throw new Error('Failed to fetch contacts');
        }
    return await response.json();
}

async function fetchorder():Promise<OrderDetails[]> {
    const apiUrl=`http://localhost:5013/api/OrderDetails`;
    const response=await fetch(apiUrl);
    if(!response.ok)
        {
            throw new Error('Failed to fetch contacts');
        }
    return await response.json();
}

async function fetchItemData():Promise<ItemDetails[]> {
    const apiUrl=`http://localhost:5013/api/ItemDetails`;
    const response=await fetch(apiUrl);
    if(!response.ok)
        {
            throw new Error('Failed to fetch contacts');
        }
    return await response.json();
}

async function deleteOrder(id: number): Promise<void> {
    const response = await fetch(`http://localhost:5013/api/OrderDetails/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error('Failed to delete contact');
    }

}

async function deleteItem(id:number):Promise<void> {
    const response = await fetch(`http://localhost:5013/api/ItemDetails/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error('Failed to delete contact');
    }
    RenderTable();

   
}




















