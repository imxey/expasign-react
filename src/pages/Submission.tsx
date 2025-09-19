// import { useState } from "react";
import type { FC } from "react";
import { motion } from "framer-motion";


// interface FormDataState {
//   name: string;
//   email: string;
//   fileKTM: File | undefined;
//   fileKarya: File | undefined;
//   fileSumberData: File | undefined;
// }

// interface SuccessResponse {
//   status: "success";
//   message: string;
// }

// interface ErrorResponse {
//   message?: string | string[];
//   errors?: string[];
// }

const Submission: FC = () => {
  // const [category, setCategory] = useState<string>("");

  // const [formData, setFormData] = useState<FormDataState>({
  //   name: "",
  //   email: "",
  //   fileKTM: undefined,
  //   fileKarya: undefined,
  //   fileSumberData: undefined,
  // });
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [error, setError] = useState<string[]>([]);
  // const [success, setSuccess] = useState<string>("");

  // const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
  //   e.preventDefault();

  //   const newErrors: string[] = [];
  //   if (!formData.name) newErrors.push("Nama tim harus diisi!");
  //   if (!formData.email) newErrors.push("Email ketua tim tidak boleh kosong!");
  //   if (!formData.fileKTM) newErrors.push("File KTM belum diupload!");
  //   if (!formData.fileKarya) newErrors.push("File karya belum diupload!");
  //   if (category === "infografis" && !formData.fileSumberData) {
  //     newErrors.push("File sumber data untuk infografis belum diupload!");
  //   }

  //   if (newErrors.length > 0) {
  //     setError(newErrors);
  //     return;
  //   }
  //   setIsLoading(true);
  //   setError([]);
  //   setSuccess("");

  //   const formDataSend = new FormData();
  //   formDataSend.append("category", category);
  //   formDataSend.append("name", formData.name);
  //   formDataSend.append("email", formData.email);
  //   if (formData.fileKTM) {
  //     formDataSend.append("ktm", formData.fileKTM);
  //   }
  //   if (formData.fileKarya) {
  //     formDataSend.append("file", formData.fileKarya);
  //   }
  //   if (formData.fileSumberData) {
  //     formDataSend.append("sumber_data", formData.fileSumberData);
  //   }

  //   try {
  //     const response = await fetch(
  //       "https://admin.expasign-edutime.site/api/submission/handle",

  //       {
  //         method: "POST",
  //         headers: {
  //           "X-Requested-With": "XMLHttpRequest",
  //         },
  //         body: formDataSend,
  //       }
  //     );

  //     if (!response.ok) {
  //       const errorData: ErrorResponse = await response.json();
  //       console.error("Error response:", errorData);
  //       setError(errorData.errors || ["Terjadi kesalahan saat mengirim data."]);
  //     } else {
  //       const data: SuccessResponse | ErrorResponse = await response.json();
  //       console.log("Response Data:", data);

  //       if ("status" in data && data.status === "success") {
  //         setSuccess(data.message);
  //       } else {
  //         const errorMessage =
  //           data.message || "Terjadi kesalahan saat memproses pendaftaran.";
  //         setError(Array.isArray(errorMessage) ? errorMessage : [errorMessage]);
  //       }
  //     }
  //   } catch (err) {
  //     console.error("Network error:", err);
  //     setError(["Terjadi kesalahan jaringan. Silakan coba lagi."]);
  //   }
  //   setIsLoading(false);
  // };

  // const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setFormData({ ...formData, [name]: value });
  // };

  // const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   const { name, files } = e.target;
  //   if (files && files.length > 0) {
  //     setFormData((prev) => ({ ...prev, [name]: files[0] }));
  //   }
  // };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-[#0a0a1a] to-[#141432] text-center">
      <div className="space-y-4">
        <motion.h1
          className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}>
          Submission Telah Ditutup
        </motion.h1>
        <motion.h2
          className="text-xl md:text-2xl text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}>
          Terima Kasih Atas Partisipasi Kalian ☺️☺️
        </motion.h2>
        <motion.p
          className="text-lg md:text-xl font-medium text-blue-400"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            delay: 1,
            duration: 0.8,
            type: "spring",
            stiffness: 120,
          }}>
          Sampai Jumpa di Expasign 2026 🚀
        </motion.p>
      </div>
    </div>
  );
};

export default Submission;
