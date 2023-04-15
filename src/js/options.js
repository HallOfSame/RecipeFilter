function removeSiteFromBlocklist(e) {
	const removePromise = storage.sync.remove(e.target.id);
	// After remove, delete from the table
	removePromise.then(() => {
		e.target.parentElement.parentElement.removeChild(e.target.parentElement)
	});
}

// Loads the current settings & builds a table to display the blocklist
storage.sync.get(null, function (data) {
	let rowMarkup = '';
	let selectors = [];

	for (site in data) {
		rowMarkup += `<tr>
			<td id="${site}" class="trash-cell" style="cursor:pointer;">&#9447;</td>
			<td>${site}</td>
		</tr>`;
		selectors.push(`[id="${site}"]`);
	}
	// TODO need to secure this assignment
	document.querySelector('#blocklist tbody').innerHTML = rowMarkup;
	document.querySelectorAll(selectors.join(',')).forEach((td) => {
		td.addEventListener('click', removeSiteFromBlocklist);
	});
});
