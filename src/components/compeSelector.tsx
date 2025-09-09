import React from "react";

interface Competition {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  price: string;
  icon: string;
}
const price: string[] = [];
interface CompetitionSelectorProps {
  selectedCompe: string;
  setSelectedCompe: (id: string) => void;
}
const now = new Date();
const targetDate = new Date(now.getFullYear(), 7, 28, 23, 59, 59);
console.log("Current Date:", now);
console.log("Target Date:", targetDate);
if (now < targetDate) {
  price.push("Rp 55.000");
  price.push("Rp 55.000");
  price.push("Rp 20.000");
} else {
  price.push("Rp 65.000");
  price.push("Rp 65.000");
  price.push("Rp 25.000");
  price.push("Rp 80.000");
}
const CompetitionSelector: React.FC<CompetitionSelectorProps> = ({
  selectedCompe,
  setSelectedCompe,
}) => {
  const competitions: Competition[] = [
    {
      id: "lkti",
      title: "LKTI",
      subtitle: "Lomba Karya Tulis Ilmiah",
      description: "Kompetisi penulisan karya tulis ilmiah untuk mahasiswa.",
      price: price[0],
      icon: "📝",
    },
    {
      id: "business_plan",
      title: "Business Plan",
      subtitle: "Rencana Bisnis",
      description:
        "Kompetisi pembuatan rencana bisnis yang inovatif dan berkelanjutan untuk masa depan.",
      price: price[1],
      icon: "💼",
    },
    {
      id: "Infografis",
      title: "Infografis",
      subtitle: "Kompetisi Desain",
      description: "Kompetisi desain Infografis kreatif untuk mahasiswa.",
      price: price[2],
      icon: "🎨",
    },
    {
      id: "lktiInfog",
      title: "LKTI + Infografis",
      subtitle: "Bundling Lomba Karya Tulis Ilmiah dan Infografis",
      description:
        "Kompetisi penulisan karya tulis ilmiah dengan tambahan 1 peserta infografis. Dapatkan harga spesial untuk pendaftaran bundling ini.",
      price: price[3],
      icon: "📝",
    },
    {
      id: "business_planInfog",
      title: "Business Plan + Infografis",
      subtitle: "Bundling Rencana Bisnis dan Infografis",
      description:
        "Kompetisi pembuatan rencana bisnis dengan tambahan 1 peserta infografis. Dapatkan harga spesial untuk pendaftaran bundling ini.",
      price: price[3],
      icon: "💼",
    },
  ];

  return (
    <div className="mb-8">
      <h3 className="mb-6 text-center text-xl font-bold text-blue-400">
        Pilih Kategori Lomba
      </h3>
      <div
        className="flex flex-wrap justify-center gap-6 
                [>&>*]:basis-full 
                md:[&>*]:basis-1/4 md:[&>*]:max-w-1/4">
        {competitions.map((comp) => (
          <div
            key={comp.id}
            className={`cursor-pointer rounded-lg border-2 p-6 transition-all duration-300 hover:scale-105 ${
              selectedCompe === comp.id
                ? "border-blue-500 bg-blue-900/50 shadow-lg shadow-blue-500/25"
                : "border-gray-600 bg-gray-700/50 hover:border-gray-500"
            }`}
            onClick={() => setSelectedCompe(comp.id)}>
            <div className="mb-4 text-center text-4xl">{comp.icon}</div>
            <h4 className="mb-2 text-center text-lg font-bold text-white">
              {comp.title}
            </h4>
            <p className="mb-3 text-center text-sm text-blue-300">
              {comp.subtitle}
            </p>
            <p className="mb-4 text-center text-xs text-gray-300 leading-relaxed">
              {comp.description}
            </p>
            <div className="text-center">
              <span className="inline-block rounded-full bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2 text-sm font-bold text-white">
                {comp.price}
              </span>
            </div>
            {selectedCompe === comp.id && (
              <div className="mt-3 text-center">
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-green-400">
                  <svg
                    className="h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Terpilih
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompetitionSelector;
