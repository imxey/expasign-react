import { useState, type FormEvent, type ChangeEvent } from 'react';
import { usePageInteractions } from '../hooks/usePageInteractions';

// Aku buatin interface buat data form-nya biar rapi
interface IFormData {
    name: string;
    nim: string; // Aku ganti jadi string biar gampang di-handle di form
    jurusan: string;
    email: string;
    phone: string;
    address: string;
    school: string;
}

export default function Edutime() {
    usePageInteractions({
        smoothScroll: true,
        parallaxSelector: ".absolute.inset-0",
        parallaxSpeed: 0.5,
        burgerId: "burger",
        navLinksId: "nav-links",
    });

    // State-nya kita kasih tipe data yang jelas yaa
    const [formData, setFormData] = useState<IFormData>({
        name: '',
        nim: '', // Awalnya string kosong
        jurusan: '',
        email: '',
        phone: '',
        address: '',
        school: '',
    });

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string[]>([]);
    const [success, setSuccess] = useState<string>('');

    // Event 'e'-nya kita kasih tipe juga
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newErrors: string[] = [];

        // Validasi simpel
        if (!formData.name) newErrors.push('Nama lengkap harus diisi!');
        if (!formData.email) newErrors.push('Email tidak boleh kosong!');
        if (!formData.nim) newErrors.push('NIM harus diisi!');
        if (!formData.jurusan) newErrors.push('Jurusan harus diisi!');
        if (!formData.phone) newErrors.push('Nomor telepon harus diisi!');
        if (!formData.address) newErrors.push('Alamat harus diisi!');
        if (!formData.school) newErrors.push('Universitas harus diisi!');

        if (newErrors.length > 0) {
            setError(newErrors);
            return;
        }

        setIsLoading(true);
        setError([]);
        setSuccess('');

        const formDataToSend = new FormData();
        // Append semua data dari state
        Object.entries(formData).forEach(([key, value]) => {
            formDataToSend.append(key, value);
        });

        try {
            const response = await fetch('https://admin.expasign-edutime.site/api/edutime/handle', {
                method: 'POST',
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                },
                body: formDataToSend,
            });

            // Aku rapiin sedikit bagian response handling-nya ya
            const responseData = await response.json();

            if (!response.ok) {
                const errorMessages = responseData.errors ? Object.values(responseData.errors).flat() as string[] : [responseData.message || 'Terjadi kesalahan saat mengirim data.'];
                setError(errorMessages);
            } else {
                setSuccess(responseData.message || 'Pendaftaran berhasil!');
                setFormData({ // Reset form setelah sukses
                    name: '', nim: '', jurusan: '', email: '', phone: '', address: '', school: '',
                });
            }
        } catch (err) {
            console.error('Network error:', err);
            setError(['Terjadi kesalahan jaringan. Silakan coba lagi.']);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div
                className="flex min-h-screen items-center justify-center bg-gray-900 py-12 text-white"
                style={{ fontFamily: 'Orbitron', fontWeight: 400 }}
            >
                <form
                    onSubmit={handleSubmit}
                    className="relative z-10 w-11/12 max-w-2xl rounded-lg border border-gray-700 bg-gray-800 p-8 shadow-2xl md:p-12"
                    noValidate
                >
                    <h2 className="mb-8 text-center text-3xl font-bold text-blue-400 md:text-4xl">Pendaftaran Edutime 2025</h2>
                    {success && (
                        <div className="mb-6 rounded-lg bg-green-500 px-4 py-3 text-center text-white">
                            <p>{success}</p>
                        </div>
                    )}
                    {error.length > 0 && (
                        <div className="mb-6 rounded-lg bg-red-500 px-4 py-3 text-white">
                            <ul className="list-disc pl-5">
                                {error.map((err, index) => (
                                    <li key={index}>{err}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                         <div>
                             <label htmlFor="name" className="mb-2 block text-sm font-bold text-gray-300">Nama Lengkap</label>
                             <input type="text" name="name" id="name" placeholder="Input Nama Lengkap" value={formData.name} onChange={handleChange} required className="form-input w-full rounded-md border border-gray-600 bg-gray-700 px-4 py-2 text-sm text-white focus:border-blue-500 focus:ring-blue-500"/>
                         </div>
                         <div>
                             <label htmlFor="email" className="mb-2 block text-sm font-bold text-gray-300">Email</label>
                             <input type="email" name="email" id="email" placeholder="Input Email" value={formData.email} onChange={handleChange} required className="form-input w-full rounded-md border border-gray-600 bg-gray-700 px-4 py-2 text-sm text-white focus:border-blue-500 focus:ring-blue-500"/>
                         </div>
                    </div>
                     <div className="mt-6 grid grid-cols-1 gap-6">
                         <div>
                             <label htmlFor="nim" className="mb-2 block text-sm font-bold text-gray-300">NIM</label>
                             <input type="text" pattern="[0-9]*" name="nim" id="nim" placeholder="Input NIM" value={formData.nim} onChange={handleChange} required className="form-input w-full rounded-md border border-gray-600 bg-gray-700 px-4 py-2 text-sm text-white focus:border-blue-500 focus:ring-blue-500"/>
                         </div>
                         <div>
                             <label htmlFor="jurusan" className="mb-2 block text-sm font-bold text-gray-300">Jurusan</label>
                             <input type="text" name="jurusan" id="jurusan" placeholder="Input Jurusan" value={formData.jurusan} onChange={handleChange} required className="form-input w-full rounded-md border border-gray-600 bg-gray-700 px-4 py-2 text-sm text-white focus:border-blue-500 focus:ring-blue-500"/>
                         </div>
                         <div>
                             <label htmlFor="phone" className="mb-2 block text-sm font-bold text-gray-300">Nomor Telepon</label>
                             <input type="tel" name="phone" id="phone" placeholder="Input Nomor Telepon" value={formData.phone} onChange={handleChange} required className="form-input w-full rounded-md border border-gray-600 bg-gray-700 px-4 py-2 text-sm text-white focus:border-blue-500 focus:ring-blue-500"/>
                         </div>
                         <div>
                             <label htmlFor="address" className="mb-2 block text-sm font-bold text-gray-300">Alamat</label>
                             <input type="text" name="address" id="address" placeholder="Input Alamat" value={formData.address} onChange={handleChange} required className="form-input w-full rounded-md border border-gray-600 bg-gray-700 px-4 py-2 text-sm text-white focus:border-blue-500 focus:ring-blue-500"/>
                         </div>
                         <div>
                             <label htmlFor="school" className="mb-2 block text-sm font-bold text-gray-300">Universitas</label>
                             <input type="text" name="school" id="school" placeholder="Input Universitas" value={formData.school} onChange={handleChange} required className="form-input w-full rounded-md border border-gray-600 bg-gray-700 px-4 py-2 text-sm text-white focus:border-blue-500 focus:ring-blue-500"/>
                         </div>
                     </div>
                     <button
                         type="submit"
                         disabled={isLoading}
                         className="mt-8 w-full transform rounded-full bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-3 text-lg font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-blue-600 hover:to-purple-700 hover:shadow-xl disabled:opacity-50"
                     >
                         {isLoading ? 'Mengirim...' : 'Daftar Sekarang'}
                     </button>
                </form>
            </div>
        </>
    );
}