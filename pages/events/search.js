import qs from 'qs';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '@/components/Layout';
import EventItem from '@/components/EventItem';
import { API_URL } from '@/config/index';
import { transEventsWithPicture } from '@/lib/helpers';

export default function SearchPage({ events }) {
	const router = useRouter();

	return (
		<Layout title="Search Results">
			<Link href="/events">
				<a>{'<'} Go Back</a>
			</Link>
			<h1>Search Results for {router.query.term}</h1>
			{events.length === 0 && <h3>No events to show</h3>}
			{events.map((evt) => (
				<EventItem key={evt.id} evt={evt} />
			))}
		</Layout>
	);
}

export async function getServerSideProps({ query: { term } }) {
	const query = qs.stringify(
		{
			filters: {
				$or: [
					{
						name: {
							$containsi: term,
						},
					},
					{
						performers: {
							$containsi: term,
						},
					},
					{
						description: {
							$containsi: term,
						},
					},
					{
						venue: {
							$containsi: term,
						},
					},
				],
			},
			populate: '*',
		},
		{
			encodeValuesOnly: true,
		}
	);
	const res = await fetch(`${API_URL}/api/events?${query}`);
	const events = await res.json();
	const data = transEventsWithPicture(events.data);

	return {
		props: { events: data },
	};
}
