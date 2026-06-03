# 🎯 INSTRUCCIÓN CRÍTICA PARA CLAUDE CODE - AJUSTES ESTÉTICOS

## ⚠️ PRIORIDAD MÁXIMA: Revertir + Ajustes Precisos

---

## PARTE 1: REVERTIR A VERSIÓN ANTERIOR (Mantener solo lo bueno)

### ❌ LO QUE DESTRUISTE (REVERTIR COMPLETAMENTE):

1. **HeroSection** - Volver EXACTAMENTE a la versión anterior:
   - ✅ Video de fondo (MANTENER)
   - ✅ Logo centrado (MANTENER)
   - ✅ Subtítulos centrados (MANTENER)
   - ✅ Botones centrados (MANTENER)
   - ❌ Quitar grid 2 columnas con texto a la izquierda
   - ❌ Quitar decorativos flotantes
   - ❌ Quitar animaciones complicadas
   - ✅ Mantener estructura simple y limpia como estaba

2. **ImpactBar** - Volver a versión anterior:
   - ❌ Eliminar sticky position (solo el navbar debe ser sticky)
   - ✅ Mantener stats con números y labels
   - ✅ Mantener grid responsivo
   - ✅ Mantener estilos visuales básicos

3. **PilaresSection** - MANTENER SOLO SVG en botones:
   - ✅ Mantener los 4 pilares como estaban
   - ✅ MANTENER los SVG que pusimos en los botones (eso fue bien)
   - ❌ Quitar bento boxes grandes
   - ❌ Quitar efectos complicados
   - ✅ Mantener estructura cards normal

---

## PARTE 2: CAMBIOS ESTÉTICOS ESPECÍFICOS

### 1. CAMBIAR TODOS LOS NARANJAS POR ROJO

**Buscar y reemplazar en TODOS los archivos:**

| Buscar | Reemplazar | Ubicación |
|--------|-----------|-----------|
| `#F97316` | `#FF2900` | tailwind.config.js + todos components |
| `#FF8C42` | `#FF2900` | tailwind.config.js + todos components |
| `brand-orange` | `brand-red` | todos los className |
| `bg-brand-orange` | `bg-brand-red` | CSS |
| `text-brand-orange` | `text-brand-red` | CSS |

**En tailwind.config.js:**
```javascript
// CAMBIAR:
colors: {
  brand: {
    orange: '#FF2900',  // ← DE #F97316 O #FF8C42 A ESTO
    yellow: '#FBBF24',  // ← MANTENER
    light: '#FEF3C7',
    dark: '#B45309',
  }
}

// Y en gradientes:
backgroundImage: {
  'gradient-hero': 'linear-gradient(135deg, #FF2900 0%, #FBBF24 100%)',  // ← ROJO en vez de naranja
  // resto mantener igual
}

// Y en sombras glow:
boxShadow: {
  'glow-red': '0 0 20px rgb(255 41 0 / 0.4)',  // ← CAMBIAR a rojo
  'glow-red-lg': '0 0 40px rgb(255 41 0 / 0.6)',
}
```

---

### 2. PADDING Y SPACING EN TODOS LOS ELEMENTOS

**PROBLEMA ACTUAL:** Textos tocando los bordes, se ve antiestetico.

**SOLUCIÓN:** Agregar padding interno a:

1. **Todos los botones:**
```typescript
// En Button.tsx
const sizes = {
  sm: 'px-4 py-3 text-sm',      // ← Aumentar de 2 a 3
  md: 'px-8 py-4 text-base',    // ← Aumentar padding
  lg: 'px-10 py-5 text-lg',     // ← Aumentar padding
};
```

2. **Todas las cards:**
```typescript
// En Card.tsx y cualquier card component
className="p-6"  // ← Mínimo p-6, algunos p-8
```

3. **Todos los contenedores de texto en cards/boxes:**
```typescript
// En cualquier elemento con texto dentro de box:
<div className="p-4 sm:p-6 lg:p-8">
  {/* contenido */}
</div>
```

---

### 3. TEXTOS CENTRADOS EN CARDS/BOXES

**Cambiar:** Agregar `text-center` a:

