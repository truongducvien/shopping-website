function $(id){return document.getElementById(id)};

// Create list of product:
let Product = function(image, name,type,price ){
   this.image = image;
   this.name = name;
   this.type = type;
   this.price = price;
}

// Load local storage:
let itemList; 

if(!localStorage.itemList){
   let itemList = [
      new Product('https://image.fmstyle.com.vn/images/products/anhnho/783774_138688206_2201VDUFMF2740---1.jpg','Váy voan', 'skirt',625),
      new Product('https://image.fmstyle.com.vn//images/products/anhnho/789641_376170397.jpg','Áo sơ mi cổ bẻ', 'shirt',249),
      new Product('https://image.fmstyle.com.vn/images/products/763987_177222606.jpg', 'Đồ bộ nỉ trơn', 'set', 225),
      new Product('https://image.fmstyle.com.vn//images/products/anhnho/769670_1380294766_242152120_2612605162205136_445452828122303964_n.jpg','Sơ mi tay dài', 'shirt',359),
      new Product('https://image.fmstyle.com.vn/images/products/769595_1282717427.jpg', 'Mũ lông cừu', 'other', 59),
      new Product('https://image.fmstyle.com.vn//images/products/anhnho/761552_475971793.jpg','Áo thun cổ tròn tay ngắn', 'shirt', 129),
      new Product('https://cf.shopee.vn/file/d5cdbdc026270359b740dd92aa7c18fc','Kính râm','other', 199),
      new Product('https://image.fmstyle.com.vn//images/products/anhnho/761190_740695491.jpg','Áo thun cổ tròn', 'shirt', 190),
      new Product('https://media-fmplus.cdn.vccloud.vn/uploads/products/2202VDUFMF2801/7e0cb5cf-33cb-4a17-a414-ea707a3d3d32.jpg', 'Váy trơn', 'skirt', 349),
      new Product('https://image.fmstyle.com.vn//images/products/anhnho/786112_1786259126_793063_1288511685_57cb5630d1951acb438467-min.jpg','Thun kẻ ngang', 'shirt',235),
      new Product('https://image.fmstyle.com.vn//images/products/anhnho/791958_1742131841.jpg','Quần jeans nam', 'pants',400),
      new Product('https://image.fmstyle.com.vn//images/products/anhnho/788970_611520466.jpg','Quần short jeans nam', 'pants', 295),
      new Product('https://image.fmstyle.com.vn//images/products/anhnho/759451_1618107726.jpg','Bộ áo dài thêu rồng', "set", 200),
      new Product('https://image.fmstyle.com.vn//images/products/anhnho/758411_1378278097.jpg','Bộ đồ quần dài', 'set', 139),
      new Product('https://cf.shopee.vn/file/03b6032ffc164933cd4e151da878c629', 'Ví da nam', 'other', 485),
   ];
   localStorage.setItem('itemList',JSON.stringify(itemList));
}

// Set item id number:
function setNo (){
   if(localStorage.itemList){
      let itemList = JSON.parse(localStorage.itemList);
      itemList.forEach((item,index)=>{
         item.itemNo = index;
      })
      localStorage.itemList = JSON.stringify(itemList);
   }
}


// Open cart:
$("cartBtn").onclick = ()=> $('cart').classList.add("move-left");

// close cart: 
$("closeBtn").onclick = ()=> $('cart').classList.remove("move-left");


// Show item with i (index of item in itemList):
function showItem(){
   let itemList = JSON.parse(localStorage.itemList);
   itemList.forEach((item,i)=>{
      $('product').innerHTML += `
         <div class="item ${item.type}">
            <div class='image'>
               <img src="${item.image}" alt="">
            </div>
            <p class="title">${item.name}</p>
            <p class="price">${item.price}.000đ</p>
            <div class="buy">
               <div class="item-input__area">
                  <div class="arrow">
                     <i onclick="decreaseCount(event)" class="down fa-solid fa-angle-left"></i>
                     <i onclick="increaseCount(event)" class="up fa-solid fa-angle-right"></i>
                  </div>
                  <input class="item-input" style='width: 30px; padding-left:10px' type="number" min="1" step="1" value="1">
               </div>
               <i class="addCart-btn fa-solid fa-cart-plus" title='Thêm vào giỏ hàng' onclick="addCart(${i},event)"></i>
            </div>
         </div> 
      `
   })
}


