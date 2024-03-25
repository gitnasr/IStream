
export const TextFile = (name: string, linksAsString: string[]) => {
	const element = document.createElement("a");
	const file = new Blob(linksAsString, {
		type: "text/plain",
	});
	element.href = URL.createObjectURL(file);
	element.download = name + ".txt";
	document.body.appendChild(element);
	element.click();
    element.remove();
};
