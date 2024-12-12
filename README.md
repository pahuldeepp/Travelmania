TravelMania Website
Project Overview

TravelMania is an advanced travel website designed to provide users with personalized travel guides and city-specific information, including attractions, accommodations, and dining options. This robust platform also features interactive elements and user profile management to enhance user engagement and personalization.
Key Features

    Dynamic City Guides: Auto-generated pages for cities like London, New York, and Tokyo, filled with up-to-date information about attractions, activities, and tips.
    User Authentication and Session Management: Secure login and session management using MongoDB with sessions stored in a database for added security and performance.
    Interactive Elements and Real-time Communication: Real-time interaction through WebSockets for live updates and notifications, enhancing the user's interactive experience.
    File Handling and Uploads: Integration of AWS S3 for secure and efficient file storage, supporting multimedia content management across the platform.
    Responsive and Accessible Design: A fully responsive web design ensuring a seamless experience on all devices, adhering to modern accessibility standards.

Technologies Used

    Frontend: HTML, CSS, JavaScript, Nunjucks for templating.
    Backend: Node.js, Express, MongoDB, Mongoose for database interactions, WebSocket for real-time communication.
    AWS Services: S3 for storage, configured for both file uploads and serving multimedia content securely.
    Security: Sessions are handled securely with encrypted cookies and environmental variables manage sensitive configurations, keeping credentials out of the codebase.

Setup and Installation

    Clone the repository: git clone https://github.com/yourusername/TravelMania.git
    Install dependencies: Run npm install in your project directory.
    Configure your environment: Set up credentials.js for MongoDB and AWS services, and ensure it is added to .gitignore.
    Run the server: Execute node app.js to start your server at http://localhost:4000.

Security and Configuration

Sensitive data such as MongoDB URI and AWS credentials are managed through a configuration file (credentials.js) that is not tracked by Git to prevent exposure. AWS S3 is integrated for handling large file uploads securely, and the entire application ensures data is transmitted securely through HTTPS in production environments.
Contributing

Contributions are welcome! Please fork the repository, make your changes, and submit a pull request for review.
License

This project is licensed under the MIT License - see the LICENSE.md file for more details.
