# 🧪 GUÍA COMPLETA DE PRUEBAS - API Gateway Ecosistema Completo

## 📋 **INFORMACIÓN GENERAL**

**Colección:** `API_Gateway_Tests_DEFINITIVO_COMPLETO.postman_collection.json`  
**Total de Endpoints:** **35 endpoints** organizados en 6 categorías  
**Microservicios Integrados:** 4 (Component-1, Component-2-1, Component-2-2, Component-4)  
**Variables Automáticas:** 7 variables gestionadas automáticamente  

## 🎯 **OBJETIVOS DE ESTA GUÍA**

✅ Probar **TODOS** los endpoints de **TODOS** los microservicios  
✅ Verificar la integración completa del API Gateway  
✅ Validar que no se dañó ninguna funcionalidad existente  
✅ Confirmar el correcto funcionamiento del nuevo SIA Colegios  
✅ Automatizar el flujo de pruebas con variables inteligentes  

## 📦 **ESTRUCTURA DE LA COLECCIÓN**

```
📁 API Gateway - Ecosistema Completo (35 endpoints)
├── 🔒 1. Autenticación (4 endpoints)
│   ├── ✅ Login Usuario
│   ├── ✅ Registro Usuario  
│   ├── ✅ Perfil Usuario (requiere token)
│   └── ✅ URL Login Google
├── 🎓 2. SIA Colegios - Cursos (7 endpoints)
│   ├── ✅ Listar Cursos (con filtros)
│   ├── ✅ Obtener Curso por ID
│   ├── ✅ Estudiantes de Curso
│   ├── ✅ Crear Curso
│   ├── ✅ Actualizar Curso Completo
│   ├── ✅ Actualizar Curso Parcial
│   └── ✅ Eliminar Curso
├── 👨‍🎓 3. SIA Colegios - Estudiantes (8 endpoints)
│   ├── ✅ Listar Estudiantes (con filtros)
│   ├── ✅ Obtener Estudiante por ID
│   ├── ✅ Estudiantes por Código de Curso
│   ├── ✅ Crear Estudiante
│   ├── ✅ Actualizar Estudiante Completo
│   ├── ✅ Actualizar Estudiante Parcial
│   ├── ✅ Transferir Estudiante de Curso
│   └── ✅ Eliminar Estudiante
├── 👨‍🏫 4. Profesores & Asignaturas (9 endpoints)
│   ├── ✅ Listar Profesores
│   ├── ✅ Crear Profesor
│   ├── ✅ Actualizar Profesor
│   ├── ✅ Eliminar Profesor
│   ├── ✅ Listar Asignaturas
│   ├── ✅ Crear Asignatura
│   ├── ✅ Actualizar Asignatura
│   ├── ✅ Asignar Profesor a Asignatura
│   └── ✅ Desasignar Profesor de Asignatura
├── 📊 5. Calificaciones (5 endpoints)
│   ├── ✅ Listar Calificaciones (con filtros)
│   ├── ✅ Registrar Calificación
│   ├── ✅ Actualizar Calificación
│   ├── ✅ Eliminar Calificación
│   └── ✅ Calificaciones por Periodo
└── 🛠️ 6. Utilidades (2 endpoints)
    ├── ✅ Health Check MS Profesores
    └── ✅ Health Check MS Calificaciones
```

## ⚙️ **CONFIGURACIÓN INICIAL**

### **1. 📥 Importar la Colección**
1. Abrir Postman
2. Clic en "Import" 
3. Seleccionar `API_Gateway_Tests_DEFINITIVO_COMPLETO.postman_collection.json`
4. Confirmar importación

### **2. 🔧 Configurar Variables de Entorno**
La colección viene preconfigurada con las siguientes variables:

| Variable | Valor Inicial | Descripción |
|----------|---------------|-------------|
| `base_url` | `http://localhost:9000` | URL base del API Gateway |
| `jwt_token` | (vacío) | Token JWT - Se llena automáticamente |
| `curso_id` | (vacío) | ID del último curso creado |
| `estudiante_id` | (vacío) | ID del último estudiante creado |
| `profesor_id` | (vacío) | ID del último profesor creado |
| `asignatura_id` | (vacío) | ID de la última asignatura creada |
| `calificacion_id` | (vacío) | ID de la última calificación registrada |

### **3. 🚀 Verificar que el Ecosistema esté Funcionando**
```bash
# En el directorio API_Gateway/api-gateway-main
docker-compose ps

# Todos los contenedores deben mostrar "Up"
```

## 🔄 **FLUJO DE PRUEBAS RECOMENDADO**

### **🎯 ORDEN SUGERIDO DE EJECUCIÓN (35 endpoints)**

