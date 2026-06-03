# 🎨 DESIGN SYSTEM - CALI ENAMORA

## Visión General
Rediseño completo de la plataforma con enfoque en modernidad, profesionalismo y esencia cultural del Valle del Cauca. Implementación de bento boxes, motions fluid, scroll effects y una experiencia visual premium que posicione Cali Enamora como referente digital de turismo regional.

---

## 📐 1. PALETA DE COLORES MODERNIZADA

### Colores Primarios (Nueva Paleta)
```
Naranja Principal:        #F97316  → Ajustar a #FF8C42 (más cálido, cultural)
Amarillo Secundario:      #FBBF24  → Mantener
Texto Oscuro Premium:     #1A1A2E  (en lugar de #111827)
Fondo Base:               #0A1636  → Mantener (excelente)
Blanco Trabajo:           #F8F9FA  → Para tarjetas
```

### Colores de Pilares (Mejorados - Mayor Contraste)
```
CULTURA
  - Primary:     #8B5CF6  (más vibrante que #7C3AED)
  - Secondary:   #EDE9FE
  - Dark:        #6D28D9
  - Light:       #F5F3FF

NATURALEZA
  - Primary:     #10B981  (más saturado)
  - Secondary:   #D1FAE5
  - Dark:        #047857
  - Light:       #ECFDF5

GASTRONOMÍA
  - Primary:     #EF4444  (más energético)
  - Secondary:   #FEE2E2
  - Dark:        #DC2626
  - Light:       #FEF2F2

BIENESTAR
  - Primary:     #06B6D4  (cyan más vibrante)
  - Secondary:   #CFFAFE
  - Dark:        #0891B2
  - Light:       #ECFDFD
```

### Neutrales Premium
```
Neutral-50:   #F9FAFB
Neutral-100:  #F3F4F6
Neutral-200:  #E5E7EB
Neutral-300:  #D1D5DB
Neutral-400:  #9CA3AF
Neutral-500:  #6B7280
Neutral-600:  #4B5563
Neutral-700:  #374151
Neutral-800:  #1F2937
Neutral-900:  #0A1636
```

### Gradientes Contextuales (Nuevos)
```
hero-gradient:           linear-gradient(135deg, #FF8C42 0%, #FBBF24 100%)
culture-gradient:        linear-gradient(135deg, #8B5CF6 0%, #EDE9FE 100%)
nature-gradient:         linear-gradient(135deg, #10B981 0%, #ECFDF5 100%)
food-gradient:           linear-gradient(135deg, #EF4444 0%, #FEF2F2 100%)
wellness-gradient:       linear-gradient(135deg, #06B6D4 0%, #ECFDFD 100%)
premium-dark-gradient:   linear-gradient(135deg, #1A1A2E 0%, #2D3561 100%)
shimmer-gradient:        linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)
```

---

## 🔤 2. SISTEMA DE TIPOGRAFÍA

### Fuentes Recomendadas (GoogleFonts)
```
Headings:      'Playfair Display' (serif elegante para títulos, cultural)
Body:          'Inter' (ya incluida, perfecta)
Accent:        'Poppins' (moderna, secundaria para destacados)
Mono:          'JetBrains Mono' (para datos, especificaciones)
```

### Escala Tipográfica (Actualizada)
```
Display XL:    48px / 56px (hero titles)
Display L:     40px / 48px (section titles)
Display M:     32px / 40px (subsections)
Heading 1:     28px / 36px (principales)
Heading 2:     24px / 32px (secundarios)
Heading 3:     20px / 28px (tertiary)
Body Large:    18px / 28px (destacados)
Body:          16px / 24px (default)
Body Small:    14px / 22px (secondary)
Caption:       12px / 18px (metadata)
Label:         11px / 16px (buttons, tags)
```

### Font Weights
```
Light:    300 (descripciones, secondary text)
Regular:  400 (body)
Medium:   500 (emphasized text, small titles)
Semibold: 600 (headings secondary)
Bold:     700 (headings primary)
Black:    900 (display, hero)
```

### Line Heights
```
Tight:    1.2   (headings)
Normal:   1.5   (body)
Relaxed:  1.75  (large text)
Loose:    2     (descriptions, long form)
```

---

## 🎨 3. COMPONENTES EN BENTO BOXES

