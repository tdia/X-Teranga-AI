/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Database, 
  MessageSquare, 
  Zap, 
  Lock, 
  Search, 
  ArrowRight, 
  Menu, 
  X,
  ChevronRight,
  Globe,
  Cpu,
  FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const response = await fetch('/api/demo-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', company: '', message: '' });
        setTimeout(() => {
          setIsModalOpen(false);
          setStatus('idle');
        }, 3000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      question: "Analyse des performances du département Ouest sur le dernier trimestre.",
      answer: "Synthèse générée à partir de l'ERP et du CRM interne :",
      data: { label: "Performance Trimestrielle", value: "452,300 €", trend: "+12%" },
      suggestion: "Souhaitez-vous une comparaison avec les objectifs budgétaires annuels ?"
    },
    {
      question: "Localiser le contrat de maintenance du site de Dakar et ses clauses de résiliation.",
      answer: "Document identifié dans la GED Juridique :",
      data: { label: "Contrat_Maintenance_DKR.pdf", value: "Révision : 12/01/2024", trend: "Conforme" },
      suggestion: "Voulez-vous que je résume les conditions de préavis ?"
    },
    {
      question: "Quels sont les points de vigilance identifiés lors du dernier audit de conformité ?",
      answer: "Analyse du rapport d'audit interne confidentiel (Février 2026) :",
      data: { label: "Points de Vigilance", value: "2 Alertes", trend: "Priorité Haute" },
      suggestion: "Afficher le plan de remédiation suggéré par le département Risques ?"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const features = [
    {
      icon: <MessageSquare className="w-6 h-6 text-indigo-500" />,
      title: "Intelligence Opérationnelle",
      description: "Interrogez vos systèmes complexes en langage clair pour une prise de décision accélérée et factuelle."
    },
    {
      icon: <Database className="w-6 h-6 text-blue-500" />,
      title: "Unification des Données",
      description: "Connectez vos silos d'information (ERP, CRM, GED) sans migration coûteuse ni risque d'intégrité."
    },
    {
      icon: <Lock className="w-6 h-6 text-violet-500" />,
      title: "Déploiement Souverain",
      description: "Installation On-Premise ou Cloud Privé. Vos données sensibles restent sous votre contrôle exclusif."
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-emerald-500" />,
      title: "Gouvernance & Accès",
      description: "Respect strict de vos politiques de confidentialité et gestion granulaire des habilitations internes."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-emerald-100 selection:text-emerald-900">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
              <Cpu className="text-white w-6 h-6" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">Teranga<span className="text-indigo-600">AI</span></span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors">Solutions</a>
            <a href="#security" className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors">Sécurité & Gouvernance</a>
            <a href="#how-it-works" className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors">Déploiement</a>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-slate-900 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-indigo-900 transition-all active:scale-95 shadow-lg shadow-slate-200"
            >
              Réserver une démo
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden p-2 text-slate-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6 text-center">
              <a href="#features" onClick={() => setIsMenuOpen(false)} className="text-xl font-medium text-slate-800">Fonctionnalités</a>
              <a href="#security" onClick={() => setIsMenuOpen(false)} className="text-xl font-medium text-slate-800">Sécurité</a>
              <a href="#how-it-works" onClick={() => setIsMenuOpen(false)} className="text-xl font-medium text-slate-800">Comment ça marche</a>
              <button 
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsModalOpen(true);
                }} 
                className="bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-xl shadow-blue-100"
              >
                Démo Gratuite
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-40 overflow-hidden">
        {/* Professional Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,#eef2ff,transparent)]"></div>
          <div className="absolute top-0 left-0 w-full h-full opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#4f46e5 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }}></div>
          
          <motion.div 
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-gradient-to-br from-indigo-200/40 to-blue-100/30 rounded-full blur-[120px]"
          ></motion.div>
          
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-[10%] right-[-5%] w-[40%] h-[40%] bg-gradient-to-tr from-blue-200/30 to-emerald-100/20 rounded-full blur-[100px]"
          ></motion.div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-indigo-100 shadow-sm mb-8">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center overflow-hidden">
                      <img src={`https://picsum.photos/seed/user${i}/32/32`} alt="User" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                  ))}
                </div>
                <div className="w-px h-4 bg-slate-200 mx-1"></div>
                <span className="text-indigo-700 text-[11px] font-bold uppercase tracking-widest">
                  Approuvé par les DSI d'Afrique de l'Ouest
                </span>
              </div>
              
              <h1 className="text-5xl md:text-8xl font-black text-slate-900 tracking-tight leading-[0.95] mb-10">
                L'IA Souveraine au service de <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-800">votre Performance</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-slate-600 leading-relaxed mb-12 max-w-3xl mx-auto font-medium">
                TerangaAI dote les grandes organisations d'un assistant intelligent interne, déployé sur site, garantissant une confidentialité absolue de vos données stratégiques.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="group w-full sm:w-auto bg-slate-900 text-white px-10 py-5 rounded-2xl text-lg font-bold hover:bg-indigo-950 transition-all hover:shadow-[0_20px_50px_rgba(79,70,229,0.2)] active:scale-95 flex items-center justify-center gap-3"
                >
                  Déployer en interne 
                  <div className="bg-white/10 p-1 rounded-lg group-hover:translate-x-1 transition-transform">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </button>
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="w-full sm:w-auto bg-white/50 backdrop-blur-md text-slate-700 border border-slate-200 px-10 py-5 rounded-2xl text-lg font-bold hover:bg-white hover:border-indigo-200 transition-all active:scale-95 shadow-sm"
                >
                  Découvrir la solution
                </button>
              </div>
            </motion.div>
          </div>

          {/* Interface Preview Slider */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-20 relative max-w-5xl mx-auto"
          >
            <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
              <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                    <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                  </div>
                  <div className="ml-4 bg-slate-200/50 rounded-md px-4 py-1 text-[10px] font-mono text-slate-500">
                    teranga-ai-local-instance.internal
                  </div>
                </div>
                <div className="flex gap-2">
                  {slides.map((_, i) => (
                    <button 
                      key={i}
                      onClick={() => setCurrentSlide(i)}
                      className={`w-2 h-2 rounded-full transition-all ${currentSlide === i ? 'bg-blue-600 w-4' : 'bg-slate-300'}`}
                    />
                  ))}
                </div>
              </div>
              <div className="p-8 md:p-12 min-h-[400px] flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={currentSlide}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-6"
                  >
                    <div className="flex justify-end">
                      <div className="bg-blue-600 text-white px-6 py-3 rounded-2xl rounded-tr-none max-w-[80%] shadow-md">
                        "{slides[currentSlide].question}"
                      </div>
                    </div>
                    <div className="flex justify-start items-start gap-3">
                      <div className="w-8 h-8 bg-emerald-500 rounded-lg flex-shrink-0 flex items-center justify-center shadow-lg shadow-emerald-100">
                        <Cpu className="text-white w-5 h-5" />
                      </div>
                      <div className="bg-slate-100 text-slate-800 px-6 py-4 rounded-2xl rounded-tl-none max-w-[85%] border border-slate-200">
                        <p className="mb-3">{slides[currentSlide].answer}</p>
                        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-3">
                          <div className="flex justify-between items-end">
                            <div>
                              <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">{slides[currentSlide].data.label}</p>
                              <p className="text-2xl font-bold text-slate-900">{slides[currentSlide].data.value}</p>
                            </div>
                            <div className={`text-sm font-bold flex items-center gap-1 ${slides[currentSlide].data.trend.includes('+') ? 'text-emerald-600' : 'text-blue-600'}`}>
                              {slides[currentSlide].data.trend} <Zap className="w-3 h-3" />
                            </div>
                          </div>
                        </div>
                        <p className="text-sm italic text-slate-500">{slides[currentSlide].suggestion}</p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
                <div className="mt-10 relative">
                  <input 
                    type="text" 
                    placeholder="Posez votre question à TerangaAI..." 
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 pr-16 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-inner"
                    disabled
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 bg-blue-600 p-2.5 rounded-xl text-white">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating Badges */}
            <div className="absolute -top-6 -right-6 hidden lg:block">
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3"
              >
                <div className="bg-emerald-100 p-2 rounded-lg">
                  <ShieldCheck className="text-emerald-600 w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Données Sécurisées</p>
                  <p className="text-[10px] text-slate-500">Zéro fuite externe</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 bg-white relative">
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-slate-50 to-white"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">Une infrastructure robuste pour la gouvernance des données</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Conçu pour les secteurs exigeants : Banques, Télécoms et Administrations Publiques.
            </p>
          </div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: { transition: { staggerChildren: 0.1 } }
            }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {features.map((feature, idx) => (
              <motion.div 
                key={idx}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-xl hover:border-blue-100 transition-all duration-300"
              >
                <div className="mb-6 p-3 bg-white w-fit rounded-2xl shadow-sm border border-slate-100">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed text-sm">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Security Section */}
      <section id="security" className="py-24 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-indigo-600/10 blur-[120px] rounded-full"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-indigo-400 font-bold tracking-widest uppercase text-xs mb-4 block">Souveraineté Numérique</span>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
                Sécurité de Grade Bancaire et <span className="text-indigo-400">Confidentialité Totale</span>.
              </h2>
              <p className="text-slate-400 text-lg mb-10 leading-relaxed">
                Une architecture isolée garantissant qu'aucune information sensible ne quitte votre infrastructure. TerangaAI s'intègre à votre écosystème de sécurité existant sans compromis.
              </p>
              
              <div className="space-y-6">
                {[
                  "Déploiement On-Premise ou Cloud Privé",
                  "Conformité Réglementaire & RGPD",
                  "Chiffrement AES-256 & TLS 1.3",
                  "Traçabilité & Auditabilité Totale"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    </div>
                    <span className="font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-slate-800/50 backdrop-blur-xl p-8 rounded-3xl border border-slate-700 shadow-2xl">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <Globe className="text-blue-400 w-6 h-6" />
                    <span className="text-sm font-bold">Internet</span>
                  </div>
                  <div className="h-px flex-grow mx-4 bg-slate-700 border-dashed border-t"></div>
                  <div className="flex items-center gap-3 text-red-400">
                    <X className="w-6 h-6" />
                  </div>
                </div>
                
                <div className="bg-blue-600/10 border border-blue-500/30 p-6 rounded-2xl mb-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                      <Cpu className="text-white w-7 h-7" />
                    </div>
                    <div>
                      <p className="font-bold">Moteur TerangaAI</p>
                      <p className="text-xs text-blue-400">Traitement Local</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-700 flex items-center gap-2">
                      <Database className="w-4 h-4 text-slate-400" />
                      <span className="text-[10px] uppercase font-bold tracking-tighter">Bases SQL</span>
                    </div>
                    <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-700 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-slate-400" />
                      <span className="text-[10px] uppercase font-bold tracking-tighter">Documents</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-center text-xs text-slate-500 italic">
                  Architecture isolée : Vos secrets d'affaires sont protégés par votre propre pare-feu.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">Une Intégration Transparente & Sécurisée</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Déployez une intelligence collective sans perturber vos processus existants.
            </p>
          </div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: { transition: { staggerChildren: 0.2 } }
            }}
            className="grid md:grid-cols-3 gap-12 relative"
          >
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-slate-200 -z-10"></div>
            
            {[
              {
                step: "01",
                title: "Interconnexion",
                desc: "Liaison sécurisée avec vos bases de données et serveurs de fichiers existants (SQL, NoSQL, GED).",
                icon: <Database className="w-8 h-8 text-indigo-600" />
              },
              {
                step: "02",
                title: "Structuration",
                desc: "Analyse sémantique locale pour organiser votre connaissance métier de manière sécurisée.",
                icon: <Search className="w-8 h-8 text-blue-600" />
              },
              {
                step: "03",
                title: "Exploitation",
                desc: "Accès sécurisé à l'information pour vos collaborateurs autorisés via une interface intuitive.",
                icon: <MessageSquare className="w-8 h-8 text-emerald-600" />
              }
            ].map((step, i) => (
              <motion.div 
                key={i}
                variants={{
                  hidden: { opacity: 0, scale: 0.8 },
                  visible: { opacity: 1, scale: 1 }
                }}
                className="text-center group"
              >
                <div className="w-20 h-20 bg-white border-2 border-slate-100 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-sm group-hover:border-blue-500 group-hover:text-blue-600 transition-all duration-300">
                  {step.icon}
                </div>
                <span className="text-4xl font-black text-slate-100 mb-4 block group-hover:text-blue-50 transition-colors">{step.step}</span>
                <h3 className="text-xl font-bold text-slate-900 mb-4">{step.title}</h3>
                <p className="text-slate-600 leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-indigo-600 via-blue-600 to-indigo-800 rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl shadow-indigo-200">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent"></div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-6xl font-bold mb-8">Sécurisez votre Patrimoine Informationnel dès aujourd'hui</h2>
              <p className="text-xl text-indigo-100 mb-12 max-w-2xl mx-auto">
                Contactez nos experts pour une étude de déploiement personnalisée dans votre infrastructure.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="w-full sm:w-auto bg-white text-indigo-600 px-10 py-5 rounded-full text-xl font-bold hover:bg-indigo-50 transition-all active:scale-95 shadow-xl"
                >
                  Planifier un Audit
                </button>
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="w-full sm:w-auto bg-indigo-700 text-white border border-indigo-500 px-10 py-5 rounded-full text-xl font-bold hover:bg-indigo-800 transition-all active:scale-95"
                >
                  Parler à un expert
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center">
                <Cpu className="text-white w-5 h-5" />
              </div>
              <span className="text-lg font-bold tracking-tight text-slate-900">Teranga<span className="text-indigo-600">AI</span></span>
            </div>
            
            <div className="flex gap-8 text-sm font-medium text-slate-500">
              <a href="#" className="hover:text-indigo-600 transition-colors">Mentions Légales</a>
              <a href="#" className="hover:text-indigo-600 transition-colors">Confidentialité</a>
              <a href="#" className="hover:text-indigo-600 transition-colors">Contact</a>
            </div>
            
            <p className="text-sm text-slate-400">
              © 2026 TerangaAI. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>

      {/* Demo Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl overflow-hidden"
            >
              <div className="p-8 md:p-12">
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>

                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-slate-900 mb-2">Démo Gratuite</h2>
                  <p className="text-slate-500">Découvrez comment TerangaAI peut transformer votre entreprise.</p>
                </div>

                {status === 'success' ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-12 text-center"
                  >
                    <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                      <ShieldCheck className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Demande envoyée !</h3>
                    <p className="text-slate-600">Nous vous contacterons très prochainement à l'adresse indiquée.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1.5 ml-1">Nom Complet</label>
                      <input 
                        required
                        type="text" 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                        placeholder="Jean Dupont"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1.5 ml-1">Email Professionnel</label>
                      <input 
                        required
                        type="email" 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                        placeholder="jean@entreprise.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1.5 ml-1">Entreprise</label>
                      <input 
                        required
                        type="text" 
                        value={formData.company}
                        onChange={(e) => setFormData({...formData, company: e.target.value})}
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                        placeholder="Nom de votre société"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1.5 ml-1">Message (Optionnel)</label>
                      <textarea 
                        rows={3}
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"
                        placeholder="Dites-nous en plus sur vos besoins..."
                      />
                    </div>
                    <button 
                      disabled={status === 'loading'}
                      type="submit"
                      className="w-full bg-blue-600 text-white py-5 rounded-2xl text-lg font-bold hover:bg-blue-700 transition-all active:scale-[0.98] shadow-xl shadow-blue-100 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {status === 'loading' ? 'Envoi en cours...' : 'Envoyer ma demande'}
                      <ArrowRight className="w-5 h-5" />
                    </button>
                    {status === 'error' && (
                      <p className="text-center text-red-500 text-sm font-medium">Une erreur est survenue. Veuillez réessayer.</p>
                    )}
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
