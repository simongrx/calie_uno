export default function Loading() {
  return (
    <div className="section" aria-busy="true" aria-label="Cargando">
      <div className="container-custom">
        {/* Título placeholder */}
        <div className="mx-auto mb-12 flex max-w-2xl flex-col items-center gap-4">
          <div className="h-9 w-2/3 animate-pulse rounded-full bg-white/10" />
          <div className="h-4 w-1/2 animate-pulse rounded-full bg-white/5" />
        </div>

        {/* Grid de cards placeholder */}
        <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="h-80 animate-pulse rounded-2xl"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.08)',
                animationDelay: `${i * 80}ms`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
