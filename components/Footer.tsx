export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-center md:text-left">
            <p className="text-gray-300">
              © {currentYear} VoiceToText AI. All rights reserved.
            </p>
          </div>
          <div className="text-center md:text-right">
            <p className="text-gray-300">
              Developed by{" "}
              <a
                href="https://gunasekaran-portfolio.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors underline"
              >
                Gunasekaran
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
