/**
 * Generador de Contraseñas Seguras
 * Genera contraseñas aleatorias con diferentes niveles de seguridad
 */

class PasswordGenerator {
  constructor() {
    this.lowercase = 'abcdefghijklmnopqrstuvwxyz';
    this.uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    this.numbers = '0123456789';
    this.symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
  }

  /**
   * Genera una contraseña basada en los parámetros dados
   * @param {number} length - Longitud de la contraseña
   * @param {Object} options - Opciones de generación
   * @returns {string} Contraseña generada
   */
  generate(length = 12, options = {}) {
    if (length < 4) {
      throw new Error('La longitud mínima es 4 caracteres');
    }

    if (length > 128) {
      throw new Error('La longitud máxima es 128 caracteres');
    }

    const {
      includeUppercase = true,
      includeNumbers = true,
      includeSymbols = true
    } = options;

    let characters = this.lowercase;
    let password = '';

    // Construir el conjunto de caracteres disponibles
    if (includeUppercase) characters += this.uppercase;
    if (includeNumbers) characters += this.numbers;
    if (includeSymbols) characters += this.symbols;

    // Generar contraseña aleatoria
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      password += characters[randomIndex];
    }

    return password;
  }

  /**
   * Valida la fortaleza de una contraseña
   * @param {string} password - Contraseña a validar
   * @returns {Object} Objeto con el nivel y detalles
   */
  validateStrength(password) {
    if (!password || typeof password !== 'string') {
      throw new Error('Contraseña inválida');
    }

    let score = 0;
    const details = {
      length: password.length,
      hasLowercase: /[a-z]/.test(password),
      hasUppercase: /[A-Z]/.test(password),
      hasNumbers: /[0-9]/.test(password),
      hasSymbols: /[!@#$%^&*()_+\-=[\]{}|;:,.<>?]/.test(password)
    };

    // Calcular puntuación
    if (details.length >= 8) score += 1;
    if (details.length >= 12) score += 1;
    if (details.length >= 16) score += 1;
    if (details.hasLowercase) score += 1;
    if (details.hasUppercase) score += 1;
    if (details.hasNumbers) score += 1;
    if (details.hasSymbols) score += 1;

    let level = 'Débil';
    if (score >= 6) level = 'Fuerte';
    else if (score >= 4) level = 'Moderada';

    return {
      level,
      score,
      details
    };
  }

  /**
   * Genera múltiples contraseñas
   * @param {number} count - Cantidad de contraseñas
   * @param {number} length - Longitud de cada contraseña
   * @param {Object} options - Opciones de generación
   * @returns {Array} Array de contraseñas
   */
  generateMultiple(count = 5, length = 12, options = {}) {
    if (count < 1 || count > 100) {
      throw new Error('La cantidad debe estar entre 1 y 100');
    }

    const passwords = [];
    for (let i = 0; i < count; i++) {
      passwords.push(this.generate(length, options));
    }
    return passwords;
  }

  /**
   * Calcula el tiempo estimado para romper una contraseña
   * @param {string} password - Contraseña a analizar
   * @returns {string} Tiempo estimado
   */
  calculateCrackTime(password) {
    const charset = this.lowercase.length + this.uppercase.length +
        this.numbers.length + this.symbols.length;
    const combinations = Math.pow(charset, password.length);

    // Asumiendo 1 billón de intentos por segundo
    const seconds = combinations / 1000000000000;

    if (seconds < 60) return `${Math.round(seconds)} segundos`;
    if (seconds < 3600) return `${Math.round(seconds / 60)} minutos`;
    if (seconds < 86400) return `${Math.round(seconds / 3600)} horas`;
    if (seconds < 31536000) return `${Math.round(seconds / 86400)} días`;
    return `${Math.round(seconds / 31536000)} años`;
  }
}

module.exports = PasswordGenerator;
