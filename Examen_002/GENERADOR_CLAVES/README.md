# 🔐 Generador de Contraseñas Seguras

Proyecto académico para la materia de Construcción y Evolución de Software.

[![CI Pipeline](https://github.com/tu-org/tu-repo/actions/workflows/ci.yml/badge.svg)](https://github.com/tu-org/tu-repo/actions/workflows/ci.yml)

## 📖 Descripción

Aplicación de línea de comandos en Node.js que genera contraseñas seguras y aleatorias con diferentes opciones de personalización. Incluye validación de fortaleza de contraseñas.

## ✨ Características

- 🎲 Generación de contraseñas aleatorias
- ⚙️ Opciones personalizables (longitud, caracteres)
- 💪 Validación de fortaleza
- 📊 Análisis detallado de seguridad
- 🔢 Generación múltiple de contraseñas
- ✅ Tests unitarios completos

## 🚀 Instalación y Ejecución Local

### Requisitos Previos

- Node.js 18.x o superior
- npm (incluido con Node.js)
- Git

### Pasos de Instalación

1. **Clonar el repositorio:**
```bash
git clone https://github.com/tu-organizacion/tu-repo.git
cd tu-repo
```

2. **Instalar dependencias:**
```bash
npm install
```

3. **Ejecutar la aplicación:**
```bash
npm start
```

4. **Ejecutar tests:**
```bash
npm test
```

5. **Verificar código (Lint):**
```bash
npm run lint
```

6. **Verificar formato:**
```bash
npm run format:check
```

7. **Formatear código automáticamente:**
```bash
npm run format
```

## 🎮 Uso de la Aplicación

Al ejecutar `npm start`, verás un menú interactivo:
```
╔═══════════════════════════════════════════╗
║   🔐 GENERADOR DE CONTRASEÑAS SEGURAS   ║
╚═══════════════════════════════════════════╝

1. Generar contraseña simple
2. Generar contraseña personalizada
3. Generar múltiples contraseñas
4. Validar fortaleza de contraseña
5. Salir
```

### Ejemplos de Uso

**Opción 1: Contraseña Simple**
```
✅ Contraseña generada:
   aB3$xY9!mK2@pL7*

💪 Fortaleza: Fuerte (7/7)
```

**Opción 4: Validar Contraseña**
```
📊 Análisis de Fortaleza:
   Nivel: Fuerte
   Puntuación: 6/7

   Características:
   - Longitud: 14 caracteres
   - Minúsculas: ✓
   - Mayúsculas: ✓
   - Números: ✓
   - Símbolos: ✓
```

## 🔄 Pipeline de CI/CD

### Descripción del Flujo

El pipeline se ejecuta automáticamente en cada `push` y `pull request` a las ramas `main`, `develop` y `feature/*`.

### Jobs del Pipeline

#### 1️⃣ **Lint (ESLint)** 🔍
- **Propósito:** Analizar el código en busca de errores y malas prácticas
- **Herramienta:** ESLint
- **Verifica:**
    - Errores de sintaxis
    - Cumplimiento de estándares de código
    - Variables no utilizadas
    - Problemas potenciales

#### 2️⃣ **Format Check (Prettier)** ✨
- **Propósito:** Validar formato consistente del código
- **Herramienta:** Prettier
- **Verifica:**
    - Indentación correcta (2 espacios)
    - Uso de comillas simples
    - Punto y coma al final de sentencias
    - Longitud de línea (80 caracteres)

#### 3️⃣ **Test (Jest)** ✅
- **Propósito:** Ejecutar suite de pruebas unitarias
- **Herramienta:** Jest
- **Ejecuta:**
    - 19 tests unitarios
    - Reporte de cobertura de código
    - Validación de funcionalidad
- **Cobertura esperada:** > 90%

#### 4️⃣ **Build** 📦
- **Propósito:** Verificar que el proyecto se construye correctamente
- **Dependencias:** Requiere que Lint, Format y Test pasen exitosamente
- **Genera:**
    - Artefactos de construcción
    - Validación de que el proyecto puede ejecutarse

### Diagrama de Flujo
```
┌─────────────────────────────────────────────┐
│  Push / Pull Request                        │
└────────────┬────────────────────────────────┘
             │
    ┌────────┴────────┐
    │                 │
┌───▼────┐  ┌────▼────┐  ┌────▼────┐
│  Lint  │  │ Format  │  │  Test   │
│🔍ESLint│  │✨Prettier│  │ ✅Jest  │
└───┬────┘  └────┬────┘  └────┬────┘
    │            │            │
    └────────┬───┴─────┬──────┘
             │         │
         ┌───▼─────────▼───┐
         │   Build 📦      │
         │   (si todo OK)  │
         └─────────────────┘
```

### Resultados Esperados

✅ **Pipeline Exitoso:**
- Todos los jobs en verde ✓
- Sin errores de lint
- Código formateado correctamente
- Todos los tests pasan
- Build generado exitosamente

❌ **Pipeline Fallido:**
- Uno o más jobs en rojo ✗
- Se muestran logs de error detallados
- El build no se ejecuta si fallan los checks previos

## 📸 Capturas de Pantalla

### Ejecución Local Exitosa
```bash
$ npm start

╔═══════════════════════════════════════════╗
║   🔐 GENERADOR DE CONTRASEÑAS SEGURAS   ║
╚═══════════════════════════════════════════╝

1. Generar contraseña simple
2. Generar contraseña personalizada
3. Generar múltiples contraseñas
4. Validar fortaleza de contraseña
5. Salir

Selecciona una opción (1-5): 1

✅ Contraseña generada:
   xK9@mP2$nL5!qR8*

💪 Fortaleza: Fuerte (7/7)
```

### Tests Pasando
```bash
$ npm test

PASS  tests/passwordGenerator.test.js
  PasswordGenerator
    generate
      ✓ debería generar una contraseña de longitud correcta (3 ms)
      ✓ debería generar contraseña con longitud mínima de 4 (1 ms)
      ✓ debería lanzar error si longitud es menor a 4 (2 ms)
      ✓ debería lanzar error si longitud es mayor a 128 (1 ms)
      ✓ debería generar contraseña solo con minúsculas (5 ms)
      ✓ debería incluir mayúsculas cuando se especifica (4 ms)
      ✓ debería incluir números cuando se especifica (3 ms)
      ✓ debería incluir símbolos cuando se especifica (4 ms)
    validateStrength
      ✓ debería validar una contraseña fuerte correctamente (2 ms)
      ✓ debería validar una contraseña débil correctamente (1 ms)
      ✓ debería detectar presencia de minúsculas (1 ms)
      ✓ debería detectar presencia de mayúsculas (1 ms)
      ✓ debería detectar presencia de números (1 ms)
      ✓ debería detectar presencia de símbolos (1 ms)
      ✓ debería lanzar error con contraseña inválida (2 ms)
    generateMultiple
      ✓ debería generar múltiples contraseñas (5 ms)
      ✓ debería generar contraseñas únicas (8 ms)
      ✓ debería lanzar error si la cantidad es menor a 1 (1 ms)
      ✓ debería lanzar error si la cantidad es mayor a 100 (1 ms)

Test Suites: 1 passed, 1 total
Tests:       19 passed, 19 total
Coverage:    100%
Time:        1.234 s
```

### GitHub Actions Pipeline

![CI Pipeline Success](docs/pipeline-success.png)

## 🌿 Workflow de Branches

### Estrategia de Branching
```
main (producción)
 │
 ├── develop (integración)
 │    │
 │    ├── feature/nueva-funcionalidad
 │    ├── feature/mejora-validacion
 │    └── feature/agregar-tests
```

### Flujo de Trabajo

1. **Crear feature branch desde develop:**
```bash
git checkout develop
git pull origin develop
git checkout -b feature/nombre-descriptivo
```

2. **Desarrollar y hacer commits:**
```bash
git add .
git commit -m "feat: descripción del cambio"
```

3. **Push de la rama:**
```bash
git push origin feature/nombre-descriptivo
```

4. **Crear Pull Request:**
    - Ir a GitHub
    - Crear PR desde `feature/nombre` hacia `develop`
    - Describir los cambios realizados
    - Asignar reviewer (compañero)

5. **Revisión y Aprobación:**
    - El compañero revisa el código
    - Hace comentarios si es necesario
    - Aprueba el PR

6. **Merge:**
    - Una vez aprobado, hacer merge
    - Eliminar la rama feature

## 🧪 Tests Implementados

### Cobertura de Tests

| Módulo              | Cobertura | Tests |
|---------------------|-----------|-------|
| passwordGenerator.js| 100%      | 19    |

### Tipos de Tests

- ✅ Tests unitarios de generación
- ✅ Tests de validación
- ✅ Tests de casos límite
- ✅ Tests de manejo de errores
- ✅ Tests de opciones personalizadas

## 👥 Contribución

### Cómo Contribuir

1. Fork del proyecto
2. Crear feature branch
3. Commit de cambios
4. Push a la branch
5. Crear Pull Request

## 📚 Tecnologías Utilizadas

- **Runtime:** Node.js 18+
- **Testing:** Jest
- **Linting:** ESLint
- **Formatting:** Prettier
- **CI/CD:** GitHub Actions

## 📝 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo LICENSE para más detalles.

## 📧 Contacto

**Estudiante:** Julián Camacho  
**Correo:** julian.camacho@epn.edu.ec
