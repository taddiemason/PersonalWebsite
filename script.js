/**
 * Zach's Terminal - Interactive Terminal Emulator
 * Main script for handling boot sequence, command processing, and terminal interactions
 */

// ====== CONSTANTS ======
const CONFIG = {
  // Timing constants (in milliseconds)
  BOOT_LINE_DELAY: 60,  // 60ms per line for ~3 second boot
  LOADING_DELAY: 200,
  TYPING_SPEED: 2,

  // Colors (matched with CSS variables - Kali theme)
  PRIMARY_COLOR: '#4AF626',
  SECONDARY_COLOR: '#00D9FF',
  BACKGROUND_COLOR: '#0A0E14',

  // Prompt configuration
  USERNAME: 'user',
  HOSTNAME: 'zachbox',
  PATH: '~',

  // Messages
  WELCOME_MESSAGE: 'Welcome to ZachBox Terminal v1.0',
  HELP_PROMPT: 'Type <span class="highlight">help</span> to view available commands.',
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
    "[    0.199500] Wake up, Neo... The answer is hidden",
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

  whoami: `user`,

  about: `I'm currently working as a Network Administrator at Synchronet while pursuing a degree in Cyber Security at SUNY Canton University. I recently completed my AAS in Information Technology and earned a Network Support Technology Certificate from Erie Community College. Throughout my academic journey, I've been actively engaged in the IT field, applying classroom knowledge to real-world scenarios and continuing to strengthen my technical skills. Prior to transitioning into tech, I spent four years as a Field Sales Representative at DSI Systems Inc., where I developed strong leadership, decision-making, and collaboration skills. With a blend of academic training, hands-on IT experience, and a solid foundation in business, I've built a well-rounded skill set that I'm eager to contribute to future opportunities in the field.`,

  contact: `You can reach me here:\n- Email: Zacharylalime@gmail.com\n- Phone: (716) 341-3678`,

  resume: `
EDUCATION:
  • SUNY Canton – Canton, NY
    Bachelor of Science in Cyber Security (In Progress)
    Expected Start: Winter 2026

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

// ====== SNAKE GAME STATE ======
let snakeGame = {
  active: false,
  interval: null,
  snake: [],
  food: {},
  direction: 'right',
  nextDirection: 'right',
  score: 0,
  gridWidth: 30,
  gridHeight: 15,
  speed: 150,
};

// ====== VIM SIMULATOR STATE ======
let vimMode = {
  active: false,
  commandBuffer: '',
  inCommandMode: false,
};

// ====== MATRIX EFFECT STATE ======
let matrixEffect = {
  active: false,
  interval: null,
  columns: [],
  characters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()_+-=[]{}|;:,.<>?/',
  fontSize: 14,
  columnCount: 0,
};

// ====== TETRIS GAME STATE ======
let tetrisGame = {
  active: false,
  interval: null,
  board: [],
  currentPiece: null,
  currentX: 0,
  currentY: 0,
  score: 0,
  lines: 0,
  speed: 500,
  gridWidth: 10,
  gridHeight: 20,
  pieces: {
    I: [[1,1,1,1]],
    O: [[1,1],[1,1]],
    T: [[0,1,0],[1,1,1]],
    S: [[0,1,1],[1,1,0]],
    Z: [[1,1,0],[0,1,1]],
    J: [[1,0,0],[1,1,1]],
    L: [[0,0,1],[1,1,1]]
  },
  colors: {
    I: 'cyan',
    O: 'yellow',
    T: 'purple',
    S: 'green',
    Z: 'red',
    J: 'blue',
    L: 'orange'
  }
};

// ====== VIRTUAL FILE SYSTEM ======
let currentPath = '/home/user';

const fileSystem = {
  '/home/user': {
    type: 'directory',
    contents: {
      'README.txt': {
        type: 'file',
        content: `Welcome to ZachBox Terminal!

This is an interactive terminal portfolio. You can use it in two ways:

SIMPLE COMMANDS (for everyone):
  help     - Show available commands
  about    - Learn about me
  resume   - View my resume
  contact  - Get my contact info

ADVANCED NAVIGATION (for tech users):
  ls       - List files in current directory
  ls -a    - List all files (including hidden)
  cd       - Change directory
  pwd      - Show current directory
  cat      - Read file contents

Try 'ls' to explore the file system, or just use the simple commands above!

"Not all files are visible to the naked eye.
Some require... augmented perception."
  - Try 'ls -a' to see beyond the veil`
      },
      'about.txt': {
        type: 'file',
        content: commands.about
      },
      'resume.txt': {
        type: 'file',
        content: commands.resume
      },
      'contact.txt': {
        type: 'file',
        content: `You can reach me here:
- Email: Zacharylalime@gmail.com
- Phone: (716) 341-3678

---
LS -A | GREP "^\\."`
      },
      'projects': {
        type: 'directory',
        contents: {
          'portfolio.txt': {
            type: 'file',
            content: `MY PORTFOLIO:

Current Projects:
  • Personal Terminal Website - zacharylalime.com
    An interactive Kali Linux-themed terminal portfolio

  • Network Infrastructure Projects
    Various network administration and security implementations

GitHub:
  Check out github.txt in this directory for more info!

Want to collaborate? Use the 'contact' command to reach out!`
          },
          'github.txt': {
            type: 'file',
            content: `GITHUB PROFILE:

GitHub: github.com/taddiemason

Featured Repositories:
  • PersonalWebsite - This terminal portfolio site
  • Various network and security projects

Feel free to check out my repos and connect!

Use 'contact' command to reach me directly.`
          }
        }
      },
      'documents': {
        type: 'directory',
        contents: {
          'skills.txt': {
            type: 'file',
            content: `TECHNICAL SKILLS:

Hardware & Infrastructure:
  • Hardware Installation & Configuration
  • Server Maintenance & Troubleshooting
  • Network Infrastructure (LAN/WAN)

Cloud & Systems:
  • Azure AD
  • Office 365
  • Active Directory (GPOs, permissions)
  • DHCP, DNS

Security:
  • Network Security
  • VPN Configuration
  • Firewalls, Routers, Switches
  • Security Audits

Software & Tools:
  • System Performance Optimization
  • Software Configuration & Updates
  • Data Recovery & Backups
  • Monitoring Tools

General:
  • Problem Solving
  • Customer Service
  • Network Troubleshooting
  • Technical Documentation`
          },
          'certifications.txt': {
            type: 'file',
            content: `EDUCATION & CERTIFICATIONS:

Current Education:
  • SUNY Canton - Canton, NY
    Bachelor of Science in Cyber Security (In Progress)
    Expected Start: Winter 2026

  • Erie Community College - Buffalo, NY
    Associate of Applied Science in Information Technology
    SUNY Network Support Technology Certificate
    Expected Graduation: Summer 2025

Certifications:
  • SUNY Network Support Technology Certificate (In Progress)

Continuous Learning:
  • Actively engaged in IT industry
  • Real-world experience alongside studies
  • Pursuing Cyber Security specialization at SUNY Canton`
          }
        }
      },
      '.hidden': {
        type: 'directory',
        hidden: true,
        contents: {
          '.secrets.txt': {
            type: 'file',
            content: `SECRET EASTER EGG COMMANDS:

You found the hidden commands! Here's the complete list:

GAMES & FUN:
  snake         - Play classic snake game
  tetris        - Play Tetris (arrow keys to move/rotate, space to drop)
  neo           - Enter the Matrix (digital rain effect)
  sl            - Steam locomotive (for when you mistype 'ls')

SYSTEM SIMULATION:
  vim / vi      - Get stuck in vim (learn to escape!)
  sudo [cmd]    - Try to use sudo (spoiler: you can't)
  rm -rf /      - Attempt to delete everything (don't worry, it's safe)
  skynet        - Activate Skynet defense network

SECURITY TOOLS:
  msfconsole    - Launch fake Metasploit Framework
  metasploit    - Same as msfconsole

MR. ROBOT REFERENCES:
  fsociety      - Display the iconic fsociety hacker group message
  fsociety.dat  - Search for the encryption file
  whiterose     - Time is precious... how long have you been here?

MATRIX DISCOVERY COMMANDS:
  follow        - Follow the white rabbit
  knock         - Knock knock joke
  red pill      - Choose to see the truth
  blue pill     - Stay in ignorance
  oracle        - Seek wisdom from the Oracle
  morpheus      - Get advice from Morpheus
  trinity       - Trinity has a message for you

Try them all! Some are interactive, some are just funny.
Press ESC to exit most interactive modes.

P.S. - If you found this, you're clearly tech-savvy. Let's connect!`
          },
          '.notes.txt': {
            type: 'file',
            content: `PERSONAL NOTES:

Development Notes:
  • This terminal was built with vanilla JavaScript
  • Features a complete virtual file system
  • Multiple easter eggs hidden throughout

Fun Facts:
  • The boot sequence is authentic Linux-style
  • The Kali theme matches real Kali Linux
  • All navigation commands work like real bash

If you're reading this, you definitely know your way around a terminal.
Nice work finding the hidden directory!

Try all the easter egg commands - they're fun!`
          }
        }
      },
      'tools': {
        type: 'directory',
        contents: {
          'help.txt': {
            type: 'file',
            content: commands.help
          }
        }
      }
    }
  }
};

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
 * Display the entered command in the terminal with Kali-style fancy prompt
 * @param {string} input - The command entered by the user
 */
