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

type Match = {
  team1: string;
  team2: string;
  time?: string;
};

type Schedule = {
  category: string;
  date: string;
  icon: string;
  matches: Match[];
};

export default function Home() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [loadingPdf, setLoadingPdf] = useState<string | null>(null);
  const [showSchedule, setShowSchedule] = useState<boolean>(false);

  const pdfFiles: PdfFile[] = [
    { name: 'Lomba Badminton', file: '/LombaBadminton.pdf', icon: '🏸' },
    { name: 'Lomba Cerdas Cermat', file: '/LombaCerdasCermat.pdf', icon: '🧠' },
    { name: 'Lomba E-Sport', file: '/LombaEsportFix.pdf', icon: '🎮' },
    { name: 'Lomba Mini Soccer', file: '/LombaMiniSoccer.pdf', icon: '⚽' },
    { name: 'Lomba Pemadan Api', file: '/LombaPemadamApi.pdf', icon: '🧯' },
    { name: 'Lomba Tenis Meja', file: '/LombaTenisMeja.pdf', icon: '🏓' },
  ];

  const matchSchedule: Schedule[] = [
    {
      category: 'CERDAS CERMAT',
      date: '26 November 2025',
      icon: '🧠',
      matches: [
        { team1: '[A] HELM PROYEK', team2: '[A] RESPIRATOR' },
        { team1: '[A] RESPIRATOR', team2: '[A] FACE SHIELD' },
        { team1: '[A] FACE SHIELD', team2: '[A] HELM PROYEK' },
      ]
    },
    {
      category: 'TENIS MEJA',
      date: '27 November 2025',
      icon: '🏓',
      matches: [
        { team1: '[MD 1] TIM PENCEGAHAN', team2: '[MD 1] TIM PEMANTAUAN' },
        { team1: '[MD 2] TIM PENCEGAHAN', team2: '[MD 2] TIM PEMANTAUAN' },
        { team1: '[MD 3] TIM PENCEGAHAN', team2: '[MD 3] TIM PEMANTAUAN' },
      ]
    },
    {
      category: 'MINI SOCCER',
      date: '28 November 2025',
      icon: '⚽',
      matches: [
        { team1: 'HIMALAYAN THUNDERLIONS', team2: 'DENALI RANGERS' },
        { team1: 'FUJI THUNDER', team2: 'MERAPI FLAMES' },
        { team1: 'BROMO PHOENIX', team2: 'EVEREST BLACKPEAK' },
        { team1: 'KERINCI TIGERS', team2: 'KILIMANJARO STORM' },
        { team1: 'HIMALAYAN THUNDERLIONS', team2: 'BROMO PHOENIX' },
        { team1: 'MERAPI FLAMES', team2: 'KERINCI TIGERS' },
      ]
    },
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
    setLoadingPdf(file);
    const newWindow = window.open('about:blank', '_blank');

    if (newWindow) {
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
              <h2>📄 Memuat PDF...</h2>
              <p>Mohon tunggu, file sedang dimuat</p>
            </div>
          </body>
        </html>
      `);

      setTimeout(() => {
        newWindow.location.href = file;
        setLoadingPdf(null);
      }, 100);
    } else {
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

      <div className="container mx-auto px-4 py-8 md:py-12 relative z-10">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="flex justify-center mb-6">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 rounded-full blur-2xl opacity-75 group-hover:opacity-100 transition-opacity animate-pulse"></div>
              <div className="absolute inset-0 bg-white/30 rounded-full blur-xl animate-pulse"></div>
              <Image
                src="/logo.png"
                alt="BULANKESIG Logo"
                width={180}
                height={180}
                className="rounded-full shadow-2xl border-4 border-white/50 relative z-10 transform group-hover:scale-105 transition-transform duration-300"
                priority
              />
              <div className="absolute inset-0 border-4 border-dashed border-white/50 rounded-full animate-spin" style={{ animationDuration: '10s' }}></div>
            </div>
          </div>

          {/* Button Cek Jadwal */}
          <button
            onClick={() => setShowSchedule(!showSchedule)}
            className="group relative bg-white/95 hover:bg-white backdrop-blur-xl px-8 py-4 rounded-2xl shadow-2xl hover:shadow-cyan-400/50 transition-all duration-500 transform hover:-translate-y-1 hover:scale-105 border-2 border-white/50 overflow-hidden"
          >
            <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/10 transition-all duration-500"></div>
            <div className="relative flex items-center gap-3">
              <span className="text-3xl">{showSchedule ? '📅' : '🗓️'}</span>
              <span className="text-xl font-black text-blue-600">
                {showSchedule ? 'Sembunyikan Jadwal' : 'Cek Jadwal Pertandingan'}
              </span>
              <span className="text-2xl transform group-hover:translate-x-1 transition-transform">
                {showSchedule ? '↑' : '↓'}
              </span>
            </div>
          </button>
        </div>

        {/* Match Schedule Table - Conditional Render */}
        {showSchedule && (
          <div className="max-w-7xl mx-auto mb-12 animate-fadeIn">
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border-4 border-white/50">
              {/* Table Header */}
              <div className="bg-blue-600 px-4 md:px-6 py-4 md:py-6">
                <div className="flex items-center justify-between flex-wrap gap-3 md:gap-4">
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="bg-white/20 p-3 md:p-4 rounded-2xl backdrop-blur-sm">
                      <span className="text-2xl md:text-4xl">🏆</span>
                    </div>
                    <div>
                      <h2 className="text-xl md:text-3xl lg:text-4xl font-black text-white drop-shadow-lg">
                        Match Schedule
                      </h2>
                    </div>
                  </div>
                  <div className="bg-white/20 px-4 md:px-5 py-2 md:py-3 rounded-xl backdrop-blur-sm border-2 border-white/30">
                    <p className="text-white font-black text-base md:text-lg">
                      {matchSchedule.reduce((acc, s) => acc + s.matches.length, 0)} Matches
                    </p>
                  </div>
                </div>
              </div>

              {/* Desktop Table View */}
              <div className="hidden md:block overflow-y-auto" style={{ maxHeight: '600px' }}>
                <table className="w-full">
                  <thead className="sticky top-0 z-20">
                    <tr className="bg-blue-500">
                      <th className="px-6 py-4 text-center text-white font-black text-base border-b-2 border-blue-400">
                        No
                      </th>
                      <th className="px-6 py-4 text-left text-white font-black text-base border-b-2 border-blue-400">
                        Category
                      </th>
                      <th className="px-6 py-4 text-left text-white font-black text-base border-b-2 border-blue-400">
                        Date
                      </th>
                      <th className="px-6 py-4 text-center text-white font-black text-base border-b-2 border-blue-400">
                        Match
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {matchSchedule.map((schedule, scheduleIndex) => (
                      <>
                        {schedule.matches.map((match, matchIndex) => (
                          <tr
                            key={`${scheduleIndex}-${matchIndex}`}
                            className="border-b border-blue-100 hover:bg-blue-50 transition-all duration-300"
                          >
                            <td className="px-6 py-5 text-center text-blue-900 font-bold text-base">
                              {scheduleIndex * 10 + matchIndex + 1}
                            </td>
                            <td className="px-6 py-5">
                              <p className="font-black text-blue-900 text-base">
                                {schedule.category}
                              </p>
                            </td>
                            <td className="px-6 py-5">
                              <p className="text-gray-700 font-semibold text-base">
                                {schedule.date}
                              </p>
                            </td>
                            <td className="px-6 py-5">
                              <div className="flex items-center justify-center gap-3">
                                <div className="flex-1 text-right">
                                  <p className="font-bold text-blue-900 text-base truncate">
                                    {match.team1}
                                  </p>
                                </div>
                                <div className="shrink-0 bg-blue-600 text-white px-4 py-2 rounded-lg font-black text-sm shadow-md">
                                  VS
                                </div>
                                <div className="flex-1 text-left">
                                  <p className="font-bold text-blue-900 text-base truncate">
                                    {match.team2}
                                  </p>
                                </div>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card View */}
              <div className="md:hidden overflow-y-auto p-4 space-y-4" style={{ maxHeight: '600px' }}>
                {matchSchedule.map((schedule, scheduleIndex) => (
                  <>
                    {schedule.matches.map((match, matchIndex) => (
                      <div
                        key={`${scheduleIndex}-${matchIndex}`}
                        className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-4 shadow-lg border-2 border-blue-200"
                      >
                        {/* Match Number */}
                        <div className="flex items-center justify-between mb-3">
                          <div className="bg-blue-600 text-white px-3 py-1 rounded-lg font-black text-sm">
                            Match #{scheduleIndex * 10 + matchIndex + 1}
                          </div>
                          <div className="text-gray-600 text-xs font-semibold">
                            {schedule.date}
                          </div>
                        </div>

                        {/* Category */}
                        <div className="mb-3">
                          <p className="text-blue-600 font-black text-xs uppercase mb-1">Category</p>
                          <p className="text-blue-900 font-bold text-sm">
                            {schedule.category}
                          </p>
                        </div>

                        {/* Match Teams */}
                        <div className="bg-white rounded-xl p-3 border border-blue-200">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                              <p className="font-bold text-blue-900 text-sm flex-1">
                                {match.team1}
                              </p>
                            </div>
                            <div className="flex justify-center">
                              <div className="bg-blue-600 text-white px-4 py-1 rounded-lg font-black text-xs">
                                VS
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                              <p className="font-bold text-blue-900 text-sm flex-1">
                                {match.team2}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
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
              <div className="absolute inset-0 bg-cyan-400/0 group-hover:bg-cyan-400/20 transition-all duration-500"></div>

              {/* Animated Corner Accents */}
              <div className="absolute top-0 left-0 w-20 h-20 bg-cyan-400/40 rounded-br-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute bottom-0 right-0 w-20 h-20 bg-cyan-400/40 rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="p-6 md:p-8 relative z-10">
                <div className="flex items-start justify-between mb-6">
                  <div className="text-5xl md:text-7xl transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 filter drop-shadow-lg">
                    {pdf.icon}
                  </div>
                  <div className="bg-blue-100 p-3 md:p-4 rounded-2xl border-2 border-blue-200 group-hover:border-blue-300 group-hover:scale-110 transition-all duration-300 shadow-lg">
                    <span className="text-3xl md:text-4xl">📄</span>
                  </div>
                </div>

                <h3 className="text-xl md:text-2xl font-black text-gray-800 mb-4 group-hover:text-blue-600 transition-all duration-300">
                  {pdf.name}
                </h3>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-green-600 text-sm font-semibold">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50"></span>
                    <span>Tersedia</span>
                  </div>
                </div>

                <div className="flex items-center text-blue-600 font-bold text-base md:text-lg group-hover:gap-3 transition-all duration-300">
                  <span>Buka Detail</span>
                  <span className="transform group-hover:translate-x-2 transition-transform text-2xl">→</span>
                </div>
              </div>

              {/* Bottom Animated Bar */}
              <div className="h-2 bg-blue-500 relative overflow-hidden">
                <div className="absolute inset-0 bg-white/60 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              </div>

              {/* Pattern Overlay */}
              <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.3)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}