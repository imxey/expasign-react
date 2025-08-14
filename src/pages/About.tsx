import { usePageInteractions } from '../hooks/usePageInteractions';
import { useState, useEffect, useRef, type FC, type ReactNode } from "react";

interface ScrollFadeUpProps {
  children: ReactNode;
}

const ScrollFadeUp: FC<ScrollFadeUpProps> = ({ children }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
            setVisible(true);
            // Disconnect observer setelah visible, biar ga kerja terus
            if(ref.current) {
                observer.unobserve(ref.current);
            }
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`transform transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {children}
    </div>
  );
};

interface InfoCard {
  title: string;
  caption: string;
  photoUrl: string;
}

export default function About() {
  usePageInteractions({
    smoothScroll: true,
    parallaxSelector: ".absolute.inset-0",
    parallaxSpeed: 0.5,
    burgerId: "burger",
    navLinksId: "nav-links",
  });

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const infoCards: InfoCard[] = [
    {
      title: "Author 1",
      caption: "Aqsa Zamzami",
      photoUrl: "/aqsa.jpg",
    },
    {
      title: "Author 2",
      caption: "Xeyla Vithra Arfhina",
      photoUrl: "/xeyla.png",
    },
    {
      title: "Author 3",
      caption: "Ahmad Mukhlash Muhtady",
      photoUrl: "/anakin.jpg",
    },
  ];

  const handleCardClick = (index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <>
      <div
        className="flex min-h-screen flex-col items-center justify-start bg-gray-900 text-white pt-[30px]"
        style={{
          fontFamily: 'Orbitron',
          fontWeight: 400,
          background:
            'linear-gradient(90deg, rgba(30, 58, 138, 0.20) 0%, rgba(0, 0, 0, 0.50) 100%)',
        }}
      >
        <div className="relative z-10 w-11/12 max-w-7xl rounded-lg border border-gray-700 bg-gray-800 p-8 shadow-2xl md:p-12 text-justify">
          <h2 className="mb-8 text-center text-5xl font-bold text-blue-400 md:text-5xl">
            Tentang Expasign & Edutime
          </h2>

          <p className="mb-1 text-lg leading-relaxed text-gray-300">
            <span className="text-blue-400 font-semibold">Expasign</span> adalah
            <span className="text-purple-400"> kompetisi tingkat nasional</span> yang dirancang untuk
            menguji kreativitas, inovasi, dan kemampuan analisis peserta. Terdiri dari tiga cabang utama:
          </p>

          <details className="border rounded-lg">
            <summary className="cursor-pointer px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white">
              <strong className="text-blue-400">KTI (Karya Tulis Ilmiah)</strong>
            </summary>
            <ul className="list-none list-inside mb-1 space-y-2 text-gray-300 px-4 py-2">
              <li className="text-justify">
                Lomba penulisan ilmiah yang mengajak peserta untuk menyajikan solusi kreatif dan berbasis riset terhadap masalah nyata.
              </li>
            </ul>
          </details>

          <details className="border rounded-lg">
            <summary className="cursor-pointer px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white">
              <strong className="text-blue-400">Business Plan</strong>
            </summary>
            <ul className="list-none list-inside mb-1 space-y-2 text-gray-300 px-4 py-2">
              <li className="text-justify">
                Wadah bagi wirausahawan muda untuk mempresentasikan ide bisnis inovatif beserta strategi implementasinya.
              </li>
            </ul>
          </details>

          <details className="border rounded-lg">
            <summary className="cursor-pointer px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white">
              <strong className="text-blue-400">Infografis</strong>
            </summary>
            <ul className="list-none list-inside mb-1 space-y-2 text-gray-300 px-4 py-2">
              <li className="text-justify">
                Tantangan desain untuk menyampaikan informasi kompleks secara visual yang menarik dan mudah dipahami.
              </li>
            </ul>
          </details>

          <p className="mb-6 text-lg leading-relaxed text-gray-300">
            <span className="text-purple-400 font-semibold">Edutime</span> adalah puncak dari rangkaian acara —
            sebuah <span className="text-blue-400">seminar inspiratif</span> yang menghadirkan
            <strong> pembicara ternama</strong> dari berbagai bidang. Acara ini menjadi ajang berbagi ilmu,
            pengalaman, serta motivasi bagi para peserta dan audiens.
          </p>

          <p className="text-lg leading-relaxed text-gray-300">
            Gabungan <span className="text-blue-400">Expasign</span> dan <span className="text-purple-400">Edutime </span>
            menciptakan sinergi unik antara kompetisi dan edukasi — memberikan ruang bagi peserta untuk unjuk kemampuan,
            sekaligus belajar, berjejaring, dan berkembang di tingkat nasional.
          </p>
        </div>

        <hr className="w-10/12 border-t-2 border-gray-600 my-8" />

        <div className="relative z-10 w-11/12 max-w-7xl rounded-lg border border-gray-700 bg-gray-800 p-8 shadow-2xl md:p-12">
          <h2 className="mb-12 text-center text-4xl font-bold text-purple-400 md:text-5xl">
            Meet Our PO & VPO'S
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ScrollFadeUp>
              <div className="group relative overflow-hidden rounded-xl border border-gray-600 shadow-lg hover:shadow-pink-500/50 transition duration-300 hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end justify-center p-4">
                  <p className="text-lg font-semibold text-white">Vice Project Officer</p>
                </div>
                <img
                  src="/VPO1.JPG"
                  alt="VPO 1"
                  className="h-80 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end justify-center p-4">
                  <p className="text-lg font-semibold text-white">Vice Project Officer</p>
                </div>
              </div>
            </ScrollFadeUp>
            <ScrollFadeUp>
              <div className="group relative overflow-hidden rounded-xl border border-gray-600 shadow-lg hover:shadow-purple-500/50 transition duration-300 hover:scale-105">
                <img
                  src="/PO.JPG"
                  alt="PO"
                  className="h-80 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end justify-center p-4">
                  <p className="text-lg font-semibold text-white">Project Officer</p>
                </div>
              </div>
            </ScrollFadeUp>
            <ScrollFadeUp>
              <div className="group relative overflow-hidden rounded-xl border border-gray-600 shadow-lg hover:shadow-pink-500/50 transition duration-300 hover:scale-105">
                <img
                  src="/VPO2.JPG"
                  alt="VPO 2"
                  className="h-80 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end justify-center p-4">
                  <p className="text-lg font-semibold text-white">Vice Project Officer</p>
                </div>
              </div>
            </ScrollFadeUp>
          </div>
        </div>

        <hr className="w-10/12 border-t-2 border-gray-600 my-8" />
        
        <h2 className="mt-8 text-center text-4xl font-bold text-blue-400 md:text-5xl">
          Authors
        </h2>

        <div className="flex flex-col xl:flex-row justify-center items-stretch gap-4 w-full max-w-7xl px-4 xl:px-32 my-12">
          {infoCards.map(({ title, caption, photoUrl }, i) => {
            const isActive = activeIndex === i;

            return (
              <div
                key={i}
                onClick={() => handleCardClick(i)}
                className={`
                  cursor-pointer rounded-lg flex flex-col justify-start
                  px-6 py-8 overflow-hidden
                  text-black
                  lg:text-white
                  transition-all duration-500 ease-in-out
                  bg-${isActive ? 'gray-400' : 'black'}
                  ${isActive ? 'flex-grow' : 'flex-grow-0'}
                  `}
                style={{
                  width: isActive ? '350px' : '250px',
                  transition: 'width 0.5s ease-in-out',
                }}
              >
                <img
                  src={photoUrl}
                  alt={title}
                  className={`w-full object-cover rounded-xl mb-3 transition-all duration-300 ease-in-out ${
                    isActive ? "h-36 xl:h-44" : "h-24 xl:h-28"
                  }`}
                />
                <p
                  className={`font-azaret text-sm text-center sm:text-md xl:text-base
                      transition-all duration-400 ease-in-out overflow-hidden
                      ${isActive ? "max-h-96 opacity-100 mt-2 pr-5" : "max-h-0 opacity-0 mt-0 pr-0"}
                  `}
                >
                  {caption}
                </p>
              </div>
            );
          })}
        </div>
        <div className="w-full flex justify-between relative">
          <div className="flex gap-3 md:gap-8 items-center justify-center pt-4 md:pt-8">
            <div className="pl-4 text-2xl md:text-5xl text-purple-400 font-bebas">
              EXPATIME <br />
              <span className="text-blue-400">2025</span>
            </div>

            <div className="h-full w-[1px] bg-gray-600"></div>

            <div className="flex flex-col gap-1 md:gap-2 items-center justify-center">
              <p className="text-white/70 font-azeret text-xs md:text-base text-left">
                MARS Project <br />
                Politeknik Negeri Jakarta <br />
              </p>
              <div className="flex gap-1 md:gap-2 justify-start w-full">
                <a
                  href="https://www.instagram.com/marsproject_pnj/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer"
                >
                  <img
                    src="/images/instagram.svg"
                    alt="Instagram"
                    className="w-5 h-5 md:w-8 md:h-8"
                  />
                </a>
              </div>
            </div>
          </div>
          <div className="md:absolute block right-0 pr-4 ">
            <div className="w-32 h-32 rounded-full flex items-center justify-center overflow-hidden">
              <img
                src="logo.jpg"
                alt="logo"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center w-full font-azeret text-black/70">
          <p className="pb-2 text-xs text-white/70 md:text-base">
            Copyright @ 2025 ExpaTime. All Right Reserved
          </p>
        </div>
      </div>
    </>
  );
}