// Search item and show result:
function searchItem(){
   let searchKey = $('searchInput').value.toLowerCase();
   let itemList = document.querySelectorAll('.item');
   let itemNameList = document.querySelectorAll('.item .title');
   itemList.forEach((e)=>{
      e.style.display = 'none';
   })
   itemNameList.forEach((item)=>{
      if(item.innerHTML.toLowerCase().includes(searchKey)){
         item.parentElement.style.display = "block"
      }
   })
}

$('searchInput').oninput = ()=>{
   productFilter('all');
   let itemList = document.querySelectorAll('.item');
   if($('searchInput').value == ''){
      itemList.forEach((e)=>{
         e.style.display = 'block';
      })
   }
}


// Product filter:
function productFilter(type){
   let menuBtnList = document.querySelectorAll('.type-menu button');
   let itemList = document.querySelectorAll('.item');
   let typeList = document.querySelectorAll(`.${type}`);
   menuBtnList.forEach((button)=>{
      button.classList.remove('menu-button-click');
   })
   $(type).classList.add('menu-button-click');

   if(type == 'all'){
      itemList.forEach((i)=>{i.style.display = 'block'})
   }else{
      itemList.forEach((i)=>{i.style.display = 'none'})
      typeList.forEach((item)=>{item.style.display = 'block'})
   }
}



// Price filter:
let priceInput = document.querySelectorAll('.price-filter .price');
priceInput.forEach((x)=>{
   
   x.onclick = ()=>{
      $('searchInput').value = '';
      let checkBoxArr = [];
      priceInput.forEach((checkbox)=>{
         if (checkbox.checked){
            checkBoxArr.push(checkbox.id)
         }
      })

      if(checkBoxArr.length == 0){
         productFilter('all');
      }else{
         let priceIdList = [];     //Mang chua item thoa man dieu kien loc gia
         checkBoxArr.forEach((e)=>{
            priceFilter(e,priceIdList)
         })

         // Display the item:
         document.querySelectorAll('.item').forEach((item)=>{
            item.style.display = 'none';
         })
         priceIdList.forEach((x)=>{
            x.style.display = 'block';
         })
      }
   }
})

function priceFilter(selector,priceList){
   productFilter('all');
   let itemList = document.querySelectorAll('.item');
   let compare = $(selector).value;
   itemList.forEach((item)=>{
      let price = item.querySelector('.price').innerHTML;
      price = price.slice(0, price.length-5);
      
      switch (compare){
         case 'check1':
            if(price < 100) {priceList.push(item)}
            break;
         case 'check2':
            if(price >= 100 && price <= 300) {priceList.push(item)}
            break;
         case 'check3':
            if(price > 300) {priceList.push(item)}
            break;
      }
   })
}


// Reset search:
function resetSearch(){
   $('searchInput').value = '';
   priceInput.forEach((x)=>{
      if(x.checked){
         x.checked = false;
      }
   })
}



// Change number of item input when click:
function decreaseCount(event){
   let value = parseInt(event.target.parentElement.nextElementSibling.value);
   if(value > 1) {
      value -= 1;
      event.target.parentElement.nextElementSibling.value = value;
   };
}
function increaseCount(event){
   let value = event.target.parentElement.nextElementSibling.value;
   if(isNaN(value)){value = 1}
   else if(value <= 0){
      value = 1;
   }else{
      value = parseInt(value);
      value += 1;
   }
   event.target.parentElement.nextElementSibling.value = value;
}



// Add cart to storage:
let CartItem = function(itemNo,image,name,price,count){
   this.itemNo = itemNo;
   this.image = image;
   this.name = name;
   this.price = price;
   this.count = count;
}

function addCart(i,event){
   let cart = [];
   let item = JSON.parse(localStorage.itemList)[i];
   let itemCount = event.target.parentElement.firstElementChild.lastElementChild.value;
   if(itemCount == 0 || isNaN(itemCount)){
      alert("Vui lòng nhập số lượng cần mua ít nhất là 1");
   }else{
      itemCount = parseInt(itemCount);
      let cartItem = new CartItem(item.itemNo,item.image,item.name,item.price,itemCount);
      // Check the cart whether it exists:
      if(!localStorage.cart){
         cart.push(cartItem);
         localStorage.setItem('cart',JSON.stringify(cart))
      }else{
         cart = JSON.parse(localStorage.cart);
         // Check the cartItem whether it exists:
         let isExist = true;
         if(cart.length == 0) {
            isExist = false;
         }else{
            for(let j = 0; j < cart.length; j++){
               if(cart[j].itemNo == i){
                  isExist = true;
                  cart[j].count = parseInt(cart[j].count) + itemCount;
                  localStorage.cart = JSON.stringify(cart);
                  break;
               }else{ isExist = false}
            }
         }
         
         if(!isExist){
            cart.push(cartItem);
            localStorage.cart = JSON.stringify(cart);
         }
      }
      event.target.parentElement.firstElementChild.lastElementChild.value = 1;
      showCart();
   } 
}


