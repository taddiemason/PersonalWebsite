# Zach's Terminal - Personal Website

An interactive terminal-style personal website featuring a realistic Linux boot sequence and command-line interface. Built with vanilla JavaScript and deployed on Cloudflare Workers.

## Features

- **Realistic Boot Sequence**: Simulates a Linux system boot with authentic kernel messages
- **Interactive Terminal**: Command-line interface for navigating portfolio information
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Fast & Cached**: Cloudflare Workers with intelligent caching for optimal performance
- **Accessible**: WCAG-compliant with ARIA labels and keyboard navigation
- **Retro Aesthetic**: Classic green-on-black terminal styling with CRT glow effects

## Available Commands

- `help` - Display available commands
- `about` - Learn about my background and experience
- `contact` - Get contact information
- `resume` - View detailed work history and education
- `clear` - Clear the terminal screen

## Project Structure

```
PersonalWebsite/
├── index.html          # Main HTML structure with semantic markup
├── styles.css          # Stylesheet with CSS variables and responsive design
├── script.js           # Terminal logic, boot sequence, and command processing
├── worker.js           # Cloudflare Worker with caching and routing
├── wrangler.toml       # Cloudflare Workers configuration
└── README.md           # This file
```

## Local Development

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- (Optional) A local web server for testing

### Running Locally

#### Option 1: Direct File Opening
Simply open `index.html` in your web browser. Note that some features may not work due to CORS restrictions.

#### Option 2: Using Python's Built-in Server
```bash
# Python 3
python -m http.server 8000

# Then visit http://localhost:8000
```

#### Option 3: Using Node.js HTTP Server
```bash
# Install http-server globally
npm install -g http-server

# Run the server
http-server -p 8000

# Then visit http://localhost:8000
```

#### Option 4: Using VS Code Live Server
1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

## Deployment

This website is deployed using Cloudflare Workers, which fetches files from GitHub and serves them with caching.

### Cloudflare Workers Deployment

1. **Install Wrangler CLI**:
   ```bash
   npm install -g wrangler
   ```

2. **Login to Cloudflare**:
   ```bash
   wrangler login
   ```

3. **Update Configuration**:
   Edit `wrangler.toml` if needed (change worker name, compatibility date, etc.)

4. **Deploy**:
   ```bash
   wrangler deploy
   ```

5. **Test**:
   Your worker will be deployed to `https://your-worker-name.workers.dev`

### GitHub Pages Deployment (Alternative)

1. Go to your repository settings
2. Navigate to "Pages" section
3. Select source branch (usually `main`)
4. Set root directory or `/docs` folder
5. Save and wait for deployment

### Custom Domain Setup

#### For Cloudflare Workers:
1. Add your domain to Cloudflare
2. In Wrangler dashboard, go to Workers > Your Worker
3. Click "Add Custom Domain"
4. Enter your domain and follow DNS setup instructions

#### For GitHub Pages:
1. Add a `CNAME` file with your domain name
2. Configure DNS with your domain registrar:
   - Add CNAME record pointing to `username.github.io`
3. Enable HTTPS in repository settings

## Customization

### Changing Colors
Edit CSS variables in `styles.css`:
```css
:root {
  --primary-color: #00FF00;      /* Change terminal color */
  --background-color: black;      /* Change background */
  --glow-size: 20px;             /* Adjust glow effect */
}
```

### Modifying Commands
Edit the `commands` object in `script.js`:
```javascript
const commands = {
  yourcommand: `Your command output here`,
  // Add more commands...
};
```

### Adjusting Boot Sequence
Modify timing and content in `script.js`:
```javascript
const CONFIG = {
  BOOT_LINE_DELAY: 100,  // Milliseconds between boot lines
  TYPING_SPEED: 2,       // Milliseconds per character
  // ...
};
```

### Updating Personal Information
Replace the content in the `commands` object (`about`, `contact`, `resume`) with your own information.

## Performance

- **Caching**: Files are cached on Cloudflare's CDN for fast global delivery
  - HTML: 1 hour browser, 1 day CDN
  - CSS/JS: 1 day browser, 1 week CDN
  - Images: 1 week browser, 30 days CDN

- **Bundle Size**: ~15KB total (HTML + CSS + JS combined, uncompressed)

- **Lighthouse Scores**: Optimized for 90+ scores across all categories

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome Android 90+)

## Accessibility Features

- Semantic HTML5 elements (`<main>`, `<section>`)
- ARIA labels for screen readers
- Keyboard navigation support
- Tab completion for commands
- High contrast (green on black meets WCAG AAA)
- Focus management for improved UX

## Technologies Used

- **HTML5**: Semantic structure
- **CSS3**: Custom properties, Flexbox, media queries
- **Vanilla JavaScript**: ES6+ features, no frameworks
- **Cloudflare Workers**: Edge computing and caching
- **GitHub**: Version control and content hosting

## Contributing

This is a personal website, but suggestions are welcome! Feel free to:
1. Open an issue for bugs or suggestions
2. Fork the repo and submit a pull request
3. Share your own terminal-style website inspired by this

## License

© 2025 Zach LaLime. All rights reserved.

## Contact

- **Email**: Zacharylalime@gmail.com
- **Phone**: (716) 341-3678

## Acknowledgments

Inspired by classic Unix terminals and the retro computing aesthetic.