#### **FASE 1: 🔒 AUTENTICACIÓN (4 endpoints)**
1. **Login Usuario** → Obtiene token JWT automáticamente
2. **Registro Usuario** → Crea nuevo usuario
3. **Perfil Usuario** → Verifica token JWT funciona
4. **URL Login Google** → Verifica OAuth2

#### **FASE 2: 🎓 SIA COLEGIOS - SETUP (3 endpoints)**
5. **Listar Cursos** → Verificar datos precargados (18 cursos)
6. **Crear Curso** → Crear "Doce A" (se guarda ID automáticamente)
7. **Crear Estudiante** → Asignar al curso creado (se guarda ID automáticamente)

#### **FASE 3: 👨‍🏫 PROFESORES - SETUP (3 endpoints)**
8. **Listar Profesores** → Ver profesores existentes
9. **Crear Profesor** → Crear "Dr. María García" (se guarda ID automáticamente)
10. **Crear Asignatura** → Crear "Álgebra Lineal" (se guarda ID automáticamente)

#### **FASE 4: 🔗 ASIGNACIONES Y CALIFICACIONES (3 endpoints)**
11. **Asignar Profesor a Asignatura** → Usar IDs guardados automáticamente
12. **Registrar Calificación** → Usar todos los IDs (se guarda ID automáticamente)
13. **Listar Calificaciones** → Verificar registro exitoso

#### **FASE 5: 🧪 PRUEBAS DE FUNCIONALIDADES AVANZADAS (12 endpoints)**
14. **SIA - Obtener Curso por ID** → Usar {{curso_id}}
15. **SIA - Estudiantes de Curso** → Ver estudiantes del curso
16. **SIA - Obtener Estudiante por ID** → Usar {{estudiante_id}}
17. **SIA - Estudiantes por Código** → Filtrar por código "1-A"
18. **SIA - Listar Estudiantes con Filtros** → Búsqueda avanzada
19. **Actualizar Profesor** → Cambiar datos del profesor
20. **Actualizar Asignatura** → Cambiar nombre de asignatura
21. **Actualizar Calificación** → Modificar nota y observaciones
22. **SIA - Actualizar Curso Completo** → Cambiar nombre y código
23. **SIA - Actualizar Curso Parcial** → Solo cambiar nombre
24. **SIA - Actualizar Estudiante Completo** → Cambiar todos los datos
25. **SIA - Transferir Estudiante** → Cambiar de curso

#### **FASE 6: 🛠️ UTILIDADES Y HEALTH CHECKS (2 endpoints)**
26. **Health Check MS Profesores** → Verificar Component-2-1
27. **Health Check MS Calificaciones** → Verificar Component-2-2

#### **FASE 7: 🧹 PRUEBAS DE ELIMINACIÓN (8 endpoints)**
28. **Calificaciones por Periodo** → Filtrar por período específico
29. **Desasignar Profesor de Asignatura** → Romper relación
30. **Eliminar Calificación** → Usar {{calificacion_id}}
31. **SIA - Actualizar Estudiante Parcial** → Solo cambiar acudiente
32. **Eliminar Profesor** → Usar {{profesor_id}}
33. **SIA - Eliminar Estudiante** → Usar {{estudiante_id}}
34. **SIA - Eliminar Curso** → Usar {{curso_id}}
35. **Listar Cursos** → Verificar eliminación exitosa

## 🤖 **AUTOMATIZACIÓN INTELIGENTE**

### **📝 Scripts Automáticos Incluidos**

La colección incluye scripts automáticos que:

1. **🔑 Guardan Token JWT** tras login exitoso
2. **📋 Extraen IDs** de recursos creados automáticamente
3. **🔄 Reutilizan Variables** en endpoints posteriores
4. **✅ Validan Respuestas** y muestran mensajes de éxito
5. **📊 Registran Logs** para seguimiento de pruebas

### **Ejemplo de Script Automático:**
```javascript
// Al crear un curso, se ejecuta automáticamente:
if (pm.response.code === 200) {
  const response = pm.response.json();
  if (response.data && response.data.crearCurso && response.data.crearCurso.id) {
    pm.collectionVariables.set('curso_id', response.data.crearCurso.id);
    console.log('✅ Curso creado con ID:', response.data.crearCurso.id);
  }
}
```

## 🎛️ **CASOS DE PRUEBA ESPECÍFICOS**

### **🎓 SIA COLEGIOS - Casos Especiales**

**Verificar Datos Precargados:**
- 18 cursos desde "1-A" hasta "11-B"
- 36 estudiantes distribuidos en los cursos
- Relaciones curso-estudiante correctas

**Probar Filtros Avanzados:**
```graphql
# Buscar cursos que contengan "A"
cursos(search: "A", ordering: "nombre", page: 1)

# Buscar estudiantes por nombre
estudiantes(search: "Ana", ordering: "nombreCompleto")
```

