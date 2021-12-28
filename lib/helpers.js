export function transEventsWithPicture(raw) {
    return raw.map((evt) => ({
		id: evt.id,
		...evt.attributes,
		image: {
			id: evt.attributes.image.data.id,
			...evt.attributes.image.data.attributes,
		},
	}));
}