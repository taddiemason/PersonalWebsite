/**
 * Zach's Terminal - Interactive Terminal Emulator
 * Main script for handling boot sequence, command processing, and terminal interactions
 */

// ====== CONSTANTS ======
const CONFIG = {
  // Timing constants (in milliseconds)
  BOOT_LINE_DELAY: 80,
  LOADING_DELAY: 300,
  TYPING_SPEED: 2,

  // Colors (matched with CSS variables - Kali theme)
  PRIMARY_COLOR: '#4AF626',
  SECONDARY_COLOR: '#00D9FF',
  BACKGROUND_COLOR: '#0A0E14',

  // Prompt configuration
  USERNAME: 'zach',
  HOSTNAME: 'zachbox',
  PATH: '~',

  // Messages
  WELCOME_MESSAGE: 'Welcome to ZachBox Terminal v1.0',
  HELP_PROMPT: 'Type <b>help</b> to view available commands.',
  COMMAND_NOT_FOUND: 'bash: ',
  LOADING_TEXT: 'Processing...',
};

// ====== BOOT SEQUENCE GENERATOR ======
/**
 * Generates realistic Linux boot sequence messages
 * @returns {Array<string>} Array of boot log lines
 */
function generateBootSequence() {
  const bootLines = [
    // Cgroup initialization
    ...generateCgroupLines(),

    // Kernel version and boot info
    "[    0.000000] Linux version 6.1.0-zach (root@localhost) (gcc version 13.2.0) #1 SMP PREEMPT Mon Apr 29 22:00:00 UTC 2025",
    "[    0.000500] Command line: BOOT_IMAGE=/vmlinuz-6.1.0-zach root=/dev/sda1 ro quiet splash",
    "[    0.000800] KERNEL supported cpus:",
    "[    0.000900]   Intel GenuineIntel",
    "[    0.000950]   AMD AuthenticAMD",

    // CPU and hardware detection
    "[    0.001000] CPU: Intel(R) Core(TM) i7 processor @ 2.60GHz (family: 6, model: 142, stepping: 10)",
    "[    0.001500] CPU0: Thermal monitoring enabled (TM1)",
    "[    0.001800] Performance Events: PEBS fmt3+, 32-deep LBR, IvyBridge events, full-width counters",

    // Memory and BIOS info
    "[    0.002000] BIOS-provided physical RAM map:",
    "[    0.002100]  BIOS-e820: [mem 0x0000000000000000-0x000000000009ffff] usable",
    "[    0.002200]  BIOS-e820: [mem 0x0000000000100000-0x00000000bfffffff] usable",
    "[    0.003000] DMI 2.7 present.",
    "[    0.003500] DMI: Zach Custom Build/VirtualBox, BIOS 1.40 04/15/2025",

    // ACPI initialization
    ...generateAcpiLines(),

    // System initialization
    "[    0.006000] ACPI: LAPIC_NMI (acpi_id[0x01] high edge lint[0x1])",
    "[    0.007000] Enabling APIC mode:  Flat.  Using 1 I/O APICs",
    "[    0.008000] Initializing software IO TLB",
    "[    0.010000] Memory: 8192MB available",
    "[    0.020000] Virtual memory map: 0xffff888000000000 - 0xffffc88000000000",
    "[    0.030000] Kernel direct mapping tables up to 1TB",

    // PCI and device initialization
    ...generatePciLines(),

    // Network and system services
    "[    0.120000] NET: Registered protocol family 1",
    "[    0.130000] Unpacking initramfs...",
    "[    0.150000] Freeing initrd memory: 5120K",
    "[    0.160000] audit: initializing netlink subsys (disabled)",
    "[    0.170000] audit: type=2000 audit(0.160:1): initialized",

    // Custom terminal environment startup
    ...generateTerminalStartup(),
  ];

  return bootLines;
}

/**
 * Generate cgroup subsystem initialization lines
 */
function generateCgroupLines() {
  const subsystems = ['cpuset', 'cpu', 'cpuacct', 'io', 'memory'];
  return subsystems.flatMap(subsys => [
    `[    0.000000] Initializing cgroup subsys ${subsys}`,
    `[    0.000000] cgroup: ${subsys} initialized`,
  ]);
}

/**
 * Generate ACPI initialization lines
 */
