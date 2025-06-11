import SearchForm from "../components/SearchForm";
import StartupCard from "../components/StartupCard";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;

  const posts = [
    {
      _createdAt: new Date(),
      views: 55,
      author: { _id: 1, name: "Giovana" },
      _id: 1,
      description: "This is a description",
      image:
        "https://images.pexels.com/photos/2085831/pexels-photo-2085831.jpeg",
      category: "Robots",
      title: "We Robots",
    },
  ];

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
        <p className="font-semibold text-[30px] text-black;">
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
    </>
  );
}
