const apiUrl = 'https://www.alura.com.br/api/dashboard/13a1801ddd37a345e44cc69e21c01f376e5409112f44d880edb86c3c6c7fea88';

// Função para buscar e exibir os dados da API
async function fetchData() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        displayData(data);
    } catch (error) {
        console.error('Erro ao buscar os dados:', error);
    }
}

// Função para exibir dados dos cursos/guias
function displayData(data) {
    const root = document.getElementById('root');

    // Seção de cursos em progresso
    const courseProgressesSection = document.createElement('div');
    courseProgressesSection.className = 'dashboard-section';
    courseProgressesSection.innerHTML = '<h2>Progresso dos Cursos</h2>';
    data.courseProgresses.forEach(course => {
        const courseCard = document.createElement('div');
        courseCard.className = 'card';
        courseCard.innerHTML = `
            <h3>${course.name}</h3>
            <p>Progresso: ${course.progress}%</p>
            <div class="progress-bar">
                <div style="width: ${course.progress}%;"></div>
            </div>
            <p>Último Acesso: ${new Date(course.lastAccessTime).toLocaleString()}</p>
        `;
        courseProgressesSection.appendChild(courseCard);
    });

    // Seção de guias
    const guidesSection = document.createElement('div');
    guidesSection.className = 'dashboard-section';
    guidesSection.innerHTML = '<h2>Guias</h2>';
    data.guides.forEach(guide => {
        const guideCard = document.createElement('div');
        guideCard.className = 'card';
        guideCard.innerHTML = `
            <h3>${guide.name}</h3>
            <p>Último Acesso: ${new Date(guide.lastAccessTime).toLocaleString()}</p>
            <p>Total de Cursos: ${guide.totalCourses}</p>
            <p>Cursos Finalizados: ${guide.finishedCourses}</p>
        `;
        guidesSection.appendChild(guideCard);
    });

    root.appendChild(courseProgressesSection);
    root.appendChild(guidesSection);
}

fetchData();
