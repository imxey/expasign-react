import { usePageInteractions } from '../hooks/usePageInteractions';
import { Link } from 'react-router-dom';
import Footer from '../components/footer';
import { useState } from 'react';

export default function Home() {
  usePageInteractions({
    smoothScroll: true,
    parallaxSelector: ".absolute.inset-0",
    parallaxSpeed: 0.5,
    burgerId: "burger",
    navLinksId: "nav-links",
  });

  const [activeModal, setActiveModal] = useState<number | null>(null);

  const compData = [
    {
      name: "KTI",
      title: "KTI (Karya Tulis Ilmiah)",
      desc: "Lomba penulisan ilmiah untuk solusi kreatif berbasis riset.",
      detail: "Ubah ide brilianmu menjadi karya tulis ilmiah yang membahas isu pendidikan, ekonomi, teknologi, atau lingkungan dengan solusi yang nyata dan berdampak.",
      subtema: [
        "Transformasi Pendidikan Inklusif dan Berbasis Digital Menuju Generasi Emas 2045",
        "Kontribusi Mahasiswa dalam Meningkatkan Ekonomi Lokal melalui Literasi Keuangan dan Pemberdayaan UMKM",
        "Solusi Teknologi Berbasis Mahasiswa untuk Menjawab Tantangan Sosial dan Lingkungan Sekitar",
        "Kreativitas Mahasiswa dalam Mengembangkan Wirausaha Berbasis Potensi Lokal dan Ekonomi Digital",
        "Inovasi Hijau dan Partisipasi Generasi Muda dalam Menanggulangi Krisis Iklim dan Degradasi Lingkungan"
      ],
      guidebook: "#",
      register: "/register?competition=lkti"
    },
    {
      name: "Business Plan",
      title: "Business Plan",
      desc: "Wadah bagi wirausahawan muda mempresentasikan ide bisnis inovatif.",
      detail: "Rancang konsep bisnis inovatif, kreatif, dan realistis yang mampu menjawab tantangan masa depan sekaligus memberi manfaat luas bagi masyarakat.",
      subtema: [
        "Inovasi Bisnis Edukasi untuk Meningkatkan Akses dan Kualitas Pembelajaran bagi Generasi Muda",
        "Bisnis Mahasiswa sebagai Motor Penggerak Ekonomi Lokal dan Pemberdayaan UMKM",
        "Startup Teknologi Mahasiswa: Solusi Inovatif untuk Kebutuhan Masyarakat Modern",
        "Optimalisasi Industri Kreatif Mahasiswa melalui Produk dan Jasa yang Bernilai Ekonomi dan Estetika Tinggi",
        "Green Business: Inovasi Mahasiswa dalam Menciptakan Usaha Berbasis Keberlanjutan dan Eco-Friendly"
      ],
      guidebook: "#",
      register: "/register?competition=business_plan"
    },
    {
      name: "Infografis",
      title: "Infografis",
      desc: "Tantangan desain menyampaikan informasi kompleks secara visual.",
      detail: "Sajikan informasi, data, dan ide besar dalam bentuk desain visual yang memikat, kreatif, dan mudah dipahami semua orang.",
      subtema: [
        "Peta Transformasi Pendidikan Indonesia: Tantangan dan Inovasi dari Perspektif Mahasiswa",
        "Peran Mahasiswa dalam Mendorong Ekonomi Inklusif dan Digitalisasi UMKM",
        "Inovasi Teknologi Terkini dan Dampaknya terhadap Gaya Hidup Generasi Muda",
        "Tren Bisnis Kreatif Mahasiswa: Dari Ide Unik Menjadi Solusi Ekonomi Masa Kini",
        "Krisis Iklim dan Aksi Nyata Mahasiswa untuk Bumi yang Lebih Hijau"
      ],
      guidebook: "#",
      register: "/register?competition=Infografis"
    }
  ];

  return (
    <div className="bg-gray-900 text-white" style={{ fontFamily: 'Orbitron, monospace', fontWeight: 400 }}>
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(90deg, rgba(30, 58, 138, 0.20) 0%, rgba(0, 0, 0, 0.50) 100%)' }}
        ></div>
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <h1 className="font-white mb-5 flex flex-col text-3xl md:text-6xl" style={{ fontFamily: 'Orbitron, monospace', fontWeight: 400 }}>
            Expasign<span>x</span>
            <span>Edutime</span> <span className="text-blue-400" style={{ fontFamily: 'Orbitron, monospace', fontWeight: 500 }}>2025</span>
          </h1>
          <p className="mx-auto mb-5 max-w-5xl text-xs leading-relaxed text-gray-300 md:text-xl">
            Expasign dan Edutime adalah program unggulan dari UKM Mars Project PNJ yang bertujuan meningkatkan kreativitas, inovasi, dan potensi mahasiswa...
          </p>
          <Link to="/register">
            <button className="mb-5 transform rounded-full bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-4 text-lg font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-blue-600 hover:to-purple-700 hover:shadow-xl">
              Register Now
            </button>
          </Link>
        </div>
      </section>
      <section className="bg-gray-800 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {compData.map((comp, index) => (
              <div key={index} className="relative w-full h-90 rounded-xl overflow-hidden shadow-lg bg-gray-900 flex flex-col justify-between border border-gray-700 p-6">
                <h1 className="text-2xl font-bold text-blue-400">{comp.title}</h1>
                <p className="mt-2 text-gray-300">{comp.desc}</p>
                <p className="mt-2 text-gray-400">{comp.detail}</p>
                <button
                  onClick={() => setActiveModal(index)}
                  type="button"
                  className="relative group cursor-pointer rounded-md border-2 border-purple-600 w-full py-2 text-center bg-purple-600 text-white text-lg overflow-hidden mt-4"
                >
                  <span
                    className="absolute top-0 -left-10 h-full w-0 bg-white transition-all duration-700 ease-in-out group-hover:w-[60vw] group-hover:h-[50vh]"
                    style={{ clipPath: "polygon(0px 0px, 100% 0px, 50% 100%, 0% 100%)" }}
                  ></span>
                  <span className="relative z-10 group-hover:text-purple-600 transition-colors duration-700 ease-in-out capitalize">
                    See Details
                  </span>
                </button>
              </div>
            ))}
          </div>
        </div>
        {activeModal !== null && (
          <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
            <div className="bg-gray-800 text-white rounded-lg p-6 max-w-lg w-full relative border border-gray-700 shadow-xl animate-fade-up">
              <button onClick={() => setActiveModal(null)} className="absolute top-2 right-2 text-gray-400 hover:text-white">✕</button>
              <h2 className="text-2xl font-bold mb-4 text-blue-400">{compData[activeModal].title}</h2>
              <p className="text-gray-300 mb-4">{compData[activeModal].detail}</p>

              <ul className="list-disc pl-5 space-y-2 text-gray-300 mb-4">
                {compData[activeModal].subtema.map((sub, i) => (
                  <li key={i}>{sub}</li>
                ))}
              </ul>

              <div className="flex gap-4 mb-4"> 
                <a href={compData[activeModal].guidebook} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Guidebook</a>
                <a href={compData[activeModal].register} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Register</a>
              </div>
            </div>
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
}
