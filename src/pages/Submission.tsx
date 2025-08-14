import { useState } from 'react';
import type { FC, MouseEvent, ChangeEvent } from 'react';
import { usePageInteractions } from '../hooks/usePageInteractions';

interface FormDataState {
    name: string;
    email: string;
    file: File | undefined;
}

interface PageInteractionsProps {
    smoothScroll: boolean;
    parallaxSelector: string;
    parallaxSpeed: number;
    burgerId: string;
    navLinksId: string;
}

interface SuccessResponse {
    status: 'success';
    message: string;
}

interface ErrorResponse {
    message?: string | string[];
    errors?: string[];
}

const Submission: FC = () => {
    usePageInteractions({
        smoothScroll: true,
        parallaxSelector: ".absolute.inset-0",
        parallaxSpeed: 0.5,
        burgerId: "burger",
        navLinksId: "nav-links",
    } as PageInteractionsProps);

    const [formData, setFormData] = useState<FormDataState>({
        name: '',
        email: '',
        file: undefined,
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string[]>([]);
    const [success, setSuccess] = useState<string>('');

    const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const newErrors: string[] = [];
        if (!formData.name) newErrors.push('Nama tim harus diisi!');
        if (!formData.email) newErrors.push('Email ketua tim tidak boleh kosong!');
        if (!formData.file) newErrors.push('File belum dipilih!');

        if (newErrors.length > 0) {
            setError(newErrors);
            return;
        }
        setIsLoading(true);
        setError([]);
        setSuccess('');

        const formDataSend = new FormData();
        formDataSend.append('name', formData.name);
        formDataSend.append('email', formData.email);
        if (formData.file) {
            formDataSend.append('file', formData.file);
        }

        try {
            const response = await fetch('https://admin.expasign-edutime.site/api/submission/handle', {
                method: 'POST',
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                },
                body: formDataSend,
            });

            if (!response.ok) {
                const errorData: ErrorResponse = await response.json();
                console.error('Error response:', errorData);
                setError(errorData.errors || ['Terjadi kesalahan saat mengirim data.']);
            } else {
                const data: SuccessResponse | ErrorResponse = await response.json();
                console.log('Response Data:', data);

                if ('status' in data && data.status === 'success') {
                    setSuccess(data.message);
                } else {
                    const errorMessage = data.message || 'Terjadi kesalahan saat memproses pendaftaran.';
                    setError(Array.isArray(errorMessage) ? errorMessage : [errorMessage]);
                }
            }
        } catch (err) {
            console.error('Network error:', err);
            setError(['Terjadi kesalahan jaringan. Silakan coba lagi.']);
        }
        setIsLoading(false);
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFormData({ ...formData, file: e.target.files[0] });
        }
    };

    return (
        <>
            <div
                className="flex min-h-screen items-center justify-center bg-gray-900 py-12 text-white"
                style={{ fontFamily: 'Orbitron', fontWeight: 400 }}
            >
                <div className="relative z-10 w-11/12 max-w-2xl rounded-lg border border-gray-700 bg-gray-800 p-8 shadow-2xl md:p-12">
                    <h2 className="mb-8 text-center text-3xl font-bold text-blue-400 md:text-4xl">Submission Expasign x Edutime 2025</h2>
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
                            <label htmlFor="name" className="mb-2 block text-sm font-bold text-gray-300">
                                Nama tim
                            </label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                placeholder="Input Nama Tim"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                                className="form-input w-full rounded-md border border-gray-600 bg-gray-700 px-4 py-2 text-sm text-white focus:border-blue-500 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="mb-2 block text-sm font-bold text-gray-300">
                                Email ketua tim
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Input Email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                                className="form-input w-full rounded-md border border-gray-600 bg-gray-700 px-4 py-2 text-sm text-white focus:border-blue-500 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                    <div className="mt-6" id="paymentDetails">
                        <label htmlFor="receipt" className="mb-2 block text-sm font-bold text-gray-300">
                            Upload File
                        </label>
                        <input
                            type="file"
                            name="file"
                            id="receipt"
                            onChange={handleFileChange}
                            accept=".jpg,.jpeg,.png,.pdf"
                            required
                            className="form-input w-full rounded-md border border-gray-600 bg-gray-700 p-2 text-sm text-white file:mr-4 file:rounded-full file:border-0 file:bg-blue-500 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-blue-600 focus:border-blue-500 focus:ring-blue-500"
                        />
                        <p className="mt-1 text-xs text-gray-400">Ukuran maksimal file: 100MB. Format: JPG, PNG, PDF.</p>
                    </div>
                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={isLoading}
                        className="mt-8 w-full transform rounded-full bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-3 text-lg font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-blue-600 hover:to-purple-700 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Submitting...' : 'Submit'}
                    </button>
                </div>
            </div>
        </>
    );
};

export default Submission;