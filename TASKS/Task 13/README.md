The task focuses on understanding how REST APIs are tested for security using Postman, and how authentication, authorization, input validation, rate limiting, and HTTP response codes are verified to ensure secure communication between applications and backend servers.

The GitHub public API (https://api.github.com) was used as a reference API to perform practical testing and observe real-world security behavior.

📄 Contents
- Introduction to Secure API Testing
- Objectives of Secure API Testing
- Understanding REST API requests (GET, POST)
- Configuring API requests using Postman
- Authentication testing (valid and invalid tokens)
- Unauthenticated access testing
- Authorization validation (IDOR checks)
- Input validation testing
- Rate limiting testing
- Analysis of HTTP response codes
- Common GitHub API response codes

🧪 Practical Implementation
- The following security tests were performed using Postman software:
- Sending GET and POST requests to API endpoints
- Adding and removing authorization headers
- Testing valid and invalid authentication tokens
- Checking access control by modifying resource identifiers
- Sending malformed and unexpected input values
- Performing repeated requests to observe rate limiting behavior
- Reviewing HTTP status codes and error messages

🔐 Key Concepts Covered
- Secure API communication
- Authentication vs Authorization
- Broken Object Level Authorization (IDOR)
- Input validation and error handling
- Rate limiting and abuse prevention
- HTTP response code analysis

🧠 Tools Used
- Postman – for API request configuration and testing
- GitHub Public API – for real-world API security testing
- ChatGPT – for understanding concepts and structuring content

🔍 Learning & Reference Sources
- GeeksforGeeks (GFG) – for REST API and security concepts
- Postman Documentation – for request configuration and testing methods
- Online research – for understanding API security best practices

🎓 Purpose
- This task is part of my academic learning to understand how APIs are secured in real-world applications. It helped me gain hands-on experience in testing authentication and authorization mechanisms, identifying security controls, and analyzing how secure APIs respond to different types of requests.