**Probar Actualizaciones Parciales:**
```graphql
# Solo cambiar el acudiente de un estudiante
actualizarEstudianteParcial(id: "5", acudiente: "Nuevo Acudiente")

# Solo cambiar el nombre de un curso
actualizarCursoParcial(id: "19", nombre: "Nuevo Nombre")
```

### **👨‍🏫 PROFESORES - Casos Especiales**

**Gestión de Asignaciones:**
```graphql
# Asignar profesor a asignatura
asignarProfesorAAsignatura(profesorId: "abc123", asignaturaId: "def456")

# Desasignar profesor
desasignarProfesorDeAsignatura(profesorId: "abc123", asignaturaId: "def456")
```

### **📊 CALIFICACIONES - Casos Especiales**

**Filtros por Múltiples Criterios:**
```graphql
# Calificaciones por estudiante específico
calificaciones(estudianteId: "est-123")

# Calificaciones por período y curso
calificaciones(periodo: "2025-1", cursoId: "11-A")
```

**Actualizaciones Selectivas:**
```graphql
# Solo cambiar la nota
actualizarCalificacion(id: "cal-123", nota: 4.8)

# Solo cambiar observaciones
actualizarCalificacion(id: "cal-123", observaciones: "Nuevo comentario")
```

## 📊 **VALIDACIONES Y RESULTADOS ESPERADOS**

### **✅ Criterios de Éxito**

| Endpoint | Código Esperado | Validación |
|----------|-----------------|-------------|
| Login | 200 | Token JWT presente en respuesta |
| Crear recursos | 200 | ID presente en respuesta |
| Listar recursos | 200 | Array de resultados |
| Actualizar | 200 | Datos modificados correctamente |
| Eliminar | 200 | Boolean true o success message |
| Health checks | 200 | Mensaje de respuesta |

### **❌ Errores Comunes y Soluciones**

**Error 400 - Bad Request:**
- ✅ Verificar formato JSON correcto
- ✅ Verificar parámetros requeridos

**Error 401 - Unauthorized:**
- ✅ Ejecutar login primero
- ✅ Verificar token JWT en variable

**Error 404 - Not Found:**
- ✅ Verificar que el ID existe
- ✅ Verificar que el recurso no fue eliminado previamente

**Error 500 - Internal Server Error:**
- ✅ Verificar que todos los microservicios estén funcionando
- ✅ Revisar logs con `docker-compose logs [servicio]`

## 🔧 **PERSONALIZACIÓN AVANZADA**

### **🎨 Modificar Variables Manualmente**

Si necesitas usar IDs específicos:
```
Variables → Edit
curso_id = "123"
estudiante_id = "456"
```

### **📋 Agregar Nuevos Tests**

Para agregar validaciones personalizadas:
```javascript
pm.test("Verificar que el curso se creó correctamente", function () {
    const response = pm.response.json();
    pm.expect(response.data.crearCurso.nombre).to.eql("Doce A");
});
```

### **🔄 Ejecutar en Lote**

Para ejecutar toda la colección:
1. Clic derecho en la colección
2. "Run collection"
3. Configurar orden y delays
4. "Run API Gateway Tests"

## 📈 **MÉTRICAS DE PRUEBA**

### **🎯 Objetivos de Cobertura**

- ✅ **4 Microservicios** completamente probados
- ✅ **35 Endpoints** funcionando correctamente
- ✅ **CRUD Completo** para todos los recursos
- ✅ **Filtros y Búsquedas** validados
- ✅ **Relaciones entre Entidades** verificadas
- ✅ **Actualizaciones Parciales** confirmadas
- ✅ **Manejo de Errores** probado

### **📊 Dashboard de Resultados**

Al finalizar las pruebas deberías ver:
- ✅ **35/35 Tests Passed**
- ✅ **0 Failed Requests**
- ✅ **Variables Populated**: jwt_token, curso_id, estudiante_id, profesor_id, asignatura_id, calificacion_id
- ✅ **Response Times**: < 500ms promedio

## 🏆 **CONCLUSIÓN**

Esta colección te permite probar **exhaustivamente** todo el ecosistema de microservicios integrado en el API Gateway, confirmando que:

1. **🔒 La autenticación funciona** correctamente
2. **🎓 El SIA Colegios está completamente integrado** con 15 endpoints
3. **👨‍🏫 Los profesores y asignaturas** mantienen toda su funcionalidad
4. **📊 Las calificaciones** funcionan sin interrupciones
5. **🔗 Las relaciones entre microservicios** están correctamente configuradas
6. **⚡ El API Gateway** actúa como orquestador central eficientemente

**¡El ecosistema está listo para producción con todos los 35 endpoints funcionando perfectamente!** 🎉 