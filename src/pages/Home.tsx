import CompeHome from '../components/compe-home';
import { usePageInteractions } from '../hooks/usePageInteractions';
import { Link } from 'react-router-dom';

export default function Home() {
    usePageInteractions({
            smoothScroll: true,
            parallaxSelector: ".absolute.inset-0",
            parallaxSpeed: 0.5,
            burgerId: "burger",
            navLinksId: "nav-links",
        });
    
    const compData = [
        {
            name: 'KTI',
            detail: 'Ubah ide brilianmu menjadi karya tulis ilmiah yang membahas isu pendidikan, ekonomi, teknologi, atau lingkungan dengan solusi yang nyata dan berdampak.',
        },
        {
            name: 'Business Plan',
            detail: 'Rancang konsep bisnis inovatif, kreatif, dan realistis yang mampu menjawab tantangan masa depan sekaligus memberi manfaat luas bagi masyarakat.',
        },
        {
            name: 'Infografis',
            detail: 'Sajikan informasi, data, dan ide besar dalam bentuk desain visual yang memikat, kreatif, dan mudah dipahami semua orang.'
        }
    ];
    return (
        <>
            <div className="bg-gray-900 text-white" style={{ fontFamily: 'Orbitron, monospace', fontWeight: 400 }}>
                <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
                    <div
                        className="absolute inset-0"
                        style={{ background: 'linear-gradient(90deg, rgba(30, 58, 138, 0.20) 0%, rgba(0, 0, 0, 0.50) 100%)' }}
                    ></div>
                    <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
                        <h1 className="font-white mb-5 flex flex-col text-3xl md:text-6xl">
                            Expasign<span>x</span>
                            <span>Edutime</span> <span className="text-blue-400">2025</span>
                        </h1>

                        <p className="mx-auto mb-5 max-w-5xl text-xs leading-relaxed text-gray-300 md:text-xl">
                            Expasign dan Edutime adalah program unggulan dari UKM Mars Project PNJ yang bertujuan meningkatkan kreativitas, inovasi, dan
                            potensi mahasiswa. Expasign melibatkan lomba seperti LKTI, Esai, dan Desain Poster, sementara Edutime adalah seminar untuk
                            pengembangan keterampilan di bidang pendidikan dan bisnis. Tahun ini, kedua program ini digabungkan untuk mengoptimalkan
                            visi UKM Mars Project, menggabungkan aspek teoritis dan praktis, serta memberikan dampak yang lebih luas dalam
                            pengembangan diri, kreativitas, dan kolaborasi antar mahasiswa.
                        </p>
                        <Link to="/register">
                            <button className="mb-5 transform rounded-full bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-4 text-lg font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-blue-600 hover:to-purple-700 hover:shadow-xl">
                                Register Now
                            </button>
                        </Link>
                    </div>

                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 transform animate-bounce">
                        <div className="flex h-10 w-6 justify-center rounded-full border-2 border-white">
                            <div className="mt-2 h-3 w-1 animate-pulse rounded-full bg-white"></div>
                        </div>
                    </div>
                </section>
                <section className="bg-gray-800 px-6 py-20">
                    <div className="mx-auto max-w-7xl">
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                            <CompeHome {...compData[0]} />
                            <CompeHome {...compData[1]} />
                            <CompeHome {...compData[2]} />
                        </div>
                    </div>
                </section>
                <footer className="bg-gray-900 px-6 py-12">
                    <div className="mx-auto max-w-7xl text-center">
                        <div className="mb-8">
                            <h3 className="mb-4 text-3xl font-bold text-white">Expasign x Edutime 2025</h3>
                            <p className="mx-auto max-w-2xl text-gray-400">
                                Join us in the ultimate competition experience. Register now and be part of something extraordinary.
                            </p>
                        </div>

                        <div className="mb-8 flex justify-center space-x-6">
    <a href="https://www.instagram.com/expasign.pnj/" target='blank' className="text-gray-400 transition-colors duration-300 hover:text-cyan-400">
        <svg
            className="h-6 w-6"
            fill="currentColor"
            width="800px"
            height="800px"
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M20.445 5h-8.891A6.559 6.559 0 0 0 5 11.554v8.891A6.559 6.559 0 0 0 11.554 27h8.891a6.56 6.56 0 0 0 6.554-6.555v-8.891A6.557 6.557 0 0 0 20.445 5zm4.342 15.445a4.343 4.343 0 0 1-4.342 4.342h-8.891a4.341 4.341 0 0 1-4.341-4.342v-8.891a4.34 4.34 0 0 1 4.341-4.341h8.891a4.342 4.342 0 0 1 4.341 4.341l.001 8.891z" />
            <path d="M16 10.312c-3.138 0-5.688 2.551-5.688 5.688s2.551 5.688 5.688 5.688 5.688-2.551 5.688-5.688-2.55-5.688-5.688-5.688zm0 9.163a3.475 3.475 0 1 1-.001-6.95 3.475 3.475 0 0 1 .001 6.95zM21.7 8.991a1.363 1.363 0 1 1-1.364 1.364c0-.752.51-1.364 1.364-1.364z" />
        </svg>
    </a>
    <a href="mailto:expatimemp25@gmail.com" target='blank' className="text-gray-400 transition-colors duration-300 hover:text-cyan-400">
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.89 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
        </svg>
    </a>
    <a href="https://wa.me/6283899375997" target='blank' className="text-gray-400 transition-colors duration-300 hover:text-cyan-400">
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.570-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.89 3.488"/>
        </svg>
    </a>
    <a href="https://www.instagram.com/edutime_pnj/" target='blank' className="text-gray-400 transition-colors duration-300 hover:text-cyan-400">
        <svg
            className="h-6 w-6"
            fill="currentColor"
            width="800px"
            height="800px"
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M20.445 5h-8.891A6.559 6.559 0 0 0 5 11.554v8.891A6.559 6.559 0 0 0 11.554 27h8.891a6.56 6.56 0 0 0 6.554-6.555v-8.891A6.557 6.557 0 0 0 20.445 5zm4.342 15.445a4.343 4.343 0 0 1-4.342 4.342h-8.891a4.341 4.341 0 0 1-4.341-4.342v-8.891a4.34 4.34 0 0 1 4.341-4.341h8.891a4.342 4.342 0 0 1 4.341 4.341l.001 8.891z" />
            <path d="M16 10.312c-3.138 0-5.688 2.551-5.688 5.688s2.551 5.688 5.688 5.688 5.688-2.551 5.688-5.688-2.55-5.688-5.688-5.688zm0 9.163a3.475 3.475 0 1 1-.001-6.95 3.475 3.475 0 0 1 .001 6.95zM21.7 8.991a1.363 1.363 0 1 1-1.364 1.364c0-.752.51-1.364 1.364-1.364z" />
        </svg>
    </a>
</div>

                        <div className="border-t border-gray-700 pt-8">
                            <p className="text-gray-400">© {new Date().getFullYear()} Expasign x Edutime. All rights reserved.</p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
