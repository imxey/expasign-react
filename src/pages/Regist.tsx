import React, { useEffect, useState } from "react";
import CompetitionSelector from "../components/compeSelector";
import { useLocation } from "react-router-dom";
interface Member {
  id: number;
  name: string;
  nim: string;
  email: string;
  phone: string;
  school: string;
  igLink: string;
  followExpa: File | null;
  followEdu: File | null;
  followMp: File | null;
  repostSg: File | null;
}

interface TeamData {
  isBundling: boolean;
  team_name: string;
  category: string;
  payment_method: string;
  isEdu: boolean;
  receipt: File | null;
}
const translateErrorMessage = (message: string, field: string): string => {
  const fieldNames: { [key: string]: string } = {
    team_name: "Nama Tim",
    receipt: "Bukti pembayaran",
    name: "Nama Lengkap",
    nim: "NIM",
    email: "Email",
    phone: "No. Telepon",
    school: "Asal Sekolah/Universitas",
    igLink: "Link Profil Instagram",
    followExpa: "Bukti follow @expasign",
    followEdu: "Bukti follow @edutime",
    followMp: "Bukti follow @marsproject",
    repostSg: "Bukti repost story",
  };

  const readableField = Object.keys(fieldNames).find((key) =>
    field.includes(key)
  );
  let finalFieldName = readableField ? fieldNames[readableField] : "Isian";

  if (field.startsWith("members.")) {
    const memberIndex = parseInt(field.split(".")[1]) + 1;
    finalFieldName = `${finalFieldName} Anggota ${memberIndex}`;
  }

  if (message.includes("is required")) return `${finalFieldName} harus diisi.`;
  if (message.includes("has already been taken"))
    return `${finalFieldName} sudah terdaftar.`;
  if (message.includes("must be a valid URL"))
    return `${finalFieldName} harus berupa link yang valid.`;
  if (message.includes("must be a string"))
    return `${finalFieldName} harus berupa teks.`;
  if (message.includes("must be a number"))
    return `${finalFieldName} harus berupa angka.`;
  if (message.includes("must be an email"))
    return `${finalFieldName} harus berupa email yang valid.`;
  if (message.includes("must be a file"))
    return `${finalFieldName} harus berupa file.`;
  if (message.includes("failed to upload"))
    return `Gagal mengupload ${finalFieldName}.`;

  return message;
};