### 3.1 HERO SECTION (Full Width + Horizontal Expansion)
```
Layout:
  - Altura: 100vh (viewport height)
  - Fondo: Gradient hero + overlay pattern
  - Contenido: Centrado, máx 1200px contenedor
  - Posicionamiento: Grid 2 columnas (50/50)
    * Izquierda: Texto + CTA
    * Derecha: Imagen/Video + decorativo

Elementos:
  - Título: Display XL, Playfair, bold, color gradient (naranja→amarillo)
  - Subtítulo: Body Large, neutral-400, con acento de color
  - CTA Buttons: 2 botones principales
    * Primary: Naranja #FF8C42, hover → brillo glow
    * Secondary: Glass effect translúcido
  - Decorativo: Elementos flotantes, SVG animados

Animaciones:
  - Fade in + slide up (título) - 0.6s ease-out
  - Fade in + slide up (subtítulo) - 0.8s ease-out delay
  - Float animation (elementos decorativos) - 3s ease-in-out
  - Gradient shift en hover de botones
  - Glow pulse en CTA principal
```

### 3.2 IMPACT BAR (Horizontal Statistics Strip)
```
Layout:
  - Altura: 140px
  - Background: Gradient dark premium (1A1A2E → 2D3561)
  - Padding: 40px horizontal, 30px vertical
  - Scroll Effect: Sticky durante scroll (aparece debajo hero)

Componentes:
  - 4 Items en grid horizontal
  - Cada item:
    * Número: Display L, gradient text (color del pilar)
    * Texto: Body, neutral-300
    * Ícono: 32px, color pilar
    * Separador: Línea vertical neutral-600

Interactividad:
  - Hover: Lift effect (translateY -5px)
  - Number: Contador animado (0 → valor final)
    * Duración: 2s al entrar en viewport
    * Easing: ease-out-quart

Scroll Effects:
  - Parallax leve (moveY 10px en scroll)
  - Sticky position hasta final de página
```

### 3.3 PILARES SECTION (4 Bento Cards)
```
Layout:
  - Grid: 2x2 responsive (4 columnas en desktop, 1 en mobile)
  - Gap: 24px
  - Padding: 60px horizontal, 80px vertical
  - Background: Linear pattern sutilmente visible

Cards Individuales:
  Tamaño: 100% ancho de columna
  Altura: 400px (proporcional)
  Background: Gradient del pilar + overlay 90%
  Border: 1px de color pilar con opacity 0.3
  Border Radius: 20px
  Box Shadow: Glow effect del color pilar

Contenido:
  - Ícono: 64px, top right, opacity 0.2
  - Título: Heading 1, color pilar, bold
  - Descripción: Body, neutral-200
  - CTA Link: "Explorar" + ícono arrow
  - Mini stats: 3 pequeños datos abajo

Animaciones:
  - Entrance: Scale in + fade (0.6s ease-out)
    * Staggered: 0.1s delay entre cards
  - Hover:
    * Scale: 1 → 1.05
    * Shadow: Glow aumenta
    * Background: Overlay disminuye a 85%
    * Ícono: Rotate + scaleUp
    * Duración: 0.3s ease-out-quart
  - Border: Animación de gradiente (shimmer) en hover
```

### 3.4 RUTAS SECTION (Horizontal Scroll + Cards)
```
Layout:
  - Scroll horizontal (overflow-x auto, scrollbar hide)
  - Padding: 80px horizontal
  - Height: auto (content driven)
  - Header: Título + descripción encima

Tarjetas de Ruta:
  Tamaño: 340px ancho x 420px alto (fixed)
  Background: 
    * Imagen arriba (60%)
    * Gradient overlay (bottom to top)
    * Color sólido abajo (30%)
  
  Estructura Interna:
    - Imagen: Aspect ratio 16/9, object-cover
    - Overlay: linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.8))
    - Contenido (absoluto, abajo):
      * Tag de categoría (pilar)
      * Nombre ruta: Heading 2
      * Distancia + Duración: Body Small
      * Rating: Estrellas + número
    - Botón CTA: "Descubrir" (glassmorphism)

Scroll Behavior:
  - Snap scroll (snap-align: start)
  - Smooth scroll behavior
  - Scroll indicators (dots pequeños)

Animaciones:
  - Entrance: Slide left fade (al cargar)
  - Hover:
    * Image zoom: scale 1.1
    * Shadow aumenta
    * Overlay opacidad aumenta
    * CTA button: Aparece/destaca más
  - On Scroll: Parallax suave en imagen
```

