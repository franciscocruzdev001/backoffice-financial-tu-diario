export interface CustomerOption {
  optionId: string;   // customerId
  label: string;
  phoneNumber?: string;
}

// TODO: reemplazar por datos reales (idealmente desde un endpoint que busque
// customers, en vez de un catálogo hardcodeado)
export const CUSTOMER_OPTIONS: CustomerOption[] = [
  {
    optionId: '6a6a692daa67f8415cedbd8b',
    label: 'Edgar Jimenez',
    phoneNumber: '9511234567',
  },
];