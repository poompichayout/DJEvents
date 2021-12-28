import Link from 'next/link';
import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import EventItem from '@/components/EventItem';
import { API_URL } from '@/config/index';
import { transEventsWithPicture } from '@/lib/helpers';

export default function Home({ events }) {
	return (
		<div>
			<Layout>
				<h1>Upcoming Events</h1>
				{events.length === 0 && <h3>No events to show</h3>}
				{events.map((evt) => (
					<EventItem key={evt.id} evt={evt} />
				))}

				{events.length > 0 && (
					<Link href="/events">
						<a className="btn-secondary">View All Events</a>
					</Link>
				)}
			</Layout>
		</div>
	);
}

export async function getStaticProps() {
	const res = await fetch(`${API_URL}/api/events?sort=date:ASC&populate=*`);
	const json = await res.json();
	const data = transEventsWithPicture(json.data);

	return {
		props: { events: data.slice(0, 3) },
		revalidate: 1,
	};
}
