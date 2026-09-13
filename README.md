# EFICIAN // Ingeniería Fotovoltaica Austral

> Plataforma web interactiva de dimensionamiento solar, catálogo de kits fotovoltaicos con carrito de compra, asistente técnico austral y portal directivo CRM a pantalla completa con exportación nativa a Excel (`.xlsx`). Diseñado y calibrado específicamente para la Región de Aysén y la Patagonia chilena.

[![Deploy to GitHub Pages](https://img.shields.io/badge/Deploy-GitHub%20Pages-blue?style=flat&logo=github)](https://vavaro.github.io/efician/)
[![Responsive](https://img.shields.io/badge/Mobile-Optimized-brightgreen?style=flat&logo=safari)](https://vavaro.github.io/efician/)
[![Export to Excel](https://img.shields.io/badge/SheetJS-XLSX%20Export-emerald?style=flat&logo=microsoft-excel)](https://vavaro.github.io/efician/)

---

## 📱 Acceso Rápido y Producción

- **URL de Producción (GitHub Pages):** [https://vavaro.github.io/efician/](https://vavaro.github.io/efician/)
- **Código QR Permanente:** Disponible en `/QR/` para folletería, afiches y stands de ferias en la Patagonia.
- **Acceso Directo a Socios / CRM:** Botón con candado en el Header o atajo global `Alt + S` (PIN inicial sugerido: `2026`).

---

## ⚡ Módulos y Capacidades Principales

### 1. ☀️ Calculadora Solar Austral (Wizard Guiado en 4 Etapas)
- **Etapa 1: Ubicación & Tipo de Propiedad:** Selección de comuna de Aysén (Coyhaique, Puerto Aysén, Chile Chico, Cochrane, Balmaceda, etc.) y perfil de cliente (Residencial / Parcela vs. Pyme / Comercial).
- **Etapa 2: Consumo & Gasto Relacionado:** Entrada sincronizada de consumo eléctrico mensual (kWh) y gasto en boleta (CLP), con tarifas calibradas de Edelaysén.
- **Etapa 3: Orientación & Inclinación Austral:** Selección de orientación norte y pendientes de 30° a 55° calibradas para evacuación natural de nieve en invierno.
- **Etapa 4: Dimensionamiento Satelital & Dossier Técnico:**
  - Mapa satelital de alta resolución (Leaflet + Esri World Imagery).
  - Herramienta de trazado poligonal con **medición de longitud estimada por tramo en metros** y cálculo de área útil ($m^2$).
  - Capas de advertencia técnica sobre caídas de techo, supuestos por defecto si se elige un punto central (40 $m^2$) y validación física de cabida de paneles solares.
  - Balances estacionales (verano vs. invierno patagónico), proyección de flujo de caja a 25 años y expediente técnico imprimible en PDF con envío directo a WhatsApp.

### 2. 🛒 Catálogo Oficial & Shop Solar
- Catálogo interactivo de kits fotovoltaicos: On-Grid 3.2 kW, Híbrido 5.5 kW (con baterías LiFePO4), Híbrido 8.8 kW y Comercial Agro 12 kW.
- Ficha técnica modal con desglose de paneles, inversor y almacenamiento.
- Carrito de compras reactivo con checkout, cálculo de IVA, descuentos por transferencia y emisión de Boleta/Factura electrónica.

### 3. 💬 Asistente Técnico Interactivo (Chat Patagónico)
- Botón flotante en esquina inferior con pulso de estado en vivo.
- Árbol de decisiones rápidas con 6 tópicos de ingeniería austral:
  1. Rendimiento en invierno con baja radiación y nieve.
  2. Ley de Net Billing (Ley 21.118) y venta de excedentes a Edelaysén.
  3. Obligatoriedad de planos y certificación SEC TE4.
  4. Respaldo ante cortes de luz con baterías LiFePO4 (<15 ms).
  5. Instalaciones en parcelas rurales aisladas de la región.
  6. Financiamiento colaborativo y generación comunitaria.
- Campo de consulta libre con reconocimiento de palabras clave y derivación personalizada a ingenieros vía WhatsApp.

### 4. 📊 Portal Directivo de Socios (CRM a Pantalla Completa)
- **Apertura a Pantalla Completa:** Experiencia inmersiva que reemplaza la antigua gaveta lateral, diseñada para máxima legibilidad ejecutiva.
- **Seguridad PIN:** Teclado táctil en pantalla y teclado físico (`0-9`, Enter, Backspace, Escape).
- **Pestaña Métricas:** 5 tarjetas de KPI clave, gráfico de distribución de demanda por comuna de Aysén y segmentación residencial vs. comercial.
- **Pestaña CRM de Prospectos:** Tabla completa con buscador en tiempo real, filtros por estado (`Nuevo`, `Contactado`, `Venta Cerrada`), llamadas directas, WhatsApp pre-redactado y ficha individual.
- **Exportación Nativa a Excel (`.xlsx`):** Generación cliente mediante SheetJS con formateo de columnas y anchos autoajustados (`!cols`).
- **Pestaña Precios & Kits:** Editor interactivo de precios oficiales en CLP con guardado local.
- **Sincronización Cloud:** Soporte de Webhook para Google Sheets (con script serverless incluido en `google_apps_script_efician.js`).

---

## 🛠️ Estructura del Repositorio

```text
├── index.html                           # Aplicación SPA completa monolítica optimizada
├── README.md                            # Documentación general y guía técnica
├── CLAUDE.md                            # Guías de desarrollo y diseño UI/UX
├── EVOLUCION_DISENO_EFICIAN.md          # Registro de decisiones de arquitectura visual
├── google_apps_script_efician.js        # Script Google Apps Script para sincronización Sheets
├── IMAGENES_EFICIAN/                    # Banco fotográfico oficial de faenas en Aysén
├── LOGOS_EFICIAN/                       # Isologotipos oficiales en alta resolución
├── TIPOGRAFIA/                          # Tipografías oficiales Balgin ExtraLight
├── QR/                                  # Assets vectoriales y PNG para escaneo QR
└── stitch_efician_solar_sizing_app/     # Especificaciones UI y DESIGN.md
```

---

## 🚀 Despliegue en GitHub Pages

El proyecto está configurado para ejecutarse de forma 100% estática en el navegador sin dependencias de servidor:

1. Subir cambios a la rama principal:
   ```bash
   git add .
   git commit -m "feat: renovar plataforma efician con calculadora solar, shop, chat y portal de socios"
   git push origin main
   ```
2. El sitio se despliega automáticamente en:
   **[https://vavaro.github.io/efician/](https://vavaro.github.io/efician/)**

---

## 📄 Licencia y Derechos
© EFICIAN — Grupo CR SpA. Todos los derechos reservados.
Patagonia Chilena.