export default function Regist() {
  const location = useLocation();
  const [qris, setQris] = useState<boolean>();

  const [teamData, setTeamData] = useState<TeamData>({
    isBundling: false,
    team_name: "",
    category: "",
    payment_method: "auto",
    isEdu: false,
    receipt: null,
  });
  const [members, setMembers] = useState<Member[]>([
    {
      id: 1,
      name: "",
      nim: "",
      email: "",
      phone: "",
      school: "",
      igLink: "",
      followExpa: null,
      followEdu: null,
      followMp: null,
      repostSg: null,
    },
  ]);

  const [selectedCompe, setSelectedCompe] = useState<string>("");
  const [errors, setErrors] = useState<any>({});
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const compeFromUrl = searchParams.get("competition");
    if (compeFromUrl) {
      setSelectedCompe(compeFromUrl);
      setTeamData((prev) => ({ ...prev, category: compeFromUrl }));
    }
  }, [location.search]);

  useEffect(() => {
    if (selectedCompe) {
      if (selectedCompe === "lktiInfog") {
        setTeamData((prev) => ({
          ...prev,
          category: "lkti",
          isBundling: true,
        }));
      } else if (selectedCompe === "business_planInfog") {
        setTeamData((prev) => ({
          ...prev,
          category: "business_plan",
          isBundling: true,
        }));
      } else {
        setTeamData((prev) => ({
          ...prev,
          category: selectedCompe,
          isBundling: false,
        }));
      }
    }
  }, [selectedCompe]);

  const handleTeamChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    const files = (e.target as HTMLInputElement).files;

    setTeamData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : type === "file"
          ? files
            ? files[0]
            : null
          : value,
    }));
  };

  const handleMemberChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value, type } = e.target;
    const files = e.target.files;

    const updatedMembers = [...members];
    const memberToUpdate = { ...updatedMembers[index] };

    if (type === "file" && files) {
      (memberToUpdate as any)[name] = files[0];
    } else {
      (memberToUpdate as any)[name] = value;
    }

    updatedMembers[index] = memberToUpdate;
    setMembers(updatedMembers);
  };

  const addMember = () => {
    if (members.length < 4) {
      setMembers((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          name: "",
          nim: "",
          email: "",
          phone: "",
          school: "",
          igLink: "",
          followExpa: null,
          followEdu: null,
          followMp: null,
          repostSg: null,
        },
      ]);
    }
  };

  const removeMember = (id: number) => {
    setMembers((prev) => prev.filter((member) => member.id !== id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});
    setSuccessMessage("");
    if (
      selectedCompe === "lktiInfog" ||
      selectedCompe === "business_planInfog"
    ) {
      if (members.length < 4) {
        setErrors({ general: "Tim harus terdiri dari 4 anggota." });
        document
          .getElementById("title")
          ?.scrollIntoView({ behavior: "smooth" });
        setIsLoading(false);
        return;
      }
    } else {
      if (members.length < 3) {
        if (
          teamData.category === "lkti" ||
          teamData.category === "business_plan"
        ) {
          setErrors({ general: "Tim harus terdiri dari 3 anggota." });
          document
            .getElementById("title")
            ?.scrollIntoView({ behavior: "smooth" });
          setIsLoading(false);
          return;
        }
      }
    }
    const data = new FormData();

    if (teamData.category === "Infografis") {
      data.append("team_name", members[0].name);
    } else {
      data.append("team_name", teamData.team_name);
    }
    data.append("category", teamData.category);
    data.append("payment_method", teamData.payment_method);
    data.append("isEdu", teamData.isEdu ? "1" : "0");
    if (teamData.payment_method === "transfer" && teamData.receipt) {
      data.append("receipt", teamData.receipt);
    }
    data.append("isBundling", teamData.isBundling ? "1" : "0");

    members.forEach((member, index) => {
      Object.entries(member).forEach(([key, value]) => {
        if (key !== "id" && value !== null) {
          data.append(`members[${index}][${key}]`, value as string | Blob);
        }
      });
    });

    try {
      const response = await fetch(
        "http://admin.expasign-edutime.site/api/team-regist/handle",
        // "http://127.0.0.1:8000/api/team-regist/handle",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "X-Requested-With": "XMLHttpRequest",
          },
          body: data,
        }
      );

      const result = await response.json();

      console.log("Server Response:", result);

      if (!response.ok) {
        if (result.message && typeof result.message === "object") {
          setErrors(result.message);
        } else {
          setErrors({ general: result.message || "Terjadi kesalahan." });
        }
        document
          .getElementById("title")
          ?.scrollIntoView({ behavior: "smooth" });
      } else {
        setSuccessMessage(result.success);
        document
          .getElementById("title")
          ?.scrollIntoView({ behavior: "smooth" });

        if (result.redirect) {
          setTimeout(() => {
            window.location.href = result.redirect;
          }, 1500);
        }
      }
    } catch (error) {
      console.error("Submit error:", error);
      setErrors({ general: "Gagal terhubung ke server. Coba lagi nanti ya." });
      document.getElementById("title")?.scrollIntoView({ behavior: "smooth" });
    } finally {
      setIsLoading(false);
    }
  };

  const getError = (field: string) => {
    if (errors && errors[field] && Array.isArray(errors[field])) {
      const translatedMessage = translateErrorMessage(errors[field][0], field);
      return <p className="mt-1 text-xs text-red-400">{translatedMessage}</p>;
    }
    return null;
  };

  return (
    <>
      <div
        id="title"
        className="flex min-h-screen items-center justify-center bg-gray-900 py-12 text-white"
        style={{ fontFamily: "'Orbitron', monospace" }}>
        <div className="relative z-10 w-11/12 max-w-4xl rounded-lg border border-gray-700 bg-gray-800 p-8 shadow-2xl md:p-12">
          <h2 className="mb-8 text-center text-3xl font-bold text-blue-400 md:text-4xl">
            Pendaftaran Tim Expasign 2025
          </h2>

          {successMessage && (
            <div className="mb-6 rounded-lg bg-green-500 px-4 py-3 text-center text-white">
              {successMessage}
            </div>
          )}
          {errors.general && (
            <div className="mb-6 rounded-lg bg-red-500 px-4 py-3 text-center text-white">
              {errors.general}
            </div>
          )}

          {!selectedCompe ? (
            <CompetitionSelector
              selectedCompe={selectedCompe}
              setSelectedCompe={setSelectedCompe}
            />
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              {teamData.category !== "Infografis" && (
                <div className="mb-8 rounded-lg border border-blue-400/50 p-6">
                  <h3 className="mb-4 text-xl font-bold text-blue-300">
                    Data Tim
                  </h3>
                  <div>
                    <label
                      htmlFor="team_name"
                      className="mb-2 block text-sm font-bold text-gray-300">
                      Nama Tim
                    </label>
                    <input
                      type="text"
                      name="team_name"
                      id="team_name"
                      value={
                        teamData.category !== "Infografis"
                          ? teamData.team_name
                          : "-"
                      }
                      onChange={handleTeamChange}
                      required
                      className="w-full rounded-md border border-gray-600 bg-gray-700 px-4 py-2 text-sm text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                    />
                    {getError("team_name")}
                  </div>
                </div>
              )}

              {members.map((member, index) => (
                <div
                  key={member.id}
                  className="relative mb-6 rounded-lg border border-purple-400/50 p-6">
                  <h3 className="mb-4 text-xl font-bold text-purple-300">
                    {teamData.category === "Infografis"
                      ? "Data Peserta"
                      : `Anggota ${index + 1} ${
                          index === 0 ? "(Ketua Tim)" : ""
                        }`}
                  </h3>
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => removeMember(member.id)}
                      className="absolute top-4 right-4 text-red-400 hover:text-red-300">
                      &times; Hapus
                    </button>
                  )}
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <input
                        type="text"
                        name="name"
                        placeholder="Nama Lengkap"
                        value={member.name}
                        onChange={(e) => handleMemberChange(index, e)}
                        className="w-full rounded-md border border-gray-600 bg-gray-700 px-4 py-2 text-sm"
                      />
                      {getError(`members.${index}.name`)}
                    </div>
                    <div>
                      <input
                        type="number"
                        name="nim"
                        placeholder="NIM"
                        value={member.nim}
                        onChange={(e) => handleMemberChange(index, e)}
                        className="w-full rounded-md border border-gray-600 bg-gray-700 px-4 py-2 text-sm"
                      />
                      {getError(`members.${index}.nim`)}
                    </div>
                    <div>
                      <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={member.email}
                        onChange={(e) => handleMemberChange(index, e)}
                        className="w-full rounded-md border border-gray-600 bg-gray-700 px-4 py-2 text-sm"
                      />
                      {getError(`members.${index}.email`)}
                    </div>
                    <div>
                      <input
                        type="number"
                        name="phone"
                        placeholder="No. Telepon (WA)"
                        value={member.phone}
                        onChange={(e) => handleMemberChange(index, e)}
                        className="w-full rounded-md border border-gray-600 bg-gray-700 px-4 py-2 text-sm"
                      />
                      {getError(`members.${index}.phone`)}
                    </div>
                    <div>
                      <input
                        type="text"
                        name="school"
                        placeholder="Asal Sekolah/Universitas"
                        value={member.school}
                        onChange={(e) => handleMemberChange(index, e)}
                        className="w-full rounded-md border border-gray-600 bg-gray-700 px-4 py-2 text-sm"
                      />
                      {getError(`members.${index}.school`)}
                    </div>
                    <div>
                      <input
                        type="url"
                        name="igLink"
                        placeholder="Link Profil Instagram"
                        value={member.igLink}
                        onChange={(e) => handleMemberChange(index, e)}
                        className="w-full rounded-md border border-gray-600 bg-gray-700 px-4 py-2 text-sm"
                      />
                      {getError(`members.${index}.igLink`)}
                    </div>
                  </div>
                  <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="group">
                      <label className="mb-2 block text-xs text-gray-300">
                        Screenshot follow instagram @expasign
                      </label>
                      <div className="relative">
                        <input
                          type="file"
                          name="followExpa"
                          id={`followExpa-${index}`}
                          onChange={(e) => {
                            console.log(
                              "File selected for followExpa:",
                              e.target.files?.[0]?.name
                            ); // Debug log
                            handleMemberChange(index, e);
                            const filename =
                              e.target.files?.[0]?.name || "No file chosen";
                            const display = document.getElementById(
                              `followExpa-${index}-filename`
                            );
                            if (display) display.textContent = filename;
                          }}
                          className="absolute inset-0 z-50 h-full w-full cursor-pointer opacity-0"
                          accept="image/*"
                          style={{ pointerEvents: "auto" }} // Force pointer events
                        />
                        <div
                          className="cursor-pointer rounded-lg border border-gray-600 bg-gray-700/50 p-4 transition-all duration-200 hover:border-blue-500 hover:bg-gray-700/70"
                          onClick={() => {
                            document
                              .getElementById(`followExpa-${index}`)
                              ?.click();
                          }}>
                          <div className="flex items-center space-x-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/20">
                              <svg
                                className="h-4 w-4 text-blue-400"
                                fill="currentColor"
                                viewBox="0 0 24 24">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                              </svg>
                            </div>
                            <div className="flex-1">
                              <p className="text-sm text-gray-300">
                                Choose file
                              </p>
                              <p
                                className="text-xs text-gray-500"
                                id={`followExpa-${index}-filename`}>
                                No file chosen
                              </p>
                            </div>
                            <svg
                              className="h-4 w-4 text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                      {getError(`members.${index}.followExpa`)}
                    </div>

                    <div className="group">
                      <label className="mb-2 block text-xs text-gray-300">
                        Screenshot follow instagram @edutime
                      </label>
                      <div className="relative">
                        <input
                          type="file"
                          name="followEdu"
                          onChange={(e) => {
                            handleMemberChange(index, e);
                            const filename =
                              e.target.files?.[0]?.name || "No file chosen";
                            const display = document.getElementById(
                              `followEdu-${index}-filename`
                            );
                            if (display) display.textContent = filename;
                          }}
                          className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
                          accept="image/*"
                        />
                        <div className="cursor-pointer rounded-lg border border-gray-600 bg-gray-700/50 p-4 transition-all duration-200 hover:border-blue-500 hover:bg-gray-700/70">
                          <div className="flex items-center space-x-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/20">
                              <svg
                                className="h-4 w-4 text-blue-400"
                                fill="currentColor"
                                viewBox="0 0 24 24">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                              </svg>
                            </div>
                            <div className="flex-1">
                              <p className="text-sm text-gray-300">
                                Choose file
                              </p>
                              <p
                                className="text-xs text-gray-500"
                                id={`followEdu-${index}-filename`}>
                                No file chosen
                              </p>
                            </div>
                            <svg
                              className="h-4 w-4 text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                      {getError(`members.${index}.followEdu`)}
                    </div>

                    <div className="group">
                      <label className="mb-2 block text-xs text-gray-300">
                        Screenshot follow instagram @marsproject
                      </label>
                      <div className="relative">
                        <input
                          type="file"
                          name="followMp"
                          onChange={(e) => {
                            handleMemberChange(index, e);
                            const filename =
                              e.target.files?.[0]?.name || "No file chosen";
                            const display = document.getElementById(
                              `followMp-${index}-filename`
                            );
                            if (display) display.textContent = filename;
                          }}
                          className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
                          accept="image/*"
                        />
                        <div className="cursor-pointer rounded-lg border border-gray-600 bg-gray-700/50 p-4 transition-all duration-200 hover:border-blue-500 hover:bg-gray-700/70">
                          <div className="flex items-center space-x-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/20">
                              <svg
                                className="h-4 w-4 text-blue-400"
                                fill="currentColor"
                                viewBox="0 0 24 24">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                              </svg>
                            </div>
                            <div className="flex-1">
                              <p className="text-sm text-gray-300">
                                Choose file
                              </p>
                              <p
                                className="text-xs text-gray-500"
                                id={`followMp-${index}-filename`}>
                                No file chosen
                              </p>
                            </div>
                            <svg
                              className="h-4 w-4 text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                      {getError(`members.${index}.followMp`)}
                    </div>

                    <div className="group">
                      <label className="mb-2 block text-xs text-gray-300">
                        Screenshot Repost Story
                      </label>
                      <div className="relative">
                        <input
                          type="file"
                          name="repostSg"
                          onChange={(e) => {
                            handleMemberChange(index, e);
                            const filename =
                              e.target.files?.[0]?.name || "No file chosen";
                            const display = document.getElementById(
                              `repostSg-${index}-filename`
                            );
                            if (display) display.textContent = filename;
                          }}
                          className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
                          accept="image/*"
                        />
                        <div className="cursor-pointer rounded-lg border border-gray-600 bg-gray-700/50 p-4 transition-all duration-200 hover:border-blue-500 hover:bg-gray-700/70">
                          <div className="flex items-center space-x-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/20">
                              <svg
                                className="h-4 w-4 text-blue-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                                />
                              </svg>
                            </div>
                            <div className="flex-1">
                              <p className="text-sm text-gray-300">
                                Choose file
                              </p>
                              <p
                                className="text-xs text-gray-500"
                                id={`repostSg-${index}-filename`}>
                                No file chosen
                              </p>
                            </div>
                            <svg
                              className="h-4 w-4 text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                      {getError(`members.${index}.repostSg`)}
                    </div>
                  </div>
                </div>
              ))}

              {members.length < 3 &&
                teamData.category !== "Infografis" &&
                selectedCompe !== "lktiInfog" &&
                selectedCompe !== "business_planInfog" && (
                  <button
                    type="button"
                    onClick={addMember}
                    className="mb-6 w-full rounded-lg border-2 border-dashed border-gray-600 py-3 text-sm text-gray-400 hover:border-gray-500 hover:text-gray-300">
                    + Tambah Anggota
                  </button>
                )}
              {((selectedCompe === "lktiInfog" && members.length < 4) ||
                selectedCompe === "business_planInfog") && (
                <button
                  type="button"
                  onClick={addMember}
                  className="mb-6 w-full rounded-lg border-2 border-dashed border-gray-600 py-3 text-sm text-gray-400 hover:border-gray-500 hover:text-gray-300">
                  + Tambah Anggota
                </button>
              )}

              <div className="mt-6">
                <p className="mb-3 block text-sm font-bold text-gray-300">
                  METODE PEMBAYARAN
                </p>
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="payment_method"
                    id="qris"
                    value="transfer"
                    checked={qris}
                    onChange={(e) => {
                      handleTeamChange(e);
                      setQris(true);
                    }}
                  />
                  <label htmlFor="qris">Qris</label>
                </div>
                {teamData.payment_method === "transfer" && qris === true && (
                  <div className="">
                    <div className="flex justify-center items-center">
                      {(teamData.category === "lkti" ||
                        teamData.category === "business_plan") && (
                        <img src="65000.jpg" alt="" />
                      )}
                      {teamData.category === "Infografis" && (
                        <img src="25000.jpg" alt="" />
                      )}
                    </div>
                    <label
                      htmlFor="receipt"
                      className="mb-2 block text-xs text-gray-300">
                      Upload Bukti Pembayaran Tim
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        name="receipt"
                        id="receipt"
                        onChange={(e) => {
                          handleTeamChange(e);
                          const filename =
                            e.target.files?.[0]?.name || "No file chosen";
                          const display =
                            document.getElementById("receipt-filename");
                          if (display) display.textContent = filename;
                        }}
                        className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
                        accept="image/*"
                      />
                      <div className="cursor-pointer rounded-lg border border-gray-600 bg-gray-700/50 p-4 transition-all duration-200 hover:border-blue-500 hover:bg-gray-700/70">
                        <div className="flex items-center space-x-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500/20">
                            <svg
                              className="h-4 w-4 text-green-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                              />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-gray-300">
                              Choose payment receipt
                            </p>
                            <p
                              className="text-xs text-gray-500"
                              id="receipt-filename">
                              Image file
                            </p>
                          </div>
                          <svg
                            className="h-4 w-4 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                    {getError("receipt")}
                  </div>
                )}
                <div className="flex mt-5 items-center gap-2">
                  <input
                    type="radio"
                    name="payment_method"
                    id="transfer"
                    value="transfer"
                    checked={qris === false}
                    onChange={(e) => {
                      handleTeamChange(e);
                      setQris(false);
                    }}
                  />
                  <label htmlFor="transfer">Transfer Bank</label>
                </div>
                {teamData.payment_method === "transfer" && !qris && (
                  <div className="mt-4">
                    <div className="mb-4 rounded-lg border border-slate-700 bg-slate-800 p-4 transition-colors duration-200 hover:border-indigo-500">
                      <h4 className="mb-2 text-base font-bold text-slate-100">
                        Bank BCA
                      </h4>
                      <div className="grid grid-cols-[max-content_1fr] gap-x-4 text-sm">
                        <span className="text-slate-400">No. Rekening</span>
                        <span className="font-medium text-slate-200">
                          6037053203
                        </span>

                        <span className="text-slate-400">Atas Nama</span>
                        <span className="font-medium text-slate-200">
                          Yunita Nurain
                        </span>
                      </div>
                    </div>
                    <div className="mb-4 rounded-lg border border-slate-700 bg-slate-800 p-4 transition-colors duration-200 hover:border-indigo-500">
                      <h4 className="mb-2 text-base font-bold text-slate-100">
                        Bank Mandiri
                      </h4>
                      <div className="grid grid-cols-[max-content_1fr] gap-x-4 text-sm">
                        <span className="text-slate-400">No. Rekening</span>
                        <span className="font-medium text-slate-200">
                          1570011957702
                        </span>

                        <span className="text-slate-400">Atas Nama</span>
                        <span className="font-medium text-slate-200">
                          Dwi Nur Afifah
                        </span>
                      </div>
                    </div>
                    <div className="mb-4 rounded-lg border border-slate-700 bg-slate-800 p-4 transition-colors duration-200 hover:border-indigo-500">
                      <h4 className="mb-2 text-base font-bold text-slate-100">
                        Dana
                      </h4>
                      <div className="grid grid-cols-[max-content_1fr] gap-x-4 text-sm">
                        <span className="text-slate-400">No. Rekening</span>
                        <span className="font-medium text-slate-200">
                          081298296420
                        </span>

                        <span className="text-slate-400">Atas Nama</span>
                        <span className="font-medium text-slate-200">
                          Dwi Nur Afifah
                        </span>
                      </div>
                    </div>
                    <label
                      htmlFor="receipt"
                      className="mb-2 block text-xs text-gray-300">
                      Upload Bukti Pembayaran Tim
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        name="receipt"
                        id="receipt"
                        onChange={(e) => {
                          handleTeamChange(e);
                          const filename =
                            e.target.files?.[0]?.name || "No file chosen";
                          const display =
                            document.getElementById("receipt-filename");
                          if (display) display.textContent = filename;
                        }}
                        className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
                        accept="image/*"
                      />
                      <div className="cursor-pointer rounded-lg border border-gray-600 bg-gray-700/50 p-4 transition-all duration-200 hover:border-blue-500 hover:bg-gray-700/70">
                        <div className="flex items-center space-x-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500/20">
                            <svg
                              className="h-4 w-4 text-green-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                              />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-gray-300">
                              Choose payment receipt
                            </p>
                            <p
                              className="text-xs text-gray-500"
                              id="receipt-filename">
                              Image file
                            </p>
                          </div>
                          <svg
                            className="h-4 w-4 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                    {getError("receipt")}
                  </div>
                )}
              </div>

              <div className="mt-6 mb-6 flex gap-2 text-sm">
                <input
                  type="checkbox"
                  name="isEdu"
                  id="isEdu"
                  checked={teamData.isEdu}
                  onChange={handleTeamChange}
                  className="h-5 w-5 rounded p-2"
                />
                <label htmlFor="isEdu" className="font-bold">
                  Bersedia hadir pada edutime tanggal 11 Oktober 2025?
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full transform rounded-full bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-3 text-lg font-bold text-white shadow-lg transition-all duration-300 hover:scale-105">
                {isLoading ? "Mengirim Data Tim..." : "Daftarkan Tim"}
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
