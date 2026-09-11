/**
 * Portfolio content — edit this file to update resume, about, and contact info
 * Loaded before script.js so PORTFOLIO is available globally
 */
const PORTFOLIO = {
  whoami: 'user',

  about: `I'm a Network Administrator at SynchroNet, a Buffalo-area managed services provider, where I'm responsible for the health of client server, virtualization, identity, backup, and network infrastructure. Day to day that means running structured, end-to-end reviews of client environments — identity and access, remote access, backups, firewalls, hypervisors, endpoints, and documentation — then turning what I find into risk-rated findings and remediation work.

The part I enjoy most is automating it. I've built a toolkit of read-only PowerShell scripts that pull audit data straight from vendor APIs — Microsoft Graph, Sophos Central, UniFi, HPE iLO Redfish, N-able, ConnectWise, SNMP — which replaced a manual portal-by-portal slog with repeatable exported reports. That same instinct shows up in my side projects: MCP servers that give AI assistants controlled access to real systems, serverless support agents on Cloudflare Workers, and security tooling like a JWT attack toolkit and a Linux forensics suite.

Outside of work I run a homelab that's closer to a small production environment than a hobby setup — a two-node Proxmox cluster, a self-managed network edge with IDS, Active Directory over Samba, and a full monitoring and alerting stack. Type 'homelab' for the details.

I'm finishing a Bachelor of Science in Cyber Security at SUNY Canton (expected 2027), after completing an AAS in Information Technology and a Network Support Technology Certificate at Erie Community College. Before moving into IT I spent four years as a Field Sales Representative at DSI Systems, which is where I learned to explain technical things to people who don't want a technical answer — still one of the most useful skills I have.`,

  contact: `You can reach me here:\n- Email: Zacharylalime@gmail.com\n- Phone: (716) 341-3678\n- GitHub: github.com/taddiemason`,

  homelab: `
HOMELAB — "DeadPresidents"

A self-built lab I run like a small production environment: real segmentation,
real monitoring, real incident write-ups when it breaks.

VIRTUALIZATION:
  • Two-node Proxmox VE cluster running ~20 LXC and QEMU guests
  • Shared NFS storage backed by an OpenMediaVault NAS on ZFS
  • Unprivileged containers with per-service isolation and dedicated service users
  • GPU passthrough for a dedicated media/AI workload VM

NETWORK EDGE:
  • OPNsense, then a Ubiquiti EdgeRouter, serving as the perimeter firewall
  • Suricata and CrowdSec for intrusion detection (alert-only)
  • Unbound and dnsmasq split-horizon DNS, including an AD-authoritative zone
  • Tailscale subnet router + exit node for VPN-first remote access
  • WireGuard/OpenVPN split tunnel with a fail-closed kill switch for one host
  • Minimized WAN exposure — documented port-forwards, no flat inbound access

IDENTITY & STORAGE:
  • Linux NAS joined to a Samba Active Directory domain via SSSD and Kerberos
  • Per-user private SMB home drives with role-based access control
  • ZFS pool management, snapshots, and a documented migration runbook

SECURITY & MONITORING:
  • Scheduled ClamAV scanning with automatic quarantine and email alerting,
    validated with EICAR test files
  • netdata and Monit health checks, alerting out over Microsoft 365 direct send
  • Uptime Kuma for HTTP/TCP/ping monitoring and SSL expiry warnings
  • A WAN IP change watchdog and webhook-based notification routing
  • Self-hosted RustDesk (hbbs/hbbr) with ED25519 key management for remote access

DOCUMENTATION:
  Every build has a written guide, and every outage has a postmortem. Two I
  learned the most from:
  • A suspended ZFS pool — both SATA drives dropped together, and NFS kept
    serving cached filenames, so Plex could list media it could not read.
  • A full-LAN outage — a VPN full-tunnel route hijack blackholed the whole
    network, traced to an EdgeOS firewall chain desync that needed a reboot
    rather than an in-place fix.

Most of this is written up in my notes and mirrored to private repos.
Happy to walk through any of it — use 'contact' to reach me.
`,

  resume: `
EDUCATION:
  • SUNY Canton – Canton, NY
    Bachelor of Science in Cyber Security (In Progress)
    Expected Graduation: June 2027
    Coursework: Information Security, Cryptography, Network Management

  • Erie Community College – Buffalo, NY
    Associate of Applied Science in Information Technology (August 2025)
    SUNY Network Support Technology Certificate


Certifications:
  • SUNY Network Support Technology Certificate

PROFESSIONAL SUMMARY:
  • Network Administrator responsible for client server, virtualization,
    identity, backup, and network infrastructure at an MSP
  • Author of a read-only PowerShell + REST API toolkit that automates
    environment audits across AD, M365/Entra, backup, hypervisor, firewall,
    wireless, and server hardware
  • Builds and documents production-style infrastructure in a personal homelab
  • Four years as a Field Sales Representative at DSI Systems Inc — strong
    leadership, decision-making, and client communication

SKILLS:

  Scripting & Automation
  • PowerShell (primary)              • Python
  • TypeScript / JavaScript           • Bash
  • REST API integration              • SNMPv2c
  • Git / GitHub                      • Scheduled jobs & cron

  Systems & Identity
  • Windows Server                    • Active Directory (GPOs, permissions)
  • Microsoft 365                     • Microsoft Entra ID / Azure AD
  • Microsoft Graph                   • Exchange Online
  • Samba AD, SSSD, Kerberos          • DNS / DHCP

  Virtualization & Containers
  • VMware vSphere / ESXi (PowerCLI)  • Proxmox VE clustering
  • Hyper-V                           • LXC
  • Docker / Docker Compose           • Kubernetes & Ansible (working knowledge)

  Networking
  • Routers, switches, firewalls      • Sophos / OPNsense / Ubiquiti
  • UniFi wireless                    • VLANs, NAT, port forwarding
  • Site-to-site & remote-access VPN  • Tailscale / WireGuard
  • Network monitoring                • Performance troubleshooting

  Security
  • Identity & access auditing        • MFA / conditional access review
  • Email security (SPF/DKIM/DMARC)   • External attack-surface recon
  • Suricata / CrowdSec IDS           • Patch management
  • Nmap, Burp Suite, tcpdump, TShark • SOC 2 / ISO 27001 / NIST awareness

  Storage & Backup
  • Backup coverage & retention       • Recovery-point objectives
  • N-able Cove backup validation     • M365 workload backup
  • ZFS, NFS, SMB                     • Data recovery

  Operations
  • Structured environment audits     • Runbooks & SOP authorship
  • Incident documentation            • Vendor coordination & procurement
  • Ticketing & escalation            • Customer service

EXPERIENCE:

SynchroNet - Network Administrator
Buffalo, NY | July 2025 - Current
  • Administer and monitor client server, virtualization, identity, backup, and
    network infrastructure for uptime, performance, and secure connectivity
  • Perform structured 18-section reviews of client environments covering server
    rooms, physical hosts, wireless, remote access, backups, firewalls,
    workstation OS, hypervisors, Active Directory, Microsoft 365, web filtering,
    and documentation — rating findings and driving them to remediation tickets
  • Wrote and maintain a read-only PowerShell + REST API toolkit that automates
    the data collection behind those reviews, replacing manual portal-by-portal
    checks with repeatable CSV and report exports
  • Administer AD and M365/Entra ID: provisioning and deprovisioning, group and
    drive mapping, privileged-group review, service-account standards, and
    stale / non-expiring-password cleanup
  • Validate backup coverage, retention, and RPOs across servers, workstations,
    and Microsoft 365 workloads, and produce client authorization documentation
  • Configure and troubleshoot routers, switches, firewalls, wireless access
    points, and site-to-site VPN tunnels between mixed-vendor appliances
  • Review host and hypervisor health — RAID and drive status, PSU redundancy,
    thermals, firmware currency — and plan replacements with vendors
  • Author and maintain the internal SOP library the operations program runs on
  • Handle Tier 2/3 support for network-related escalations

VITEC Solutions – IT Technician
Buffalo, NY | Nov 2023 – Jun 2024
  • Delivered end-user technical support through phone, email, and ticketing systems
  • Installed and configured complex computer networks for business clients
  • Supported customers with hardware and software setup across multiple platforms
  • Troubleshot issues related to logins, printing, applications, and networking
  • Assessed site infrastructure and provided tailored hardware/software recommendations
  • Installed system updates, patches, and managed software configurations
  • Maintained detailed technical documentation and asset records
  • Ensured system reliability through proactive monitoring and performance tuning
  • Performed routine data backups and recovery processes
  • Configured and managed network devices including firewalls, routers, and switches

Niacom Inc. – MDU Specialist
Buffalo, NY | Jul 2022 – Mar 2023
  • Sold telecom and internet services to multi-dwelling unit (MDU) properties
  • Developed and executed market entry strategies to grow customer base
  • Oversaw the end-to-end contract approval process across internal departments
  • Cross-functional collaboration across tech, business, and legal teams
  • Directed sales team operations, trainings, and territory planning
  • Identified and capitalized on new business development opportunities

DSI Systems Inc. – Field Sales Representative
Buffalo, NY | May 2018 – Jul 2022
  • Recruited and developed new business relationships for AT&T's Wireless Retail Program
  • Provided on-site coaching and mentorship to retail sales teams
  • Served as primary point of contact between DSI and third-party partners
  • Helped retailers optimize in-store wireless sales strategies
  • Earned Field Salesperson of the Year (2018) for the Northeast Region

AT&T Mobility – Retail Sales Consultant
Buffalo, NY | Oct 2015 – Nov 2018, May 2023 – Nov 2023
  • Delivered customized solutions for both wireless and in-home connectivity needs
  • Consistently recognized for achieving high levels of customer satisfaction
  • Acted as a liaison between AT&T and third-party field sales (DSI) to ensure alignment and support
  • Awarded Certificate of Excellence (2017) for outstanding performance in customer service
`,
};