### 3.5 MAPA SECTION (Interactive Map + Info)
```
Layout:
  - Grid 2 columnas (60/40 o 70/30)
  - Altura: 500px
  - Gap: 40px
  - Background: Neutral-50

Columna Izquierda (Mapa):
  - Leaflet map fullheight
  - Bordes: 16px border-radius
  - Shadow: Large glow effect
  - Controls: Minimal, dark themed
  - Zoom buttons: Top right

Columna Derecha (Info):
  - Título: Heading 1
  - Descripción: Body + icono
  - 3 Cards mini:
    * Ubicación destacada
    * Horario
    * Información de contacto
  - CTA: "Ver todas las rutas"

Interactividad:
  - Click en pin del mapa → Info actualiza
  - Hover en card → Pin resalta en mapa
  - Smooth transitions 0.3s
```

### 3.6 EVENTOS SECTION (Timeline + Grid Dual)
```
Layout:
  - Dos vistas: Timeline vertical (desktop) + Grid compacta (móvil)
  - Padding: 80px
  - Background: Gradient dark premium

Sección Próximos Eventos:
  Grid: 3 columnas (responsivo a 2, 1)
  Cards de evento:
    - Tamaño: 340x280px
    - Background: Glass effect (white/10 + backdrop-blur)
    - Border: 1px white/20
    - Radius: 12px
    
    Contenido:
      * Fecha destacada (Heading 2, naranja)
      * Título evento (Heading 3)
      * Descripción corta (Body Small)
      * Ubicación + horario (Label)
      * CTA: "Más info"
    
    Animación:
      - Entrance: Slide up + fade (0.6s)
      - Hover:
        * Scale 1.05
        * Glass blur aumenta
        * Shadow aumenta
        * Border glow

Sección Eventos Recurrentes:
  Layout horizontal scroll o bento grid 2x2
  Cards más pequeños (280x200)
  Badge "Recurrente"
```

### 3.7 GASTRONOMÍA (Restaurantes)
```
Layout:
  - Carrusel/Grid responsivo
  - 3 columnas (responsivo a 2, 1)
  - Cards: 300x350px

Estructura Card:
  - Imagen 60%
  - Info 40%:
    * Nombre: Heading 3
    * Categoría: Label con badge color
    * Rating + reviews: Estrellas
    * Ubicación: Body Small
    * Precio range: Label
    * CTA: "Ver menú / Reservar"

Animaciones:
  - Hover:
    * Image zoom + brightness increase
    * Card lift (shadow aumenta)
    * Info slide up suave
    * Rating destaca

Scroll Effects:
  - Parallax imagen al scroll
```

### 3.8 GALERÍA (Visual Showcase)
```
Layout:
  - Masonry grid responsivo
  - Variación de tamaños:
    * 6 items: 1 grande (2x2), 5 normales (1x1)
  - Gap: 16px
  - Padding: 80px

Items:
  - Border Radius: 12px
  - Overflow: hidden
  - Box Shadow: md
  
  Estructura:
    * Imagen fullcover
    * Overlay gradient (0% opacity → hover 60%)
    * Texto centrado en overlay:
      - Título
      - Categoría tag
      - Ícono + "Ver más"

Animaciones:
  - Entrance: Scale in (0.5s ease-out)
  - Hover:
    * Overlay aparece smooth (0.3s)
    * Image zoom (scale 1.1)
    * Ícono rotate + scale
  - Click: Lightbox modal
```

### 3.9 TESTIMONIOS (Carousel)
```
Layout:
  - Altura: 400px
  - Background: Gradient pilar (variable según slide)
  - Padding: 80px
  - Centered content

Estructura:
  Grid 3 visibles (center > left > right staggered)
  
  Card Activo (Centro):
    - Tamaño: 500x300px
    - Scale: 1.1
    - Opacity: 1
    - Cards laterales: 0.8 escala, 0.6 opacity
  
  Contenido Card:
    * Avatar: 80px circular, border
    * Nombre: Heading 2
    * Cargo: Label
    * Testimonio: Body Large italic
    * Rating: Estrellas
    * Quote mark decorativo (grande, opacity 0.1)

Animaciones:
  - Slide automático (5s interval)
  - Transición suave (0.6s cubic-bezier)
  - Click en nav: Cambio smooth
  - Hover: Pausa automático
```

### 3.10 ALIADOS (Logo Grid + Categorías)
```
Layout:
  - Tabs por categoría (Gobiernos, Empresas, ONGs, etc)
  - Grid: 4-5 columnas responsivo
  - Card por aliado: 180x140px

Cards:
  - Background: white/5 glass
  - Border: 1px white/10
  - Contenido: Logo centered
  - Hover:
    * Background: white/10
    * Scale: 1.05
    * Nombre aparece (overlay)

Animaciones:
  - Entrance: Scale in staggered
  - Hover: Glow effect del color pilar
```