function generateAcpiLines() {
  return [
    "[    0.004000] ACPI: RSDP 0x00000000000F0420 000024 (v02 VBOX  )",
    "[    0.004500] ACPI: XSDT 0x00000000BFFFA210 00006C (v01 VBOX   VBOXBIOS 00000002      01000013)",
    "[    0.005000] ACPI: FACP 0x00000000BFFF0000 000114 (v04 VBOX   VBOXFACP 00000002 VBOX 00000002)",
    "[    0.005500] ACPI: Local APIC address 0xfee00000",
  ];
}

/**
 * Generate PCI initialization lines
 */
function generatePciLines() {
  return [
    "[    0.040000] PCI: Using configuration type 1 for base access",
    "[    0.050000] PCI: MMCONFIG for domain 0000 [bus 00-ff] at [mem 0xe0000000-0xefffffff] (base 0xe0000000)",
    "[    0.060000] ACPI: bus type PCI registered",
    "[    0.070000] PCI: Using host bridge windows from ACPI; if necessary, use \"pci=nocrs\" and report a bug",
    "[    0.080000] pnp: PnP ACPI init",
    "[    0.090000] system 00:00: Plug and Play ACPI device, IDs PNP0c01 (active)",
    "[    0.100000] clocksource: tsc: mask: 0xffffffffffffffff max_cycles: 0x25c8bce192c, max_idle_ns: 440795273189 ns",
    "[    0.110000] clocksource: Switched to clocksource tsc",
  ];
}

/**
 * Generate terminal startup sequence - Kali style
 */
function generateTerminalStartup() {
  return [
    "[    0.180000] Starting ZachBox System...",
    "[    0.182000] Mounting /proc filesystem",
    "[    0.184000] Mounting /sys filesystem",
    "[    0.186000] Starting systemd-udevd",
    "[    0.188000] Setting hostname to zachbox",
    "[    0.190000] Loading security modules...",
    "[    0.192000] Configuring network interfaces",
    "[    0.194000] Starting NetworkManager",
    "[    0.196000] Filesystem check complete: clean, 245692/1310720 files, 3457123/5242880 blocks",
    "[    0.197000] Starting OpenSSH server... [ OK ]",
    "[    0.197500] Starting PostgreSQL database... [ OK ]",
    "[    0.198000] System initialization complete",
    "[    0.199000] ZachBox Terminal v1.0 ready",
    "[    0.200000] Starting bash shell...",
    "[    0.202000] Type 'help' to view available commands.",
  ];
}

