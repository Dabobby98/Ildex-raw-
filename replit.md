# ILDEX VIETNAM 2026 - Event Website

## Overview
This is a static HTML website for ILDEX VIETNAM 2026, an agricultural livestock exhibition event. The site is built with HTML, CSS, and JavaScript using Bootstrap framework, and includes features like countdown timer, image carousel, contact forms, and event registration.

## Project Structure
- **index.html** - Main landing page with event information
- **register.html** - Event registration page
- **coming-soon-*.html** - Coming soon templates
- **error-404.html, error-page.html** - Error pages
- **assets/** - All static assets (CSS, JS, images, fonts)
  - css/ - Theme stylesheets (theme.css, theme-yellow-1.css, custom.css)
  - js/ - Custom JavaScript (theme.js, theme-ajax-mail.js, custom.js)
  - img/ - Images and logos
  - plugins/ - Third-party libraries (Bootstrap, jQuery, FontAwesome, etc.)
  - php/ - Contact and registration form handlers
- **attached_assets/** - Project-specific files and brochures

## Technology Stack
- HTML5
- CSS3 with Bootstrap 3.x
- JavaScript with jQuery
- Plugins: Owl Carousel, PrettyPhoto, CountDown, Animate.css, FontAwesome
- Responsive design with mobile support

## Setup Information
- **Type**: Static website (no build process required)
- **Server**: Simple HTTP server on port 5000
- **Host**: 0.0.0.0 (to support Replit's proxy environment)

## Recent Changes
- 2025-11-26: Initial import and Replit environment setup
- Configured static web server on port 5000
- Set up deployment configuration for production hosting
- 2025-11-26: Integrated Mailchimp form submission
  - Added 6 form fields matching Mailchimp: Tên Công Ty, Ngành nghề, Tên, SĐT, Email, Loại Gian Hàng
  - Changed from JSONP to hidden iframe submission (Mailchimp disabled JSONP)
  - Added success/error message handling in Vietnamese
  - Mailchimp list: https://ildex-vietnam.us11.list-manage.com/subscribe?u=2dae538b15c3fb52220a11db5&id=2d5994350c
- 2025-11-27: SEO Optimization and Cleanup
  - Removed unused CSS theme files (kept only theme-yellow-1.css)
  - Removed awwwards.css and theme-config.js (not needed for ILDEX)
  - Fixed duplicate ID issue (changed second "about" to "why-vietnam")
  - Added descriptive alt text for all images for better SEO
  - SEO meta tags verified: title, description, keywords, Open Graph, Twitter Cards, Schema.org markup

## User Preferences
None specified yet.

## Project Architecture
Static HTML/CSS/JS website with client-side functionality only. No backend database or API integration required. Forms may need backend PHP handling (currently using local PHP files).
