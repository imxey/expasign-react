import React from 'react';

interface TimelineItemData {
  title: string;
  date: string;
}

interface TimelineItemProps {
  item: TimelineItemData;
  index: number;
}

const Timeline = () => {
  const timelineData: TimelineItemData[] = [
    { title: "Pendaftaran Gelombang 1", date: "18-28 Agustus 2025" },
    { title: "Pendaftaran Gelombang 2", date: "29 Agustus - 5 September 2025" },
    { title: "Technical Meeting", date: "6 September 2025" },
    { title: "Pengumpulan Karya", date: "7-12 September 2025" },
    { title: "Pengumuman Babak Final", date: "16 September 2025" },
    { title: "Pengumpulan Power Point (LKTI & LBP)", date: "17-19 September 2025" },
    { title: "Presentasi Finalis LKTI & LBP", date: "20 September 2025" },
    { title: "Pengumuman Pemenang", date: "23 September 2025" },
    { title: "Awarding Pemenang", date: "23 September 2025" },
  ];

  const TimelineItem: React.FC<TimelineItemProps> = ({ item }) => (
    <div className="flex-shrink-0 flex flex-col items-center gap-3 w-40 sm:w-48 md:w-56 lg:w-64">
      <div className="relative group">
        <div className="
          w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36
          bg-gray-800 
          rounded-full 
          border-2 sm:border-3 md:border-4 
          border-blue-400 
          flex items-center justify-center
          transition-all duration-300
          hover:border-blue-300 hover:bg-gray-700
          group-hover:scale-105
        ">
          <div className="absolute inset-0 rounded-full bg-blue-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          <h3 className="
            text-xs sm:text-sm md:text-base
            font-medium 
            text-gray-200 
            text-center 
            px-2 sm:px-3 md:px-4
            leading-tight
            z-10 relative
            line-clamp-3
          ">
            {item.title}
          </h3>
        </div>
      </div>

      <div className="w-full px-2">
        <div className="
          w-full
          h-8 sm:h-9 md:h-10
          relative 
          p-0.5 
          rounded-full 
          bg-gradient-to-r from-blue-500 to-purple-500
          hover:from-blue-400 hover:to-purple-400
          transition-all duration-300
        ">
          <div className="
            bg-gray-900 
            rounded-full 
            w-full h-full 
            flex items-center justify-center 
            px-2 sm:px-3
          ">
            <span className="
              text-xs sm:text-sm 
              font-semibold 
              text-white 
              text-center 
              leading-tight
              truncate
            ">
              {item.date}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section className="w-full bg-gray-900 text-white py-12 sm:py-16 md:py-20">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="
            text-2xl sm:text-3xl md:text-4xl lg:text-5xl 
            font-bold 
            text-blue-400
            mb-2
          ">
            Timeline
          </h2>
        </div>

        <div className="w-full overflow-hidden">
          <div className="
            relative
            bg-gray-800 
            p-4 sm:p-6 md:p-8
            overflow-x-auto
            [&::-webkit-scrollbar]:h-2
            [&::-webkit-scrollbar-track]:bg-gray-700
            [&::-webkit-scrollbar-track]:rounded-full
            [&::-webkit-scrollbar-thumb]:bg-blue-500
            [&::-webkit-scrollbar-thumb]:rounded-full
            [&::-webkit-scrollbar-thumb:hover]:bg-blue-400
          ">
            
            <div className="flex items-center gap-4 sm:gap-6 md:gap-8 pb-2">
              {timelineData.map((item, index) => (
                <React.Fragment key={index}>
                  <TimelineItem item={item} index={index} />
                  {index < timelineData.length - 1 && (
                    <div className="flex-shrink-0 w-4 sm:w-6 md:w-8 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 opacity-60"></div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center mt-4 sm:hidden">
          <p className="text-xs text-gray-400">Swipe left to see more events</p>
        </div>
      </div>
    </section>
  );
};

export default Timeline;