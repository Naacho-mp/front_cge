# Sistema de Gestión de Clientes, Medidores, Lecturas y Boletas CGE - Universidad Católica del Maule

Este proyecto es una aplicación web de front-end desarrollada con Angular, orientada a la gestión integral de clientes, medidores eléctricos, 
lecturas de consumo y generación de boletas. Permite a los usuarios interactuar con un backend a través de APIs REST, realizando operaciones de creación, 
consulta, actualización y eliminación (CRUD) según los permisos de cada entidad.

## Instrucciones para la puesta en funcionamiento del Proyecto CGE
- Descarga del proyecto via GitHub a través del siguiente Link: 
- Abrir el proyecto en el IDE a elección
- Ubicarse en la raiz del proyecto, e ingresar la instruccion "npm install" para instalar dependencias necesarias
- Correr el proyecto mediante el comando "ng serve"
- Verificar funcionamiento


## Estructura del proyecto

- components/boleta-data/cliente-data/etc: Contiene los componentes a utilizar en el proyecto (Clientes, Medidores, Lecturas, Boletas y sus listados).
- environment/: Configuraciones de url de la api. 
- models/: Contiene los form-models para el modelado de datos, e interfaces de lecturas, clientes y medidores.
- pages/home: Configuraciones pagina principal y manejo de demas componentes.
- services/: Carpeta contenedora de servicios para interactuar con la API del backend y servicios para localStorage de filtros rut y codigo medidor.


## Funcionalidades principales del Proyecto

### Clientes
- Registro de clientes con información básica: RUT, razón social, contacto, dirección y estado.
- Listado y búsqueda de clientes existentes por RUT.
- Actualización y eliminación de clientes.

### Medidores
- Registro de medidores  asociados a clientes existentes.
- Control de estado y dirección de suministro.
- Listado y actualización de medidores.
- Eliminación de medidores con gestión de relaciones dependientes (lecturas).

### Lecturas de consumo
- Registro de lecturas de consumo mensual y por año segun medidor.
- Visualización de lecturas.
- Validaciones de lecturas únicas por medidor y mes/año.

### Boletas
- Generación de boletas mensuales para clientes en base al consumo de sus medidores.
- Cálculo automático de consumo total, tarifa, cargos, IVA y total a pagar.
- Descarga de boletas en formato PDF.
- Consulta de boletas por cliente y período(año y mes).

## Arquitectura y Consideraciones
- Utiliza Angular Standalone Components, formularios reactivos y Observables para consumir APIs.
- Las relaciones entre entidades (Cliente → Medidores → Lecturas) permiten acceder a los objetos relacionados sin duplicar información en la base de datos.
- Uso de UUIDs para identificar clientes de forma única.
- Gestión de dependencias y cascada de eliminaciones para mantener la integridad de los datos.

## Tecnologías
- Angular 15+
- TypeScript
- Bootstrap / CSS para la interfaz
- APIs REST para comunicación con el backend.


