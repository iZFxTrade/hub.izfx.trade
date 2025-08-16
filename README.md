
<h1 align="center">
# hub.izfx.trade

A modern trading management platform built with Vue 3, Vite, and Vuetify. This project provides a full-featured frontend for managing trading accounts, strategies, user roles, billing, connections, and more.

## Features
- User authentication & role-based access
- Trading account management (MT4, MT5, CTrader)
- Copy trading strategies
- Connection manager (Telegram, AI bots, Databases)
- Billing & subscription management
- Beautiful, responsive UI (Vuetify)
- Mock data for offline development
- Modular, maintainable code structure

## Project Structure
```
backend/           # Supabase schema & edge functions
fontend/           # Vue 3 + Vite + Vuetify frontend
  src/
    pages/         # Main app pages (UserManager, AccountReport, etc.)
    views/         # Account settings tabs (Billing, Connection, etc.)
    mock/          # Mock data & auth logic
    @core/         # Core components, styles, utils
    @layouts/      # Layout components & styles
    assets/        # Images, styles
    plugins/       # Pinia, router, vuetify, iconify
    components/    # Shared components
    layouts/       # Layout wrappers
    utils/         # Utility functions
mt4-mt5-ea/        # EA scripts & docs
```

## Getting Started
1. Clone the repo:
   ```bash
   git clone https://github.com/iZFxTrade/hub.izfx.trade.git
   ```
2. Install dependencies:
   ```bash
   cd fontend
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open in browser: http://localhost:5173

## Development
- All pages use mock data for offline development.
- Role-based access is enforced for protected pages.
- UI follows modern design standards (see screenshots in docs/).
- Easily connect to real backend (Supabase) when ready.

## Contribution
Pull requests and issues are welcome! Please follow the code style and structure.

## License
MIT
