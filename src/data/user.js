// src/data/user.js
import { api } from '@/plugins/axios'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

// Pinia store để quản lý người dùng
export const useUser = defineStore('user', () => {
  const users = ref([])
  const searchQuery = ref('')
  const loading = ref(false)
  const error = ref(null)

  // Computed list đã lọc theo searchQuery
  const filteredUsers = computed(() => {
    const q = searchQuery.value.toLowerCase()
    return users.value.filter(u => {
      const fullName = `${u.firstName ?? ''} ${u.lastName ?? ''}`.trim().toLowerCase()
      return (
        fullName.includes(q) ||
        (u.email ?? '').toLowerCase().includes(q) ||
        u.username.toLowerCase().includes(q)
      )
    })
  })

  /**
   * fetchUsers: Gọi API GET /users với token hợp lệ
   */
  async function fetchUsers() {
    loading.value = true
    error.value = null
    try {
      const resp = await api.get('/users')
      const list = Array.isArray(resp.data)
        ? resp.data
        : Array.isArray(resp.data.result)
          ? resp.data.result
          : []

      users.value = list.map(u => ({
        id: u.id,
        firstName: u.firstName,
        lastName: u.lastName,
        name: `${u.firstName ?? ''} ${u.lastName ?? ''}`.trim(),
        email: u.email ?? '',
        username: u.username,
        dob: u.dob,
        phone: u.phone,
        role: u.roles?.[0]?.name ?? '',
        password: u.password ?? '',
        debtAmount: u.debtAmount,
        _raw: u
      }))
    } catch (e) {
      console.error('[UserStore] fetchUsers failed:',
        e.response?.status,
        e.response?.data || e.message
      )
      error.value = e
    } finally {
      loading.value = false
    }
  }

  async function addUser(userData) {
    try {
      loading.value = true
      error.value = null
      await api.post('/users', userData)
      await fetchUsers()
      return true
    } catch (e) {
      error.value = e
      return false
    } finally {
      loading.value = false
    }
  }

  function updateUser(updated) {
    const idx = users.value.findIndex(u => u.id === updated.id)
    if (idx !== -1) users.value[idx] = { ...updated }
  }

  async function updateUserAPI(userId, payload) {
    loading.value = true;
    try {
      const { data } = await api.put(`/users/${userId}`, payload);
      // update local list nếu muốn:
      const updated = data.result;
      const idx = users.value.findIndex(u => u.id === updated.id);
      if (idx !== -1) {
        users.value[idx] = {
          ...users.value[idx],
          firstName: updated.firstName,
          lastName: updated.lastName,
          dob: updated.dob,
          phone: updated.phone,
          role: updated.roles?.[0]?.name ?? ''
        };
      }
      await fetchUsers()
    } catch (e) {
      console.error('[UserStore] updateUser failed', e);
      throw e;
    } finally {
      loading.value = false;
    }
  }

  async function deleteUserAPI(userId) {
    loading.value = true; error.value = null
    try {
      await api.delete(`/users/${userId}`)
      // sau khi xoá thành công, reload lại
      await fetchUsers()
    } catch (e) {
      console.error('[UserStore] deleteUserAPI failed:', e)
      error.value = e
      throw e
    } finally {
      loading.value = false
    }
  }

  return {
    users,
    searchQuery,
    filteredUsers,
    loading,
    error,
    fetchUsers,
    addUser,
    updateUser,
    updateUserAPI,
    deleteUserAPI
  }
})
