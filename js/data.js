/**
 * Base de Datos y Configuración Inicial para el Colegio María Currea Manrique I.E.D.
 * Escala de Calificaciones: 1.0 a 5.0
 * Nota Mínima Aprobatoria: 3.4
 */

const STORAGE_KEY = 'SIGACE_MARIA_CURREA_DATA_V1';

const INITIAL_DATA = {
    school: {
        name: "Colegio María Currea Manrique I.E.D.",
        shortName: "Currea Manrique",
        dane: "111001099234",
        motto: "Respeto • Autonomía • Justicia",
        scale: {
            min: 1.0,
            max: 5.0,
            passingMin: 3.4,
            levels: [
                { name: "Desempeño Superior", min: 4.6, max: 5.0, color: "#16a34a", bg: "#dcfce7", badge: "badge-superior" },
                { name: "Desempeño Alto", min: 4.0, max: 4.5, color: "#2563eb", bg: "#dbeafe", badge: "badge-alto" },
                { name: "Desempeño Básico", min: 3.4, max: 3.9, color: "#d97706", bg: "#fef3c7", badge: "badge-basico" },
                { name: "Desempeño Bajo (PEE / Reprobado)", min: 1.0, max: 3.3, color: "#dc2626", bg: "#fee2e2", badge: "badge-bajo" }
            ]
        },
        currentPeriod: 3,
        academicYear: 2026
    },
    salones: [
        { id: "901", name: "Grado 901", jornada: "Mañana", director: "Carlos Restrepo" },
        { id: "902", name: "Grado 902", jornada: "Mañana", director: "Marta Gómez" },
        { id: "1001", name: "Grado 1001", jornada: "Mañana", director: "Hernán Salazar" }
    ],
    materias: [
        { id: "mat", name: "Matemáticas", icon: "📐", teacherId: "prof_carlos", creditos: 4 },
        { id: "esp", name: "Lengua Castellana", icon: "📚", teacherId: "prof_marta", creditos: 4 },
        { id: "ing", name: "Idioma Extranjero: Inglés", icon: "🌍", teacherId: "prof_marta", creditos: 3 },
        { id: "cie", name: "Ciencias Naturales y Biología", icon: "🔬", teacherId: "prof_hernan", creditos: 4 },
        { id: "soc", name: "Ciencias Sociales e Historia", icon: "🏛️", teacherId: "prof_clara", creditos: 3 },
        { id: "tec", name: "Tecnología e Informática", icon: "💻", teacherId: "prof_carlos", creditos: 2 },
        { id: "art", name: "Educación Artística", icon: "🎨", teacherId: "prof_clara", creditos: 2 },
        { id: "eduf", name: "Educación Física y Deportes", icon: "⚽", teacherId: "prof_hernan", creditos: 2 }
    ],
    teachers: [
        {
            id: "prof_carlos",
            email: "prof.carlos@mariacurrea.edu.co",
            password: "docente123",
            name: "Lic. Carlos Restrepo",
            cargo: "Docente de Matemáticas y Tecnología",
            directorOf: "901",
            phone: "312 458 9012",
            subjects: ["mat", "tec"],
            salones: ["901", "1001"]
        },
        {
            id: "prof_marta",
            email: "prof.marta@mariacurrea.edu.co",
            password: "docente123",
            name: "Lic. Marta Gómez",
            cargo: "Docente de Humanidades e Inglés",
            directorOf: "902",
            phone: "315 889 1234",
            subjects: ["esp", "ing"],
            salones: ["901", "902"]
        },
        {
            id: "prof_hernan",
            email: "prof.hernan@mariacurrea.edu.co",
            password: "docente123",
            name: "Lic. Hernán Salazar",
            cargo: "Docente de Ciencias Naturales y Ed. Física",
            directorOf: "1001",
            phone: "318 721 5463",
            subjects: ["cie", "eduf"],
            salones: ["901", "1001"]
        },
        {
            id: "prof_clara",
            email: "prof.clara@mariacurrea.edu.co",
            password: "docente123",
            name: "Lic. Clara Inés Peña",
            cargo: "Docente de Sociales y Artes",
            directorOf: null,
            phone: "310 994 3321",
            subjects: ["soc", "art"],
            salones: ["901"]
        }
    ],
    students: [
        {
            id: "est_juan",
            email: "est.juan@mariacurrea.edu.co",
            password: "estudiante123",
            name: "Juan Camilo Parra",
            salon: "901",
            code: "2026-901-01",
            photo: "👨‍🎓",
            grades: {
                mat: { p1: 2.5, p2: 3.0, p3: 2.8, def: 2.8 },
                esp: { p1: 3.8, p2: 3.5, p3: 3.6, def: 3.6 },
                ing: { p1: 3.0, p2: 3.2, p3: 3.1, def: 3.1 },
                cie: { p1: 3.6, p2: 3.4, p3: 3.5, def: 3.5 },
                soc: { p1: 3.7, p2: 3.8, p3: 3.6, def: 3.7 },
                tec: { p1: 4.2, p2: 4.0, p3: 4.1, def: 4.1 },
                art: { p1: 4.0, p2: 4.2, p3: 4.0, def: 4.1 },
                eduf: { p1: 4.5, p2: 4.6, p3: 4.5, def: 4.5 }
            },
            pee: {
                mat: {
                    status: "En Plan de Nivelación (PEE Activo)",
                    motivo: "Dificultad evidente en factorización y resolución de problemas algebraicos. No presentó a tiempo la Guía #3 ni la sustentación oral.",
                    planAccion: "Desarrollo del Taller Remedial N° 2 (Ecuaciones de 1er y 2do grado). Presentar sustentación escrita el 28 de Octubre en el aula 204.",
                    fechaLimite: "2026-10-28",
                    docente: "Carlos Restrepo",
                    compromisoAcudiente: "Acompañar 1 hora diaria de repaso en casa y firmar el cuaderno pedagógico."
                },
                ing: {
                    status: "En Plan de Nivelación (PEE Activo)",
                    motivo: "Omisión del proyecto oral sobre profesiones y bajo puntaje en vocabulario irregular (Pasado Simple).",
                    planAccion: "Entrega de portafolio de redacciones corregidas y audio de lectura en inglés de 2 minutos.",
                    fechaLimite: "2026-10-30",
                    docente: "Marta Gómez",
                    compromisoAcudiente: "Verificar la entrega del material en las fechas acordadas institucionalmente."
                }
            },
            observacionesConvivencia: "Estudiante respetuoso y participativo. Requiere mayor constancia en entrega puntual de compromisos extra-clase."
        },
        {
            id: "est_valentina",
            email: "est.valentina@mariacurrea.edu.co",
            password: "estudiante123",
            name: "Valentina Moreno Beltrán",
            salon: "901",
            code: "2026-901-02",
            photo: "👩‍🎓",
            grades: {
                mat: { p1: 4.8, p2: 4.9, p3: 4.7, def: 4.8 },
                esp: { p1: 4.9, p2: 5.0, p3: 4.8, def: 4.9 },
                ing: { p1: 4.7, p2: 4.6, p3: 4.8, def: 4.7 },
                cie: { p1: 4.6, p2: 4.7, p3: 4.5, def: 4.6 },
                soc: { p1: 4.8, p2: 4.9, p3: 4.8, def: 4.8 },
                tec: { p1: 5.0, p2: 5.0, p3: 4.9, def: 5.0 },
                art: { p1: 4.7, p2: 4.8, p3: 4.9, def: 4.8 },
                eduf: { p1: 4.9, p2: 4.8, p3: 4.8, def: 4.8 }
            },
            pee: {},
            observacionesConvivencia: "Excelente desempeño integral. Cuadro de honor del salón 901 y monitora de clase."
        },
        {
            id: "est_andres",
            email: "est.andres@mariacurrea.edu.co",
            password: "estudiante123",
            name: "Andrés Felipe Torres",
            salon: "901",
            code: "2026-901-03",
            photo: "👨‍🎓",
            grades: {
                mat: { p1: 3.5, p2: 3.6, p3: 3.4, def: 3.5 },
                esp: { p1: 3.8, p2: 3.7, p3: 3.8, def: 3.8 },
                ing: { p1: 3.4, p2: 3.6, p3: 3.5, def: 3.5 },
                cie: { p1: 3.6, p2: 3.5, p3: 3.6, def: 3.6 },
                soc: { p1: 3.1, p2: 2.9, p3: 3.0, def: 3.0 },
                tec: { p1: 4.0, p2: 4.2, p3: 4.1, def: 4.1 },
                art: { p1: 3.8, p2: 3.9, p3: 4.0, def: 3.9 },
                eduf: { p1: 4.4, p2: 4.5, p3: 4.3, def: 4.4 }
            },
            pee: {
                soc: {
                    status: "En Plan de Nivelación (PEE Activo)",
                    motivo: "Inasistencias justificadas que afectaron la entrega del cuadro comparativo de las Guerras Mundiales y evaluación diagnóstica.",
                    planAccion: "Elaborar mapa mental explicativo y sustentar los hechos trascendentales de la Guerra Fría.",
                    fechaLimite: "2026-10-27",
                    docente: "Clara Inés Peña",
                    compromisoAcudiente: "Revisar agenda estudiantil semanalmente."
                }
            },
            observacionesConvivencia: "Muestra actitud propositiva. Mantener el ritmo en lectura comprensiva."
        },
        {
            id: "est_sofia",
            email: "est.sofia@mariacurrea.edu.co",
            password: "estudiante123",
            name: "Sofía Ramírez Castro",
            salon: "901",
            code: "2026-901-04",
            photo: "👩‍🎓",
            grades: {
                mat: { p1: 4.2, p2: 4.3, p3: 4.4, def: 4.3 },
                esp: { p1: 4.4, p2: 4.5, p3: 4.6, def: 4.5 },
                ing: { p1: 4.1, p2: 4.3, p3: 4.2, def: 4.2 },
                cie: { p1: 4.3, p2: 4.4, p3: 4.5, def: 4.4 },
                soc: { p1: 4.0, p2: 4.2, p3: 4.1, def: 4.1 },
                tec: { p1: 4.6, p2: 4.7, p3: 4.8, def: 4.7 },
                art: { p1: 4.5, p2: 4.6, p3: 4.5, def: 4.5 },
                eduf: { p1: 4.7, p2: 4.8, p3: 4.9, def: 4.8 }
            },
            pee: {},
            observacionesConvivencia: "Destacada responsabilidad y liderazgo positivo en actividades grupales."
        },
        {
            id: "est_mateo",
            email: "est.mateo@mariacurrea.edu.co",
            password: "estudiante123",
            name: "Mateo Salazar Duque",
            salon: "901",
            code: "2026-901-05",
            photo: "👨‍🎓",
            grades: {
                mat: { p1: 2.2, p2: 2.6, p3: 2.5, def: 2.4 },
                esp: { p1: 3.4, p2: 3.5, p3: 3.4, def: 3.4 },
                ing: { p1: 2.8, p2: 3.1, p3: 2.9, def: 2.9 },
                cie: { p1: 2.7, p2: 3.0, p3: 2.8, def: 2.8 },
                soc: { p1: 3.4, p2: 3.5, p3: 3.4, def: 3.4 },
                tec: { p1: 3.6, p2: 3.5, p3: 3.7, def: 3.6 },
                art: { p1: 3.5, p2: 3.8, p3: 3.6, def: 3.6 },
                eduf: { p1: 4.0, p2: 4.2, p3: 4.1, def: 4.1 }
            },
            pee: {
                mat: {
                    status: "Alerta Crítica PEE",
                    motivo: "Persistencia en notas inferiores a 3.0 en periodos consecutivos. Vacíos en operaciones algebraicas fundamentales y desinterés en clase.",
                    planAccion: "Plan de Choque Curricular: 5 talleres con asesoría en contrajornada los martes de 2 a 4 pm y sustentación final.",
                    fechaLimite: "2026-11-05",
                    docente: "Carlos Restrepo",
                    compromisoAcudiente: "Asistencia a reunión de orientación escolar el 24 de Octubre obligatoria."
                },
                ing: {
                    status: "Alerta Crítica PEE",
                    motivo: "No presenta evaluaciones escritas ni talleres de clase.",
                    planAccion: "Guía de refuerzo integral de gramática y comprensión de lectura.",
                    fechaLimite: "2026-11-04",
                    docente: "Marta Gómez",
                    compromisoAcudiente: "Seguimiento pedagógico coordinado con rectoría."
                },
                cie: {
                    status: "Alerta Crítica PEE",
                    motivo: "Incumplimiento de informes de laboratorio de genética y evolución.",
                    planAccion: "Elaboración de informe de nivelación y maqueta conceptual del ADN.",
                    fechaLimite: "2026-11-03",
                    docente: "Hernán Salazar",
                    compromisoAcudiente: "Aporte de materiales y supervisión."
                }
            },
            observacionesConvivencia: "Citación formal a comité de convivencia y evaluación por riesgo académico reiterado."
        },
        {
            id: "est_camila",
            email: "est.camila@mariacurrea.edu.co",
            password: "estudiante123",
            name: "Camila Rodríguez Nieto",
            salon: "901",
            code: "2026-901-06",
            photo: "👩‍🎓",
            grades: {
                mat: { p1: 4.6, p2: 4.5, p3: 4.6, def: 4.6 },
                esp: { p1: 4.7, p2: 4.8, p3: 4.7, def: 4.7 },
                ing: { p1: 4.5, p2: 4.4, p3: 4.5, def: 4.5 },
                cie: { p1: 4.4, p2: 4.6, p3: 4.5, def: 4.5 },
                soc: { p1: 4.6, p2: 4.7, p3: 4.6, def: 4.6 },
                tec: { p1: 4.8, p2: 4.9, p3: 4.8, def: 4.8 },
                art: { p1: 4.6, p2: 4.7, p3: 4.8, def: 4.7 },
                eduf: { p1: 4.8, p2: 4.7, p3: 4.8, def: 4.8 }
            },
            pee: {},
            observacionesConvivencia: "Rendimiento sobresaliente y excelente espíritu de colaboración."
        },
        {
            id: "est_daniel",
            email: "est.daniel@mariacurrea.edu.co",
            password: "estudiante123",
            name: "Daniel Ochoa Morales",
            salon: "901",
            code: "2026-901-07",
            photo: "👨‍🎓",
            grades: {
                mat: { p1: 3.8, p2: 3.9, p3: 3.7, def: 3.8 },
                esp: { p1: 3.9, p2: 4.0, p3: 3.9, def: 3.9 },
                ing: { p1: 3.6, p2: 3.8, p3: 3.7, def: 3.7 },
                cie: { p1: 3.9, p2: 4.0, p3: 3.8, def: 3.9 },
                soc: { p1: 3.7, p2: 3.8, p3: 3.9, def: 3.8 },
                tec: { p1: 4.2, p2: 4.3, p3: 4.4, def: 4.3 },
                art: { p1: 3.9, p2: 4.1, p3: 4.0, def: 4.0 },
                eduf: { p1: 4.3, p2: 4.2, p3: 4.4, def: 4.3 }
            },
            pee: {},
            observacionesConvivencia: "Buen nivel de compromiso. Siempre dispuesto al aprendizaje."
        },
        {
            id: "est_mariana",
            email: "est.mariana@mariacurrea.edu.co",
            password: "estudiante123",
            name: "Mariana López Cruz",
            salon: "901",
            code: "2026-901-08",
            photo: "👩‍🎓",
            grades: {
                mat: { p1: 3.6, p2: 3.7, p3: 3.5, def: 3.6 },
                esp: { p1: 4.0, p2: 4.1, p3: 4.0, def: 4.0 },
                ing: { p1: 3.7, p2: 3.8, p3: 3.7, def: 3.7 },
                cie: { p1: 3.8, p2: 3.7, p3: 3.6, def: 3.7 },
                soc: { p1: 3.9, p2: 3.8, p3: 3.8, def: 3.8 },
                tec: { p1: 3.0, p2: 3.3, p3: 3.2, def: 3.2 },
                art: { p1: 4.2, p2: 4.3, p3: 4.4, def: 4.3 },
                eduf: { p1: 4.4, p2: 4.5, p3: 4.3, def: 4.4 }
            },
            pee: {
                tec: {
                    status: "En Plan de Nivelación (PEE Activo)",
                    motivo: "Incumplimiento en prácticas de hojas de cálculo (fórmulas avanzadas) y diagramación digital.",
                    planAccion: "Laboratorio práctico asistido de 3 ejercicios de Excel y entrega en USB o plataforma.",
                    fechaLimite: "2026-10-29",
                    docente: "Carlos Restrepo",
                    compromisoAcudiente: "Facilitar el acceso a un computador o biblioteca pública para la práctica."
                }
            },
            observacionesConvivencia: "Actitud entusiasta y cordial en el ambiente de aula."
        },
        {
            id: "est_santiago",
            email: "est.santiago@mariacurrea.edu.co",
            password: "estudiante123",
            name: "Santiago Vargas Rincón",
            salon: "901",
            code: "2026-901-09",
            photo: "👨‍🎓",
            grades: {
                mat: { p1: 4.0, p2: 4.1, p3: 4.0, def: 4.0 },
                esp: { p1: 4.2, p2: 4.1, p3: 4.2, def: 4.2 },
                ing: { p1: 4.0, p2: 3.9, p3: 4.0, def: 4.0 },
                cie: { p1: 4.1, p2: 4.2, p3: 4.1, def: 4.1 },
                soc: { p1: 4.3, p2: 4.4, p3: 4.2, def: 4.3 },
                tec: { p1: 4.4, p2: 4.5, p3: 4.6, def: 4.5 },
                art: { p1: 4.1, p2: 4.0, p3: 4.2, def: 4.1 },
                eduf: { p1: 4.6, p2: 4.7, p3: 4.8, def: 4.7 }
            },
            pee: {},
            observacionesConvivencia: "Muestra gran interés por los temas de ciencias y tecnología."
        },
        {
            id: "est_lucia",
            email: "est.lucia@mariacurrea.edu.co",
            password: "estudiante123",
            name: "Lucía Méndez Henao",
            salon: "901",
            code: "2026-901-10",
            photo: "👩‍🎓",
            grades: {
                mat: { p1: 3.1, p2: 3.3, p3: 3.2, def: 3.2 },
                esp: { p1: 3.6, p2: 3.7, p3: 3.5, def: 3.6 },
                ing: { p1: 3.5, p2: 3.4, p3: 3.5, def: 3.5 },
                cie: { p1: 3.5, p2: 3.6, p3: 3.4, def: 3.5 },
                soc: { p1: 3.6, p2: 3.5, p3: 3.6, def: 3.6 },
                tec: { p1: 3.8, p2: 3.9, p3: 3.7, def: 3.8 },
                art: { p1: 4.0, p2: 4.1, p3: 3.9, def: 4.0 },
                eduf: { p1: 4.2, p2: 4.3, p3: 4.1, def: 4.2 }
            },
            pee: {
                mat: {
                    status: "En Plan de Nivelación (PEE Activo)",
                    motivo: "Baja comprensión en teoremas de geometría euclidiana y resolución de problemas.",
                    planAccion: "Elaborar portafolio de 10 problemas resueltos con su debida justificación geométrica.",
                    fechaLimite: "2026-10-31",
                    docente: "Carlos Restrepo",
                    compromisoAcudiente: "Acompañamiento en el cumplimiento del taller."
                }
            },
            observacionesConvivencia: "Estudiante respetuosa con buen trato hacia sus pares."
        }
    ],
    messages: [
        {
            id: "msg_1",
            fromId: "est_juan",
            fromName: "Juan Camilo Parra",
            fromRole: "student",
            toId: "prof_carlos",
            toName: "Lic. Carlos Restrepo",
            subjectId: "mat",
            subjectName: "Matemáticas",
            topic: "Dudas sobre el Taller Remedial N° 2 (PEE)",
            message: "Profesor Carlos, cordial saludo. Estuve resolviendo los ejercicios de factorización del PEE pero tengo dudas en los puntos 4 y 7 sobre trinomio de la forma ax² + bx + c. ¿Podría orientarme en algún descanso?",
            timestamp: "2026-10-15 10:20 AM",
            status: "respondido",
            replies: [
                {
                    fromId: "prof_carlos",
                    fromName: "Lic. Carlos Restrepo",
                    message: "Hola Juan Camilo. Muy bien por avanzar en el plan. Mañana a las 10:15 a.m. en el descanso pedagógico puedes acercarte a la sala de profesores con tus hojas de trabajo y lo aclaramos con mucho gusto.",
                    timestamp: "2026-10-15 02:45 PM"
                }
            ]
        },
        {
            id: "msg_2",
            fromId: "est_juan",
            fromName: "Juan Camilo Parra",
            fromRole: "student",
            toId: "prof_marta",
            toName: "Lic. Marta Gómez",
            subjectId: "ing",
            subjectName: "Idioma Extranjero: Inglés",
            topic: "Entrega del audio y portafolio de nivelación",
            message: "Profe Marta, buenas tardes. Ya tengo grabado el audio de lectura en inglés del PEE. ¿Se lo puedo hacer llegar en USB o se lo sustento de manera presencial en la clase del viernes?",
            timestamp: "2026-10-16 08:30 AM",
            status: "respondido",
            replies: [
                {
                    fromId: "prof_marta",
                    fromName: "Lic. Marta Gómez",
                    message: "Excelente Juan Camilo. Trae la USB el viernes y realizaremos una breve sustentación de 3 preguntas en los primeros 10 minutos de clase. ¡Mucho ánimo!",
                    timestamp: "2026-10-16 11:10 AM"
                }
            ]
        },
        {
            id: "msg_3",
            fromId: "est_andres",
            fromName: "Andrés Felipe Torres",
            fromRole: "student",
            toId: "prof_clara",
            toName: "Lic. Clara Inés Peña",
            subjectId: "soc",
            subjectName: "Ciencias Sociales e Historia",
            topic: "Consulta sobre mapa mental PEE de la Guerra Fría",
            message: "Profesora Clara, buenas tardes. Quería confirmar si el mapa mental del PEE debe incluir los bloques geopolíticos de la OTAN y Pacto de Varsovia obligatoriamente. Gracias.",
            timestamp: "2026-10-16 01:15 PM",
            status: "pendiente",
            replies: []
        }
    ]
};

