-- ========================================
-- Organization Table
-- ========================================
CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);

-- ========================================
-- Insert sample data: Organizations
-- ========================================
INSERT INTO organization (name, description, contact_email, logo_filename)
VALUES
(
    'BrightFuture Builders',
    'A nonprofit focused on improving community infrastructure through sustainable construction projects.',
    'info@brightfuturebuilders.org',
    'brightfuture-logo.png'
),
(
    'GreenHarvest Growers',
    'An urban farming collective promoting food sustainability and education in local neighborhoods.',
    'contact@greenharvest.org',
    'greenharvest-logo.png'
),
(
    'UnityServe Volunteers',
    'A volunteer coordination group supporting local charities and service initiatives.',
    'hello@unityserve.org',
    'unityserve-logo.png'
);

-- ========================================
-- Service Project Table
-- ========================================

CREATE TABLE service_project (
    project_id SERIAL PRIMARY KEY,
    organization_id INTEGER NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(255) NOT NULL,
    date DATE NOT NULL,

    CONSTRAINT fk_service_project_organization
        FOREIGN KEY (organization_id)
        REFERENCES organization(organization_id)
);

-- ========================================
-- Insert sample data: Service Projects
-- ========================================

INSERT INTO service_project
    (organization_id, title, description, location, date)
VALUES

-- ========================================
-- BrightFuture Builders - Organization 1
-- ========================================

(
    1,
    'Community Park Renovation',
    'Help renovate a local community park by repairing benches, painting structures, and improving recreational areas.',
    'Central Community Park',
    '2026-10-05'
),
(
    1,
    'Neighborhood Playground Repair',
    'Assist with repairing and improving playground equipment for children in the neighborhood.',
    'Oak Street Playground',
    '2026-10-12'
),
(
    1,
    'Community Center Improvement',
    'Help paint and improve the facilities of a local community center.',
    'Downtown Community Center',
    '2026-10-19'
),
(
    1,
    'Senior Housing Maintenance',
    'Assist with basic maintenance and improvement projects at a senior housing facility.',
    'Sunrise Senior Community',
    '2026-10-26'
),
(
    1,
    'Sustainable Garden Construction',
    'Build raised garden beds and prepare a sustainable community garden area.',
    'Green Valley Community Garden',
    '2026-11-02'
),

-- ========================================
-- GreenHarvest Growers - Organization 2
-- ========================================

(
    2,
    'Urban Garden Planting Day',
    'Help plant vegetables, herbs, and other crops in a community urban garden.',
    'Eastside Urban Garden',
    '2026-10-07'
),
(
    2,
    'Community Compost Workshop',
    'Assist with a workshop teaching residents how to create and maintain household compost systems.',
    'GreenHarvest Community Center',
    '2026-10-14'
),
(
    2,
    'School Garden Project',
    'Help students and teachers establish a small educational garden at a local school.',
    'Lincoln Elementary School',
    '2026-10-21'
),
(
    2,
    'Neighborhood Harvest Day',
    'Collect and organize fresh produce from community gardens for local families.',
    'Westside Community Garden',
    '2026-10-28'
),
(
    2,
    'Urban Farming Education Day',
    'Support an educational event focused on sustainable urban farming techniques.',
    'Downtown Agricultural Center',
    '2026-11-04'
),

-- ========================================
-- UnityServe Volunteers - Organization 3
-- ========================================

(
    3,
    'Food Bank Volunteer Day',
    'Help sort, organize, and distribute food donations to families in need.',
    'Community Food Bank',
    '2026-10-10'
),
(
    3,
    'Clothing Donation Drive',
    'Collect, sort, and prepare donated clothing for distribution to local families.',
    'UnityServe Volunteer Center',
    '2026-10-17'
),
(
    3,
    'Community Cleanup',
    'Work with volunteers to clean public areas and remove litter from local neighborhoods.',
    'Riverside Neighborhood',
    '2026-10-24'
),
(
    3,
    'Senior Community Visit',
    'Spend time with seniors and assist with activities at a local senior community.',
    'Hope Senior Center',
    '2026-10-31'
),
(
    3,
    'Holiday Charity Preparation',
    'Help prepare donated food and supplies for a local holiday charity distribution.',
    'UnityServe Community Center',
    '2026-11-07'
);