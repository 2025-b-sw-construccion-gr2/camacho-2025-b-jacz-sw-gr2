# 📘 Proyecto_002: Documento de Construcción y Evolución de Software

## 1. Portada

**Nombre del estudiante:** Julián Camacho

**Nombre del proyecto:** FitTrack Pro

**Fecha de entrega:** 31 de enero de 2026

---

## 2. Introducción

FitTrack Pro constituye una plataforma web desarrollada para abordar la problemática del seguimiento desorganizado de rutinas de ejercicio y alimentación. Esta herramienta digital facilita el registro sistemático de sesiones de entrenamiento, visualización de avances a través de métricas gráficas, definición de objetivos fitness individualizados y mantenimiento de un historial nutricional detallado. La finalidad principal es impulsar hábitos saludables mediante el seguimiento constante del rendimiento deportivo.

Este documento tiene como propósito exponer las metodologías empleadas en el proceso de desarrollo y mantenimiento del software. Se presenta la estructura arquitectónica implementada, los procesos automatizados de CI/CD, las convenciones de trabajo con control de versiones, el manejo de requerimientos funcionales y los procedimientos de validación de código que rigen el ciclo de vida del proyecto.

---

## 3. Arquitectura del Proyecto

FitTrack Pro implementa una arquitectura cliente-servidor tradicional distribuida en capas, estructurada mediante los siguientes componentes:

- **Capa de Presentación:** Desarrollada mediante tecnologías JSP combinadas con HTML y CSS para la renderización de interfaces de usuario.
- **Capa de Aplicación:** Construida sobre Java empleando el patrón Servlet junto con Java Persistence API (JPA) para orquestar la lógica empresarial.
- **Capa de Persistencia:** Utiliza motor de base de datos H2 para gestionar el almacenamiento persistente de perfiles de usuario, registros de actividad física, indicadores de rendimiento y bitácora nutricional.
- **Protocolo de Comunicación:** Transferencia de datos mediante el protocolo HTTP estándar.

### Estrategia de integración

La interfaz JSP establece comunicación con la capa de aplicación Java a través del protocolo HTTP, siendo los Servlets los responsables de recibir y procesar dichas solicitudes. La capa de aplicación ejecuta reglas de negocio asociadas al tracking de ejercicios, cálculo de métricas y gestión de información nutricional, delegando en JPA las operaciones de acceso a datos en H2. El artefacto final se compila como paquete WAR para su posterior publicación en la infraestructura de Azure App Service.

**Descripción del flujo técnico:**

Las vistas JSP generan peticiones HTTP hacia endpoints específicos manejados por Servlets Java. Estos componentes procesan la lógica relacionada con estadísticas de entrenamiento, evolución de indicadores corporales y control de dietas, accediendo a la persistencia mediante el framework JPA que abstrae las operaciones sobre la base de datos embebida H2.

---

## 4. Estrategia de Pipelines (CI/CD)

### Pipeline de Integración Continua

Se ha configurado un flujo automatizado de integración mediante Azure Pipelines que se dispara de forma automática cuando se detectan modificaciones en el repositorio central.

Las etapas contempladas en el pipeline CI son:

1. Clonado del código fuente desde Azure Repos.
2. Verificación de integridad y consistencia del proyecto.
3. Proceso de build automatizado empleando Apache Maven.
4. Batería de tests unitarios para validación funcional.
5. Construcción del paquete WAR distribuible.

Esta automatización facilita la identificación prematura de defectos y garantiza la integridad del código tras cada integración.

### Pipeline de Entrega Continua

El flujo de despliegue continuo toma como entrada el artefacto WAR previamente generado y validado. La publicación hacia el ambiente productivo en Azure App Service ocurre automáticamente una vez superadas todas las verificaciones del pipeline de integración.

**Descripción del proceso automatizado:**

Al efectuarse cualquier modificación en el repositorio, se activa automáticamente una secuencia que realiza la compilación del código, ejecuta la suite de pruebas automatizadas y produce el artefacto deployable. Tras completarse exitosamente estas fases, el sistema ejecuta el despliegue de forma autónoma hacia la infraestructura configurada en Azure App Service.

