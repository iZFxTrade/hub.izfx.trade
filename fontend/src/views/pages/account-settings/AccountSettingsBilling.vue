<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-card class="mb-6">
          <v-card-title>Current Plan</v-card-title>
          <v-card-text>
            <div class="d-flex flex-column gap-2 mb-2">
              <div class="text-h6">Your Current Plan is <b>{{ billingInfo.plan }}</b></div>
              <div class="text-body-2">A simple start for everyone</div>
              <div class="text-body-2">Active until <b>{{ billingInfo.expires }}</b></div>
              <div class="text-body-2">$ {{ billingInfo.price }} Per Month <v-chip color="primary" size="small">Popular</v-chip></div>
              <div class="text-body-2">Standard plan for small to medium businesses</div>
            </div>
            <v-btn color="primary" class="me-2">Upgrade Plan</v-btn>
            <v-btn color="error">Cancel Subscription</v-btn>
            <v-alert type="warning" class="mt-6 mb-2" border="start" color="warning" icon="mdi-alert">
              <span class="font-weight-medium">We need your attention!</span> Your plan requires update
            </v-alert>
            <div class="d-flex align-center mb-2">
              <span class="me-2">Days</span>
              <v-progress-linear :model-value="40" color="primary" height="6" rounded style="width: 200px;" />
              <span class="ms-2">12 of 30 Days</span>
            </div>
            <div class="text-caption">18 days remaining until your plan requires update</div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-row>
          <v-col cols="12" md="7">
            <v-card class="mb-6">
              <v-card-title>Payment Methods</v-card-title>
              <v-card-text>
                <v-radio-group v-model="paymentType" row>
                  <v-radio label="Credit/Debit/ATM Card" value="card" />
                  <v-radio label="Paypal account" value="paypal" />
                </v-radio-group>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field label="Card Number" v-model="cardForm.number" />
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field label="Name" v-model="cardForm.name" />
                  </v-col>
                  <v-col cols="6" md="3">
                    <v-text-field label="Expiry Date" v-model="cardForm.expiry" />
                  </v-col>
                  <v-col cols="6" md="3">
                    <v-text-field label="CVV Code" v-model="cardForm.cvv" />
                  </v-col>
                </v-row>
                <v-checkbox label="Save card for future billing?" v-model="cardForm.save" />
                <v-btn color="primary" class="me-2">Save Changes</v-btn>
                <v-btn color="grey">Cancel</v-btn>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="5">
            <v-card class="mb-6">
              <v-card-title>My Cards</v-card-title>
              <v-card-text>
                <v-row>
                  <v-col cols="12" v-for="card in billingInfo.cards" :key="card.number">
                    <v-card class="mb-2 pa-2" outlined>
                      <div class="d-flex align-center justify-space-between">
                        <div class="d-flex align-center">
                          <v-avatar size="32" class="me-2">
                            <v-img :src="card.type === 'Visa' ? 'https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png' : 'https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png'" />
                          </v-avatar>
                          <div>
                            <div class="font-weight-medium">{{ card.name }} <v-chip color="primary" size="small">{{ card.type }}</v-chip></div>
                            <div class="text-caption">{{ card.number }}</div>
                          </div>
                        </div>
                        <div>
                          <v-btn color="primary" size="small" class="me-1">Edit</v-btn>
                          <v-btn color="error" size="small">Delete</v-btn>
                        </div>
                      </div>
                      <div class="text-caption mt-1">Card expires at {{ card.expires }}</div>
                    </v-card>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12">
        <v-card>
          <v-card-title>Billing Address</v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field label="Company Name" v-model="billingInfo.address.company" />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field label="Billing Email" v-model="billingInfo.address.email" />
              </v-col>
              <v-col cols="6" md="3">
                <v-text-field label="Tax ID" v-model="billingInfo.address.taxId" />
              </v-col>
              <v-col cols="6" md="3">
                <v-text-field label="VAT Number" v-model="billingInfo.address.vat" />
              </v-col>
              <v-col cols="6" md="3">
                <v-text-field label="Phone Number" v-model="billingInfo.address.phone" />
              </v-col>
              <v-col cols="6" md="3">
                <v-select label="Country" :items="['US', 'VN', 'JP', 'KR']" v-model="billingInfo.address.country" />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field label="Billing Address" v-model="billingInfo.address.address" />
              </v-col>
              <v-col cols="6" md="3">
                <v-text-field label="State" v-model="billingInfo.address.state" />
              </v-col>
              <v-col cols="6" md="3">
                <v-text-field label="Zip Code" v-model="billingInfo.address.zip" />
              </v-col>
            </v-row>
            <v-btn color="primary" class="me-2">Save Changes</v-btn>
            <v-btn color="grey">Discard</v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup>
const billingInfo = ref({
  plan: 'Basic',
  expires: '2025-09-01',
  price: 199,
  status: 'Active',
  cards: [
    { name: 'Tom McBride', type: 'Primary', number: '**** **** 9985', expires: '12/24' },
    { name: 'Mildred Wagner', type: 'Visa', number: '**** **** 5896', expires: '10/27' },
  ],
  address: {
    company: 'Themeselection',
    email: 'themeselection@email.com',
    taxId: '123123123',
    vat: '121212',
    phone: '+1 123 456 7890',
    country: 'US',
    state: 'New York',
    zip: '100006',
    address: '1234 Main St',
  }
})

const paymentType = ref('card')
const cardForm = ref({
  number: '',
  name: '',
  expiry: '',
  cvv: '',
  save: false,
})
</script>
