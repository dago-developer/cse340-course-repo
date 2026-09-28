import {
    getUpcomingProjects,
    getProjectDetails
} from '../models/projects.js';

const NUMBER_OF_UPCOMING_PROJECTS = 5;

// Controller for the upcoming service projects page
const showProjectsPage = async (req, res) => {
    const projects = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS);

    const title = 'Upcoming Service Projects';

    res.render('projects', { title, projects });
};

// Controller for the service project details page
const showProjectDetailsPage = async (req, res) => {
    const projectId = req.params.id;

    const project = await getProjectDetails(projectId);

    const title = 'Service Project Details';

    res.render('project', {
        title,
        project
    });
};

// Export controller functions
export {
    showProjectsPage,
    showProjectDetailsPage
};