import { Box, Dialog, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material';
import {
    Close as CloseIcon,
    Room as RoomIcon,
    Directions as DirectionsIcon,
} from '@mui/icons-material';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '@/shared/utils/leafletIconFix';
import { createPulsingLocationIcon } from '@/shared/utils/pulsingLocationIcon';
import { Ubication } from '@/types/CreditTable';

export interface ModalLocationViewDialogProps {
    open: boolean;
    onClose: () => void;
    customerName?: string;
    address?: string;
    ubication?: Ubication;
}

const gradient = 'linear-gradient(135deg, #1e3c72, #2a5298)';

// Modal de solo-lectura: muestra dónde el cobrador capturó la ubicación del
// cliente (LocationPickerField, en el mobile) — mapa fijo (sin drag/zoom/
// click) y un botón para salir a Google Maps a trazar la ruta. Misma pieza
// visual que ya usamos en el mobile, adaptada a Dialog en vez de bottom sheet.
const ModalLocationViewDialog: React.FC<ModalLocationViewDialogProps> = ({
    open,
    onClose,
    customerName,
    address,
    ubication,
}) => {
    const latitude = ubication?.latitude;
    const longitude = ubication?.longitude;
    if (!open || !latitude || !longitude) return null;

    const position: [number, number] = [Number(latitude), Number(longitude)];
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;

    return (
        <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
            <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1.5, pb: 1.5 }}>
                <Box
                    sx={{
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        background: gradient,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        boxShadow: '0 4px 12px rgba(30, 60, 114, 0.35)',
                    }}
                >
                    <RoomIcon sx={{ color: '#fff', fontSize: 22 }} />
                </Box>

                <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography sx={{ fontWeight: 700, fontSize: 16, lineHeight: 1.25 }}>
                        {customerName || 'Ubicación del cliente'}
                    </Typography>
                    {address && (
                        <Typography variant="body2" color="text.secondary">
                            {address}
                        </Typography>
                    )}
                </Box>

                <IconButton onClick={onClose} size="small">
                    <CloseIcon fontSize="small" />
                </IconButton>
            </DialogTitle>

            <DialogContent sx={{ pb: 3 }}>
                <Box
                    sx={{
                        position: 'relative',
                        borderRadius: 3,
                        overflow: 'hidden',
                        height: 280,
                        boxShadow: '0 6px 20px rgba(16, 24, 40, 0.14)',
                    }}
                >
                    <Box sx={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
                        <MapContainer
                            center={position}
                            zoom={16}
                            style={{ width: '100%', height: '100%' }}
                            zoomControl={false}
                            dragging={false}
                            touchZoom={false}
                            doubleClickZoom={false}
                            scrollWheelZoom={false}
                            boxZoom={false}
                            keyboard={false}
                        >
                            <TileLayer
                                attribution='&copy; OpenStreetMap contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker position={position} icon={createPulsingLocationIcon()} />
                        </MapContainer>
                    </Box>

                    <Box
                        sx={{
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            bottom: 0,
                            height: 56,
                            background: 'linear-gradient(to top, rgba(0,0,0,0.45), rgba(0,0,0,0))',
                            pointerEvents: 'none',
                            zIndex: 1,
                        }}
                    />
                    <Box
                        sx={{
                            position: 'absolute',
                            left: 12,
                            bottom: 12,
                            px: 1.25,
                            py: 0.5,
                            borderRadius: 999,
                            backgroundColor: 'rgba(0,0,0,0.55)',
                            backdropFilter: 'blur(4px)',
                            zIndex: 1,
                        }}
                    >
                        <Typography sx={{ color: '#fff', fontSize: 11.5, fontWeight: 600, letterSpacing: 0.2 }}>
                            {Number(latitude).toFixed(6)}, {Number(longitude).toFixed(6)}
                        </Typography>
                    </Box>
                </Box>

                <Box
                    component="a"
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                        mt: 2.5,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 1,
                        py: 1.4,
                        borderRadius: 999,
                        background: gradient,
                        color: '#fff',
                        textDecoration: 'none',
                        fontWeight: 700,
                        fontSize: 15,
                        boxShadow: '0 6px 16px rgba(30, 60, 114, 0.35)',
                        transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                        '&:hover': {
                            boxShadow: '0 8px 20px rgba(30, 60, 114, 0.4)',
                        },
                        '&:active': {
                            transform: 'scale(0.98)',
                        },
                    }}
                >
                    <DirectionsIcon />
                    Cómo llegar en Google Maps
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default ModalLocationViewDialog;
