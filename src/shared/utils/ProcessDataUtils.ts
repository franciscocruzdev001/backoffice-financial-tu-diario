import { format } from "date-fns";

  // get inicial each name last name to contact icon
  export const getIniciales = (nombre: string): string => {
    return nombre.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  // Formatear fecha
  export const formatearFecha = (fecha:string) => {
    return new Date(fecha).toLocaleDateString('es-MX', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Formatear fecha v2 2026/03/20
  export const getDate = (timeStamp:number, formatOutput: string = "yyyy-MM-dd"): string => {
    return format(timeStamp, formatOutput);
  };

  // Formatear moneda
  export const formatearMoneda = (monto: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    }).format(monto);
  };

  // get full name on string
  export const getFullName = (name: string, lastName: string): string => {
    return `${name} ${lastName}`;
  };