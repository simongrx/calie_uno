# 🎯 INSTRUCCIÓN PARA CLAUDE CODE - Reducir Espaciado Filtros/Contenido

## PROBLEMA:

Entre los botones de filtro y el contenido debajo hay DEMASIADO espacio vertical. Se ve raro y desproporcionado.

**Causa:** `mb-20 sm:mb-24` en el div de botones (80px/96px) + divs separadores innecesarios.

---

## SOLUCIÓN:

### Buscar y reemplazar en TODAS las secciones:

1. **Cambiar el margin-bottom de los botones filtro:**
   - Buscar: `mb-20 sm:mb-24` (en divs que contienen botones de filtro)
   - Reemplazar por: `mb-8 sm:mb-10`

2. **Eliminar divs separadores innecesarios:**
   - Buscar: `<div class="h-8 sm:h-10"></div>`
   - Eliminar (son spacers que no sirven)
   - También eliminar: `<div class="h-6 sm:h-8"></div>` si existen

3. **Aplicar a secciones:**
   - EventosSection
   - RestaurantesSection
   - PlanesSection
   - AliadosSection
   - Cualquier otra sección con filtros

---

## RESULTADO ESPERADO:

```
ANTES:
[Botones Filtro]
← 80px espacio (mb-20)
← 32px (div h-8)
[Contenido]

DESPUÉS:
[Botones Filtro]
← 32px espacio (mb-8)
[Contenido]

MUCHO más compacto y visual.
```

---

## INSTRUCCIÓN PARA COPIAR A CLAUDE CODE:

```
Reducir espaciado vertical entre botones de filtro y contenido en todas las secciones.

CAMBIOS:
1. Buscar todos los divs con "mb-20 sm:mb-24" que contengan botones de filtro
   Reemplazar por: "mb-8 sm:mb-10"
   
   Afecta a: EventosSection, RestaurantesSection, PlanesSection, AliadosSection

2. Eliminar TODOS los divs separadores innecesarios:
   - <div class="h-8 sm:h-10"></div>
   - <div class="h-6 sm:h-8"></div>
   (Son spacers que agregan espacio innecesario entre botones y contenido)

3. Verificar que el spacing se vea proporcional:
   - No debe haber grandes gaps entre filtros y contenido
   - Pero debe haber breathing room (no pegado)
   - mb-8 sm:mb-10 es el sweet spot

RESULTADO:
- Espaciado más compacto y profesional
- Secciones menos dispersas visualmente
- Sin divs separadores innecesarios
- Responsive correcto en mobile y desktop

Aplica a TODAS las secciones con filtros.
```

---

## VERSIÓN MÁS CORTA:

```
Reducir espaciado filtros ↔ contenido.

En TODAS las secciones (Eventos, Restaurantes, Planes, Aliados):
1. mb-20 sm:mb-24 → mb-8 sm:mb-10 (en div de botones)
2. Eliminar divs: <div class="h-8 sm:h-10"></div>
3. Eliminar divs: <div class="h-6 sm:h-8"></div>

Resultado: Spacing compacto, profesional, proporcional.
```

---

## UBICACIONES ESPECÍFICAS A REVISAR:

- `components/sections/EventosSection.tsx`
- `components/sections/RestaurantesSection.tsx` 
- `components/sections/PlanesSection.tsx`
- `components/sections/AliadosSection.tsx`
- Cualquier otra sección con botones filtro

Busca líneas como:
```typescript
<div className="flex flex-wrap justify-center gap-5 sm:gap-6 mb-20 sm:mb-24">
  {/* botones filtro */}
</div>
```

Y cámbia a:
```typescript
<div className="flex flex-wrap justify-center gap-5 sm:gap-6 mb-8 sm:mb-10">
  {/* botones filtro */}
</div>
```

---

## CHECKLIST DESPUÉS:

- [ ] EventosSection spacing reducido ✓
- [ ] RestaurantesSection spacing reducido ✓
- [ ] PlanesSection spacing reducido ✓
- [ ] AliadosSection spacing reducido ✓
- [ ] Sin divs separadores innecesarios ✓
- [ ] Spacing proporcional en mobile y desktop ✓
- [ ] Sin console errors ✓
