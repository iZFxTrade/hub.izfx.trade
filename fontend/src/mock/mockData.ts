// Offline mock data for the system
export const mockUsers = [
  { id: 1, name: 'Beverlie Krabbe', email: 'bkrabbe1d@home.pl', role: 'Editor', plan: 'Company', billing: 'Manual-Cash', status: 'Active', avatar: '/src/assets/images/avatars/avatar-1.png' },
  { id: 2, name: 'Paulie Durber', email: 'pdurber1c@gov.uk', role: 'Subscriber', plan: 'Team', billing: 'Manual-PayPal', status: 'Inactive', avatar: '/src/assets/images/avatars/avatar-2.png' },
  { id: 3, name: 'Onfre Wind', email: 'owind1b@yandex.ru', role: 'Admin', plan: 'Basic', billing: 'Manual-PayPal', status: 'Pending', avatar: '/src/assets/images/avatars/avatar-3.png' },
  { id: 4, name: 'Karena Courtliff', email: 'kcourtliff1a@bbc.co.uk', role: 'Admin', plan: 'Basic', billing: 'Manual-Credit Card', status: 'Active', avatar: '/src/assets/images/avatars/avatar-4.png' },
  { id: 5, name: 'Saunder Offner', email: 'soffner19@mac.com', role: 'Maintainer', plan: 'Enterprise', billing: 'Manual-Credit Card', status: 'Pending', avatar: '/src/assets/images/avatars/avatar-5.png' }
]

export const mockTraderAccounts = [
  { id: 101, userId: 1, accountName: 'TraderPro01', balance: 10000, currency: 'USD', status: 'Active' },
  { id: 102, userId: 2, accountName: 'TraderPro02', balance: 5000, currency: 'USD', status: 'Inactive' },
  { id: 103, userId: 3, accountName: 'TraderPro03', balance: 15000, currency: 'USD', status: 'Active' },
]

export const mockStrategies = [
  { id: 201, name: 'Scalping Master', ownerId: 1, type: 'Scalping', status: 'Active', followers: 120 },
  { id: 202, name: 'Swing Pro', ownerId: 2, type: 'Swing', status: 'Inactive', followers: 80 },
  { id: 203, name: 'EA Bot Alpha', ownerId: 3, type: 'EA', status: 'Active', followers: 200 },
]

export const mockTradeOrders = [
  { id: 301, accountId: 101, symbol: 'EURUSD', type: 'Buy', volume: 1.0, price: 1.1050, status: 'Filled' },
  { id: 302, accountId: 102, symbol: 'GBPUSD', type: 'Sell', volume: 0.5, price: 1.2550, status: 'Pending' },
]

export const mockConnections = [
  { id: 401, userId: 1, type: 'MT4', status: 'Connected' },
  { id: 402, userId: 2, type: 'MT5', status: 'Disconnected' },
]

export const mockReports = [
  { id: 501, userId: 1, reportType: 'Overview', period: '2025-08', profit: 1200 },
  { id: 502, userId: 2, reportType: 'Overview', period: '2025-08', profit: -300 },
]
