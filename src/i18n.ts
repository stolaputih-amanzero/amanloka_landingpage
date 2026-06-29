export type Language = 'en' | 'id';

export const translations = {
  en: {
    nav: {
      hero: 'Hero',
      vision: 'Vision',
      impact: 'Impact',
      ecosystem: 'Ecosystem',
      intelligence: 'Intelligence',
      testimonials: 'Testimonials',
      faq: 'FAQ',
      studio: 'Studio',
      contact: 'Contact Us',
    },
    hero: {
      titleLine1: 'Global Digital',
      titleLine2: 'Ecosystem.',
      description: 'The parent platform within the AMAN ecosystem. Providing diverse digital tools to support governance, collaboration, productivity, and sustainability.',
      cta: 'Discover Amanloka',
    },
    vision: {
      subtitle: 'Global Vision',
      titlePart1: '"Creating a universal digital ecosystem that empowers ',
      titleHighlight: 'organizations, communities, and individuals',
      titlePart2: ' to thrive in a connected, transparent, and sustainable manner."',
      missionSubtitle: 'Global Mission',
      missions: [
        'Provide adaptive tools for various user scales, from individuals to large enterprises.',
        'Foster cross-boundary collaboration seamlessly (Organization ↔ Community ↔ Personal).',
        'Deliver a digital operating system that is inherently modular and inclusive.',
        'Serve as the technological foundation supporting sustainability and relentless innovation.',
      ],
    },
    impact: {
      projects: 'Projects Completed',
      community: 'Community Members',
      tools: 'Digital Tools Available',
    },
    ecosystem: {
      subtitle: 'Core Products & Tools',
      titlePart1: 'A Flexible ',
      titleHighlight: 'Technology Hub.',
      description: 'Modular solutions designed to adapt to your needs, functioning as a seamless ecosystem for internal operations and external engagement.',
      products: [
        {
          title: "Governance OS",
          desc: "Digital operating system for organizational governance. Features vision-mission dashboards, role management, KPI monitoring, and SOP documentation.",
          specs: [
            { label: "Core Architecture", value: "Role-Based Access Control (RBAC) with hierarchical nodes." },
            { label: "KPI Tracking", value: "Real-time OKR and KPI visualization dashboards." },
            { label: "Documentation", value: "Version-controlled SOPs and policy management." },
            { label: "Integration", value: "RESTful API and Webhook support for external synchronization." }
          ]
        },
        {
          title: "Community Hub",
          desc: "Comprehensive platform for community collaboration. Includes robust forums, event management, crowdfunding capabilities, and knowledge bases.",
          specs: [
            { label: "Communication", value: "Threaded forums, direct messaging, and group broadcasts." },
            { label: "Events", value: "Ticketing, RSVP management, and virtual event links." },
            { label: "Funding", value: "Integrated payment gateways for transparent crowdfunding." },
            { label: "Knowledge", value: "Wiki-style documentation and resource sharing." }
          ]
        },
        {
          title: "Personal Productivity",
          desc: "Integrated task managers, habit trackers, and digital journaling. Seamlessly synchronizes with your calendar, email, and cloud storage.",
          specs: [
            { label: "Task Management", value: "Kanban boards, list views, and advanced filtering." },
            { label: "Habit Tracking", value: "Streak counters, visual heatmaps, and reminders." },
            { label: "Journaling", value: "Rich-text editor with mood tagging and media attachments." },
            { label: "Sync", value: "Bi-directional sync with Google Calendar, Outlook, and Apple Calendar." }
          ]
        },
        {
          title: "Data & Analytics Suite",
          desc: "Real-time data visualization providing AI-powered insights tailored for both large organizations and individual users.",
          specs: [
            { label: "Visualization", value: "Interactive charts, graphs, and geospatial mapping." },
            { label: "AI Insights", value: "Predictive analytics and automated trend detection." },
            { label: "Data Sources", value: "Connectors for SQL, NoSQL, APIs, and flat files." },
            { label: "Reporting", value: "Scheduled automated reports and exportable dashboards." }
          ]
        },
        {
          title: "Learning & Capacity",
          desc: "Advanced e-learning platform featuring training modules and verified digital certification for organization and community members.",
          specs: [
            { label: "Course Authoring", value: "Drag-and-drop course builder with multimedia support." },
            { label: "Assessments", value: "Quizzes, assignments, and peer-reviewed projects." },
            { label: "Certification", value: "Blockchain-verified digital certificates and badges." },
            { label: "Analytics", value: "Learner progress tracking and cohort performance metrics." }
          ]
        },
        {
          title: "Amanloka OS",
          desc: "A foundational operating system installable on any device. Provides a modular ecosystem of internal AMAN applications with a plug-in architecture.",
          specs: [
            { label: "Environment", value: "Cross-platform compatibility (Windows, macOS, Linux, Web)." },
            { label: "Modularity", value: "Plug-and-play architecture for seamless app extensions." },
            { label: "Security", value: "End-to-end encryption and zero-trust security model." },
            { label: "Offline Mode", value: "Robust local-first syncing for offline productivity." }
          ]
        }
      ],
      learnMore: 'Learn More',
      specsTitle: 'Detailed Specifications',
    },
    intelligence: {
      subtitle: 'AI Integration',
      titlePart1: 'Conversational',
      titleHighlight: 'Brilliance.',
      description: 'Engage with the AMAN Assistant, a sophisticated multi-turn AI capable of handling complex logic, offering insights, and maintaining rich context across your ecosystem.',
    },
    studio: {
      subtitle: 'Creative Engine',
      titlePart1: 'Manifest',
      titleHighlight: 'Your Vision.',
      description: 'Transform thoughts into breathtaking reality. Our integrated studio utilizes advanced generative models to produce high-fidelity imagery at 1K, 2K, or breathtaking 4K resolution.',
      features: [
        {
          title: 'Hyper-Realistic Generation',
          desc: 'Achieve photorealistic outputs with nuanced lighting, textures, and depth of field.'
        },
        {
          title: 'Brand Consistency',
          desc: 'Train models on your specific organizational visual identity for perfectly aligned assets.'
        },
        {
          title: 'Infinite Iteration',
          desc: 'Rapidly prototype concepts, modify styles, and explore variations in seconds.'
        }
      ],
    },
    footer: {
      copyright: 'ALL RIGHTS RESERVED.',
      tagline: 'Amanloka Global Digital Ecosystem',
    },
    contact: {
      title: 'Contact Us',
      subtitle: 'Get in Touch',
      description: 'Interested in implementing Amanloka OS for your organization or community? Reach out to our core team.',
      form: {
        name: 'Name',
        email: 'Email',
        message: 'Message',
        submit: 'Send Message',
      },
      info: {
        title: 'Company Information',
        email: 'hello@amanloka.com',
        location: 'Jakarta, Indonesia',
      }
    },
    testimonials: {
      subtitle: 'Client Stories',
      titlePart1: 'Trusted by ',
      titleHighlight: 'Visionaries',
      items: [
        {
          quote: "Amanloka OS has fundamentally transformed how our organization approaches digital infrastructure. The elegance and raw performance are unparalleled.",
          author: "Sarah Jenkins",
          role: "CTO, Nexus Tech",
          company: "Nexus"
        },
        {
          quote: "The seamless integration of AI capabilities within the ecosystem allowed us to scale our operations globally without sacrificing design quality.",
          author: "David Chen",
          role: "Director of Innovation, Global Corp",
          company: "Global"
        },
        {
          quote: "A true masterclass in digital craftsmanship. Amanloka provides not just a product, but a complete philosophy for modern enterprise.",
          author: "Elena Rodriguez",
          role: "CEO, Stellar Enterprises",
          company: "Stellar"
        }
      ]
    },
    faq: {
      subtitle: 'Clarification',
      titlePart1: 'Frequently Asked ',
      titleHighlight: 'Questions',
      items: [
        {
          question: "What is Amanloka OS?",
          answer: "Amanloka OS is a foundational operating system designed to run on any device. It provides a modular ecosystem for both internal operations and external engagement, with a strong focus on design, security, and AI integration."
        },
        {
          question: "Can I customize the platform for my organization?",
          answer: "Absolutely. Our ecosystem is built on a plug-and-play architecture, allowing seamless extension and deep customization to fit your specific operational needs and brand identity."
        },
        {
          question: "How is data security handled?",
          answer: "We employ end-to-end encryption and a zero-trust security model. Your data remains yours, fully protected by state-of-the-art security protocols embedded at the core of our infrastructure."
        },
        {
          question: "Does it support offline functionality?",
          answer: "Yes, Amanloka OS features robust local synchronization, ensuring uninterrupted productivity even when disconnected from the network."
        }
      ]
    }
  },
  id: {
    nav: {
      hero: 'Beranda',
      vision: 'Visi',
      impact: 'Dampak',
      ecosystem: 'Ekosistem',
      intelligence: 'Kecerdasan',
      testimonials: 'Testimoni',
      faq: 'FAQ',
      studio: 'Studio',
      contact: 'Hubungi Kami',
    },
    hero: {
      titleLine1: 'Ekosistem Digital',
      titleLine2: 'Global.',
      description: 'Platform induk dalam ekosistem AMAN. Menyediakan berbagai alat digital untuk mendukung tata kelola, kolaborasi, produktivitas, dan keberlanjutan.',
      cta: 'Temukan Amanloka',
    },
    vision: {
      subtitle: 'Visi Global',
      titlePart1: '"Menciptakan ekosistem digital universal yang memberdayakan ',
      titleHighlight: 'organisasi, komunitas, dan individu',
      titlePart2: ' untuk berkembang secara terhubung, transparan, dan berkelanjutan."',
      missionSubtitle: 'Misi Global',
      missions: [
        'Menyediakan alat adaptif untuk berbagai skala pengguna, dari individu hingga perusahaan besar.',
        'Mendorong kolaborasi lintas batas secara mulus (Organisasi ↔ Komunitas ↔ Personal).',
        'Memberikan sistem operasi digital yang pada dasarnya modular dan inklusif.',
        'Berfungsi sebagai landasan teknologi yang mendukung keberlanjutan dan inovasi tanpa henti.',
      ],
    },
    impact: {
      projects: 'Proyek Selesai',
      community: 'Anggota Komunitas',
      tools: 'Alat Digital Tersedia',
    },
    ecosystem: {
      subtitle: 'Produk & Alat Inti',
      titlePart1: 'Pusat Teknologi ',
      titleHighlight: 'Fleksibel.',
      description: 'Solusi modular yang dirancang untuk beradaptasi dengan kebutuhan Anda, berfungsi sebagai ekosistem tanpa batas untuk operasi internal dan keterlibatan eksternal.',
      products: [
        {
          title: "OS Tata Kelola",
          desc: "Sistem operasi digital untuk tata kelola organisasi. Dilengkapi dasbor visi-misi, manajemen peran, pemantauan KPI, dan dokumentasi SOP.",
          specs: [
            { label: "Arsitektur Inti", value: "Kontrol Akses Berbasis Peran (RBAC) dengan node hierarkis." },
            { label: "Pelacakan KPI", value: "Dasbor visualisasi OKR dan KPI waktu nyata." },
            { label: "Dokumentasi", value: "SOP dan manajemen kebijakan dengan kontrol versi." },
            { label: "Integrasi", value: "Dukungan RESTful API dan Webhook untuk sinkronisasi eksternal." }
          ]
        },
        {
          title: "Pusat Komunitas",
          desc: "Platform komprehensif untuk kolaborasi komunitas. Termasuk forum tangguh, manajemen acara, kemampuan crowdfunding, dan basis pengetahuan.",
          specs: [
            { label: "Komunikasi", value: "Forum berulir, pesan langsung, dan siaran grup." },
            { label: "Acara", value: "Penjualan tiket, manajemen RSVP, dan tautan acara virtual." },
            { label: "Pendanaan", value: "Gerbang pembayaran terintegrasi untuk crowdfunding transparan." },
            { label: "Pengetahuan", value: "Dokumentasi gaya Wiki dan berbagi sumber daya." }
          ]
        },
        {
          title: "Produktivitas Personal",
          desc: "Manajer tugas terintegrasi, pelacak kebiasaan, dan penjurnalan digital. Menyinkronkan dengan mulus dengan kalender, email, dan penyimpanan cloud Anda.",
          specs: [
            { label: "Manajemen Tugas", value: "Papan Kanban, tampilan daftar, dan pemfilteran lanjutan." },
            { label: "Pelacakan Kebiasaan", value: "Penghitung beruntun, peta panas visual, dan pengingat." },
            { label: "Jurnal", value: "Editor teks kaya dengan penandaan suasana hati dan lampiran media." },
            { label: "Sinkronisasi", value: "Sinkronisasi dua arah dengan Google Calendar, Outlook, dan Apple Calendar." }
          ]
        },
        {
          title: "Suite Data & Analitik",
          desc: "Visualisasi data waktu nyata yang memberikan wawasan bertenaga AI yang disesuaikan untuk organisasi besar maupun pengguna individu.",
          specs: [
            { label: "Visualisasi", value: "Bagan interaktif, grafik, dan pemetaan geospasial." },
            { label: "Wawasan AI", value: "Analisis prediktif dan deteksi tren otomatis." },
            { label: "Sumber Data", value: "Konektor untuk SQL, NoSQL, API, dan file datar." },
            { label: "Pelaporan", value: "Laporan otomatis terjadwal dan dasbor yang dapat diekspor." }
          ]
        },
        {
          title: "Pembelajaran & Kapasitas",
          desc: "Platform e-learning tingkat lanjut yang menampilkan modul pelatihan dan sertifikasi digital terverifikasi untuk anggota organisasi dan komunitas.",
          specs: [
            { label: "Pembuatan Kursus", value: "Pembuat kursus seret dan lepas dengan dukungan multimedia." },
            { label: "Penilaian", value: "Kuis, tugas, dan proyek yang ditinjau sejawat." },
            { label: "Sertifikasi", value: "Sertifikat digital dan lencana yang diverifikasi Blockchain." },
            { label: "Analitik", value: "Pelacakan kemajuan pelajar dan metrik kinerja kohort." }
          ]
        },
        {
          title: "Amanloka OS",
          desc: "Sistem operasi dasar yang dapat diinstal pada perangkat apa pun. Menyediakan ekosistem modular aplikasi AMAN internal dengan arsitektur plug-in.",
          specs: [
            { label: "Lingkungan", value: "Kompatibilitas lintas platform (Windows, macOS, Linux, Web)." },
            { label: "Modularitas", value: "Arsitektur plug-and-play untuk ekstensi aplikasi tanpa batas." },
            { label: "Keamanan", value: "Enkripsi end-to-end dan model keamanan zero-trust." },
            { label: "Mode Offline", value: "Sinkronisasi lokal yang tangguh untuk produktivitas offline." }
          ]
        }
      ],
      learnMore: 'Pelajari Lebih Lanjut',
      specsTitle: 'Spesifikasi Detil',
    },
    intelligence: {
      subtitle: 'Integrasi AI',
      titlePart1: 'Kecerdasan',
      titleHighlight: 'Percakapan.',
      description: 'Berinteraksi dengan Asisten AMAN, AI multi-giliran canggih yang mampu menangani logika kompleks, menawarkan wawasan, dan mempertahankan konteks yang kaya di seluruh ekosistem Anda.',
    },
    studio: {
      subtitle: 'Mesin Kreatif',
      titlePart1: 'Wujudkan',
      titleHighlight: 'Visi Anda.',
      description: 'Ubah pikiran menjadi kenyataan yang menakjubkan. Studio terintegrasi kami memanfaatkan model generatif canggih untuk menghasilkan citra fidelitas tinggi pada resolusi 1K, 2K, atau bahkan 4K yang menakjubkan.',
      features: [
        {
          title: 'Pembuatan Super Realistis',
          desc: 'Raih keluaran fotorealistik dengan pencahayaan, tekstur, dan kedalaman bidang yang bernuansa.'
        },
        {
          title: 'Konsistensi Merek',
          desc: 'Latih model pada identitas visual organisasi spesifik Anda untuk aset yang selaras sempurna.'
        },
        {
          title: 'Iterasi Tanpa Batas',
          desc: 'Prototipe konsep dengan cepat, ubah gaya, dan jelajahi variasi dalam hitungan detik.'
        }
      ],
    },
    footer: {
      copyright: 'HAK CIPTA DILINDUNGI.',
      tagline: 'Ekosistem Digital Global Amanloka',
    },
    contact: {
      title: 'Hubungi Kami',
      subtitle: 'Mari Berbincang',
      description: 'Tertarik untuk mengimplementasikan Amanloka OS untuk organisasi atau komunitas Anda? Hubungi tim inti kami.',
      form: {
        name: 'Nama',
        email: 'Email',
        message: 'Pesan',
        submit: 'Kirim Pesan',
      },
      info: {
        title: 'Informasi Perusahaan',
        email: 'hello@amanloka.com',
        location: 'Jakarta, Indonesia',
      }
    },
    testimonials: {
      subtitle: 'Cerita Klien',
      titlePart1: 'Dipercaya oleh ',
      titleHighlight: 'Visioner',
      items: [
        {
          quote: "Amanloka OS secara fundamental telah mengubah pendekatan organisasi kami terhadap infrastruktur digital. Keanggunan dan performa mentahnya tidak tertandingi.",
          author: "Sarah Jenkins",
          role: "CTO, Nexus Tech",
          company: "Nexus"
        },
        {
          quote: "Integrasi kemampuan AI yang mulus di dalam ekosistem memungkinkan kami memperluas skala operasi secara global tanpa mengorbankan kualitas desain.",
          author: "David Chen",
          role: "Direktur Inovasi, Global Corp",
          company: "Global"
        },
        {
          quote: "Sebuah mahakarya sejati dalam keterampilan digital. Amanloka tidak hanya memberikan produk, tetapi filosofi lengkap untuk perusahaan modern.",
          author: "Elena Rodriguez",
          role: "CEO, Stellar Enterprises",
          company: "Stellar"
        }
      ]
    },
    faq: {
      subtitle: 'Klarifikasi',
      titlePart1: 'Pertanyaan yang Sering ',
      titleHighlight: 'Diajukan',
      items: [
        {
          question: "Apa itu Amanloka OS?",
          answer: "Amanloka OS adalah sistem operasi dasar yang dirancang untuk berjalan di perangkat apa pun. Menyediakan ekosistem modular untuk operasi internal dan keterlibatan eksternal, dengan fokus kuat pada desain, keamanan, dan integrasi AI."
        },
        {
          question: "Bisakah saya menyesuaikan platform untuk organisasi saya?",
          answer: "Tentu saja. Ekosistem kami dibangun di atas arsitektur plug-and-play, memungkinkan ekstensi tanpa hambatan dan penyesuaian mendalam untuk memenuhi kebutuhan operasional spesifik dan identitas merek Anda."
        },
        {
          question: "Bagaimana keamanan data ditangani?",
          answer: "Kami menggunakan enkripsi end-to-end dan model keamanan zero-trust. Data Anda tetap menjadi milik Anda, dilindungi sepenuhnya oleh protokol keamanan canggih yang tertanam pada inti infrastruktur kami."
        },
        {
          question: "Apakah mendukung fungsionalitas offline?",
          answer: "Ya, Amanloka OS memiliki sinkronisasi lokal yang tangguh, memastikan produktivitas yang tidak terganggu bahkan saat terputus dari jaringan."
        }
      ]
    }
  }
};
