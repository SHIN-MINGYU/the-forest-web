import Link from "next/link";

export default function error() {
  return (
    <div className="h-screen">
      <div className="h-full flex flex-col justify-center items-center">
        <p>this page is 404 error page</p>
        <p>if you want leave this page</p>
        <Link href="/">
          <span className="text-blue-500 cursor-pointer">click this!</span>
        </Link>
      </div>
    </div>
  );
}
