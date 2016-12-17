// Get needed DOM elements
var studentList = document.querySelector('.student-list');

// Determine studentCount and totalPages
var resultsToShow = 10;
var students = studentList.getElementsByClassName('student-item');
var totalPages = Math.ceil(students.length / resultsToShow);

// Show initial batch of students
var initialStudentsList = function() {
	var end = 0 + resultsToShow - 1;
	for(var i = 0; i < students.length; i++) {
		if(i > end) {
			students[i].classList.add('hidden');
		}
	}
}

// Remove active classes from all pagination buttons
var removeClass = function(elementClass) {
	var elements = document.getElementsByClassName(elementClass);
	while(elements.length) {
		elements[0].classList.remove(elementClass);
	}
}

// Show specific results based on starting point in list
var showResults = function(start) {
	var end = start + resultsToShow - 1;

	// Remove all other active classes
	removeClass('hidden');

	// Loop through items and add hidden class to items not to show
	for(var i = 0; i < students.length; i++) {
		if(i < start || i > end) {
			students[i].classList.add('hidden');
		}
	}
}

// Change results when button is clicked
var changeResults = function() {
	var page = parseInt(this.innerText, 10);
	var start = resultsToShow * page - resultsToShow;

	// Remove all other active classes
	removeClass('active');

	// Add the class active to the current item
	this.classList.add('active');

	// Show results
	showResults(start);
}

// Generate pagination buttons
var addPagination = function() {
	// Generate needed elements
	var container = document.createElement('div');
	var unorderedList = document.createElement('ul');

	// Add classes to new elements
	container.classList.add('pagination');

	// Generate each pagination list item
	for(var i = 1; i <= totalPages; i++) {
		var listItem = document.createElement('li');
		var anchor = document.createElement('a');
		anchor.setAttribute('href', '#');
		listItem.append(anchor);
		anchor.innerText = i;
		anchor.onclick = changeResults;
		if(i === 1) {
			anchor.classList.add('active');
		}
		unorderedList.append(listItem);
	}

	// Append unordered list to pagination container
	container.append(unorderedList);

	// Insert pagination buttons after student list
	studentList.insertAdjacentElement('afterend', container);
}

initialStudentsList();
addPagination();