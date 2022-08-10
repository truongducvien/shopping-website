function getConfirm(message, agreeButton, disagreeButton, callback){
   function $(id){return document.getElementById(id)};

   const confirmBox = `
      <div id="confirm-box" class="confirm-box">
         <div class="head">
            <i class="fa-solid fa-circle-question"></i>
         </div>
         <span id="confirmMessage" class="title">${message}</span>
         <div class="button">
            <button id="yesBtn">${agreeButton}</button>
            <button id="cancelBtn">${disagreeButton}</button>
         </div>
      </div>
   `;

   let bodyEle = document.querySelector('body')
   let divEle = document.createElement('div');

   bodyEle.style.overflow = 'hidden';

   divEle.id = 'confirm-container';
   divEle.innerHTML = confirmBox;
   document.querySelector('body').prepend(divEle);
   $('confirmMessage').innerHTML = message;
   $('confirm-box').style.display = 'block';

   setTimeout(()=>{
      $('confirm-box').style.transform = 'scale(1)';
   })

   yesBtn.onclick = ()=>{
      callback();
      $('confirm-container').remove();
      bodyEle.style.overflow = 'unset';
   }
   
   cancelBtn.onclick = ()=>{
      $('confirm-container').remove();
      bodyEle.style.overflow = 'unset';
   }
}