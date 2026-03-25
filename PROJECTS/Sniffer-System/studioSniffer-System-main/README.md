Network Security Intelligence
It is an advanced, AI-powered network packet inspection and anomaly detection platform. It provides real-time visibility into network traffic load, detailed packet-level forensics, and automated threat intelligence using Google Gemini via Genkit.

🚀 Overview
It serves as a centralized security operations center (SOC) dashboard for network administrators. It simplifies the complex task of monitoring high-volume traffic by identifying "Top Talkers," tracking throughput trends, and flagging anomalous behavior using customizable detection thresholds.

## 🛠 Core Capabilities
### 1. Security Dashboard
*   **Real-time Metrics:** Monitor active alerts, packet-per-second (PPS) rates, and identified IP counts.
*   **Traffic Load Analysis:** Interactive area charts visualizing inbound vs. outbound throughput.
*   **Top Talkers:** Automatic identification of the most active IP addresses in the network.

### 2. Deep Packet Inspection (DPI)
*   **Packet Viewer:** A high-performance log of captured network traffic including timestamps, source/destination IPs, protocols (TCP/UDP/ICMP), and packet flags.
*   **Filtering & Forensics:** Search and filter capabilities to isolate specific traffic patterns or suspected malicious actors.

### 3. AI-Driven Anomaly Management
*   **Intelligent Insights:** Powered by the `aiAnomalyInsightTool` flow, the system provides detailed explanations for detected threats like Port Scans or Traffic Floods.
*   **Threat Intelligence:** Automated correlation with known attack vectors and indicators of compromise (IOCs).
*   **Remediation:** Actionable, AI-generated suggestions for firewall rules and system hardening.

### 4. System Configuration
*   **Threshold Tuning:** Adjust sensitivity for port scan detection, flood rates, and brute-force attempts.
*   **Access Control:** Managed IP blacklist to explicitly block known malicious sources.
*   **Hardening:** Toggle features like Auto-Drop for high-severity threats and Promiscuous Mode.

## 🏗 Technology Stack
*   **Frontend:** Next.js 15 (App Router), React 19
*   **Styling:** Tailwind CSS, ShadCN UI
*   **AI Orchestration:** Genkit v1.x
*   **LLM:** Google Gemini 2.5 Flash
*   **Visualization:** Recharts
*   **Icons:** Lucide React

## 🧠 AI Engine Architecture

SentinelFlow utilizes a custom Genkit flow (`aiAnomalyInsightTool`) located in `src/ai/flows/`. This agent acts as a virtual security engineer, processing raw network data to produce structured threat intelligence.

```typescript
// Example Input Schema
{
  anomalyType: "Port Scan",
  sourceIp: "185.234.11.2",
  protocol: "TCP",
  timestamp: "2023-10-24T..."
}
```
## 📋 Getting Started
1.  **Environment Setup:** Ensure your `.env` file contains a valid `GOOGLE_GENAI_API_KEY`.
2.  **Development:** Run `npm run dev` to start the dashboard on port 9002.
3.  **AI Dev UI:** Use `npm run genkit:dev` to explore and test the threat analysis flows.

---
*Built with precision for the modern security landscape.*
