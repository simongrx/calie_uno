export default function Debug() {
  return (
    <div className="p-8 bg-red-500 text-white">
      <h1>🔴 DEBUG - Colores visibles</h1>
      <div className="mt-4 bg-blue-500 p-4">Azul - Body debería ser #0A1636</div>
      <div className="mt-4 bg-green-500 p-4">Verde - Elemento de prueba</div>
      <div className="mt-4" style={{ backgroundColor: '#0A1636', padding: '1rem', color: 'white' }}>
        Negro - Color deseado con inline style
      </div>
    </div>
  );
}
