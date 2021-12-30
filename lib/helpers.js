export function transEventsWithPicture(raw) {
	return raw.map((evt) => {
		let image = null;
		if (evt.attributes.image.data !== null) {
			image = {
				id: evt.attributes.image.data.id,
				...evt.attributes.image.data.attributes,
			};
		}
		return {
			id: evt.id,
			...evt.attributes,
			image,
		};
	});
}

export function transSingleEventWithPicture(evt) {
	let image = null;
	if (evt.attributes.image.data !== null) {
		image = {
			id: evt.attributes.image.data.id,
			...evt.attributes.image.data.attributes,
		};
	}
	return {
		id: evt.id,
		...evt.attributes,
		image,
	};
}
