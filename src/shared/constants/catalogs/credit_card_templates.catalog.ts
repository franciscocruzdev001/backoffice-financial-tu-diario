export type CreditCardSheetLayout = 'grid2x2' | 'stacked';

export interface CreditCardContentBox {
    x: number;
    y: number;
    width: number;
    height: number;
}

export interface CreditCardTemplateOption {
    id: string;
    label: string;
    url: string;
    // grid2x2: 4 tarjetas por hoja (2 arriba, 2 abajo) — plantilla CREDITUX,
    // cuyo diseño llena toda la página, se ve bien reducida a un cuarto.
    // stacked: 1 columna x 3 filas — plantilla DIARIO.
    layout: CreditCardSheetLayout;
    // El diseño de DIARIO solo ocupa la parte de arriba de la página (el
    // resto queda en blanco); si se escala la página completa, esa parte
    // en blanco también se escala y la tarjeta visible sale diminuta dentro
    // de su celda. contentBox recorta la página al área real de la tarjeta
    // antes de incrustarla (embedPage con boundingBox explícito).
    // Medido con pdf-lib puro: se extrajeron TODOS los operadores de dibujo
    // (re/m/l) del content stream real (no solo posiciones de texto) —
    // el contenido dibujado va de x:4.2-607.9, y:551.95-765; se usa con
    // margen de seguridad para no cortar ningún borde de la tabla.
    contentBox?: CreditCardContentBox;
    // El campo "cobrador" de DIARIO es angosto (76pt) y se desborda con un
    // nombre completo — ahí solo se muestra el primer nombre. CREDITUX sí
    // tiene espacio y muestra el nombre completo (default cuando se omite).
    collectorNameStyle?: 'full' | 'firstName';
}

// Ambas plantillas comparten los mismos campos de formulario (con 2
// excepciones manejadas en CreditCardPdfUtils.ts: "joinDate"/"joinName" y
// que DIARIO no trae "phoneNumberCollector") — solo cambia el diseño.
export const CREDIT_CARD_TEMPLATES: CreditCardTemplateOption[] = [
    { id: 'creditux', label: 'Creditux', url: '/pdftemplates/TARJETA_CREDITUX_PLANTILLA_FORMULARIO.pdf', layout: 'grid2x2' },
    {
        id: 'diario',
        label: 'Diario',
        url: '/pdftemplates/TARJETA_DIARIO_PLANTILLA_FORMULARIO.pdf',
        layout: 'stacked',
        contentBox: { x: 0, y: 545, width: 612, height: 247 },
        collectorNameStyle: 'firstName',
    },
];

export const DEFAULT_CREDIT_CARD_TEMPLATE_ID: string = CREDIT_CARD_TEMPLATES[0]!.id;
