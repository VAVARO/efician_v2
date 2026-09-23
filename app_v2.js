/* ========================================================================= */
/* EFICIAN — APPLICATION ENGINE (v2: Viewport-Locked / Reactive State)      */
/* Conforme a: Impeccable Design, Emil Kowalski Design Eng & Apple Design    */
/* ========================================================================= */

// -------------------------------------------------------------------------
// 1. BASES DE DATOS OFICIALES Y CONSTANTES
// -------------------------------------------------------------------------

const AYSEN_COMMUNES_DATA = {
  coyhaique: {
    name: 'Coyhaique',
    lat: -45.5712,
    lon: -72.0683,
    elevation: 284,
    ghiAnnual: 1240,
    tempAnnual: 8.5,
    windAnnual: 4.2,
    annualYieldPerKwp: 1180,
    monthlyYieldPerKwp: [152, 128, 110, 78, 52, 38, 44, 68, 98, 126, 142, 144]
  },
  puerto_aysen: {
    name: 'Puerto Aysén',
    lat: -45.4050,
    lon: -72.6980,
    elevation: 12,
    ghiAnnual: 1110,
    tempAnnual: 9.1,
    windAnnual: 3.6,
    annualYieldPerKwp: 1040,
    monthlyYieldPerKwp: [136, 114, 96, 68, 45, 32, 38, 58, 86, 112, 126, 129]
  },
  chile_chico: {
    name: 'Chile Chico',
    lat: -46.5400,
    lon: -71.7250,
    elevation: 215,
    ghiAnnual: 1480,
    tempAnnual: 10.2,
    windAnnual: 5.1,
    annualYieldPerKwp: 1390,
    monthlyYieldPerKwp: [178, 150, 130, 92, 64, 48, 55, 82, 116, 148, 162, 165]
  },
  cochrane: {
    name: 'Cochrane',
    lat: -47.2540,
    lon: -72.5710,
    elevation: 180,
    ghiAnnual: 1310,
    tempAnnual: 8.8,
    windAnnual: 4.0,
    annualYieldPerKwp: 1230,
    monthlyYieldPerKwp: [158, 134, 115, 81, 55, 40, 46, 71, 102, 131, 146, 151]
  },
  puerto_cisnes: {
    name: 'Puerto Cisnes',
    lat: -44.7430,
    lon: -72.6990,
    elevation: 8,
    ghiAnnual: 1080,
    tempAnnual: 8.9,
    windAnnual: 3.8,
    annualYieldPerKwp: 1010,
    monthlyYieldPerKwp: [132, 110, 93, 66, 44, 31, 37, 56, 84, 109, 122, 126]
  },
  rio_ibanez: {
    name: 'Río Ibáñez',
    lat: -46.2890,
    lon: -71.9330,
    elevation: 220,
    ghiAnnual: 1360,
    tempAnnual: 9.4,
    windAnnual: 4.8,
    annualYieldPerKwp: 1280,
    monthlyYieldPerKwp: [164, 138, 120, 85, 58, 43, 50, 75, 107, 137, 151, 152]
  },
  tortel: {
    name: 'Caleta Tortel',
    lat: -47.7960,
    lon: -73.5340,
    elevation: 15,
    ghiAnnual: 990,
    tempAnnual: 7.9,
    windAnnual: 4.5,
    annualYieldPerKwp: 920,
    monthlyYieldPerKwp: [120, 100, 85, 60, 40, 28, 33, 50, 76, 99, 111, 118]
  },
  villa_ohiggins: {
    name: 'Villa O Higgins',
    lat: -48.4680,
    lon: -72.5620,
    elevation: 260,
    ghiAnnual: 1190,
    tempAnnual: 7.2,
    windAnnual: 4.4,
    annualYieldPerKwp: 1110,
    monthlyYieldPerKwp: [144, 121, 104, 73, 49, 36, 41, 63, 91, 118, 133, 137]
  }
};

const CONSUMPTION_PRESETS = {
  residencial: [
    { label: 'Depto / Pareado', kwh: 220, pesos: 55000 },
    { label: 'Casa Familiar', kwh: 380, pesos: 95000 },
    { label: 'Casa Amplia', kwh: 580, pesos: 145000 },
    { label: 'Parcela / Climatizada', kwh: 920, pesos: 230000 }
  ],
  comercial: [
    { label: 'Local / Oficina', kwh: 950, pesos: 240000 },
    { label: 'Café / Restaurante', kwh: 1800, pesos: 450000 },
    { label: 'Taller / Bodega', kwh: 3200, pesos: 800000 },
    { label: 'Planta Productiva', kwh: 6500, pesos: 1625000 }
  ]
};

const KITS_DATABASE = {
  'kit-3-2': {
    id: 'kit-3-2',
    name: 'Kit Solar 3.2 kW On-Grid',
    type: 'On-Grid Residencial (Net Billing)',
    category: 'ongrid',
    power: '3.2 kWp',
    price: 3490000,
    inverter: 'Inversor String Monofásico 3.0 kW (Certificado SEC)',
    panels: '6 paneles monocristalinos Tier-1 550W',
    storage: 'Sin baterías (Inyección directa a red)',
    area: '16 m²',
    generation: '~3.780 kWh / año en Coyhaique',
    idealFor: 'Casas pareadas y consumos hasta $70.000/mes',
    warranty: '12 años paneles / 5 años inversor',
    backup: 'No disponible en cortes de luz',
    image: 'IMAGENES_EFICIAN/IMAGENES/3.jpg'
  },
  'kit-5-5': {
    id: 'kit-5-5',
    name: 'Kit Solar 5.5 kW Híbrido',
    type: 'Híbrido Inteligente (Respaldo EPS)',
    category: 'ongrid',
    power: '5.5 kWp',
    price: 6890000,
    inverter: 'Inversor Híbrido 5.0 kW con transferencia automática',
    panels: '10 paneles monocristalinos Tier-1 550W',
    storage: 'Banco LiFePO4 5.12 kWh (100Ah / 51.2V)',
    area: '26 m²',
    generation: '~6.490 kWh / año en Coyhaique',
    idealFor: 'Casas familiares con respaldo crítico ante temporales',
    warranty: '12 años paneles / 10 años baterías (6000 ciclos)',
    backup: 'Hasta 12 hrs de consumos esenciales',
    image: 'IMAGENES_EFICIAN/IMAGENES/casa alta resulucion.jpg',
    popular: true
  },
  'kit-8-8': {
    id: 'kit-8-8',
    name: 'Kit Solar 8.8 kW Off-Grid',
    type: 'Off-Grid Aislado de Red',
    category: 'offgrid',
    power: '8.8 kWp',
    price: 9950000,
    inverter: 'Inversor / Cargador Off-Grid 8.0 kW 48V',
    panels: '16 paneles monocristalinos Tier-1 550W',
    storage: 'Banco LiFePO4 10.24 kWh modular de alto ciclado',
    area: '42 m²',
    generation: '~10.380 kWh / año en Aysén',
    idealFor: 'Parcelas sin red eléctrica o cabañas turísticas',
    warranty: '12 años paneles / 10 años baterías',
    backup: 'Autonomía continua 100% aislada de red',
    image: 'IMAGENES_EFICIAN/IMAGENES/WhatsApp Image 2026-08-18 at 16.03.55.jpeg'
  },
  'kit-12-0': {
    id: 'kit-12-0',
    name: 'Kit Solar 12.0 kW Comercial',
    type: 'Trifásico Comercial / Industrial',
    category: 'ongrid',
    power: '12.0 kWp',
    price: 13800000,
    inverter: 'Inversor Trifásico 12.0 kW Dual MPPT (SEC TE4)',
    panels: '22 paneles bifaciales Tier-1 550W',
    storage: 'Opcional (Compatible con BESS 15-30 kWh)',
    area: '58 m²',
    generation: '~14.160 kWh / año en Aysén',
    idealFor: 'Pymes, talleres, frigoríficos y lecherías',
    warranty: '15 años paneles / 5 años inversor',
    backup: 'Monitoreo dinámico de inyección cero',
    image: 'IMAGENES_EFICIAN/IMAGENES/WhatsApp Image 2026-08-18 at 16.08.59.jpeg'
  }
};

const SERVICES_COST = {
  instalacion: 850000,
  sec: 350000,
  flete: 120000,
  mantencion: 180000
};

const TARIFF_RATES = {
  BT1: { key: 'BT1', name: 'BT-1 Residencial Simple', rate: 250, desc: 'Monofásica Simple (~$250/kWh)' },
  BT2_3: { key: 'BT2_3', name: 'BT-2 / BT-3 Demanda Contratada', rate: 225, desc: 'Demanda Contratada (~$225/kWh)' },
  BT4: { key: 'BT4', name: 'BT-4 Horario Punta', rate: 280, desc: 'Diferenciada Invierno (~$280/kWh)' },
  AT: { key: 'AT', name: 'AT Comercial / Agrícola', rate: 185, desc: 'Alta Tensión (>1 kV) (~$185/kWh)' }
};

// -------------------------------------------------------------------------
// 2. ESTADO GLOBAL REACTIVO
// -------------------------------------------------------------------------
const AppState = {
  currentView: 'landing',
  history: ['landing'],
  nosotrosSection: 'efician',
  serviciosSection: 'diagnostico',
  cart: [],
  wizard: {
    currentSlide: 1,
    profile: 'residencial', // 'residencial' | 'comercial'
    goal: 'savings', // 'savings' | 'backup' | 'autonomy'
    tariff: 'BT1',
    uploadedBill: null,
    amount: 95000,
    kwh: 380,
    property: 'casa',
    commune: 'coyhaique',
    lat: -45.5712,
    lon: -72.0683,
    elevation: 284,
    recommendedKit: 'kit-5-5',
    isRoofMeasured: false,
    measuredArea: 0,
    usableArea: 0,
    maxPanels: 0,
    maxKwp: 0,
    roofSegments: []
  }
};

// -------------------------------------------------------------------------
// 3. CONTENIDOS OFICIALES DE LA MAQUETA PPT (NOSOTROS & SERVICIOS)
// -------------------------------------------------------------------------
const NosotrosData = {
  efician: {
    title: 'EFICIAN',
    text: 'Somos una empresa de soluciones energéticas, sostenibilidad, ingeniería y recursos renovables que integra tecnología para impulsar desarrollo sostenible, transformación energética y compromiso local.',
    type: 'text'
  },
  que_hacemos: {
    title: 'Qué Hacemos',
    text: 'Diseñamos e implementamos proyectos de eficiencia energética y tecnología aplicada, transformando el consumo energético en ahorro, autonomía y crecimiento. Nuestro enfoque combina innovación técnica con impacto real, eliminando barreras de acceso para acelerar la transición hacia un futuro sostenible.',
    type: 'text'
  },
  vision_mision: {
    title: 'Visión y Misión',
    text: 'Impulsar el desarrollo sustentable por medio del diseño e implementación de soluciones energéticas eficientes que integren ingeniería avanzada, innovación y energías renovables, facilitando el acceso a proyectos sostenibles mediante modelos de financiamiento colaborativo y adecuada autogestión de recursos naturales.',
    type: 'text'
  },
  proposito: {
    title: 'Propósito',
    text: 'Transformar la energía en desarrollo sostenible, eliminando barreras económicas y tecnológicas para acelerar la transición hacia un futuro más eficiente, colaborativo y sustentable.',
    type: 'text'
  },
  valores: {
    title: 'Valores Corporativos',
    type: 'acronym',
    items: [
      { letter: 'E', word: 'Energía', desc: 'Transformación y uso responsable' },
      { letter: 'F', word: 'Financiamiento Colaborativo', desc: 'Modelos inclusivos de acceso' },
      { letter: 'I', word: 'Innovación', desc: 'Tecnología aplicada de vanguardia' },
      { letter: 'C', word: 'Cooperación', desc: 'Alianzas con impacto territorial' },
      { letter: 'I', word: 'Integración', desc: 'Soluciones integrales de ingeniería' },
      { letter: 'A', word: 'Autoconsumo', desc: 'Autonomía y eficiencia para hogares y pymes' },
      { letter: 'N', word: 'Naturaleza', desc: 'Compromiso genuino con la Patagonia' }
    ]
  },
  ods: {
    title: 'Objetivos de Desarrollo Sostenible (ODS)',
    type: 'ods',
    items: [
      { num: '7', title: 'Energía accesible y no contaminante', desc: 'Generación limpia distribuida' },
      { num: '8', title: 'Trabajo decente y crecimiento económico', desc: 'Desarrollo productivo regional' },
      { num: '9', title: 'Industria, Innovación e infraestructura', desc: 'Sistemas resilientes y modernos' },
      { num: '11', title: 'Ciudades y comunidades sostenibles', desc: 'Descarbonización local' },
      { num: '17', title: 'Alianzas para lograr los Objetivos', desc: 'Colaboración pública y privada' }
    ]
  }
};

const ServiciosData = {
  diagnostico: {
    title: 'Diagnóstico Energético',
    items: [
      { id: 'diag_1', name: 'Diagnóstico energético', desc: 'Un diagnóstico energético es un estudio técnico básico que analiza cómo una organización utiliza su energía. Expone las características principales de la infraestructura e identifica claramente las fuentes de consumo energético para cada área de la línea de producción, permite visualizar la línea base, desde la cual se podrán calcular retornos de inversión y ahorros proyectados.', cta: 'contratar' },
      { id: 'diag_2', name: 'Cálculo del potencial de generación FV', desc: 'Un cálculo de potencial fotovoltaico permite visualizar la línea base y dimensionar el recurso solar óptimo, desde el cual se podrán calcular retornos de inversión y ahorros proyectados según irradiación en Aysén.', cta: 'calcular' },
      { id: 'diag_3', name: 'Estudio tarifario', desc: 'Análisis detallado de contratos eléctricos, cargos por potencia y optimización de tarifas BT y AT para reducir costos fijos de suministro.', cta: 'contratar' },
      { id: 'diag_4', name: 'Evaluación de envolvente térmico', desc: 'Estudio termográfico e higrotérmico de muros, techumbres y ventanas para minimizar pérdidas de calor y optimizar la climatización.', cta: 'contratar' },
      { id: 'diag_5', name: 'Potencial de eficiencia energético', desc: 'Identificación de oportunidades de mejora en motores, iluminación LED y gestión inteligente de cargas.', cta: 'contratar' }
    ]
  },
  diseno: {
    title: 'Diseño de Proyectos',
    items: [
      { id: 'dis_1', name: 'Diseño fotovoltaico On-Grid y Off-Grid', desc: 'Planos unilineales, memoria de cálculo, dimensionamiento de módulos solares, inversores y bancos de baterías.', cta: 'contratar' },
      { id: 'dis_2', name: 'Arquitectura bioclimática', desc: 'Diseño pasivo de edificaciones aprovechando la orientación solar y ventilación natural en el clima patagónico.', cta: 'contratar' },
      { id: 'dis_3', name: 'Simulación energética computacional', desc: 'Modelación con software especializado de rendimiento horario y pérdidas por sombreado.', cta: 'contratar' }
    ]
  },
  ingenieria: {
    title: 'Ingeniería Especializada',
    items: [
      { id: 'ing_1', name: 'Ingeniería Eléctrica (empresa socia)', desc: 'Desarrollo de proyectos de media y baja tensión con certificación SEC TE-1 y TE-4.', cta: 'contratar' },
      { id: 'ing_2', name: 'Ingeniería de climatización (empresa socia)', desc: 'Sistemas de bombas de calor, aerotermia y ventilación de alta eficiencia.', cta: 'contratar' },
      { id: 'ing_3', name: 'Especificaciones técnicas de proyectos', desc: 'Documentación técnica completa para licitaciones públicas y privadas.', cta: 'contratar' },
      { id: 'ing_4', name: 'Cálculo y detalles constructivos', desc: 'Estructuras de montaje certificadas para soportar vientos y cargas de nieve en la Patagonia.', cta: 'contratar' },
      { id: 'ing_5', name: 'Arquitectura de diseño pasivo', desc: 'Optimización de envolventes térmicos e iluminación diurna.', cta: 'contratar' },
      { id: 'ing_6', name: 'Desarrollo Sustentable corporativo', desc: 'Estrategias ESG y planes de descarbonización para empresas.', cta: 'contratar' }
    ]
  },
  ejecucion: {
    title: 'Ejecución y Montaje',
    items: [
      { id: 'ej_1', name: 'Instalación y montaje fotovoltaico', desc: 'Montaje llave en mano realizado por instaladores autorizados SEC bajo rigurosos protocolos de seguridad.', cta: 'contratar' },
      { id: 'ej_2', name: 'Tramitación y Declaración SEC (TE-4)', desc: 'Gestión íntegra de conexión a red bajo la Ley 20.571 de Generación Distribuida (Net Billing).', cta: 'contratar' },
      { id: 'ej_3', name: 'Puesta en marcha y pruebas de carga', desc: 'Calibración de inversores, configuraciones de monitoreo remoto por app y verificación operativa.', cta: 'contratar' }
    ]
  },
  operacion: {
    title: 'Operación y Mantenimiento',
    items: [
      { id: 'op_1', name: 'Monitoreo 24/7 de rendimiento', desc: 'Supervisión en tiempo real de generación y detección preventiva de fallas.', cta: 'contratar' },
      { id: 'op_2', name: 'Mantenimiento preventivo y correctivo', desc: 'Limpieza técnica de paneles, reapriete de terminales y revisión de aislamiento.', cta: 'contratar' },
      { id: 'op_3', name: 'Auditorías de desempeño', desc: 'Evaluación periódica del Performance Ratio (PR) y retornos de inversión.', cta: 'contratar' }
    ]
  },
  proyectos: {
    title: 'Proyectos Integrales',
    items: [
      { id: 'proy_1', name: 'Diagnóstico Energético Integral', desc: 'Evaluación 360° para plantas industriales, agroindustria y centros de salud.', cta: 'contratar' },
      { id: 'proy_2', name: 'Auditoría de eficiencia energética', desc: 'Estudio exhaustivo de consumos y balances térmico-eléctricos.', cta: 'contratar' },
      { id: 'proy_3', name: 'Modelos de gestión energética ISO 50.001', desc: 'Implementación y acompañamiento para certificación internacional de gestión energética.', cta: 'contratar' },
      { id: 'proy_4', name: 'Modelación y Simulación Energética', desc: 'Análisis dinámico de demandas.', cta: 'contratar' },
      { id: 'proy_5', name: 'Acondicionamiento térmico', desc: 'Mejoras integrales de aislación.', cta: 'contratar' },
      { id: 'proy_6', name: 'Proyectos de Energía renovable', desc: 'Microredes aisladas y proyectos solares a gran escala con almacenamiento BESS.', cta: 'contratar' }
    ]
  }
};

