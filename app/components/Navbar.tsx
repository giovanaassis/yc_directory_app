import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/logo.png";
import { auth, signIn, signOut } from "@/auth";

export default async function Navbar() {
  const session = await auth();

  return (
    <nav className="bg-white p-4 shadow-sm flex items-center justify-between">
      <Link href="/">
        <Image src={Logo} alt="Logo Image" width={200} height={30} />
      </Link>
      <div className="flex items-center gap-5 text-black">
        {session && session?.user ? (
          <>
            <Link href="/startup/create">
              <span>Create</span>
            </Link>

            <form
              action={async () => {
                "use server";

                await signOut({ redirectTo: "/" });
              }}
            >
              <button type="submit">Logout</button>
            </form>

            <Link href={`/user/${session?.user?.id}`}>
              <span>{session?.user?.name}</span>
            </Link>
          </>
        ) : (
          <form
            action={async () => {
              "use server";

              await signIn("github");
            }}
          >
            <button type="submit">Login</button>
          </form>
        )}
      </div>
    </nav>
  );
}
