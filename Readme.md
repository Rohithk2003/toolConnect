Distinctiveness:
Tool Connect stands out by employing a programming strategy tailored to the niche of peer-to-peer tool sharing. This
unique focus has led to the implementation of specialized session token and CSRF token mechanisms, ensuring secure user
interactions. Leveraging Next.js and Tailwind CSS on the frontend and Django with SQLite on the backend, the project
offers an integrated experience that's distinct from standard web applications. The integration of multiple stacks, such
as Next.js, Tailwind CSS, Django, and
SQLite, showcases the project's complexity. Each technology stack serves a crucial role, and their seamless cooperation
underscores the dedication to delivering a robust, end-to-end solution. The collaborative nature of these technologies
amplifies the development intricacies, making the project truly distinct.
The project's programming complexity is also evident in the creation of a tailored database schema that caters
specifically to tool sharing. The 'Item' and 'User' models are designed to intricately store information related to
tools, and user profiles, aligning the programming logic with the specialized domain.Also due to number of models that
was added to the make the project complete it was not an easy task dealing with all the problems that might arise
Also problems with csrf tokens , as to how and why the csrf token should be send from the server to the client and vice
versa for further communications between client and server.Since this website's frontend was built using Next.js and
tailwind it was quite difficult to integrate it with django as I am a beginner.

Documentation

1. Introduction
   Purpose
   Tool Connect is a platform that facilitates the sharing and renting of unused tools among individuals within a
   community. The platform aims to connect tool owners with those in need of specific tools for a limited period,
   promoting resource sharing and reducing waste.This improves the activity of community and their connections.

Features
User Registration and Authentication
Posting and Managing Tool Listings
Searching and Browsing Tools
Renting Tools for Specified Duration
User Dashboards 
Responsive and User-Friendly Interface

2. Getting Started
   Installation
   Clone the Tool Connect repository from GitHub:


git clone https://github.com/Rohithk2003/tool-connect.git
Save to grepper
Setup and Configuration
Frontend (Next.js and Tailwind CSS)
Navigate to the frontend directory:


cd tool-connect/client
Install dependencies:

npm install
Start the development server:
npm run dev
Backend (Django and SQLite)

cd tool-connect/server

Install dependencies:

pip install -r requirements.txt
Apply migrations to create the database tables:

python manage.py migrate
Start the Django development server:

python manage.py runserver

3. Frontend (Next.js and Tailwind CSS)
   Project Structure
   lua
   Copy code
   frontend/
   |-- components/
   |-- pages/
   |-- styles/
   |-- ...
   Components
   Categories - for listing all the categories 
   filters - for adding option to filter results
4. 
   Styling
   Tailwind CSS is used for styling components and layout. Styles can be found in the styles directory.

User Interface
The user interface is designed to be intuitive and user-friendly. Users can easily navigate between tool listings, view
details, and interact with the platform's features.

4. Backend (Django and SQLite)
   Project Structure
   lua
   Copy code
   backend/
   |-- toolconnect/
   |-- users/
   |-- ...

   API Endpoints are defined the urls file in the server folder 
   Database Models
   Item: Represents a tool listing with attributes like name, description, owner, availability, etc.
   Order:For each order a user makes
   User: Extends Django's built-in User model to store user-specific data.
   Authentication and Authorization
   Authentication is implemented csrf. Users can obtain a token by sending their credentials to
   the respected  endpoint. Tokens are then used to access protected endpoints.

5. Usage
   User Registration and Login
   Users can register for a new account using the registration form. After registration, they can log in using their
   credentials to access the platform.

Posting Tools
Logged-in users can post new tool listings using the ToolForm component. They provide details about the tool, its
availability, rental terms, etc.

Renting Tools
Users can browse available tools, view their details, and choose to rent a tool for a specified duration. The tool owner
will receive a notification about the rental request.

Managing Listings
Tool owners can manage their listings . They can edit or delete their listings as needed.

User Dashboard
The user dashboard provides an overview of a user's activities, rented tools, and posted listings.

6. Deployment
   Frontend Deployment
   Build the Next.js frontend:

npm run build

Backend Deployment
python manage.py runserver

