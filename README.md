Sistema de Gestión de Suscripciones Premium y Facturación

Este es un backend de simulación desarrollado en TypeScript que demuestra una arquitectura limpia, los principios SOLID y patrones de diseño clave para gestionar el registro de usuarios, planes de suscripción, pagos y notificaciones basadas en eventos.

🛠️ Arquitectura y Patrones de Diseño

El sistema implementa los siguientes patrones:

1. Singleton (Creacional)
   InMemoryDatabase: Garantiza una única instancia accesible globalmente para la configuración y el almacenamiento de datos en memoria.
2. Factory Method (Creacional)
   NotificationFactory: Crea el canal de notificación adecuado (Email, SMS, Push) según las preferencias del usuario.
   SubscriptionPlanFactory: Genera dinámicamente distintos tipos de planes de suscripción (Free, Premium, Enterprise).
3. Repository (Estructural)
   Las interfaces IUserRepository e ISubscriptionRepository abstraen las operaciones de acceso a datos y son implementadas mediante repositorios concretos en memoria.
4. Observer (Comportamiento)
   PaymentService actúa como el Sujeto (Subject). Cuando un pago se realiza correctamente, notifica a los Observadores (Observers) registrados:
   EmailNotificationObserver: Genera notificaciones utilizando la fábrica de preferencias.
   MetricsServiceObserver: Actualiza las métricas y estadísticas del sistema (ingresos, cantidad de pagos, etc.).
   AccessControlObserver: Actualiza la configuración de acceso del usuario otorgándole privilegios premium.
5. Modelo-Vista-Controlador (MVC)
   Modelos (Models): Definen las entidades de datos: User, Subscription, SubscriptionPlan, Invoice.
   Controladores (Controllers): UserController, SubscriptionController y PaymentController procesan las entradas de las vistas y coordinan los servicios de negocio.
   Vistas (Views): CLIView muestra los resultados formateados en la terminal, simulando el flujo de trabajo de los usuarios.
   ⚖️ Lista de Verificación de Cumplimiento SOLID
   S — Single Responsibility Principle (Responsabilidad Única)
   Los modelos únicamente representan entidades y almacenan estado.
   Los repositorios gestionan la persistencia de datos.
   Los servicios ejecutan la lógica de negocio.
   Los controladores coordinan las entradas y salidas del sistema.
   O — Open/Closed Principle (Abierto/Cerrado)
   Se pueden agregar nuevos canales de notificación (por ejemplo, WhatsApp) o nuevos observadores de pagos creando nuevas clases que implementen los contratos existentes, sin modificar la lógica principal.
   L — Liskov Substitution Principle (Sustitución de Liskov)
   FreePlan, PremiumPlan y EnterprisePlan heredan de SubscriptionPlan y pueden utilizarse indistintamente donde se espere un SubscriptionPlan.
   I — Interface Segregation Principle (Segregación de Interfaces)
   Los contratos de repositorios, canales de notificación (INotificationChannel) y observadores (IPaymentObserver) son pequeños, específicos y enfocados en una única responsabilidad.
   D — Dependency Inversion Principle (Inversión de Dependencias)
   Los componentes principales del negocio no dependen de clases concretas.
   En su lugar, dependen de abstracciones como IUserRepository e ISubscriptionRepository, las cuales se inyectan durante la ejecución.
   🚀 Cómo Ejecutar el Proyecto
   Ejecución Local (Node.js y npm)
   Instalar las dependencias:
   npm install
   Ejecutar la demostración automática:
   npm start
   Ejecución con Docker

Para compilar y ejecutar el proyecto dentro de un contenedor Docker:

# Construir la imagen Docker

docker build -t subscription-billing-system .

# Ejecutar el contenedor

# (muestra todo el flujo de demostración y luego finaliza)

docker run --rm subscription-billing-system

También puede ejecutarse utilizando Docker Compose:

docker-compose up --build
