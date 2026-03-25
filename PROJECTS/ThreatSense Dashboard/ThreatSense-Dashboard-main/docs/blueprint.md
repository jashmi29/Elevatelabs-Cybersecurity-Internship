# **App Name**: ThreatSense Dashboard

## Core Features:

- API Integration & Data Normalization: Securely fetch and parse real-time threat intelligence data from VirusTotal and AbuseIPDB APIs, normalizing it into a consistent format for display and analysis.
- Real-time Threat Lookup: Provide a user interface for entering IP addresses or domain names to perform immediate lookups against VirusTotal and AbuseIPDB, displaying a comprehensive threat report including score, reputation, reports, country, and ISP.
- Interactive Overview Dashboard: Display key aggregated metrics such as total threats, high-risk IPs, and recent malicious activities through responsive cards, tables, and dynamically rendered charts.
- IOC Management: Store and manage Indicators of Compromise (IOCs) such as malicious IPs and suspicious domains in a MongoDB database, presenting them in a searchable table with timestamps, sources, and threat types.
- IOC Tagging & Export: Enable users to tag IOCs with relevant classifications (e.g., 'Botnet', 'Phishing', 'Malware') and export collected threat data in CSV or JSON formats.
- AI-Powered Threat Insight: Leverage a generative AI tool to provide concise summaries and contextual information for selected high-risk threats, helping users quickly understand potential impacts and next steps.

## Style Guidelines:

- The primary interactive color is a bright, deep blue (#26A8FF), suggesting precision and digital focus, designed to pop against a dark background.
- The background color is a subtle, desaturated blue-gray (#192025), chosen for its deep, immersive feel suitable for prolonged focus on data, characteristic of professional cyber-security dashboards.
- The accent color is a vibrant violet (#A078FF), offering clear contrast and highlighting critical information or interactive elements, while maintaining a futuristic, high-tech aesthetic.
- Headlines will utilize 'Space Grotesk', a proportional sans-serif with a techy, scientific feel, enhancing the dashboard's modern and data-driven character.
- Body text will use 'Inter', a grotesque-style sans-serif, for its modern, objective, and neutral readability, ideal for presenting detailed threat intelligence.
- Use minimalist, line-art style icons representing security (e.g., shields, locks), alerts (e.g., warning triangles), and data visualization elements (e.g., charts, arrows), consistent with a professional, dark-themed UI.
- Implement a responsive, grid-based dashboard layout featuring clearly defined panels for metrics, threat lookups, and IOCs, ensuring optimal data display across various screen sizes with a clean, uncrowded appearance.
- Incorporate subtle animations for data loading, chart transitions, and interactive element hover states to enhance user engagement and provide immediate feedback without distracting from critical information.