### 3.11 INVERSORES (Call-to-Action Section)
```
Layout:
  - Full width
  - Altura: 500px
  - Background: Gradient hero (naranja → oscuro)
  - Overlay pattern

Content:
  - Título Grande: Display L
  - Descripción: Body Large
  - 3 Cards Beneficios:
    * Ícono + Descripción
    * Hover: Glow + lift
  - CTA Principal: Botón grande
  - Form inline o modal popup

Animaciones:
  - Parallax en scroll
  - Glow pulse en CTA
  - Contador de "Empresas que confían"
```

### 3.12 CONTACTO (Form Section)
```
Layout:
  - Grid 2 columnas o full width responsive
  - Altura: 600px
  - Background: Neutral-50

Columna Izquierda (Info):
  - Título: Heading 1
  - Descripción
  - 3 Cards de contacto:
    * Email + ícono
    * Teléfono + ícono
    * Ubicación + ícono
  - Social links

Columna Derecha (Form):
  - Inputs: Glass style, border 1px, radius 8px
  - Labels: Pequeños, uppercase
  - Validation: Real-time feedback
  - CTA: Botón grande naranja
  - Success message: Toast notification

Animaciones:
  - Focus input: Glow border color
  - Hover button: Shift gradient + glow
  - Submit: Loading spinner, success fade-in
```

---

## ✨ 4. EFECTOS Y ANIMACIONES

### 4.1 Transiciones Globales
```
Fast:       150ms
Normal:     300ms
Slow:       500ms
Very Slow:  1000ms

Timing Functions:
- ease-out-circ:   cubic-bezier(0.075, 0.82, 0.165, 1)
- ease-out-quart:  cubic-bezier(0.165, 0.84, 0.44, 1)
- ease-out-quint:  cubic-bezier(0.23, 1, 0.320, 1)
- ease-out-expo:   cubic-bezier(0.19, 1, 0.22, 1)
```

### 4.2 Scroll Effects (Usar ScrollTrigger/Framer Motion)
```
1. Parallax Hero:
   - Fondo: moveY = scrollY * 0.5
   - Contenido: moveY = scrollY * 0.3
   - Overlay: Opacity = 0.3 → 0.7 según scroll

2. Fade In On Scroll:
   - Opacity: 0 → 1
   - Trigger: cuando 30% visible
   - Duration: 0.8s ease-out

3. Slide In On Scroll:
   - Elementos alternados (left ↔ right)
   - TranslateX: ±50px → 0
   - Staggered: 0.1s entre elementos

4. Scale Up On Scroll:
   - Scale: 0.8 → 1
   - Opacity: 0 → 1
   - Trigger: 20% visible

5. Reveal Text:
   - Clip-path animation
   - De arriba a abajo
   - Sincronizado con scroll

6. Counter Animation:
   - Números suben de 0 al valor
   - Trigger: Al entrar en viewport
   - Easing: ease-out-quart
   - Duration: 2s
```

### 4.3 Hover Effects
```
Botones:
  - Scale: 1 → 1.05
  - Shadow: sm → lg
  - Brightness: 100% → 110%
  - Duration: 0.2s ease-out

Cards:
  - Scale: 1 → 1.05
  - translateY: 0 → -8px
  - Shadow: md → xl + glow
  - Duration: 0.3s ease-out-quart

Links:
  - Color change smooth
  - Underline appear/expand
  - Duration: 0.2s

Gradients:
  - Gradient shift (hue rotation)
  - Duration: 0.4s
```

### 4.4 Entrance Animations
```
Fade In:
  opacity: 0 → 1
  duration: 0.5s ease-out

Slide Up:
  transform: translateY(30px) → 0
  opacity: 0 → 1
  duration: 0.6s ease-out

Slide Left:
  transform: translateX(30px) → 0
  opacity: 0 → 1
  duration: 0.6s ease-out

Scale In:
  transform: scale(0.8) → 1
  opacity: 0 → 1
  duration: 0.5s ease-out

Bounce In:
  Similar a scale pero con bounce easing
  duration: 0.7s cubic-bezier(0.68, -0.55, 0.265, 1.55)

Staggered (para listas):
  Delay = index * 0.1s
  Crea efecto en cascada
```

