import { BsGithub } from "react-icons/bs";

function Footer() {
  return (
    <footer className="flex flex-1 grow p-8 justify-center items-center border-t-2 bg-white dark:bg-black">
      <a
        className="flex"
        href="https://github.com/SHIN-MINGYU/the-forest-web"
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
