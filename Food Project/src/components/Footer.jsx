const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-6">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between">
                    {/* Logo and Description */}
                    <div className="mb-4 md:mb-0">
                        <h1 className="text-2xl font-bold">The Vanilla Vault</h1>
                        <p className="text-gray-400">Your favorite meals delivered to your door.</p>
                    </div>

                    {/* Links Section */}
                    <div className="flex flex-col md:flex-row">
                        <div className="mb-4 md:mb-0 md:mr-8">
                            <h2 className="text-lg font-semibold mb-2">Company</h2>
                            <ul>
                                <li><a href="/about" className="hover:text-gray-300 transition-colors duration-200">About Us</a></li>
                                <li><a href="/services" className="hover:text-gray-300 transition-colors duration-200">Services</a></li>
                                <li><a href="/contact" className="hover:text-gray-300 transition-colors duration-200">Contact</a></li>
                            </ul>
                        </div>

                        <div className="mb-4 md:mb-0">
                            <h2 className="text-lg font-semibold mb-2">Resources</h2>
                            <ul>
                                <li><a href="/faq" className="hover:text-gray-300 transition-colors duration-200">FAQ</a></li>
                                <li><a href="/terms" className="hover:text-gray-300 transition-colors duration-200">Terms of Service</a></li>
                                <li><a href="/privacy" className="hover:text-gray-300 transition-colors duration-200">Privacy Policy</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="mt-6 border-t border-gray-700 pt-4 text-center">
                    <p className="text-gray-400">© {new Date().getFullYear()} The Vanilla Vault. All rights reserved.</p>
                    <div className="mt-2">
                        <a href="https://facebook.com" className="text-gray-400 hover:text-gray-300 mx-2" target="_blank" rel="noopener noreferrer">Facebook</a>
                        <a href="https://twitter.com" className="text-gray-400 hover:text-gray-300 mx-2" target="_blank" rel="noopener noreferrer">Twitter</a>
                        <a href="https://instagram.com" className="text-gray-400 hover:text-gray-300 mx-2" target="_blank" rel="noopener noreferrer">Instagram</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