// Funciones de gestión de almacenamiento
class SchoolDataManager {
    static getData() {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DATA));
            return JSON.parse(JSON.stringify(INITIAL_DATA));
        }
        try {
            return JSON.parse(stored);
        } catch (e) {
            console.error("Error al leer datos locales, restaurando...", e);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DATA));
            return JSON.parse(JSON.stringify(INITIAL_DATA));
        }
    }

    static saveData(data) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }

    static resetToDefault() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DATA));
        return JSON.parse(JSON.stringify(INITIAL_DATA));
    }

    // Calcula el promedio de un estudiante considerando todas las asignaturas
    static calculateStudentAverage(student) {
        const grades = student.grades || {};
        const keys = Object.keys(grades);
        if (keys.length === 0) return 0.0;
        let sum = 0;
        keys.forEach(k => {
            sum += (student.grades[k].def || 0);
        });
        return Number((sum / keys.length).toFixed(2));
    }

    // Retorna las materias que el estudiante va perdiendo (< 3.4)
    static getFailingSubjects(student) {
        const failing = [];
        const data = this.getData();
        const materiasMap = {};
        data.materias.forEach(m => materiasMap[m.id] = m);

        const grades = student.grades || {};
        for (const [subjId, g] of Object.entries(grades)) {
            if (g.def < data.school.scale.passingMin) {
                const materiaInfo = materiasMap[subjId] || { name: subjId, teacherId: null };
                const teacher = data.teachers.find(t => t.id === materiaInfo.teacherId) || { name: "Docente Titular" };
                const peeInfo = (student.pee && student.pee[subjId]) || null;
                failing.push({
                    subjectId: subjId,
                    subjectName: materiaInfo.name,
                    icon: materiaInfo.icon || "📘",
                    defGrade: g.def,
                    p1: g.p1,
                    p2: g.p2,
                    p3: g.p3,
                    teacherName: teacher.name,
                    teacherEmail: teacher.email,
                    pee: peeInfo
                });
            }
        }
        return failing;
    }

    // Calcula el puesto de un estudiante en su salón
    static getStudentRank(studentId, salonId) {
        const data = this.getData();
        const salonStudents = data.students.filter(s => s.salon === salonId);
        
        const ranked = salonStudents.map(s => ({
            id: s.id,
            name: s.name,
            average: this.calculateStudentAverage(s)
        })).sort((a, b) => b.average - a.average);

        const index = ranked.findIndex(s => s.id === studentId);
        return {
            rank: index + 1,
            totalStudents: salonStudents.length,
            average: index >= 0 ? ranked[index].average : 0,
            rankedList: ranked
        };
    }

    // Obtiene estadísticas por salón para los profesores
    static getSalonStats(salonId, subjectId = null) {
        const data = this.getData();
        const salonStudents = data.students.filter(s => s.salon === salonId);
        const passingMin = data.school.scale.passingMin;

        if (salonStudents.length === 0) {
            return {
                totalStudents: 0,
                salonAverage: 0,
                failingCount: 0,
                passingCount: 0,
                failingRate: 0,
                subjectFailingCount: 0
            };
        }

        let totalAvgSum = 0;
        let failingAnySubjectCount = 0;
        let subjectFailingCount = 0;
        let subjectSum = 0;
        let subjectGradedCount = 0;

        salonStudents.forEach(s => {
            const studentAvg = this.calculateStudentAverage(s);
            totalAvgSum += studentAvg;

            // Revisar si pierde alguna materia
            const failingList = this.getFailingSubjects(s);
            if (failingList.length > 0) {
                failingAnySubjectCount++;
            }

            // Si se especificó materia
            if (subjectId && s.grades && s.grades[subjectId]) {
                const gradeDef = s.grades[subjectId].def;
                subjectSum += gradeDef;
                subjectGradedCount++;
                if (gradeDef < passingMin) {
                    subjectFailingCount++;
                }
            }
        });

        const salonAverage = Number((totalAvgSum / salonStudents.length).toFixed(2));
        const specificSubjectAvg = subjectGradedCount > 0 ? Number((subjectSum / subjectGradedCount).toFixed(2)) : 0;

        return {
            totalStudents: salonStudents.length,
            salonAverage: salonAverage,
            failingAnySubjectCount: failingAnySubjectCount,
            passingAllCount: salonStudents.length - failingAnySubjectCount,
            subjectFailingCount: subjectFailingCount,
            subjectPassingCount: salonStudents.length - subjectFailingCount,
            specificSubjectAvg: specificSubjectAvg,
            passingMin: passingMin
        };
    }

    // Actualizar nota de un estudiante
    static updateGrade(studentId, subjectId, p1, p2, p3) {
        const data = this.getData();
        const student = data.students.find(s => s.id === studentId);
        if (!student) return false;

        if (!student.grades) student.grades = {};
        
        // Calcular definitiva ponderada / promedio de periodos
        const numP1 = Number(p1);
        const numP2 = Number(p2);
        const numP3 = Number(p3);
        const def = Number(((numP1 + numP2 + numP3) / 3).toFixed(1));

        student.grades[subjectId] = {
            p1: numP1,
            p2: numP2,
            p3: numP3,
            def: def
        };

        // Si la definitiva quedó >= 3.4 y tenía PEE, podemos actualizar el estatus o conservarlo
        if (!student.pee) student.pee = {};
        if (def >= data.school.scale.passingMin && student.pee[subjectId]) {
            student.pee[subjectId].status = "Superado / Aprobado (Nota: " + def + ")";
        }

        this.saveData(data);
        return true;
    }

    // Actualizar o agregar PEE / Anotación de bajo rendimiento
    static savePeeRecord(studentId, subjectId, motivo, planAccion, fechaLimite, compromisoAcudiente, docenteNombre) {
        const data = this.getData();
        const student = data.students.find(s => s.id === studentId);
        if (!student) return false;

        if (!student.pee) student.pee = {};

        student.pee[subjectId] = {
            status: "En Plan de Nivelación (PEE Activo)",
            motivo: motivo,
            planAccion: planAccion,
            fechaLimite: fechaLimite,
            docente: docenteNombre,
            compromisoAcudiente: compromisoAcudiente || "Acompañamiento y seguimiento en casa."
        };

        this.saveData(data);
        return true;
    }

    // Enviar un mensaje de estudiante a docente
    static sendMessage(fromStudent, toTeacherId, subjectId, topic, messageText) {
        const data = this.getData();
        const teacher = data.teachers.find(t => t.id === toTeacherId);
        const materia = data.materias.find(m => m.id === subjectId);

        const newMsg = {
            id: "msg_" + Date.now(),
            fromId: fromStudent.id,
            fromName: fromStudent.name,
            fromRole: "student",
            toId: toTeacherId,
            toName: teacher ? teacher.name : "Docente",
            subjectId: subjectId,
            subjectName: materia ? materia.name : "Asignatura",
            topic: topic,
            message: messageText,
            timestamp: new Date().toLocaleDateString('es-CO', { 
                year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' 
            }),
            status: "pendiente",
            replies: []
        };

        if (!data.messages) data.messages = [];
        data.messages.unshift(newMsg);
        this.saveData(data);
        return newMsg;
    }

    // Responder mensaje por parte del docente
    static replyMessage(messageId, teacher, replyText) {
        const data = this.getData();
        const msg = data.messages.find(m => m.id === messageId);
        if (!msg) return false;

        if (!msg.replies) msg.replies = [];
        msg.replies.push({
            fromId: teacher.id,
            fromName: teacher.name,
            message: replyText,
            timestamp: new Date().toLocaleDateString('es-CO', { 
                year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' 
            })
        });

        msg.status = "respondido";
        this.saveData(data);
        return true;
    }
}
