import { Link } from 'react-router-dom';

export default function Navbar({ isMenuOpen, setIsMenuOpen }: { isMenuOpen: boolean; setIsMenuOpen: (isOpen: boolean) => void; }) {
    return (
        <nav className="sticky top-0 z-50 bg-gray-900 px-6 py-4 shadow-lg">
            <div className="mx-auto flex max-w-7xl items-center justify-between">
                <Link to="/" >
                    <h1 className="text-xl font-bold text-white">Expasign x Edutime</h1>
                </Link>

                <button id="burger" className="text-white focus:outline-none md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>

                <div className="hidden items-center space-x-8 md:flex">
                    <Link to="/about" className="text-gray-300 transition-colors duration-300 hover:text-white">
                        About
                    </Link>
                    <a href="#competition" className="text-gray-300 transition-colors duration-300 hover:text-white">
                        Competition
                    </a>
                    <Link to="/timeline" className="text-gray-300 transition-colors duration-300 hover:text-white">
                        Timeline
                    </Link>
                    <Link to="/edutime" className="text-gray-300 transition-colors duration-300 hover:text-white">
                        Edutime
                    </Link>
                    <Link to="/register">
                        <button
                            style={{ background: 'linear-gradient(90deg, #06B6D4 0%, #3B82F6 100%)' }}
                            className="transform rounded-full px-6 py-2 text-white transition-all duration-300 hover:scale-105 hover:cursor-pointer"
                        >
                            Register
                        </button>
                    </Link>
                </div>
            </div>

            <div id="nav-links" className={`mt-4 flex flex-col space-y-4 px-6 md:hidden ${isMenuOpen ? '' : 'hidden'}`}>
                <Link to="/about" onClick={() => setIsMenuOpen(false)} className="block text-gray-300 transition-colors duration-300 hover:text-white">
                    About
                </Link>
                <a href="#competition" onClick={() => setIsMenuOpen(false)} className="block text-gray-300 transition-colors duration-300 hover:text-white">
                    Competitions
                </a>
                <Link to="/timeline" onClick={() => setIsMenuOpen(false)} className="text-gray-300 transition-colors duration-300 hover:text-white">
                        Timeline
                    </Link>
                <Link to="/edutime" onClick={() => setIsMenuOpen(false)} className="block text-gray-300 transition-colors duration-300 hover:text-white">
                    Edutime
                </Link>
                <Link to="/register">
                    <button onClick={() => setIsMenuOpen(false)} className="w-full transform rounded-full bg-cyan-500 px-6 py-2 text-white transition-all duration-300 hover:scale-105 hover:bg-cyan-600">
                        Register
                    </button>
                </Link>
            </div>
        </nav>
    );
}