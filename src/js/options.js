/*
	This file only runs on the options page
	References html/options.html
*/

function removeSiteFromBlocklist(e) {
	const removePromise = browser.storage.sync.remove(e.target.id);
	// After remove, delete from the table
	removePromise.then(() => {
		e.target.parentElement.parentElement.removeChild(e.target.parentElement)
	});
}

// Loads the current settings & builds a table to display the blocklist
browser.storage.sync.get(null, function (data) {
	const selectors = [];

	const blocklistTable = document.querySelector('#blocklist tbody');

	// Build the table from storage data
	for (site in data) {
		const row = document.createElement('tr');
		const leftCell = document.createElement('td');
		const rightCell = document.createElement('td');

		leftCell.textContent = `\u0078`;
		leftCell.style = "cursor:pointer;";
		leftCell.classList.add("trash-cell");
		leftCell.id = site;

		rightCell.textContent = site;
		row.appendChild(leftCell);
		row.appendChild(rightCell);
		blocklistTable.appendChild(row);
		selectors.push(`[id="${site}"]`);
	}

	document.querySelectorAll(selectors.join(',')).forEach((td) => {
		td.addEventListener('click', removeSiteFromBlocklist);
	});
});
