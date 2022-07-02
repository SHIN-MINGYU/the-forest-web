import { BsGithub } from "react-icons/bs";

function Footer() {
  return (
    <footer className="flex flex-col flex-1 grow p-8 justify-center items-center pt-10 bg-gray-300 dark:bg-black">
      <a
        className="flex dark:text-stone-50"
        href="https://github.com/SHIN-MINGYU/the-forest-web"
        target="_blank"
        rel="noopener noreferrer">
        Powered by{" "}
        <span className="ml-2 tracking-wider dark:text-stone-50">
          <BsGithub className="inline mr-2 dark:text-stone-50" />
          SHIN-MIN-GYU
        </span>
      </a>
      <p className="dark:text-stone-50">
        if you have any question, connect to smg20004@gmail.com
      </p>
      <p className="dark:text-stone-50">
        version : 0.0.1v, create at 2022/07/01
      </p>
    </footer>
  );
}

export default Footer;
