function $(id){return document.getElementById(id)}

let Product = function(image, name, type, price){
   this.image = image;
   this.name = name;
   this.type = type;
   this.price = price;
}



function clearForm(){
   $('itemImage').value = '';
   $('itemName').value = '';
   $('itemPrice').value = '';
}

function validateForm(){
   if($('itemImage').value=='' || $('itemName').value=='' || $('itemPrice').value==''){
      return false;
   }else{return true}
}
 

// Preview product:
function preview(){
   if(!validateForm()){
      alert("Vui lòng điền đầy đủ thông tin sản phẩm!")
   }else{
      let x;
      switch($('itemType').value){
         case 'shirt':
            x = 'Áo';
            break;
         case 'pants':
            x = 'Quần';
            break;
         case 'skirt':
            x = 'Váy';
            break;
         case 'set':
            x = 'Bộ';
            break;
         case 'other':
            x = 'Phụ kiện khác';
      }
      $('show-area').innerHTML = `
      <div id="image">
         <img src="${$('itemImage').value}" alt="">
      </div>
      <div class="info">
         <span id="name">Tên sản phẩm: <b> ${$('itemName').value}</b></span><br>
         <span id="type">Loại sản phẩm: <b> ${x}</b></span><br>
         <span id="name">Đơn giá: <b>${$('itemPrice').value}.000đ</b></span>
      </div>
   `
   }
   $('previewBtn').blur();
}


// Get and save product in local storage:
function addItem(){
   if(!validateForm()){
      alert("Vui lòng điền đầy đủ thông tin sản phẩm!")
   }else{
      let itemList = [];
      let item = new Product($('itemImage').value, $('itemName').value, $('itemType').value, $('itemPrice').value);
      getConfirm(`Thêm ${item.name} vào danh sách sản phẩm?`,'Thêm','Hủy',()=>{
         itemList.push(item);
         if(!localStorage.itemList){
            localStorage.setItem('itemList',JSON.stringify(itemList));
         }else{
            itemList = JSON.parse(localStorage.itemList);
            let isExist = true;
            for(let i = 0; i < itemList.length; i++){
               if(item.name == itemList[i].name){
                  alert('Sản phẩm trùng tên trong giỏ hàng');
                  isExist = true;
                  break;
               }else{
                  isExist = false;
               }
            }
            if(isExist == false){
               itemList.push(item);
               localStorage.itemList = JSON.stringify(itemList);
               console.log(isExist)
            }
         }
         clearForm();
         $('show-area').innerHTML = '';
         showList();
      })
   }
   $('addBtn').blur();
}
 

// Set ID Number for each item:
function setNo (){
   if(localStorage.itemList){
      let itemList = JSON.parse(localStorage.itemList);
      itemList.forEach((item,index)=>{
         item.itemNo = index;
      })
      localStorage.itemList = JSON.stringify(itemList);
   }
}


// Load product list:
function showList(){
   if(localStorage.itemList){
      $('product-list').innerHTML = '';
      let itemList = JSON.parse(localStorage.itemList); 
      itemList.forEach((item,index)=>{
         $('product-list').innerHTML += `
            <tr>
               <td class='col-1'>${index + 1}</td>
               <td class='col-2'><img style='width: 30px' src="${item.image}" alt=""></td>
               <td class='col-3'>${item.name}</td>
               <td class='col-4'>${item.price}.000đ</td>
               <td class='col-5'><button onclick="deleteProduct(${index})">Xóa</button></td>
            </tr><br>
         `
      })
   }else{
      $('product-list').innerHTML = '';
   }
}


// Delete item in product list
function deleteProduct(index){
   let itemList = JSON.parse(localStorage.itemList);
   let name = itemList[index].name;
   getConfirm(`Xóa ${name} ra khỏi danh sách sản phẩm?`,'Xóa','Hủy', ()=>{
      itemList.splice(index,1);
      localStorage.itemList = JSON.stringify(itemList);
      showList();
   })
}


// Delete all item in list
function deleteAll(){
   getConfirm(`Xóa toàn bộ danh sách sản phẩm?`,'Xóa','Hủy', ()=>{
      localStorage.itemList = '';
      showList();
   })
}



// window.addEventListener('load',setNo);
window.addEventListener('load',showList);
$('addBtn').onclick = addItem;
$('previewBtn').onclick = preview;
$('itemImage').onkeyup = (e)=>{
   if(e.key == "Enter") preview();
   
}
$('itemName').onkeyup = (e)=>{
   if(e.key == "Enter") preview();
}
$('itemPrice').onkeyup = (e)=>{
   if(e.key == "Enter") preview();
}

$('deleteAll').onclick = deleteAll;