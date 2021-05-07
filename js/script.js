/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/



/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
const itemsPerPage = 9;
const studentList = document.querySelector('.student-list');
const linkList = document.querySelector('.link-list');




// makes each page 9 students
function showPage (list, page){
   let startIndex = (page * itemsPerPage) - itemsPerPage;
   let endIndex = page * itemsPerPage;
   studentList.innerHTML = "";

//itterates through to add li student elements to end of list
   for(let i = 0; i < list.length; i++){
      if(i >= startIndex && i < endIndex) {
      
         let student = 
             `<li class="student-item cf">
                  <div class="student-details">
                     <img class="avatar" src = ${list[i].picture.large} alt="Profile Picture">
                     <h3 >${list[i].name.first} ${list[i].name.last}</h3>
                     <span class="email">${list[i].email}</span>
                  </div>
                  <div class="joined-details">
                     <span class="date"> Joined ${list[i].registered.date}</span>
                  </div>
               </li>`
      
         studentList.insertAdjacentHTML('beforeend', student);

}
   }
      
};

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/

//creates number of page buttons based on data length
function addPagination (list){
   let numberOfPages = Math.ceil(list.length / itemsPerPage);
   linkList.innerHTML = '';
   let active = '';
   
//adds buttons to page
   for(let i = 1; i <= numberOfPages; i++){
      const pageButton = `
      <li>
      <button type="button"> ${i}</button>
    </li> 
      `

   linkList.insertAdjacentHTML('beforeend',pageButton);
   }
   //adds active status to buttons
      active = document.querySelector('button');
      active.className = 'active';
   
   //adds an event listener to remove active status and add active status to event target
    linkList.addEventListener('click', (e) => {

      if(e.target.tagName == 'BUTTON'){
         let activeButton = document.querySelector('.active');
         activeButton.classList.remove('active');
         e.target.classList.add('active');
         showPage(list, e.target.textContent);

      }
         
    });  

}

//add search bar to header
let searchBar = `<label for="search" class="student-search">
      <span>Search by name</span>
      <input id="search" placeholder="Search by name...">
      <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
      </label>`

   const header = document.querySelector('.header');
   header.insertAdjacentHTML('beforeEnd', searchBar);

   

//filter students by input
function searchFilter (list) {
   const inputValue = document.querySelector('.student-search input').value.toLowerCase();
   const results = [];
   active = document.querySelector('button');
   active.className = 'active';
//loop over list and push into array
    for (let i = 0; i < list.length; i++) {
        let result = list[i].name.first.toLowerCase() + ' ' + list[i].name.last.toLowerCase();
        if (result !== 0 && result.includes(inputValue)){
            results.push(list[i]);
            
         }
      
//Display a no results found message 
      if(results.length === 0){
      const createDiv = document.createElement('div');
      const noResults = document.createElement('p');
      createDiv.appendChild(noResults);
      document.querySelector('.student-list').append(createDiv);
      noResults.textContent = "No Results Found";
  
}  


 // display results of input
showPage(results, 1);
addPagination(results); 
      }   

   };

const search = document.getElementById('search');
const submit = document.querySelector('button');


//event listens to the click of search button
submit.addEventListener('click', (e) => {
   e.preventDefault();
   searchFilter(data);
}); 
//event listens to words while being typed
search.addEventListener('keyup', () => {
   searchFilter(data);
});


// Call functions
showPage(data, 1);
addPagination(data);
searchFilter(search, data);