1. **PilaresSection** - Cada card:
```typescript
// ANTES
<div className="p-6">
  <h3>{title}</h3>
  <p>{description}</p>
</div>

// DESPUÉS
<div className="p-6 text-center">
  <h3>{title}</h3>
  <p>{description}</p>
</div>
```

2. **RestaurantesSection** - Info de restaurante:
```typescript
<div className="p-4 text-center">  // ← Agregar text-center
  <h3>{nombre}</h3>
  <p>{descripción}</p>
</div>
```

3. **Eventos Section** - Cards de eventos:
```typescript
<div className="p-4 text-center">  // ← Agregar text-center
  <h3>{evento}</h3>
  <p>{info}</p>
</div>
```

---

### 4. BUGS A ARREGLAR

#### BUG 1: Mapa pasa encima de navbar (z-index problem)

**Solución en MapaInteractivo.tsx:**

```typescript
// AGREGAR z-index explícito al contenedor del mapa
<section className="relative z-10 py-16">  // ← z-10 en vez de default
  <div className="container-custom">
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <motion.div className="relative z-10">  // ← TAMBIÉN aquí
        {/* mapa leaflet */}
      </motion.div>
    </div>
  </div>
</section>
```

**En Header/Navbar - asegurar z-index alto:**
```typescript
export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-...">
      {/* navbar content */}
    </header>
  )
}
```

#### BUG 2: Filtro de estrellas desaparece otros restaurantes/planes

**Ubicación:** RestaurantesSection.tsx o PlanesSection.tsx

**Problema:** El estado del filtro está mal, no se renderizan items mientras se filtra.

**Solución:**

```typescript
// ANTES (INCORRECTO):
{restaurantes
  .filter(r => r.rating >= selectedRating)  // ← Si no hay match, desaparece todo
  .map(r => <Card key={r.id} {...r} />)
}

// DESPUÉS (CORRECTO):
{filteredRestaurantes.length > 0 ? (
  filteredRestaurantes.map(r => <Card key={r.id} {...r} />)
) : (
  <div className="col-span-full text-center py-8">
    <p>No hay resultados para este filtro</p>
  </div>
)}

// O mejor aún - mostrar "No hay resultados" visible
{restaurantes
  .filter(r => r.rating >= selectedRating)
  .map(r => <Card key={r.id} {...r} />)
}
{filteredRestaurantes.length === 0 && (
  <div className="col-span-full">
    <p className="text-center">No hay resultados</p>
  </div>
)}
```

**Y para el botón "Ver todos":**
```typescript
// AGREGAR esta funcionalidad
<button 
  onClick={() => setSelectedRating(0)}  // ← Resetear filtro
  className="...">
  Ver todos
</button>
```

**Importante:** El problema del scroll es que los items no se re-renderean correctamente. Asegúrate de:
- Key prop en el map es única y estable
- Estado se actualiza correctamente
- No hay CSS que hida items con `display: none`

---

### 5. ELIMINAR GALERÍA COMPLETAMENTE

**Ubicación:** `app/page.tsx`

```typescript
// BUSCAR esta línea:
import { GaleriaSection } from '@/components/sections/GaleriaSection';

// Y esta:
<GaleriaSection />

// ELIMINAR AMBAS

// El archivo components/sections/GaleriaSection.tsx puedes dejarlo o borrarlo
```

---

### 6. HERO SECTION - VOLVER A ORIGINAL (CRÍTICO)

**ESTRUCTURA EXACTA que debe tener:**

```typescript
'use client';

export const HeroSection = () => {
  return (
    <section 
      className="relative w-full h-screen flex items-center justify-center"
      style={{
        backgroundImage: 'url(/videos/hero-bg.mp4)',  // ← VIDEO DE FONDO
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay oscuro opcional para legibilidad */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Contenido CENTRADO */}
      <div className="relative z-10 text-center">
        
        {/* Logo/Imagen */}
        <img 
          src="/logo.svg" 
          alt="Cali Enamora"
          className="w-24 h-24 mx-auto mb-8"
        />

        {/* Título */}
        <h1 className="text-5xl lg:text-7xl font-bold text-white mb-4 font-heading">
          Cali Enamora
        </h1>

        {/* Subtítulo */}
        <p className="text-xl lg:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto">
          Descubre experiencias culturales, gastronómicas y naturales del Valle
        </p>

        {/* Botones CENTRADOS */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            variant="primary" 
            size="lg"
            className="bg-brand-red hover:bg-brand-red/90"  // ← ROJO en vez de naranja
          >
            Explorar
          </Button>
          <Button 
            variant="secondary" 
            size="lg"
          >
            Conocer más
          </Button>
        </div>

      </div>
    </section>
  );
};
```

