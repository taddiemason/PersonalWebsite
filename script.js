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
      'Nice try, but you\'re not root here! 😏',
      'user is not in the sudoers file. This incident will be reported. 🚨',
      'Permission denied. Are you trying to hack my terminal? 🤔',
      'sudo: access denied. Maybe try saying "please"? 😄',
      'With great power comes great responsibility... which you don\'t have. 🦸',
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

[*] Exiting msfconsole... Just kidding! This is a portfolio site. 😄
[*] But if you're interested in pentesting, let's talk!`;
      typeOutput(msfBanner);
    });
    return;
  }

  // Easter egg: rm -rf /
  if (cmd === 'rm -rf /' || cmd === 'rm -rf /*') {
    fakeLoading(() => {
      addStaticOutput(`<span style="color: var(--kali-red)">⚠️  WARNING: DANGEROUS COMMAND DETECTED! ⚠️</span>`);
      addStaticOutput('');
      addStaticOutput(`<span style="color: var(--kali-yellow)">rm: it is dangerous to operate recursively on '/'`);
      addStaticOutput(`rm: use --no-preserve-root to override this failsafe</span>`);
      addStaticOutput('');
      addStaticOutput(`Are you crazy?! That would delete EVERYTHING! 💀`);
      addStaticOutput(`This command would wipe your entire system.`);
      addStaticOutput('');
      addStaticOutput(`<span style="color: var(--kali-cyan)">Pro tip:</span> Never run this on a real system unless you enjoy`);
      addStaticOutput(`reinstalling your OS and explaining to your boss why`);
      addStaticOutput(`the production server is gone. 😅`);
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
  addStaticOutput('<span class="info">🐍 SNAKE GAME 🐍</span>');
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
    addStaticOutput(`\n<span style="color: var(--kali-red)">💀 GAME OVER!</span>`);
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
    content += '<span style="color: var(--kali-cyan)">~  </span><span style="color: var(--kali-red); font-weight: bold;">💀 You are stuck in vim! 💀</span><span style="color: var(--kali-cyan)">                              </span>\n';
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
      ':q': 'Exiting vim... You\'re free! 🎉',
      ':q!': 'Force quitting vim without saving!',
      ':wq': 'Saving and quitting... (nothing to save though 😄)',
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
  addStaticOutput('<span class="info">Reality restored. 🟢</span>');
}

// ====== START APPLICATION ======
// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
