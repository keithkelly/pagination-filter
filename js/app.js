// Set initial variables
var studentsListContainer = document.querySelector('.student-list');
var numberOfResultsToShow = 10;
var studentsList = studentsListContainer.getElementsByClassName('student-item');
var totalListPages = Math.ceil(studentsList.length / numberOfResultsToShow);


/** @function
 * Show a list of students based on a specified starting point.
 * Hides any students that fall outside of the start and end indexes.
 * @param {number} startingIndex The starting index point
 */
var showStudents = function(startingIndex) {
	var endingIndex = startingIndex + numberOfResultsToShow - 1;

	// Loop through the students list and hide items that should not be shown
	for(var i = 0; i < studentsList.length; i++) {	
		// Initially remove any style elements if they were set		
		studentsList[i].removeAttribute('style');					
		
		if(i < startingIndex || i > endingIndex) {										
			studentsList[i].style.display = 'none';
		}
	}
}

/** @function
 * Search student list and return any students whose name or email caontains search criteria.
 */
var searchStudents = function() {
	var counter = studentsList.length;
	var searchContainer = document.querySelector('.student-search');
	var searchInput = searchContainer.querySelector('input');
	var searchCriteria = searchInput.value.toLowerCase();

	// Loop throught he students list and hide elements that do not contain the search criteria
	for(var i = 0; i < studentsList.length; i++) {
		var studentDetails = studentsList[i].querySelector('.student-details');
		var studentName = studentDetails.querySelector('h3').innerText;
		var studentEmail = studentDetails.querySelector('.email').innerText;
		
		// Initially remove any style elements if they were set and remove any previous messages
		studentsList[i].removeAttribute('style');
		removeSearchMessage();

		// Check if the name or email contains the search criteria
		// If it does not meet the criteria add the style of display: none and reduce the counter by 1
		if(!studentName.includes(searchCriteria) || !studentEmail.includes(searchCriteria)) {
			studentsList[i].style.display = 'none';
			counter--;
		}
	}

	// If no results are returned show a message
	if(counter === 0) {
		var messageContainer = document.createElement('div');
		messageContainer.classList.add('search-message');
		messageContainer.innerText = 'We\'re sorry, but your search didn\'t return any results.  You can try again or click one of the pagination buttons to go back to the full list.';
		studentsListContainer.append(messageContainer);
	}

	// If search is blank show the first set of students
	if(searchCriteria === '') {
		showStudents(0);
	}

	// Clear search box
	searchInput.value = '';
}


/** @function
 * Change the results shown when a button is clicked.
 */
var updateStudentList = function() {
	var pageNumber = parseInt(this.innerText, 10);
	var startingIndex = numberOfResultsToShow * pageNumber - numberOfResultsToShow;
	var activeElements = document.getElementsByClassName('active');

	// Remove the search message if it exists
	removeSearchMessage();

	// Remove active class from other pagination buttons
	while(activeElements.length) {
		activeElements[0].classList.remove('active');
	}

	this.classList.add('active');

	showStudents(startingIndex);
}


/** @function
 * Remove the empty search results message.
 */
var removeSearchMessage = function() {
	var messageContainer = document.querySelector('.search-message');
	if(messageContainer) {
		studentsListContainer.removeChild(messageContainer);
	}
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
	searchButton.onclick = searchStudents;

	searchContainer.append(searchInput);
	searchContainer.append(searchButton);

	pageHeader.append(searchContainer);
}

// Initiate the program
showStudents(0);
addPaginationButtons();
addSearchForm();