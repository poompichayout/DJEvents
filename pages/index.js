import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";

export default function Home({ events }) {
	return (
		<div>
			<Layout>
				<h1>Upcoming Events</h1>
			</Layout>
		</div>
	);
}

export async function getStaticProps() {
	const res = await fetch(`${API_URL}/api/events`);
	const events = await res.json();

	return {
		props: { events },
    revalidate: 1
	};
}
