import { FaDiscord, FaTwitch, FaTwitter, FaYoutube } from "react-icons/fa";
import logo from "../../assets/logo/logo.png";

export default function Footer() {
  return (
    <footer
      data-component="footer"
      className="fixed bottom-0 left-0 right-0 z-50 py-3 backdrop-blur-sm"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          <a
            href="#"
            className="flex items-center justify-center mb-2 text-lg font-semibold text-white"
          >
            <img
              src={logo}
              className="h-6 mr-2 rounded-full "
              alt="Kuirith Empire Logo"
            />
            Kuirith Empire
          </a>

          <span className="block text-xs text-center text-white">
            © 2025 Kuirith Empire™. All Rights Reserved.
          </span>

          <ul className="flex justify-center mt-2 space-x-4">
            <li>
              <a
                title="Discord"
                href="https://discord.gg/ETuKCcQpmc"
                className="text-white hover:text-primary"
              >
                <FaDiscord />
              </a>
            </li>
            <li>
              <a
                title="Youtube"
                href="https://www.youtube.com/channel/UC1llmkCYgB07AT0LIyJmITA"
                className="text-white hover:text-primary"
              >
                <FaYoutube />
              </a>
            </li>
            <li>
              <a
                title="Twitter"
                href="https://x.com/KuirithEmpire"
                className="text-white hover:text-primary"
              >
                <FaTwitter />
              </a>
            </li>
            <li>
              <a
                title="Twitch"
                href="https://www.twitch.tv/kuirithempire"
                className="text-white hover:text-primary"
              >
                <FaTwitch />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