// Show cart:
function showCart(){
   if(localStorage.cart && JSON.parse(localStorage.cart).length != 0){
      $('cartContainer').innerHTML = `
         <table>
            <thead> 
               <tr>
                  <td class="col-1"></td>
                  <td class="col-2"></td>
                  <td class="col-3">Tên sản phẩm</td>
                  <td class="col-4">Đơn giá</td>
                  <td class="col-5">Số lượng</td>
                  <td class="col-6">Tổng</td>
                  <td class="col-7"></td>
               </tr>
            </thead>
            <tbody id="cartItem"></tbody>
         </table>
         <label id="subTotal-label" style="font-size: 80%" for="subTotal">Tổng cộng: </label> <input id="subTotal-input" value=0 type="text" disabled><br>
         <button id="deleteAll" onclick='deleteAll()' style="font-size: 70%">Xóa tất cả</button>
      `

      $('cartItem').innerHTML = '';
      let cart = JSON.parse(localStorage.cart);
      let subTotal = 0;

      cart.forEach((cartItem,index)=>{
         $('cartItem').innerHTML += `
            <tr>
               <td class="col-1">${index+1}</td>
               <td class="col-2">
                  <img src="${cartItem.image}" alt="">
               </td>
               <td class="col-3">${cartItem.name}</td>
               <td class="col-4">${cartItem.price}.000 đ</td>
               <td class="col-5">
                  <div class="item-input__area">
                     <div class="arrow">
                        <i onclick="decreaseCartCount(${index},event)" class="down fa-solid fa-angle-left"></i>
                        <i onclick="increaseCartCount(${index},event)" class="up fa-solid fa-angle-right"></i>
                     </div>
                     <input class='item-input' onblur='updateCartItemCount(${index},event)' style='width: 30px; font-size: 100%' type="number" min="1" step="1" value="${cartItem.count}">
                  </div>
               </td>
               <td class="col-6">${cartItem.price * cartItem.count}.000 đ</td>
               <td class="col-7">
                  <button onclick="deleteCartItem(${index})" style="font-size: 100%">Xóa</button>
               </td>
            </tr><br>
         `;
         subTotal += cartItem.price * cartItem.count;
      })
      $('subTotal-input').value = ` ${subTotal}.000 đ`;
      $("item-count").innerHTML = cart.length;
   }else{
      $('cartContainer').innerHTML = `
         <span class="empty-cart">Giỏ hàng trống</span>
      `
   }
}


function decreaseCartCount(index,event){
   decreaseCount(event);
   let cart = JSON.parse(localStorage.cart);
   cart[index].count = event.target.parentElement.nextElementSibling.value;
   localStorage.cart = JSON.stringify(cart);
   showCart();
}
function increaseCartCount(index,event){
   increaseCount(event);
   let cart = JSON.parse(localStorage.cart);
   cart[index].count = event.target.parentElement.nextElementSibling.value;
   localStorage.cart = JSON.stringify(cart);
   showCart();
}

// Delete item in cart:
function deleteCartItem(index){
   let cart = JSON.parse(localStorage.cart);
   getConfirm(`Bạn muốn xóa ${cart[index].name} ra khỏi giỏ hàng?`,'Xóa','Hủy',()=>{
      cart.splice(index,1);
      localStorage.cart = JSON.stringify(cart);
      showCart();
   })
}


//Delete all item in cart:
function deleteAll(){
   if(localStorage.cart){
      getConfirm("Bạn chắc chắn muốn xóa tất cả giỏ hàng?",'Xóa','Hủy',()=>{
         localStorage.removeItem('cart');
         $('subTotal-input').value = 0;
         $("item-count").innerHTML = 0;
         showCart();
      })
   }
}


// Update cart when change the number in cart input:
function updateCartItemCount(index,event){
   let cart = JSON.parse(localStorage.cart);
   cart[index].count = event.target.value;
   localStorage.cart = JSON.stringify(cart);
   showCart();
} 




window.onload = ()=>{
   setNo();
   showItem();
   showCart();
   productFilter('all');
}
$('searchInput').onkeyup = (e)=>{
   if(e.key == 'Enter') searchItem() 
}

$('searchBtn').onclick = ()=>{searchItem()}; 


document.querySelectorAll('.type-menu button').forEach((button)=>{
   button.onclick = function (){
      resetSearch();
      productFilter(button.id);
   }
})
