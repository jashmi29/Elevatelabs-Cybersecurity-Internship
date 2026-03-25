# **App Name**: SentinelFlow

## Core Features:

- Dashboard Overview: A centralized dashboard to display key network health metrics, active anomaly counts, and real-time traffic summaries.
- Packet Data Viewer: An interactive interface to browse and filter captured network packet details (e.g., Source IP, Destination IP, Port, Protocol) fetched from the backend.
- Anomaly Report Management: View and categorize detected network anomalies (port scans, traffic floods) with details on the offending IPs, timestamps, and severity levels.
- AI Anomaly Insight Tool: A generative AI tool that provides detailed explanations, potential threat intelligence, and remediation suggestions for detected network anomalies based on their characteristics.
- Detection Configuration Settings: An administrative interface to configure and update anomaly detection thresholds and manage IP blacklist entries, sending configurations to the backend.
- Interactive Data Visualizations: Dynamic charts and graphs visualizing network traffic over time and identifying top talkers (IPs by packet count) with optional real-time updates.
- Backend Database Integration: Facilitate fetching and displaying packet logs and anomaly records from the backend's SQLite database.

## Style Guidelines:

- A dark theme for the interface, using a sophisticated charcoal-blue background (#1A1D24) to reduce eye strain during extended monitoring sessions.
- Primary interactive elements and significant data highlights will feature a deep indigo (#364CDB), signifying clarity and depth.
- Accent color will be a vibrant sky blue (#65CBED) used for crucial alerts, actionable items, and emphasis on critical data points, providing energetic contrast.
- The primary typeface for all text, including headlines and body, will be 'Inter' (sans-serif) for its modern, clean, and highly readable objective aesthetic, ideal for data-intensive displays.
- Employ a minimalist set of line-art icons that are universally recognizable and provide quick visual cues for network states, security alerts, and system actions, maintaining a sleek and professional look.
- A structured, modular dashboard layout featuring a persistent left sidebar for navigation and a main content area organized into flexible grid-based widgets for data presentation and interactive elements.
- Incorporate subtle, performant transitions for loading states, data updates within graphs, and navigation, ensuring a fluid and engaging user experience without distracting from critical information.