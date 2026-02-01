const readline = require('readline');
const PasswordGenerator = require('./passwordGenerator');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const generator = new PasswordGenerator();

function showMenu() {
  console.log('\n╔═══════════════════════════════════════════╗');
  console.log('║   🔐 GENERADOR DE CONTRASEÑAS SEGURAS   ║');
  console.log('╚═══════════════════════════════════════════╝');
  console.log('\n1. Generar contraseña simple');
  console.log('2. Generar contraseña personalizada');
  console.log('3. Generar múltiples contraseñas');
  console.log('4. Validar fortaleza de contraseña');
  console.log('5. Ver historial de contraseñas');
  console.log('6. Ver estadísticas');
  console.log('7. Limpiar historial');
  console.log('8. Salir\n');
}

function generateSimple() {
  const password = generator.generate(16);
  console.log('\n✅ Contraseña generada:');
  console.log(`   ${password}`);

  const strength = generator.validateStrength(password);
  console.log(`\n💪 Fortaleza: ${strength.level} (${strength.score}/7)`);

  askContinue();
}

function generateCustom() {
  rl.question('Longitud (4-128): ', (length) => {
    rl.question('¿Incluir mayúsculas? (s/n): ', (upper) => {
      rl.question('¿Incluir números? (s/n): ', (nums) => {
        rl.question('¿Incluir símbolos? (s/n): ', (syms) => {
          const options = {
            includeUppercase: upper.toLowerCase() === 's',
            includeNumbers: nums.toLowerCase() === 's',
            includeSymbols: syms.toLowerCase() === 's'
          };

          try {
            const password = generator.generate(parseInt(length), options);
            console.log('\n✅ Contraseña generada:');
            console.log(`   ${password}`);

            const strength = generator.validateStrength(password);
            console.log(
              `\n💪 Fortaleza: ${strength.level} (${strength.score}/7)`
            );
          } catch (error) {
            console.log(`\n❌ Error: ${error.message}`);
          }

          askContinue();
        });
      });
    });
  });
}

function generateMultiple() {
  rl.question('¿Cuántas contraseñas? (1-100): ', (count) => {
    rl.question('Longitud de cada una (4-128): ', (length) => {
      try {
        const passwords = generator.generateMultiple(
          parseInt(count),
          parseInt(length)
        );

        console.log('\n✅ Contraseñas generadas:\n');
        passwords.forEach((pwd, index) => {
          console.log(`   ${index + 1}. ${pwd}`);
        });
      } catch (error) {
        console.log(`\n❌ Error: ${error.message}`);
      }

      askContinue();
    });
  });
}

function validatePassword() {
  rl.question('Ingresa la contraseña a validar: ', (password) => {
    try {
      const result = generator.validateStrength(password);

      console.log('\n📊 Análisis de Fortaleza:');
      console.log(`   Nivel: ${result.level}`);
      console.log(`   Puntuación: ${result.score}/7`);
      console.log('\n   Características:');
      console.log(`   - Longitud: ${result.details.length} caracteres`);
      console.log(
        `   - Minúsculas: ${result.details.hasLowercase ? '✓' : '✗'}`
      );
      console.log(
        `   - Mayúsculas: ${result.details.hasUppercase ? '✓' : '✗'}`
      );
      console.log(`   - Números: ${result.details.hasNumbers ? '✓' : '✗'}`);
      console.log(`   - Símbolos: ${result.details.hasSymbols ? '✓' : '✗'}`);
    } catch (error) {
      console.log(`\n❌ Error: ${error.message}`);
    }

    askContinue();
  });
}

function askContinue() {
  rl.question('\n¿Deseas realizar otra operación? (s/n): ', (answer) => {
    if (answer.toLowerCase() === 's') {
      main();
    } else {
      console.log('\n👋 ¡Hasta luego! Mantén tus contraseñas seguras.\n');
      rl.close();
    }
  });
}

function showHistory() {
  const history = generator.getHistory(10);

  if (history.length === 0) {
    console.log('\n📭 No hay contraseñas en el historial aún.');
    askContinue();
    return;
  }

  console.log('\n📜 Historial de Contraseñas Generadas (últimas 10):\n');
  console.log('─'.repeat(80));

  history.forEach((entry, index) => {
    const date = new Date(entry.timestamp);
    const timeStr = date.toLocaleTimeString();
    console.log(`${index + 1}. ${entry.password}`);
    console.log(`   Longitud: ${entry.length} | Fortaleza: ${entry.strength} | Hora: ${timeStr}`);
    console.log('─'.repeat(80));
  });

  askContinue();
}

function showStats() {
  const stats = generator.getHistoryStats();

  if (stats.total === 0) {
    console.log('\n📊 No hay estadísticas disponibles. Genera algunas contraseñas primero.');
    askContinue();
    return;
  }

  console.log('\n📊 Estadísticas del Historial:\n');
  console.log(`   Total generadas: ${stats.total}`);
  console.log(`   Longitud promedio: ${stats.averageLength} caracteres`);
  console.log('\n   Distribución por fortaleza:');
  console.log(`   🟢 Fuertes: ${stats.strongCount} (${Math.round(stats.strongCount/stats.total*100)}%)`);
  console.log(`   🟡 Moderadas: ${stats.moderateCount} (${Math.round(stats.moderateCount/stats.total*100)}%)`);
  console.log(`   🔴 Débiles: ${stats.weakCount} (${Math.round(stats.weakCount/stats.total*100)}%)`);

  askContinue();
}

function main() {
  showMenu();

  rl.question('Selecciona una opción (1-8): ', (option) => {
    switch(option) {
    case '1':
      generateSimple();
      break;
    case '2':
      generateCustom();
      break;
    case '3':
      generateMultiple();
      break;
    case '4':
      validatePassword();
      break;
    case '5':
      showHistory();
      break;
    case '6':
      showStats();
      break;
    case '7':
      generator.clearHistory();
      console.log('\n✅ Historial limpiado exitosamente.');
      askContinue();
      break;
    case '8':
      console.log('\n👋 ¡Hasta luego! Mantén tus contraseñas seguras.\n');
      rl.close();
      break;
    default:
      console.log('\n❌ Opción no válida');
      askContinue();
    }
  });
}

// Iniciar la aplicación
main();
