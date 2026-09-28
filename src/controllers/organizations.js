import {
    getAllOrganizations,
    getOrganizationDetails
} from '../models/organizations.js';

import { getProjectsByOrganizationId } from '../models/projects.js';

// Controller for the organizations list page
const showOrganizationsPage = async (req, res) => {
    const organizations = await getAllOrganizations();

    const title = 'Our Partner Organizations';

    res.render('organizations', { title, organizations });
};

// Controller for the organization details page
const showOrganizationDetailsPage = async (req, res) => {
    const organizationId = req.params.id;

    const organizationDetails = await getOrganizationDetails(organizationId);

    const projects = await getProjectsByOrganizationId(organizationId);

    const title = 'Organization Details';

    res.render('organization', {
        title,
        organizationDetails,
        projects
    });
};

// Export controller functions
export {
    showOrganizationsPage,
    showOrganizationDetailsPage
};