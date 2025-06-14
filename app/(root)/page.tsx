import SearchForm from "../components/SearchForm";
import StartupCard, { StartupCardType } from "../components/StartupCard";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;
  const params = { search: query || null };
  const posts: StartupCardType[] = (
    await sanityFetch({ query: STARTUPS_QUERY, params })
  ).data;

  return (
    <>
      {/* HERO SECTION */}
      <section className="pink_container pattern">
        <h1 className="heading">
          pitch your startup, connect with entrepreneurs
        </h1>

        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions
        </p>

        <SearchForm query={query} />
      </section>

      {/* STARTUPS CARDS SECTION */}
      <section className="section_container">
        <p className="font-semibold text-[30px] text-black mb-7">
          {query ? `Search results for "${query}"` : "All Startups"}
        </p>

        <ul className="card_grid">
          {posts?.length > 0 ? (
            posts.map((post) => <StartupCard key={post?._id} post={post} />)
          ) : (
            <p>No startups found.</p>
          )}
        </ul>
      </section>

      <SanityLive />
    </>
  );
}
