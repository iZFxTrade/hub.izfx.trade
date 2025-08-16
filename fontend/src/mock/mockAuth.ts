// Simple offline auth mock
export const currentUser = {
  id: 3,
  name: 'Onfre Wind',
  email: 'owind1b@yandex.ru',
  role: 'Admin',
  avatar: '/src/assets/images/avatars/avatar-3.png',
}

export function isLoggedIn() {
  return !!currentUser
}

export function hasRole(role: string) {
  return currentUser.role === role
}