// -------------------------------------------------------------------------
// 4. MOTOR DE ENRUTAMIENTO DEL LADO DEL CLIENTE (ROUTER & BROWSER HISTORY)
// -------------------------------------------------------------------------
const Router = {
  isNavigating: false,
  previousRoute: null,

  // Normalizar y obtener ruta actual desde el Hash
  getRoute() {
    const raw = window.location.hash || '';
    if (!raw || raw === '#' || raw === '#/') return '/inicio';
    const clean = raw.startsWith('#') ? raw.slice(1) : raw;
    return clean.startsWith('/') ? clean : '/' + clean;
  },

  // Navegar a una ruta
  navigate(path, options = {}) {
    const clean = path.startsWith('#') ? path.slice(1) : path;
    const target = '#' + (clean.startsWith('/') ? clean : '/' + clean);

    if (window.location.hash === target) {
      this.handleRoute(this.getRoute());
      return;
    }

    if (options.replace) {
      history.replaceState(null, '', target);
      this.handleRoute(this.getRoute());
    } else {
      window.location.hash = target;
    }
  },

  // Procesar y aplicar la ruta a las vistas, slides y modales
  handleRoute(path) {
    if (this.isNavigating) return;
    this.isNavigating = true;

    try {
      const parts = path.split('/').filter(Boolean);
      const main = parts[0] || 'inicio';
      const sub1 = parts[1] || null;
      const sub2 = parts[2] || null;

      // 1. Sincronizar Modales y Drawers según la ruta
      this.syncModalsWithRoute(main, sub1, sub2);

      // 2. Resolver Vistas y Componentes
      switch (main) {
        case 'inicio':
        case 'landing':
          this.activateViewContainer('landing');
          break;

        case 'nosotros':
          this.activateViewContainer('nosotros');
          const nosSub = (sub1 && NosotrosData[sub1]) ? sub1 : (AppState.nosotrosSection || 'efician');
          AppState.nosotrosSection = nosSub;
          applyNosotrosSectionDom(nosSub);
          break;

        case 'servicios':
          this.activateViewContainer('servicios');
          const srvSub = (sub1 && ServiciosData[sub1]) ? sub1 : (AppState.serviciosSection || 'diagnostico');
          AppState.serviciosSection = srvSub;
          applyServiciosSectionDom(srvSub);
          break;

        case 'calculadora':
          this.activateViewContainer('calculadora');
          let slide = 1;
          if (sub1) {
            if (sub1.startsWith('paso-')) slide = parseInt(sub1.replace('paso-', ''), 10) || 1;
            else slide = parseInt(sub1, 10) || 1;
          } else {
            slide = AppState.wizard.currentSlide || 1;
          }
          applySlideDom(Math.max(1, Math.min(4, slide)));
          break;

        case 'tienda':
          this.activateViewContainer('tienda');
          if (sub1 === 'kit' && sub2 && KITS_DATABASE[sub2]) {
            applyKitDetailsDom(sub2);
          } else {
            closeKitDetailsDom();
            const cat = sub1 || 'all';
            renderShopProducts(cat);
            document.querySelectorAll('#view-tienda button[onclick*="renderShopProducts"]').forEach(btn => {
              const bCat = btn.getAttribute('onclick')?.match(/renderShopProducts\('([^']+)'\)/)?.[1];
              if (bCat === cat) {
                btn.className = 'px-2.5 py-0.5 rounded-lg text-xs font-light text-[#00FFFF] bg-white/10';
              } else {
                btn.className = 'px-2.5 py-0.5 rounded-lg text-xs font-light text-slate-300 hover:text-white hover:bg-white/10';
              }
            });
          }
          break;

        case 'informacion':
          this.activateViewContainer('informacion');
          break;

        case 'cotiza':
          this.activateViewContainer('cotiza');
          break;

        case 'contacto':
          this.activateViewContainer('contacto');
          break;

        case 'asistencia':
          this.activateViewContainer('asistencia');
          break;

        case 'carrito':
          applyCartDrawerDom(true);
          break;

        case 'checkout':
          applyCheckoutModalDom(true);
          break;

        case 'sumate':
          applyLeadModalDom(true, sub1 ? decodeURIComponent(sub1) : 'Súmate');
          break;

        case 'asistente':
        case 'bot':
          applyFaqBotDom(true);
          if (sub1 && FAQ_ANSWERS[sub1]) triggerBotAnswer(sub1);
          break;

        case 'socios':
          if (ownerState.unlocked) {
            applyOwnerFullscreenDom(true);
            const tab = sub1 || ownerState.activeTab || 'metricas';
            applyOwnerPortalTabDom(tab);
          } else {
            applyOwnerAuthModalDom(true);
          }
          break;

        default:
          this.activateViewContainer('landing');
          break;
      }

      this.previousRoute = path;
    } finally {
      this.isNavigating = false;
    }
  },

  activateViewContainer(viewName) {
    AppState.currentView = viewName;

    // Actualizar contenedor
    document.querySelectorAll('.view-container').forEach(v => {
      v.classList.remove('active-view');
    });
    const target = document.getElementById('view-' + viewName);
    if (target) target.classList.add('active-view');

    // Actualizar botones de navegación superior
    document.querySelectorAll('.nav-pill').forEach(btn => {
      if (btn.dataset.view === viewName) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    if (viewName === 'nosotros') {
      renderNosotrosContent();
      setTimeout(() => updateConnectingLines('nosotros'), 60);
    } else if (viewName === 'servicios') {
      renderServiciosContent();
      setTimeout(() => updateConnectingLines('servicios'), 60);
    } else if (viewName === 'tienda') {
      renderShopProducts('all');
    }
  },

  syncModalsWithRoute(main, sub1, sub2) {
    if (main !== 'tienda' || sub1 !== 'kit') closeKitDetailsDom();
    if (main !== 'carrito') applyCartDrawerDom(false);
    if (main !== 'checkout') applyCheckoutModalDom(false);
    if (main !== 'sumate') applyLeadModalDom(false);
    if (main !== 'socios') {
      applyOwnerAuthModalDom(false);
      applyOwnerFullscreenDom(false);
      closeOwnerLeadDetailDom();
    }
  },

  init() {
    window.addEventListener('hashchange', () => {
      this.handleRoute(this.getRoute());
    });

    window.addEventListener('popstate', () => {
      this.handleRoute(this.getRoute());
    });

    const initial = this.getRoute();
    if (!window.location.hash || window.location.hash === '#' || window.location.hash === '#/') {
      this.navigate('/inicio', { replace: true });
    } else {
      this.handleRoute(initial);
    }
  }
};

function switchView(viewName) {
  if (!viewName) return;
  if (viewName === 'landing') Router.navigate('/inicio');
  else if (viewName === 'nosotros') Router.navigate('/nosotros/' + (AppState.nosotrosSection || 'efician'));
  else if (viewName === 'servicios') Router.navigate('/servicios/' + (AppState.serviciosSection || 'diagnostico'));
  else if (viewName === 'calculadora') Router.navigate('/calculadora/paso-' + (AppState.wizard.currentSlide || 1));
  else Router.navigate('/' + viewName);
}

function goBack() {
  if (window.history.length > 1 && window.location.hash && window.location.hash !== '#/inicio' && window.location.hash !== '#/') {
    window.history.back();
  } else {
    Router.navigate('/inicio');
  }
}

// -------------------------------------------------------------------------
// -------------------------------------------------------------------------
// 5. NAVEGACIÓN Y RENDERIZADO DE NOSOTROS & SERVICIOS (CON REACCIÓN HOVER)
// -------------------------------------------------------------------------
function selectNosotrosSection(subKey) {
  Router.navigate('/nosotros/' + subKey);
}

function hoverNosotrosSection(subKey) {
  if (AppState.nosotrosSection === subKey) return;
  applyNosotrosSectionDom(subKey);
}

function applyNosotrosSectionDom(subKey) {
  AppState.nosotrosSection = subKey;
  document.querySelectorAll('#nosotros-menu .subnav-btn').forEach(btn => {
    if (btn.dataset.sub === subKey) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
  renderNosotrosContent();
  updateConnectingLines('nosotros');
}

function renderNosotrosContent() {
  const container = document.getElementById('nosotros-content-card');
  if (!container) return;

  const data = NosotrosData[AppState.nosotrosSection];
  if (!data) return;

  // Renderizado limpio sin títulos redundantes repetidos y textos 100% justificados
  if (data.type === 'text') {
    container.innerHTML = `
      <div class="calc-slide p-5 sm:p-6 rounded-2xl ppt-glass-panel-translucent border border-cyan-400/25 shadow-2xl">
        <div class="w-8 h-[2px] bg-[#00FFFF] mb-3"></div>
        <p class="text-xs sm:text-sm text-slate-100 font-light leading-relaxed text-justify">
          ${data.text}
        </p>
      </div>
    `;
  } else if (data.type === 'acronym') {
    const itemsHtml = data.items.map((item, idx) => `
      <div class="ppt-translucent-bar flex items-start gap-3 p-3 transition-transform" style="animation-delay: ${idx * 30}ms">
        <div class="w-7 h-7 rounded-lg bg-[#00FFFF]/20 border border-[#00FFFF]/60 text-[#00FFFF] flex items-center justify-center font-mono font-medium text-sm shrink-0">
          ${item.letter}
        </div>
        <div class="flex-1">
          <div class="text-xs sm:text-sm font-medium text-white mb-0.5">${item.word}</div>
          <p class="text-xs text-slate-200 font-light leading-relaxed text-justify">${item.desc}</p>
        </div>
      </div>
    `).join('');

    container.innerHTML = `
      <div class="calc-slide space-y-2">
        ${itemsHtml}
      </div>
    `;
  } else if (data.type === 'ods') {
    const itemsHtml = data.items.map((item, idx) => `
      <div class="ppt-translucent-bar flex items-start gap-3 p-3 transition-transform" style="animation-delay: ${idx * 30}ms">
        <div class="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-400 text-emerald-300 flex items-center justify-center font-mono font-medium text-sm shrink-0">
          ${item.num}
        </div>
        <div class="flex-1">
          <div class="text-xs sm:text-sm font-medium text-white mb-0.5">${item.title}</div>
          <p class="text-xs text-slate-200 font-light leading-relaxed text-justify">${item.desc}</p>
        </div>
      </div>
    `).join('');

    container.innerHTML = `
      <div class="calc-slide space-y-2">
        ${itemsHtml}
      </div>
    `;
  }

  setTimeout(() => updateConnectingLines('nosotros'), 50);
}

function selectServiciosSection(subKey) {
  Router.navigate('/servicios/' + subKey);
}

function hoverServiciosSection(subKey) {
  if (AppState.serviciosSection === subKey) return;
  applyServiciosSectionDom(subKey);
}

function hoverSubService(subId) {
  if (AppState.selectedSubServiceId === subId) return;
  AppState.selectedSubServiceId = subId;
  renderServiciosContent();
}

function selectSubService(subId) {
  AppState.selectedSubServiceId = (AppState.selectedSubServiceId === subId) ? null : subId;
  renderServiciosContent();
}

function applyServiciosSectionDom(subKey) {
  AppState.serviciosSection = subKey;
  AppState.selectedSubServiceId = null; // Reiniciar al primer sub-servicio
  document.querySelectorAll('#servicios-menu .subnav-btn').forEach(btn => {
    if (btn.dataset.sub === subKey) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
  renderServiciosContent();
  updateConnectingLines('servicios');
}

function renderServiciosContent() {
  const container = document.getElementById('servicios-content-card');
  if (!container) return;

  const data = ServiciosData[AppState.serviciosSection];
  if (!data) return;

  // Por defecto, seleccionar el primer sub-servicio si no hay ninguno activo
  if (!AppState.selectedSubServiceId || !data.items.some(it => it.id === AppState.selectedSubServiceId)) {
    AppState.selectedSubServiceId = data.items[0].id;
  }

  // Renderizado dinámico de barras translúcidas con hover instantáneo
  const itemsHtml = data.items.map((item, idx) => {
    const isActive = (item.id === AppState.selectedSubServiceId);
    return `
      <div class="stagger-item space-y-0" style="animation-delay: ${idx * 30}ms">
        <div onmouseenter="hoverSubService('${item.id}')"
             onclick="selectSubService('${item.id}')" 
             class="ppt-translucent-bar ${isActive ? 'active' : ''} ${isActive ? 'rounded-b-none' : ''}">
          <div class="flex items-center gap-2.5">
            <span class="w-1.5 h-1.5 rounded-full ${isActive ? 'bg-[#00FFFF] shadow-[0_0_8px_#00FFFF]' : 'bg-white/40'}"></span>
            <span class="bar-title text-xs sm:text-sm font-medium ${isActive ? 'text-[#00FFFF]' : 'text-slate-100'}">${item.name}</span>
          </div>
          <svg class="w-3.5 h-3.5 text-cyan-400 transition-transform ${isActive ? 'rotate-90' : 'opacity-60'}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </div>

        ${isActive ? `
          <div class="ppt-detail-drawer space-y-2.5 text-left">
            <p class="text-xs sm:text-sm text-slate-100 font-light leading-relaxed text-justify">
              ${item.desc}
            </p>
            <div class="pt-1 flex items-center justify-between gap-3">
              ${item.cta === 'calcular' ? `
                <button onclick="switchView('calculadora')" class="px-4 py-2 rounded-xl bg-[#00FFFF] hover:bg-white text-[#001D30] font-medium text-xs tracking-wider uppercase transition-all shadow-lg shadow-cyan-500/25 flex items-center gap-2">
                  <span>Haz tu cálculo aquí</span>
                  <span>➔</span>
                </button>
              ` : `
                <button onclick="openLeadModal('${item.name}')" class="px-4 py-2 rounded-xl bg-[#00FFFF] hover:bg-white text-[#001D30] font-medium text-xs tracking-wider uppercase transition-all shadow-lg shadow-cyan-500/25 flex items-center gap-2">
                  <span>Contrata aquí</span>
                  <span>➔</span>
                </button>
              `}
              <span class="text-[11px] text-cyan-300/80 font-mono">Ingeniería SEC Aysén</span>
            </div>
          </div>
        ` : ''}
      </div>
    `;
  }).join('');

  container.innerHTML = `
    <div class="calc-slide space-y-2">
      ${itemsHtml}
    </div>
  `;

  setTimeout(() => updateConnectingLines('servicios'), 50);
}


// Recreación de Líneas Conectoras Estilo Presentación Oficial EFICIAN
function updateConnectingLines(viewName) {
  const isNosotros = (viewName === 'nosotros');
  const isServicios = (viewName === 'servicios');
  if (!isNosotros && !isServicios) return;

  const sectionEl = document.getElementById(isNosotros ? 'view-nosotros' : 'view-servicios');
  const svgEl = document.getElementById(isNosotros ? 'nosotros-connector-svg' : 'servicios-connector-svg');
  const menuEl = document.getElementById(isNosotros ? 'nosotros-menu' : 'servicios-menu');
  const contentCard = document.getElementById(isNosotros ? 'nosotros-content-card' : 'servicios-content-card');
  const activeBtn = menuEl?.querySelector('.subnav-btn.active');

  if (!sectionEl || !svgEl || !menuEl || !contentCard || !activeBtn) return;

  const sectionRect = sectionEl.getBoundingClientRect();
  const menuRect = menuEl.getBoundingClientRect();
  const btnRect = activeBtn.getBoundingClientRect();
  const cardRect = contentCard.getBoundingClientRect();

  // Coordenadas relativas
  const vertX = Math.round(menuRect.left - sectionRect.left - 10);
  const vertTopY = Math.round(menuRect.top - sectionRect.top + 6);
  const vertBottomY = Math.round(menuRect.bottom - sectionRect.top - 6);

  const btnRightX = Math.round(btnRect.right - sectionRect.left);
  const btnCenterY = Math.round(btnRect.top + btnRect.height / 2 - sectionRect.top);
  const cardLeftX = Math.round(cardRect.left - sectionRect.left);

  svgEl.innerHTML = `
    <defs>
      <filter id="glow-dot-${viewName}" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="2" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    <!-- Línea Vertical Punteada del Menú Izquierdo -->
    <line x1="${vertX}" y1="${vertTopY}" x2="${vertX}" y2="${vertBottomY}" 
          stroke="#00FFFF" stroke-width="1.5" stroke-dasharray="3, 3" stroke-opacity="0.6" />
    <circle cx="${vertX}" cy="${vertTopY}" r="3" fill="#00FFFF" filter="url(#glow-dot-${viewName})" />
    <circle cx="${vertX}" cy="${vertBottomY}" r="3" fill="#00FFFF" filter="url(#glow-dot-${viewName})" />

    <!-- Línea Horizontal Punteada hacia la Tarjeta de Contenido -->
    <line x1="${btnRightX}" y1="${btnCenterY}" x2="${cardLeftX}" y2="${btnCenterY}" 
          stroke="#00FFFF" stroke-width="1.5" stroke-dasharray="4, 4" stroke-opacity="0.85" />
    <circle cx="${btnRightX}" cy="${btnCenterY}" r="3.5" fill="#00FFFF" filter="url(#glow-dot-${viewName})" />
    <circle cx="${cardLeftX}" cy="${btnCenterY}" r="3.5" fill="#00FFFF" filter="url(#glow-dot-${viewName})" />
  `;
}

window.addEventListener('resize', () => {
  if (AppState.currentView === 'nosotros' || AppState.currentView === 'servicios') {
    updateConnectingLines(AppState.currentView);
  }
});

// -------------------------------------------------------------------------
// 6. MOTOR WIZARD DE 4 PASOS: CALCULADORA SOLAR PATAGONIA
// -------------------------------------------------------------------------

let rooftopMap = null;
let rooftopMarker = null;
let roofPolygonLayer = null;
let isDrawingRoof = false;
let roofPoints = [];
let roofVertexMarkers = [];
let roofTempLines = [];
let segmentTooltips = [];

function goToSlide(slideNumber) {
  Router.navigate('/calculadora/paso-' + slideNumber);
}

function applySlideDom(slideNumber) {
  AppState.wizard.currentSlide = slideNumber;

  // Ocultar todos los slides
  for (let i = 1; i <= 4; i++) {
    const el = document.getElementById('calc-slide-' + i);
    if (el) el.classList.add('hidden');
  }

  // Mostrar slide actual
  const target = document.getElementById('calc-slide-' + slideNumber);
  if (target) target.classList.remove('hidden');

  // Actualizar títulos de progreso
  const titles = [
    'Paso 1 de 4: Perfil y Objetivo de la Instalación',
    'Paso 2 de 4: Consumo Eléctrico y Gasto Mensual',
    'Paso 3 de 4: Tipo de Propiedad y Cubierta',
    'Paso 4 de 4: Ubicación Satelital y Dimensionamiento'
  ];
  const percentages = ['25%', '50%', '75%', '100%'];
  const widths = ['25%', '50%', '75%', '100%'];

  const ind = document.getElementById('wizard-step-indicator');
  const pct = document.getElementById('wizard-step-percent');
  const bar = document.getElementById('wizard-progress-bar');

  if (ind) ind.textContent = titles[slideNumber - 1];
  if (pct) pct.textContent = percentages[slideNumber - 1] + ' Completado';
  if (bar) bar.style.width = widths[slideNumber - 1];

  updateWizardOptionStyles();

  if (slideNumber === 2) {
    renderPresets();
    syncInputsFromState();
  }

  if (slideNumber === 4) {
    setTimeout(() => {
      initOrRefreshMap();
      if (rooftopMap) rooftopMap.invalidateSize();
      recalculateRecommendation();
    }, 150);
  }
}

function setProfile(profile) {
  AppState.wizard.profile = profile;
  if (profile === 'residencial') {
    AppState.wizard.kwh = 380;
    AppState.wizard.amount = 95000;
  } else {
    AppState.wizard.kwh = 1800;
    AppState.wizard.amount = 450000;
  }
  updateWizardOptionStyles();
  updateSliderRanges();
  syncInputsFromState();
  renderPresets();
  recalculateRecommendation();
}

function selectGoal(goal) {
  AppState.wizard.goal = goal;
  updateWizardOptionStyles();
  recalculateRecommendation();
}

function selectPropertyType(prop) {
  AppState.wizard.property = prop;
  updateWizardOptionStyles();
  recalculateRecommendation();
}

function updateWizardOptionStyles() {
  const p = AppState.wizard.profile;
  const g = AppState.wizard.goal;
  const prop = AppState.wizard.property;

  ['residencial', 'comercial'].forEach(item => {
    const el = document.getElementById('card-prof-' + item);
    if (el) {
      if (item === p) el.classList.add('active');
      else el.classList.remove('active');
    }
  });

  ['savings', 'backup', 'autonomy'].forEach(item => {
    const el = document.getElementById('card-goal-' + item);
    if (el) {
      if (item === g) el.classList.add('active');
      else el.classList.remove('active');
    }
  });

  ['casa', 'parcela', 'comercial', 'terraza'].forEach(item => {
    const el = document.getElementById('card-prop-' + item);
    if (el) {
      if (item === prop) el.classList.add('active');
      else el.classList.remove('active');
    }
  });
}

function updateSliderRanges() {
  const isCom = AppState.wizard.profile === 'comercial';
  const sliderPesos = document.getElementById('slider-pesos');
  const sliderKwh = document.getElementById('slider-kwh');
  const minPesosEl = document.getElementById('slider-pesos-min');
  const maxPesosEl = document.getElementById('slider-pesos-max');
  const minKwhEl = document.getElementById('slider-kwh-min');
  const maxKwhEl = document.getElementById('slider-kwh-max');

  if (!sliderPesos || !sliderKwh) return;

  if (isCom) {
    sliderPesos.min = 0;
    sliderPesos.max = 3500000;
    sliderPesos.step = 25000;
    sliderKwh.min = 0;
    sliderKwh.max = 14000;
    sliderKwh.step = 50;
    if (minPesosEl) minPesosEl.textContent = '$0';
    if (maxPesosEl) maxPesosEl.textContent = '$3.500.000+';
    if (minKwhEl) minKwhEl.textContent = '0 kWh';
    if (maxKwhEl) maxKwhEl.textContent = '~14.000+ kWh';
  } else {
    sliderPesos.min = 0;
    sliderPesos.max = 400000;
    sliderPesos.step = 5000;
    sliderKwh.min = 0;
    sliderKwh.max = 1600;
    sliderKwh.step = 10;
    if (minPesosEl) minPesosEl.textContent = '$0';
    if (maxPesosEl) maxPesosEl.textContent = '$400.000+';
    if (minKwhEl) minKwhEl.textContent = '0 kWh';
    if (maxKwhEl) maxKwhEl.textContent = '~1.600+ kWh';
  }
}

function renderPresets() {
  // Función mantenida por compatibilidad de llamadas
}

// -------------------------------------------------------------------------
// 6.1. SELECTOR DE TARIFA ELÉCTRICA Y ANÁLISIS DE BOLETA
// -------------------------------------------------------------------------
function selectTariff(tariffKey) {
  if (!TARIFF_RATES[tariffKey]) return;
  AppState.wizard.tariff = tariffKey;

  ['BT1', 'BT2_3', 'BT4', 'AT'].forEach(k => {
    const btn = document.getElementById('btn-tariff-' + k);
    if (k === tariffKey) {
      btn?.classList.add('active');
    } else {
      btn?.classList.remove('active');
    }
  });

  const ind = document.getElementById('tariff-rate-indicator');
  const t = TARIFF_RATES[tariffKey];
  if (ind) ind.textContent = `${t.name} (~$${t.rate}/kWh)`;

  // Recalcular monto en pesos según tarifa
  const newPesos = Math.round(AppState.wizard.kwh * t.rate);
  AppState.wizard.amount = newPesos;
  syncInputsFromState();
  checkConsumptionEdgeCases();
  recalculateRecommendation();
}

function checkConsumptionEdgeCases() {
  const banner = document.getElementById('calc-edge-case-banner');
  const text = document.getElementById('calc-edge-case-text');
  if (!banner || !text) return;

  const kwh = AppState.wizard.kwh;
  if (kwh < 80) {
    banner.classList.remove('hidden');
    text.textContent = 'Consumo base o mínimo. Se dimensiona Kit 3.2 kW On-Grid con Net Billing para cubrir el 100% de la factura eléctrica y generar excedentes transferibles.';
  } else if (kwh > 4000) {
    banner.classList.remove('hidden');
    text.textContent = 'Consumo de alta escala comercial/industrial. Se dimensiona con Kit Comercial 12.0 kW escalable en paralelo y estudio SEC TE-4 especializado.';
  } else {
    banner.classList.add('hidden');
  }
}

function handleBillFileInput(e) {
  const file = e.target?.files?.[0];
  if (file) processBillFile(file);
}

function handleBillDragOver(e) {
  e.preventDefault();
  e.stopPropagation();
  document.getElementById('bill-dropzone')?.classList.add('dragover');
}

function handleBillDragLeave(e) {
  e.preventDefault();
  e.stopPropagation();
  document.getElementById('bill-dropzone')?.classList.remove('dragover');
}

function handleBillDrop(e) {
  e.preventDefault();
  e.stopPropagation();
  document.getElementById('bill-dropzone')?.classList.remove('dragover');
  const file = e.dataTransfer?.files?.[0];
  if (file) processBillFile(file);
}

function processBillFile(file) {
  const dropzone = document.getElementById('bill-dropzone');
  const scanning = document.getElementById('bill-scanning-state');
  const attached = document.getElementById('bill-attached-state');
  const scanningText = document.getElementById('bill-scanning-text');

  if (dropzone) dropzone.classList.add('hidden');
  if (scanning) scanning.classList.remove('hidden');
  if (attached) attached.classList.add('hidden');

  const steps = [
    'Leyendo documento digital...',
    'Extrayendo N° de cliente y tarifa Edelaysén...',
    'Calculando promedio de consumo histórico...'
  ];

  let stepIdx = 0;
  const interval = setInterval(() => {
    stepIdx++;
    if (scanningText && steps[stepIdx]) {
      scanningText.textContent = steps[stepIdx];
    }
  }, 350);

  setTimeout(() => {
    clearInterval(interval);
    if (scanning) scanning.classList.add('hidden');
    if (attached) attached.classList.remove('hidden');

    let detectedKwh = 420;
    let detectedTariff = 'BT1';
    if (file.name.toLowerCase().includes('comercial') || file.name.toLowerCase().includes('empresa')) {
      detectedKwh = 1850;
      detectedTariff = 'BT2_3';
    } else if (file.size > 2000000) {
      detectedKwh = 520;
    }

    selectTariff(detectedTariff);
    AppState.wizard.kwh = detectedKwh;
    AppState.wizard.amount = Math.round(detectedKwh * TARIFF_RATES[detectedTariff].rate);
    AppState.wizard.uploadedBill = {
      name: file.name,
      size: (file.size / 1024).toFixed(1) + ' KB',
      type: file.type
    };

    const fnEl = document.getElementById('bill-attached-filename');
    const smEl = document.getElementById('bill-attached-summary');
    if (fnEl) fnEl.textContent = file.name;
    if (smEl) smEl.textContent = `Consumo extraído: ${detectedKwh} kWh/mes (~$${AppState.wizard.amount.toLocaleString('es-CL')})`;

    syncInputsFromState();
    checkConsumptionEdgeCases();
    recalculateRecommendation();
    showToast(`Boleta analizada: ${detectedKwh} kWh detectados`);
  }, 1100);
}

function clearUploadedBill() {
  AppState.wizard.uploadedBill = null;
  const input = document.getElementById('bill-upload-input');
  if (input) input.value = '';
  document.getElementById('bill-dropzone')?.classList.remove('hidden');
  document.getElementById('bill-scanning-state')?.classList.add('hidden');
  document.getElementById('bill-attached-state')?.classList.add('hidden');
  showToast('Boleta removida');
}

function syncInputsFromState() {
  const inputPesos = document.getElementById('input-pesos');
  const inputKwh = document.getElementById('input-kwh');
  const sliderPesos = document.getElementById('slider-pesos');
  const sliderKwh = document.getElementById('slider-kwh');

  if (inputPesos) inputPesos.value = AppState.wizard.amount.toLocaleString('es-CL');
  if (sliderPesos) sliderPesos.value = AppState.wizard.amount;
  if (inputKwh) inputKwh.value = AppState.wizard.kwh;
  if (sliderKwh) sliderKwh.value = AppState.wizard.kwh;
}

function setConsumptionPreset(kwh, pesos) {
  AppState.wizard.kwh = kwh;
  AppState.wizard.amount = pesos;
  syncInputsFromState();
  checkConsumptionEdgeCases();
  recalculateRecommendation();
}

function onPesosInputChange(rawVal) {
  const numeric = parseInt(rawVal.replace(/\D/g, '') || '0', 10);
  const safePesos = Math.max(0, Math.min(10000000, numeric));
  const rate = TARIFF_RATES[AppState.wizard.tariff]?.rate || 250;
  const kwh = Math.round(safePesos / rate);

  AppState.wizard.amount = safePesos;
  AppState.wizard.kwh = kwh;

  const sliderPesos = document.getElementById('slider-pesos');
  const inputKwh = document.getElementById('input-kwh');
  const sliderKwh = document.getElementById('slider-kwh');

  if (sliderPesos) sliderPesos.value = safePesos;
  if (inputKwh) inputKwh.value = kwh;
  if (sliderKwh) sliderKwh.value = kwh;

  checkConsumptionEdgeCases();
  recalculateRecommendation();
}

function onPesosSliderChange(val) {
  const pesos = parseInt(val, 10);
  const rate = TARIFF_RATES[AppState.wizard.tariff]?.rate || 250;
  const kwh = Math.round(pesos / rate);

  AppState.wizard.amount = pesos;
  AppState.wizard.kwh = kwh;

  const inputPesos = document.getElementById('input-pesos');
  const inputKwh = document.getElementById('input-kwh');
  const sliderKwh = document.getElementById('slider-kwh');

  if (inputPesos) inputPesos.value = pesos.toLocaleString('es-CL');
  if (inputKwh) inputKwh.value = kwh;
  if (sliderKwh) sliderKwh.value = kwh;

  checkConsumptionEdgeCases();
  recalculateRecommendation();
}

function onKwhInputChange(val) {
  const kwh = Math.max(0, Math.min(25000, parseInt(val || '0', 10)));
  const rate = TARIFF_RATES[AppState.wizard.tariff]?.rate || 250;
  const pesos = Math.round(kwh * rate);

  AppState.wizard.kwh = kwh;
  AppState.wizard.amount = pesos;

  const inputPesos = document.getElementById('input-pesos');
  const sliderPesos = document.getElementById('slider-pesos');
  const sliderKwh = document.getElementById('slider-kwh');

  if (inputPesos) inputPesos.value = pesos.toLocaleString('es-CL');
  if (sliderPesos) sliderPesos.value = pesos;
  if (sliderKwh) sliderKwh.value = kwh;

  checkConsumptionEdgeCases();
  recalculateRecommendation();
}

function onKwhSliderChange(val) {
  const kwh = parseInt(val, 10);
  const rate = TARIFF_RATES[AppState.wizard.tariff]?.rate || 250;
  const pesos = Math.round(kwh * rate);

  AppState.wizard.amount = pesos;
  AppState.wizard.kwh = kwh;

  const inputPesos = document.getElementById('input-pesos');
  const sliderPesos = document.getElementById('slider-pesos');
  const inputKwh = document.getElementById('input-kwh');

  if (inputPesos) inputPesos.value = pesos.toLocaleString('es-CL');
  if (sliderPesos) sliderPesos.value = pesos;
  if (inputKwh) inputKwh.value = kwh;

  checkConsumptionEdgeCases();
  recalculateRecommendation();
}

// -------------------------------------------------------------------------
// 7. MOTOR CARTOGRÁFICO SATELITAL HD (GOOGLE HÍBRIDO / LEAFLET)
// -------------------------------------------------------------------------
function initOrRefreshMap() {
  const mapContainer = document.getElementById('rooftop-map');
  if (!mapContainer) return;

  const startLat = AppState.wizard.lat || -45.5712;
  const startLon = AppState.wizard.lon || -72.0683;

  if (!rooftopMap) {
    rooftopMap = L.map('rooftop-map', {
      center: [startLat, startLon],
      zoom: 18,
      maxZoom: 20,
      minZoom: 9,
      scrollWheelZoom: true
    });

    // Capa Satelital HD Google Híbrido
    L.tileLayer('https://mt{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', {
      subdomains: ['0', '1', '2', '3'],
      maxZoom: 20,
      attribution: '© Google Maps'
    }).addTo(rooftopMap);

    const crosshairIcon = L.divIcon({
      className: 'solar-crosshair-icon',
      html: `
        <div class="solar-pin-wrapper">
          <div class="solar-pin-pulse"></div>
          <div class="solar-pin-cross-h"></div>
          <div class="solar-pin-cross-v"></div>
          <div class="solar-pin-center"></div>
        </div>
      `,
      iconSize: [44, 44],
      iconAnchor: [22, 22]
    });

    rooftopMarker = L.marker([startLat, startLon], {
      icon: crosshairIcon,
      draggable: true,
      autoPan: true
    }).addTo(rooftopMap);

    rooftopMarker.bindTooltip("Arrastra sobre tu techo", { permanent: false, direction: "top", offset: [0, -18] });

    rooftopMarker.on('dragend', function (e) {
      if (isDrawingRoof) return;
      const pos = e.target.getLatLng();
      handleMapLocationSelect(pos.lat, pos.lng);
    });

    rooftopMap.on('click', function (e) {
      if (isDrawingRoof) {
        addRoofVertex(e.latlng);
      } else if (isAddVertexMode && roofPoints.length >= 3) {
        insertRoofVertexAtClosestSegment(e.latlng);
      } else if (!AppState.wizard.isRoofMeasured) {
        rooftopMarker.setLatLng(e.latlng);
        handleMapLocationSelect(e.latlng.lat, e.latlng.lng);
      }
    });

    rooftopMap.on('dblclick', function (e) {
      if (isDrawingRoof && roofPoints.length >= 3) {
        finishDrawingRoof();
      }
    });

  } else {
    rooftopMap.invalidateSize();
  }

  updateMapHud(startLat, startLon);
}

function handleMapLocationSelect(lat, lon) {
  AppState.wizard.lat = lat;
  AppState.wizard.lon = lon;
  updateMapHud(lat, lon);
  recalculateRecommendation();
}

function updateMapHud(lat, lon) {
  const coordsDisplay = document.getElementById('coords-display');
  const elevationDisplay = document.getElementById('coords-elevation');
  const com = AYSEN_COMMUNES_DATA[AppState.wizard.commune] || AYSEN_COMMUNES_DATA.coyhaique;

  if (coordsDisplay) coordsDisplay.textContent = lat.toFixed(4) + ', ' + lon.toFixed(4);
  if (elevationDisplay) elevationDisplay.textContent = 'Elevación: ~' + (com.elevation || 284) + 'm';
}

function handleCommuneChange(key) {
  AppState.wizard.commune = key;
  const com = AYSEN_COMMUNES_DATA[key];
  if (com && rooftopMap && rooftopMarker) {
    AppState.wizard.lat = com.lat;
    AppState.wizard.lon = com.lon;
    AppState.wizard.elevation = com.elevation;
    rooftopMap.setView([com.lat, com.lon], 18);
    rooftopMarker.setLatLng([com.lat, com.lon]);
    updateMapHud(com.lat, com.lon);
    recalculateRecommendation();
  }
}

// -------------------------------------------------------------------------
// 8. DIBUJO DE POLÍGONO DE TECHO, NODOS DRAGGABLE & CÁLCULO MÉTRICO
// -------------------------------------------------------------------------
let isAddVertexMode = false;
let isDelVertexMode = false;

function calculateGeodesicPolygonArea(latlngs) {
  if (!latlngs || latlngs.length < 3) return 0;
  const R = 6378137;
  const avgLat = latlngs.reduce((acc, p) => acc + p.lat, 0) / latlngs.length;
  const latRad = avgLat * Math.PI / 180;
  const cosLat = Math.cos(latRad);

  let area = 0;
  const n = latlngs.length;
  for (let i = 0; i < n; i++) {
    const j = (i + 1) % n;
    const xi = latlngs[i].lng * (Math.PI / 180) * R * cosLat;
    const yi = latlngs[i].lat * (Math.PI / 180) * R;
    const xj = latlngs[j].lng * (Math.PI / 180) * R * cosLat;
    const yj = latlngs[j].lat * (Math.PI / 180) * R;
    area += (xi * yj) - (xj * yi);
  }
  return Math.abs(area / 2.0);
}

function toggleRoofDrawingMode() {
  if (isDrawingRoof) {
    cancelRoofDrawing();
  } else {
    startDrawingRoof();
  }
}

function toggleAddVertexMode() {
  isAddVertexMode = !isAddVertexMode;
  if (isAddVertexMode) isDelVertexMode = false;
  updateVertexModeButtons();
}

function toggleDelVertexMode() {
  isDelVertexMode = !isDelVertexMode;
  if (isDelVertexMode) isAddVertexMode = false;
  updateVertexModeButtons();
  rebuildRoofMarkersAndLines();
}

function updateVertexModeButtons() {
  const addBtn = document.getElementById('btn-add-vertex');
  const delBtn = document.getElementById('btn-del-vertex');
  const instr = document.getElementById('roof-measure-instruction');

  if (addBtn) {
    if (isAddVertexMode) {
      addBtn.classList.add('bg-cyan-500/40', 'border-[#00FFFF]', 'text-[#00FFFF]');
    } else {
      addBtn.classList.remove('bg-cyan-500/40', 'border-[#00FFFF]', 'text-[#00FFFF]');
    }
  }

  if (delBtn) {
    if (isDelVertexMode) {
      delBtn.classList.add('bg-red-500/40', 'border-red-400', 'text-red-200');
    } else {
      delBtn.classList.remove('bg-red-500/40', 'border-red-400', 'text-red-200');
    }
  }

  if (instr) {
    if (isAddVertexMode) {
      instr.textContent = 'Modo Añadir: Haz clic sobre cualquier arista o en el mapa para insertar un nuevo vértice';
    } else if (isDelVertexMode) {
      instr.textContent = 'Modo Eliminar: Haz clic sobre cualquier vértice rojo para borrarlo';
    } else {
      instr.textContent = AppState.wizard.isRoofMeasured ? 'Techo delimitado. Arrastra nodos para ajustar o usa los botones para editar' : 'Haz clic en la primera esquina de tu techo';
    }
  }
}

function startDrawingRoof() {
  if (!rooftopMap) initOrRefreshMap();
  if (!rooftopMap) return;

  isDrawingRoof = true;
  isAddVertexMode = false;
  isDelVertexMode = false;
  roofPoints = [];
  AppState.wizard.roofSegments = [];

  if (roofPolygonLayer) {
    rooftopMap.removeLayer(roofPolygonLayer);
    roofPolygonLayer = null;
  }
  clearRoofTempLayers();

  rooftopMap.doubleClickZoom.disable();

  document.getElementById('btn-draw-roof')?.classList.add('hidden');
  document.getElementById('roof-drawing-closed-controls')?.classList.add('hidden');
  document.getElementById('roof-drawing-active-controls')?.classList.remove('hidden');
  
  const finishBtn = document.getElementById('btn-finish-roof');
  if (finishBtn) finishBtn.disabled = true;

  document.getElementById('btn-clear-roof')?.classList.add('hidden');
  document.getElementById('roof-measure-hud')?.classList.remove('hidden');
  document.getElementById('roof-default-assumptions-banner')?.classList.add('hidden');

  const instr = document.getElementById('roof-measure-instruction');
  if (instr) instr.textContent = 'Haz clic en la primera esquina de tu techo';

  document.getElementById('roof-metric-total-area').textContent = '0.0 m²';
  document.getElementById('roof-metric-usable-area').textContent = '0.0 m²';
  document.getElementById('roof-metric-max-panels').textContent = '0 paneles';
  document.getElementById('roof-metric-max-kwp').textContent = '0.0 kWp';
}

function addRoofVertex(latlng) {
  if (!isDrawingRoof || !rooftopMap) return;

  const ll = L.latLng(latlng.lat, latlng.lng);
  roofPoints.push(ll);
  rebuildRoofMarkersAndLines();
  updateRoofHudAndArea();
}

function undoLastRoofVertex() {
  if (!isDrawingRoof || roofPoints.length === 0) return;
  roofPoints.pop();
  rebuildRoofMarkersAndLines();
  updateRoofHudAndArea();
  showToast('Último punto eliminado');
}

function deleteRoofVertex(idx) {
  if (roofPoints.length <= 3 && !isDrawingRoof) {
    showToast('El polígono requiere al menos 3 esquinas');
    return;
  }
  roofPoints.splice(idx, 1);
  rebuildRoofMarkersAndLines();
  if (roofPolygonLayer) {
    roofPolygonLayer.setLatLngs(roofPoints);
  }
  updateRoofHudAndArea();
  recalculateRecommendation();
  showToast('Vértice eliminado');
}

function rebuildRoofMarkersAndLines() {
  clearRoofTempLayers();
  if (!rooftopMap) return;

  roofPoints.forEach((pt, idx) => {
    const isFirst = (idx === 0);
    const markerClass = isDelVertexMode ? 'roof-vertex-marker delete-mode' : (isFirst && isDrawingRoof ? 'roof-vertex-marker roof-first-vertex' : 'roof-vertex-marker');
    const tooltipText = isDelVertexMode 
      ? `Clic para eliminar Vértice ${idx + 1}`
      : (isFirst && isDrawingRoof ? 'Clic para cerrar polígono' : `Vértice ${idx + 1} (Arrastra para mover o clic para borrar)`);

    const vertexIcon = L.divIcon({
      className: 'roof-vertex-icon',
      html: `<div class="${markerClass}" title="${tooltipText}"></div>`,
      iconSize: [16, 16],
      iconAnchor: [8, 8]
    });

    const vMarker = L.marker(pt, {
      icon: vertexIcon,
      draggable: !isDelVertexMode
    }).addTo(rooftopMap);

    // Clic en el marcador para eliminar o cerrar
    vMarker.on('click', function(e) {
      L.DomEvent.stopPropagation(e);
      if (isFirst && isDrawingRoof && roofPoints.length >= 3) {
        finishDrawingRoof();
        return;
      }
      if (isDelVertexMode) {
        deleteRoofVertex(idx);
        return;
      }
      // En modo cerrado normal, clic en nodo con más de 3 vértices lo elimina
      if (!isDrawingRoof && roofPoints.length > 3) {
        deleteRoofVertex(idx);
      } else if (!isDrawingRoof && roofPoints.length <= 3) {
        showToast('El polígono requiere al menos 3 esquinas');
      }
    });

    vMarker.on('contextmenu', function(e) {
      L.DomEvent.stopPropagation(e);
      deleteRoofVertex(idx);
    });

    // Arrastre en tiempo real
    vMarker.on('drag', function (e) {
      roofPoints[idx] = e.target.getLatLng();
      updateRoofTempLines();
      if (roofPolygonLayer) {
        roofPolygonLayer.setLatLngs(roofPoints);
      }
      updateRoofHudAndArea();
    });

    vMarker.on('dragend', function (e) {
      roofPoints[idx] = e.target.getLatLng();
      rebuildRoofMarkersAndLines();
      if (roofPolygonLayer) {
        roofPolygonLayer.setLatLngs(roofPoints);
      }
      updateRoofHudAndArea();
      recalculateRecommendation();
    });

    roofVertexMarkers.push(vMarker);
  });

  updateRoofTempLines();
}

function updateRoofTempLines() {
  roofTempLines.forEach(l => rooftopMap.removeLayer(l));
  roofTempLines = [];
  segmentTooltips.forEach(t => rooftopMap.removeLayer(t));
  segmentTooltips = [];
  AppState.wizard.roofSegments = [];

  if (roofPoints.length < 2) return;

  const count = roofPoints.length;
  const isClosed = !isDrawingRoof && count >= 3;

  for (let i = 0; i < count - 1; i++) {
    const p1 = roofPoints[i];
    const p2 = roofPoints[i + 1];
    createSegmentLineAndTooltip(p1, p2, i + 1);
  }

  if (isClosed && count >= 3) {
    const pLast = roofPoints[count - 1];
    const pFirst = roofPoints[0];
    createSegmentLineAndTooltip(pLast, pFirst, count);
  }
}

function createSegmentLineAndTooltip(p1, p2, segmentNumber) {
  const ll1 = L.latLng(p1.lat, p1.lng);
  const ll2 = L.latLng(p2.lat, p2.lng);
  const segDistMeters = ll1.distanceTo(ll2);
  const line = L.polyline([ll1, ll2], {
    color: '#00FFFF',
    weight: 2,
    dashArray: isDrawingRoof ? '4, 4' : null,
    className: 'roof-edge-line'
  }).addTo(rooftopMap);
  roofTempLines.push(line);

  // Insertar vértice al hacer clic sobre cualquier arista
  line.on('click', function(e) {
    L.DomEvent.stopPropagation(e);
    insertRoofVertexNear(e.latlng, p1);
  });

  const midPoint = L.latLng((p1.lat + p2.lat) / 2, (p1.lng + p2.lng) / 2);
  const segTooltip = L.tooltip({
    permanent: true,
    direction: 'center',
    className: 'segment-length-tooltip'
  }).setContent(segDistMeters.toFixed(1) + ' m').setLatLng(midPoint).addTo(rooftopMap);
  segmentTooltips.push(segTooltip);

  AppState.wizard.roofSegments.push({
    tramo: segmentNumber,
    meters: parseFloat(segDistMeters.toFixed(1))
  });
}

function insertRoofVertexNear(latlng, p1) {
  const idx1 = roofPoints.findIndex(pt => Math.abs(pt.lat - p1.lat) < 0.000001 && Math.abs(pt.lng - p1.lng) < 0.000001);
  if (idx1 !== -1) {
    roofPoints.splice(idx1 + 1, 0, L.latLng(latlng.lat, latlng.lng));
    rebuildRoofMarkersAndLines();
    if (roofPolygonLayer) {
      roofPolygonLayer.setLatLngs(roofPoints);
    }
    updateRoofHudAndArea();
    recalculateRecommendation();
    showToast(`Nuevo vértice añadido (Total: ${roofPoints.length})`);
  }
}

function insertRoofVertexAtClosestSegment(latlng) {
  if (roofPoints.length < 3) return;
  const clickPt = L.latLng(latlng.lat, latlng.lng);
  let bestIdx = 0;
  let minDistance = Infinity;

  const count = roofPoints.length;
  for (let i = 0; i < count; i++) {
    const p1 = roofPoints[i];
    const p2 = roofPoints[(i + 1) % count];
    const mid = L.latLng((p1.lat + p2.lat) / 2, (p1.lng + p2.lng) / 2);
    const d = clickPt.distanceTo(mid);
    if (d < minDistance) {
      minDistance = d;
      bestIdx = i + 1;
    }
  }

  roofPoints.splice(bestIdx, 0, clickPt);
  rebuildRoofMarkersAndLines();
  if (roofPolygonLayer) {
    roofPolygonLayer.setLatLngs(roofPoints);
  }
  updateRoofHudAndArea();
  recalculateRecommendation();
  showToast(`Nuevo vértice añadido (Total: ${roofPoints.length})`);
}

function updateRoofHudAndArea() {
  const instr = document.getElementById('roof-measure-instruction');
  const finishBtn = document.getElementById('btn-finish-roof');

  if (isDrawingRoof) {
    if (roofPoints.length >= 3) {
      if (finishBtn) finishBtn.disabled = false;
      if (instr) instr.textContent = 'Haz clic en la primera esquina verde para cerrar (o botón Cerrar Polígono)';
    } else {
      if (finishBtn) finishBtn.disabled = true;
      if (instr) instr.textContent = `Esquinas marcadas: ${roofPoints.length}. Marca al menos 3.`;
    }
  }

  if (roofPoints.length >= 3) {
    const totalArea = calculateGeodesicPolygonArea(roofPoints);
    const usableArea = totalArea * 0.8;
    const maxPanels = Math.floor(usableArea / 2.6);
    const maxKwp = parseFloat((maxPanels * 0.55).toFixed(1));

    AppState.wizard.measuredArea = totalArea;
    AppState.wizard.usableArea = usableArea;
    AppState.wizard.maxPanels = maxPanels;
    AppState.wizard.maxKwp = maxKwp;

    document.getElementById('roof-metric-total-area').textContent = totalArea.toFixed(1) + ' m²';
    document.getElementById('roof-metric-usable-area').textContent = usableArea.toFixed(1) + ' m²';
    document.getElementById('roof-metric-max-panels').textContent = maxPanels + ' paneles';
    document.getElementById('roof-metric-max-kwp').textContent = maxKwp + ' kWp';
  }
}

function finishDrawingRoof() {
  if (roofPoints.length < 3) return;

  isDrawingRoof = false;
  isAddVertexMode = false;
  isDelVertexMode = false;
  if (rooftopMap) rooftopMap.doubleClickZoom.enable();

  if (roofPolygonLayer) {
    rooftopMap.removeLayer(roofPolygonLayer);
  }

  roofPolygonLayer = L.polygon(roofPoints, {
    color: '#00FFFF',
    fillColor: '#00FFFF',
    fillOpacity: 0.22,
    weight: 2.5
  }).addTo(rooftopMap);

  AppState.wizard.isRoofMeasured = true;
  rebuildRoofMarkersAndLines();
  updateRoofHudAndArea();

  document.getElementById('roof-drawing-active-controls')?.classList.add('hidden');
  document.getElementById('btn-draw-roof')?.classList.add('hidden');
  document.getElementById('roof-drawing-closed-controls')?.classList.remove('hidden');

  const instr = document.getElementById('roof-measure-instruction');
  if (instr) instr.textContent = 'Techo delimitado con éxito. Arrastra nodos para ajustar o usa los botones para editar.';

  recalculateRecommendation();
}

function cancelRoofDrawing() {
  isDrawingRoof = false;
  isAddVertexMode = false;
  isDelVertexMode = false;
  roofPoints = [];
  clearRoofTempLayers();

  if (rooftopMap) rooftopMap.doubleClickZoom.enable();

  document.getElementById('btn-draw-roof')?.classList.remove('hidden');
  document.getElementById('roof-drawing-active-controls')?.classList.add('hidden');
  document.getElementById('roof-drawing-closed-controls')?.classList.add('hidden');
  document.getElementById('roof-measure-hud')?.classList.add('hidden');
  document.getElementById('roof-default-assumptions-banner')?.classList.remove('hidden');
}

function clearRoofDrawing() {
  cancelRoofDrawing();
  if (roofPolygonLayer && rooftopMap) {
    rooftopMap.removeLayer(roofPolygonLayer);
    roofPolygonLayer = null;
  }
  AppState.wizard.isRoofMeasured = false;
  AppState.wizard.measuredArea = 0;
  AppState.wizard.usableArea = 0;
  AppState.wizard.maxPanels = 0;
  AppState.wizard.maxKwp = 0;
  AppState.wizard.roofSegments = [];
  recalculateRecommendation();
}

function clearRoofTempLayers() {
  if (!rooftopMap) return;
  roofVertexMarkers.forEach(m => rooftopMap.removeLayer(m));
  roofVertexMarkers = [];
  roofTempLines.forEach(l => rooftopMap.removeLayer(l));
  roofTempLines = [];
  segmentTooltips.forEach(t => rooftopMap.removeLayer(t));
  segmentTooltips = [];
}

// -------------------------------------------------------------------------
// 9. BUSCADOR DE DIRECCIONES Y GEOLOCALIZACIÓN
// -------------------------------------------------------------------------
const LOCAL_AYSEN_SECTORS = [
  { label: 'Coyhaique Centro', lat: -45.5712, lon: -72.0683, commune: 'coyhaique' },
  { label: 'Valle Simpson, Coyhaique', lat: -45.6833, lon: -72.0833, commune: 'coyhaique' },
  { label: 'El Blanco, Coyhaique', lat: -45.7833, lon: -71.8333, commune: 'coyhaique' },
  { label: 'Balmaceda, Coyhaique', lat: -45.9080, lon: -71.7010, commune: 'coyhaique' },
  { label: 'Coyhaique Alto', lat: -45.5250, lon: -71.9500, commune: 'coyhaique' },
  { label: 'Puerto Aysén Centro', lat: -45.4050, lon: -72.6980, commune: 'puerto_aysen' },
  { label: 'Puerto Chacabuco', lat: -45.4667, lon: -72.8167, commune: 'puerto_aysen' },
  { label: 'Chile Chico Centro', lat: -46.5400, lon: -71.7250, commune: 'chile_chico' },
  { label: 'Puerto Guadal', lat: -46.8480, lon: -72.6940, commune: 'chile_chico' },
  { label: 'Puerto Río Tranquilo', lat: -46.6230, lon: -72.6770, commune: 'rio_ibanez' },
  { label: 'Puerto Ingeniero Ibáñez', lat: -46.2890, lon: -71.9330, commune: 'rio_ibanez' },
  { label: 'Cochrane Centro', lat: -47.2540, lon: -72.5710, commune: 'cochrane' },
  { label: 'Puerto Cisnes Centro', lat: -44.7430, lon: -72.6990, commune: 'puerto_cisnes' },
  { label: 'Puyuhuapi', lat: -44.3250, lon: -72.5600, commune: 'puerto_cisnes' },
  { label: 'La Junta', lat: -43.9740, lon: -72.4050, commune: 'puerto_cisnes' },
  { label: 'Caleta Tortel Centro', lat: -47.7960, lon: -73.5340, commune: 'tortel' },
  { label: 'Villa O Higgins', lat: -48.4680, lon: -72.5620, commune: 'villa_ohiggins' }
];

let searchTimeout = null;

function handleAddressSearchInput(val) {
  clearTimeout(searchTimeout);
  const query = (val || '').trim();
  if (query.length < 2) {
    hideAutocompleteDropdown();
    return;
  }
  searchTimeout = setTimeout(() => {
    fetchAddressSuggestions(query);
  }, 250);
}

function handleAddressSearchKeydown(e) {
  if (e.key === 'Enter') {
    e.preventDefault();
    searchMapLocation();
  }
}

async function fetchAddressSuggestions(query) {
  const qNorm = query.toLowerCase();
  const localMatches = LOCAL_AYSEN_SECTORS.filter(s => s.label.toLowerCase().includes(qNorm));

  let remoteMatches = [];
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);
    const res = await fetch(`https://photon.komoot.io/api/?q=${encodeURIComponent(query + ', Chile')}&limit=4&lat=-45.57&lon=-72.06`, { signal: controller.signal });
    clearTimeout(timeoutId);
    if (res.ok) {
      const data = await res.json();
      remoteMatches = (data.features || []).map(f => ({
        label: [f.properties.name, f.properties.street, f.properties.city, f.properties.state].filter(Boolean).join(', '),
        lat: f.geometry.coordinates[1],
        lon: f.geometry.coordinates[0]
      }));
    }
  } catch (err) {}

  const combined = [...localMatches, ...remoteMatches].slice(0, 6);
  renderAutocompleteDropdown(combined);
}

function renderAutocompleteDropdown(results) {
  const dropdown = document.getElementById('search-autocomplete-dropdown');
  if (!dropdown) return;

  if (results.length === 0) {
    hideAutocompleteDropdown();
    return;
  }

  dropdown.innerHTML = results.map(r => `
    <div onclick="selectAutocompleteItem(${r.lat}, ${r.lon}, '${r.label.replace(/'/g, "\\'")}', '${r.commune || ''}')" class="p-2.5 hover:bg-[#002C45] cursor-pointer text-xs font-light text-white flex items-center gap-2 border-b border-cyan-500/10 transition-colors">
      <svg class="w-3.5 h-3.5 text-[#00FFFF] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/></svg>
      <span class="truncate">${r.label}</span>
    </div>
  `).join('');

  dropdown.classList.remove('hidden');
}

function hideAutocompleteDropdown() {
  const dropdown = document.getElementById('search-autocomplete-dropdown');
  if (dropdown) dropdown.classList.add('hidden');
}

function selectAutocompleteItem(lat, lon, label, communeKey) {
  const searchInput = document.getElementById('map-address-search');
  if (searchInput) searchInput.value = label;
  hideAutocompleteDropdown();

  if (communeKey && AYSEN_COMMUNES_DATA[communeKey]) {
    AppState.wizard.commune = communeKey;
    const sel = document.getElementById('calc-commune-select');
    if (sel) sel.value = communeKey;
  }

  AppState.wizard.lat = lat;
  AppState.wizard.lon = lon;

  if (rooftopMap && rooftopMarker) {
    rooftopMap.setView([lat, lon], 18);
    rooftopMarker.setLatLng([lat, lon]);
  }

  updateMapHud(lat, lon);
  recalculateRecommendation();
}

function searchMapLocation() {
  const input = document.getElementById('map-address-search');
  const query = input ? input.value.trim() : '';
  if (!query) return;
  fetchAddressSuggestions(query);
}

function locateUserGps() {
  if (!navigator.geolocation) {
    showToast('Tu navegador no soporta geolocalización');
    return;
  }
  navigator.geolocation.getCurrentPosition(
    pos => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;
      selectAutocompleteItem(lat, lon, 'Mi ubicación GPS actual');
    },
    err => {
      showToast('No pudimos acceder a tu GPS. Selecciona tu comuna.');
    },
    { enableHighAccuracy: true, timeout: 8000 }
  );
}

// -------------------------------------------------------------------------
// 10. GENERACIÓN ESTACIONAL Y TELEMETRÍA PATAGONIA
// -------------------------------------------------------------------------
function renderSeasonalChart(kitKwp, communeKey) {
  const chartContainer = document.getElementById('seasonal-chart-bars');
  if (!chartContainer) return 0;

  const commune = AYSEN_COMMUNES_DATA[communeKey] || AYSEN_COMMUNES_DATA.coyhaique;
  const monthlyKwh = commune.monthlyYieldPerKwp.map(y => Math.round(y * kitKwp));
  const maxKwh = Math.max(...monthlyKwh);

  const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

  chartContainer.innerHTML = monthlyKwh.map((kwh, idx) => {
    const heightPct = Math.max(16, Math.round((kwh / maxKwh) * 100));
    const isWinter = (idx === 5 || idx === 6);
    const isSummer = (idx === 0 || idx === 11);
    const barColor = isWinter ? 'bg-amber-500' : (isSummer ? 'bg-[#00FFFF]' : 'bg-cyan-600');

    return `
      <div class="flex-1 flex flex-col items-center justify-end h-full group relative">
        <div class="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-7 bg-slate-900 text-[#00FFFF] text-[10px] font-mono px-1.5 py-0.5 rounded shadow pointer-events-none whitespace-nowrap z-20">
          ${months[idx]}: ${kwh} kWh
        </div>
        <div class="w-full seasonal-bar ${barColor}" style="height: ${heightPct}%;"></div>
        <span class="text-[9px] font-mono text-slate-400 mt-1 block">${months[idx][0]}</span>
      </div>
    `;
  }).join('');

  const totalAnnual = monthlyKwh.reduce((a, b) => a + b, 0);
  const annEl = document.getElementById('seasonal-annual-total');
  if (annEl) annEl.textContent = '~' + totalAnnual.toLocaleString('es-CL') + ' kWh / año';

  return totalAnnual;
}

function recalculateRecommendation() {
  const kwh = AppState.wizard.kwh;
  const goal = AppState.wizard.goal;
  const profile = AppState.wizard.profile || 'residencial';
  const property = AppState.wizard.property;
  const communeKey = AppState.wizard.commune || 'coyhaique';
  const commune = AYSEN_COMMUNES_DATA[communeKey] || AYSEN_COMMUNES_DATA.coyhaique;

  // Selección de Kit
  let kitId = 'kit-5-5';
  if (profile === 'comercial' || kwh >= 1500 || property === 'galpon') {
    kitId = 'kit-12-0';
  } else if (kwh <= 250 && goal === 'savings') {
    kitId = 'kit-3-2';
  } else if (kwh > 500 || goal === 'autonomy') {
    kitId = 'kit-8-8';
  } else {
    kitId = 'kit-5-5';
  }

  AppState.wizard.recommendedKit = kitId;
  const kit = KITS_DATABASE[kitId] || KITS_DATABASE['kit-5-5'];
  const kwpNumber = parseFloat(kit.power.match(/[0-9.]+/)[0]);

  // Generación Estacional
  const realAnnualGeneration = renderSeasonalChart(kwpNumber, communeKey);

  // Telemetría
  const siteLbl = document.getElementById('telemetry-site-label');
  const ghiLbl = document.getElementById('telemetry-ghi');
  const tempLbl = document.getElementById('telemetry-temp');
  const velLbl = document.getElementById('telemetry-vel');
  const yieldLbl = document.getElementById('telemetry-yield');

  if (siteLbl) siteLbl.textContent = commune.name;
  if (ghiLbl) ghiLbl.textContent = commune.ghiAnnual;
  if (tempLbl) tempLbl.textContent = commune.tempAnnual + ' °C';
  if (velLbl) velLbl.textContent = commune.windAnnual + ' m/s';
  if (yieldLbl) yieldLbl.textContent = commune.annualYieldPerKwp.toLocaleString('es-CL');

  // CO2 e Impacto
  const co2Tons = parseFloat(((realAnnualGeneration * 0.38) / 1000).toFixed(2));
  const trees = Math.round(co2Tons * 45);
  const kmAvoided = Math.round(co2Tons * 5000);

  const co2El = document.getElementById('calc-co2-tons');
  const treesEl = document.getElementById('calc-co2-trees');
  const kmEl = document.getElementById('calc-co2-km');

  if (co2El) co2El.textContent = co2Tons.toFixed(2);
  if (treesEl) treesEl.textContent = trees;
  if (kmEl) kmEl.textContent = kmAvoided.toLocaleString('es-CL');

  // Métricas Financieras
  let annualSavingsPesos = 0;
  if (goal === 'savings') {
    annualSavingsPesos = Math.round(Math.min(AppState.wizard.amount * 12 * 0.8, realAnnualGeneration * 180));
  } else if (goal === 'autonomy') {
    annualSavingsPesos = Math.round(AppState.wizard.amount * 12 + 450000);
  } else {
    annualSavingsPesos = Math.round(AppState.wizard.amount * 12 * 0.75);
  }

  const roiYears = parseFloat((kit.price / Math.max(200000, annualSavingsPesos)).toFixed(1));

  // Tarjeta de Resultado
  const resTitle = document.getElementById('result-kit-title');
  const resPrice = document.getElementById('result-kit-price');
  const resSavings = document.getElementById('result-metric-savings');
  const resPayback = document.getElementById('result-metric-payback');
  const resPower = document.getElementById('result-metric-power');
  const resBattery = document.getElementById('result-metric-battery');
  const resDesc = document.getElementById('result-kit-desc');

  if (resTitle) resTitle.textContent = kit.name;
  if (resPrice) resPrice.textContent = '$' + kit.price.toLocaleString('es-CL');
  if (resSavings) resSavings.textContent = '~$ ' + annualSavingsPesos.toLocaleString('es-CL');
  if (resPayback) resPayback.textContent = '~' + roiYears + ' años';
  if (resPower) resPower.textContent = kit.power;
  if (resBattery) resBattery.textContent = kit.storage;

  let desc = '';
  if (profile === 'comercial') {
    desc = `Dimensionado para rebajar costos operativos en tarifa comercial en ${commune.name} con inyección regulada bajo Ley 21.118 (SEC TE4).`;
  } else if (goal === 'savings') {
    desc = `Optimizado para conectarse a Edelaysén en ${commune.name} y rebajar hasta un 75% de tu boleta mensual mediante Net Billing.`;
  } else if (goal === 'autonomy') {
    desc = `Equipado con banco de baterías LiFePO4 para abastecer consumos continuos sin acceso a la red eléctrica.`;
  } else {
    desc = `Sistema híbrido con transferencia automática para mantener respaldo continuo ante temporales y cortes de suministro en ${commune.name}.`;
  }
  if (resDesc) resDesc.textContent = desc;

  // Compatibilidad de techo
  const compatBadge = document.getElementById('roof-compatibility-badge');
  const requiredAreaNumber = parseFloat((kit.area.match(/[0-9.]+/)[0] || '26'));

  if (compatBadge) {
    if (AppState.wizard.isRoofMeasured && AppState.wizard.usableArea > 0) {
      if (AppState.wizard.usableArea >= requiredAreaNumber) {
        compatBadge.className = 'mt-2 inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1 rounded-lg bg-emerald-950/80 border border-emerald-400 text-emerald-300';
        compatBadge.innerHTML = `Espacio verificado: ${AppState.wizard.usableArea.toFixed(0)} m² útiles (requiere ${requiredAreaNumber} m²).`;
      } else {
        compatBadge.className = 'mt-2 inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1 rounded-lg bg-amber-950/80 border border-amber-400 text-amber-300';
        compatBadge.innerHTML = `Espacio ajustado: ${AppState.wizard.usableArea.toFixed(0)} m² útiles (requiere ${requiredAreaNumber} m²).`;
      }
    } else {
      compatBadge.className = 'mt-2 inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1 rounded-lg bg-white/10 border border-white/20 text-[#00FFFF]';
      compatBadge.innerHTML = `Supuesto base: Requiere ~${requiredAreaNumber} m² de cubierta libre.`;
    }
  }
}

function addRecommendedKitToCart() {
  addToCart(AppState.wizard.recommendedKit);
  openCartDrawer();
}

// -------------------------------------------------------------------------
// 11. DOSSIER TÉCNICO FORMAL
// -------------------------------------------------------------------------
function openLeadReportModal() {
  const commune = AYSEN_COMMUNES_DATA[AppState.wizard.commune] || AYSEN_COMMUNES_DATA.coyhaique;
  const kit = KITS_DATABASE[AppState.wizard.recommendedKit] || KITS_DATABASE['kit-5-5'];
  const profileLabel = AppState.wizard.profile === 'comercial' ? 'Comercial / Productivo' : 'Residencial / Parcela';

  document.getElementById('dossier-commune').textContent = commune.name;
  document.getElementById('dossier-coords').textContent = AppState.wizard.lat.toFixed(4) + ', ' + AppState.wizard.lon.toFixed(4);
  document.getElementById('dossier-profile').textContent = profileLabel;
  document.getElementById('dossier-kwh').textContent = `${AppState.wizard.kwh} kWh/mes (~$${AppState.wizard.amount.toLocaleString('es-CL')} CLP)`;

  if (AppState.wizard.isRoofMeasured && AppState.wizard.usableArea > 0) {
    document.getElementById('dossier-roof-area').textContent = `Medición Satélite: ${AppState.wizard.usableArea.toFixed(1)} m² útiles`;
    document.getElementById('dossier-roof-panels').textContent = `Capacidad: hasta ${AppState.wizard.maxPanels} paneles (${AppState.wizard.maxKwp} kWp)`;
  } else {
    document.getElementById('dossier-roof-area').textContent = 'Área Supuesta (~40 m²)';
    document.getElementById('dossier-roof-panels').textContent = 'Orientación norte sin micro-sombras';
  }

  document.getElementById('dossier-kit-name').textContent = kit.name + ' ($' + kit.price.toLocaleString('es-CL') + ' + IVA)';
  document.getElementById('dossier-kit-panels').textContent = kit.panels;
  document.getElementById('dossier-kit-inverter').textContent = kit.inverter;
  document.getElementById('dossier-kit-storage').textContent = kit.storage;
  document.getElementById('dossier-kit-area').textContent = kit.area;

  document.getElementById('dossier-gen').textContent = document.getElementById('seasonal-annual-total')?.textContent || '~6.490 kWh/año';
  document.getElementById('dossier-savings').textContent = (document.getElementById('result-metric-savings')?.textContent || '$850.000') + ' / año';
  document.getElementById('dossier-roi').textContent = document.getElementById('result-metric-payback')?.textContent || '5.2 años';
  document.getElementById('dossier-co2').textContent = (document.getElementById('calc-co2-tons')?.textContent || '2.4') + ' Ton/año';

  const modal = document.getElementById('lead-report-modal');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
}

function closeLeadReportModal() {
  const modal = document.getElementById('lead-report-modal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

function sendDossierViaWhatsApp() {
  const commune = AYSEN_COMMUNES_DATA[AppState.wizard.commune] || AYSEN_COMMUNES_DATA.coyhaique;
  const kit = KITS_DATABASE[AppState.wizard.recommendedKit] || KITS_DATABASE['kit-5-5'];
  const roofStr = AppState.wizard.isRoofMeasured ? `Techo medido satelital: ${AppState.wizard.usableArea.toFixed(0)} m² útiles` : 'Superficie estándar (~40 m²)';

  const text = encodeURIComponent(
    `*MEMORIA DE PRE-FACTIBILIDAD SOLAR EFICIAN*\n\n` +
    `• Localidad: ${commune.name} (${AppState.wizard.lat.toFixed(4)}, ${AppState.wizard.lon.toFixed(4)})\n` +
    `• Segmento: ${AppState.wizard.profile === 'comercial' ? 'Comercial / Productivo' : 'Residencial / Parcela'}\n` +
    `• Consumo: ${AppState.wizard.kwh} kWh/mes ($ ${AppState.wizard.amount.toLocaleString('es-CL')} CLP/mes)\n` +
    `• ${roofStr}\n` +
    `• Kit Recomendado: ${kit.name} (${kit.power})\n` +
    `• Ahorro estimado: ${document.getElementById('result-metric-savings')?.textContent || ''} anuales\n` +
    `• Inversión base: $ ${kit.price.toLocaleString('es-CL')} CLP + IVA\n\n` +
    `Solicito coordinar la visita técnica formal.`
  );

  window.open(`https://wa.me/56992126081?text=${text}`, '_blank');
}

// -------------------------------------------------------------------------
// 12. TIENDA SOLAR & CATÁLOGO CON FOTOGRAFÍA REAL
// -------------------------------------------------------------------------
function filterShopProducts(category) {
  Router.navigate('/tienda/' + category);
}

function renderShopProducts(filter = 'all') {
  const container = document.getElementById('shop-products-grid');
  if (!container) return;

  const kitList = Object.values(KITS_DATABASE).filter(k => {
    if (filter === 'all') return true;
    return k.category === filter;
  });

  container.innerHTML = kitList.map(kit => `
    <div class="shop-kit-card">
      <div class="shop-kit-img-container">
        <img src="${kit.image}" alt="${kit.name}" loading="lazy" />
        <span class="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-[#001D30]/85 border border-[#00FFFF]/50 text-[#00FFFF] text-[10px] font-mono">
          ${kit.power}
        </span>
        ${kit.popular ? '<span class="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-[#00FFFF] text-[#001D30] text-[10px] font-medium">Recomendado</span>' : ''}
      </div>
      <div class="p-3.5 flex flex-col justify-between flex-1 space-y-2.5">
        <div>
          <h4 class="text-xs font-medium text-white line-clamp-1">${kit.name}</h4>
          <span class="text-[10px] text-cyan-300 font-light block">${kit.type}</span>
          <div class="mt-2 text-sm font-medium text-[#00FFFF] font-mono">
            $${kit.price.toLocaleString('es-CL')} <span class="text-[10px] text-slate-400 font-light">+ IVA</span>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-1.5 pt-1 text-[10px] text-slate-300 font-light border-t border-cyan-500/15">
          <div class="truncate">Paneles: ${kit.panels.split(' ')[0]} mod</div>
          <div class="truncate">Área: ${kit.area}</div>
        </div>

        <div class="flex items-center gap-2 pt-1">
          <button onclick="openKitDetails('${kit.id}')" class="flex-1 py-1.5 rounded-lg border border-cyan-500/40 hover:border-[#00FFFF] text-white text-[11px] font-light transition-colors">
            Ficha Técnica
          </button>
          <button onclick="addToCart('${kit.id}')" class="flex-1 py-1.5 rounded-lg bg-[#00FFFF] hover:bg-white text-[#001D30] text-[11px] font-medium transition-colors">
            + Carrito
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

// -------------------------------------------------------------------------
// 13. FICHA TÉCNICA MODAL
// -------------------------------------------------------------------------
let activeKitInModal = null;

function openKitDetails(kitId) {
  Router.navigate('/tienda/kit/' + kitId);
}

function applyKitDetailsDom(kitId) {
  const kit = KITS_DATABASE[kitId];
  if (!kit) return;
  activeKitInModal = kitId;

  document.getElementById('modal-kit-tag').textContent = kit.type;
  document.getElementById('modal-kit-name').textContent = kit.name;
  document.getElementById('modal-kit-price').textContent = '$' + kit.price.toLocaleString('es-CL');
  document.getElementById('modal-kit-img').src = kit.image;
  document.getElementById('modal-kit-ideal').textContent = kit.idealFor;
  document.getElementById('modal-kit-warranty').textContent = kit.warranty;

  document.getElementById('modal-kit-specs-grid').innerHTML = `
    <div class="p-2.5 bg-black/40 rounded-xl border border-cyan-500/20">
      <span class="text-slate-400 block text-[10px] font-mono uppercase">Inversor & Potencia</span>
      <span class="text-white text-xs block mt-0.5 font-medium">${kit.inverter}</span>
    </div>
    <div class="p-2.5 bg-black/40 rounded-xl border border-cyan-500/20">
      <span class="text-slate-400 block text-[10px] font-mono uppercase">Módulos Solares</span>
      <span class="text-white text-xs block mt-0.5 font-medium">${kit.panels}</span>
    </div>
    <div class="p-2.5 bg-black/40 rounded-xl border border-cyan-500/20">
      <span class="text-slate-400 block text-[10px] font-mono uppercase">Almacenamiento BESS</span>
      <span class="text-white text-xs block mt-0.5 font-medium">${kit.storage}</span>
    </div>
    <div class="p-2.5 bg-black/40 rounded-xl border border-cyan-500/20">
      <span class="text-slate-400 block text-[10px] font-mono uppercase">Superficie Requerida</span>
      <span class="text-white text-xs block mt-0.5 font-medium">${kit.area}</span>
    </div>
    <div class="p-2.5 bg-black/40 rounded-xl border border-cyan-500/20">
      <span class="text-slate-400 block text-[10px] font-mono uppercase">Generación Estimada Anual</span>
      <span class="text-[#00FFFF] text-xs block mt-0.5 font-medium">${kit.generation}</span>
    </div>
    <div class="p-2.5 bg-black/40 rounded-xl border border-cyan-500/20">
      <span class="text-slate-400 block text-[10px] font-mono uppercase">Respaldo ante Cortes</span>
      <span class="text-white text-xs block mt-0.5 font-medium">${kit.backup}</span>
    </div>
  `;

  const waMsg = encodeURIComponent(
    'Hola Efician, tengo consultas técnicas sobre la ficha del ' + kit.name + ' (' + kit.power + ') por $' + kit.price.toLocaleString('es-CL') + '.'
  );
  document.getElementById('modal-kit-wa-link').href = 'https://wa.me/56992126081?text=' + waMsg;

  const modal = document.getElementById('kit-details-modal');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
}

function closeKitDetails() {
  if (window.location.hash.includes('/kit/')) {
    window.history.back();
  } else {
    closeKitDetailsDom();
  }
}

function closeKitDetailsDom() {
  const modal = document.getElementById('kit-details-modal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
  activeKitInModal = null;
}

function addCurrentModalKitToCart() {
  if (activeKitInModal) {
    addToCart(activeKitInModal);
    closeKitDetails();
  }
}

// -------------------------------------------------------------------------
// 14. CARRITO DE COMPRAS & SERVICIOS COMPLEMENTARIOS
// -------------------------------------------------------------------------
function openCartDrawer() {
  Router.navigate('/carrito');
}

function applyCartDrawerDom(open) {
  const drawer = document.getElementById('cart-drawer');
  if (drawer) {
    if (open) {
      drawer.classList.remove('translate-x-full');
      renderCart();
    } else {
      drawer.classList.add('translate-x-full');
    }
  }
}

function closeCartDrawer() {
  if (window.location.hash.startsWith('#/carrito')) {
    window.history.back();
  } else {
    applyCartDrawerDom(false);
  }
}

function addToCart(kitId) {
  const kit = KITS_DATABASE[kitId];
  if (!kit) return;

  const existing = AppState.cart.find(i => i.id === kitId);
  if (existing) {
    existing.qty += 1;
  } else {
    AppState.cart.push({
      id: kit.id,
      name: kit.name,
      power: kit.power,
      price: kit.price,
      qty: 1
    });
  }

  updateCartBadge();
  openCartDrawer();
  showToast(`${kit.name} añadido al carrito`);
}

function removeCartItem(kitId) {
  AppState.cart = AppState.cart.filter(i => i.id !== kitId);
  updateCartBadge();
  renderCart();
}

function updateCartBadge() {
  const count = AppState.cart.reduce((s, i) => s + i.qty, 0);
  ['cart-counter-badge', 'cart-counter-badge-mobile'].forEach(id => {
    const badge = document.getElementById(id);
    if (badge) {
      badge.textContent = count;
      if (count > 0) {
        badge.classList.remove('hidden');
        badge.classList.add('flex');
      } else {
        badge.classList.add('hidden');
        badge.classList.remove('flex');
      }
    }
  });
}

function renderCart() {
  const container = document.getElementById('cart-items-list');
  if (!container) return;

  if (AppState.cart.length === 0) {
    container.innerHTML = `
      <div class="p-6 text-center text-slate-400 bg-black/20 rounded-2xl border border-dashed border-cyan-500/20 my-4">
        <svg class="w-8 h-8 mx-auto mb-2 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
        <p class="text-xs">Tu carrito está vacío.</p>
        <button onclick="switchView('tienda'); closeCartDrawer()" class="mt-2 text-xs font-medium text-[#00FFFF] hover:underline">Ver kits en tienda</button>
      </div>
    `;
  } else {
    container.innerHTML = AppState.cart.map(item => `
      <div class="p-2.5 rounded-xl border border-cyan-500/20 bg-black/35 flex items-center justify-between gap-3 mb-2">
        <div>
          <h5 class="font-medium text-xs text-white">${item.name}</h5>
          <span class="text-[10px] font-mono text-cyan-300">${item.power} · Cant: ${item.qty}</span>
          <span class="font-mono text-xs text-[#00FFFF] block mt-0.5 font-medium">$${(item.price * item.qty).toLocaleString('es-CL')}</span>
        </div>
        <button onclick="removeCartItem('${item.id}')" class="text-slate-400 hover:text-red-400 p-1 rounded-lg" title="Quitar">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
        </button>
      </div>
    `).join('');
  }

  updateCartTotals();
}

function updateCartTotals() {
  let subtotalEquipos = AppState.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  let srvTotal = 0;

  const srvInst = document.getElementById('srv-instalacion');
  const srvSec = document.getElementById('srv-sec');
  const srvFlete = document.getElementById('srv-flete');
  const srvMant = document.getElementById('srv-mantencion');

  if (srvInst && srvInst.checked && AppState.cart.length > 0) srvTotal += SERVICES_COST.instalacion;
  if (srvSec && srvSec.checked && AppState.cart.length > 0) srvTotal += SERVICES_COST.sec;
  if (srvFlete && srvFlete.checked && AppState.cart.length > 0) srvTotal += SERVICES_COST.flete;
  if (srvMant && srvMant.checked && AppState.cart.length > 0) srvTotal += SERVICES_COST.mantencion;

  const totalNeto = subtotalEquipos + srvTotal;
  const iva = Math.round(totalNeto * 0.19);
  const totalFinal = totalNeto + iva;

  const totalEl = document.getElementById('cart-total-price');
  if (totalEl) totalEl.textContent = '$' + totalFinal.toLocaleString('es-CL');

  const netoEl = document.getElementById('cart-subtotal-neto');
  if (netoEl) netoEl.textContent = '$' + totalNeto.toLocaleString('es-CL');
}

// -------------------------------------------------------------------------
// 15. CHECKOUT FORMAL & COTIZACIÓN
// -------------------------------------------------------------------------
let selectedPaymentMethod = 'transfer';

function openCheckoutModal() {
  if (AppState.cart.length === 0) {
    showToast('Agrega un kit al carrito para continuar');
    return;
  }
  Router.navigate('/checkout');
}

function applyCheckoutModalDom(open) {
  const modal = document.getElementById('checkout-modal');
  if (modal) {
    if (open) {
      applyCartDrawerDom(false);
      renderCheckoutSummary();
      modal.classList.remove('hidden');
      modal.classList.add('flex');
    } else {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
  }
}

function closeCheckoutModal() {
  if (window.location.hash.startsWith('#/checkout')) {
    window.history.back();
  } else {
    applyCheckoutModalDom(false);
  }
}

function toggleInvoiceFields(isInvoice) {
  const container = document.getElementById('invoice-fields-container');
  if (!container) return;
  if (isInvoice) {
    container.classList.remove('hidden');
  } else {
    container.classList.add('hidden');
  }
  renderCheckoutSummary();
}

function selectPaymentMethod(method) {
  selectedPaymentMethod = method;
  ['transfer', 'webpay', 'financing'].forEach(m => {
    const el = document.getElementById('label-pay-' + m);
    if (el) {
      if (m === method) el.classList.add('active');
      else el.classList.remove('active');
    }
  });
  renderCheckoutSummary();
}

function renderCheckoutSummary() {
  const itemsContainer = document.getElementById('checkout-items-summary');
  const servicesContainer = document.getElementById('checkout-services-summary');

  if (itemsContainer) {
    itemsContainer.innerHTML = AppState.cart.map(item => `
      <div class="flex justify-between items-center py-1 border-b border-cyan-500/10">
        <div>
          <span class="text-white text-xs block font-medium">${item.name}</span>
          <span class="text-[10px] font-mono text-slate-400">${item.power} × ${item.qty}</span>
        </div>
        <span class="font-mono text-xs text-[#00FFFF] font-medium">$${(item.price * item.qty).toLocaleString('es-CL')}</span>
      </div>
    `).join('');
  }

  const srvInst = document.getElementById('srv-instalacion');
  const srvSec = document.getElementById('srv-sec');
  const srvFlete = document.getElementById('srv-flete');
  const srvMant = document.getElementById('srv-mantencion');

  let srvHtml = '';
  let srvTotal = 0;

  if (srvInst && srvInst.checked) {
    srvTotal += SERVICES_COST.instalacion;
    srvHtml += '<div class="flex justify-between text-[11px] text-slate-300"><span>• Montaje e Instalación:</span><span class="font-mono">+$850.000</span></div>';
  }
  if (srvSec && srvSec.checked) {
    srvTotal += SERVICES_COST.sec;
    srvHtml += '<div class="flex justify-between text-[11px] text-slate-300"><span>• Tramitación SEC TE4:</span><span class="font-mono">+$350.000</span></div>';
  }
  if (srvFlete && srvFlete.checked) {
    srvTotal += SERVICES_COST.flete;
    srvHtml += '<div class="flex justify-between text-[11px] text-slate-300"><span>• Flete a Terreno:</span><span class="font-mono">+$120.000</span></div>';
  }
  if (srvMant && srvMant.checked) {
    srvTotal += SERVICES_COST.mantencion;
    srvHtml += '<div class="flex justify-between text-[11px] text-slate-300"><span>• Mantención Anual:</span><span class="font-mono">+$180.000</span></div>';
  }

  if (servicesContainer) {
    servicesContainer.innerHTML = srvHtml || '<span class="text-[11px] text-slate-400">Sin servicios adicionales</span>';
  }

  const kitsTotal = AppState.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const subtotalNeto = kitsTotal + srvTotal;
  const iva = Math.round(subtotalNeto * 0.19);

  let discount = 0;
  if (selectedPaymentMethod === 'transfer') {
    discount = Math.round((subtotalNeto + iva) * 0.03);
  }

  const totalFinal = (subtotalNeto + iva) - discount;

  const subNetoEl = document.getElementById('chk-subtotal-neto');
  const ivaEl = document.getElementById('chk-iva-amount');
  const totalEl = document.getElementById('chk-total-final');
  const discRow = document.getElementById('chk-discount-row');
  const discAmount = document.getElementById('chk-discount-amount');

  if (subNetoEl) subNetoEl.textContent = '$' + subtotalNeto.toLocaleString('es-CL');
  if (ivaEl) ivaEl.textContent = '$' + iva.toLocaleString('es-CL');
  if (totalEl) totalEl.textContent = '$' + totalFinal.toLocaleString('es-CL');

  if (discRow && discAmount) {
    if (discount > 0) {
      discRow.classList.remove('hidden');
      discAmount.textContent = '-$' + discount.toLocaleString('es-CL');
    } else {
      discRow.classList.add('hidden');
    }
  }
}

function processCheckoutOrder(e) {
  if (e) e.preventDefault();

  const name = document.getElementById('chk-name')?.value.trim();
  const rut = document.getElementById('chk-rut')?.value.trim();
  const email = document.getElementById('chk-email')?.value.trim();
  const phone = document.getElementById('chk-phone')?.value.trim();
  const comuna = document.getElementById('chk-comuna')?.value;
  const address = document.getElementById('chk-address')?.value.trim();
  const isInvoice = document.getElementById('chk-doc-factura')?.checked;

  if (!name || !rut || !email || !phone || !address) {
    showToast('Completa todos los campos obligatorios');
    return;
  }

  const orderId = '#EFI-' + Math.floor(1000 + Math.random() * 9000);
  const docType = isInvoice ? 'Factura Electrónica (RUT Empresa)' : 'Boleta Electrónica (Persona Natural)';
  const payName = selectedPaymentMethod === 'transfer' ? 'Transferencia Bancaria (3% Dcto)' : (selectedPaymentMethod === 'webpay' ? 'Webpay Plus' : 'Crédito Verde');
  const totalText = document.getElementById('chk-total-final')?.textContent || '$0';

  const waMsg = encodeURIComponent(
    `*ORDEN DE COMPRA EFICIAN ${orderId}*\n\n` +
    `Cliente: ${name} (${rut})\n` +
    `Documento: ${docType}\n` +
    `Comuna: ${comuna}\n` +
    `Dirección: ${address}\n` +
    `Teléfono: ${phone}\n` +
    `Email: ${email}\n` +
    `Pago: ${payName}\n` +
    `Total: ${totalText}\n\n` +
    `*Detalle:*\n${kitsList}`
  );

  // Registrar prospecto en el CRM de Socios
  recordNewLead({
    name: `${name} (${rut})`,
    email: email,
    phone: phone,
    clientType: isInvoice ? 'empresa' : 'domicilio',
    commune: comuna.toLowerCase().replace(/\s+/g, '_'),
    communeName: `${address}, ${comuna}`,
    kwh: 450,
    amount: totalText,
    recommendedKit: AppState.cart[0]?.id || 'kit-5-5',
    recommendedKitName: AppState.cart[0]?.name || 'Kit Solar Híbrido',
    power: AppState.cart[0]?.power || '5.5 kWp',
    battery: 'LiFePO4',
    savings: '$850.000 / año'
  });

  closeCheckoutModal();
  AppState.cart = [];
  updateCartBadge();
  showToast(`Orden ${orderId} generada con éxito`);

  window.open(`https://wa.me/56992126081?text=${waMsg}`, '_blank');
}

// -------------------------------------------------------------------------
// 16. MODAL DE CAPTURA DE LEADS GENERAL ("SÚMATE")
// -------------------------------------------------------------------------
function openLeadModal(reason = 'General') {
  Router.navigate('/sumate/' + encodeURIComponent(reason));
}

function applyLeadModalDom(open, reason = 'General') {
  const modal = document.getElementById('lead-modal');
  const reasonInput = document.getElementById('lead-reason');
  if (reasonInput) reasonInput.value = reason;
  if (modal) {
    if (open) {
      modal.classList.remove('hidden');
      modal.classList.add('flex');
    } else {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
  }
}

function closeLeadModal() {
  if (window.location.hash.startsWith('#/sumate')) {
    window.history.back();
  } else {
    applyLeadModalDom(false);
  }
}

function handleLeadSubmit(event) {
  event.preventDefault();
  const name = document.getElementById('lead-name')?.value || 'Usuario';
  const email = document.getElementById('lead-email')?.value || '';
  const phone = document.getElementById('lead-phone')?.value || '';
  const commune = document.getElementById('lead-commune')?.value || 'Aysén';
  const reason = document.getElementById('lead-reason')?.value || 'Súmate';

  // Registrar en CRM
  recordNewLead({
    name: name,
    email: email,
    phone: phone,
    clientType: 'domicilio',
    commune: commune.toLowerCase().replace(/\s+/g, '_'),
    communeName: commune,
    kwh: 380,
    amount: '$95.000',
    recommendedKit: 'kit-5-5',
    recommendedKitName: 'Kit Solar 5.5 kW Híbrido',
    power: '5.5 kWp',
    battery: '5.12 kWh LiFePO4',
    savings: '$850.000 / año'
  });

  closeLeadModal();
  showToast('¡Gracias! Un ingeniero te contactará pronto.');

  const msg = encodeURIComponent(
    `Hola Efician, solicito asesoría técnica:\n` +
    `• Nombre: ${name}\n` +
    `• Motivo: ${reason}\n` +
    `• Comuna: ${commune}\n` +
    `• Teléfono: ${phone}\n` +
    `• Correo: ${email}`
  );
  window.open(`https://wa.me/56992126081?text=${msg}`, '_blank');
}

function handleCotizaSubmit(event) {
  if (event) event.preventDefault();
  const name = document.getElementById('cotiza-name')?.value.trim() || 'Cliente';
  const phone = document.getElementById('cotiza-phone')?.value.trim() || '';
  const email = document.getElementById('cotiza-email')?.value.trim() || '';
  const commune = document.getElementById('cotiza-commune')?.value.trim() || 'Coyhaique';
  const gridStatus = document.getElementById('cotiza-grid-status')?.value || 'con_red';
  const connType = document.getElementById('cotiza-connection-type')?.value || 'monofasico';
  const bill = document.getElementById('cotiza-bill')?.value.trim() || 'No especificado';
  const goal = document.getElementById('cotiza-goal')?.value || 'ahorro';

  const gridMap = {
    con_red: 'Con red Edelaysén (Empalme activo)',
    sin_red: 'Sin red eléctrica (Parcela / Aislado)',
    en_tramite: 'En trámite de empalme nuevo'
  };

  const connMap = {
    monofasico: 'Monofásico (220V)',
    trifasico: 'Trifásico (380V)',
    por_evaluar: 'Por evaluar en terreno'
  };

  const goalMap = {
    ahorro: 'Ahorro en boleta (Net Billing Ley 20.571)',
    respaldo: 'Respaldo ante cortes (Híbrido con Batería)',
    autonomia: 'Autonomía 100% aislada (Off-Grid)',
    empresa: 'Comercial / Empresa / Pyme'
  };

  const isCompany = goal === 'empresa';

  // Registrar en CRM y Webhook
  recordNewLead({
    name: name,
    email: email,
    phone: phone,
    clientType: isCompany ? 'empresa' : 'domicilio',
    commune: commune.toLowerCase().replace(/\s+/g, '_'),
    communeName: commune,
    kwh: 450,
    amount: bill,
    recommendedKit: isCompany ? 'kit-12-0' : (goal === 'autonomia' ? 'kit-8-8' : 'kit-5-5'),
    recommendedKitName: isCompany ? 'Kit Solar 12.0 kW Comercial' : (goal === 'autonomia' ? 'Kit Solar 8.8 kW Off-Grid' : 'Kit Solar 5.5 kW Híbrido'),
    power: isCompany ? '12.0 kWp' : (goal === 'autonomia' ? '8.8 kWp' : '5.5 kWp'),
    battery: goal === 'respaldo' || goal === 'autonomia' ? '5.12 kWh LiFePO4' : 'Opcional / Inyección Red',
    savings: isCompany ? '~$1.850.000 / año' : '~$850.000 / año'
  });

  showToast('¡Cotización recibida con éxito! Nos comunicaremos a la brevedad.');

  // Redirigir a WhatsApp con los datos formateados
  const waText = encodeURIComponent(
    `*SOLICITUD DE COTIZACIÓN TÉCNICA — EFICIAN*\n\n` +
    `• *Nombre:* ${name}\n` +
    `• *Teléfono:* ${phone}\n` +
    `• *Correo:* ${email}\n` +
    `• *Ubicación:* ${commune}\n` +
    `• *Red Eléctrica:* ${gridMap[gridStatus] || gridStatus}\n` +
    `• *Conexión:* ${connMap[connType] || connType}\n` +
    `• *Gasto / Consumo:* ${bill}\n` +
    `• *Objetivo:* ${goalMap[goal] || goal}\n\n` +
    `_Enviado desde efician.cl_`
  );

  window.open(`https://wa.me/56992126081?text=${waText}`, '_blank');
}

function sendCotizaViaWhatsApp() {
  const name = document.getElementById('cotiza-name')?.value.trim() || '';
  const phone = document.getElementById('cotiza-phone')?.value.trim() || '';
  const email = document.getElementById('cotiza-email')?.value.trim() || '';
  const commune = document.getElementById('cotiza-commune')?.value.trim() || '';
  const gridStatus = document.getElementById('cotiza-grid-status')?.value || 'con_red';
  const connType = document.getElementById('cotiza-connection-type')?.value || 'monofasico';
  const bill = document.getElementById('cotiza-bill')?.value.trim() || '';
  const goal = document.getElementById('cotiza-goal')?.value || 'ahorro';

  const gridMap = {
    con_red: 'Con red Edelaysén (Empalme activo)',
    sin_red: 'Sin red eléctrica (Parcela / Aislado)',
    en_tramite: 'En trámite de empalme nuevo'
  };

  const connMap = {
    monofasico: 'Monofásico (220V)',
    trifasico: 'Trifásico (380V)',
    por_evaluar: 'Por evaluar en terreno'
  };

  const goalMap = {
    ahorro: 'Ahorro en boleta (Net Billing Ley 20.571)',
    respaldo: 'Respaldo ante cortes (Híbrido con Batería)',
    autonomia: 'Autonomía 100% aislada (Off-Grid)',
    empresa: 'Comercial / Empresa / Pyme'
  };

  const isCompany = goal === 'empresa';

  if (name || phone || email) {
    recordNewLead({
      name: name || 'Prospecto Cotiza WhatsApp',
      email: email || 'No informado',
      phone: phone || 'No informado',
      clientType: isCompany ? 'empresa' : 'domicilio',
      commune: commune ? commune.toLowerCase().replace(/\s+/g, '_') : 'coyhaique',
      communeName: commune || 'Coyhaique',
      kwh: 450,
      amount: bill || 'Por dimensionar',
      recommendedKit: isCompany ? 'kit-12-0' : (goal === 'autonomia' ? 'kit-8-8' : 'kit-5-5'),
      recommendedKitName: isCompany ? 'Kit Solar 12.0 kW Comercial' : (goal === 'autonomia' ? 'Kit Solar 8.8 kW Off-Grid' : 'Kit Solar 5.5 kW Híbrido'),
      power: isCompany ? '12.0 kWp' : (goal === 'autonomia' ? '8.8 kWp' : '5.5 kWp'),
      battery: goal === 'respaldo' || goal === 'autonomia' ? '5.12 kWh LiFePO4' : 'Opcional / Inyección Red',
      savings: isCompany ? '~$1.850.000 / año' : '~$850.000 / año'
    });
  }

  let text = `*SOLICITUD DE COTIZACIÓN TÉCNICA — EFICIAN*\n\n`;
  if (name) text += `• *Nombre:* ${name}\n`;
  if (phone) text += `• *Teléfono:* ${phone}\n`;
  if (email) text += `• *Correo:* ${email}\n`;
  if (commune) text += `• *Ubicación:* ${commune}\n`;
  text += `• *Red Eléctrica:* ${gridMap[gridStatus] || gridStatus}\n`;
  text += `• *Conexión:* ${connMap[connType] || connType}\n`;
  if (bill) text += `• *Gasto / Consumo:* ${bill}\n`;
  text += `• *Objetivo:* ${goalMap[goal] || goal}\n\n`;
  text += `_Solicitud generada desde efician.cl_`;

  window.open(`https://wa.me/56992126081?text=${encodeURIComponent(text)}`, '_blank');
}

// -------------------------------------------------------------------------
// 17. TOAST NOTIFICATIONS
// -------------------------------------------------------------------------
function showToast(message) {
  const toast = document.getElementById('app-toast');
  const msgEl = document.getElementById('toast-message');
  if (!toast || !msgEl) return;

  msgEl.textContent = message;
  toast.classList.remove('opacity-0', 'translate-y-20');
  toast.classList.add('opacity-100', 'translate-y-0');

  setTimeout(() => {
    toast.classList.remove('opacity-100', 'translate-y-0');
    toast.classList.add('opacity-0', 'translate-y-20');
  }, 3200);
}

// -------------------------------------------------------------------------
// 18. CHATBOT ASISTENTE SOLAR FLOTANTE ("ASISTENTE EFICIAN")
// -------------------------------------------------------------------------
const FAQ_ANSWERS = {
  net_billing: {
    q: '¿Cómo funciona la Ley 20.571 de Net Billing?',
    a: 'La Ley 20.571 (y su actualización Ley 21.118) faculta a los clientes de Edelaysén a autogenerar su electricidad mediante paneles solares e inyectar sus excedentes a la red eléctrica. Estos excedentes son valorizados y descontados automáticamente en tu boleta mensual de luz.'
  },
  invierno: {
    q: '¿Qué ocurre durante el invierno y nevadas en Aysén?',
    a: 'Diseñamos e instalamos nuestros módulos con una inclinación óptima de 55° orientados al Norte. Esta pendiente pronunciada no solo maximiza la captación solar en los meses de invierno (junio-julio), sino que también facilita el escurrimiento y deslizamiento natural de la nieve.'
  },
  baterias: {
    q: '¿Qué tipo de baterías LiFePO4 utilizan y cuántos ciclos duran?',
    a: 'Utilizamos bancos modulares de Litio Ferro-Fosfato (LiFePO4) de 5.12 kWh a 48V con BMS inteligente y calefactor interno para frío extremo. Ofrecen más de 6.000 ciclos útiles (>15 años de vida útil) sin efecto memoria ni riesgo de congelamiento.'
  },
  sec_te4: {
    q: '¿Qué es la Declaración SEC TE-4 y quién la realiza?',
    a: 'La Declaración SEC TE-4 es el trámite legal obligatorio ante la Superintendencia de Electricidad y Combustibles para proyectos de generación distribuida. En Efician, ingenieros eléctricos autorizados SEC Clase A gestionan todo el expediente técnico hasta la conexión oficial con Edelaysén.'
  },
  cortes_luz: {
    q: '¿Cómo responde el sistema ante temporales y cortes de luz?',
    a: 'Nuestros kits con inversores híbridos cuentan con salida de respaldo EPS de transferencia ultrarrápida (<15 ms). Cuando la red pública se cae, tus consumos críticos (refrigeración, iluminación, wifi, bombas de agua) continúan operando sin interrupción.'
  },
  precios_kits: {
    q: '¿Cuáles son los valores estimados de los kits solares?',
    a: 'Nuestros sistemas fotovoltaicos llave en mano van desde $3.490.000 + IVA (Kit On-Grid 3.2 kW para casas pareadas) hasta $13.800.000 + IVA (Kit Trifásico Comercial 12.0 kW). Todos incluyen paneles Tier-1, inversor garantizado y monitoreo móvil.'
  }
};

function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function toggleFaqBot() {
  const windowEl = document.getElementById('faq-bot-window');
  if (!windowEl) return;
  const isHidden = windowEl.classList.contains('hidden');
  if (isHidden) {
    Router.navigate('/asistente');
  } else {
    if (window.location.hash.startsWith('#/asistente') || window.location.hash.startsWith('#/bot')) {
      window.history.back();
    } else {
      applyFaqBotDom(false);
    }
  }
}

function applyFaqBotDom(open) {
  const windowEl = document.getElementById('faq-bot-window');
  if (!windowEl) return;
  if (open) {
    windowEl.classList.remove('hidden');
    const input = document.getElementById('bot-user-input');
    if (input) setTimeout(() => input.focus(), 150);
  } else {
    windowEl.classList.add('hidden');
  }
}

function triggerBotAnswer(topicKey) {
  const data = FAQ_ANSWERS[topicKey];
  if (!data) return;

  const container = document.getElementById('bot-messages-container');
  if (!container) return;

  // 1. Mensaje Usuario
  const userBubble = document.createElement('div');
  userBubble.className = 'flex justify-end';
  userBubble.innerHTML = `
    <div class="bot-bubble-user">
      ${data.q}
    </div>
  `;
  container.appendChild(userBubble);
  container.scrollTop = container.scrollHeight;

  // 2. Mensaje Asistente
  setTimeout(() => {
    const botBubble = document.createElement('div');
    botBubble.className = 'flex items-start gap-2';
    botBubble.innerHTML = `
      <div class="w-6 h-6 rounded-lg bg-[#00FFFF]/20 border border-[#00FFFF] text-[#00FFFF] flex items-center justify-center font-mono text-[10px] font-medium shrink-0">
        EF
      </div>
      <div class="bot-bubble-bot space-y-2">
        <p>${data.a}</p>
        <div class="pt-1.5 border-t border-cyan-500/20">
          <a href="https://wa.me/56992126081?text=Hola%20Efician%2C%20tengo%20una%20consulta%20técnica%20sobre%3A%20${encodeURIComponent(data.q)}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 text-cyan-300 hover:text-white font-medium text-[10.5px]">
            <span>Profundizar con un Ingeniero por WhatsApp ➔</span>
          </a>
        </div>
      </div>
    `;
    container.appendChild(botBubble);
    container.scrollTop = container.scrollHeight;
  }, 280);
}

function handleBotUserSubmit(event) {
  if (event) event.preventDefault();
  const input = document.getElementById('bot-user-input');
  if (!input) return;
  const q = input.value.trim();
  if (!q) return;

  const container = document.getElementById('bot-messages-container');
  const userBubble = document.createElement('div');
  userBubble.className = 'flex justify-end';
  userBubble.innerHTML = `
    <div class="bot-bubble-user">
      ${escapeHtml(q)}
    </div>
  `;
  container.appendChild(userBubble);
  input.value = '';
  container.scrollTop = container.scrollHeight;

  setTimeout(() => {
    const lower = q.toLowerCase();
    let answer = '';

    if (lower.includes('precio') || lower.includes('costo') || lower.includes('valor') || lower.includes('cuanto')) {
      answer = 'Nuestros kits solares certificados en Aysén van desde los <strong>$3.490.000 + IVA</strong> (Kit On-Grid 3.2 kW) hasta los <strong>$13.800.000 + IVA</strong> (Kit Comercial 12 kW). Puedes ver el catálogo completo en la sección <strong>Tienda</strong> o dimensionar tu propiedad en la <strong>Calculadora</strong>.';
    } else if (lower.includes('bateria') || lower.includes('litio') || lower.includes('lifepo4') || lower.includes('almacenamiento')) {
      answer = 'Utilizamos exclusivamente bancos <strong>LiFePO4 de 5.12 kWh 48V</strong> con más de 6.000 ciclos útiles (>15 años) y BMS térmico para bajas temperaturas en la Patagonia.';
    } else if (lower.includes('invierno') || lower.includes('nieve') || lower.includes('frio') || lower.includes('helada')) {
      answer = 'Diseñamos estructuras con <strong>inclinación de 55° al Norte</strong> para evacuar la nieve de forma natural y maximizar la radiación en los meses invernales.';
    } else if (lower.includes('te4') || lower.includes('sec') || lower.includes('legal') || lower.includes('declaracion')) {
      answer = 'La tramitación <strong>SEC TE-4</strong> es gestionada íntegramente por nuestros ingenieros eléctricos autorizados para habilitar la inyección con Edelaysén.';
    } else if (lower.includes('corte') || lower.includes('respaldo') || lower.includes('apagon')) {
      answer = 'Nuestros inversores híbridos conmutan a modo EPS en menos de 15 milisegundos, manteniendo energizados tus consumos críticos ante cortes de red.';
    } else {
      answer = 'Excelente consulta. Para entregarte el dimensionamiento exacto de tu inmueble o factibilidad en terreno, te invito a conectar directamente con nuestro equipo técnico por WhatsApp.';
    }

    const botBubble = document.createElement('div');
    botBubble.className = 'flex items-start gap-2';
    botBubble.innerHTML = `
      <div class="w-6 h-6 rounded-lg bg-[#00FFFF]/20 border border-[#00FFFF] text-[#00FFFF] flex items-center justify-center font-mono text-[10px] font-medium shrink-0">
        EF
      </div>
      <div class="bot-bubble-bot space-y-2">
        <p>${answer}</p>
        <div class="pt-1.5 border-t border-cyan-500/20">
          <a href="https://wa.me/56992126081?text=Hola%20Efician%2C%20tengo%20una%20consulta%20técnica%3A%20${encodeURIComponent(q)}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 text-cyan-300 hover:text-white font-medium text-[10.5px]">
            <span>Profundizar con un Ingeniero por WhatsApp ➔</span>
          </a>
        </div>
      </div>
    `;
    container.appendChild(botBubble);
    container.scrollTop = container.scrollHeight;
  }, 320);
}

// -------------------------------------------------------------------------
// 19. PORTAL DE SOCIOS / CRM DIRECTIVO (AUTENTICACIÓN POR PIN & EXCEL)
// -------------------------------------------------------------------------
const ownerState = {
  unlocked: false,
  pinInput: '',
  activeTab: 'metricas',
  leads: []
};

function getOwnerPin() {
  return localStorage.getItem('efician_owner_pin') || '2026';
}

function setOwnerPin(newPin) {
  localStorage.setItem('efician_owner_pin', newPin);
}

function handleOwnerTrigger() {
  if (ownerState.unlocked) {
    Router.navigate('/socios/' + (ownerState.activeTab || 'metricas'));
  } else {
    Router.navigate('/socios');
  }
}

function openOwnerAuthModal() {
  Router.navigate('/socios');
}

function applyOwnerAuthModalDom(open) {
  const modal = document.getElementById('owner-auth-modal-backdrop');
  if (!modal) return;
  if (open) {
    ownerState.pinInput = '';
    updatePinDots();
    const feedback = document.getElementById('owner-pin-feedback');
    if (feedback) feedback.textContent = 'PIN sugerido de fábrica: 2026';
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  } else {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

function closeOwnerAuthModal() {
  if (window.location.hash.startsWith('#/socios')) {
    window.history.back();
  } else {
    applyOwnerAuthModalDom(false);
  }
  ownerState.pinInput = '';
}

function closeOwnerAuthModalDom() {
  applyOwnerAuthModalDom(false);
}

function enterPinDigit(digit) {
  if (ownerState.pinInput.length < 4) {
    ownerState.pinInput += digit;
    updatePinDots();
    if (ownerState.pinInput.length === 4) {
      setTimeout(submitPin, 150);
    }
  }
}

function clearPin() {
  ownerState.pinInput = '';
  updatePinDots();
}

function updatePinDots() {
  const dotsContainer = document.getElementById('owner-pin-dots');
  if (!dotsContainer) return;
  const dots = dotsContainer.querySelectorAll('.pin-dot');
  dots.forEach((dot, index) => {
    if (index < ownerState.pinInput.length) {
      dot.className = 'w-3.5 h-3.5 rounded-full border-2 border-[#00FFFF] bg-[#00FFFF] transition-all pin-dot scale-110 shadow-sm shadow-[#00FFFF]/50';
    } else {
      dot.className = 'w-3.5 h-3.5 rounded-full border-2 border-slate-600 bg-black/40 transition-all pin-dot';
    }
  });
}

function submitPin() {
  const correctPin = getOwnerPin();
  const feedback = document.getElementById('owner-pin-feedback');
  if (ownerState.pinInput === correctPin) {
    ownerState.unlocked = true;
    applyOwnerAuthModalDom(false);
    Router.navigate('/socios/' + (ownerState.activeTab || 'metricas'), { replace: true });
    showToast('Sesión de Socios iniciada');
  } else {
    if (feedback) feedback.textContent = 'PIN incorrecto. Intenta nuevamente.';
    ownerState.pinInput = '';
    updatePinDots();
  }
}

function lockOwnerSession() {
  ownerState.unlocked = false;
  Router.navigate('/inicio');
  showToast('Sesión de Socios bloqueada');
}

function toggleOwnerFullscreen(open) {
  if (open) {
    Router.navigate('/socios/' + (ownerState.activeTab || 'metricas'));
  } else {
    if (window.location.hash.startsWith('#/socios')) {
      window.history.back();
    } else {
      applyOwnerFullscreenDom(false);
    }
  }
}

function applyOwnerFullscreenDom(open) {
  const portal = document.getElementById('owner-fullscreen-portal');
  if (!portal) return;
  if (open) {
    portal.classList.remove('hidden');
    renderOwnerPortal();
  } else {
    portal.classList.add('hidden');
  }
}

function switchOwnerPortalTab(tabKey) {
  Router.navigate('/socios/' + tabKey);
}

function applyOwnerPortalTabDom(tabKey) {
  ownerState.activeTab = tabKey;
  
  const tabs = ['metricas', 'leads', 'precios', 'sync'];
  tabs.forEach(t => {
    const btn = document.getElementById('owner-ptab-' + t);
    const view = document.getElementById('owner-portal-view-' + t);
    if (t === tabKey) {
      btn?.classList.add('active');
      view?.classList.remove('hidden');
    } else {
      btn?.classList.remove('active');
      view?.classList.add('hidden');
    }
  });

  if (tabKey === 'leads') renderOwnerLeads();
  if (tabKey === 'metricas') renderOwnerMetrics();
  if (tabKey === 'precios') populateOwnerPricing();
  if (tabKey === 'sync') populateOwnerSyncSettings();
}

// -------------------------------------------------------------------------
// 20. CRM DE PROSPECTOS Y EXPORTACIÓN EXCEL
// -------------------------------------------------------------------------
const INITIAL_AYSEN_SEED_LEADS = [
  {
    id: 'LEAD-101',
    timestamp: '14/09/2026 11:30',
    rawDate: '2026-09-14T11:30:00Z',
    name: 'Rodrigo Morales Soto',
    email: 'rmorales@estanciapatagonia.cl',
    phone: '+56 9 8452 1199',
    clientType: 'domicilio',
    commune: 'coyhaique',
    communeName: 'Coyhaique (Valle Simpson)',
    kwh: 520,
    amount: '$130.000',
    recommendedKit: 'kit-5-5',
    recommendedKitName: 'Kit Solar 5.5 kW Híbrido',
    power: '5.5 kWp',
    battery: '5.12 kWh LiFePO4',
    savings: '$850.000 / año',
    status: 'Contactado'
  },
  {
    id: 'LEAD-102',
    timestamp: '13/09/2026 16:45',
    rawDate: '2026-09-13T16:45:00Z',
    name: 'Camila Valenzuela Ríos',
    email: 'cvalenzuela@australtech.cl',
    phone: '+56 9 9341 5522',
    clientType: 'domicilio',
    commune: 'chile_chico',
    communeName: 'Chile Chico (Puerto Guadal)',
    kwh: 380,
    amount: '$95.000',
    recommendedKit: 'kit-5-5',
    recommendedKitName: 'Kit Solar 5.5 kW Híbrido',
    power: '5.5 kWp',
    battery: '5.12 kWh LiFePO4',
    savings: '$850.000 / año',
    status: 'Nuevo'
  },
  {
    id: 'LEAD-103',
    timestamp: '12/09/2026 09:20',
    rawDate: '2026-09-12T09:20:00Z',
    name: 'Ganadera y Cabañas Alto Simpson SpA',
    email: 'administracion@altosimpson.cl',
    phone: '+56 9 7611 4488',
    clientType: 'empresa',
    commune: 'coyhaique',
    communeName: 'Coyhaique Centro',
    kwh: 1450,
    amount: '$362.500',
    recommendedKit: 'kit-12-0',
    recommendedKitName: 'Kit Solar 12.0 kW Comercial',
    power: '12.0 kWp',
    battery: 'Compatible BESS',
    savings: '$1.850.000 / año',
    status: 'Nuevo'
  },
  {
    id: 'LEAD-104',
    timestamp: '11/09/2026 18:10',
    rawDate: '2026-09-11T18:10:00Z',
    name: 'Sebastián Almonacid',
    email: 'salmonacid@gmail.com',
    phone: '+56 9 6223 9911',
    clientType: 'domicilio',
    commune: 'puerto_aysen',
    communeName: 'Puerto Aysén',
    kwh: 240,
    amount: '$60.000',
    recommendedKit: 'kit-3-2',
    recommendedKitName: 'Kit Solar 3.2 kW On-Grid',
    power: '3.2 kWp',
    battery: 'Sin Baterías (On-Grid)',
    savings: '$520.000 / año',
    status: 'Cerrado'
  }
];

function getStoredLeads() {
  try {
    const raw = localStorage.getItem('efician_crm_leads');
    if (!raw) {
      localStorage.setItem('efician_crm_leads', JSON.stringify(INITIAL_AYSEN_SEED_LEADS));
      return INITIAL_AYSEN_SEED_LEADS;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      localStorage.setItem('efician_crm_leads', JSON.stringify(INITIAL_AYSEN_SEED_LEADS));
      return INITIAL_AYSEN_SEED_LEADS;
    }
    return parsed;
  } catch (e) {
    return INITIAL_AYSEN_SEED_LEADS;
  }
}

function saveStoredLeads(leads) {
  try {
    localStorage.setItem('efician_crm_leads', JSON.stringify(leads));
  } catch (e) {}
}

function recordNewLead(leadData) {
  const now = new Date();
  const dateStr = now.toLocaleDateString('es-CL') + ' ' + now.toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' });

  const newLead = {
    id: 'LEAD-' + Math.floor(100 + Math.random() * 900),
    timestamp: dateStr,
    rawDate: now.toISOString(),
    name: leadData.name || 'Prospecto Web',
    email: leadData.email || 'No informado',
    phone: leadData.phone || 'No informado',
    clientType: leadData.clientType || 'domicilio',
    commune: leadData.commune || 'coyhaique',
    communeName: leadData.communeName || 'Coyhaique',
    kwh: leadData.kwh || 380,
    amount: leadData.amount || '$95.000',
    recommendedKit: leadData.recommendedKit || 'kit-5-5',
    recommendedKitName: leadData.recommendedKitName || 'Kit Solar 5.5 kW Híbrido',
    power: leadData.power || '5.5 kWp',
    battery: leadData.battery || '5.12 kWh LiFePO4',
    savings: leadData.savings || '$850.000 / año',
    status: 'Nuevo'
  };

  const leads = [newLead, ...getStoredLeads()];
  saveStoredLeads(leads);

  // Webhook Google Sheets
  const webhook = localStorage.getItem('efician_owner_webhook');
  if (webhook) {
    try {
      fetch(webhook, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newLead)
      }).catch(() => {});
    } catch (e) {}
  }

  updateOwnerBadges();
  return newLead;
}

function updateOwnerBadges() {
  const leads = getStoredLeads();
  const badge = document.getElementById('owner-leads-counter-badge');
  if (badge) badge.textContent = leads.length;
}

function renderOwnerPortal() {
  updateOwnerBadges();
  renderOwnerMetrics();
  renderOwnerLeads();
}

function renderOwnerMetrics() {
  const leads = getStoredLeads();
  ownerState.leads = leads;

  document.getElementById('stat-total-leads').textContent = leads.length;
  document.getElementById('stat-pending-leads').textContent = leads.filter(l => l.status === 'Nuevo').length;

  let sumPower = 0;
  let sumKwh = 0;
  let domCount = 0;
  let empCount = 0;
  const communeCounts = {};

  leads.forEach(l => {
    const c = l.communeName ? l.communeName.split('(')[0].trim() : 'Coyhaique';
    communeCounts[c] = (communeCounts[c] || 0) + 1;

    const kwh = Number(l.kwh) || 380;
    sumKwh += kwh;

    if (l.power && l.power.includes('kW')) {
      sumPower += parseFloat(l.power) || 5.5;
    } else {
      sumPower += 5.5;
    }

    if (l.clientType === 'empresa') empCount++; else domCount++;
  });

  document.getElementById('stat-total-power').textContent = sumPower.toFixed(1) + ' kWp';
  document.getElementById('stat-avg-kwh').textContent = Math.round(sumKwh / Math.max(1, leads.length)) + ' kWh';

  // Barras de Comunas
  const breakdownEl = document.getElementById('owner-communes-breakdown');
  if (breakdownEl) {
    const sorted = Object.entries(communeCounts).sort((a, b) => b[1] - a[1]);
    breakdownEl.innerHTML = sorted.map(([name, cnt]) => {
      const pct = Math.round((cnt / leads.length) * 100);
      return `
        <div>
          <div class="flex justify-between text-xs mb-1">
            <span class="text-slate-200 font-light">${name}</span>
            <span class="font-mono text-cyan-300 text-[11px]">${cnt} cotiz. (${pct}%)</span>
          </div>
          <div class="w-full h-2 bg-black/50 rounded-full overflow-hidden border border-cyan-500/20">
            <div class="h-full bg-gradient-to-r from-[#00FFFF] to-cyan-400 rounded-full" style="width: ${pct}%"></div>
          </div>
        </div>
      `;
    }).join('');
  }

  const totalClients = Math.max(1, domCount + empCount);
  document.getElementById('stat-client-residential').textContent = `${Math.round((domCount / totalClients) * 100)}% (${domCount})`;
  document.getElementById('stat-client-business').textContent = `${Math.round((empCount / totalClients) * 100)}% (${empCount})`;
}

function renderOwnerLeads(filterQuery = '', statusFilter = 'todos', communeFilter = 'todas') {
  const tbody = document.getElementById('owner-leads-tbody');
  const emptyState = document.getElementById('owner-leads-empty-state');
  if (!tbody) return;

  let leads = getStoredLeads();
  const q = (filterQuery || document.getElementById('owner-leads-search')?.value || '').toLowerCase().trim();
  const st = statusFilter !== 'todos' ? statusFilter : (document.getElementById('owner-leads-filter-status')?.value || 'todos');
  const comm = communeFilter !== 'todas' ? communeFilter : (document.getElementById('owner-leads-filter-commune')?.value || 'todas');

  if (q) {
    leads = leads.filter(l =>
      (l.name && l.name.toLowerCase().includes(q)) ||
      (l.email && l.email.toLowerCase().includes(q)) ||
      (l.phone && l.phone.toLowerCase().includes(q)) ||
      (l.communeName && l.communeName.toLowerCase().includes(q)) ||
      (l.recommendedKitName && l.recommendedKitName.toLowerCase().includes(q))
    );
  }

  if (st !== 'todos') {
    leads = leads.filter(l => l.status === st);
  }

  if (comm !== 'todas') {
    leads = leads.filter(l => l.commune === comm);
  }

  if (leads.length === 0) {
    tbody.innerHTML = '';
    emptyState?.classList.remove('hidden');
    return;
  }

  emptyState?.classList.add('hidden');

  tbody.innerHTML = leads.map(l => {
    const isCompany = l.clientType === 'empresa';
    let statusBadge = 'bg-sky-500/20 text-sky-300 border-sky-400/40';
    if (l.status === 'Contactado') statusBadge = 'bg-amber-500/20 text-amber-300 border-amber-400/40';
    if (l.status === 'Cerrado') statusBadge = 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40';

    return `
      <tr class="hover:bg-cyan-500/10 transition-colors border-b border-cyan-500/10">
        <td class="py-2.5 px-3 font-mono text-slate-400 text-xs whitespace-nowrap">
          ${escapeHtml(l.timestamp || '')}
        </td>
        <td class="py-2.5 px-3">
          <div class="flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full ${isCompany ? 'bg-amber-400' : 'bg-[#00FFFF]'}"></span>
            <span class="text-white text-xs font-medium">${escapeHtml(l.name)}</span>
          </div>
          <span class="text-[11px] text-slate-400 font-mono block">${escapeHtml(l.email)} · ${escapeHtml(l.phone)}</span>
        </td>
        <td class="py-2.5 px-3 text-xs">
          <span class="text-white font-light">${escapeHtml(l.communeName || 'Coyhaique')}</span>
          <span class="text-[10px] text-cyan-300 font-mono block">${isCompany ? 'Comercial' : 'Residencial'}</span>
        </td>
        <td class="py-2.5 px-3 text-xs font-mono">
          <span class="text-white">${escapeHtml(l.recommendedKitName || 'Kit 5.5 kW')}</span>
          <span class="text-[10px] text-slate-400 block">${l.power}</span>
        </td>
        <td class="py-2.5 px-3 text-xs">
          <span class="px-2 py-0.5 rounded-md border text-[10px] font-mono ${statusBadge}">${l.status}</span>
        </td>
        <td class="py-2.5 px-3 text-right">
          <button onclick="openOwnerLeadDetail('${l.id}')" class="px-2 py-1 rounded-lg bg-black/40 border border-cyan-500/30 hover:border-[#00FFFF] text-white text-[11px] transition-colors">
            Ver Ficha
          </button>
        </td>
      </tr>
    `;
  }).join('');
}

function openOwnerLeadDetail(leadId) {
  const leads = getStoredLeads();
  const lead = leads.find(l => l.id === leadId);
  if (!lead) return;

  document.getElementById('lead-detail-id').textContent = lead.id;
  document.getElementById('lead-detail-name').textContent = lead.name;
  document.getElementById('lead-detail-email').textContent = lead.email;
  document.getElementById('lead-detail-phone').textContent = lead.phone;
  document.getElementById('lead-detail-commune').textContent = lead.communeName;
  document.getElementById('lead-detail-type').textContent = lead.clientType === 'empresa' ? 'Comercial / Productivo' : 'Residencial / Parcela';
  document.getElementById('lead-detail-kwh').textContent = `${lead.kwh} kWh/mes (~${lead.amount})`;
  document.getElementById('lead-detail-kit').textContent = `${lead.recommendedKitName} (${lead.power})`;
  document.getElementById('lead-detail-battery').textContent = lead.battery;
  document.getElementById('lead-detail-savings').textContent = lead.savings;

  const statusSel = document.getElementById('lead-detail-status-select');
  if (statusSel) {
    statusSel.value = lead.status;
    statusSel.onchange = () => {
      lead.status = statusSel.value;
      saveStoredLeads(leads);
      renderOwnerPortal();
      showToast(`Estado de ${lead.name} actualizado a ${lead.status}`);
    };
  }

  const waBtn = document.getElementById('lead-detail-wa-btn');
  if (waBtn) {
    const cleanPhone = (lead.phone || '').replace(/\D/g, '');
    const waText = encodeURIComponent(`Hola ${lead.name}, te contacto desde Efician respecto a tu cotización para el ${lead.recommendedKitName}.`);
    waBtn.href = `https://wa.me/${cleanPhone}?text=${waText}`;
  }

  const modal = document.getElementById('owner-lead-detail-modal');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
}

function closeOwnerLeadDetail() {
  closeOwnerLeadDetailDom();
}

function closeOwnerLeadDetailDom() {
  const modal = document.getElementById('owner-lead-detail-modal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

function exportLeadsToExcel() {
  if (typeof XLSX === 'undefined') {
    showToast('La librería SheetJS está cargando...');
    return;
  }

  const leads = getStoredLeads();
  const rows = leads.map(l => ({
    'ID Prospecto': l.id,
    'Fecha': l.timestamp,
    'Nombre Cliente': l.name,
    'Email': l.email,
    'Teléfono': l.phone,
    'Segmento': l.clientType === 'empresa' ? 'Comercial' : 'Residencial',
    'Comuna / Sector': l.communeName,
    'Consumo kWh': l.kwh,
    'Gasto Mensual': l.amount,
    'Kit Recomendado': l.recommendedKitName,
    'Potencia kWp': l.power,
    'Batería': l.battery,
    'Ahorro Proyectado': l.savings,
    'Estado CRM': l.status
  }));

  const worksheet = XLSX.utils.json_to_sheet(rows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Prospectos_EFICIAN');

  const now = new Date();
  const filename = `EFICIAN_CRM_Prospectos_${now.getFullYear()}${(now.getMonth()+1).toString().padStart(2,'0')}${now.getDate().toString().padStart(2,'0')}.xlsx`;
  XLSX.writeFile(workbook, filename);
  showToast('Planilla Excel exportada con éxito');
}

function populateOwnerPricing() {
  document.getElementById('price-kit-3-2').value = KITS_DATABASE['kit-3-2'].price;
  document.getElementById('price-kit-5-5').value = KITS_DATABASE['kit-5-5'].price;
  document.getElementById('price-kit-8-8').value = KITS_DATABASE['kit-8-8'].price;
  document.getElementById('price-kit-12-0').value = KITS_DATABASE['kit-12-0'].price;
  document.getElementById('price-srv-instalacion').value = SERVICES_COST.instalacion;
  document.getElementById('price-srv-sec').value = SERVICES_COST.sec;
}

function saveOwnerPricing(e) {
  if (e) e.preventDefault();
  KITS_DATABASE['kit-3-2'].price = parseInt(document.getElementById('price-kit-3-2').value, 10) || KITS_DATABASE['kit-3-2'].price;
  KITS_DATABASE['kit-5-5'].price = parseInt(document.getElementById('price-kit-5-5').value, 10) || KITS_DATABASE['kit-5-5'].price;
  KITS_DATABASE['kit-8-8'].price = parseInt(document.getElementById('price-kit-8-8').value, 10) || KITS_DATABASE['kit-8-8'].price;
  KITS_DATABASE['kit-12-0'].price = parseInt(document.getElementById('price-kit-12-0').value, 10) || KITS_DATABASE['kit-12-0'].price;
  SERVICES_COST.instalacion = parseInt(document.getElementById('price-srv-instalacion').value, 10) || SERVICES_COST.instalacion;
  SERVICES_COST.sec = parseInt(document.getElementById('price-srv-sec').value, 10) || SERVICES_COST.sec;

  renderShopProducts('all');
  recalculateRecommendation();
  showToast('Tarifas actualizadas en tiempo real');
}

function populateOwnerSyncSettings() {
  const url = localStorage.getItem('efician_owner_webhook') || '';
  const input = document.getElementById('owner-webhook-url');
  if (input) input.value = url;
}

function saveOwnerWebhook(e) {
  if (e) e.preventDefault();
  const input = document.getElementById('owner-webhook-url');
  if (input) {
    localStorage.setItem('efician_owner_webhook', input.value.trim());
    showToast('Endpoint de Google Sheets guardado');
  }
}

// -------------------------------------------------------------------------
// 21. INICIALIZACIÓN Y ATAJOS GLOBALES
// -------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  // Inicializar Router Reactivo con soporte de Historial Nativo
  Router.init();
  updateOwnerBadges();

  // Atajo global para Socios: Alt + S
  window.addEventListener('keydown', (e) => {
    if (e.altKey && (e.key === 's' || e.key === 'S')) {
      e.preventDefault();
      handleOwnerTrigger();
    }
  });
});


