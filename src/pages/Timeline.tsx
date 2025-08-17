import React from 'react';
import Footer from '../components/footer';

interface TimelineItemData {
  title: string;
  date: string;
  description?: string;
}

interface TimelineItemProps {
  item: TimelineItemData;
  index: number;
  isLast: boolean;
}

export default function Timeline() {
  const timelineData: TimelineItemData[] = [
    { 
      title: "Pendaftaran Gelombang 1", 
      date: "18 - 28 Agustus 2025",
      description: "Periode pendaftaran pertama untuk semua kategori lomba"
    },
    { 
      title: "Pendaftaran Gelombang 2", 
      date: "29 Agustus  -  5 September 2025",
      description: "Periode pendaftaran terakhir dengan kuota terbatas"
    },
    { 
      title: "Technical Meeting", 
      date: "6 September 2025",
      description: "Penjelasan teknis dan tanya jawab seputar kompetisi"
    },
    { 
      title: "Pengumpulan Karya", 
      date: "7 - 12 September 2025",
      description: "Deadline pengumpulan semua karya peserta"
    },
    { 
      title: "Pengumuman Babak Final", 
      date: "16 September 2025",
      description: "Pengumuman peserta yang lolos ke babak final"
    },
    { 
      title: "Pengumpulan Power Point (LKTI & LBP)", 
      date: "17 - 19 September 2025",
      description: "Pengumpulan presentasi untuk kategori LKTI dan LBP"
    },
    { 
      title: "Presentasi Finalis LKTI & LBP", 
      date: "20 September 2025",
      description: "Sesi presentasi final untuk kategori LKTI dan LBP"
    },
    { 
      title: "Pengumuman Pemenang", 
      date: "23 September 2025",
      description: "Pengumuman resmi pemenang semua kategori"
    },
    { 
      title: "Awarding Pemenang dan Edutime", 
      date: "27 September 2025",
      description: "Acara penyerahan hadiah dan sertifikat pada puncak acara dengan seminar"
    },
  ];

  const TimelineItem: React.FC<TimelineItemProps> = ({ item, index, isLast }) => {
    const isEven = index % 2 === 0;
    
    return (
      <div className="relative flex items-center w-full">
        {/* Timeline Line */}
        {!isLast && (
          <div className="absolute left-6 md:left-1/2 top-16 md:top-20 w-0.5 h-16 md:h-20 bg-gradient-to-b from-blue-400 to-purple-500 transform md:-translate-x-0.5 z-0"></div>
        )}
        
        {/* Mobile Layout */}
        <div className="flex w-full md:hidden">
          {/* Circle */}
          <div className="flex-shrink-0 w-12 h-12 bg-gray-800 border-3 border-blue-400 rounded-full flex items-center justify-center relative z-10">
            <div className="w-4 h-4 bg-blue-400 rounded-full animate-pulse"></div>
          </div>
          
          {/* Content */}
          <div className="ml-6 pb-8 flex-1">
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 hover:border-blue-400 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20">
              <div className="flex flex-col gap-2">
                <span className="text-xs font-semibold text-blue-400 uppercase tracking-wide">{item.date}</span>
                <h3 className="text-base font-bold text-white leading-tight">{item.title}</h3>
                {item.description && (
                  <p className="text-sm text-gray-300 leading-relaxed">{item.description}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:flex w-full items-center">
          {isEven ? (
            <>
              {/* Left Content */}
              <div className="w-1/2 pr-8 text-right">
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-blue-400 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 transform hover:scale-105">
                  <span className="text-sm font-semibold text-blue-400 uppercase tracking-wide block mb-2">{item.date}</span>
                  <h3 className="text-xl font-bold text-white mb-3 leading-tight">{item.title}</h3>
                  {item.description && (
                    <p className="text-gray-300 leading-relaxed">{item.description}</p>
                  )}
                </div>
              </div>
              
              {/* Center Circle */}
              <div className="flex-shrink-0 w-16 h-16 bg-gray-800 border-4 border-blue-400 rounded-full flex items-center justify-center relative z-10 shadow-lg shadow-blue-500/30">
                <div className="w-6 h-6 bg-blue-400 rounded-full animate-pulse"></div>
              </div>
              
              {/* Right Spacer */}
              <div className="w-1/2 pl-8"></div>
            </>
          ) : (
            <>
              {/* Left Spacer */}
              <div className="w-1/2 pr-8"></div>
              
              {/* Center Circle */}
              <div className="flex-shrink-0 w-16 h-16 bg-gray-800 border-4 border-purple-400 rounded-full flex items-center justify-center relative z-10 shadow-lg shadow-purple-500/30">
                <div className="w-6 h-6 bg-purple-400 rounded-full animate-pulse"></div>
              </div>
              
              {/* Right Content */}
              <div className="w-1/2 pl-8">
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-purple-400 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 transform hover:scale-105">
                  <span className="text-sm font-semibold text-purple-400 uppercase tracking-wide block mb-2">{item.date}</span>
                  <h3 className="text-xl font-bold text-white mb-3 leading-tight">{item.title}</h3>
                  {item.description && (
                    <p className="text-gray-300 leading-relaxed">{item.description}</p>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <div 
      className="min-h-screen bg-gray-900 text-white"
    >
      {/* Hero Section */}
      <div className="relative overflow-hidden ">
        {/* <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%234F46E5" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div> */}
        
        <div className="relative container mx-auto px-4 py-4 md:py-6">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
              Timeline
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="container mx-auto px-4 py-4 md:py-6">
        <div className="max-w-6xl mx-auto">
          <div className="space-y-8 md:space-y-12">
            {timelineData.map((item, index) => (
              <TimelineItem 
                key={index} 
                item={item} 
                index={index} 
                isLast={index === timelineData.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}