---

## 5. Estrategia de Flujos de Desarrollo

El proyecto implementa una metodología de ramificación Git que posibilita un desarrollo estructurado y trazable:

- **main:** Alberga exclusivamente código productivo y estable.
- **develop:** Centraliza la integración progresiva de nuevos desarrollos.
- **feature/*:** Branches aislados donde se implementan requerimientos funcionales específicos.
- **hotfix/*:** Ramas de emergencia para parches críticos en producción.

**Descripción de la dinámica de trabajo:**

Los desarrollos de nuevas características se llevan a cabo en branches aislados tipo feature/*. Al completar la implementación, se procede a fusionar estos cambios hacia la rama develop mediante pull requests. Este esquema asegura que la rama main preserve únicamente versiones validadas y estables del sistema.

---

## 6. Gestión de Historias de Usuario

Los requerimientos funcionales se documentan siguiendo la estructura narrativa estándar:

**Como** [tipo de usuario], **quiero** [acción o funcionalidad], **para** [objetivo o beneficio].

### Ejemplo

Como atleta amateur, quiero documentar mis sesiones de entrenamiento incluyendo tipo de ejercicio, duración y calorías quemadas, para poder analizar mi evolución física a través de reportes gráficos semanales y mensuales.

### Gestión en Azure DevOps Boards

El tracking de requerimientos se realiza mediante la plataforma Azure DevOps Boards. Cada historia de usuario se registra como work item, asignándole nivel de prioridad, encargado responsable y asociación con iteraciones de desarrollo de duración predefinida.

---

## 7. Estrategia de Revisiones y Aprobaciones

La incorporación de modificaciones al código base se efectúa mediante un proceso de revisión riguroso que salvaguarda la calidad técnica y el cumplimiento de especificaciones.

Todo cambio propuesto debe satisfacer los siguientes requisitos de aceptación:

### Checklist de revisión

- [ ] Adherencia a las convenciones de codificación establecidas.
- [ ] Superación exitosa de la batería de tests unitarios.
- [ ] Conformidad de la implementación con las especificaciones del requerimiento.
- [ ] Actualización de la documentación técnica cuando sea pertinente.

Este mecanismo de validación contribuye a minimizar la introducción de defectos y preservar la estabilidad operativa del sistema a lo largo de su evolución.

---

## 8. Herramientas y Conexiones

El ecosistema tecnológico empleado en el desarrollo comprende:

- **Azure DevOps Boards:** Plataforma para administración de work items y backlog.
- **Azure Repos:** Sistema de control de versiones Git centralizado.
- **Azure Pipelines:** Motor de automatización para integración continua.
- **Azure Releases:** Orquestador de despliegues automatizados.
- **Microsoft Teams:** Canal de comunicación sincrónica del equipo.

**Descripción del ecosistema integrado:**

La suite Azure DevOps establece conectividad entre la gestión de requerimientos, el versionamiento de código y los procesos de automatización CI/CD. Esta integración posibilita trazabilidad completa desde las especificaciones funcionales hasta las releases desplegadas en producción.

---

## 9. Conclusiones

La implementación de FitTrack Pro demuestra la aplicación efectiva de metodologías modernas de ingeniería de software. El diseño arquitectónico por capas establecido facilitó una segregación clara de responsabilidades entre presentación, lógica de negocio y persistencia, optimizando tanto la mantenibilidad como la escalabilidad del sistema.

La adopción de pipelines automatizados de CI/CD representó un factor determinante para asegurar la calidad del producto final, al sistematizar operaciones críticas como compilación, validación mediante tests y publicación en ambiente productivo. Estas prácticas posibilitaron la detección temprana de anomalías y garantizaron que cada versión desplegada cumpliera con los estándares funcionales y de estabilidad requeridos.

Por último, la implementación de workflows de desarrollo estructurados mediante branching, complementada con gestión formal de historias de usuario y revisiones sistemáticas de código, propició una evolución controlada y predecible del proyecto. Este conjunto de estrategias establece un marco sólido que garantiza trazabilidad end-to-end, calidad sostenida y una plataforma robusta para incorporar mejoras futuras al sistema.