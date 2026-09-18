import { PDFDocument, PDFForm } from 'pdf-lib';
import { type CreditCardContentBox, type CreditCardSheetLayout } from '@/shared/constants/catalogs/credit_card_templates.catalog';

// Nombres exactos de los campos del formulario dentro del PDF plantilla
// (verificado con form.getFields() sobre TARJETA_CREDITUX_PLANTILLA_FORMULARIO.pdf
// y TARJETA_DIARIO_PLANTILLA_FORMULARIO.pdf — ambas comparten casi todos los
// campos, con 2 excepciones que se resuelven abajo en fillTemplateFields).
export interface CreditCardTemplateData {
    joinDate: string;
    creditCollector: string;
    endDate: string;
    customerName: string;
    address: string;
    paymentRenovation: string;
    phoneNumber: string;
    amount: string;
    paymentFees: string;
    fixedCharge: string;
    threeWords: string;
    phoneNumberCollector: string;
}

const fillTemplateFields = (form: PDFForm, data: CreditCardTemplateData) => {
    // Solo avisa por consola si el campo no existe en NINGUNO de los alias —
    // es esperado que "phoneNumberCollector" no exista en la plantilla DIARIO
    // (esa plantilla no trae ese dato a propósito), así que no truena nada,
    // solo no se llena ese campo en esa plantilla.
    const setIfExists = (fieldNames: string | string[], value: string) => {
        const names = Array.isArray(fieldNames) ? fieldNames : [fieldNames];
        for (const name of names) {
            try {
                form.getTextField(name).setText(value ?? '');
                return;
            } catch {

            }
        }
        console.warn(`CreditCardPdfUtils: ninguno de los campos [${names.join(', ')}] existe en esta plantilla`);
    };

    // "joinDate" en CREDITUX, "joinName" en DIARIO — mismo dato, nombre distinto.
    setIfExists(['joinDate', 'joinName'], data.joinDate);
    setIfExists('creditCollector', data.creditCollector);
    setIfExists('endDate', data.endDate);
    setIfExists('customerName', data.customerName);
    setIfExists('address', data.address);
    setIfExists('paymentRenovation', data.paymentRenovation);
    setIfExists('phoneNumber', data.phoneNumber);
    setIfExists('amount', data.amount);
    setIfExists('paymentFees', data.paymentFees);
    setIfExists('fixedFee', data.fixedCharge);
    setIfExists('3words', data.threeWords);
    setIfExists('phoneNumberCollector', data.phoneNumberCollector);
};

// Genera UNA tarjeta ya rellena y "aplanada" (los campos de formulario pasan
// a ser contenido estático de la página) — así se puede incrustar como
// página embebida dentro de la hoja final sin arrastrar su propio AcroForm.
const buildFilledCardDoc = async (
    templateBytes: ArrayBuffer,
    data: CreditCardTemplateData
): Promise<PDFDocument> => {
    const pdfDoc = await PDFDocument.load(templateBytes);
    const form = pdfDoc.getForm();
    fillTemplateFields(form, data);
    form.flatten();
    return pdfDoc;
};

// Hoja carta (612x792 pt).
const PAGE_WIDTH = 612;
const PAGE_HEIGHT = 792;
const MARGIN = 20;

// grid2x2 (CREDITUX): 2 columnas x 2 filas = 4 por hoja.
// stacked (DIARIO): 1 columna x 3 filas = 3 por hoja garantizadas — su diseño
// es casi de página completa, así que a ancho completo solo entraba 1; se
// fuerza a que quepan 3 reduciendo también el alto de cada celda.
const GRID_CONFIG: Record<CreditCardSheetLayout, { cols: number; rows: number }> = {
    grid2x2: { cols: 2, rows: 2 },
    stacked: { cols: 1, rows: 3 },
};

const buildCellPositions = (cols: number, rows: number) => {
    const cellWidth = (PAGE_WIDTH - MARGIN * (cols + 1)) / cols;
    const cellHeight = (PAGE_HEIGHT - MARGIN * (rows + 1)) / rows;
    const positions: { x: number; y: number }[] = [];

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            positions.push({
                x: MARGIN + col * (cellWidth + MARGIN),
                y: PAGE_HEIGHT - MARGIN - (row + 1) * cellHeight - row * MARGIN,
            });
        }
    }

    return { cellWidth, cellHeight, positions };
};

// Arma UN solo PDF de salida con todas las tarjetas, en cuadrícula fija
// (cols x rows por hoja) según el layout de la plantilla elegida.
export const buildCreditCardsSheetPdf = async (
    cardsData: CreditCardTemplateData[],
    templateUrl: string,
    layout: CreditCardSheetLayout = 'grid2x2',
    contentBox?: CreditCardContentBox
): Promise<Uint8Array> => {
    const templateBytes = await fetch(templateUrl).then((res) => res.arrayBuffer());
    const outputDoc = await PDFDocument.create();

    const { cols, rows } = GRID_CONFIG[layout];
    const cardsPerPage = cols * rows;
    const { cellWidth, cellHeight, positions } = buildCellPositions(cols, rows);

    for (let i = 0; i < cardsData.length; i += cardsPerPage) {
        const page = outputDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
        const cardsInPage = cardsData.slice(i, i + cardsPerPage);

        for (let j = 0; j < cardsInPage.length; j++) {
            const filledDoc = await buildFilledCardDoc(templateBytes, cardsInPage[j]);
            const [srcPage] = filledDoc.getPages();
            // outputDoc.embedPdf() calcula mal la caja del PDF fuente cuando su
            // MediaBox no arranca en (0,0) — usar embedPage() con un boundingBox
            // explícito sí traduce el contenido a la posición correcta.
            const boundingBox = contentBox ? {
                left: contentBox.x,
                bottom: contentBox.y,
                right: contentBox.x + contentBox.width,
                top: contentBox.y + contentBox.height,
            } : undefined;
            const embeddedPage = await outputDoc.embedPage(srcPage!, boundingBox);
            const scale = Math.min(cellWidth / embeddedPage.width, cellHeight / embeddedPage.height);
            page.drawPage(embeddedPage, {
                x: positions[j].x,
                y: positions[j].y,
                xScale: scale,
                yScale: scale,
            });
        }
    }

    return outputDoc.save();
};

// Dispara la descarga en el navegador (no hay filesystem — se reemplaza el
// writeFileSync original por un Blob + <a download>).
export const downloadCreditCardsSheetPdf = async (
    cardsData: CreditCardTemplateData[],
    templateUrl: string,
    layout: CreditCardSheetLayout = 'grid2x2',
    contentBox: CreditCardContentBox | undefined = undefined,
    fileName: string = 'tarjetas_creditos.pdf'
): Promise<void> => {
    const pdfBytes = await buildCreditCardsSheetPdf(cardsData, templateUrl, layout, contentBox);
    const blob = new Blob([pdfBytes as BlobPart], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(url);
};
