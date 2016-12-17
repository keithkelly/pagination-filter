var studentsListContainer = document.querySelector('.student-list');
var numberOfResultsToShow = 10;
var studentsList = studentsListContainer.getElementsByClassName('student-item');
var totalListPages = Math.ceil(studentsList.length / numberOfResultsToShow);


/** @function
 * Show a list of students based on a specified starting point.
 * Hides any students that fall outside of the start and end indexes.
 * @param {number} start The starting index point
 */
var showStudents = function(startingIndex) {
	var endingIndex = startingIndex + numberOfResultsToShow - 1;

	// Loop through items and hide items that should not be shown
	for(var i = 0; i < studentsList.length; i++) {	
		// Initially remove any style elements if they were set		
		studentsList[i].removeAttribute('style');					
		
		if(i < startingIndex || i > endingIndex) {										
			studentsList[i].style.display = 'none';
		}
	}
}


/** @function
 * Change the results shown when a button is clicked.
 */
var updateStudentList = function() {
	var pageNumber = parseInt(this.innerText, 10);
	var startingIndex = numberOfResultsToShow * pageNumber - numberOfResultsToShow;
	var activeElements = document.getElementsByClassName('active');

	// Remove active class from other pagination buttons
	while(activeElements.length) {
		activeElements[0].classList.remove('active');
	}

	this.classList.add('active');

	showStudents(startingIndex);
}


/** @function
 * Geneate pagination buttons.
 */
var addPaginationButtons = function() {
	var paginationContainer = document.createElement('div');
	var paginationButtonsGroup = document.createElement('ul');
	paginationContainer.classList.add('pagination');

	// Generate each pagination list item
	for(var i = 1; i <= totalListPages; i++) {
		var paginationButton = document.createElement('li');
		var buttonLink = document.createElement('a');

		buttonLink.setAttribute('href', '#');
		buttonLink.innerText = i;
		buttonLink.onclick = updateStudentList;

		// Initially set the first button as active
		if(i === 1) {
			buttonLink.classList.add('active');
		}

		paginationButton.append(buttonLink);
		paginationButtonsGroup.append(paginationButton);
	}

	paginationContainer.append(paginationButtonsGroup);
	studentsListContainer.insertAdjacentElement('afterend', paginationContainer);
}

/** @function
 * Geneate search form.
 */
var addSearchForm = function() {
	var pageHeader = document.querySelector('.page-header');
	var searchContainer = document.createElement('div');
	var searchInput = document.createElement('input');
	var searchButton = document.createElement('button');

	searchContainer.classList.add('student-search');
	searchInput.setAttribute('placeholder', 'Search for students...');
	searchButton.innerText = 'Search';

	searchContainer.append(searchInput);
	searchContainer.append(searchButton);

	pageHeader.append(searchContainer);
}

showStudents(0);
addPaginationButtons();
addSearchForm();