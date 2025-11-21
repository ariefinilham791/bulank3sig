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
    <div className="min-h-screen relative overflow-hidden" style={{ background: '#3f69fb' }}>
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-white/5 rounded-full blur-2xl"></div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-white/20 rounded-full blur-xl"></div>
              <Image
                src="/logo.png"
                alt="BULANKESIG Logo"
                width={180}
                height={180}
                className="rounded-full shadow-2xl border-4 border-white/30 relative z-10"
                priority
              />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-white mb-3 tracking-wide">
            Informasi Lomba
          </h2>
          <p className="text-white/90 text-lg">
            Pilih lomba untuk melihat detail informasi
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {pdfFiles.map((pdf, index) => (
            <div
              key={index}
              onClick={() => openPdf(pdf.file)}
              className="group relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 hover:scale-105 overflow-hidden"
            >
              {/* Gradient Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-all duration-300"></div>
              
              <div className="p-8 relative z-10">
                <div className="flex items-start justify-between mb-6">
                  <div className="text-6xl transform group-hover:scale-110 transition-transform duration-300">
                    {pdf.icon}
                  </div>
                  <div className="bg-blue-50 p-3 rounded-xl group-hover:bg-blue-100 transition-colors">
                    <span className="text-3xl">📄</span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
                  {pdf.name}
                </h3>
                <div className="flex items-center text-blue-600 font-semibold group-hover:gap-2 transition-all">
                  <span className="text-base">Lihat Detail</span>
                  <span className="transform group-hover:translate-x-1 transition-transform text-xl">→</span>
                </div>
              </div>
              
              {/* Bottom Accent */}
              <div className="h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
            </div>
          ))}
        </div>

        {/* Footer Info */}
        <div className="text-center mt-16">
          <div className="inline-block bg-white/10 backdrop-blur-sm px-8 py-4 rounded-full">
            <p className="text-white/90 text-base">
              💡 Klik pada kartu untuk membuka PDF di tab baru
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}