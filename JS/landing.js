/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/


/**
 * Define Global Variables
 * 
*/


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
// Get positions of sections when the page loads
let sections = document.querySelectorAll('section');
let positions = []; // this includes all positions of the top of all section elements


for(let i = 0; i < sections.length; i++) { //this loops though all sections
    let pos = sections[i].getBoundingClientRect().top + window.scrollY; 
    positions[i] = pos;
    if (i + 1 == sections.length) {
        let body = document.body;
        let html = document.documentElement;

        let totalPageHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
        positions[i + 1] = totalPageHeight;
    }
}

console.log(positions);
/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/
// build the nav
function buildNav() {
    //get reference to the UL
    const navList = document.getElementById('navbar__list');
    //sections is defined above
    for (let i = 0; i < sections.length; i++) { //loop through each section
        let currentSectionId = sections[i].id; //get the id of the section
        let currentSectionName = sections[i].getAttribute('data-nav'); //get the section name
        let liEl =  document.createElement("li"); //create an li element that is added to the nav
        liEl.innerHTML = currentSectionName //add te name to li
        liEl.setAttribute("data-id", currentSectionId); //add the data-id attribute to use further
        liEl.classList.add("nav-item"); //give the li a class
        navList.appendChild(liEl); //append the li to ul
        // add an event listener to the li to detect click
        liEl.addEventListener('click', function(e) {
            //Add class 'active' to section when near top of viewport
            e.preventDefault();
            e.target.classList.add('active');
            let secId = e.target.getAttribute("data-id"); //get the section ID value
            let scrollTarget = document.getElementById(secId);
            //make the scrolling smooth
            window.scroll({
                top: scrollTarget.offsetTop,
                behavior: 'smooth'
            })
        })
    }
}
// scroll to anchor id using scrollTo event
function handleScroll() {
    let liEl = document.querySelectorAll('.nav-item');
    for (let s = o; s < positions.length; s++) {
        let firstSection = positions[s];
        let secondSection = positions[s + 1];
        let position = window.pageYOffset; //get position
        if (firstSection <= position && secondSection >= positions) {
            liEl[s].classList.add('active'); //add element
            sections[s].classList.add('active-section'); //add active
        }
    }
}



/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 

buildNav();
