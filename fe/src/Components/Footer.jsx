import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-10">
      <div className="max-w-6xl mx-auto flex justify-strat space-x-20">
        <div>
          <a href="/" className="flex items-center space-x-4 mb-4">
            <img src={logo} alt="Logo" className="h-8 w-8" />
            <span className="font-bold text-xl flex items-center space-x-3">
              AviSent
            </span>
          </a>
        </div>
      </div>

      <hr className="border-gray-700 my-4" />

      <div className="text-center">
        <p>AviSentry © 2024. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
