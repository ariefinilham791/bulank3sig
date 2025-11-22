'use client';

import Image from 'next/image';
import { useState } from 'react';

// Icon Components
const CalendarIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const FileTextIcon = () => (
  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const FileTextIconSmall = () => (
  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const DownloadIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
);

const XIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const SearchIcon = () => (
  <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const RefreshIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
);

const ChevronLeftIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

const FilterIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
  </svg>
);

type PdfFile = {
  name: string;
  file: string;
  category: string;
};

type Match = {
  lomba: string;
  tanggal: string;
  timYangBertanding: string;
};

type WeekGroup = {
  weekNumber: number;
  weekLabel: string;
  startDate: string;
  endDate: string;
  matches: Match[];
};

export default function Home() {
  const [showSchedule, setShowSchedule] = useState<boolean>(false);
  const [showPdfModal, setShowPdfModal] = useState<boolean>(false);
  const [selectedPdf, setSelectedPdf] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  
  const itemsPerPage = 10;

  const pdfFiles: PdfFile[] = [
    { name: 'Lomba Badminton', file: '/LombaBadminton.pdf', category: 'Sports' },
    { name: 'Lomba Cerdas Cermat', file: '/LombaCerdasCermat.pdf', category: 'Academic' },
    { name: 'Lomba E-Sport', file: '/LombaEsportFix.pdf', category: 'E-Sports' },
    { name: 'Lomba Mini Soccer', file: '/LombaMiniSoccer.pdf', category: 'Sports' },
    { name: 'Lomba Pemadan Api', file: '/LombaPemadamApi.pdf', category: 'Safety' },
    { name: 'Lomba Tenis Meja', file: '/LombaTenisMeja.pdf', category: 'Sports' },
  ];

  const allMatches: Match[] = [
    { lomba: 'CERDAS CERMAT', tanggal: '2025-11-26', timYangBertanding: '[A] HELM PROYEK VS [A] RESPIRATOR' },
    { lomba: 'CERDAS CERMAT', tanggal: '2025-11-26', timYangBertanding: '[A] RESPIRATOR VS [A] FACE SHIELD' },
    { lomba: 'CERDAS CERMAT', tanggal: '2025-11-26', timYangBertanding: '[A] FACE SHIELD VS [A] HELM PROYEK' },
    { lomba: 'TENIS MEJA', tanggal: '2025-11-27', timYangBertanding: '[MD 1] TIM PENCEGAHAN VS [MD 1] TIM PEMANTAUAN' },
    { lomba: 'TENIS MEJA', tanggal: '2025-11-27', timYangBertanding: '[MD 2] TIM PENCEGAHAN VS [MD 2] TIM PEMANTAUAN' },
    { lomba: 'TENIS MEJA', tanggal: '2025-11-27', timYangBertanding: '[MD 3] TIM PENCEGAHAN VS [MD 3] TIM PEMANTAUAN' },
    { lomba: 'MINI SOCCER', tanggal: '2025-11-28', timYangBertanding: 'HIMALAYAN THUNDERLIONS VS DENALI RANGERS' },
    { lomba: 'MINI SOCCER', tanggal: '2025-11-28', timYangBertanding: 'FUJI THUNDER VS MERAPI FLAMES' },
    { lomba: 'MINI SOCCER', tanggal: '2025-11-28', timYangBertanding: 'BROMO PHOENIX VS EVEREST BLACKPEAK' },
    { lomba: 'MINI SOCCER', tanggal: '2025-11-28', timYangBertanding: 'KERINCI TIGERS VS KILIMANJARO STORM' },
    { lomba: 'MINI SOCCER', tanggal: '2025-11-28', timYangBertanding: 'HIMALAYAN THUNDERLIONS VS BROMO PHOENIX' },
    { lomba: 'MINI SOCCER', tanggal: '2025-11-28', timYangBertanding: 'MERAPI FLAMES VS KERINCI TIGERS' },
    { lomba: 'BADMINTON [L5]', tanggal: '2025-12-02', timYangBertanding: 'MD Senior – Garuda Smash vs Drop King' },
    { lomba: 'BADMINTON [L4]', tanggal: '2025-12-02', timYangBertanding: 'MD Senior – Thunder Smash vs Focus Rally' },
    { lomba: 'BADMINTON [L5]', tanggal: '2025-12-02', timYangBertanding: 'MD Junior – Garuda Smash vs Drop King' },
    { lomba: 'BADMINTON [L4]', tanggal: '2025-12-02', timYangBertanding: 'MD Junior – Thunder Smash vs Focus Rally' },
    { lomba: 'BADMINTON [L5]', tanggal: '2025-12-02', timYangBertanding: 'WD – Garuda Smash vs Drop King' },
    { lomba: 'BADMINTON [L4]', tanggal: '2025-12-02', timYangBertanding: 'WD – Thunder Smash vs Focus Rally' },
    { lomba: 'E-SPORT [D1]', tanggal: '2025-12-03', timYangBertanding: 'Tim 24 vs Tim 1' },
    { lomba: 'E-SPORT [D1]', tanggal: '2025-12-03', timYangBertanding: 'Tim 28 vs Tim 17' },
    { lomba: 'E-SPORT [D1]', tanggal: '2025-12-03', timYangBertanding: 'Tim 19 vs Tim 2' },
    { lomba: 'E-SPORT [D1]', tanggal: '2025-12-03', timYangBertanding: 'Tim 18 vs Tim 23' },
    { lomba: 'E-SPORT [D2]', tanggal: '2025-12-03', timYangBertanding: 'Tim 15 vs Tim 3' },
    { lomba: 'E-SPORT [D2]', tanggal: '2025-12-03', timYangBertanding: 'Tim 14 vs Tim 29' },
    { lomba: 'E-SPORT [D2]', tanggal: '2025-12-03', timYangBertanding: 'Tim 30 vs Tim 4' },
    { lomba: 'E-SPORT [D2]', tanggal: '2025-12-03', timYangBertanding: 'Tim 16 vs Tim 13' },
    { lomba: 'TENIS MEJA', tanggal: '2025-12-04', timYangBertanding: 'MD 1 – Tim Perlindungan vs Tim Pencegahan' },
    { lomba: 'TENIS MEJA', tanggal: '2025-12-04', timYangBertanding: 'MD 2 – Tim Keselamatan vs Tim Keserasian' },
    { lomba: 'TENIS MEJA', tanggal: '2025-12-04', timYangBertanding: 'MD 3 – Tim Perlindungan vs Tim Pencegahan' },
    { lomba: 'BADMINTON [L5]', tanggal: '2025-12-09', timYangBertanding: 'MD Senior – Defense Crew vs Warrior Serve' },
    { lomba: 'BADMINTON [L4]', tanggal: '2025-12-09', timYangBertanding: 'MD Senior – Magic Net vs Vibe Rally' },
    { lomba: 'BADMINTON [L5]', tanggal: '2025-12-09', timYangBertanding: 'MD Junior – Defense Crew vs Warrior Serve' },
    { lomba: 'BADMINTON [L4]', tanggal: '2025-12-09', timYangBertanding: 'MD Junior – Magic Net vs Vibe Rally' },
    { lomba: 'BADMINTON [L5]', tanggal: '2025-12-09', timYangBertanding: 'WD – Defense Crew vs Warrior Serve' },
    { lomba: 'BADMINTON [L4]', tanggal: '2025-12-09', timYangBertanding: 'WD – Magic Net vs Vibe Rally' },
    { lomba: 'E-SPORT [D1]', tanggal: '2025-12-10', timYangBertanding: 'Tim 31 vs Tim 12' },
    { lomba: 'E-SPORT [D1]', tanggal: '2025-12-10', timYangBertanding: 'Tim 10 vs Tim 5' },
    { lomba: 'E-SPORT [D1]', tanggal: '2025-12-10', timYangBertanding: 'Tim 32 vs Tim 9' },
    { lomba: 'E-SPORT [D1]', tanggal: '2025-12-10', timYangBertanding: 'Tim 11 vs Tim 6' },
    { lomba: 'E-SPORT [D2]', tanggal: '2025-12-10', timYangBertanding: 'Tim 26 vs Tim 25' },
    { lomba: 'E-SPORT [D2]', tanggal: '2025-12-10', timYangBertanding: 'Tim 8 vs Tim 7' },
    { lomba: 'E-SPORT [D2]', tanggal: '2025-12-10', timYangBertanding: 'Tim 22 vs Tim 21' },
    { lomba: 'E-SPORT [D2]', tanggal: '2025-12-10', timYangBertanding: 'Tim 20 vs Tim 27' },
    { lomba: 'TENIS MEJA', tanggal: '2025-12-11', timYangBertanding: 'MD 1 – Tim Pencegahan vs Tim Perlindungan' },
    { lomba: 'TENIS MEJA', tanggal: '2025-12-11', timYangBertanding: 'MD 2 – Tim Keselamatan vs Tim Keserasian' },
    { lomba: 'TENIS MEJA', tanggal: '2025-12-11', timYangBertanding: 'MD 3 – Tim Pemantauan vs Tim Keamanan' },
    { lomba: 'MINI SOCCER', tanggal: '2025-12-12', timYangBertanding: 'FUJI THUNDER VS KERINCI TIGERS' },
    { lomba: 'MINI SOCCER', tanggal: '2025-12-12', timYangBertanding: 'DENALI RANGERS VS EVEREST BLACKPEAK' },
    { lomba: 'MINI SOCCER', tanggal: '2025-12-12', timYangBertanding: 'MERAPI FLAMES VS KILIMANJARO STORM' },
    { lomba: 'MINI SOCCER', tanggal: '2025-12-12', timYangBertanding: 'DENALI RANGERS VS BROMO PHOENIX' },
    { lomba: 'MINI SOCCER', tanggal: '2025-12-12', timYangBertanding: 'FUJI THUNDER VS KILIMANJARO STORM' },
    { lomba: 'MINI SOCCER', tanggal: '2025-12-12', timYangBertanding: 'HIMALAYAN THUNDERLIONS VS EVEREST BLACKPEAK' },
    { lomba: 'BADMINTON [L5]', tanggal: '2025-12-16', timYangBertanding: 'MD Senior – Garuda Smash vs Defense Crew' },
    { lomba: 'BADMINTON [L4]', tanggal: '2025-12-16', timYangBertanding: 'MD Senior – Thunder Smash vs Magic Net' },
    { lomba: 'BADMINTON [L5]', tanggal: '2025-12-16', timYangBertanding: 'MD Junior – Garuda Smash vs Defense Crew' },
    { lomba: 'BADMINTON [L4]', tanggal: '2025-12-16', timYangBertanding: 'MD Junior – Thunder Smash vs Magic Net' },
    { lomba: 'BADMINTON [L5]', tanggal: '2025-12-16', timYangBertanding: 'WD – Garuda Smash vs Defense Crew' },
    { lomba: 'BADMINTON [L4]', tanggal: '2025-12-16', timYangBertanding: 'WD – Thunder Smash vs Magic Net' },
    { lomba: 'E-SPORT [D1]', tanggal: '2025-12-17', timYangBertanding: 'Tim 17 vs Tim 24' },
    { lomba: 'E-SPORT [D1]', tanggal: '2025-12-17', timYangBertanding: 'Tim 1 vs Tim 28' },
    { lomba: 'E-SPORT [D1]', tanggal: '2025-12-17', timYangBertanding: 'Tim 23 vs Tim 19' },
    { lomba: 'E-SPORT [D1]', tanggal: '2025-12-17', timYangBertanding: 'Tim 2 vs Tim 18' },
    { lomba: 'E-SPORT [D2]', tanggal: '2025-12-17', timYangBertanding: 'Tim 29 vs Tim 15' },
    { lomba: 'E-SPORT [D2]', tanggal: '2025-12-17', timYangBertanding: 'Tim 3 vs Tim 14' },
    { lomba: 'E-SPORT [D2]', tanggal: '2025-12-17', timYangBertanding: 'Tim 13 vs Tim 30' },
    { lomba: 'E-SPORT [D2]', tanggal: '2025-12-17', timYangBertanding: 'Tim 4 vs Tim 16' },
    { lomba: 'TENIS MEJA', tanggal: '2025-12-18', timYangBertanding: 'MD 1 – Tim Keserasian vs Tim Keselamatan' },
    { lomba: 'TENIS MEJA', tanggal: '2025-12-18', timYangBertanding: 'MD 2 – Tim Pemantauan vs Tim Perlindungan' },
    { lomba: 'TENIS MEJA', tanggal: '2025-12-18', timYangBertanding: 'MD 3 – Tim Keamanan vs Tim Pencegahan' },
    { lomba: 'BADMINTON [L5]', tanggal: '2025-12-23', timYangBertanding: 'MD Senior – Drop King vs Warrior Serve' },
    { lomba: 'BADMINTON [L4]', tanggal: '2025-12-23', timYangBertanding: 'MD Senior – Focus Rally vs Vibe Rally' },
    { lomba: 'BADMINTON [L5]', tanggal: '2025-12-23', timYangBertanding: 'MD Junior – Drop King vs Warrior Serve' },
    { lomba: 'BADMINTON [L4]', tanggal: '2025-12-23', timYangBertanding: 'MD Junior – Focus Rally vs Vibe Rally' },
    { lomba: 'BADMINTON [L5]', tanggal: '2025-12-23', timYangBertanding: 'WD – Drop King vs Warrior Serve' },
    { lomba: 'BADMINTON [L4]', tanggal: '2025-12-23', timYangBertanding: 'WD – Focus Rally vs Vibe Rally' },
    { lomba: 'E-SPORT [D1]', tanggal: '2025-12-24', timYangBertanding: 'Tim 5 vs Tim 31' },
    { lomba: 'E-SPORT [D1]', tanggal: '2025-12-24', timYangBertanding: 'Tim 12 vs Tim 10' },
    { lomba: 'E-SPORT [D1]', tanggal: '2025-12-24', timYangBertanding: 'Tim 6 vs Tim 32' },
    { lomba: 'E-SPORT [D1]', tanggal: '2025-12-24', timYangBertanding: 'Tim 9 vs Tim 11' },
    { lomba: 'E-SPORT [D2]', tanggal: '2025-12-24', timYangBertanding: 'Tim 7 vs Tim 26' },
    { lomba: 'E-SPORT [D2]', tanggal: '2025-12-24', timYangBertanding: 'Tim 25 vs Tim 8' },
    { lomba: 'E-SPORT [D2]', tanggal: '2025-12-24', timYangBertanding: 'Tim 27 vs Tim 22' },
    { lomba: 'E-SPORT [D2]', tanggal: '2025-12-24', timYangBertanding: 'Tim 21 vs Tim 20' },
    { lomba: 'BADMINTON [L5]', tanggal: '2025-12-30', timYangBertanding: 'MD Senior – Garuda Smash vs Warrior Serve' },
    { lomba: 'BADMINTON [L4]', tanggal: '2025-12-30', timYangBertanding: 'MD Senior – Thunder Smash vs Vibe Rally' },
    { lomba: 'BADMINTON [L5]', tanggal: '2025-12-30', timYangBertanding: 'MD Junior – Garuda Smash vs Warrior Serve' },
    { lomba: 'BADMINTON [L4]', tanggal: '2025-12-30', timYangBertanding: 'MD Junior – Thunder Smash vs Vibe Rally' },
    { lomba: 'BADMINTON [L5]', tanggal: '2025-12-30', timYangBertanding: 'WD – Garuda Smash vs Warrior Serve' },
    { lomba: 'BADMINTON [L4]', tanggal: '2025-12-30', timYangBertanding: 'WD – Thunder Smash vs Vibe Rally' },
    { lomba: 'E-SPORT [D1]', tanggal: '2025-12-31', timYangBertanding: 'Tim 28 vs Tim 24' },
    { lomba: 'E-SPORT [D1]', tanggal: '2025-12-31', timYangBertanding: 'Tim 1 vs Tim 17' },
    { lomba: 'E-SPORT [D1]', tanggal: '2025-12-31', timYangBertanding: 'Tim 18 vs Tim 19' },
    { lomba: 'E-SPORT [D1]', tanggal: '2025-12-31', timYangBertanding: 'Tim 2 vs Tim 23' },
    { lomba: 'E-SPORT [D2]', tanggal: '2025-12-31', timYangBertanding: 'Tim 14 vs Tim 15' },
    { lomba: 'E-SPORT [D2]', tanggal: '2025-12-31', timYangBertanding: 'Tim 3 vs Tim 29' },
    { lomba: 'E-SPORT [D2]', tanggal: '2025-12-31', timYangBertanding: 'Tim 16 vs Tim 30' },
    { lomba: 'E-SPORT [D2]', tanggal: '2025-12-31', timYangBertanding: 'Tim 4 vs Tim 13' },
    { lomba: 'E-SPORT [D1]', tanggal: '2025-12-31', timYangBertanding: 'Tim 10 vs Tim 31' },
    { lomba: 'E-SPORT [D1]', tanggal: '2025-12-31', timYangBertanding: 'Tim 12 vs Tim 5' },
    { lomba: 'E-SPORT [D1]', tanggal: '2025-12-31', timYangBertanding: 'Tim 11 vs Tim 32' },
    { lomba: 'E-SPORT [D1]', tanggal: '2025-12-31', timYangBertanding: 'Tim 9 vs Tim 6' },
    { lomba: 'E-SPORT [D2]', tanggal: '2025-12-31', timYangBertanding: 'Tim 8 vs Tim 26' },
    { lomba: 'E-SPORT [D2]', tanggal: '2025-12-31', timYangBertanding: 'Tim 25 vs Tim 7' },
    { lomba: 'E-SPORT [D2]', tanggal: '2025-12-31', timYangBertanding: 'Tim 20 vs Tim 22' },
    { lomba: 'E-SPORT [D2]', tanggal: '2025-12-31', timYangBertanding: 'Tim 21 vs Tim 27' },
    { lomba: 'BADMINTON [L5]', tanggal: '2026-01-06', timYangBertanding: 'MD Senior – Drop King vs Defense Crew' },
    { lomba: 'BADMINTON [L4]', tanggal: '2026-01-06', timYangBertanding: 'MD Senior – Focus Rally vs Magic Net' },
    { lomba: 'BADMINTON [L5]', tanggal: '2026-01-06', timYangBertanding: 'MD Junior – Drop King vs Defense Crew' },
    { lomba: 'BADMINTON [L4]', tanggal: '2026-01-06', timYangBertanding: 'MD Junior – Focus Rally vs Magic Net' },
    { lomba: 'BADMINTON [L5]', tanggal: '2026-01-06', timYangBertanding: 'WD – Drop King vs Defense Crew' },
    { lomba: 'BADMINTON [L4]', tanggal: '2026-01-06', timYangBertanding: 'WD – Focus Rally vs Magic Net' },
    { lomba: 'TENIS MEJA', tanggal: '2026-01-08', timYangBertanding: 'MD 1 – Tim Perlindungan vs Tim Pencegahan' },
    { lomba: 'TENIS MEJA', tanggal: '2026-01-08', timYangBertanding: 'MD 2 – Tim Keserasian vs Tim Pemantauan' },
    { lomba: 'TENIS MEJA', tanggal: '2026-01-08', timYangBertanding: 'MD 3 – Tim Keselamatan vs Tim Keamanan' },
    { lomba: 'TENIS MEJA', tanggal: '2026-01-15', timYangBertanding: 'SEMIFINAL MD 1 – R1 Group A vs R2 Group B' },
    { lomba: 'TENIS MEJA', tanggal: '2026-01-15', timYangBertanding: 'SEMIFINAL MD 2 – R1 Group A vs R2 Group B' },
    { lomba: 'TENIS MEJA', tanggal: '2026-01-15', timYangBertanding: 'SEMIFINAL MD 3 – R1 Group A vs R2 Group B' },
    { lomba: 'TENIS MEJA', tanggal: '2026-01-15', timYangBertanding: 'SEMIFINAL MD 1 – R1 Group B vs R2 Group A' },
    { lomba: 'TENIS MEJA', tanggal: '2026-01-15', timYangBertanding: 'SEMIFINAL MD 2 – R1 Group B vs R2 Group A' },
    { lomba: 'TENIS MEJA', tanggal: '2026-01-15', timYangBertanding: 'SEMIFINAL MD 3 – R1 Group B vs R2 Group A' },
    { lomba: 'TENIS MEJA', tanggal: '2026-01-22', timYangBertanding: '3RD PLACE – MD 1' },
    { lomba: 'TENIS MEJA', tanggal: '2026-01-22', timYangBertanding: '3RD PLACE – MD 2' },
    { lomba: 'TENIS MEJA', tanggal: '2026-01-22', timYangBertanding: '3RD PLACE – MD 3' },
    { lomba: 'TENIS MEJA', tanggal: '2026-01-29', timYangBertanding: 'FINAL – MD 1' },
    { lomba: 'TENIS MEJA', tanggal: '2026-01-29', timYangBertanding: 'FINAL – MD 2' },
    { lomba: 'TENIS MEJA', tanggal: '2026-01-29', timYangBertanding: 'FINAL – MD 3' },
    { lomba: 'TENIS MEJA', tanggal: '2026-01-29', timYangBertanding: 'EXHIBITION – Pertandingan' },
  ];

  const groupMatchesByWeek = (): WeekGroup[] => {
    const weeks: WeekGroup[] = [];
    const sortedMatches = [...allMatches].sort((a, b) => 
      new Date(a.tanggal).getTime() - new Date(b.tanggal).getTime()
    );

    let currentWeek: WeekGroup | null = null;
    let weekNumber = 1;

    sortedMatches.forEach(match => {
      const matchDate = new Date(match.tanggal);
      
      if (!currentWeek) {
        currentWeek = {
          weekNumber,
          weekLabel: `Week ${weekNumber}`,
          startDate: match.tanggal,
          endDate: match.tanggal,
          matches: [match]
        };
      } else {
        const weekStart = new Date(currentWeek.startDate);
        const daysDiff = Math.floor((matchDate.getTime() - weekStart.getTime()) / (1000 * 60 * 60 * 24));
        
        if (daysDiff <= 6) {
          currentWeek.matches.push(match);
          currentWeek.endDate = match.tanggal;
        } else {
          weeks.push(currentWeek);
          weekNumber++;
          currentWeek = {
            weekNumber,
            weekLabel: `Week ${weekNumber}`,
            startDate: match.tanggal,
            endDate: match.tanggal,
            matches: [match]
          };
        }
      }
    });

    if (currentWeek) {
      weeks.push(currentWeek);
    }

    return weeks;
  };

  const weekGroups = groupMatchesByWeek();

  const getFilteredMatches = (): Match[] => {
    let filtered = allMatches;

    if (searchQuery) {
      filtered = filtered.filter(match => 
        match.lomba.toLowerCase().includes(searchQuery.toLowerCase()) ||
        match.timYangBertanding.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (startDate && endDate) {
      filtered = filtered.filter(match => {
        const matchDate = match.tanggal;
        return matchDate >= startDate && matchDate <= endDate;
      });
    }

    return filtered;
  };

  const filteredMatches = getFilteredMatches();
  
  // Pagination calculations
  const totalPages = Math.ceil(filteredMatches.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentMatches = filteredMatches.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  const handleFilterChange = () => {
    setCurrentPage(1);
  };

  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options);
  };

  const openPdf = (file: string) => {
    setSelectedPdf(file);
    setShowPdfModal(true);
  };

  const closePdfModal = () => {
    setShowPdfModal(false);
    setSelectedPdf('');
  };

  const resetFilters = () => {
    setSearchQuery('');
    setStartDate('');
    setEndDate('');
    setCurrentPage(1);
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <header className="relative border-b bg-gradient-to-br from-white via-blue-50/30 to-white backdrop-blur-sm">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-6 md:py-8 relative z-10">
        <div className="flex items-center justify-between gap-4">
          {/* Logo & Title Section */}
          <div className="flex items-center gap-3 md:gap-4 flex-1 min-w-0">
            {/* Logo with glow effect */}
            <div className="relative flex-shrink-0 group">
              <div className="absolute inset-0 bg-[#3f69fb] rounded-xl md:rounded-2xl blur-md opacity-30 group-hover:opacity-50 transition-all duration-300"></div>
              <Image
                src="/logo.png"
                alt="Bulan K3 SIG"
                width={48}
                height={48}
                className="rounded-xl md:rounded-2xl relative z-10 shadow-xl md:w-16 md:h-16 w-12 h-12"
                priority
              />
            </div>

            {/* Title & Subtitle */}
            <div className="min-w-0 flex-1">
              <h1 className="text-xl md:text-3xl font-bold bg-gradient-to-r from-neutral-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent truncate">
                Bulan K3 SIG
              </h1>
              <p className="text-xs md:text-sm text-neutral-500 mt-0.5 truncate">#befitbesafebeachampion</p>
            </div>
          </div>

          {/* Schedule Button - Compact on Mobile */}
          <button
            onClick={() => setShowSchedule(!showSchedule)}
            className="flex-shrink-0 group relative overflow-hidden"
          >
            {/* Button glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg md:rounded-xl opacity-100 group-hover:opacity-90 transition-opacity"></div>
            
            {/* Button content */}
            <div className="relative px-3 py-2 md:px-5 md:py-3 flex items-center gap-1.5 md:gap-2">
              <CalendarIcon />
              <span className="text-white font-semibold text-sm md:text-base hidden sm:inline">
                {showSchedule ? 'Hide' : 'Schedule'}
              </span>
            </div>

            {/* Shine effect on hover */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          </button>
        </div>

      </div>
    </header>

      <main className="container mx-auto px-4 py-8">
        {/* Schedule Section */}
        {showSchedule && (
          <div className="mb-12">
            <div className="bg-white rounded-xl border border-blue-100 shadow-lg overflow-hidden">
              {/* Schedule Header with Week Navigation */}
              <div className="bg-gradient-to-r from-[#3f69fb] to-[#5b7efb] px-6 py-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-white">Competition Schedule</h2>
                    <p className="text-blue-100 mt-1">View matches by week</p>
                  </div>
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors backdrop-blur-sm"
                  >
                    <FilterIcon />
                    {showFilters ? 'Hide Filters' : 'Show Filters'}
                  </button>
                </div>
              </div>

              {/* Filters - Collapsible */}
              {showFilters && (
                <div className="border-b bg-gradient-to-r from-blue-50 to-white px-6 py-6">
                  <div className="space-y-4">
                    {/* Search Bar */}
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Search Matches
                      </label>
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2">
                          <SearchIcon />
                        </div>
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => {
                            setSearchQuery(e.target.value);
                            handleFilterChange();
                          }}
                          placeholder="Search by competition or team name..."
                          className="w-full pl-10 pr-4 py-2.5 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3f69fb] focus:border-transparent transition-all text-neutral-900"
                        />
                      </div>
                    </div>

                    {/* Date Range Filter */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                          Start Date
                        </label>
                        <input
                          type="date"
                          value={startDate}
                          onChange={(e) => {
                            setStartDate(e.target.value);
                            handleFilterChange();
                          }}
                          className="w-full px-3 py-2.5 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3f69fb] focus:border-transparent transition-all text-neutral-900"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                          End Date
                        </label>
                        <input
                          type="date"
                          value={endDate}
                          onChange={(e) => {
                            setEndDate(e.target.value);
                            handleFilterChange();
                          }}
                          className="w-full px-3 py-2.5 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3f69fb] focus:border-transparent transition-all text-neutral-900"
                        />
                      </div>
                    </div>

                    {/* Reset Button */}
                    <div className="flex justify-end">
                      <button
                        onClick={resetFilters}
                        className="inline-flex items-center gap-2 px-4 py-2 border border-blue-300 text-[#3f69fb] rounded-lg hover:bg-blue-50 transition-colors"
                      >
                        <RefreshIcon />
                        Reset Filters
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Table - Desktop */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-blue-50 to-blue-100 border-b border-blue-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-bold text-[#3f69fb] uppercase tracking-wider">
                        No
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-[#3f69fb] uppercase tracking-wider">
                        Competition
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-[#3f69fb] uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-[#3f69fb] uppercase tracking-wider">
                        Match
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-blue-100">
                    {currentMatches.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="px-6 py-12 text-center text-neutral-500">
                          No matches found
                        </td>
                      </tr>
                    ) : (
                      currentMatches.map((match, index) => (
                        <tr key={index} className="hover:bg-blue-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-700">
                            {index + 1}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-[#3f69fb] to-[#5b7efb] text-white shadow-sm">
                              {match.lomba}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900 font-medium">
                            {formatDate(match.tanggal)}
                          </td>
                          <td className="px-6 py-4 text-sm text-neutral-700">
                            {match.timYangBertanding}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Cards - Mobile */}
              <div className="md:hidden divide-y divide-blue-100">
                {currentMatches.length === 0 ? (
                  <div className="px-6 py-12 text-center text-neutral-500">
                    No matches found
                  </div>
                ) : (
                  currentMatches.map((match, index) => (
                    <div key={index} className="px-6 py-4 hover:bg-blue-50 transition-colors">
                      <div className="flex items-start justify-between mb-3">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-[#3f69fb] to-[#5b7efb] text-white shadow-sm">
                          {match.lomba}
                        </span>
                        <span className="text-xs font-medium text-neutral-500">#{startIndex + index + 1}</span>
                      </div>
                      <p className="text-sm text-neutral-600 font-medium mb-2">
                        {formatDate(match.tanggal)}
                      </p>
                      <p className="text-sm text-neutral-900 font-medium">
                        {match.timYangBertanding}
                      </p>
                    </div>
                  ))
                )}
              </div>

              {/* Pagination */}
              {filteredMatches.length > itemsPerPage && (
                <div className="border-t bg-white px-6 py-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-neutral-600">
                      Page <span className="font-medium">{currentPage}</span> of <span className="font-medium">{totalPages}</span>
                    </p>
                    
                    <div className="flex items-center gap-2">
                      <button
                        onClick={goToPrevPage}
                        disabled={currentPage === 1}
                        className="p-2 text-neutral-700 hover:bg-blue-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed border border-neutral-300"
                      >
                        <ChevronLeftIcon />
                      </button>

                      {/* Page Numbers */}
                      <div className="hidden sm:flex items-center gap-1">
                        {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                          let pageNum;
                          if (totalPages <= 5) {
                            pageNum = i + 1;
                          } else if (currentPage <= 3) {
                            pageNum = i + 1;
                          } else if (currentPage >= totalPages - 2) {
                            pageNum = totalPages - 4 + i;
                          } else {
                            pageNum = currentPage - 2 + i;
                          }
                          
                          return (
                            <button
                              key={pageNum}
                              onClick={() => goToPage(pageNum)}
                              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                currentPage === pageNum
                                  ? 'bg-[#3f69fb] text-white shadow-sm'
                                  : 'text-neutral-700 hover:bg-blue-50 border border-neutral-300'
                              }`}
                            >
                              {pageNum}
                            </button>
                          );
                        })}
                      </div>

                      <button
                        onClick={goToNextPage}
                        disabled={currentPage === totalPages}
                        className="p-2 text-neutral-700 hover:bg-blue-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed border border-neutral-300"
                      >
                        <ChevronRightIcon />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Documents Section */}
        <div>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-neutral-900">Competition Documents</h2>
            <p className="text-sm text-neutral-600 mt-1">Access official competition guidelines and schedules</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pdfFiles.map((pdf, index) => (
              <div
                key={index}
                onClick={() => openPdf(pdf.file)}
                className="group bg-white rounded-xl border border-blue-100 shadow-md hover:shadow-xl transition-all cursor-pointer overflow-hidden hover:border-[#3f69fb]"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg group-hover:from-blue-100 group-hover:to-blue-200 transition-colors">
                      <FileTextIcon />
                    </div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-blue-100 text-[#3f69fb]">
                      {pdf.category}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2 group-hover:text-[#3f69fb] transition-colors">
                    {pdf.name}
                  </h3>
                  
                  <div className="flex items-center justify-between text-sm text-neutral-600">
                    <span>PDF Document</span>
                    <span className="text-neutral-400 group-hover:text-[#3f69fb] group-hover:translate-x-1 transition-all">→</span>
                  </div>
                </div>
                
                <div className="h-1 bg-gradient-to-r from-[#3f69fb] to-[#5b7efb] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* PDF Modal */}
      {showPdfModal && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closePdfModal}></div>
          
          <div className="relative h-full flex items-center justify-center p-4">
            <div className="relative w-full max-w-6xl h-[90vh] bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col">
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b bg-gradient-to-r from-[#3f69fb] to-[#5b7efb]">
                <div className="flex items-center gap-3">
                  <FileTextIconSmall />
                  <h3 className="text-lg font-semibold text-white">Document Viewer</h3>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={selectedPdf}
                    download
                    className="inline-flex items-center gap-2 px-3 py-2 text-sm bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors backdrop-blur-sm"
                  >
                    <DownloadIcon />
                    Download
                  </a>
                  <button
                    onClick={closePdfModal}
                    className="inline-flex items-center justify-center w-9 h-9 text-white hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <XIcon />
                  </button>
                </div>
              </div>

              {/* PDF Viewer */}
              <div className="flex-1 relative bg-neutral-100">
                <iframe
                  src={selectedPdf}
                  className="absolute inset-0 w-full h-full"
                  title="PDF Preview"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}