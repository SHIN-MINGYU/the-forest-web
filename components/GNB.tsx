import Link from "next/link";

function GNB() {
  return (
    <div className="flex justify-around fixed top-0 z-50 bg-white min-w-full p-3 ">
      <Link href="/">
        <div className="flex items-center" style={{ cursor: "pointer" }}>
          <img src="favicon.ico" width={50}></img>
          <span className="ml-2 text-2xl text-green-700 font-bold">
            The Forest
          </span>
          <span className="mt-3 ml-2 text-xs text-green-700 font-bold">
            with a stranger
          </span>
        </div>
      </Link>
      <div className="flex items-center">
        <ul>
          <li className="float-left mr-4">
            <Link href="/about"> About</Link>
          </li>
          <li className="float-left mr-4">Policy</li>
          <li className="float-left mr-20">Contact</li>
          <li className="float-left mr-4">Welcom Stranger!</li>
        </ul>
      </div>
    </div>
  );
}

export default GNB;