### 4.5 Continuous Animations
```
Float:
  transform: translateY(0 → -10px → 0)
  duration: 3s ease-in-out infinite
  aplica a: elementos decorativos

Pulse:
  opacity: 1 → 0.5 → 1
  duration: 3s ease-in-out infinite
  aplica a: badges, indicators

Shimmer:
  background-position: -1000px → 1000px
  duration: 2s linear infinite
  aplica a: skeleton loaders, highlights

Glow Pulse:
  box-shadow: 0 0 20px → 0 0 40px → 0 0 20px
  duration: 2s ease-in-out infinite
  aplica a: CTA buttons, featured items

Spin Slow:
  transform: rotate(0 → 360deg)
  duration: 3s linear infinite
  aplica a: loading spinners, decorativos
```

### 4.6 Exit Animations
```
Fade Out:
  opacity: 1 → 0
  duration: 0.4s ease-in

Slide Down:
  transform: translateY(0) → translateY(30px)
  opacity: 1 → 0
  duration: 0.5s ease-in

Scale Out:
  transform: scale(1) → scale(0.8)
  opacity: 1 → 0
  duration: 0.4s ease-in
```

---

## 📱 5. LAYOUT Y RESPONSIVE

### Breakpoints
```
Mobile:    < 640px
Tablet:    640px - 1024px
Desktop:   1024px - 1536px
Wide:      > 1536px
```

### Container Widths
```
Mobile:    100% - 20px (padding)
Tablet:    90% - máx 750px
Desktop:   85% - máx 1200px
Wide:      máx 1400px
```

### Padding Responsivo
```
Mobile:    16px horizontal
Tablet:    32px horizontal
Desktop:   60px horizontal
Wide:      80px horizontal
```

### Altura Secciones
```
Hero:      100vh (desktop), 80vh (tablet), 60vh (mobile)
Sections:  80px (desktop), 60px (tablet), 40px (mobile)
Cards:     Aspect ratio > fixed height
```

### Tipografía Responsiva
```
Display XL: 48px (desktop) → 32px (mobile)
Display L:  40px (desktop) → 28px (mobile)
Heading 1:  28px (desktop) → 20px (mobile)
Heading 2:  24px (desktop) → 18px (mobile)
Body:       16px (desktop y mobile, usar line-height para legibilidad)
```

---

## 🎭 6. GLASSMORPHISM & MODERN EFFECTS

### Glass Style Cards
```
Background: rgba(255, 255, 255, 0.05) o rgba(0, 0, 0, 0.05)
Backdrop Filter: blur(8px) a blur(16px)
Border: 1px rgba(255, 255, 255, 0.2)
Box Shadow: 0 8px 32px rgba(0, 0, 0, 0.1)
Border Radius: 12px a 20px
```

### Gradient Text
```
background: linear-gradient(135deg, color1, color2)
background-clip: text
-webkit-background-clip: text
-webkit-text-fill-color: transparent

Colores:
- Brand: #FF8C42 → #FBBF24
- Cultura: #8B5CF6 → #EDE9FE
- Naturaleza: #10B981 → #ECFDF5
- Gastronomía: #EF4444 → #FEE2E2
- Bienestar: #06B6D4 → #ECFDFD
```

### Glow Effects
```
box-shadow: 0 0 20px rgba(color, 0.4)
On hover: 0 0 40px rgba(color, 0.6)

Colors:
- Orange: rgba(255, 140, 66, ...)
- Purple: rgba(139, 92, 246, ...)
- Green: rgba(16, 185, 129, ...)
- Red: rgba(239, 68, 68, ...)
- Cyan: rgba(6, 182, 212, ...)
```

### Backdrop Blur
```
Niveles:
xs: 2px
sm: 4px
md: 8px
lg: 12px
xl: 16px
2xl: 24px

Uso:
- Modales/overlays: lg (16px)
- Card backgrounds: md (8px)
- Navbar: sm (4px)
```

---

## 🔧 7. GUÍA DE IMPLEMENTACIÓN

