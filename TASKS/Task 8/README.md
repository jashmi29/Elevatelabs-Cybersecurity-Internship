- Overview of SQL Injection and why it is a critical web vulnerability.
- SQL Injection Basics – How unsanitized user inputs can manipulate backend SQL queries.
  
Vulnerable Application –
- DVWA (Damn Vulnerable Web Application) running in a controlled environment

Security Levels –
- Low: No input validation
- Medium: Basic sanitization
- High: Prepared statements (secure)

Practical Exploitation –
- Identifying injectable parameters
- Confirming SQL Injection
- Enumerating databases
- Extracting tables and user data
- Impact Analysis – Data leakage, unauthorized access, authentication bypass.
- Mitigation Techniques – Prepared statements, input validation, least privilege, error handling.

🧪 Tools & Environment Used
- SQLMap
- DVWA
- Ubuntu (VirtualBox)
- Browser
- ChatGPT

🎓 Purpose
- To understand how SQL Injection attacks are performed, analyze their real-world impact, and learn secure coding practices to prevent database-level attacks in web applications.
