
<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-card class="mb-6 pa-4">
          <div class="d-flex justify-space-between align-center mb-4">
            <div>
              <v-btn color="primary" class="me-2">+ Add Trading Account</v-btn>
              <v-btn color="success">+ Add Strategy</v-btn>
            </div>
            <v-text-field label="Search accounts" prepend-inner-icon="mdi-magnify" style="max-width: 300px;" />
          </div>
          <div class="mb-4">
            <h4 class="mb-2">Trading Accounts</h4>
            <v-table>
              <thead>
                <tr>
                  <th> </th>
                  <th>TRADE ACCOUNT</th>
                  <th>BALANCE/PROFIT</th>
                  <th>USER</th>
                  <th>STATUS</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in tradeAccounts" :key="item.id">
                  <td><v-avatar size="32"><v-img :src="item.avatar" /></v-avatar></td>
                  <td>
                    <div class="font-weight-bold">{{ item.account }}</div>
                    <div class="text-caption">{{ item.server }}</div>
                  </td>
                  <td>
                    <div class="font-weight-bold" :class="item.profit >= 0 ? 'text-success' : 'text-error'">${{ item.balance.toLocaleString() }}</div>
                    <div :class="item.profit >= 0 ? 'text-success' : 'text-error'">{{ item.profit >= 0 ? '+' : '' }}${{ item.profit }} ({{ item.profitPercent }}%)</div>
                    <v-progress-linear :model-value="Math.abs(item.profitPercent)" :color="item.profit >= 0 ? 'success' : 'error'" height="6" rounded />
                  </td>
                  <td>
                    <div class="d-flex align-center">
                      <v-avatar size="24" class="me-2"><v-img src="https://randomuser.me/api/portraits/men/32.jpg" /></v-avatar>
                      <div>
                        <div class="font-weight-medium">{{ item.user }}</div>
                        <div class="text-caption">{{ item.role }}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <v-chip :color="item.status === 'Active' ? 'success' : 'error'">{{ item.status }}</v-chip>
                  </td>
                  <td>
                    <v-switch v-model="item.status" :true-value="'Active'" :false-value="'Inactive'" color="success" />
                    <v-btn icon size="small"><v-icon>mdi-pencil</v-icon></v-btn>
                    <v-btn icon size="small"><v-icon>mdi-delete</v-icon></v-btn>
                  </td>
                </tr>
              </tbody>
            </v-table>
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card class="mb-6">
          <v-card-title class="d-flex justify-space-between align-center">
            <span>Telegram Accounts</span>
            <v-btn icon color="primary" size="small"><v-icon>mdi-plus</v-icon></v-btn>
          </v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item v-for="(tg, idx) in telegramAccounts" :key="tg.name">
                <v-list-item-title>Bot Name: <b>{{ tg.name }}</b></v-list-item-title>
                <v-list-item-subtitle>API: <span class="font-mono">{{ tg.api }}</span></v-list-item-subtitle>
                <v-list-item-subtitle>ChatID: <span class="font-mono">{{ tg.chatid }}</span></v-list-item-subtitle>
                <div class="d-flex align-center mt-2">
                  <v-switch v-model="tg.status" :true-value="'active'" :false-value="'deactive'" color="success" />
                  <v-btn icon size="small" color="default"><v-icon>bx-show</v-icon></v-btn>
                  <v-btn icon size="small" color="default"><v-icon>ri-edit-line</v-icon></v-btn>
                  <v-btn icon size="small" color="default"><v-icon>bx-trash</v-icon></v-btn>
                </div>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
        <v-card class="mb-6">
          <v-card-title class="d-flex justify-space-between align-center">
            <span>AI Bots & API</span>
            <v-btn icon color="primary" size="small"><v-icon>mdi-plus</v-icon></v-btn>
          </v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item v-for="(bot, idx) in aiBots" :key="bot.name">
                <v-list-item-title>{{ bot.name }}</v-list-item-title>
                <v-list-item-subtitle>API: <span class="font-mono">{{ bot.api }}</span></v-list-item-subtitle>
                <v-chip :color="bot.status === 'connected' ? 'success' : 'error'">{{ bot.status }}</v-chip>
                <div class="d-flex align-center mt-2">
                  <v-switch v-model="bot.status" :true-value="'connected'" :false-value="'deactive'" color="success" />
                  <v-btn icon size="small" color="default"><v-icon>bx-show</v-icon></v-btn>
                  <v-btn icon size="small" color="default"><v-icon>ri-edit-line</v-icon></v-btn>
                  <v-btn icon size="small" color="default"><v-icon>bx-trash</v-icon></v-btn>
                </div>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
        <v-card class="mb-6">
          <v-card-title class="d-flex justify-space-between align-center">
            <span>Databases</span>
            <v-btn icon color="primary" size="small"><v-icon>mdi-plus</v-icon></v-btn>
          </v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item v-for="(db, idx) in databases" :key="db.name">
                <v-list-item-title>{{ db.name }} ({{ db.type }})</v-list-item-title>
                <v-list-item-subtitle>URL: <span class="font-mono">{{ db.url }}</span></v-list-item-subtitle>
                <v-chip :color="db.status === 'connected' ? 'success' : 'error'">{{ db.status }}</v-chip>
                <div class="d-flex align-center mt-2">
                  <v-switch v-model="db.status" :true-value="'connected'" :false-value="'deactive'" color="success" />
                  <v-btn color="primary" size="small" @click="checkConnection(db)">Check Connection</v-btn>
                  <v-btn icon size="small" color="default"><v-icon>bx-show</v-icon></v-btn>
                  <v-btn icon size="small" color="default"><v-icon>ri-edit-line</v-icon></v-btn>
                  <v-btn icon size="small" color="default"><v-icon>bx-trash</v-icon></v-btn>
                </div>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup>
