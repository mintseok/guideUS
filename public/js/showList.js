const inputBox = document.querySelector("input");
const recommendBox = document.querySelector("#recommend");
const texts = document.querySelectorAll(".text");

inputBox.addEventListener("keyup", (e) => {
   if (e.key === 'Enter'){
      recommendBox.classList.add('invisible');
   }
   else{
      if (e.target.value.length > 0) {
         recommendBox.classList.remove('invisible');      
      } else {
         recommendBox.classList.add('invisible');
      }
   }   
});

