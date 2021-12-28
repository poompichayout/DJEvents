import Layout from '@/components/Layout';
import EventItem from '@/components/EventItem';
import { API_URL } from '@/config/index';
import { transEventsWithPicture } from '@/lib/helpers';

export default function EventsPage({ events }) {
	return (
		<Layout>
			<h1>Events</h1>
			{events.length === 0 && <h3>No events to show</h3>}
			{events.map((evt) => (
				<EventItem key={evt.id} evt={evt} />
			))}
		</Layout>
	);
}

export async function getStaticProps() {
	const res = await fetch(`${API_URL}/api/events?sort=date:ASC&populate=*`);
	const events = await res.json();
	const data = transEventsWithPicture(events.data);

	return {
		props: { events: data },
		revalidate: 1,
	};
}
