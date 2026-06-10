/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Home, 
  MapPin, 
  Phone, 
  MessageCircle, 
  CheckCircle2, 
  Calendar, 
  Award, 
  Briefcase, 
  Instagram, 
  Facebook, 
  Menu, 
  X, 
  BedDouble, 
  Bath, 
  Car, 
  Maximize2, 
  ChevronRight, 
  ArrowUpRight, 
  DollarSign, 
  Building,
  Key
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  brokerConfig, 
  propertiesList, 
  servicesList, 
  howItWorksSteps, 
  serviceRegions, 
  Property 
} from './types';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [propertyFilter, setPropertyFilter] = useState<'todos' | 'venda' | 'aluguel' | 'apartamento' | 'casa'>('todos');
  const [selectedBairro, setSelectedBairro] = useState<string>('todos');

  // WhatsApp link generator
  const getWhatsappUrl = (text: string) => {
    return `https://wa.me/${brokerConfig.whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  // General messages
  const generalContactMsg = `Olá! Vi o site ${brokerConfig.businessName} e gostaria de atendimento para compra, venda ou aluguel de imóvel.`;
  const sellPropertyMsg = `Olá! Gostaria de falar com o corretor Rafael Almeida para anunciar/vender meu imóvel pelo site.`;
  const evaluatePropertyMsg = `Olá! Gostaria de solicitar uma avaliação profissional para o meu imóvel com o corretor Rafael Almeida.`;

  // Filter properties
  const filteredProperties = useMemo(() => {
    return propertiesList.filter(item => {
      // Type/Category Filter
      let matchesType = true;
      if (propertyFilter === 'venda') {
        matchesType = item.type === 'Venda';
      } else if (propertyFilter === 'aluguel') {
        matchesType = item.type === 'Aluguel';
      } else if (propertyFilter === 'apartamento') {
        matchesType = item.title.toLowerCase().includes('apartamento') || item.title.toLowerCase().includes('cobertura');
      } else if (propertyFilter === 'casa') {
        matchesType = item.title.toLowerCase().includes('casa');
      }

      // Region Filter
      let matchesBairro = true;
      if (selectedBairro !== 'todos') {
        matchesBairro = item.bairro === selectedBairro;
      }

      return matchesType && matchesBairro;
    });
  }, [propertyFilter, selectedBairro]);

  // Unique bairros for search filter dropdown
  const uniqueBairros = useMemo(() => {
    const list = propertiesList.map(p => p.bairro);
    return ['todos', ...Array.from(new Set(list))];
  }, []);

  const handleCategoryClick = (categoryType: 'comprar' | 'alugar' | 'vender' | 'avaliar' | 'apartamentos' | 'casas') => {
    const propertiesSection = document.getElementById('imoveis');
    const contactSection = document.getElementById('contato');

    if (categoryType === 'comprar') {
      setPropertyFilter('venda');
      setSelectedBairro('todos');
      propertiesSection?.scrollIntoView({ behavior: 'smooth' });
    } else if (categoryType === 'alugar') {
      setPropertyFilter('aluguel');
      setSelectedBairro('todos');
      propertiesSection?.scrollIntoView({ behavior: 'smooth' });
    } else if (categoryType === 'apartamentos') {
      setPropertyFilter('apartamento');
      setSelectedBairro('todos');
      propertiesSection?.scrollIntoView({ behavior: 'smooth' });
    } else if (categoryType === 'casas') {
      setPropertyFilter('casa');
      setSelectedBairro('todos');
      propertiesSection?.scrollIntoView({ behavior: 'smooth' });
    } else if (categoryType === 'vender') {
      // Direct WA call or scroll to contact
      window.open(getWhatsappUrl(sellPropertyMsg), '_blank');
    } else if (categoryType === 'avaliar') {
      window.open(getWhatsappUrl(evaluatePropertyMsg), '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 selection:bg-gold selection:text-white scroll-smooth">
      
      {/* 1. Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo textual */}
            <div className="flex flex-col">
              <a href="#inicio" className="flex items-center gap-1 group">
                <span className="font-display text-xl sm:text-2xl font-bold text-navy tracking-tight transition group-hover:text-[#16366b]">
                  {brokerConfig.brokerName}
                </span>
                <span className="font-display text-xl sm:text-2xl font-light text-gold tracking-tight">
                  Imóveis
                </span>
              </a>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-gold"></span>
                <span className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold">
                  Corretor de Imóveis • CRECI {brokerConfig.creci}
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              <a href="#inicio" className="text-sm font-medium text-slate-600 hover:text-navy hover:border-b hover:border-gold py-1 transition-all">Início</a>
              <a href="#imoveis" className="text-sm font-medium text-slate-600 hover:text-navy hover:border-b hover:border-gold py-1 transition-all">Imóveis</a>
              <a href="#servicos" className="text-sm font-medium text-slate-600 hover:text-navy hover:border-b hover:border-gold py-1 transition-all">Serviços</a>
              <a href="#sobre" className="text-sm font-medium text-slate-600 hover:text-navy hover:border-b hover:border-gold py-1 transition-all">Sobre</a>
              <a href="#regioes" className="text-sm font-medium text-slate-600 hover:text-navy hover:border-b hover:border-gold py-1 transition-all">Regiões</a>
            </nav>

            {/* CTA Desktop */}
            <div className="hidden sm:flex items-center gap-4">
              <a 
                href={getWhatsappUrl(generalContactMsg)}
                target="_blank"
                rel="noreferrer"
                referrerPolicy="no-referrer"
                className="inline-flex items-center gap-2 bg-navy hover:bg-slate-800 text-white px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
                id="header-cta"
              >
                <div className="w-5 h-5 rounded-full bg-gold flex items-center justify-center text-white">
                  <MessageCircle className="w-3.5 h-3.5 text-white fill-white" />
                </div>
                Falar no WhatsApp
              </a>
            </div>

            {/* Toggle Mobile Menu */}
            <div className="lg:hidden">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-600 hover:text-navy hover:bg-slate-50 transition"
                aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
                id="mobile-menu-toggle"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden bg-slate-50 border-t border-slate-100 py-4 px-6 overflow-hidden"
            >
              <div className="flex flex-col gap-4">
                <a 
                  href="#inicio" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-semibold text-slate-700 hover:text-navy"
                >
                  Início
                </a>
                <a 
                  href="#imoveis" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-semibold text-slate-700 hover:text-navy"
                >
                  Imóveis
                </a>
                <a 
                  href="#servicos" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-semibold text-slate-700 hover:text-navy"
                >
                  Serviços
                </a>
                <a 
                  href="#sobre" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-semibold text-slate-700 hover:text-navy"
                >
                  Sobre Corretor
                </a>
                <a 
                  href="#regioes" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-semibold text-slate-700 hover:text-navy"
                >
                  Regiões de Atendimento
                </a>
                <div className="pt-2 border-t border-slate-200 mt-2">
                  <a 
                    href={getWhatsappUrl(generalContactMsg)}
                    target="_blank"
                    rel="noreferrer"
                    referrerPolicy="no-referrer"
                    className="w-full inline-flex items-center justify-center gap-3 bg-navy text-white py-3 px-5 rounded-xl font-semibold text-sm transition"
                    id="mobile-menu-cta"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    Atendimento no WhatsApp
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* 2. Hero Section */}
      <section id="inicio" className="relative bg-navy text-white overflow-hidden py-16 lg:py-24">
        {/* Subtle geometric gold element background overlay */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-slate-900/40 to-transparent pointer-events-none"></div>
        <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-gold/5 blur-3xl pointer-events-none"></div>
        <div className="absolute top-10 right-10 w-96 h-96 rounded-full bg-blue-500/5 blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Hero text branding */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 px-3 py-1.5 rounded-full w-fit">
                <Award className="w-4 h-4 text-gold" />
                <span className="text-[11px] font-bold uppercase tracking-widest text-gold">
                  Atendimento Premium Exclusivo
                </span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight animate-fade-in">
                Encontre o imóvel ideal com atendimento <span className="text-gold">próximo</span> e <span className="text-gold">seguro</span>.
              </h1>

              <p className="text-slate-300 text-lg sm:text-xl font-light leading-relaxed max-w-2xl">
                Compra, venda e aluguel de imóveis com orientação profissional, atendimento imediato pelo WhatsApp e opções selecionadas sob medida para você na região de Nova Iguaçu.
              </p>

              {/* Botões CTA */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-4">
                <a 
                  href="#imoveis" 
                  className="bg-gold hover:bg-amber-700 text-white font-bold px-8 py-4 rounded-xl text-center shadow-lg transition duration-200"
                  id="hero-primary-cta"
                >
                  Ver imóveis destaque
                </a>
                <a 
                  href={getWhatsappUrl(generalContactMsg)}
                  target="_blank"
                  rel="noreferrer"
                  referrerPolicy="no-referrer"
                  className="bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold px-8 py-4 rounded-xl text-center inline-flex items-center justify-center gap-2 transition duration-200"
                  id="hero-secondary-cta"
                >
                  <MessageCircle className="w-5 h-5 text-gold fill-gold" />
                  Falar com o corretor
                </a>
              </div>

              {/* Trust Badge Indicators */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10 mt-6 max-w-lg">
                <div>
                  <div className="text-2xl sm:text-3xl font-bold font-display text-white">100%</div>
                  <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider">Transparência</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold font-display text-gold">CRECI</div>
                  <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider">Regularizado</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold font-display text-white">Nova Iguaçu</div>
                  <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider">Atuação Local</div>
                </div>
              </div>
            </div>

            {/* Imagem do Imóvel Moderno com Moldura de Luxo */}
            <div className="lg:col-span-5 relative">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-gold/50 to-blue-500/20 blur-lg opacity-40 pointer-events-none"></div>
              <div className="relative rounded-2xl border border-white/10 overflow-hidden bg-slate-900 shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80" 
                  alt="Fachada moderna residencial decorada" 
                  className="w-full h-[320px] sm:h-[420px] object-cover hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                
                {/* Overlay Badge da Fachada */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-transparent p-6 pt-20">
                  <div className="flex justify-between items-end">
                    <div>
                      <span className="text-[10px] bg-gold text-white font-bold px-2 py-0.5 rounded-sm uppercase tracking-widest">
                        Destaque Exclusivo
                      </span>
                      <h3 className="text-white font-display font-bold text-lg mt-1.5">Portfólio Premium</h3>
                      <p className="text-slate-300 text-xs mt-0.5 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-gold" /> Nova Iguaçu e Grande Rio
                      </p>
                    </div>
                    <div className="text-slate-300 text-xs flex items-center gap-1 font-mono bg-white/10 border border-white/10 px-2 py-1 rounded">
                      <span>Ref: RA-019</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Faixa de Destaque */}
      <section className="bg-gold text-white font-semibold py-4 overflow-hidden border-y border-amber-800">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-xs sm:text-sm uppercase tracking-wider font-bold">
            <span>Compra</span>
            <span className="text-white/40">•</span>
            <span>Venda</span>
            <span className="text-white/40">•</span>
            <span>Aluguel</span>
            <span className="text-white/40">•</span>
            <span>Avaliação de imóveis</span>
            <span className="text-white/40">•</span>
            <span className="flex items-center gap-1">
              Atendimento pelo WhatsApp 
              <MessageCircle className="w-4 h-4 fill-white text-white inline" />
            </span>
          </div>
        </div>
      </section>

      {/* 4. Seção de Busca Visual ou Categorias */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-gold text-xs font-bold uppercase tracking-widest block mb-2">Serviços e Oportunidades</span>
            <h2 className="font-display text-3xl font-extrabold text-navy tracking-tight">
              O que você procura?
            </h2>
            <p className="text-slate-500 text-sm mt-2 font-light">
              Escolha uma categoria abaixo para navegar pelas opções prontas ou para falar diretamente sobre suas necessidades específicas.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            
            {/* Comprar */}
            <button 
              onClick={() => handleCategoryClick('comprar')}
              className="group flex flex-col justify-between items-center text-center p-6 rounded-2xl bg-slate-50 hover:bg-navy hover:text-white border border-slate-100 hover:border-navy hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              <div className="w-12 h-12 rounded-full bg-blue-50 group-hover:bg-white/10 flex items-center justify-center text-navy group-hover:text-gold transition">
                <Home className="w-6 h-6" />
              </div>
              <div className="mt-4">
                <span className="block text-sm font-bold tracking-tight">Comprar</span>
                <span className="text-[10px] text-slate-400 group-hover:text-slate-300 block mt-0.5 font-light">Ver opções de venda</span>
              </div>
            </button>

            {/* Alugar */}
            <button 
              onClick={() => handleCategoryClick('alugar')}
              className="group flex flex-col justify-between items-center text-center p-6 rounded-2xl bg-slate-50 hover:bg-navy hover:text-white border border-slate-100 hover:border-navy hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              <div className="w-12 h-12 rounded-full bg-blue-50 group-hover:bg-white/10 flex items-center justify-center text-navy group-hover:text-gold transition">
                <Key className="w-6 h-6" />
              </div>
              <div className="mt-4">
                <span className="block text-sm font-bold tracking-tight">Alugar</span>
                <span className="text-[10px] text-slate-400 group-hover:text-slate-300 block mt-0.5 font-light">Opções residenciais</span>
              </div>
            </button>

            {/* Vender */}
            <button 
              onClick={() => handleCategoryClick('vender')}
              className="group flex flex-col justify-between items-center text-center p-6 rounded-2xl bg-slate-50 hover:bg-navy hover:text-white border border-slate-100 hover:border-navy hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              <div className="w-12 h-12 rounded-full bg-blue-50 group-hover:bg-white/10 flex items-center justify-center text-navy group-hover:text-gold transition">
                <DollarSign className="w-6 h-6" />
              </div>
              <div className="mt-4">
                <span className="block text-sm font-bold tracking-tight">Anunciar</span>
                <span className="text-[10px] text-slate-400 group-hover:text-slate-300 block mt-0.5 font-light">Quero vender meu imóvel</span>
              </div>
            </button>

            {/* Avaliar */}
            <button 
              onClick={() => handleCategoryClick('avaliar')}
              className="group flex flex-col justify-between items-center text-center p-6 rounded-2xl bg-slate-50 hover:bg-navy hover:text-white border border-slate-100 hover:border-navy hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              <div className="w-12 h-12 rounded-full bg-blue-50 group-hover:bg-white/10 flex items-center justify-center text-navy group-hover:text-gold transition">
                <Building className="w-6 h-6" />
              </div>
              <div className="mt-4">
                <span className="block text-sm font-bold tracking-tight">Avaliar</span>
                <span className="text-[10px] text-slate-400 group-hover:text-slate-300 block mt-0.5 font-light">Avaliação profissional</span>
              </div>
            </button>

            {/* Apartamentos */}
            <button 
              onClick={() => handleCategoryClick('apartamentos')}
              className="group flex flex-col justify-between items-center text-center p-6 rounded-2xl bg-slate-50 hover:bg-navy hover:text-white border border-slate-100 hover:border-navy hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              <div className="w-12 h-12 rounded-full bg-blue-50 group-hover:bg-white/10 flex items-center justify-center text-navy group-hover:text-gold transition">
                <Building className="w-6 h-6 scroll-smooth" />
              </div>
              <div className="mt-4">
                <span className="block text-sm font-bold tracking-tight">Apartamentos</span>
                <span className="text-[10px] text-slate-400 group-hover:text-slate-300 block mt-0.5 font-light">Unidades completas</span>
              </div>
            </button>

            {/* Casas */}
            <button 
              onClick={() => handleCategoryClick('casas')}
              className="group flex flex-col justify-between items-center text-center p-6 rounded-2xl bg-slate-50 hover:bg-navy hover:text-white border border-slate-100 hover:border-navy hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              <div className="w-12 h-12 rounded-full bg-blue-50 group-hover:bg-white/10 flex items-center justify-center text-navy group-hover:text-gold transition">
                <Home className="w-6 h-6" />
              </div>
              <div className="mt-4">
                <span className="block text-sm font-bold tracking-tight">Casas</span>
                <span className="text-[10px] text-slate-400 group-hover:text-slate-300 block mt-0.5 font-light">Casas & Duplex</span>
              </div>
            </button>

          </div>
        </div>
      </section>

      {/* 5. Seção de Imóveis */}
      <section id="imoveis" className="py-20 bg-slate-50 scroll-mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-gold text-xs font-bold uppercase tracking-widest block mb-2">Exclusividade e Oportunidades</span>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-navy tracking-tight">
                Imóveis em Destaque
              </h2>
              <p className="text-slate-500 text-sm mt-1 font-light max-w-xl">
                Confira algumas oportunidades selecionadas disponíveis para compra ou aluguel em excelentes localizações.
              </p>
            </div>
            
            {/* Filter Dropdown Selector (Right aligned) */}
            <div className="mt-6 md:mt-0 flex flex-wrap gap-2 items-center">
              <span className="text-xs text-slate-400 uppercase tracking-wider block mr-1 font-medium">Bairro:</span>
              <select 
                value={selectedBairro}
                onChange={(e) => setSelectedBairro(e.target.value)}
                className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-1 focus:ring-gold"
                id="filter-bairro"
              >
                {uniqueBairros.map((b) => (
                  <option key={b} value={b}>
                    {b === 'todos' ? 'Todos os Bairros' : b}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Filtering Control Bar */}
          <div className="flex flex-wrap gap-2 mb-10 border-b border-slate-200 pb-4">
            <button 
              onClick={() => setPropertyFilter('todos')}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
                propertyFilter === 'todos' 
                  ? 'bg-navy text-white shadow-xs' 
                  : 'bg-white text-slate-600 hover:text-navy border border-slate-200'
              }`}
            >
              Todos ({propertiesList.filter(p => selectedBairro === 'todos' || p.bairro === selectedBairro).length})
            </button>
            <button 
              onClick={() => setPropertyFilter('venda')}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
                propertyFilter === 'venda' 
                  ? 'bg-navy text-white shadow-xs' 
                  : 'bg-white text-slate-600 hover:text-navy border border-slate-200'
              }`}
            >
              Venda ({propertiesList.filter(p => p.type === 'Venda' && (selectedBairro === 'todos' || p.bairro === selectedBairro)).length})
            </button>
            <button 
              onClick={() => setPropertyFilter('aluguel')}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
                propertyFilter === 'aluguel' 
                  ? 'bg-navy text-white shadow-xs' 
                  : 'bg-white text-slate-600 hover:text-navy border border-slate-200'
              }`}
            >
              Aluguel ({propertiesList.filter(p => p.type === 'Aluguel' && (selectedBairro === 'todos' || p.bairro === selectedBairro)).length})
            </button>
            <button 
              onClick={() => setPropertyFilter('apartamento')}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
                propertyFilter === 'apartamento' 
                  ? 'bg-navy text-white shadow-xs' 
                  : 'bg-white text-slate-600 hover:text-navy border border-slate-200'
              }`}
            >
              Apartamentos ({propertiesList.filter(p => (p.title.toLowerCase().includes('apartamento') || p.title.toLowerCase().includes('cobertura')) && (selectedBairro === 'todos' || p.bairro === selectedBairro)).length})
            </button>
            <button 
              onClick={() => setPropertyFilter('casa')}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
                propertyFilter === 'casa' 
                  ? 'bg-navy text-white shadow-xs' 
                  : 'bg-white text-slate-600 hover:text-navy border border-slate-200'
              }`}
            >
              Casas ({propertiesList.filter(p => p.title.toLowerCase().includes('casa') && (selectedBairro === 'todos' || p.bairro === selectedBairro)).length})
            </button>
          </div>

          {/* Properties Grid */}
          {filteredProperties.length === 0 ? (
            <div className="bg-white border border-slate-100 rounded-3xl p-12 text-center max-w-lg mx-auto shadow-sm">
              <Home className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-slate-700">Nenhum imóvel encontrado</h3>
              <p className="text-slate-500 text-sm mt-1">
                Não localizados imóveis com esse filtro específico. Tente alterar selecionando outros bairros ou tipos.
              </p>
              <button 
                onClick={() => { setPropertyFilter('todos'); setSelectedBairro('todos'); }}
                className="mt-4 bg-navy text-white text-xs font-semibold px-4 py-2 rounded-lg"
              >
                Limpar Filtros
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProperties.map((property) => {
                const interestMsg = `Olá! Tenho interesse no imóvel ${property.title} que vi no site Rafael Almeida Imóveis. Ainda está disponível?`;
                return (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    key={property.id}
                    className="group bg-white rounded-2xl border border-slate-100 shadow-xs hover:shadow-xl transition-all duration-350 overflow-hidden flex flex-col h-full"
                  >
                    
                    {/* Imagem + Tag Banner */}
                    <div className="relative overflow-hidden aspect-[4/3] bg-slate-100">
                      
                      <img 
                        src={property.imageUrl} 
                        alt={property.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />

                      {/* Top Badges */}
                      <div className="absolute top-4 left-4 flex gap-1.5 flex-wrap z-10">
                        {/* Status Tag */}
                        <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded shadow-xs ${
                          property.type === 'Venda' 
                            ? 'bg-navy text-white' 
                            : 'bg-gold text-white'
                        }`}>
                          {property.tag}
                        </span>
                      </div>

                      {/* Price Badge over Image Overlay */}
                      <div className="absolute bottom-4 left-4 bg-slate-950/80 backdrop-blur-xs text-white text-base sm:text-lg font-display font-extrabold px-3 py-1 rounded shadow-sm">
                        {property.price}
                      </div>

                    </div>

                    {/* Card Content Details */}
                    <div className="p-5 flex flex-col flex-grow justify-between gap-5">
                      <div className="flex flex-col gap-2">
                        {/* Bairro & Cidade badge */}
                        <div className="flex items-center gap-1.5 text-slate-400 text-xs">
                          <MapPin className="w-3.5 h-3.5 text-gold" />
                          <span>{property.bairro} — {property.cidade}</span>
                        </div>

                        {/* Title */}
                        <h3 className="font-display font-bold text-slate-800 text-lg group-hover:text-navy transition leading-snug">
                          {property.title}
                        </h3>
                      </div>

                      {/* Icons Row Parameters */}
                      <div className="grid grid-cols-4 gap-2 pt-4 border-t border-slate-100 text-slate-500 text-xs">
                        
                        {/* Bedrooms */}
                        <div className="flex flex-col items-center text-center py-1">
                          <BedDouble className="w-4 h-4 text-slate-400 mb-1" />
                          <span className="font-semibold text-slate-700">{property.bedrooms} {property.bedrooms === 1 ? 'Quarto' : 'Quartos'}</span>
                        </div>

                        {/* Bathrooms */}
                        <div className="flex flex-col items-center text-center py-1">
                          <Bath className="w-4 h-4 text-slate-400 mb-1" />
                          <span className="font-semibold text-slate-700">{property.bathrooms} {property.bathrooms === 1 ? 'Banheiro' : 'Banheiros'}</span>
                        </div>

                        {/* Parking Spaces */}
                        <div className="flex flex-col items-center text-center py-1">
                          <Car className="w-4 h-4 text-slate-400 mb-1" />
                          <span className="font-semibold text-slate-700">{property.parkingSpaces} {property.parkingSpaces === 1 ? 'Vaga' : 'Vagas'}</span>
                        </div>

                        {/* Area */}
                        <div className="flex flex-col items-center text-center py-1">
                          <Maximize2 className="w-4 h-4 text-slate-400 mb-1" />
                          <span className="font-semibold text-slate-700 font-mono">{property.area}m²</span>
                        </div>

                      </div>

                      {/* WhatsApp Button occupied total width */}
                      <div className="pt-2">
                        <a 
                          href={getWhatsappUrl(interestMsg)}
                          target="_blank"
                          rel="noreferrer"
                          referrerPolicy="no-referrer"
                          className="w-full inline-flex items-center justify-center gap-2 bg-navy hover:bg-[#1f2937] active:bg-[#030712] text-white py-3.5 px-4 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all shadow-sm"
                          id={`interest-btn-${property.id}`}
                        >
                          <MessageCircle className="w-4 h-4 fill-white flex-shrink-0" />
                          <span className="whitespace-nowrap truncate">Tenho interesse</span>
                        </a>
                      </div>

                    </div>

                  </motion.div>
                );
              })}
            </div>
          )}

        </div>
      </section>

      {/* 6. Seção de Serviços */}
      <section id="servicos" className="py-20 bg-white border-t border-b border-slate-100 scroll-mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-gold text-xs font-bold uppercase tracking-widest block mb-2">Especialidades</span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-navy tracking-tight">
              Como posso ajudar você
            </h2>
            <p className="text-slate-500 text-sm mt-2 font-light">
              Suporte completo e descomplicado para você realizar seus negócios imobiliários com tranquilidade.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesList.map((service, idx) => {
              // Custom icon selection based on ID / Service
              const getIcon = (id: string) => {
                if (id === 'srv-1') return <Home className="w-6 h-6 text-gold" />;
                if (id === 'srv-2') return <DollarSign className="w-6 h-6 text-gold" />;
                if (id === 'srv-3') return <Key className="w-6 h-6 text-gold" />;
                if (id === 'srv-4') return <Award className="w-6 h-6 text-gold" />;
                if (id === 'srv-5') return <MessageCircle className="w-6 h-6 text-gold" />;
                return <Calendar className="w-6 h-6 text-gold" />;
              };

              return (
                <div 
                  key={service.id} 
                  className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:border-gold/50 hover:shadow-xl transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-white rounded-xl shadow-xs flex items-center justify-center mb-5">
                    {getIcon(service.id)}
                  </div>
                  <h3 className="font-display font-bold text-navy text-lg mb-2">
                    {service.title}
                  </h3>
                  <p className="text-slate-500 text-sm font-light leading-relaxed">
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 7. Seção "Como funciona" */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-gold text-xs font-bold uppercase tracking-widest block mb-2">Passo a Passo</span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-navy tracking-tight">
              Como encontrar seu imóvel
            </h2>
            <p className="text-slate-500 text-sm mt-2 font-light">
              Nossa jornada simplificada foi projetada para poupar seu tempo e garantir o melhor negócio.
            </p>
          </div>

          <div className="relative">
            {/* Background line connecting steps on Desktop */}
            <div className="hidden lg:block absolute top-1/2 left-4 right-4 h-0.5 bg-slate-200 -translate-y-8 z-0"></div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10 animate-fade-in">
              {howItWorksSteps.map((step) => (
                <div key={step.id} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-xs text-center flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-navy text-gold font-display font-extrabold text-lg flex items-center justify-center mb-5">
                    {step.id}
                  </div>
                  <h3 className="font-display font-semibold text-slate-800 text-md mb-2">
                    {step.title}
                  </h3>
                  <p className="text-slate-500 text-xs sm:text-sm font-light leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 8. Seção sobre o corretor */}
      <section id="sobre" className="py-20 bg-white scroll-mt-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Foto e badge CRECI */}
            <div className="lg:col-span-5 relative">
              <div className="absolute -inset-1 rounded-3xl bg-gold/40 blur-md opacity-30 pointer-events-none"></div>
              <div className="relative rounded-3xl overflow-hidden border border-slate-200 bg-slate-100 shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=700&q=80" 
                  alt="Rafael Almeida - Corretor de imóveis profissional" 
                  className="w-full h-[400px] object-cover object-top"
                  referrerPolicy="no-referrer"
                />

                {/* CRECI Floating Badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-navy border border-white/10 text-white rounded-2xl p-3 shadow-lg flex items-center gap-3">
                  <div className="w-10 h-10 bg-gold rounded-xl flex items-center justify-center text-white">
                    <Award className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Inscrição Profissional</div>
                    <div className="text-sm font-bold text-white font-display">CRECI {brokerConfig.creci}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Informações textuais */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div>
                <span className="text-gold text-xs font-bold uppercase tracking-widest block mb-2">Compromisso e Confiança</span>
                <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-navy tracking-tight">
                  Sobre {brokerConfig.brokerName}
                </h2>
              </div>

              <p className="text-slate-600 text-base font-light leading-relaxed">
                Rafael Almeida é corretor de imóveis especializado com atendimento próximo, transparente e focado em ajudar clientes a encontrar boas oportunidades para compra, venda ou aluguel. Com forte atuação em Nova Iguaçu e região, oferece suporte desde a escolha cuidadosa do imóvel até o agendamento de visitas ricas em informações e negociação segura.
              </p>

              <p className="text-slate-600 text-base font-light leading-relaxed">
                Acredito que o processo de conquista de um lar ou estabelecimento comercial precisa ser leve, planejado e livre de surpresas desagradáveis. Por isso, prezo pelo atendimento personalizado de ponta a ponta.
              </p>

              {/* Diferenciais em grade */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-4 mt-2">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-medium text-slate-700">Atendimento próximo e personalizado</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-medium text-slate-700">Imóveis selecionados e exclusivos</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-medium text-slate-700">Orientação em todas as etapas</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-medium text-slate-700">Agendamento rápido pelo WhatsApp</span>
                </div>
                <div className="flex items-start gap-2.5 sm:col-span-2">
                  <CheckCircle2 className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-medium text-slate-700">Atuação especializada em Nova Iguaçu e cidades vizinhas</span>
                </div>
              </div>

              <div className="pt-4">
                <a 
                  href={getWhatsappUrl(generalContactMsg)}
                  target="_blank"
                  rel="noreferrer"
                  referrerPolicy="no-referrer"
                  className="inline-flex items-center gap-2 bg-navy hover:bg-slate-800 text-white px-7 py-3.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition shadow-md"
                  id="about-cta"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  Conversar com o Corretor
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 9. Seção de Chamada para WhatsApp */}
      <section id="contato" className="py-20 bg-navy text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-linear-to-b from-black/20 to-transparent pointer-events-none"></div>
        <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-gold/5 blur-3xl pointer-events-none"></div>

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10 flex flex-col items-center gap-6">
          <div className="w-16 h-16 rounded-full bg-gold/20 border border-gold/30 flex items-center justify-center text-gold mb-2 shadow-inner">
            <MessageCircle className="w-8 h-8 fill-gold" />
          </div>

          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight">
            Quer comprar, vender ou alugar um imóvel?
          </h2>

          <p className="text-slate-300 text-sm sm:text-lg font-light leading-relaxed max-w-2xl">
            Clique no botão abaixo para iniciar uma conversa direto pelo WhatsApp. Receba atendimento dedicado e encontre o imóvel certo para sua necessidade com segurança e rapidez.
          </p>

          <div className="pt-4 w-full sm:w-auto">
            <a 
              href={getWhatsappUrl(generalContactMsg)}
              target="_blank"
              rel="noreferrer"
              referrerPolicy="no-referrer"
              className="w-full sm:w-auto bg-gold hover:bg-amber-700 active:bg-amber-800 text-white font-bold px-8 py-4.5 rounded-xl shadow-lg transition duration-200 inline-flex items-center justify-center gap-3 uppercase tracking-wider text-xs sm:text-sm"
              id="cta-whatsapp-direct"
            >
              <MessageCircle className="w-5 h-5 text-white fill-white" />
              Chamar no WhatsApp agora
            </a>
          </div>

          <span className="text-slate-400 text-xs font-light font-mono mt-2">
            Disponível para atendimento imediato em horário comercial.
          </span>
        </div>
      </section>

      {/* 10. Seção de Região de Atendimento */}
      <section id="regioes" className="py-20 bg-slate-50 scroll-mt-10 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-gold text-xs font-bold uppercase tracking-widest block mb-1">Localidade de Negócios</span>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-navy tracking-tight">
              Regiões de Atendimento
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm mt-2 font-light">
              Atendimento especializado para imóveis residenciais, comerciais e industriais nas seguintes regiões polo:
            </p>
          </div>

          {/* Grid de regiões com estilo de badge premium */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {serviceRegions.map((region, idx) => (
              <div 
                key={idx} 
                className="bg-white border border-slate-100 rounded-xl p-4 flex items-center gap-3 shadow-xs hover:border-gold hover:shadow-xs transition duration-200"
              >
                <div className="w-8 h-8 bg-blue-50 text-navy rounded-lg flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-gold" />
                </div>
                <div>
                  <span className="text-xs sm:text-sm font-bold text-slate-700">{region}</span>
                  <span className="block text-[9px] text-slate-400 font-light uppercase tracking-wider">Atuação Local</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center bg-white border border-slate-100 rounded-2xl p-6 max-w-2xl mx-auto shadow-xs">
            <p className="text-slate-500 text-xs sm:text-sm font-light">
              Possui imóvel fora dessas regiões acima e deseja anunciar conosco? 
              <a 
                href={getWhatsappUrl(`Olá! Tenho um imóvel em outra região e gostaria de conversar sobre consultoria especial.`)} 
                target="_blank"
                rel="noreferrer"
                referrerPolicy="no-referrer"
                className="text-navy font-semibold underline ml-1 hover:text-gold transition"
              >
                Consulte atendimento sob medida pelo WhatsApp.
              </a>
            </p>
          </div>

        </div>
      </section>

      {/* 11. Footer */}
      <footer className="bg-slate-950 text-slate-100 pt-16 pb-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-slate-800">
            
            {/* Logo, text representation and CRECI */}
            <div className="md:col-span-5 flex flex-col gap-4">
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <span className="font-display text-xl font-bold text-white tracking-tight">
                    {brokerConfig.brokerName}
                  </span>
                  <span className="font-display text-xl font-light text-gold tracking-tight">
                    Imóveis
                  </span>
                </div>
                <span className="text-[10px] uppercase tracking-widest text-gold font-bold mt-1">
                  CRECI {brokerConfig.creci}
                </span>
              </div>
              
              <p className="text-slate-400 text-xs sm:text-sm font-light leading-relaxed max-w-sm">
                Compra, venda e aluguel de imóveis residenciais, comerciais e corporativos com total transparência e atendimento qualificado pelo WhatsApp.
              </p>

              {/* Informações escritório */}
              <div className="flex flex-col gap-1.5 text-xs text-slate-400 pt-2 font-mono">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                  <span>{brokerConfig.mainOfficeRegion}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                  <span>{brokerConfig.whatsappFormatted}</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="md:col-span-3 flex flex-col gap-4">
              <h4 className="font-display text-sm font-bold text-white uppercase tracking-wider border-l-2 border-gold pl-2.5">
                Navegação Rápida
              </h4>
              <nav className="flex flex-col gap-2.5 text-xs text-slate-400">
                <a href="#inicio" className="hover:text-gold transition">Início</a>
                <a href="#imoveis" className="hover:text-gold transition">Imóveis em Destaque</a>
                <a href="#servicos" className="hover:text-gold transition">Serviços Oferecidos</a>
                <a href="#sobre" className="hover:text-gold transition">Sobre o Corretor</a>
                <a href="#regioes" className="hover:text-gold transition">Áreas de Atendimento</a>
              </nav>
            </div>

            {/* Redes Sociais Integradas */}
            <div className="md:col-span-4 flex flex-col gap-4">
              <h4 className="font-display text-sm font-bold text-white uppercase tracking-wider border-l-2 border-gold pl-2.5">
                Redes & Canais
              </h4>
              <p className="text-slate-400 text-xs font-light">
                Acompanhe o mercado, novidades, lançamentos exclusivos e dicas imobiliárias nas redes sociais.
              </p>
              
              <div className="flex items-center gap-3 pt-1">
                <a 
                  href={brokerConfig.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-gold hover:text-slate-950 flex items-center justify-center text-slate-300 transition-all duration-200"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a 
                  href={brokerConfig.facebookUrl}
                  target="_blank"
                  rel="noreferrer"
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-gold hover:text-slate-950 flex items-center justify-center text-slate-300 transition-all duration-200"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a 
                  href={getWhatsappUrl(generalContactMsg)}
                  target="_blank"
                  rel="noreferrer"
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-gold hover:text-slate-950 flex items-center justify-center text-slate-300 transition-all duration-200"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="w-5 h-5 fill-current" />
                </a>
              </div>

              <div className="bg-slate-800/50 rounded-xl p-3 border border-slate-700/40 text-[10px] text-slate-400 leading-relaxed font-mono mt-1">
                {brokerConfig.officeOpenHours}
              </div>
            </div>

          </div>

          {/* Legal bottom row representation */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 font-light">
            <p>© {new Date().getFullYear()} {brokerConfig.businessName}. Todos os direitos reservados. CRECI {brokerConfig.creci}.</p>
            <p>Atendimento prioritário em Nova Iguaçu e adjacências.</p>
          </div>
        </div>
      </footer>

      {/* 12. Botão Flutuante do WhatsApp */}
      <div className="fixed bottom-6 right-6 z-50">
        <a 
          href={getWhatsappUrl(generalContactMsg)}
          target="_blank"
          rel="noreferrer"
          referrerPolicy="no-referrer"
          className="group relative flex items-center gap-2.5 bg-[#25D366] text-white font-bold p-3.5 sm:py-3.5 sm:px-5 rounded-full shadow-2xl hover:bg-[#1ebd5d] active:scale-95 transition-all duration-200"
          aria-label="Conversar no WhatsApp"
          id="floating-whatsapp-btn"
        >
          {/* Radial Pulse Effect */}
          <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25 pointer-events-none group-hover:scale-110"></span>
          
          <MessageCircle className="w-6 h-6 fill-white text-white flex-shrink-0" />
          
          <span className="hidden sm:inline text-xs uppercase tracking-wider font-extrabold pr-0.5">
            WhatsApp
          </span>
        </a>
      </div>

    </div>
  );
}
