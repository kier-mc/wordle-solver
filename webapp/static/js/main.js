// Input control
// Validates input and switches focus from element to element based on input
const input = document.querySelectorAll("input.letter")
// Counter for data-index attribute
let dataindex = 0
input.forEach(element => {
	element.setAttribute("data-index", dataindex);
	element.addEventListener("keydown", (press) => {
		// Check for alphabetical character input with regex and ensure input isn't a navigation/lock key
		if (/^[A-Za-z]/.test(press.key) && press.key.length === 1){
			// Set value via JS and prevent further propagation to avoid skipping input
			element.value = press.key
			press.preventDefault()
			// Get the current data-index attribute and use ternary operator to decide whether to increment to next input
			const el = parseInt(element.getAttribute("data-index"))
			const inc = el < input.length - 1 ? 1 : 0;
			input[el + inc].focus()
		}
		// Backspace should remove the value and move "backwards" through the input chain
		if (press.key === "Backspace"){
			element.value = ""
			press.preventDefault()
			// Same method as above but decrements
			const el = parseInt(element.getAttribute("data-index"))
			const inc = el > 0 ? 1 : 0;
			input[el - inc].focus()
		}
		// Delete should remove the element but remain at the current input
		if (press.key === "Delete"){
			element.value = ""
			press.preventDefault()
		}
		// Navigate "backwards" with arrow left
		if (press.key === "ArrowLeft"){
			const el = parseInt(element.getAttribute("data-index"))
			const inc = el > 0 ? 1 : 0;
			input[el - inc].focus()
		}
		// Navigate "forwards" with arrow right
		if (press.key === "ArrowRight"){
			const el = parseInt(element.getAttribute("data-index"))
			const inc = el < input.length - 1 ? 1 : 0;
			input[el + inc].focus()
		}
		// Any other key input is invalid, so stop it from occurring
		else {
			press.stopPropagation()
			press.preventDefault()
		}
	})
	// Increment data-index attributes per iterated element
	dataindex ++
});

// Main AJAX
const results = document.getElementById("results")
const ajax = async () => {
	// Begin function timer
	const time_start = new Date().getTime()
	// Generate FormData object from parsed form object
	const form_known = new FormData(document.getElementById("form-known-letters"))
	const form_valid = new FormData(document.getElementById("form-valid-letters"))
	const form_wrong = new FormData(document.getElementById("form-wrong-letters"))
	// Generate outgoing payload
	const outgoing = {}
	// Push form data into object for delivery
	for (const [key, value] of form_known){
		outgoing[key] = value
	}
	for (const [key, value] of form_valid){
		outgoing[key] = value
	}
	for (const [key, value] of form_wrong){
		outgoing[key] = value
	}
	// Console log outgoing package - remove when happy with send package
	console.log(outgoing)
	// Display loading elements for duration of fetch/response
	loading.forEach(element => {
		element.setAttribute("style", "display: block")
	});
	// Generate fetch/response
	const response = await fetch("/ajax", {
		"method": "POST",
		"headers": {"Content-Type": "application/json"},
		"body": JSON.stringify(outgoing)
	});
	const data = await response.json()
	// Clear results on receipt to avoid repetition
	results.innerHTML = ""
	// Iterate payload and push response(s) to page
	data.forEach(suggestion => {
		const el = document.createElement("span")
		el.classList.add("result")
		el.innerText = suggestion
		results.appendChild(el)
	});
	const time_end = new Date().getTime()
	const time_taken = time_end - time_start
	// Push number of results and time taken to fetch to page
	const counter = document.getElementById("counter")
	counter.innerHTML = `<span id="results-number">${data.length}</span> possible ${data.length == 1 ? "word" : "words"} found in ${time_taken} ${time_taken == 1 ? "millisecond" : "milliseconds"}`
	// Hide loading elements
	loading.forEach(element => {
		element.setAttribute("style", "display: none")
	});
}

// Clear function
const clearForm = () => {
	const form = document.querySelectorAll("form")
	const results = document.getElementById("results")
	const counter = document.getElementById("counter")
	form.forEach(element => {
		element.reset()
	});
	results.innerHTML = "Press submit to generate results"
	counter.innerHTML = ""
}

// querySelector for loading overlay/spinner
const loading = document.querySelectorAll("div[data-type='loading']")
// Hide loading elements when page is ready
document.addEventListener("DOMContentLoaded", () => {
	loading.forEach(element => {
		element.setAttribute("style", "display: none")
	});
});