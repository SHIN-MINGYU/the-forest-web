import { BsGithub } from "react-icons/bs";

function Footer() {
  return (
    <footer className="flex flex-1 grow p-8 justify-center items-center border-t-2">
      <a
        className="flex"
        href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer">
        Powered by{" "}
        <span className="ml-2 tracking-wider">
          <BsGithub className="inline mr-2" />
          신민규
        </span>
      </a>
    </footer>
  );
}

export default Footer;