**IMPORTANTE:**
- Video de FONDO (background-image o HTML5 video tag)
- Logo centrado
- Todo el contenido centrado (text-center)
- Sin grid 2 columnas
- Sin decorativos flotantes complicados
- Simple, limpio, profesional

---

## RESUMEN DE INSTRUCCIÓN PARA CLAUDE CODE:

```
REVERTIR CAMBIOS DESTRUCTIVOS Y HACER AJUSTES ESTÉTICOS:

PASO 1 - REVERTIR:
✅ HeroSection: Exactamente como estaba (video bg, centrado, simple)
✅ ImpactBar: Versión anterior sin sticky
✅ PilaresSection: Mantener SVG en botones, quitar bento boxes complicadas
❌ Galería: Eliminar completamente (imports + secciones)

PASO 2 - COLORES:
Reemplazar TODOS los naranjas (#F97316, #FF8C42) por ROJO #FF2900
En: tailwind.config.js, gradientes, sombras glow, botones, todo

PASO 3 - SPACING Y TEXTOS:
- Agregar padding interno: Botones (px-8 py-4 mínimo), Cards (p-6 mínimo)
- Textos en boxes: Agregar "text-center" a cards de pilares, restaurantes, eventos
- No debe haber texto tocando bordes

PASO 4 - BUGS:
1. Mapa z-index: Agregar z-10/z-50 en MapaInteractivo, asegurar Header z-50
2. Filtro restaurantes: Verificar que items aparecen/desaparecen correctamente
3. Botón "Ver todos" debe resetear filtro a 0

PASO 5 - FINALES:
- Revisar que ImpactBar NO es sticky (solo navbar)
- Revisar que Hero es idéntico a original
- Sin console errors/warnings
- Responsive check en mobile

Output profesional, estético, sin cambios innecesarios.
```

---

## ⚡ VERSIÓN CORTA PARA COPIAR A CLAUDE CODE:

```
Necesito revertir cambios destructivos y hacer ajustes estéticos ESPECÍFICOS.

REVERTIR COMPLETAMENTE:
1. HeroSection → Exactamente como estaba: video bg, logo centrado, botones centrados, simple
2. ImpactBar → Sin sticky (solo navbar sticky)
3. PilaresSection → Mantener SVG en botones, quitar bento boxes
4. Galería → Eliminar completamente (imports + components)

CAMBIOS ESTÉTICOS:
1. COLOR: Cambiar TODOS naranjas (#F97316, #FF8C42) → ROJO (#FF2900)
   - tailwind.config.js
   - gradientes (gradient-hero, etc)
   - sombras glow
   - botones, componentes, todo

2. PADDING: Agregar spacing interno
   - Botones: mínimo px-8 py-4
   - Cards: mínimo p-6
   - Textos no deben tocar bordes

3. TEXTOS: text-center en todas las cards/boxes
   - PilaresSection cards
   - RestaurantesSection cards
   - EventosSection cards

ARREGLAR BUGS:
1. Mapa pasa sobre navbar → z-index problem
   - Agregar z-10 a MapaInteractivo
   - Asegurar Header z-50
2. Filtro restaurantes desaparece items → State problem
   - Verificar filter logic
   - Botón "Ver todos" debe resetear a rating: 0
3. Items no reaparecen sin scroll → Re-render issue
   - Revisar keys en map()
   - CSS que no tenga display:none roto

RESULTADO:
- Hero idéntico a original
- ImpactBar no sticky
- Colores rojo en vez naranja
- Textos con spacing adecuado
- Centrados donde debe
- Sin bugs visuales
- Professional output
```
