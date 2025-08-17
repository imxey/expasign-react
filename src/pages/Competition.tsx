import Footer from '../components/footer';
import { useState } from 'react';

export default function Home() {
  const [activeModal, setActiveModal] = useState<number | null>(null);

  const compData = [
    {
      title: "KTI (Karya Tulis Ilmiah)",
      desc: "Lomba penulisan ilmiah untuk solusi kreatif berbasis riset.",
      subtema: [
        "Transformasi Pendidikan Inklusif dan Berbasis Digital Menuju Generasi Emas 2045",
        "Kontribusi Mahasiswa dalam Meningkatkan Ekonomi Lokal melalui Literasi Keuangan dan Pemberdayaan UMKM",
        "Solusi Teknologi Berbasis Mahasiswa untuk Menjawab Tantangan Sosial dan Lingkungan Sekitar",
        "Kreativitas Mahasiswa dalam Mengembangkan Wirausaha Berbasis Potensi Lokal dan Ekonomi Digital",
        "Inovasi Hijau dan Partisipasi Generasi Muda dalam Menanggulangi Krisis Iklim dan Degradasi Lingkungan"
      ],
      guidebook: "#",
      register: "#"
    },
    {
      title: "Business Plan",
      desc: "Wadah bagi wirausahawan muda mempresentasikan ide bisnis inovatif.",
      subtema: [
        "Inovasi Bisnis Edukasi untuk Meningkatkan Akses dan Kualitas Pembelajaran bagi Generasi Muda",
        "Bisnis Mahasiswa sebagai Motor Penggerak Ekonomi Lokal dan Pemberdayaan UMKM",
        "Startup Teknologi Mahasiswa: Solusi Inovatif untuk Kebutuhan Masyarakat Modern",
        "Optimalisasi Industri Kreatif Mahasiswa melalui Produk dan Jasa yang Bernilai Ekonomi dan Estetika Tinggi",
        "Green Business: Inovasi Mahasiswa dalam Menciptakan Usaha Berbasis Keberlanjutan dan Eco-Friendly"
      ],
      guidebook: "#",
      register: "#"
    },
    {
      title: "Infografis",
      desc: "Tantangan desain menyampaikan informasi kompleks secara visual.",
      subtema: [
        "Peta Transformasi Pendidikan Indonesia: Tantangan dan Inovasi dari Perspektif Mahasiswa",
        "Peran Mahasiswa dalam Mendorong Ekonomi Inklusif dan Digitalisasi UMKM",
        "Inovasi Teknologi Terkini dan Dampaknya terhadap Gaya Hidup Generasi Muda",
        "Tren Bisnis Kreatif Mahasiswa: Dari Ide Unik Menjadi Solusi Ekonomi Masa Kini",
        "Krisis Iklim dan Aksi Nyata Mahasiswa untuk Bumi yang Lebih Hijau"
      ],
      guidebook: "#",
      register: "#"
    }
  ];

  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-start !bg-gray-900 text-white pt-[30px]" style={{ fontFamily: 'Orbitron', fontWeight: 400 }}>
        <div className="relative z-10 w-11/12 max-w-7xl rounded-lg border border-gray-700 bg-gray-800 p-8 shadow-2xl md:p-12">
          <h2 className="mb-8 text-center text-5xl font-bold text-blue-400 md:text-5xl">Expasign 2025</h2>
          <p className="mb-10 text-lg leading-relaxed text-gray-300 text-center">
            <span className="text-blue-400 font-semibold">Kompetisi Expasign</span> terdiri dari
            <span className="text-purple-400"> 3 kategori:</span> Karya Tulis Ilmiah (KTI), Business Plan, Infografis.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {compData.map((item, idx) => (
              <div key={idx} className="relative w-full h-80 rounded-xl overflow-hidden shadow-lg bg-gray-900 flex flex-col justify-between border border-gray-700">
                <div className="p-6">
                  <h1 className="text-2xl font-bold text-blue-400">{item.title}</h1>
                  <p className="mt-3 text-gray-300">{item.desc}</p>
                </div>

                <button
                  onClick={() => setActiveModal(idx)}
                  className="relative group cursor-pointer rounded-md border-2 border-red-500 w-full py-2 text-center bg-red-500 text-white text-lg overflow-hidden"
                >
                  <span
                    className="absolute top-0 -left-10 h-full w-0 bg-white transition-all duration-700 ease-in-out group-hover:w-[60vw] group-hover:h-[50vh]"
                    style={{ clipPath: "polygon(0px 0px, 100% 0px, 50% 100%, 0% 100%)" }}
                  ></span>
                  <span className="relative z-10 group-hover:text-red-500 transition-colors duration-700 ease-in-out capitalize">
                    See Detail
                  </span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {activeModal !== null && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-gray-800 text-white rounded-lg p-6 max-w-lg w-full relative border border-gray-700 shadow-xl">
            <button onClick={() => setActiveModal(null)} className="absolute top-2 right-2 text-gray-400 hover:text-white">✕</button>
            <h2 className="text-2xl font-bold mb-4 text-blue-400">{compData[activeModal].title}</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-300 mb-6">
              {compData[activeModal].subtema.map((sub, i) => (
                <li key={i}>{sub}</li>
              ))}
            </ul>
            <div className="flex gap-4">
              <a href={compData[activeModal].guidebook} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Guidebook</a>
              <a href={compData[activeModal].register} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Register</a>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
