/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// ----------------------------------------------------
// Interfaces
// ----------------------------------------------------

export interface Property {
  id: string;
  title: string;
  type: 'Venda' | 'Aluguel';
  tag: 'Oportunidade' | 'Destaque' | 'Aluguel' | 'Novo' | 'Comercial' | string;
  bairro: string;
  cidade: string;
  price: string; // Fictional formatting (e.g., "R$ 280.000" or "R$ 1.350/mês")
  bedrooms: number;
  bathrooms: number;
  parkingSpaces: number;
  area: number; // in m²
  imageUrl: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
}

export interface HowItWorksStep {
  id: number;
  title: string;
  description: string;
}

// ----------------------------------------------------
// Global Configurable Variables (Edite facilmente aqui)
// ----------------------------------------------------

export const brokerConfig = {
  // Broker Details
  brokerName: "Rafael Almeida",
  brokerFullName: "Rafael Almeida",
  businessName: "Rafael Almeida Imóveis",
  creci: "00000-F", // Standard CRECI format, easy to replace
  whatsappNumber: "5521969060505", // Standard format: "5521969060505"
  whatsappFormatted: "(21) 96906-0505",

  // Social Links
  instagramUrl: "https://instagram.com/rafael_almeida_imoveis",
  facebookUrl: "https://facebook.com/rafael_almeida_imoveis",

  // Locations / Region details
  primaryCity: "Nova Iguaçu",
  stateAbbreviation: "RJ",
  officeOpenHours: "Segunda a Sexta: 09:00 às 18:00 | Sábado: 09:00 às 13:00",
  mainOfficeRegion: "Nova Iguaçu, RJ",

  // Theme Color Reference (Themed in CSS and inline classes)
  colors: {
    primaryDeepBlue: "#0f172a", // Elegant Geometric Balance Navy
    goldAccent: "#b45309",      // Subtle Amber Gold Accent
    bgLight: "#f8fafc",         // Off-white / light slate
    textDark: "#0f172a"         // Navy title text
  }
};

// ----------------------------------------------------
// Imóveis (Fácil de editar ou cadastrar novos)
// ----------------------------------------------------
export const propertiesList: Property[] = [
  {
    id: "prop-1",
    title: "Apartamento 2 quartos no Centro",
    type: "Venda",
    tag: "Oportunidade",
    bairro: "Centro",
    cidade: "Nova Iguaçu",
    price: "R$ 280.000",
    bedrooms: 2,
    bathrooms: 1,
    parkingSpaces: 1,
    area: 62,
    imageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "prop-2",
    title: "Casa duplex com garagem",
    type: "Venda",
    tag: "Destaque",
    bairro: "Bairro da Luz",
    cidade: "Nova Iguaçu",
    price: "R$ 420.000",
    bedrooms: 3,
    bathrooms: 2,
    parkingSpaces: 2,
    area: 110,
    imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "prop-3",
    title: "Apartamento próximo ao comércio",
    type: "Aluguel",
    tag: "Aluguel",
    bairro: "Califórnia",
    cidade: "Nova Iguaçu",
    price: "R$ 1.350/mês",
    bedrooms: 2,
    bathrooms: 1,
    parkingSpaces: 1,
    area: 58,
    imageUrl: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "prop-4",
    title: "Casa linear com quintal",
    type: "Venda",
    tag: "Novo",
    bairro: "Comendador Soares",
    cidade: "Nova Iguaçu",
    price: "R$ 350.000",
    bedrooms: 2,
    bathrooms: 2,
    parkingSpaces: 2,
    area: 95,
    imageUrl: "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "prop-5",
    title: "Cobertura com área gourmet",
    type: "Venda",
    tag: "Destaque",
    bairro: "Centro",
    cidade: "Nova Iguaçu",
    price: "R$ 590.000",
    bedrooms: 3,
    bathrooms: 3,
    parkingSpaces: 2,
    area: 140,
    imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "prop-6",
    title: "Loja comercial para aluguel",
    type: "Aluguel",
    tag: "Comercial",
    bairro: "Centro",
    cidade: "Nova Iguaçu",
    price: "R$ 2.500/mês",
    bedrooms: 0,
    bathrooms: 1,
    parkingSpaces: 0,
    area: 45,
    imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80"
  }
];

// ----------------------------------------------------
// Serviços (Lista simples e editável)
// ----------------------------------------------------
export const servicesList: Service[] = [
  {
    id: "srv-1",
    title: "Compra de imóveis",
    description: "Ajudo você a encontrar o imóvel ideal dentro do seu perfil e orçamento."
  },
  {
    id: "srv-2",
    title: "Venda de imóveis",
    description: "Divulgue seu imóvel com orientação profissional e atendimento aos interessados."
  },
  {
    id: "srv-3",
    title: "Aluguel de imóveis",
    description: "Opções para quem busca alugar casa, apartamento ou ponto comercial."
  },
  {
    id: "srv-4",
    title: "Avaliação de imóvel",
    description: "Receba uma orientação inicial sobre valor de venda ou aluguel do seu imóvel."
  },
  {
    id: "srv-5",
    title: "Atendimento pelo WhatsApp",
    description: "Tire dúvidas, consulte oportunidades e agende visitas com praticidade."
  },
  {
    id: "srv-6",
    title: "Agendamento de visitas",
    description: "Combine o melhor horário para conhecer o imóvel de interesse."
  }
];

// ----------------------------------------------------
// Como Funciona Steps (Passo a passo rápido)
// ----------------------------------------------------
export const howItWorksSteps: HowItWorksStep[] = [
  {
    id: 1,
    title: "Escolha uma opção",
    description: "Veja os imóveis disponíveis ou fale sobre o que você procura."
  },
  {
    id: 2,
    title: "Chame no WhatsApp",
    description: "Envie sua mensagem diretamente para o corretor."
  },
  {
    id: 3,
    title: "Receba orientação",
    description: "Tire dúvidas sobre preço, localização, documentação e disponibilidade."
  },
  {
    id: 4,
    title: "Agende uma visita",
    description: "Combine o melhor dia e horário para conhecer o imóvel."
  }
];

// ----------------------------------------------------
// Regiões de Atendimento
// ----------------------------------------------------
export const serviceRegions: string[] = [
  "Nova Iguaçu",
  "Centro",
  "Califórnia",
  "Comendador Soares",
  "Bairro da Luz",
  "Mesquita",
  "Nilópolis",
  "Belford Roxo"
];
