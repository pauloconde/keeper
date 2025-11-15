// --- Componente EndpointCard ---
// Maneja diferentes "modos" (estados) a través de props.
export default function EndpointCard({ endpoint, onPing, onPingURL, isPinging, isPingingURL }) {
    // Configuración para cada estado
    const statusConfig = {
        active: {
            text: 'Active',
            textColor: 'text-green-400',
            bgColor: 'bg-green-500',
        },
        expiring: {
            text: 'Expiring Soon',
            textColor: 'text-yellow-400',
            bgColor: 'bg-yellow-500',
        },
        failed: {
            text: 'Failed',
            textColor: 'text-red-400',
            bgColor: 'bg-red-500',
        },
        inactive: {
            text: 'Inactive',
            textColor: 'text-gray-400',
            bgColor: 'bg-gray-500',
        },
    };

    // Obtener la configuración correcta o usar 'inactive' como default
    const config = statusConfig[endpoint.status] || statusConfig.inactive;

    return (
        <div className="flex items-start gap-3 rounded-xl bg-white/5 p-5 transition-all hover:bg-white/10">
            {/* Indicador de estado dinámico */}
            <div className={`w-1.5 h-6 shrink-0 rounded-full ${config.bgColor} mt-1`}></div>

            <div className="flex w-full flex-col gap-4">
                <div>
                    {/* Texto de estado dinámico */}
                    <p className={`text-sm font-medium ${config.textColor}`}>{config.text}</p>
                    {/* Datos del endpoint */}
                    <h3 className="text-lg font-bold leading-tight tracking-[-0.015em] text-white">{endpoint.name}</h3>
                    <p className="text-sm text-white/50 truncate" title={endpoint.url}>{endpoint.url}</p>
                </div>

                <div className="text-sm text-white/60 space-y-1">
                    <p><strong className="font-medium text-white/80">Frequency:</strong> {endpoint.frequency}</p>
                    <p>
                        <strong className="font-medium text-white/80">Last Ping: </strong>
                        {new Date(endpoint.lastPing).toLocaleString('en-US', {
                            month: '2-digit',
                            day: '2-digit',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: true
                        })}
                    </p>
                    <p><strong className="font-medium text-white/80">Next Ping:</strong> {endpoint.nextPing}</p>
                </div>

                <div className="flex items-start gap-2 mt-2">
                    {/* <button
                        onClick={() => onPing?.(endpoint.id)}
                        disabled={!!isPinging}
                        className={`flex h-9 flex-1 items-center justify-center gap-1.5 overflow-hidden rounded-lg px-4 text-sm font-semibold transition-colors ${isPinging ? 'bg-black/10 text-white/50 cursor-not-allowed' : 'bg-white/10 text-primary hover:bg-primary/30'}`}
                    >
                        <span className="material-symbols-outlined !text-base">bolt</span>
                        <span className="truncate">{isPinging ? 'Pinging…' : 'Ping Now ID'}</span>
                    </button> */}
                    <button
                        onClick={() => onPingURL?.(endpoint.url)}
                        disabled={!!isPingingURL}
                        className={`flex h-9 flex-1 items-center justify-center gap-1.5 overflow-hidden rounded-lg px-4 text-sm font-semibold transition-colors ${isPingingURL ? 'bg-black/10 text-white/50 cursor-not-allowed' : 'bg-white/10 text-primary hover:bg-primary/30'}`}
                    >
                        <span className="material-symbols-outlined !text-base">bolt</span>
                        <span className="truncate">{isPingingURL ? 'Pinging…' : 'Ping Now'}</span>
                    </button>
                    <button className="flex size-9 cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-white/10 text-white/70 transition-colors hover:bg-white/20 hover:text-white" title="Edit">
                        <span className="material-symbols-outlined">edit</span>
                    </button>
                    <button className="flex size-9 cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-white/10 text-white/70 transition-colors hover:bg-red-500/20 hover:text-red-400" title="Delete">
                        <span className="material-symbols-outlined">delete</span>
                    </button>
                </div>
            </div>
        </div>
    );
};