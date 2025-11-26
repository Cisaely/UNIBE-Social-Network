/**
 * SISTEMA DE VALIDACIÓN PARA UNIBE SOCIAL NETWORK
 * 
 * Este archivo contiene todas las funciones de validación para:
 * - Correos institucionales (@est.unibe.edu.do)
 * - Contraseñas seguras (mínimo 8 caracteres, mayúsculas, minúsculas, caracteres especiales)
 * - Matrículas estudiantiles (formato AA-####)
 */

/**
 * Valida que el correo institucional sea válido
 * Formato requerido: nombre@est.unibe.edu.do
 * @param email - El correo a validar
 * @returns Objeto con validación y mensaje de error si aplica
 */
export function validateUnibeEmail(email: string): { valid: boolean; error?: string } {
  if (!email) {
    return { valid: false, error: 'El correo es requerido' };
  }

  // Solo aceptar correos con @est.unibe.edu.do
  const emailRegex = /^[a-zA-Z0-9._-]+@est\.unibe\.edu\.do$/;
  
  if (!emailRegex.test(email)) {
    return { 
      valid: false, 
      error: 'Debes usar tu correo institucional (@est.unibe.edu.do)' 
    };
  }

  return { valid: true };
}

/**
 * Verifica si un correo ya está registrado en el sistema
 * @param email - El correo a verificar
 * @param existingEmails - Lista de correos ya registrados
 * @returns true si el correo ya existe, false si no
 */
export function checkDuplicateEmail(email: string, existingEmails: string[]): boolean {
  return existingEmails.includes(email.toLowerCase());
}

/**
 * Valida la seguridad de la contraseña
 * Requisitos:
 * - Mínimo 8 caracteres
 * - Al menos una letra mayúscula
 * - Al menos una letra minúscula
 * - Al menos un carácter especial (!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~)
 * @param password - La contraseña a validar
 * @returns Objeto con validación, error general y detalles de requisitos
 */
export function validatePassword(password: string): { 
  valid: boolean; 
  error?: string;
  requirements?: {
    length: boolean;
    uppercase: boolean;
    lowercase: boolean;
    special: boolean;
  }
} {
  if (!password) {
    return { valid: false, error: 'La contraseña es requerida' };
  }

  const requirements = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(password)
  };

  const allValid = Object.values(requirements).every(req => req);

  if (!allValid) {
    return { 
      valid: false, 
      error: 'La contraseña no cumple con todos los requisitos de seguridad',
      requirements
    };
  }

  return { valid: true, requirements };
}

/**
 * Valida el formato de la matrícula estudiantil
 * Formato requerido: AA-#### (ejemplo: 24-1197)
 * Donde AA son dos dígitos del año y #### es el número de matrícula
 * @param studentId - La matrícula a validar
 * @returns Objeto con validación y mensaje de error si aplica
 */
export function validateStudentId(studentId: string): { valid: boolean; error?: string } {
  if (!studentId) {
    return { valid: false, error: 'La matrícula es requerida' };
  }

  // Formato: AA-#### (ejemplo: 24-1197)
  const idRegex = /^\d{2}-\d{4}$/;
  
  if (!idRegex.test(studentId)) {
    return { 
      valid: false, 
      error: 'La matrícula debe tener el formato: AA-#### (ejemplo: 24-1197)' 
    };
  }

  return { valid: true };
}