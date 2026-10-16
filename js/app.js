/**
 * CONTROLADOR PRINCIPAL - SISTEMA SIGACE
 * Colegio María Currea Manrique I.E.D.
 * Escala: 1.0 a 5.0 | Aprobatoria: 3.4
 */

const App = {
    currentUser: null,
    currentRole: 'student', // 'student' o 'teacher'
    selectedSalonId: '901',
    selectedSubjectId: 'mat',

    init() {
        // Asegurar inicialización de datos
        SchoolDataManager.getData();
        this.restoreSession();
        this.setupKeyboardListeners();
    },

    setupKeyboardListeners() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAllModals();
            }
        });
    },

    // =========================================================================
    // GESTIÓN DE SESIÓN Y AUTENTICACIÓN
    // =========================================================================
    restoreSession() {
        const storedSession = sessionStorage.getItem('SIGACE_ACTIVE_USER');
        if (storedSession) {
            try {
                const userSession = JSON.parse(storedSession);
                this.loginAsUser(userSession.user, userSession.role);
                return;
            } catch (e) {
                console.error("Error al restaurar sesión:", e);
            }
        }
        this.showLoginView();
    },

    setLoginRole(role) {
        this.currentRole = role;
        const btnEst = document.getElementById('tabRoleEstudiante');
        const btnDoc = document.getElementById('tabRoleDocente');
        const emailInput = document.getElementById('loginEmail');

        if (role === 'student') {
            btnEst.classList.add('active');
            btnDoc.classList.remove('active');
            emailInput.placeholder = "est.juan@mariacurrea.edu.co";
        } else {
            btnDoc.classList.add('active');
            btnEst.classList.remove('active');
            emailInput.placeholder = "prof.carlos@mariacurrea.edu.co";
        }
    },

    handleLoginSubmit(event) {
        event.preventDefault();
        const email = document.getElementById('loginEmail').value.trim().toLowerCase();
        const password = document.getElementById('loginPassword').value;
        const data = SchoolDataManager.getData();

        if (this.currentRole === 'student') {
            const student = data.students.find(s => s.email.toLowerCase() === email && s.password === password);
            if (student) {
                this.loginAsUser(student, 'student');
                this.showToast(`¡Bienvenido(a), ${student.name}!`, 'success');
            } else {
                this.showToast('Credenciales incorrectas de estudiante. Puedes usar los botones de acceso rápido abajo.', 'error');
            }
        } else {
            const teacher = data.teachers.find(t => t.email.toLowerCase() === email && t.password === password);
            if (teacher) {
                this.loginAsUser(teacher, 'teacher');
                this.showToast(`¡Bienvenido(a), ${teacher.name}!`, 'success');
            } else {
                this.showToast('Credenciales incorrectas de docente. Puedes usar los botones de acceso rápido abajo.', 'error');
            }
        }
    },

    quickLogin(userId) {
        const data = SchoolDataManager.getData();
        if (userId.startsWith('prof_')) {
            const teacher = data.teachers.find(t => t.id === userId);
            if (teacher) {
                this.loginAsUser(teacher, 'teacher');
                this.showToast(`Sesión iniciada como ${teacher.name}`, 'success');
            }
        } else {
            const student = data.students.find(s => s.id === userId);
            if (student) {
                this.loginAsUser(student, 'student');
                this.showToast(`Sesión iniciada como ${student.name}`, 'success');
            }
        }
    },

    loginAsUser(user, role) {
        this.currentUser = user;
        this.currentRole = role;
        sessionStorage.setItem('SIGACE_ACTIVE_USER', JSON.stringify({ user, role }));

        // Actualizar header de usuario
        const navActions = document.getElementById('userNavActions');
        const navAvatar = document.getElementById('userNavAvatar');
        const navName = document.getElementById('userNavName');
        const navRole = document.getElementById('userNavRole');

        navActions.style.display = 'flex';
        navName.textContent = user.name;
        navAvatar.textContent = role === 'student' ? (user.photo || '👨‍🎓') : '👨‍🏫';
        navRole.textContent = role === 'student' ? `Estudiante - ${user.salon}` : 'Docente';

        // Ocultar login y mostrar portal correspondiente
        document.getElementById('loginView').style.display = 'none';

        if (role === 'student') {
            document.getElementById('studentDashboardView').style.display = 'block';
            document.getElementById('teacherDashboardView').style.display = 'none';
            this.renderStudentDashboard();
        } else {
            document.getElementById('studentDashboardView').style.display = 'none';
            document.getElementById('teacherDashboardView').style.display = 'block';
            this.initTeacherDashboard();
        }
    },

    logout() {
        sessionStorage.removeItem('SIGACE_ACTIVE_USER');
        this.currentUser = null;
        this.showLoginView();
        this.showToast('Has cerrado sesión correctamente.', 'info');
    },

    showLoginView() {
        document.getElementById('loginView').style.display = 'flex';
        document.getElementById('studentDashboardView').style.display = 'none';
        document.getElementById('teacherDashboardView').style.display = 'none';
        document.getElementById('userNavActions').style.display = 'none';
    },

    navigateToHome(event) {
        if (event) event.preventDefault();
        if (this.currentUser) {
            if (this.currentRole === 'student') {
                this.renderStudentDashboard();
            } else {
                this.renderTeacherDashboard();
            }
        } else {
            this.showLoginView();
        }
    },

    resetDataPrompt() {
        if (confirm('¿Deseas restaurar la base de datos a los valores originales de prueba del Colegio María Currea Manrique?')) {
            SchoolDataManager.resetToDefault();
            this.showToast('Datos originales restablecidos.', 'info');
            if (this.currentUser) {
                const data = SchoolDataManager.getData();
                if (this.currentRole === 'student') {
                    this.currentUser = data.students.find(s => s.id === this.currentUser.id) || data.students[0];
                    this.renderStudentDashboard();
                } else {
                    this.currentUser = data.teachers.find(t => t.id === this.currentUser.id) || data.teachers[0];
                    this.renderTeacherDashboard();
                }
            }
        }
    },

    // =========================================================================
    // PORTAL DEL ESTUDIANTE
    // =========================================================================
    renderStudentDashboard() {
        const student = this.currentUser;
        const data = SchoolDataManager.getData();

        // Refrescar estudiante desde la base de datos
        const currentStudent = data.students.find(s => s.id === student.id) || student;
        this.currentUser = currentStudent;

        // Banner bienvenida
        document.getElementById('stWelcomeName').textContent = currentStudent.name;
        document.getElementById('stWelcomePhoto').textContent = currentStudent.photo || '👨‍🎓';
        document.getElementById('stWelcomeCourse').textContent = `Curso ${currentStudent.salon}`;
        document.getElementById('stWelcomeCode').textContent = currentStudent.code;

        // Métricas de Rendimiento
        const average = SchoolDataManager.calculateStudentAverage(currentStudent);
        const rankInfo = SchoolDataManager.getStudentRank(currentStudent.id, currentStudent.salon);
        const failingList = SchoolDataManager.getFailingSubjects(currentStudent);

        // Promedio y Nivel
        const avgElem = document.getElementById('stAverageValue');
        const levelElem = document.getElementById('stAverageLevel');
        avgElem.textContent = average.toFixed(2);

        let levelText = "";
        let levelClass = "";
        if (average >= 4.6) {
            levelText = "Desempeño Superior 🌟";
            levelClass = "badge-superior";
            avgElem.style.color = "#15803d";
        } else if (average >= 4.0) {
            levelText = "Desempeño Alto 📘";
            levelClass = "badge-alto";
            avgElem.style.color = "#1d4ed8";
        } else if (average >= 3.4) {
            levelText = "Desempeño Básico 📙";
            levelClass = "badge-basico";
            avgElem.style.color = "#b45309";
        } else {
            levelText = "Desempeño Bajo (Riesgo) ⚠️";
            levelClass = "badge-bajo";
            avgElem.style.color = "#dc2626";
        }
        levelElem.innerHTML = `<span class="badge ${levelClass}">${levelText}</span>`;

        // Puesto en el Salón
        const rankElem = document.getElementById('stRankValue');
        const rankDetail = document.getElementById('stRankDetail');
        rankElem.textContent = `Puesto ${rankInfo.rank}°`;
        rankDetail.textContent = `Entre ${rankInfo.totalStudents} estudiantes del salón ${currentStudent.salon}`;

        // Materias perdiendo
        const failingElem = document.getElementById('stFailingCount');
        const failingSubtitle = document.getElementById('stFailingSubtitle');
        const failingCard = document.getElementById('stFailingCard');
        failingElem.textContent = failingList.length;

        if (failingList.length === 0) {
            failingSubtitle.textContent = "¡Felicitaciones! Ninguna materia en riesgo";
            failingCard.style.borderLeftColor = "#16a34a";
            failingElem.style.color = "#16a34a";
        } else {
            failingSubtitle.textContent = `${failingList.length} materia(s) bajo la nota mínima (3.4)`;
            failingCard.style.borderLeftColor = "#dc2626";
            failingElem.style.color = "#dc2626";
        }

        // Renderizar Alerta PEE (Por qué está perdiendo y qué debe hacer)
        const peeContainer = document.getElementById('stPeeContainer');
        const peeCardsList = document.getElementById('stPeeCardsList');

        if (failingList.length > 0) {
            peeContainer.style.display = 'block';
            peeCardsList.innerHTML = '';

            failingList.forEach(item => {
                const pee = item.pee || {};
                const motivo = pee.motivo || "El docente ha registrado bajo rendimiento continuo y notas acumuladas por debajo de 3.4.";
                const planAccion = pee.planAccion || "Realizar talleres remediales asignados por la asignatura y presentar sustentación individual.";
                const fechaLimite = pee.fechaLimite ? `Fecha Límite: <strong>${pee.fechaLimite}</strong>` : "Fecha por confirmar por el docente";
                const acudiente = pee.compromisoAcudiente ? `<p style="font-size:0.8rem; color:#78350F; margin-top:6px;"><strong>Compromiso con Acudiente:</strong> ${pee.compromisoAcudiente}</p>` : "";

                const card = document.createElement('div');
                card.className = 'pee-card-item';
                card.innerHTML = `
                    <div class="pee-card-top">
                        <span class="pee-card-subject">${item.icon} ${item.subjectName}</span>
                        <span class="pee-card-grade">${item.defGrade.toFixed(1)} / 5.0</span>
                    </div>
                    <div class="pee-reason-box">
                        <strong>¿Por qué estás perdiendo esta materia?</strong>
                        <p>${motivo}</p>
                    </div>
                    <div class="pee-plan-box">
                        <strong>Plan Especial de Evaluación (PEE Asignado):</strong>
                        <p>${planAccion}</p>
                        ${acudiente}
                    </div>
                    <div class="pee-card-footer">
                        <span>🗓️ ${fechaLimite}</span>
                        <button class="btn btn-sm btn-outline-primary" onclick="App.openContactModal('${item.subjectId}')">
                            Contactar al Docente ✉️
                        </button>
                    </div>
                `;
                peeCardsList.appendChild(card);
            });
        } else {
            peeContainer.style.display = 'none';
        }

        // Renderizar Tabla Completa de Calificaciones
        const tbody = document.getElementById('stGradesTableBody');
        tbody.innerHTML = '';

        data.materias.forEach(mat => {
            const gradeInfo = (currentStudent.grades && currentStudent.grades[mat.id]) || { p1: 0, p2: 0, p3: 0, def: 0 };
            const teacher = data.teachers.find(t => t.id === mat.teacherId) || { name: "Docente Titular" };
            const isPassing = gradeInfo.def >= data.school.scale.passingMin;

            let badgeHtml = "";
            if (gradeInfo.def >= 4.6) {
                badgeHtml = '<span class="badge badge-superior">Superior</span>';
            } else if (gradeInfo.def >= 4.0) {
                badgeHtml = '<span class="badge badge-alto">Alto</span>';
            } else if (gradeInfo.def >= 3.4) {
                badgeHtml = '<span class="badge badge-basico">Básico</span>';
            } else {
                badgeHtml = '<span class="badge badge-bajo">Bajo (PEE)</span>';
            }

            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>
                    <strong>${mat.icon} ${mat.name}</strong>
                    <div style="font-size: 0.75rem; color: var(--text-muted);">${mat.creditos} Créditos Académicos</div>
                </td>
                <td>${teacher.name}</td>
                <td style="text-align: center;" class="grade-val ${gradeInfo.p1 >= 3.4 ? 'passing' : 'failing'}">${gradeInfo.p1.toFixed(1)}</td>
                <td style="text-align: center;" class="grade-val ${gradeInfo.p2 >= 3.4 ? 'passing' : 'failing'}">${gradeInfo.p2.toFixed(1)}</td>
                <td style="text-align: center;" class="grade-val ${gradeInfo.p3 >= 3.4 ? 'passing' : 'failing'}">${gradeInfo.p3.toFixed(1)}</td>
                <td style="text-align: center;" class="grade-val ${isPassing ? 'passing' : 'failing'}">
                    <span style="font-size: 1.05rem;">${gradeInfo.def.toFixed(1)}</span>
                </td>
                <td>${badgeHtml}</td>
                <td>
                    ${isPassing 
                        ? '<span style="color: #16a34a; font-weight: 700; font-size: 0.85rem;">✅ Aprobado</span>' 
                        : '<span style="color: #dc2626; font-weight: 800; font-size: 0.85rem;">❌ Reprobado</span>'
                    }
                </td>
                <td style="text-align: right;">
                    <button class="btn btn-sm btn-outline" onclick="App.openContactModal('${mat.id}')" title="Escribir al profesor">
                        ✉️ Mensaje
                    </button>
                </td>
            `;
            tbody.appendChild(tr);
        });

        // Observador y Convivencia
        const obsElem = document.getElementById('stObservadorContent');
        obsElem.innerHTML = `
            <p><strong>Observación Pedagógica y Convivencial Registrada:</strong></p>
            <p style="margin-top: 6px;">${currentStudent.observacionesConvivencia || "Sin observaciones disciplinarias registradas a la fecha."}</p>
        `;

        // Renderizar Mensajes del Estudiante
        this.renderStudentMessages();
    },

    renderStudentMessages() {
        const student = this.currentUser;
        const data = SchoolDataManager.getData();
        const container = document.getElementById('stMessagesList');
        container.innerHTML = '';

        const studentMsgs = (data.messages || []).filter(m => m.fromId === student.id);

        if (studentMsgs.length === 0) {
            container.innerHTML = `
                <div style="text-align: center; padding: 25px; color: var(--text-muted); font-size: 0.85rem;">
                    No tienes mensajes enviados a los profesores aún. Si tienes dudas con tus notas o el PEE, pulsa en "Nuevo Mensaje".
                </div>
            `;
            return;
        }

        studentMsgs.forEach(msg => {
            const hasReply = msg.replies && msg.replies.length > 0;
            const repliesHtml = hasReply ? msg.replies.map(r => `
                <div class="message-reply-box">
                    <div class="message-reply-header">
                        <span>💬 Respuesta de ${r.fromName}</span>
                        <span style="font-size:0.72rem; color:#6B7280;">${r.timestamp}</span>
                    </div>
                    <div>${r.message}</div>
                </div>
            `).join('') : '<div style="font-size:0.78rem; color:#9CA3AF; margin-top:8px;">⏳ Esperando respuesta del docente...</div>';

            const card = document.createElement('div');
            card.className = 'message-item-card';
            card.innerHTML = `
                <div class="message-item-top">
                    <span class="message-author">Para: ${msg.toName} (${msg.subjectName})</span>
                    <span class="message-date">${msg.timestamp}</span>
                </div>
                <div class="message-topic">📌 ${msg.topic}</div>
                <div class="message-body-text">${msg.message}</div>
                ${repliesHtml}
            `;
            container.appendChild(card);
        });
    },

    // =========================================================================
    // PORTAL DEL PROFESOR / DOCENTE
    // =========================================================================
    initTeacherDashboard() {
        const teacher = this.currentUser;
        const data = SchoolDataManager.getData();

        document.getElementById('tcWelcomeName').textContent = teacher.name;
        document.getElementById('tcWelcomeCargo').textContent = teacher.cargo;
        const directorElem = document.getElementById('tcWelcomeDirector');
        if (teacher.directorOf) {
            directorElem.textContent = `Director de Curso ${teacher.directorOf}`;
            directorElem.style.display = 'inline-block';
        } else {
            directorElem.style.display = 'none';
        }

        // Llenar selector de materias del docente
        const subjectSelect = document.getElementById('tcSelectSubject');
        subjectSelect.innerHTML = '';
        data.materias.forEach(m => {
            if (teacher.subjects.includes(m.id)) {
                const opt = document.createElement('option');
                opt.value = m.id;
                opt.textContent = `${m.icon} ${m.name}`;
                subjectSelect.appendChild(opt);
            }
        });

        if (teacher.subjects.length > 0) {
            this.selectedSubjectId = teacher.subjects[0];
            subjectSelect.value = this.selectedSubjectId;
        }

        // Establecer salón inicial
        this.selectedSalonId = '901';
        document.getElementById('tcSelectSalon').value = this.selectedSalonId;

        this.renderTeacherDashboard();
    },

    handleTeacherFilterChange() {
        this.selectedSalonId = document.getElementById('tcSelectSalon').value;
        this.selectedSubjectId = document.getElementById('tcSelectSubject').value;
        this.renderTeacherDashboard();
    },

    renderTeacherDashboard() {
        const data = SchoolDataManager.getData();
        const salonId = this.selectedSalonId;
        const subjectId = this.selectedSubjectId;

        const materiaObj = data.materias.find(m => m.id === subjectId) || { name: "Asignatura" };
        document.getElementById('tcCurrentSubjectLabel').textContent = `${materiaObj.name} - Grado ${salonId}`;

        // Métricas del Salón
        const stats = SchoolDataManager.getSalonStats(salonId, subjectId);

        document.getElementById('tcMetricSalonAvg').textContent = stats.specificSubjectAvg.toFixed(2);
        document.getElementById('tcMetricSalonDetail').textContent = `Promedio en ${materiaObj.name} (Salón: ${stats.salonAverage.toFixed(2)})`;

        document.getElementById('tcMetricFailingCount').textContent = stats.subjectFailingCount;
        const failingPct = stats.totalStudents > 0 ? Math.round((stats.subjectFailingCount / stats.totalStudents) * 100) : 0;
        document.getElementById('tcMetricFailingRate').textContent = `${failingPct}% de reprobación (< 3.4)`;

        document.getElementById('tcMetricPassingCount').textContent = stats.subjectPassingCount;
        const passingPct = stats.totalStudents > 0 ? Math.round((stats.subjectPassingCount / stats.totalStudents) * 100) : 0;
        document.getElementById('tcMetricPassingRate').textContent = `${passingPct}% de aprobación (≥ 3.4)`;

        document.getElementById('tcMetricTotalStudents').textContent = stats.totalStudents;

        // Renderizar Planilla de Notas Editable
        const tbody = document.getElementById('tcGradesTableBody');
        tbody.innerHTML = '';

        const salonStudents = data.students.filter(s => s.salon === salonId);

        salonStudents.forEach((student, index) => {
            const grades = (student.grades && student.grades[subjectId]) || { p1: 1.0, p2: 1.0, p3: 1.0, def: 1.0 };
            const isPassing = grades.def >= data.school.scale.passingMin;
            const rank = SchoolDataManager.getStudentRank(student.id, salonId);
            const hasPee = student.pee && student.pee[subjectId];

            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td style="font-weight: 700; color: var(--text-muted);">${index + 1}</td>
                <td>
                    <div style="font-weight: 700; color: var(--secondary);">${student.name}</div>
                    <div style="font-size: 0.74rem; color: var(--text-muted);">${student.code}</div>
                </td>
                <td style="text-align: center;">
                    <input type="number" min="1.0" max="5.0" step="0.1" 
                           class="grade-input-box ${grades.p1 >= 3.4 ? 'passing-grade' : 'failing-grade'}" 
                           id="grade_${student.id}_p1" 
                           value="${grades.p1.toFixed(1)}" 
                           oninput="App.onInlineGradeChange('${student.id}')">
                </td>
                <td style="text-align: center;">
                    <input type="number" min="1.0" max="5.0" step="0.1" 
                           class="grade-input-box ${grades.p2 >= 3.4 ? 'passing-grade' : 'failing-grade'}" 
                           id="grade_${student.id}_p2" 
                           value="${grades.p2.toFixed(1)}" 
                           oninput="App.onInlineGradeChange('${student.id}')">
                </td>
                <td style="text-align: center;">
                    <input type="number" min="1.0" max="5.0" step="0.1" 
                           class="grade-input-box ${grades.p3 >= 3.4 ? 'passing-grade' : 'failing-grade'}" 
                           id="grade_${student.id}_p3" 
                           value="${grades.p3.toFixed(1)}" 
                           oninput="App.onInlineGradeChange('${student.id}')">
                </td>
                <td style="text-align: center;">
                    <span id="grade_${student.id}_def" style="font-size: 1.1rem; font-weight: 800; color: ${isPassing ? '#16a34a' : '#dc2626'};">
                        ${grades.def.toFixed(1)}
                    </span>
                </td>
                <td style="text-align: center;" id="status_${student.id}">
                    ${isPassing 
                        ? '<span class="badge badge-superior">Aprobado</span>' 
                        : '<span class="badge badge-bajo">Reprobado (PEE)</span>'
                    }
                </td>
                <td style="text-align: center;">
                    <span class="badge ${rank.rank <= 3 ? 'badge-gold' : 'badge-alto'}">
                        ${rank.rank <= 3 ? '🎖️' : ''} Puesto ${rank.rank}°
                    </span>
                </td>
                <td style="text-align: center;">
                    <button class="btn btn-sm ${hasPee ? 'btn-danger' : 'btn-outline-primary'}" 
                            onclick="App.openPeeModal('${student.id}', '${student.name}')" 
                            title="Gestionar Plan Especial de Evaluación y Anotación">
                        ${hasPee ? '⚠️ Ver / Editar PEE' : '➕ Registrar PEE'}
                    </button>
                </td>
            `;
            tbody.appendChild(tr);
        });

        // Renderizar Ranking del Salón
        this.renderSalonRanking(salonId);

        // Renderizar Mensajes recibidos por el docente
        this.renderTeacherMessages();
    },

    onInlineGradeChange(studentId) {
        const p1 = parseFloat(document.getElementById(`grade_${studentId}_p1`).value) || 1.0;
        const p2 = parseFloat(document.getElementById(`grade_${studentId}_p2`).value) || 1.0;
        const p3 = parseFloat(document.getElementById(`grade_${studentId}_p3`).value) || 1.0;

        const def = Number(((p1 + p2 + p3) / 3).toFixed(1));
        const defElem = document.getElementById(`grade_${studentId}_def`);
        const statusElem = document.getElementById(`status_${studentId}`);

        defElem.textContent = def.toFixed(1);

        if (def >= 3.4) {
            defElem.style.color = '#16a34a';
            statusElem.innerHTML = '<span class="badge badge-superior">Aprobado</span>';
        } else {
            defElem.style.color = '#dc2626';
            statusElem.innerHTML = '<span class="badge badge-bajo">Reprobado (PEE)</span>';
        }
    },

    saveAllTeacherGrades() {
        const salonId = this.selectedSalonId;
        const subjectId = this.selectedSubjectId;
        const data = SchoolDataManager.getData();
        const salonStudents = data.students.filter(s => s.salon === salonId);

        let hasInvalid = false;
        salonStudents.forEach(student => {
            const p1 = parseFloat(document.getElementById(`grade_${student.id}_p1`).value);
            const p2 = parseFloat(document.getElementById(`grade_${student.id}_p2`).value);
            const p3 = parseFloat(document.getElementById(`grade_${student.id}_p3`).value);

            if (isNaN(p1) || p1 < 1.0 || p1 > 5.0 || isNaN(p2) || p2 < 1.0 || p2 > 5.0 || isNaN(p3) || p3 < 1.0 || p3 > 5.0) {
                hasInvalid = true;
                return;
            }

            SchoolDataManager.updateGrade(student.id, subjectId, p1, p2, p3);
        });

        if (hasInvalid) {
            this.showToast('Advertencia: Las notas deben estar en el rango de 1.0 a 5.0.', 'error');
        } else {
            this.showToast('¡Todas las calificaciones fueron guardadas y los promedios recalculados con éxito!', 'success');
        }

        this.renderTeacherDashboard();
    },

    renderSalonRanking(salonId) {
        const tbody = document.getElementById('tcRankingTableBody');
        tbody.innerHTML = '';
        const data = SchoolDataManager.getData();
        const salonStudents = data.students.filter(s => s.salon === salonId);

        const rankedList = salonStudents.map(student => {
            const avg = SchoolDataManager.calculateStudentAverage(student);
            const failing = SchoolDataManager.getFailingSubjects(student);
            return {
                id: student.id,
                name: student.name,
                code: student.code,
                avg: avg,
                failingCount: failing.length
            };
        }).sort((a, b) => b.avg - a.avg);

        rankedList.forEach((st, idx) => {
            const tr = document.createElement('tr');
            let medal = "";
            let rowClass = "";
            if (idx === 0) {
                medal = "🥇 ";
                rowClass = "style='background-color: #FEFCE8;'";
            } else if (idx === 1) {
                medal = "🥈 ";
            } else if (idx === 2) {
                medal = "🥉 ";
            }

            tr.innerHTML = `
                <td style="text-align: center; font-weight: 800; font-size: 1.05rem;">
                    ${medal}${idx + 1}°
                </td>
                <td>
                    <strong>${st.name}</strong>
                    <div style="font-size: 0.74rem; color: var(--text-muted);">${st.code}</div>
                </td>
                <td style="text-align: center; font-weight: 800; font-size: 1.05rem; color: ${st.avg >= 3.4 ? 'var(--secondary)' : '#dc2626'};">
                    ${st.avg.toFixed(2)}
                </td>
                <td style="text-align: center;">
                    ${st.failingCount === 0 
                        ? '<span class="badge badge-superior">0 materias</span>' 
                        : `<span class="badge badge-bajo">${st.failingCount} materias en riesgo</span>`
                    }
                </td>
                <td>
                    ${st.failingCount === 0 
                        ? '<span style="color:#16a34a; font-weight:600;">En Aprobación Total</span>' 
                        : '<span style="color:#dc2626; font-weight:600;">Requiere Nivelación PEE</span>'
                    }
                </td>
            `;
            tbody.appendChild(tr);
        });
    },

    renderTeacherMessages() {
        const teacher = this.currentUser;
        const data = SchoolDataManager.getData();
        const container = document.getElementById('tcMessagesListContainer');
        const badgeElem = document.getElementById('tcUnreadBadge');
        const countElem = document.getElementById('tcTotalMessagesCount');
        container.innerHTML = '';

        const teacherMsgs = (data.messages || []).filter(m => m.toId === teacher.id);
        const unreadCount = teacherMsgs.filter(m => m.status === 'pendiente').length;

        badgeElem.textContent = unreadCount;
        countElem.textContent = teacherMsgs.length;

        if (teacherMsgs.length === 0) {
            container.innerHTML = `
                <div style="text-align: center; padding: 25px; color: var(--text-muted); font-size: 0.88rem;">
                    No hay mensajes recibidos de estudiantes en este momento.
                </div>
            `;
            return;
        }

        teacherMsgs.forEach(msg => {
            const repliesHtml = (msg.replies || []).map(r => `
                <div class="message-reply-box" style="margin-top: 8px;">
                    <div class="message-reply-header">
                        <span>💬 Tu Respuesta (${r.fromName}):</span>
                        <span style="font-size: 0.72rem; color: #6B7280;">${r.timestamp}</span>
                    </div>
                    <div>${r.message}</div>
                </div>
            `).join('');

            const card = document.createElement('div');
            card.className = 'message-item-card';
            card.style.background = msg.status === 'pendiente' ? '#FFFBEB' : '#F8FAFC';
            card.style.borderLeft = msg.status === 'pendiente' ? '4px solid #D97706' : '1px solid var(--border-color)';

            card.innerHTML = `
                <div class="message-item-top">
                    <span class="message-author">👨‍🎓 De: ${msg.fromName} &bull; Asignatura: <strong>${msg.subjectName}</strong></span>
                    <span class="message-date">${msg.timestamp}</span>
                </div>
                <div class="message-topic">📌 ${msg.topic}</div>
                <div class="message-body-text">${msg.message}</div>
                ${repliesHtml}
                
                <div style="margin-top: 12px; display: flex; gap: 8px;">
                    <input type="text" id="replyInput_${msg.id}" class="form-control" placeholder="Escribe una respuesta para ${msg.fromName}..." style="font-size: 0.85rem;">
                    <button class="btn btn-sm btn-primary" onclick="App.sendTeacherReply('${msg.id}')">
                        Responder 💬
                    </button>
                </div>
            `;
            container.appendChild(card);
        });
    },

    sendTeacherReply(messageId) {
        const input = document.getElementById(`replyInput_${messageId}`);
        const text = input.value.trim();
        if (!text) {
            this.showToast('Por favor escribe un mensaje antes de responder.', 'error');
            return;
        }

        SchoolDataManager.replyMessage(messageId, this.currentUser, text);
        this.showToast('Respuesta enviada al estudiante.', 'success');
        this.renderTeacherMessages();
    },

    // =========================================================================
    // MODAL PEE (PLAN ESPECIAL DE EVALUACIÓN Y ANOTACIONES)
    // =========================================================================
    openPeeModal(studentId, studentName) {
        const data = SchoolDataManager.getData();
        const student = data.students.find(s => s.id === studentId);
        const materia = data.materias.find(m => m.id === this.selectedSubjectId);

        document.getElementById('peeStudentId').value = studentId;
        document.getElementById('peeSubjectId').value = this.selectedSubjectId;
        document.getElementById('peeStudentName').value = studentName;
        document.getElementById('peeSubjectName').value = materia ? materia.name : "Asignatura";

        // Si ya tenía PEE precargado
        const existingPee = (student.pee && student.pee[this.selectedSubjectId]) || null;
        if (existingPee) {
            document.getElementById('peeMotivo').value = existingPee.motivo || '';
            document.getElementById('peePlanAccion').value = existingPee.planAccion || '';
            document.getElementById('peeFechaLimite').value = existingPee.fechaLimite || '2026-10-30';
            document.getElementById('peeCompromiso').value = existingPee.compromisoAcudiente || '';
        } else {
            document.getElementById('peeMotivo').value = 'Bajo rendimiento en el corte del periodo y falta de entrega de compromisos académicos.';
            document.getElementById('peePlanAccion').value = 'Taller remedial de nivelación y sustentación presencial con el docente.';
            document.getElementById('peeFechaLimite').value = '2026-10-30';
            document.getElementById('peeCompromiso').value = 'Firma de compromiso pedagógico y revisión periódica de avances.';
        }

        this.openModal('modalPee');
    },

    handleSavePeeSubmit(event) {
        event.preventDefault();
        const studentId = document.getElementById('peeStudentId').value;
        const subjectId = document.getElementById('peeSubjectId').value;
        const motivo = document.getElementById('peeMotivo').value.trim();
        const planAccion = document.getElementById('peePlanAccion').value.trim();
        const fechaLimite = document.getElementById('peeFechaLimite').value;
        const compromiso = document.getElementById('peeCompromiso').value.trim();
        const docenteNombre = this.currentUser.name;

        SchoolDataManager.savePeeRecord(studentId, subjectId, motivo, planAccion, fechaLimite, compromiso, docenteNombre);
        this.closeModal('modalPee');
        this.showToast('Plan PEE y anotación guardados exitosamente.', 'success');
        this.renderTeacherDashboard();
    },

    // =========================================================================
    // MODAL CONTACTO DOCENTE (ESTUDIANTE -> PROFESOR)
    // =========================================================================
    openContactModal(preselectedSubjectId) {
        const data = SchoolDataManager.getData();
        const select = document.getElementById('contactSelectSubject');
        select.innerHTML = '';

        data.materias.forEach(mat => {
            const teacher = data.teachers.find(t => t.id === mat.teacherId) || { name: "Docente Titular" };
            const opt = document.createElement('option');
            opt.value = `${mat.id}|${mat.teacherId}`;
            opt.textContent = `${mat.icon} ${mat.name} - ${teacher.name}`;
            if (preselectedSubjectId && mat.id === preselectedSubjectId) {
                opt.selected = true;
            }
            select.appendChild(opt);
        });

        document.getElementById('contactTopic').value = '';
        document.getElementById('contactMessage').value = '';
        this.openModal('modalContactTeacher');
    },

    handleSendContactSubmit(event) {
        event.preventDefault();
        const selectVal = document.getElementById('contactSelectSubject').value;
        const [subjectId, teacherId] = selectVal.split('|');
        const topic = document.getElementById('contactTopic').value.trim();
        const messageText = document.getElementById('contactMessage').value.trim();

        SchoolDataManager.sendMessage(this.currentUser, teacherId, subjectId, topic, messageText);
        this.closeModal('modalContactTeacher');
        this.showToast('Mensaje enviado al docente correctamente.', 'success');
        this.renderStudentMessages();
    },

    // =========================================================================
    // BOLETÍN DE CALIFICACIONES (IMPRESIÓN OFICIAL)
    // =========================================================================
    printReportCard() {
        const student = this.currentUser;
        const data = SchoolDataManager.getData();
        const average = SchoolDataManager.calculateStudentAverage(student);
        const rankInfo = SchoolDataManager.getStudentRank(student.id, student.salon);
        const failingList = SchoolDataManager.getFailingSubjects(student);

        let tableRows = '';
        data.materias.forEach(mat => {
            const g = (student.grades && student.grades[mat.id]) || { p1: 0, p2: 0, p3: 0, def: 0 };
            const isPassing = g.def >= 3.4;
            const pee = (student.pee && student.pee[mat.id]);
            const obs = pee ? `<strong>PEE:</strong> ${pee.motivo.substring(0, 75)}...` : "Desempeño normal";

            tableRows += `
                <tr style="border-bottom: 1px solid #ccc;">
                    <td style="padding: 8px; font-weight: bold;">${mat.name}</td>
                    <td style="padding: 8px; text-align: center;">${mat.creditos}</td>
                    <td style="padding: 8px; text-align: center;">${g.p1.toFixed(1)}</td>
                    <td style="padding: 8px; text-align: center;">${g.p2.toFixed(1)}</td>
                    <td style="padding: 8px; text-align: center;">${g.p3.toFixed(1)}</td>
                    <td style="padding: 8px; text-align: center; font-weight: bold; color: ${isPassing ? '#000' : '#b91c1c'};">${g.def.toFixed(1)}</td>
                    <td style="padding: 8px; text-align: center; font-weight: bold;">${isPassing ? 'APROBADO' : 'REPROBADO'}</td>
                    <td style="padding: 8px; font-size: 0.78rem;">${obs}</td>
                </tr>
            `;
        });

        const html = `
            <div style="font-family: Arial, sans-serif; padding: 20px; color: #111;">
                <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 2px solid #7E121D; padding-bottom: 14px; margin-bottom: 18px;">
                    <img src="assets/escudo.png" style="width: 75px; height: 75px;" alt="Escudo">
                    <div style="text-align: center; flex: 1;">
                        <h2 style="margin: 0; color: #14243B; font-size: 1.25rem;">COLEGIO MARÍA CURREA MANRIQUE I.E.D.</h2>
                        <p style="margin: 3px 0; font-size: 0.85rem; font-weight: bold;">SECRETARÍA DE EDUCACIÓN DEL DISTRITO CAPITAL</p>
                        <p style="margin: 2px 0; font-size: 0.8rem; color: #555;">DANE: 111001099234 | Respeto • Autonomía • Justicia</p>
                        <p style="margin: 4px 0; font-size: 0.9rem; font-weight: bold; color: #7E121D;">INFORME PERIÓDICO DE CALIFICACIONES - TERCER PERIODO (2026)</p>
                    </div>
                    <img src="assets/escudo.png" style="width: 75px; height: 75px; visibility: hidden;" alt="Espaciador">
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; font-size: 0.88rem; background: #f8f9fa; padding: 12px; border: 1px solid #ddd; border-radius: 6px; margin-bottom: 18px;">
                    <div><strong>Estudiante:</strong> ${student.name}</div>
                    <div><strong>Código de Matrícula:</strong> ${student.code}</div>
                    <div><strong>Curso:</strong> ${student.salon} (Jornada Mañana)</div>
                    <div><strong>Director de Grupo:</strong> Lic. Carlos Restrepo</div>
                    <div><strong>Puesto en el Salón:</strong> Puesto ${rankInfo.rank}° de ${rankInfo.totalStudents}</div>
                    <div><strong>Promedio General:</strong> ${average.toFixed(2)} / 5.0</div>
                </div>

                <table style="width: 100%; border-collapse: collapse; font-size: 0.85rem; margin-bottom: 20px;">
                    <thead>
                        <tr style="background: #14243B; color: #fff;">
                            <th style="padding: 8px; text-align: left;">Asignatura</th>
                            <th style="padding: 8px; text-align: center;">I.H.</th>
                            <th style="padding: 8px; text-align: center;">P1</th>
                            <th style="padding: 8px; text-align: center;">P2</th>
                            <th style="padding: 8px; text-align: center;">P3</th>
                            <th style="padding: 8px; text-align: center;">Def.</th>
                            <th style="padding: 8px; text-align: center;">Estado</th>
                            <th style="padding: 8px; text-align: left;">Observación / PEE</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${tableRows}
                    </tbody>
                </table>

                <div style="display: flex; justify-content: space-between; margin-top: 40px; padding-top: 30px;">
                    <div style="border-top: 1px solid #333; width: 220px; text-align: center; font-size: 0.82rem;">
                        <strong>Lic. Carlos Restrepo</strong><br>Director de Curso
                    </div>
                    <div style="border-top: 1px solid #333; width: 220px; text-align: center; font-size: 0.82rem;">
                        <strong>Rectoría Institucional</strong><br>Colegio María Currea Manrique
                    </div>
                </div>
            </div>
        `;

        document.getElementById('reportCardModalContent').innerHTML = html;
        document.getElementById('printableReportCard').innerHTML = html;
        this.openModal('modalReportCard');
    },

    // =========================================================================
    // UTILIDADES DE MODALES Y NOTIFICACIONES (TOASTS)
    // =========================================================================
    openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) modal.classList.add('active');
    },

    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) modal.classList.remove('active');
    },

    closeAllModals() {
        document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
    },

    scrollToSection(sectionId) {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    },

    showToast(message, type = 'info') {
        const container = document.getElementById('toastContainer');
        const toast = document.createElement('div');
        toast.className = `toast-msg toast-${type}`;

        let icon = 'ℹ️';
        if (type === 'success') icon = '✅';
        if (type === 'error') icon = '❌';

        toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
        container.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(10px)';
            setTimeout(() => toast.remove(), 300);
        }, 4000);
    }
};

// Arrancar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});
