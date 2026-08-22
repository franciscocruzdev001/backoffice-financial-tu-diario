export interface EmployeeWalletOption {
  optionId: string;   // userId del trabajador
  label: string;
  phoneNumber?: string;
  walletId: string;
  accountNumber: string;
}

// TODO: reemplazar por datos reales (idealmente desde un endpoint que regrese
// trabajador + su wallet asociada, en vez de un catálogo hardcodeado)
export const EMPLOYEE_WALLET_OPTIONS: EmployeeWalletOption[] = [
  {
    optionId: '6a6a6b70aa67f8415cedbd95',
    label: 'Fabricio Jimenez',
    phoneNumber: '9511234567',
    walletId: '6888a2222222222222222222',
    accountNumber: 'WALLET-001',
  },
  {
    optionId: '6a6e69ef97101f21879de111',
    label: 'Fabricio Urbina',
    phoneNumber: '9511234567',
    walletId: '6888a4444444444444444444',
    accountNumber: 'WALLET-002',
  },
];