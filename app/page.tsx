'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

type PdfFile = {
  name: string;
  file: string;
  icon: string;
};

type Particle = {
  id: number;
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
};

export default function Home() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [loadingPdf, setLoadingPdf] = useState<string | null>(null);

  const pdfFiles: PdfFile[] = [
    { name: 'Lomba Badminton', file: '/LombaBadminton.pdf', icon: '🏸' },
    { name: 'Lomba Cerdas Cermat', file: '/LombaCerdasCermat.pdf', icon: '🧠' },
    { name: 'Lomba E-Sport', file: '/LombaEsportFix.pdf', icon: '🎮' },
    { name: 'Lomba Mini Soccer', file: '/LombaMiniSoccer.pdf', icon: '⚽' },
    { name: 'Lomba Pemadan Api', file: '/LombaPemadamApi.pdf', icon: '🧯' },
    { name: 'Lomba Tenis Meja', file: '/LombaTenisMeja.pdf', icon: '🏓' },
  ];

  useEffect(() => {
    const newParticles: Particle[] = [];
    for (let i = 0; i < 80; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 6 + 2,
        speedX: (Math.random() - 0.5) * 0.8,
        speedY: (Math.random() - 0.5) * 0.8,
        opacity: Math.random() * 0.6 + 0.3,
      });
    }
    setParticles(newParticles);

    const interval = setInterval(() => {
      setParticles((prev) =>
        prev.map((particle) => {
          let newX = particle.x + particle.speedX;
          let newY = particle.y + particle.speedY;

          if (newX < 0 || newX > 100) particle.speedX *= -1;
          if (newY < 0 || newY > 100) particle.speedY *= -1;

          newX = Math.max(0, Math.min(100, newX));
          newY = Math.max(0, Math.min(100, newY));

          return { ...particle, x: newX, y: newY };
        })
      );
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const openPdf = (file: string) => {
    // Set loading state
    setLoadingPdf(file);

    // Open PDF in new tab immediately (non-blocking)
    const newWindow = window.open('about:blank', '_blank');

    if (newWindow) {
      // Show loading message
      newWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Loading PDF...</title>
            <style>
              body {
                margin: 0;
                padding: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                min-height: 100vh;
                background: linear-gradient(135deg, #3f69fb 0%, #5a7efc 100%);
                font-family: system-ui, -apple-system, sans-serif;
              }
              .loader {
                text-align: center;
                color: white;
              }
              .spinner {
                border: 4px solid rgba(255, 255, 255, 0.3);
                border-top: 4px solid white;
                border-radius: 50%;
                width: 50px;
                height: 50px;
                animation: spin 1s linear infinite;
                margin: 0 auto 20px;
              }
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
              h2 {
                margin: 0 0 10px 0;
                font-size: 24px;
              }
              p {
                margin: 0;
                opacity: 0.9;
              }
            </style>
          </head>
          <body>
            <div class="loader">
              <div class="spinner"></div>
              <h2>⏳ Memuat PDF...</h2>
              <p>Mohon tunggu, file sedang dimuat</p>
            </div>
          </body>
        </html>
      `);

      // Navigate to actual PDF
      setTimeout(() => {
        newWindow.location.href = file;
        setLoadingPdf(null);
      }, 100);
    } else {
      // Fallback if popup blocked
      window.location.href = file;
      setLoadingPdf(null);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: '#3f69fb' }}>
      {/* Animated Particles Background */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-white transition-all duration-1000 ease-linear"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
              boxShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
            }}
          />
        ))}
      </div>

      {/* Decorative Glowing Elements */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-white/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 animate-pulse"></div>
      <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="flex justify-center mb-8">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 rounded-full blur-2xl opacity-75 group-hover:opacity-100 transition-opacity animate-pulse"></div>
              <div className="absolute inset-0 bg-white/30 rounded-full blur-xl animate-pulse"></div>
              <Image
                src="/logo.png"
                alt="BULANKESIG Logo"
                width={200}
                height={200}
                className="rounded-full shadow-2xl border-4 border-white/50 relative z-10 transform group-hover:scale-105 transition-transform duration-300"
                priority
              />
              {/* Rotating Ring */}
              <div className="absolute inset-0 border-4 border-dashed border-white/50 rounded-full animate-spin" style={{ animationDuration: '10s' }}></div>
            </div>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {pdfFiles.map((pdf, index) => (
            <div
              key={index}
              onClick={() => openPdf(pdf.file)}
              className="group relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl hover:shadow-cyan-400/50 transition-all duration-500 cursor-pointer transform hover:-translate-y-3 hover:scale-105 overflow-hidden border-2 border-white/50"
            >
              {/* Loading Overlay */}
              {loadingPdf === pdf.file && (
                <div className="absolute inset-0 bg-blue-600/90 backdrop-blur-sm z-50 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-3"></div>
                    <p className="text-white font-semibold">Membuka PDF...</p>
                  </div>
                </div>
              )}

              {/* Glowing Edge Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/0 via-purple-400/0 to-pink-400/0 group-hover:from-cyan-400/20 group-hover:via-purple-400/20 group-hover:to-pink-400/20 transition-all duration-500"></div>

              {/* Animated Corner Accents */}
              <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-cyan-400/40 to-transparent rounded-br-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-pink-400/40 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="p-8 relative z-10">
                <div className="flex items-start justify-between mb-6">
                  <div className="text-7xl transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 filter drop-shadow-lg">
                    {pdf.icon}
                  </div>
                  <div className="bg-gradient-to-br from-purple-100 to-pink-100 p-4 rounded-2xl border-2 border-purple-200 group-hover:border-purple-300 group-hover:scale-110 transition-all duration-300 shadow-lg">
                    <span className="text-4xl">📄</span>
                  </div>
                </div>

                <h3 className="text-2xl font-black text-gray-800 mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 group-hover:bg-clip-text transition-all duration-300">
                  {pdf.name}
                </h3>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-green-600 text-sm font-semibold">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50"></span>
                    <span>Tersedia</span>
                  </div>
                </div>

                <div className="flex items-center text-purple-600 font-bold text-lg group-hover:gap-3 transition-all duration-300">
                  <span>Buka Detail</span>
                  <span className="transform group-hover:translate-x-2 transition-transform text-2xl">→</span>
                </div>
              </div>

              {/* Bottom Animated Gradient Bar */}
              <div className="h-2 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              </div>

              {/* Pattern Overlay */}
              <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.3)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}