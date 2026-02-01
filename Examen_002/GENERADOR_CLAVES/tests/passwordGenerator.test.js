const PasswordGenerator = require('../src/passwordGenerator');

describe('PasswordGenerator', () => {
  let generator;

  beforeEach(() => {
    generator = new PasswordGenerator();
  });

  describe('generate', () => {
    test('debería generar una contraseña de longitud correcta', () => {
      const password = generator.generate(16);
      expect(password.length).toBe(16);
    });

    test('debería generar contraseña con longitud mínima de 4', () => {
      const password = generator.generate(4);
      expect(password.length).toBe(4);
    });

    test('debería lanzar error si longitud es menor a 4', () => {
      expect(() => generator.generate(3)).toThrow(
        'La longitud mínima es 4 caracteres'
      );
    });

    test('debería lanzar error si longitud es mayor a 128', () => {
      expect(() => generator.generate(129)).toThrow(
        'La longitud máxima es 128 caracteres'
      );
    });

    test('debería generar contraseña solo con minúsculas si todas las opciones son false', () => {
      const password = generator.generate(20, {
        includeUppercase: false,
        includeNumbers: false,
        includeSymbols: false
      });
      expect(/^[a-z]+$/.test(password)).toBe(true);
    });

    test('debería incluir mayúsculas cuando se especifica', () => {
      const password = generator.generate(100, { includeUppercase: true });
      expect(/[A-Z]/.test(password)).toBe(true);
    });

    test('debería incluir números cuando se especifica', () => {
      const password = generator.generate(100, { includeNumbers: true });
      expect(/[0-9]/.test(password)).toBe(true);
    });

    test('debería incluir símbolos cuando se especifica', () => {
      const password = generator.generate(100, { includeSymbols: true });
      expect(/[!@#$%^&*()_+\-=[\]{}|;:,.<>?]/.test(password)).toBe(true);
    });
  });

  describe('validateStrength', () => {
    test('debería validar una contraseña fuerte correctamente', () => {
      const result = generator.validateStrength('MyP@ssw0rd123!');
      expect(result.level).toBe('Fuerte');
      expect(result.score).toBeGreaterThanOrEqual(6);
    });

    test('debería validar una contraseña débil correctamente', () => {
      const result = generator.validateStrength('abc');
      expect(result.level).toBe('Débil');
      expect(result.score).toBeLessThan(4);
    });

    test('debería detectar presencia de minúsculas', () => {
      const result = generator.validateStrength('password');
      expect(result.details.hasLowercase).toBe(true);
    });

    test('debería detectar presencia de mayúsculas', () => {
      const result = generator.validateStrength('PASSWORD');
      expect(result.details.hasUppercase).toBe(true);
    });

    test('debería detectar presencia de números', () => {
      const result = generator.validateStrength('12345');
      expect(result.details.hasNumbers).toBe(true);
    });

    test('debería detectar presencia de símbolos', () => {
      const result = generator.validateStrength('!@#$%');
      expect(result.details.hasSymbols).toBe(true);
    });

    test('debería lanzar error con contraseña inválida', () => {
      expect(() => generator.validateStrength(null)).toThrow(
        'Contraseña inválida'
      );
      expect(() => generator.validateStrength(undefined)).toThrow(
        'Contraseña inválida'
      );
      expect(() => generator.validateStrength(123)).toThrow(
        'Contraseña inválida'
      );
    });
  });

  describe('generateMultiple', () => {
    test('debería generar múltiples contraseñas', () => {
      const passwords = generator.generateMultiple(5, 12);
      expect(passwords.length).toBe(5);
      passwords.forEach((pwd) => {
        expect(pwd.length).toBe(12);
      });
    });

    test('debería generar contraseñas únicas', () => {
      const passwords = generator.generateMultiple(10, 16);
      const uniquePasswords = new Set(passwords);
      expect(uniquePasswords.size).toBe(10);
    });

    test('debería lanzar error si la cantidad es menor a 1', () => {
      expect(() => generator.generateMultiple(0)).toThrow(
        'La cantidad debe estar entre 1 y 100'
      );
    });

    test('debería lanzar error si la cantidad es mayor a 100', () => {
      expect(() => generator.generateMultiple(101)).toThrow(
        'La cantidad debe estar entre 1 y 100'
      );
    });
  });

  describe('calculateCrackTime', () => {
    test('debería calcular tiempo de crackeo para contraseña corta', () => {
      const time = generator.calculateCrackTime('abc');
      expect(time).toContain('segundos');
    });

    test('debería calcular tiempo de crackeo para contraseña larga', () => {
      const time = generator.calculateCrackTime('aB3$xY9!mK2@pL7*qR5&');
      expect(time).toContain('años');
    });
  });

  describe('History Management', () => {
    test('debería guardar contraseñas en el historial', () => {
      generator.generate(12);
      generator.generate(16);

      const history = generator.getHistory();
      expect(history.length).toBe(2);
    });

    test('debería limitar el historial a maxHistorySize', () => {
      generator.maxHistorySize = 5;

      for (let i = 0; i < 10; i++) {
        generator.generate(10);
      }

      const history = generator.getHistory(100);
      expect(history.length).toBe(5);
    });

    test('debería incluir metadata en las entradas del historial', () => {
      generator.generate(12);
      const history = generator.getHistory();

      expect(history[0]).toHaveProperty('password');
      expect(history[0]).toHaveProperty('timestamp');
      expect(history[0]).toHaveProperty('length');
      expect(history[0]).toHaveProperty('strength');
    });

    test('debería limpiar el historial correctamente', () => {
      generator.generate(12);
      generator.generate(16);
      generator.clearHistory();

      const history = generator.getHistory();
      expect(history.length).toBe(0);
    });

    test('debería calcular estadísticas del historial', () => {
      generator.clearHistory();
      generator.generate(16, { includeSymbols: true });
      generator.generate(8, { includeSymbols: false });

      const stats = generator.getHistoryStats();
      expect(stats.total).toBe(2);
      expect(stats.averageLength).toBeGreaterThan(0);
    });

    test('debería buscar en el historial por longitud mínima', () => {
      generator.clearHistory();
      generator.generate(8);
      generator.generate(16);
      generator.generate(20);

      const results = generator.searchHistory({ minLength: 15 });
      expect(results.length).toBe(2);
    });

    test('debería buscar en el historial por fortaleza', () => {
      generator.clearHistory();
      generator.generate(16);

      const results = generator.searchHistory({ strength: 'Fuerte' });
      expect(results.length).toBeGreaterThan(0);
    });

    test('debería devolver estadísticas vacías con historial vacío', () => {
      generator.clearHistory();
      const stats = generator.getHistoryStats();

      expect(stats.total).toBe(0);
      expect(stats.averageLength).toBe(0);
    });
  });
});

//Pipeline test