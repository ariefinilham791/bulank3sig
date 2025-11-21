'use client';

import Image from 'next/image';

type PdfFile = {
  name: string;
  file: string;
  icon: string;
};

export default function Home() {
  const pdfFiles: PdfFile[] = [
    { name: 'Lomba Badminton', file: '/LombaBadminton.pdf', icon: '🏸' },
    { name: 'Lomba Cerdas Cermat', file: '/LombaCerdasCermat.pdf', icon: '🧠' },
    { name: 'Lomba E-Sport', file: '/LombaE-Sport.pdf', icon: '🎮' },
    { name: 'Lomba Mini Soccer', file: '/LombaMiniSoccer.pdf', icon: '⚽' },
    { name: 'Lomba Pemadan Api', file: '/LombaPemadanApi.pdf', icon: '🧯' },
    { name: 'Lomba Tenis Meja', file: '/LombaTenisMeja.pdf', icon: '🏓' },
  ];

  const openPdf = (file: string) => {
    window.open(file, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <div className="flex justify-center mb-4">
            <Image
              src="/logo.png"
              alt="BULANKESIG Logo"
              width={200}
              height={200}
              className="rounded-full shadow-lg"
              priority
            />
          </div>
          <p className="text-gray-600 dark:text-gray-300">
            Pilih lomba untuk melihat detail informasi
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {pdfFiles.map((pdf, index) => (
            <div
              key={index}
              onClick={() => openPdf(pdf.file)}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="text-5xl">{pdf.icon}</div>
                  <span className="text-blue-500 text-2xl">📄</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {pdf.name}
                </h3>
                <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium">
                  <span className="text-sm">Lihat Detail</span>
                  <span className="ml-1">→</span>
                </div>
              </div>
              <div className="h-1 bg-gradient-to-r from-blue-500 to-indigo-500"></div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8 text-gray-600 dark:text-gray-400">
          <p>Klik pada kartu lomba untuk membuka PDF</p>
        </div>
      </div>
    </div>
  );
}