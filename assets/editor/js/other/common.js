// Function to Read and return the URL of an image browsed from system files
function readImageURL(input, imageDisplay) {
	if (input.files && input.files[0]) {
		var reader = new FileReader();

		reader.onload = function (e) {
			imageDisplay.attr('src', e.target.result);
		}

		reader.readAsDataURL(input.files[0]); // convert to base64 string
	}
}

// After a mouseup event is fired anywhere in the document,
// given the target event and its list of permissible containers,
// determine, if the click was outside, all such containers
export function detectClickOutside(permittedContainersList, closeFlag, eventTarget) {
	$.each(permittedContainersList, function (index, value) {
		if (!value.is(eventTarget) && value.has(eventTarget).length === 0) {
			closeFlag = (closeFlag & true) == 1 ? true : false;
		}
		else {
			closeFlag = (closeFlag & false) == 1 ? true : false;
		}
	});
	return closeFlag;
}

export default {
	detectClickOutside,
	readImageURL
}