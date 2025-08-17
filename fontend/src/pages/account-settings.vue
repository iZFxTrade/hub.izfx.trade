<script lang="ts" setup>
import AccountSettingsAccount from '@/views/pages/account-settings/AccountSettingsAccount.vue'
import AccountSettingsNotification from '@/views/pages/account-settings/AccountSettingsNotification.vue'
import AccountSettingsSecurity from '@/views/pages/account-settings/AccountSettingsSecurity.vue'
import AccountSettingsBilling from '@/views/pages/account-settings/AccountSettingsBilling.vue'
import AccountSettingsConnection from '@/views/pages/account-settings/AccountSettingsConnection.vue'
import { ref, watch } from 'vue'
// ...existing code...

const route = useRoute()
const router = useRouter()

type TabKey = 'account' | 'security' | 'notification' | 'billing' | 'connect'
const tabHashMap: Record<TabKey, string> = {
  account: 'Account',
  security: 'Security',
  notification: 'Notifications',
  billing: 'BillingPlan',
  connect: 'Connect',
}

function getTabFromHash(hash: string): TabKey {
  const clean = hash.replace('#', '')
  const found = (Object.keys(tabHashMap) as TabKey[]).find(key => tabHashMap[key].toLowerCase() === clean.toLowerCase())
  return found || 'account'
}

const activeTab = ref<TabKey>(route.hash ? getTabFromHash(route.hash) : 'account')

watch(() => route.hash, (newHash) => {
  activeTab.value = getTabFromHash(newHash)
})

function setTab(tab: unknown) {
  const tabStr = String(tab) as TabKey
  activeTab.value = tabStr
  router.replace({ hash: `#${tabHashMap[tabStr]}` })
}

// tabs
const tabs = [
  { title: 'Account', icon: 'bx-user', tab: 'account' },
  { title: 'Security', icon: 'bx-lock-open', tab: 'security' },
  { title: 'Notifications', icon: 'bx-bell', tab: 'notification' },
  { title: 'Billing & Plan', icon: 'bx-credit-card', tab: 'billing' },
  { title: 'Connect', icon: 'bx-link', tab: 'connect' },
]
</script>

<template>
  <div>
    <VTabs
      :model-value="activeTab"
      @update:modelValue="setTab"
      show-arrows
      class="v-tabs-pill"
    >
      <VTab
        v-for="item in tabs"
        :key="item.icon"
        :value="item.tab"
      >
        <VIcon
          size="20"
          start
          :icon="item.icon"
        />
        {{ item.title }}
      </VTab>
    </VTabs>

    <VWindow
      v-model="activeTab"
      class="mt-5 disable-tab-transition"
    >
      <!-- Account -->
      <VWindowItem value="account">
        <AccountSettingsAccount />
      </VWindowItem>

      <!-- Security -->
      <VWindowItem value="security">
        <AccountSettingsSecurity />
      </VWindowItem>

      <!-- Notification -->
      <VWindowItem value="notification">
        <AccountSettingsNotification />
      </VWindowItem>

      <!-- Billing & Plan -->
      <VWindowItem value="billing">
        <AccountSettingsBilling />
      </VWindowItem>

      <!-- Connect -->
      <VWindowItem value="connect">
        <AccountSettingsConnection />
      </VWindowItem>
    </VWindow>
  </div>
</template>