// ====== COMMAND DEFINITIONS ======
const commands = {
  help: `Available commands:
  about    - Display information about Zach
  contact  - Show contact information
  resume   - View professional experience and education
  clear    - Clear the terminal screen
  whoami   - Display current user`,

  whoami: `zach`,

  about: `I'm currently working as a Network Administrator at Synchronet while pursuing a degree in Cyber Security at SUNY Canton University. I recently completed my AAS in Information Technology and earned a Network Support Technology Certificate from Erie Community College. Throughout my academic journey, I've been actively engaged in the IT field, applying classroom knowledge to real-world scenarios and continuing to strengthen my technical skills. Prior to transitioning into tech, I spent four years as a Field Sales Representative at DSI Systems Inc., where I developed strong leadership, decision-making, and collaboration skills. With a blend of academic training, hands-on IT experience, and a solid foundation in business, I've built a well-rounded skill set that I'm eager to contribute to future opportunities in the field.`,

  contact: `You can reach me here:\n- Email: Zacharylalime@gmail.com\n- Phone: (716) 341-3678`,

  resume: `
EDUCATION:
  • Buffalo State University – Buffalo, NY
    Bachelor of Science in Computer Information Systems (In Progress)
    Expected Start: Fall 2025

  • Erie Community College – Buffalo, NY
    Associate of Applied Science in Information Technology
    SUNY Network Support Technology Certificate
    Expected Graduation: Summer 2025

PROFESSIONAL SUMMARY:
  • Actively engaged in IT industry applying studies in real-world environments
  • Four years experience as a Field Sales Representative at DSI Systems Inc
  • Strong leadership, strategic decision-making, collaborative teamwork

SKILLS:
  • Hardware Installation            • System performance optimization
  • Azure AD                         • Server Maintenance
  • Data Recovery                    • Office 365
  • Network Security                 • Software Updating
  • Active Directory                 • Software Configuration
  • Problem Solving                  • Network Troubleshooting
  • Customer Service                 • Network Maintenance
  • Server Troubleshooting           • Hardware Configuration

EXPERIENCE:

Synchronet - Network Administrator
Buffalo, NY | July 2025 - Current
  • Maintain LAN/WAN infrastructure to ensure uptime and performance
  • Configure and support routers, switches, firewalls, and wireless access points
  • Manage VPNs and secure remote access for offsite users
  • Use monitoring tools to track logs, traffic, and resolve issues
  • Administer DHCP, DNS, and Active Directory (GPOs, permissions)
  • Conduct security audits and apply patches/firmware updates
  • Document network setups and standard procedures
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

  clear: `Clearing the terminal...`,
};

// ====== DOM ELEMENTS ======
let bootOutput, bootScreen, terminal, commandInput;

// Command history for up/down arrow navigation
let history = [];
let historyIndex = -1;

// ====== INITIALIZATION ======
/**
 * Initialize the terminal application
 * Sets up DOM references and starts boot sequence
 */
function init() {
  // Get DOM element references
  bootOutput = document.getElementById('bootOutput');
  bootScreen = document.getElementById('bootScreen');
  terminal = document.getElementById('terminal');
  commandInput = document.getElementById('commandInput');

  // Validate required elements exist
  if (!bootOutput || !bootScreen || !terminal || !commandInput) {
    console.error('Required DOM elements not found');
    return;
  }

  // Start boot sequence
  startBootSequence();

  // Set up event listeners
  setupEventListeners();
}

// ====== BOOT SEQUENCE ======
/**
 * Displays the boot sequence animation line by line
 */
function startBootSequence() {
  const bootLines = generateBootSequence();
  let lineIndex = 0;

  const bootInterval = setInterval(() => {
    if (lineIndex < bootLines.length) {
      bootOutput.innerHTML += bootLines[lineIndex] + '\n';
      bootScreen.scrollTop = bootScreen.scrollHeight;
      lineIndex++;
    } else {
      clearInterval(bootInterval);
      transitionToTerminal();
    }
  }, CONFIG.BOOT_LINE_DELAY);
}

/**
 * Transitions from boot screen to interactive terminal
 */
function transitionToTerminal() {
  bootScreen.style.display = 'none';
  terminal.style.display = 'flex';
  commandInput.focus();
}

// ====== EVENT LISTENERS ======
/**
 * Set up all event listeners for terminal interactions
 */
function setupEventListeners() {
  // Focus input on body click/tap
  document.body.addEventListener('click', focusInput);
  document.body.addEventListener('touchstart', focusInput, { passive: true });

  // Handle keyboard input
  commandInput.addEventListener('keydown', handleKeyDown);

  // Prevent double-tap zoom on mobile
  let lastTouchEnd = 0;
  document.addEventListener('touchend', function(event) {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
      event.preventDefault();
    }
    lastTouchEnd = now;
  }, { passive: false });

  // Handle window resize to adjust terminal
  let resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      scrollToBottom();
    }, 250);
  });

  // Better mobile keyboard handling
  commandInput.addEventListener('blur', function() {
    // Restore scroll position on mobile keyboard close
    setTimeout(() => {
      window.scrollTo(0, 0);
      scrollToBottom();
    }, 100);
  });
}

/**
 * Focus the command input
 */
function focusInput() {
  if (terminal.style.display !== 'none') {
    commandInput.focus();
  }
}

/**
 * Handle keyboard events for command input
 * @param {KeyboardEvent} event - The keyboard event
 */
function handleKeyDown(event) {
  switch (event.key) {
    case 'Enter':
      event.preventDefault();
      handleEnterKey();
      break;

    case 'ArrowUp':
      event.preventDefault();
      navigateHistory(-1);
      break;

    case 'ArrowDown':
      event.preventDefault();
      navigateHistory(1);
      break;

    case 'Tab':
      event.preventDefault();
      autoComplete();
      break;
  }
}

/**
 * Handle Enter key press - process command
 */
function handleEnterKey() {
  const input = commandInput.value.trim();

  if (input) {
    addCommandLine(input);
    processCommand(input.toLowerCase());
    history.push(input);
    historyIndex = history.length;
    commandInput.value = '';
  }
}

/**
 * Navigate through command history
 * @param {number} direction - Direction to navigate (-1 for up, 1 for down)
 */
function navigateHistory(direction) {
  const newIndex = historyIndex + direction;

  if (newIndex >= 0 && newIndex < history.length) {
    historyIndex = newIndex;
    commandInput.value = history[historyIndex];
  } else if (newIndex >= history.length) {
    historyIndex = history.length;
    commandInput.value = '';
  }
}

// ====== COMMAND PROCESSING ======
/**
 * Display the entered command in the terminal
 * @param {string} input - The command entered by the user
 */
function addCommandLine(input) {
  const line = document.createElement('div');
  line.className = 'line';
  const promptHtml = `<span class="prompt">
    <span class="username">${CONFIG.USERNAME}</span><span class="at">@</span><span class="hostname">${CONFIG.HOSTNAME}</span><span class="separator">:</span><span class="path">${CONFIG.PATH}</span><span class="dollar">$</span>
  </span>`;
  line.innerHTML = promptHtml + ' ' + escapeHtml(input);
  terminal.insertBefore(line, commandInput.parentNode);
  scrollToBottom();
}

/**
 * Process and execute the entered command
 * @param {string} cmd - The command to process (lowercase)
 */
function processCommand(cmd) {
  // Validate command is a string
  if (typeof cmd !== 'string') {
    typeOutput('Invalid command format');
    return;
  }

  if (cmd === 'clear') {
    fakeLoading(() => {
      clearTerminal();
    });
  } else if (commands.hasOwnProperty(cmd)) {
    fakeLoading(() => {
      typeOutput(commands[cmd]);
    });
  } else {
    fakeLoading(() => {
      typeOutput(CONFIG.COMMAND_NOT_FOUND + escapeHtml(cmd) + ': command not found');
    });
  }
}

/**
 * Auto-complete command based on partial input
 */
function autoComplete() {
  const input = commandInput.value.trim();

  if (!input) return;

  const possible = Object.keys(commands).filter(cmd => cmd.startsWith(input));

  if (possible.length === 1) {
    commandInput.value = possible[0];
  } else if (possible.length > 1) {
    // Show available completions
    const completions = possible.join(', ');
    addStaticOutput(`Available: ${completions}`);
  }
}

// ====== OUTPUT DISPLAY ======
/**
 * Display output text with typing animation
 * @param {string} text - The text to display
 */
function typeOutput(text) {
  const outputDiv = document.createElement('div');
  outputDiv.className = 'output';
  terminal.insertBefore(outputDiv, commandInput.parentNode);

  let charIndex = 0;
  const interval = setInterval(() => {
    if (charIndex < text.length) {
      const char = text[charIndex];
      outputDiv.innerHTML += char === '\n' ? '<br>' : char;
      scrollToBottom();
      charIndex++;
    } else {
      clearInterval(interval);
    }
  }, CONFIG.TYPING_SPEED);
}

/**
 * Display a loading indicator before showing output
 * @param {Function} callback - Function to call after loading completes
 */
function fakeLoading(callback) {
  const loadingDiv = document.createElement('div');
  loadingDiv.className = 'output';
  loadingDiv.innerText = CONFIG.LOADING_TEXT;
  terminal.insertBefore(loadingDiv, commandInput.parentNode);
  scrollToBottom();

  setTimeout(() => {
    loadingDiv.remove();
    callback();
  }, CONFIG.LOADING_DELAY);
}

/**
 * Clear the terminal and reset to initial state
 */
function clearTerminal() {
  const outputs = terminal.querySelectorAll('.output, .line');

  outputs.forEach(output => {
    if (output !== commandInput.parentNode) {
      output.remove();
    }
  });

  addStaticOutput(CONFIG.WELCOME_MESSAGE);
  addStaticOutput(CONFIG.HELP_PROMPT);
}

/**
 * Add static (non-animated) output to the terminal
 * @param {string} text - The text to display
 */
function addStaticOutput(text) {
  const div = document.createElement('div');
  div.className = 'output';
  div.innerHTML = text.replace(/\n/g, '<br>');
  terminal.insertBefore(div, commandInput.parentNode);
  scrollToBottom();
}

/**
 * Scroll terminal to the bottom
 */
function scrollToBottom() {
  terminal.scrollTop = terminal.scrollHeight;
}

// ====== UTILITY FUNCTIONS ======
/**
 * Escape HTML to prevent XSS attacks
 * @param {string} text - Text to escape
 * @returns {string} Escaped text
 */
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

// ====== START APPLICATION ======
// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
