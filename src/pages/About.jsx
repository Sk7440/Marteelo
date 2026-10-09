import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from 'lucide-react';
import {
  SafetyCertificateOutlined,
  ThunderboltOutlined,
  GlobalOutlined,
  SmileOutlined,
  ArrowRightOutlined
} from '@ant-design/icons';

export default function AboutPage() {
  const navigate = useNavigate();

  const stats = [
    { label: 'Active Customers', value: '45K+' },
    { label: 'Curated Products', value: '1,200+' },
    { label: 'Global Destinations', value: '30+' },
    { label: 'Customer Satisfaction', value: '99.4%' },
  ];

  const values = [
    {
      icon: <SafetyCertificateOutlined className="text-xl" />,
      title: 'Uncompromised Quality',
      desc: 'Har product premium materials aur strict quality standards ke tehat banaya aur test kiya jata hai.'
    },
    {
      icon: <ThunderboltOutlined className="text-xl" />,
      title: 'Fast & Reliable',
      desc: 'Hassle-free shopping experience ke sath tez tareen fulfillment aur continuous delivery tracking.'
    },
    {
      icon: <GlobalOutlined className="text-xl" />,
      title: 'Ethical & Conscious',
      desc: 'Ham sustainable sourcing aur eco-friendly packaging par believe rakhte hain taake impact positive rahe.'
    },
    {
      icon: <SmileOutlined className="text-xl" />,
      title: 'Dedicated Support',
      desc: '24/7 dedicated support team jo aapke har sawal aur feedback ke liye hamesha tayar rehti hai.'
    }
  ];

  const team = [
    {
      name: 'Elena Rostova',
      role: 'Head of Curation & Design',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80'
    },
    {
      name: 'Marcus Vance',
      role: 'Lead Product Architect',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80'
    },
    {
      name: 'Sana Malik',
      role: 'Operations & Sustainability Lead',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80'
    }
  ];

  return (
    <div className="w-full min-h-screen bg-[#fbfbfd] text-neutral-900 antialiased font-sans">
      {/* Header Section */}
      <section className="border-b border-neutral-200/80 bg-white/70 backdrop-blur-md pt-16 pb-14 px-4 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-3">
            <button
              onClick={() => navigate(-1)}
              className="p-1 -ml-1 text-neutral-700 hover:text-neutral-950 transition-colors"
              aria-label="Go Back"
            >
              <ArrowLeftIcon className="w-5 h-5" />
            </button>
            <span className="w-2 h-2 rounded-full bg-neutral-900" />
            <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-neutral-500">
              Our Story & Philosophy
            </span>
          </div>

          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-6xl font-light tracking-tight text-neutral-900 leading-[1.1]">
              Built for purpose, refined for <span className="font-serif italic font-normal text-neutral-700">everyday life</span>.
            </h1>
            <p className="text-neutral-500 text-sm sm:text-base mt-4 leading-relaxed">
              Hamara maqsad modern aesthetics aur daily functionality ko milana hai. Ham ordinary cheezon ko elevate karte hain taake aapko authentic aur durable lifestyle products mil sakein.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-16 space-y-20">
        
        {/* Visual Brand Showcase */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 relative aspect-[16/10] rounded-2xl overflow-hidden border border-neutral-200/80 shadow-sm bg-neutral-100">
            <img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1400&q=80"
              alt="Design Philosophy"
              className="w-full h-full object-cover object-center"
            />
          </div>
          <div className="lg:col-span-5 flex flex-col justify-center space-y-4">
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-400">
              The Mission
            </span>
            <h2 className="text-2xl sm:text-3xl font-light text-neutral-900">
              Less noise, more deliberate craft.
            </h2>
            <p className="text-neutral-500 text-xs sm:text-sm leading-relaxed">
              Khatam na hone wali fast-fashion aur cheap materials ke daur mein, ham slow, deliberate aur sustainable quality ko tarjeeh dete hain. Har collection bohot bareek-bini se select ki jati hai taake har item aapke paas saalon tak chal sake.
            </p>
            <div className="pt-2">
              <button
                onClick={() => navigate('/products')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-neutral-950 text-white text-xs font-medium uppercase tracking-wider hover:bg-neutral-800 transition-colors"
              >
                Explore Catalog <ArrowRightOutlined className="text-[10px]" />
              </button>
            </div>
          </div>
        </section>

        {/* Stats Strip */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-6 py-10 border-y border-neutral-200/80 bg-white/40 rounded-2xl px-6">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center md:text-left">
              <div className="text-2xl sm:text-3xl font-semibold font-mono text-neutral-900">
                {stat.value}
              </div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </section>

        {/* Core Values */}
        <section className="space-y-8">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-400">
              Our Principles
            </span>
            <h2 className="text-3xl font-light text-neutral-900 mt-1">
              What sets us apart
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val) => (
              <div
                key={val.title}
                className="p-6 bg-white rounded-2xl border border-neutral-200/80 hover:border-neutral-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-800 mb-4">
                    {val.icon}
                  </div>
                  <h3 className="text-sm font-medium text-neutral-900 mb-2">{val.title}</h3>
                  <p className="text-xs text-neutral-500 leading-relaxed">{val.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section className="space-y-8 pt-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-400">
                The Curators
              </span>
              <h2 className="text-3xl font-light text-neutral-900 mt-1">
                Meet our team
              </h2>
            </div>
            <p className="text-xs text-neutral-500 max-w-sm">
              Designers, developers, aur collectors jo quality lifestyle ko har roz shape dete hain.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((person) => (
              <div
                key={person.name}
                className="group bg-white rounded-2xl border border-neutral-200/80 overflow-hidden hover:border-neutral-300 transition-all duration-300"
              >
                <div className="aspect-[4/5] bg-neutral-100 overflow-hidden">
                  <img
                    src={person.image}
                    alt={person.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                </div>
                <div className="p-4">
                  <h4 className="text-sm font-medium text-neutral-900">{person.name}</h4>
                  <p className="text-[11px] font-mono text-neutral-500 mt-0.5 uppercase tracking-wide">
                    {person.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom Banner */}
        <section className="bg-neutral-950 text-white rounded-3xl p-8 sm:p-14 text-center flex flex-col items-center justify-center space-y-4 shadow-xl">
          <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-neutral-400">
            Join Our Movement
          </span>
          <h2 className="text-2xl sm:text-4xl font-light max-w-xl">
            Ready to upgrade your everyday routine?
          </h2>
          <p className="text-neutral-400 text-xs sm:text-sm max-w-md">
            Check out our latest catalog with hand-picked goods engineered for comfort and durability.
          </p>
          <div className="pt-2">
            <button
              onClick={() => navigate('/products')}
              className="px-6 py-3 rounded-full bg-white text-neutral-950 text-xs font-semibold uppercase tracking-wider hover:bg-neutral-200 transition-colors"
            >
              Start Shopping
            </button>
          </div>
        </section>

      </main>
    </div>
  );
}