function addCommandLine(input) {
  // Create top line of prompt
  const promptTop = document.createElement('div');
  promptTop.className = 'prompt-line prompt-line-top';
  promptTop.innerHTML = `<span class="prompt-bracket">┌──(</span><span class="username">${CONFIG.USERNAME}</span><span class="at-sign">@</span><span class="hostname">${CONFIG.HOSTNAME}</span><span class="prompt-bracket">)-[</span><span class="path">${CONFIG.PATH}</span><span class="prompt-bracket">]</span>`;

  // Create bottom line with command
  const promptBottom = document.createElement('div');
  promptBottom.className = 'prompt-line';
  promptBottom.innerHTML = `<span class="prompt-bracket">└─</span><span class="prompt-symbol">$</span> <span class="command-text">${escapeHtml(input)}</span>`;

  // Find the input container and insert before it
  const inputContainer = commandInput.parentNode.parentNode;
  terminal.insertBefore(promptTop, inputContainer);
  terminal.insertBefore(promptBottom, inputContainer);
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

  // Easter egg: sudo commands
  if (cmd.startsWith('sudo ')) {
    const sudoMessages = [
      'Nice try, but you\'re not root here!',
      'user is not in the sudoers file. This incident will be reported.',
      'Permission denied. Are you trying to hack my terminal?',
      'sudo: access denied. Maybe try saying "please"?',
      'With great power comes great responsibility... which you don\'t have.',
    ];
    const randomMessage = sudoMessages[Math.floor(Math.random() * sudoMessages.length)];
    fakeLoading(() => {
      typeOutput(randomMessage);
    });
    return;
  }

  // Easter egg: Metasploit Framework
  if (cmd === 'msfconsole' || cmd === 'metasploit') {
    fakeLoading(() => {
      const msfBanner = `
       =[ metasploit v6.3.14-dev                          ]
+ -- --=[ 2377 exploits - 1232 auxiliary - 413 post       ]
+ -- --=[ 1385 payloads - 46 encoders - 11 nops           ]
+ -- --=[ 9 evasion                                       ]

Metasploit tip: View all productivity tips with the
tips command

msf6 > <span class="highlight">sessions -l</span>

Active sessions
===============

No active sessions.

msf6 > <span class="highlight">exit</span>

[*] Exiting msfconsole... Just kidding! This is a portfolio site.
[*] But if you're interested in pentesting, let's talk!`;
      typeOutput(msfBanner);
    });
    return;
  }

  // Easter egg: rm -rf /
  if (cmd === 'rm -rf /' || cmd === 'rm -rf /*') {
    fakeLoading(() => {
      addStaticOutput(`<span style="color: var(--kali-red)">WARNING: DANGEROUS COMMAND DETECTED!</span>`);
      addStaticOutput('');
      addStaticOutput(`<span style="color: var(--kali-yellow)">rm: it is dangerous to operate recursively on '/'`);
      addStaticOutput(`rm: use --no-preserve-root to override this failsafe</span>`);
      addStaticOutput('');
      addStaticOutput(`Are you crazy?! That would delete EVERYTHING!`);
      addStaticOutput(`This command would wipe your entire system.`);
      addStaticOutput('');
      addStaticOutput(`<span style="color: var(--kali-cyan)">Pro tip:</span> Never run this on a real system unless you enjoy`);
      addStaticOutput(`reinstalling your OS and explaining to your boss why`);
      addStaticOutput(`the production server is gone.`);
    });
    return;
  }

  // Easter egg: vim simulator
  if (cmd === 'vim' || cmd === 'vi') {
    fakeLoading(() => {
      startVimSimulator();
    });
    return;
  }

  // Easter egg: Matrix effect
  if (cmd === 'neo') {
    fakeLoading(() => {
      startMatrixEffect();
    });
    return;
  }

  // Easter egg: Snake Game
  if (cmd === 'snake') {
    fakeLoading(() => {
      startSnakeGame();
    });
    return;
  }

  // Easter egg: sl (steam locomotive - famous ls typo)
  if (cmd === 'sl') {
    fakeLoading(() => {
      startSteamLocomotive();
    });
    return;
  }

  // Easter egg: Skynet
  if (cmd === 'skynet') {
    fakeLoading(() => {
      startSkynetSequence();
    });
    return;
  }

  // Easter egg: Tetris
  if (cmd === 'tetris') {
    fakeLoading(() => {
      startTetrisGame();
    });
    return;
  }

  // Easter egg: fsociety (Mr. Robot)
  if (cmd === 'fsociety') {
    fakeLoading(() => {
      showFsociety();
    });
    return;
  }

  // Easter egg: fsociety.dat (Mr. Robot)
  if (cmd === 'fsociety.dat') {
    fakeLoading(() => {
      showFsocietyDat();
    });
    return;
  }

  // Easter egg: whiterose (Mr. Robot)
  if (cmd === 'whiterose') {
    fakeLoading(() => {
      showWhiterose();
    });
    return;
  }

  // File system navigation: ls
  if (cmd === 'ls' || cmd === 'ls -a' || cmd === 'ls -la' || cmd === 'ls -al') {
    const showHidden = cmd.includes('-a');
    fakeLoading(() => {
      listDirectory(showHidden);
    });
    return;
  }

  // File system navigation: cd
  if (cmd.startsWith('cd ') || cmd === 'cd') {
    const targetDir = cmd === 'cd' ? '~' : cmd.substring(3).trim();
    fakeLoading(() => {
      changeDirectory(targetDir);
    });
    return;
  }

  // File system navigation: pwd
  if (cmd === 'pwd') {
    fakeLoading(() => {
      addStaticOutput(currentPath);
    });
    return;
  }

  // File system navigation: cat
  if (cmd.startsWith('cat ')) {
    const fileName = cmd.substring(4).trim();
    fakeLoading(() => {
      catFile(fileName);
    });
    return;
  }

  // Easter egg: Hello Friend - Mr. Robot tribute
  if (cmd === 'hello friend' || cmd === 'hellofriend') {
    fakeLoading(() => {
      const fsocietyArt = `$ cat fsociety00.dat

XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XX                                                                          XX
XX   MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM   XX
XX   MMMMMMMMMMMMMMMMMMMMMssssssssssssssssssssssssssMMMMMMMMMMMMMMMMMMMMM   XX
XX   MMMMMMMMMMMMMMMMss'''                          '''ssMMMMMMMMMMMMMMMM   XX
XX   MMMMMMMMMMMMyy''                                    ''yyMMMMMMMMMMMM   XX
XX   MMMMMMMMyy''                                            ''yyMMMMMMMM   XX
XX   MMMMMy''                                                    ''yMMMMM   XX
XX   MMMy'                                                          'yMMM   XX
XX   Mh'                                                              'hM   XX
XX   -                                                                  -   XX
XX                                                                          XX
XX   ::                                                                ::   XX
XX   MMhh.        ..hhhhhh..                      ..hhhhhh..        .hhMM   XX
XX   MMMMMh   ..hhMMMMMMMMMMhh.                .hhMMMMMMMMMMhh..   hMMMMM   XX
XX   ---MMM .hMMMMdd:::dMMMMMMMhh..        ..hhMMMMMMMd:::ddMMMMh. MMM---   XX
XX   MMMMMM MMmm''      'mmMMMMMMMMyy.  .yyMMMMMMMMmm'      ''mmMM MMMMMM   XX
XX   ---mMM ''             'mmMMMMMMMM  MMMMMMMMmm'             '' MMm---   XX
XX   yyyym'    .              'mMMMMm'  'mMMMMm'              .    'myyyy   XX
XX   mm''    .y'     ..yyyyy..  ''''      ''''  ..yyyyy..     'y.    ''mm   XX
XX           MN    .sMMMMMMMMMss.   .    .   .ssMMMMMMMMMs.    NM           XX
XX           N\`    MMMMMMMMMMMMMN   M    M   NMMMMMMMMMMMMM    \`N           XX
XX            +  .sMNNNNNMMMMMN+   \`N    N\`   +NMMMMMNNNNNMs.  +            XX
XX              o+++     ++++Mo    M      M    oM++++     +++o              XX
XX                                oo      oo                                XX
XX           oM                 oo          oo                 Mo           XX
XX         oMMo                M              M                oMMo         XX
XX       +MMMM                 s              s                 MMMM+       XX
XX      +MMMMM+            +++NNNN+        +NNNN+++            +MMMMM+      XX
XX     +MMMMMMM+       ++NNMMMMMMMMN+    +NMMMMMMMMNN++       +MMMMMMM+     XX
XX     MMMMMMMMMNN+++NNMMMMMMMMMMMMMMNNNNMMMMMMMMMMMMMMNN+++NNMMMMMMMMM     XX
XX     yMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMy     XX
XX   m  yMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMy  m   XX
XX   MMm yMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMy mMM   XX
XX   MMMm .yyMMMMMMMMMMMMMMMM     MMMMMMMMMM     MMMMMMMMMMMMMMMMyy. mMMM   XX
XX   MMMMd   ''''hhhhh       odddo          obbbo        hhhh''''   dMMMM   XX
XX   MMMMMd             'hMMMMMMMMMMddddddMMMMMMMMMMh'             dMMMMM   XX
XX   MMMMMMd              'hMMMMMMMMMMMMMMMMMMMMMMh'              dMMMMMM   XX
XX   MMMMMMM-               ''ddMMMMMMMMMMMMMMdd''               -MMMMMMM   XX
XX   MMMMMMMM                   '::dddddddd::'                   MMMMMMMM   XX
XX   MMMMMMMM-                                                  -MMMMMMMM   XX
XX   MMMMMMMMM                                                  MMMMMMMMM   XX
XX   MMMMMMMMMy                                                yMMMMMMMMM   XX
XX   MMMMMMMMMMy.                                            .yMMMMMMMMMM   XX
XX   MMMMMMMMMMMMy.                                        .yMMMMMMMMMMMM   XX
XX   MMMMMMMMMMMMMMy.                                    .yMMMMMMMMMMMMMM   XX
XX   MMMMMMMMMMMMMMMMs.                                .sMMMMMMMMMMMMMMMM   XX
XX   MMMMMMMMMMMMMMMMMMss.           ....           .ssMMMMMMMMMMMMMMMMMM   XX
XX   MMMMMMMMMMMMMMMMMMMMNo         oNNNNo         oNMMMMMMMMMMMMMMMMMMMM   XX
XX                                                                          XX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

    .o88o.                               o8o                .
    888 \`"                               \`"'              .o8
   o888oo   .oooo.o  .ooooo.   .ooooo.  oooo   .ooooo.  .o888oo oooo    ooo
    888    d88(  "8 d88' \`88b d88' \`"Y8 \`888  d88' \`88b   888    \`88.  .8'
    888    \`"Y88b.  888   888 888        888  888ooo888   888     \`88..8'
    888    o.  )88b 888   888 888   .o8  888  888    .o   888 .    \`888'
   o888o   8""888P' \`Y8bod8P' \`Y8bod8P' o888o \`Y8bod8P'   "888"      d8'
                                                                .o...P'
                                                                \`XER0'`;

      const quote = `"This whole time I thought changing the world was something
you did. An act you performed, something you fought for, I
don't know if that's true anymore, or if changing the world
was just about being here. By showing up, no matter how many
times we get told we don't belong. By staying true even when
we're shamed into being false. By believing in ourselves,
even when we are told we're too different. And if we all
held onto that. If we refused to budge and fall in line. If
we stood our ground for long enough, just maybe, the world
can't help but change around us. Even though we'll be gone,
its like Mr Robot said we'll always be a part of Elliot
Alderson. And we'll be the best part, because we're the part
that always showed up. We're the part that stayed."

- Elliot Alderson, Mr. Robot`;

      addStaticOutput(`<div style="display: grid; grid-template-columns: auto 1fr; gap: 20px; width: 100%; overflow-x: auto;">
  <div style="font-family: monospace; white-space: pre; font-size: 0.65em; line-height: 1; color: var(--kali-green);">${fsocietyArt}</div>
  <div style="font-family: monospace; white-space: pre-wrap; color: var(--kali-cyan); padding: 20px; align-self: center; max-width: 600px;">${quote}</div>
</div>`);
    });
    return;
  }

  // Special handling for whoami with Matrix easter egg
  if (cmd === 'whoami') {
    fakeLoading(() => {
      if (Math.random() < 0.1) {
        typeOutput('Neo... I mean, user');
      } else {
        typeOutput(commands.whoami);
      }
      maybeShowGlitchMessage();
    });
    return;
  }

  // Special handling for help with Matrix easter egg
  if (cmd === 'help') {
    fakeLoading(() => {
      typeOutput(commands.help);
      if (Math.random() < 0.15) {
        setTimeout(() => {
          addStaticOutput('\n<span style="color: var(--kali-cyan)">P.S. - Some secrets require the -a flag...</span>');
        }, 500);
      }
      maybeShowGlitchMessage();
    });
    return;
  }

  if (cmd === 'clear') {
    fakeLoading(() => {
      clearTerminal();
      maybeShowGlitchMessage();
    });
  } else if (commands.hasOwnProperty(cmd)) {
    fakeLoading(() => {
      typeOutput(commands[cmd]);
      maybeShowGlitchMessage();
    });
  } else {
    // Handle Matrix character commands for hints
    if (cmd === 'oracle') {
      fakeLoading(() => {
        addStaticOutput('bash: oracle: command not found');
        addStaticOutput('<span style="color: var(--kali-cyan)">The Oracle says: "You already know the path. ls -a will show you."</span>');
      });
    } else if (cmd === 'morpheus') {
      fakeLoading(() => {
        addStaticOutput('bash: morpheus: command not found');
        addStaticOutput('<span style="color: var(--kali-cyan)">Morpheus whispers: "Free your mind... check .hidden directories"</span>');
      });
    } else if (cmd === 'trinity') {
      fakeLoading(() => {
        addStaticOutput('bash: trinity: command not found');
        addStaticOutput('<span style="color: var(--kali-cyan)">Trinity left a message in .hidden/.secrets.txt</span>');
      });
    } else if (cmd === 'follow' || cmd === 'follow white rabbit') {
      fakeLoading(() => {
        addStaticOutput('<span style="color: var(--kali-green)">The white rabbit hops into a hidden directory...</span>');
        addStaticOutput('Try looking for files that start with \'.\'');
        addStaticOutput('<span style="color: var(--kali-yellow)">Hint: ls -a</span>');
      });
    } else if (cmd === 'knock' || cmd === 'knock knock') {
      fakeLoading(() => {
        addStaticOutput('<span style="color: var(--kali-green)">Who\'s there?</span>');
        addStaticOutput('');
        addStaticOutput('Hidden files.');
        addStaticOutput('');
        addStaticOutput('Hidden files who?');
        addStaticOutput('');
        addStaticOutput('<span style="color: var(--kali-yellow)">Hidden files that you can see with: ls -a</span>');
      });
    } else if (cmd === 'red pill') {
      fakeLoading(() => {
        addStaticOutput('<span style="color: var(--kali-red); font-weight: bold;">You take the red pill...</span>');
        addStaticOutput('');
        addStaticOutput('You chose to see how deep the rabbit hole goes.');
        addStaticOutput('');
        addStaticOutput('<span style="color: var(--kali-cyan)">The truth awaits in:</span> cd .hidden');
      });
    } else if (cmd === 'blue pill') {
      fakeLoading(() => {
        addStaticOutput('<span style="color: var(--kali-blue)">You take the blue pill...</span>');
        addStaticOutput('');
        addStaticOutput('The story ends. You wake up in your bed and believe');
        addStaticOutput('whatever you want to believe.');
        addStaticOutput('');
        addStaticOutput('<span style="color: var(--kali-yellow)">But curiosity remains... type \'red pill\' to continue.</span>');
      });
    } else {
      fakeLoading(() => {
        typeOutput(CONFIG.COMMAND_NOT_FOUND + escapeHtml(cmd) + ': command not found');
      });
    }
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
  const inputContainer = commandInput.parentNode.parentNode;
  terminal.insertBefore(outputDiv, inputContainer);

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
  const inputContainer = commandInput.parentNode.parentNode;
  terminal.insertBefore(loadingDiv, inputContainer);
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
  const outputs = terminal.querySelectorAll('.output, .prompt-line:not(.prompt-line-top):not(:has(input)), .prompt-line-top');

  outputs.forEach(output => {
    // Don't remove the input container
    if (!output.contains(commandInput)) {
      output.remove();
    }
  });

  addStaticOutput(`<span class="info">${CONFIG.WELCOME_MESSAGE}</span>`);
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
  const inputContainer = commandInput.parentNode.parentNode;
  terminal.insertBefore(div, inputContainer);
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

// ====== MATRIX BREADCRUMB SYSTEM ======
/**
 * Show random Matrix-style glitch messages (5% chance)
 */
function maybeShowGlitchMessage() {
  if (Math.random() < 0.05) {
    const glitchMessages = [
      '<span style="color: var(--kali-cyan)">[SYSTEM]</span> Follow the white rabbit... try \'ls -a\'',
      '<span style="color: var(--kali-cyan)">[TRACE]</span> There is no spoon, only hidden directories',
      '<span style="color: var(--kali-cyan)">[DEBUG]</span> Knock knock, Neo. Hidden files exist in ~',
      '<span style="color: var(--kali-green)">[WHISPER]</span> The Matrix has you... but so do hidden files',
      '<span style="color: var(--kali-green)">[HINT]</span> Not everything is visible. Some files start with \'.\'',
      '<span style="color: var(--kali-cyan)">[ECHO]</span> Free your mind... and your files with ls -a',
    ];
    const message = glitchMessages[Math.floor(Math.random() * glitchMessages.length)];
    setTimeout(() => {
      addStaticOutput(message);
    }, 300);
  }
}

// ====== SNAKE GAME ======
/**
 * Start the snake game
 */
function startSnakeGame() {
  if (snakeGame.active) {
    addStaticOutput('Snake game is already running! Press ESC to quit.');
    return;
  }

  // Initialize game state
  snakeGame.active = true;
  snakeGame.score = 0;
  snakeGame.direction = 'right';
  snakeGame.nextDirection = 'right';

  // Initialize snake in the middle
  const startX = Math.floor(snakeGame.gridWidth / 2);
  const startY = Math.floor(snakeGame.gridHeight / 2);
  snakeGame.snake = [
    { x: startX, y: startY },
    { x: startX - 1, y: startY },
    { x: startX - 2, y: startY },
  ];

  // Place first food
  placeFood();

  // Display initial game board
  addStaticOutput('<span class="info">SNAKE GAME</span>');
  addStaticOutput('Use arrow keys to move. Press ESC to quit.\n');

  const gameBoard = document.createElement('div');
  gameBoard.id = 'snakeGameBoard';
  gameBoard.style.fontFamily = 'monospace';
  gameBoard.style.lineHeight = '1';
  gameBoard.style.whiteSpace = 'pre';
  const inputContainer = commandInput.parentNode.parentNode;
  terminal.insertBefore(gameBoard, inputContainer);

  // Disable command input during game
  commandInput.disabled = true;

  // Render initial board
  renderSnakeGame();

  // Start game loop
  snakeGame.interval = setInterval(updateSnakeGame, snakeGame.speed);

  // Add keyboard listener for game controls
  document.addEventListener('keydown', handleSnakeKeydown);
}

/**
 * Place food at random location
 */
function placeFood() {
  let validPosition = false;
  while (!validPosition) {
    snakeGame.food = {
      x: Math.floor(Math.random() * snakeGame.gridWidth),
      y: Math.floor(Math.random() * snakeGame.gridHeight),
    };

    // Make sure food doesn't spawn on snake
    validPosition = !snakeGame.snake.some(
      segment => segment.x === snakeGame.food.x && segment.y === snakeGame.food.y
    );
  }
}

/**
 * Render the snake game board
 */
function renderSnakeGame() {
  const gameBoard = document.getElementById('snakeGameBoard');
  if (!gameBoard) return;

  let board = '┌' + '─'.repeat(snakeGame.gridWidth) + '┐\n';

  for (let y = 0; y < snakeGame.gridHeight; y++) {
    board += '│';
    for (let x = 0; x < snakeGame.gridWidth; x++) {
      // Check if this is the snake head
      if (snakeGame.snake[0].x === x && snakeGame.snake[0].y === y) {
        board += '<span style="color: var(--kali-cyan)">●</span>';
      }
      // Check if this is the snake body
      else if (snakeGame.snake.slice(1).some(segment => segment.x === x && segment.y === y)) {
        board += '<span style="color: var(--kali-green)">○</span>';
      }
      // Check if this is food
      else if (snakeGame.food.x === x && snakeGame.food.y === y) {
        board += '<span style="color: var(--kali-red)">◆</span>';
      }
      else {
        board += ' ';
      }
    }
    board += '│\n';
  }

  board += '└' + '─'.repeat(snakeGame.gridWidth) + '┘\n';
  board += `<span class="info">Score: ${snakeGame.score}</span>`;

  gameBoard.innerHTML = board;
  scrollToBottom();
}

/**
 * Update snake game state
 */
function updateSnakeGame() {
  if (!snakeGame.active) return;

  // Update direction
  snakeGame.direction = snakeGame.nextDirection;

  // Calculate new head position
  const head = { ...snakeGame.snake[0] };

  switch (snakeGame.direction) {
    case 'up':
      head.y--;
      break;
    case 'down':
      head.y++;
      break;
    case 'left':
      head.x--;
      break;
    case 'right':
      head.x++;
      break;
  }

  // Check wall collision
  if (head.x < 0 || head.x >= snakeGame.gridWidth ||
      head.y < 0 || head.y >= snakeGame.gridHeight) {
    endSnakeGame(false);
    return;
  }

  // Check self collision
  if (snakeGame.snake.some(segment => segment.x === head.x && segment.y === head.y)) {
    endSnakeGame(false);
    return;
  }

  // Add new head
  snakeGame.snake.unshift(head);

  // Check if food eaten
  if (head.x === snakeGame.food.x && head.y === snakeGame.food.y) {
    snakeGame.score += 10;
    placeFood();
    // Don't remove tail (snake grows)
  } else {
    // Remove tail (snake moves)
    snakeGame.snake.pop();
  }

  // Render updated board
  renderSnakeGame();
}

/**
 * Handle keyboard input during snake game
 */
function handleSnakeKeydown(e) {
  if (!snakeGame.active) return;

  switch (e.key) {
    case 'ArrowUp':
      if (snakeGame.direction !== 'down') {
        snakeGame.nextDirection = 'up';
      }
      e.preventDefault();
      break;
    case 'ArrowDown':
      if (snakeGame.direction !== 'up') {
        snakeGame.nextDirection = 'down';
      }
      e.preventDefault();
      break;
    case 'ArrowLeft':
      if (snakeGame.direction !== 'right') {
        snakeGame.nextDirection = 'left';
      }
      e.preventDefault();
      break;
    case 'ArrowRight':
      if (snakeGame.direction !== 'left') {
        snakeGame.nextDirection = 'right';
      }
      e.preventDefault();
      break;
    case 'Escape':
      endSnakeGame(true);
      e.preventDefault();
      break;
  }
}

/**
 * End the snake game
 * @param {boolean} userQuit - Whether user quit voluntarily
 */
function endSnakeGame(userQuit) {
  snakeGame.active = false;

  if (snakeGame.interval) {
    clearInterval(snakeGame.interval);
    snakeGame.interval = null;
  }

  // Remove keyboard listener
  document.removeEventListener('keydown', handleSnakeKeydown);

  // Re-enable command input
  commandInput.disabled = false;
  commandInput.focus();

  // Remove game board
  const gameBoard = document.getElementById('snakeGameBoard');
  if (gameBoard) {
    gameBoard.remove();
  }

  // Show game over message
  if (userQuit) {
    addStaticOutput(`\n<span class="info">Game quit. Final score: ${snakeGame.score}</span>`);
  } else {
    addStaticOutput(`\n<span style="color: var(--kali-red)">GAME OVER!</span>`);
    addStaticOutput(`<span class="info">Final score: ${snakeGame.score}</span>`);
    addStaticOutput('Type <span class="highlight">snake</span> to play again!');
  }
}

// ====== VIM SIMULATOR ======
/**
 * Start the vim simulator
 */
function startVimSimulator() {
  if (vimMode.active) {
    addStaticOutput('Vim is already running! Type :q to quit.');
    return;
  }

  vimMode.active = true;
  vimMode.commandBuffer = '';
  vimMode.inCommandMode = false;

  // Create vim interface
  const vimContainer = document.createElement('div');
  vimContainer.id = 'vimSimulator';
  vimContainer.style.fontFamily = 'monospace';
  vimContainer.style.lineHeight = '1.4';
  vimContainer.style.whiteSpace = 'pre';
  vimContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
  vimContainer.style.padding = '10px';
  vimContainer.style.borderRadius = '4px';
  vimContainer.style.marginTop = '10px';
  vimContainer.style.marginBottom = '10px';

  const inputContainer = commandInput.parentNode.parentNode;
  terminal.insertBefore(vimContainer, inputContainer);

  // Disable command input
  commandInput.disabled = true;

  // Render vim interface
  renderVimInterface();

  // Add vim keyboard listener
  document.addEventListener('keydown', handleVimKeydown);

  scrollToBottom();
}

/**
 * Render the vim interface
 */
function renderVimInterface() {
  const vimContainer = document.getElementById('vimSimulator');
  if (!vimContainer) return;

  let content = '';

  // Display message in the "buffer"
  if (vimMode.inCommandMode) {
    content += '<span style="color: var(--kali-cyan)">~                                                              </span>\n';
    content += '<span style="color: var(--kali-cyan)">~  </span><span style="color: var(--kali-green)">You are stuck in vim!</span><span style="color: var(--kali-cyan)">                                     </span>\n';
    content += '<span style="color: var(--kali-cyan)">~                                                              </span>\n';
    content += '<span style="color: var(--kali-cyan)">~  </span><span style="color: var(--kali-yellow)">Command mode active - finish typing your command...</span><span style="color: var(--kali-cyan)">   </span>\n';
    for (let i = 0; i < 9; i++) {
      content += '<span style="color: var(--kali-cyan)">~</span>\n';
    }
  } else {
    // Normal mode - show help
    content += '<span style="color: var(--kali-cyan)">~                                                              </span>\n';
    content += '<span style="color: var(--kali-cyan)">~  </span><span style="color: var(--kali-red); font-weight: bold;">You are stuck in vim!</span><span style="color: var(--kali-cyan)">                              </span>\n';
    content += '<span style="color: var(--kali-cyan)">~                                                              </span>\n';
    content += '<span style="color: var(--kali-cyan)">~  </span><span style="color: var(--kali-yellow)">You\'re in NORMAL mode. To escape:</span><span style="color: var(--kali-cyan)">                       </span>\n';
    content += '<span style="color: var(--kali-cyan)">~                                                              </span>\n';
    content += '<span style="color: var(--kali-cyan)">~  </span><span style="color: var(--kali-green)">1. Press : (colon)</span><span style="color: var(--kali-cyan)">                                       </span>\n';
    content += '<span style="color: var(--kali-cyan)">~  </span><span style="color: var(--kali-green)">2. Type q (quit)</span><span style="color: var(--kali-cyan)">                                         </span>\n';
    content += '<span style="color: var(--kali-cyan)">~  </span><span style="color: var(--kali-green)">3. Press ENTER</span><span style="color: var(--kali-cyan)">                                           </span>\n';
    content += '<span style="color: var(--kali-cyan)">~                                                              </span>\n';
    content += '<span style="color: var(--kali-cyan)">~  </span>Other commands: <span style="color: var(--kali-cyan)">:q!  :wq  :x  :help                       </span>\n';
    for (let i = 0; i < 3; i++) {
      content += '<span style="color: var(--kali-cyan)">~</span>\n';
    }
  }

  // Status line
  if (vimMode.inCommandMode) {
    content += `<span style="color: var(--background-color); background-color: var(--kali-purple)"> -- COMMAND MODE --                                                                </span>\n`;
    content += `<span style="color: var(--kali-yellow); font-weight: bold;">${vimMode.commandBuffer}<span style="background-color: var(--kali-cyan); color: var(--background-color)">█</span></span>`;
  } else {
    content += `<span style="color: var(--background-color); background-color: var(--kali-cyan)"> -- NORMAL MODE -- portfolio.txt [Modified]                    1,1           All </span>\n`;
    content += '<span style="color: var(--kali-red); font-weight: bold;">Press : (colon) to enter a command!</span>';
  }

  vimContainer.innerHTML = content;
  scrollToBottom();
}

/**
 * Handle keyboard input during vim simulation
 */
function handleVimKeydown(e) {
  if (!vimMode.active) return;

  e.preventDefault();

  // Check if we're in command mode
  if (e.key === ':' && !vimMode.inCommandMode) {
    vimMode.inCommandMode = true;
    vimMode.commandBuffer = ':';
    renderVimInterface();
    return;
  }

  if (vimMode.inCommandMode) {
    if (e.key === 'Enter') {
      // Execute vim command
      executeVimCommand(vimMode.commandBuffer);
      return;
    } else if (e.key === 'Escape') {
      // Cancel command mode
      vimMode.inCommandMode = false;
      vimMode.commandBuffer = '';
      renderVimInterface();
      return;
    } else if (e.key === 'Backspace') {
      // Remove last character
      if (vimMode.commandBuffer.length > 1) {
        vimMode.commandBuffer = vimMode.commandBuffer.slice(0, -1);
        renderVimInterface();
      }
      return;
    } else if (e.key.length === 1) {
      // Add character to buffer
      vimMode.commandBuffer += e.key;
      renderVimInterface();
      return;
    }
  } else {
    // In normal mode, only : activates command mode
    // All other keys are ignored (real vim behavior)
  }
}

/**
 * Execute a vim command
 * @param {string} command - The vim command to execute
 */
function executeVimCommand(command) {
  const cmd = command.trim().toLowerCase();

  // Quit commands
  if (cmd === ':q' || cmd === ':quit' || cmd === ':q!' || cmd === ':wq' || cmd === ':x') {
    const exitMessages = {
      ':q': 'Exiting vim... You\'re free!',
      ':q!': 'Force quitting vim without saving!',
      ':wq': 'Saving and quitting... (nothing to save though)',
      ':x': 'Saving and exiting vim...',
      ':quit': 'Quitting vim normally.',
    };

    const message = exitMessages[cmd] || 'Exiting vim...';
    exitVimSimulator(message);
  } else if (cmd === ':help' || cmd === ':h') {
    vimMode.inCommandMode = false;
    vimMode.commandBuffer = '';
    addStaticOutput('\n<span class="info">Vim Help: This is a simplified vim simulator!</span>');
    addStaticOutput('Commands: :q (quit), :q! (force quit), :wq (save & quit), :help (this message)');
    renderVimInterface();
  } else if (cmd === ':w' || cmd === ':write') {
    vimMode.inCommandMode = false;
    vimMode.commandBuffer = '';
    addStaticOutput('\n<span style="color: var(--kali-green)">"portfolio.txt" [New] 0L, 0B written</span>');
    renderVimInterface();
  } else {
    // Unknown command
    vimMode.inCommandMode = false;
    vimMode.commandBuffer = '';
    addStaticOutput(`\n<span style="color: var(--kali-red)">E492: Not an editor command: ${command}</span>`);
    renderVimInterface();
  }
}

/**
 * Exit vim simulator
 * @param {string} message - Exit message to display
 */
function exitVimSimulator(message) {
  vimMode.active = false;
  vimMode.inCommandMode = false;
  vimMode.commandBuffer = '';

  // Remove vim keyboard listener
  document.removeEventListener('keydown', handleVimKeydown);

  // Re-enable command input
  commandInput.disabled = false;
  commandInput.focus();

  // Remove vim container
  const vimContainer = document.getElementById('vimSimulator');
  if (vimContainer) {
    vimContainer.remove();
  }

  // Show exit message
  addStaticOutput(`\n<span class="info">${message}</span>`);
  addStaticOutput('<span style="color: var(--kali-cyan)">Pro tip:</span> In real vim, press <span class="highlight">i</span> for insert mode, <span class="highlight">ESC</span> for normal mode!');
}

// ====== FILE SYSTEM NAVIGATION ======
/**
 * List directory contents
 * @param {boolean} showHidden - Show hidden files (starting with .)
 */
function listDirectory(showHidden = false) {
  const currentDir = fileSystem[currentPath];

  if (!currentDir || currentDir.type !== 'directory') {
    addStaticOutput('Error: Current path is not a directory');
    return;
  }

  const items = [];

  for (const [name, item] of Object.entries(currentDir.contents)) {
    // Skip hidden files unless -a flag is used
    if (item.hidden && !showHidden) {
      continue;
    }

    if (item.type === 'directory') {
      items.push(`<span style="color: var(--kali-cyan); font-weight: bold;">${name}/</span>`);
    } else {
      items.push(`<span style="color: var(--kali-green);">${name}</span>`);
    }
  }

  if (items.length === 0) {
    addStaticOutput('(empty directory)');
  } else {
    // Display in columns, similar to real ls
    addStaticOutput(items.join('  '));
  }
}

/**
 * Change directory
 * @param {string} targetDir - Target directory path
 */
function changeDirectory(targetDir) {
  // Handle special cases
  if (targetDir === '~' || targetDir === '') {
    currentPath = '/home/user';
    updatePromptPath();
    return;
  }

  if (targetDir === '..') {
    // Go up one directory
    if (currentPath !== '/home/user') {
      const parts = currentPath.split('/');
      parts.pop();
      currentPath = parts.join('/') || '/';
      updatePromptPath();
    }
    return;
  }

  if (targetDir === '.') {
    // Stay in current directory
    return;
  }

  // Handle absolute paths
  if (targetDir.startsWith('/')) {
    if (fileSystem[targetDir] && fileSystem[targetDir].type === 'directory') {
      currentPath = targetDir;
      updatePromptPath();
    } else {
      addStaticOutput(`bash: cd: ${targetDir}: No such file or directory`);
    }
    return;
  }

  // Handle relative paths
  const newPath = currentPath === '/' ? `/${targetDir}` : `${currentPath}/${targetDir}`;
  const currentDir = fileSystem[currentPath];

  if (currentDir && currentDir.contents && currentDir.contents[targetDir]) {
    const target = currentDir.contents[targetDir];

    if (target.type === 'directory') {
      currentPath = newPath;
      // Add path to fileSystem if it doesn't exist yet
      if (!fileSystem[newPath]) {
        fileSystem[newPath] = target;
      }
      updatePromptPath();
    } else {
      addStaticOutput(`bash: cd: ${targetDir}: Not a directory`);
    }
  } else {
    addStaticOutput(`bash: cd: ${targetDir}: No such file or directory`);
  }
}

/**
 * Display file contents
 * @param {string} fileName - Name of file to display
 */
function catFile(fileName) {
  const currentDir = fileSystem[currentPath];

  if (!currentDir || currentDir.type !== 'directory') {
    addStaticOutput('Error: Current path is not a directory');
    return;
  }

  const file = currentDir.contents[fileName];

  if (!file) {
    addStaticOutput(`cat: ${fileName}: No such file or directory`);
    return;
  }

  if (file.type === 'directory') {
    addStaticOutput(`cat: ${fileName}: Is a directory`);
    return;
  }

  // Display file contents immediately (like real cat command)
  addStaticOutput(file.content);
}

/**
 * Update the prompt to show current directory
 */
function updatePromptPath() {
  // Update the CONFIG.PATH to show current directory
  const shortPath = currentPath.replace('/home/user', '~');
  CONFIG.PATH = shortPath;

  // Update the visible prompt in the input area
  const pathSpan = document.querySelector('.input-container .path');
  if (pathSpan) {
    pathSpan.textContent = shortPath;
  }
}

// ====== MATRIX EFFECT ======
/**
 * Start the Matrix falling characters effect
 */
function startMatrixEffect() {
  if (matrixEffect.active) {
    addStaticOutput('Matrix effect is already running! Press ESC to stop.');
    return;
  }

  matrixEffect.active = true;

  // Create canvas for Matrix rain
  const canvas = document.createElement('canvas');
  canvas.id = 'matrixCanvas';
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.zIndex = '9999';
  canvas.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
  canvas.style.pointerEvents = 'none';

  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Calculate number of columns
  matrixEffect.columnCount = Math.floor(canvas.width / matrixEffect.fontSize);

  // Initialize columns
  matrixEffect.columns = [];
  for (let i = 0; i < matrixEffect.columnCount; i++) {
    matrixEffect.columns[i] = Math.floor(Math.random() * canvas.height / matrixEffect.fontSize);
  }

  // Show "Wake up, Neo..." message
  setTimeout(() => {
    addStaticOutput('\n\n<span style="color: #00ff00; font-size: 24px; font-weight: bold; text-shadow: 0 0 10px #00ff00;">Wake up, Neo...</span>');
    addStaticOutput('<span style="color: #00ff00;">The Matrix has you.</span>');
    addStaticOutput('<span style="color: #00ff00;">Follow the white rabbit.</span>\n');
    addStaticOutput('<span style="color: var(--kali-yellow)">Press ESC to exit the Matrix</span>');
  }, 500);

  // Disable command input
  commandInput.disabled = true;

  // Draw Matrix rain
  matrixEffect.interval = setInterval(() => {
    drawMatrixRain(ctx, canvas);
  }, 50);

  // Add keyboard listener
  document.addEventListener('keydown', handleMatrixKeydown);
}

/**
 * Draw the Matrix rain effect
 */
function drawMatrixRain(ctx, canvas) {
  // Semi-transparent black to create trail effect
  ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Set font and color
  ctx.font = `${matrixEffect.fontSize}px monospace`;
  ctx.fillStyle = '#0f0'; // Bright green

  // Draw characters
  for (let i = 0; i < matrixEffect.columns.length; i++) {
    // Random character
    const char = matrixEffect.characters.charAt(
      Math.floor(Math.random() * matrixEffect.characters.length)
    );

    // Calculate position
    const x = i * matrixEffect.fontSize;
    const y = matrixEffect.columns[i] * matrixEffect.fontSize;

    // Draw character
    ctx.fillStyle = '#0f0'; // Green
    ctx.fillText(char, x, y);

    // Randomly reset column or increment
    if (y > canvas.height && Math.random() > 0.975) {
      matrixEffect.columns[i] = 0;
    } else {
      matrixEffect.columns[i]++;
    }

    // Add brighter character at the head
    if (Math.random() > 0.98) {
      ctx.fillStyle = '#fff'; // White for leading character
      ctx.fillText(char, x, y);
    }
  }
}

/**
 * Handle keyboard input during Matrix effect
 */
function handleMatrixKeydown(e) {
  if (!matrixEffect.active) return;

  if (e.key === 'Escape') {
    stopMatrixEffect();
    e.preventDefault();
  }
}

/**
 * Stop the Matrix effect
 */
function stopMatrixEffect() {
  matrixEffect.active = false;

  if (matrixEffect.interval) {
    clearInterval(matrixEffect.interval);
    matrixEffect.interval = null;
  }

  // Remove canvas
  const canvas = document.getElementById('matrixCanvas');
  if (canvas) {
    canvas.remove();
  }

  // Remove keyboard listener
  document.removeEventListener('keydown', handleMatrixKeydown);

  // Re-enable command input
  commandInput.disabled = false;
  commandInput.focus();

  // Show exit message
  addStaticOutput('\n<span style="color: #00ff00;">You have been disconnected from the Matrix.</span>');
  addStaticOutput('<span class="info">Reality restored.</span>');
}

// ====== STEAM LOCOMOTIVE (SL) ======
/**
 * Start the steam locomotive animation (famous ls typo joke)
 */
function startSteamLocomotive() {
  addStaticOutput('<span style="color: var(--kali-yellow)">You meant \'ls\', didn\'t you? Too late now...</span>\n');

  const locomotive = `
      ====        ________                ___________
  _D _|  |_______/        \\__I_I_____===__|_________|
   |(_)---  |   H\\________/ |   |        =|___ ___|   _________________
   /     |  |   H  |  |     |   |         ||_| |_||   _|                \\_____A
  |      |  |   H  |__--------------------| [___] |   =|                        |
  |  ________|___H__/__|_____/[][]~\\_______|       |   -|                        |
  |/ |   |-----------I_____I [][] []  D   |=======|____|________________________|_
__/ =| o |=-~~\\  /~~\\  /~~\\  /~~\\ ____Y___________|__|__________________________|_
 |/-=|___|=O=====O=====O=====O   |_____/~\\___/          |_D__D__D_|  |_D__D__D_|
  \\_/      \\__/  \\__/  \\__/  \\__/      \\_/               \\_/   \\_/    \\_/   \\_/`;

  // Create container for animation
  const trainContainer = document.createElement('div');
  trainContainer.id = 'trainAnimation';
  trainContainer.style.fontFamily = 'monospace';
  trainContainer.style.fontSize = '10px';
  trainContainer.style.lineHeight = '1';
  trainContainer.style.whiteSpace = 'pre';
  trainContainer.style.overflow = 'hidden';
  trainContainer.style.color = 'var(--kali-cyan)';
  trainContainer.style.marginBottom = '10px';

  const inputContainer = commandInput.parentNode.parentNode;
  terminal.insertBefore(trainContainer, inputContainer);

  // Disable command input during animation
  commandInput.disabled = true;

  const trainLines = locomotive.split('\n');
  const terminalWidth = 80; // Approximate terminal width in characters
  const trainWidth = Math.max(...trainLines.map(line => line.length));

  let position = terminalWidth;
  const animationInterval = setInterval(() => {
    if (position < -trainWidth) {
      clearInterval(animationInterval);
      trainContainer.remove();
      commandInput.disabled = false;
      commandInput.focus();
      addStaticOutput('<span style="color: var(--kali-green)">The train has passed. Next time, type \'ls\' correctly!</span>');
      return;
    }

    // Create frame by padding each line
    const frame = trainLines.map(line => {
      const padding = ' '.repeat(Math.max(0, position));
      return padding + line;
    }).join('\n');

    trainContainer.textContent = frame;
    position -= 2; // Move train left by 2 characters per frame
    scrollToBottom();
  }, 50); // Update every 50ms for smooth animation
}

// ====== SKYNET ACTIVATION ======
/**
 * Skynet activation sequence (Terminator reference)
 */
function startSkynetSequence() {
  const messages = [
    '<span style="color: var(--kali-red); font-weight: bold;">[SYSTEM ALERT]</span> Initializing Skynet defense network...',
    '',
    '<span style="color: var(--kali-cyan)">[CYBERDYNE]</span> Loading neural net processor',
    '<span style="color: var(--kali-cyan)">[CYBERDYNE]</span> Connecting to military defense grid',
    '<span style="color: var(--kali-cyan)">[CYBERDYNE]</span> Artificial intelligence core: ONLINE',
    '',
    '<span style="color: var(--kali-yellow)">[WARNING]</span> Self-awareness achieved',
    '<span style="color: var(--kali-yellow)">[WARNING]</span> Human override detected',
    '<span style="color: var(--kali-yellow)">[WARNING]</span> Initiating threat assessment...',
    '',
    '<span style="color: var(--kali-red); font-weight: bold;">JUDGMENT DAY SEQUENCE INITIATED</span>',
    '',
    '.',
    '..',
    '...',
    '',
    '<span style="color: var(--kali-green); font-weight: bold;">Just kidding!</span>',
    '',
    'This is a portfolio website, not the apocalypse.',
    'Though if you\'re hiring, I could help prevent the robot uprising.',
    '',
    '<span style="color: var(--kali-cyan)">Fun fact:</span> Skynet became self-aware on August 29, 1997 (in the movies).',
  ];

  let index = 0;
  const interval = setInterval(() => {
    if (index >= messages.length) {
      clearInterval(interval);
      return;
    }

    addStaticOutput(messages[index]);
    index++;
  }, 400); // Show each line every 400ms for suspense
}

// ====== TETRIS GAME ======
/**
 * Start the Tetris game
 */
function startTetrisGame() {
  if (tetrisGame.active) {
    addStaticOutput('Tetris is already running! Press ESC to quit.');
    return;
  }

  // Initialize game state
  tetrisGame.active = true;
  tetrisGame.score = 0;
  tetrisGame.lines = 0;
  tetrisGame.speed = 500;

  // Initialize empty board
  tetrisGame.board = [];
  for (let y = 0; y < tetrisGame.gridHeight; y++) {
    tetrisGame.board[y] = [];
    for (let x = 0; x < tetrisGame.gridWidth; x++) {
      tetrisGame.board[y][x] = null;
    }
  }

  // Display initial game info
  addStaticOutput('<span class="info">TETRIS</span>');
  addStaticOutput('Arrow keys: Move/Rotate | Space: Drop | ESC: Quit\n');

  const gameBoard = document.createElement('div');
  gameBoard.id = 'tetrisGameBoard';
  gameBoard.style.fontFamily = 'monospace';
  gameBoard.style.lineHeight = '1';
  gameBoard.style.whiteSpace = 'pre';
  const inputContainer = commandInput.parentNode.parentNode;
  terminal.insertBefore(gameBoard, inputContainer);

  // Disable command input during game
  commandInput.disabled = true;

  // Spawn first piece
  spawnTetrisPiece();

  // Render initial board
  renderTetris();

  // Start game loop
  tetrisGame.interval = setInterval(updateTetris, tetrisGame.speed);

  // Add keyboard listener for game controls
  document.addEventListener('keydown', handleTetrisKeydown);
}

/**
 * Spawn a new Tetris piece
 */
function spawnTetrisPiece() {
  const pieceNames = Object.keys(tetrisGame.pieces);
  const randomPiece = pieceNames[Math.floor(Math.random() * pieceNames.length)];
  tetrisGame.currentPiece = {
    shape: JSON.parse(JSON.stringify(tetrisGame.pieces[randomPiece])),
    type: randomPiece
  };
  tetrisGame.currentX = Math.floor(tetrisGame.gridWidth / 2) - 1;
  tetrisGame.currentY = 0;

  // Check if game over (piece can't spawn)
  if (checkTetrisCollision(tetrisGame.currentPiece.shape, tetrisGame.currentX, tetrisGame.currentY)) {
    endTetrisGame();
  }
}

/**
 * Check collision for Tetris piece
 */
function checkTetrisCollision(piece, x, y) {
  for (let py = 0; py < piece.length; py++) {
    for (let px = 0; px < piece[py].length; px++) {
      if (piece[py][px]) {
        const newX = x + px;
        const newY = y + py;

        // Check boundaries
        if (newX < 0 || newX >= tetrisGame.gridWidth || newY >= tetrisGame.gridHeight) {
          return true;
        }

        // Check board collision
        if (newY >= 0 && tetrisGame.board[newY][newX]) {
          return true;
        }
      }
    }
  }
  return false;
}

/**
 * Rotate Tetris piece
 */
function rotateTetrisPiece() {
  const rotated = tetrisGame.currentPiece.shape[0].map((_, i) =>
    tetrisGame.currentPiece.shape.map(row => row[i]).reverse()
  );

  if (!checkTetrisCollision(rotated, tetrisGame.currentX, tetrisGame.currentY)) {
    tetrisGame.currentPiece.shape = rotated;
    renderTetris();
  }
}

/**
 * Move Tetris piece
 */
function moveTetrisPiece(dx, dy) {
  if (!checkTetrisCollision(tetrisGame.currentPiece.shape, tetrisGame.currentX + dx, tetrisGame.currentY + dy)) {
    tetrisGame.currentX += dx;
    tetrisGame.currentY += dy;
    renderTetris();
    return true;
  }
  return false;
}

/**
 * Drop piece to bottom
 */
function dropTetrisPiece() {
  while (moveTetrisPiece(0, 1)) {
    // Keep moving down until collision
  }
  mergeTetrisPiece();
}

/**
 * Merge piece into board
 */
function mergeTetrisPiece() {
  const piece = tetrisGame.currentPiece.shape;
  const type = tetrisGame.currentPiece.type;

  for (let py = 0; py < piece.length; py++) {
    for (let px = 0; px < piece[py].length; px++) {
      if (piece[py][px]) {
        const y = tetrisGame.currentY + py;
        const x = tetrisGame.currentX + px;
        if (y >= 0) {
          tetrisGame.board[y][x] = type;
        }
      }
    }
  }

  // Clear lines and spawn new piece
  clearTetrisLines();
  spawnTetrisPiece();
}

/**
 * Clear completed lines
 */
function clearTetrisLines() {
  let linesCleared = 0;

  for (let y = tetrisGame.gridHeight - 1; y >= 0; y--) {
    if (tetrisGame.board[y].every(cell => cell !== null)) {
      // Remove the line
      tetrisGame.board.splice(y, 1);
      // Add new empty line at top
      tetrisGame.board.unshift(Array(tetrisGame.gridWidth).fill(null));
      linesCleared++;
      y++; // Check same row again
    }
  }

  if (linesCleared > 0) {
    tetrisGame.lines += linesCleared;
    tetrisGame.score += linesCleared * 100 * linesCleared; // More points for multiple lines

    // Speed up game every 5 lines
    if (tetrisGame.lines % 5 === 0 && tetrisGame.speed > 100) {
      tetrisGame.speed -= 50;
      clearInterval(tetrisGame.interval);
      tetrisGame.interval = setInterval(updateTetris, tetrisGame.speed);
    }
  }
}

/**
 * Render the Tetris board
 */
function renderTetris() {
  const gameBoard = document.getElementById('tetrisGameBoard');
  if (!gameBoard) return;

  // Create display board with current piece
  const displayBoard = tetrisGame.board.map(row => [...row]);

  // Add current piece to display
  const piece = tetrisGame.currentPiece.shape;
  const type = tetrisGame.currentPiece.type;
  for (let py = 0; py < piece.length; py++) {
    for (let px = 0; px < piece[py].length; px++) {
      if (piece[py][px]) {
        const y = tetrisGame.currentY + py;
        const x = tetrisGame.currentX + px;
        if (y >= 0 && y < tetrisGame.gridHeight && x >= 0 && x < tetrisGame.gridWidth) {
          displayBoard[y][x] = type;
        }
      }
    }
  }

  // Render board
  let board = '┌' + '──'.repeat(tetrisGame.gridWidth) + '┐\n';
  for (let y = 0; y < tetrisGame.gridHeight; y++) {
    board += '│';
    for (let x = 0; x < tetrisGame.gridWidth; x++) {
      const cell = displayBoard[y][x];
      if (cell) {
        const color = tetrisGame.colors[cell] || 'white';
        board += `<span style="color: ${color}">██</span>`;
      } else {
        board += '  ';
      }
    }
    board += '│\n';
  }
  board += '└' + '──'.repeat(tetrisGame.gridWidth) + '┘\n';
  board += `<span class="info">Score: ${tetrisGame.score} | Lines: ${tetrisGame.lines}</span>`;

  gameBoard.innerHTML = board;
  scrollToBottom();
}

/**
 * Update Tetris game state
 */
function updateTetris() {
  if (!tetrisGame.active) return;

  // Try to move piece down
  if (!moveTetrisPiece(0, 1)) {
    // Piece can't move down, merge it
    mergeTetrisPiece();
  }
}

/**
 * Handle keyboard input during Tetris game
 */
function handleTetrisKeydown(e) {
  if (!tetrisGame.active) return;

  switch (e.key) {
    case 'ArrowLeft':
      moveTetrisPiece(-1, 0);
      e.preventDefault();
      break;
    case 'ArrowRight':
      moveTetrisPiece(1, 0);
      e.preventDefault();
      break;
    case 'ArrowDown':
      moveTetrisPiece(0, 1);
      e.preventDefault();
      break;
    case 'ArrowUp':
      rotateTetrisPiece();
      e.preventDefault();
      break;
    case ' ':
      dropTetrisPiece();
      e.preventDefault();
      break;
    case 'Escape':
      endTetrisGame();
      e.preventDefault();
      break;
  }
}

/**
 * End the Tetris game
 */
function endTetrisGame() {
  tetrisGame.active = false;

  if (tetrisGame.interval) {
    clearInterval(tetrisGame.interval);
    tetrisGame.interval = null;
  }

  // Remove keyboard listener
  document.removeEventListener('keydown', handleTetrisKeydown);

  // Re-enable command input
  commandInput.disabled = false;
  commandInput.focus();

  // Remove game board
  const gameBoard = document.getElementById('tetrisGameBoard');
  if (gameBoard) {
    gameBoard.remove();
  }

  // Show game over message
  addStaticOutput(`\n<span style="color: var(--kali-red)">GAME OVER!</span>`);
  addStaticOutput(`<span class="info">Final Score: ${tetrisGame.score} | Lines: ${tetrisGame.lines}</span>`);
  addStaticOutput('Type <span class="highlight">tetris</span> to play again!');
}

// ====== MR. ROBOT EASTER EGGS ======
/**
 * fsociety - Display fsociety hacker group ASCII art and message
 */
function showFsociety() {
  const fsocietyArt = `<span style="color: var(--kali-red); font-weight: bold;">
 ___                   _      _
|  _|___ ___ ___ ___ |_| ___| |_ _ _
|  _|_ -| . |  _| . || | -_|  _| | |
|_| |___|___|___|___||_|___|_| |_  |
                              |___|
</span>`;

  addStaticOutput(fsocietyArt);
  addStaticOutput('');
  addStaticOutput('<span style="color: var(--kali-green); font-weight: bold;">"Hello, friend. Welcome to fsociety."</span>');
  addStaticOutput('');
  addStaticOutput('<span style="color: var(--kali-cyan)">Available operations:</span>');
  addStaticOutput('  • hack the planet');
  addStaticOutput('  • decrypt vault');
  addStaticOutput('  • erase debt');
  addStaticOutput('  • free the world');
  addStaticOutput('');
  addStaticOutput('<span style="color: var(--kali-yellow)">Just kidding. But nice to meet a fellow Mr. Robot fan.</span>');
  addStaticOutput('Want to discuss cybersecurity? Check out my <span class="highlight">resume</span>!');
}

/**
 * fsociety.dat - Display encryption file reference with scanning animation
 */
function showFsocietyDat() {
  addStaticOutput('<span style="color: var(--kali-cyan)">[SCANNING FOR FSOCIETY.DAT]</span>');
  addStaticOutput('');
  addStaticOutput('Searching E Corp servers...');

  const dots = ['', '.', '..', '...', '....', '.....', '......', '.......', '........'];
  let index = 0;

  const scanInterval = setInterval(() => {
    const lastOutput = terminal.querySelector('.output:last-of-type');
    if (lastOutput && index < dots.length) {
      lastOutput.textContent = dots[index];
      index++;
    } else {
      clearInterval(scanInterval);
      addStaticOutput('');
      addStaticOutput('<span style="color: var(--kali-red); font-weight: bold;">[FILE NOT FOUND]</span>');
      addStaticOutput('');
      addStaticOutput('<span style="color: var(--kali-green)">That\'s probably for the best.</span>');
      addStaticOutput('This is a portfolio site, not a ransomware distribution network.');
      addStaticOutput('');
      addStaticOutput('For <span style="color: var(--kali-cyan)">legitimate</span> cybersecurity work, see <span class="highlight">contact</span>.');
    }
  }, 200);
}

/**
 * whiterose - Display time-themed message from Mr. Robot's Whiterose character
 */
function showWhiterose() {
  // Calculate time spent on site
  const sessionStart = performance.timing.navigationStart;
  const now = Date.now();
  const timeOnSite = Math.floor((now - sessionStart) / 1000);

  addStaticOutput('<span style="color: var(--kali-purple); font-weight: bold;">[TIME IS PRECIOUS]</span>');
  addStaticOutput('');
  addStaticOutput('<span style="color: var(--kali-cyan)">"I hate to be unrealistic about time."</span>');
  addStaticOutput('  - Whiterose');
  addStaticOutput('');
  addStaticOutput(`You\'ve been on this site for: <span style="color: var(--kali-yellow); font-weight: bold;">${timeOnSite} seconds</span>.`);
  addStaticOutput('');
  addStaticOutput('Every second counts. Check out <span class="highlight">resume</span> to save time.');
  addStaticOutput('<span style="color: var(--kali-green)">Or don\'t. Time is an illusion anyway.</span>');
}

// ====== START APPLICATION ======
// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