// Data from .env (mock)
const env = {
  TELEGRAM_API: 'tg-api-xxx',
  TELEGRAM_BOT: 'TradeBot',
  TELEGRAM_CHATID: '123456789',
  GEMINI_API: 'gemini-key',
  OPENAI_API: 'openai-key',
  OPENROUTER_API: 'openrouter-key',
  SUPABASE_URL: 'https://supabase.io',
  SUPABASE_KEY: 'sb-key',
  MONGODB_URL: 'mongodb://localhost:27017',
}

// MT4/MT5/CTrader mock
const tradeAccounts = [
  { id: 1, type: 'MT4', account: '87654321', server: 'FXCM-Live', balance: 5120.3, profit: -260.5, profitPercent: -5.2, user: 'Jane Smith', role: 'Trader', status: 'Inactive', avatar: 'https://s3-symbol-logo.tradingview.com/mt4--big.svg' },
  { id: 2, type: 'MT4', account: '87654322', server: 'FXCM-Live', balance: 6120.3, profit: 120.5, profitPercent: 2.1, user: 'Jane Smith', role: 'Trader', status: 'Active', avatar: 'https://s3-symbol-logo.tradingview.com/mt4--big.svg' },
  { id: 3, type: 'MT5', account: '12345678', server: 'XM-Real 1', balance: 10250.45, profit: 1520.3, profitPercent: 15.4, user: 'John Doe', role: 'Admin', status: 'Active', avatar: 'https://s3-symbol-logo.tradingview.com/mt5--big.svg' },
  { id: 4, type: 'MT5', account: '12345679', server: 'XM-Real 2', balance: 8250.45, profit: 520.3, profitPercent: 6.4, user: 'John Doe', role: 'Admin', status: 'Active', avatar: 'https://s3-symbol-logo.tradingview.com/mt5--big.svg' },
  { id: 5, type: 'CTrader', account: '98765432', server: 'IC Markets-Live 01', balance: 15750.2, profit: 3250.8, profitPercent: 32.8, user: 'Mike Johnson', role: 'Trader', status: 'Active', avatar: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/CTrader_logo.png' },
]

const telegramAccounts = [
  { name: env.TELEGRAM_BOT, api: env.TELEGRAM_API, chatid: env.TELEGRAM_CHATID },
]
const aiBots = [
  { name: 'Gemini', api: env.GEMINI_API, status: 'connected' },
  { name: 'OpenAI', api: env.OPENAI_API, status: 'connected' },
  { name: 'OpenRouter', api: env.OPENROUTER_API, status: 'disconnected' },
]
const databases = [
  { name: 'Supabase', type: 'Postgres', url: env.SUPABASE_URL, status: 'connected' },
  { name: 'MongoDB', type: 'NoSQL', url: env.MONGODB_URL, status: 'disconnected' },
]

function checkConnection(db) {
  // Mock: always return true for Supabase, false for MongoDB
  return db.status === 'connected'
}
</script>