### Estructura de Componentes Recomendada
```
/components
  /layout
    Header.tsx (navbar + hero styling mejorado)
    Footer.tsx
  
  /sections
    HeroSection.tsx (con animations)
    ImpactBar.tsx (con counter animations)
    PilaresSection.tsx (bento cards con hover)
    RutasSection.tsx (horizontal scroll cards)
    MapaSection.tsx (map + info cards)
    EventosSection.tsx (timeline + grid)
    RestaurantesSection.tsx (carousel/grid)
    GaleriaSection.tsx (masonry grid)
    TestimoniosSection.tsx (carousel)
    AliadosSection.tsx (grid + tabs)
    InversoresSection.tsx (CTA section)
    ContactoSection.tsx (form + info)
  
  /ui
    Button.tsx (primary, secondary, glass variants)
    Card.tsx (base, glass, gradient variants)
    Badge.tsx (para categorías)
    GradientText.tsx (para títulos)
    ScrollReveal.tsx (wrapper para scroll animations)
    SectionContainer.tsx (padding + max-width standardizado)
```

### Configuración Tailwind Actualizada
```javascript
// En tailwind.config.js, actualizar:

colors: {
  brand: {
    orange: '#FF8C42',  // Cambiar de #F97316
    yellow: '#FBBF24',
    // ...
  },
  // Actualizar pilares con nuevos valores
}

// Agregar nuevos gradientes
backgroundImage: {
  'gradient-hero': 'linear-gradient(135deg, #FF8C42 0%, #FBBF24 100%)',
  // ... resto de gradientes
}

// Mantener todas las animaciones y efectos
animation: {
  // ... mantener existentes
  'shimmer': 'shimmer 2s infinite',
  'glow-pulse': 'glowPulse 2s ease-in-out infinite',
}
```

### Framer Motion Setup
```typescript
// Import en componentes
import { motion } from 'framer-motion';

// Variantes reutilizables
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: 'easeOut' }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Uso en componentes
<motion.div
  initial="initial"
  whileInView="animate"
  viewport={{ once: true, amount: 0.3 }}
  variants={fadeInUp}
>
  Contenido
</motion.div>
```

### Scroll Effects Library
```
Opciones:
1. Framer Motion + useScroll hook (built-in, simplest)
2. Intersection Observer API (vanilla JS, performante)
3. React Hook: useInView (custom, ligero)

Recomendación: Usar Framer Motion useScroll para parallax,
IntersectionObserver para fade-in/scale-in on scroll
```

---

## 🎯 8. PRIORIDADES DE IMPLEMENTACIÓN

### Fase 1 - MVP Visual (Priority)
- [ ] Actualizar colores en tailwind.config.js
- [ ] Rediseñar Hero Section + ImpactBar
- [ ] Diseñar Pilares en Bento Cards
- [ ] Implementar Rutas en horizontal scroll
- [ ] Agregar scroll animations básicas

### Fase 2 - Pulido Visual
- [ ] Galerías con masonry + lightbox
- [ ] Testimonios carousel
- [ ] Efectos avanzados de scroll (parallax, reveal)
- [ ] Glassmorphism en elementos
- [ ] Animaciones entrance/exit

### Fase 3 - Interactividad
- [ ] Mapa interactivo funcional
- [ ] Eventos con filtros
- [ ] Formularios con validación
- [ ] Modales y popups
- [ ] Menu responsivo mejorado

---

## 📊 9. CHECKLIST FINAL

```
Diseño:
- [x] Paleta de colores definida
- [x] Tipografía sistematizada
- [x] Componentes especificados
- [x] Efectos documentados
- [x] Responsive definido

Implementación:
- [ ] Tailwind config actualizado
- [ ] Componentes base creados
- [ ] Hero rediseñado
- [ ] ImpactBar con animaciones
- [ ] Pilares en bento boxes
- [ ] Rutas con scroll horizontal
- [ ] Mapa integrado
- [ ] Eventos con grid/timeline
- [ ] Gastronomía cards
- [ ] Galería masonry
- [ ] Testimonios carousel
- [ ] Aliados grid
- [ ] Inversores CTA
- [ ] Contacto form
- [ ] Scroll animations
- [ ] Responsivo testeado
- [ ] Performance optimizado
```

---

## 📞 NOTAS IMPORTANTES

1. **Colores**: Los nuevos valores (#FF8C42, #8B5CF6, etc) deben reemplazar los actuales en tailwind.config.js
2. **Animaciones**: Usar Framer Motion para entrance/exit, CSS/Tailwind para continuous animations
3. **Performance**: Lazy load imágenes, usar `will-change` en elementos con animaciones pesadas
4. **Accessibility**: Mantener contraste WCAG AA mínimo, agregar `aria-labels` en elementos interactivos
5. **Testing**: Validar en dispositivos reales (mobile, tablet, desktop) y navegadores múltiples

---

**Documento creado**: 2 de junio, 2026
**Versión**: 1.0 - MVP
**Siguiente paso**: Implementación en Claude Code