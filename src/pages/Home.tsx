import CompeHome from '../components/compe-home';
import { usePageInteractions } from '../hooks/usePageInteractions';
import { Link } from 'react-router-dom';
import Footer from '../components/footer';

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
				<Footer />
			</div>
		</>
	);
}
