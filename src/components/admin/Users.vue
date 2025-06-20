<script setup>
import { useUser } from '@/data/user'
import { computed, ref, onMounted } from 'vue'

import TitleText from './texts/TitleText.vue'
import SearchFrame from '@/components/admin/frames/SearchFrame.vue'
import UserTable from '@/components/admin/tables/UserTable.vue'
import UserDetail from '@/components/admin/CRUDforms/UserDetail.vue'
import EditUser from '@/components/admin/CRUDforms/EditUser.vue'
import AddUser from '@/components/admin/CRUDforms/AddUser.vue'

import ButtonCRUD from './buttons/ButtonCRUD.vue'
import ButtonText from './texts/ButtonText.vue'

const userStore = useUser()
const searchQuery = ref('')

const selectedUser = ref(null)
const editingUser = ref(null)
const addingUser = ref(false)

// load danh sách khi mount
onMounted(() => {
  userStore.fetchUsers()
})

// Computed để filter users based on search query
const filteredUsers = computed(() => {
  const q = searchQuery.value.toLowerCase()
  return userStore.users.filter(item =>
    item.id.toLowerCase().includes(q) ||
    item.username.toLowerCase().includes(q) ||
    item.email.toLowerCase().includes(q) ||
    (item.firstName + ' ' + item.lastName).toLowerCase().includes(q)
  )
})

// VIEW
function handleViewUser(userId) {
  console.log('[ViewUser] userId:', userId)
  const user = userStore.users.find(u => u.id === userId)
  if (user) {
    selectedUser.value = user
  } else {
    console.error('Không tìm thấy user với ID:', userId)
  }
}
function closeDetail() {
  selectedUser.value = null
}

// ADD
function handleAddUser() {
  addingUser.value = true
}
function closeAddUser() {
  addingUser.value = false
}
async function addUser(newUser) {
  try {
    await userStore.addUser(newUser)
  } catch (e) {
    console.error('Tạo user thất bại', e)
  } finally {
    addingUser.value = false
  }
}

// EDIT
function handleEditUser(userId) {
  console.log('[EditUser] userId:', userId)
  const user = userStore.users.find(u => u.id === userId)
  if (user) {
    editingUser.value = { ...user }
  } else {
    console.error('Không tìm thấy user để edit với ID:', userId)
  }
}
function closeEdit() {
  editingUser.value = null
}
async function handleUpdateUser(userData) {
  try {
    await userStore.updateUserAPI(userData.id, {
      username: userData.username,
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      phone: userData.phone,
      dob: userData.dob,
      roles: userData.roles
    })
  } catch (e) {
    console.error('Cập nhật user thất bại', e.response?.data || e.message)
  } finally {
    editingUser.value = null
  }
}

// DELETE
async function handleDeleteUser(userId) {
  try {
    await userStore.deleteUserAPI(userId)
  } catch (e) {
    console.error('Xoá user thất bại', e.response?.data || e.message)
  }
}
</script>

<template>
  <div style="height:100%; overflow-y:auto;">
    <!-- ADD -->
    <AddUser v-if="addingUser" @close="closeAddUser" @add-user="addUser" class="user-detail-full" />

    <!-- TABLE -->
    <div v-else-if="!selectedUser && !editingUser" class="content">
      <div class="top-bar">
        <TitleText class="left">
          <template #text>User Management</template>
        </TitleText>
        <SearchFrame v-model="searchQuery" class="right" />
      </div>

      <UserTable :items="filteredUsers" @view-user="handleViewUser" @edit-user="handleEditUser"
        @delete-user="handleDeleteUser" />

      <ButtonCRUD @click="handleAddUser">
        <template #btn-text>
          <ButtonText><template #text>ADD USER</template></ButtonText>
        </template>
      </ButtonCRUD>
    </div>

    <!-- DETAIL -->
    <UserDetail v-else-if="selectedUser && !editingUser" :user="selectedUser" @close="closeDetail"
      class="user-detail-full" />

    <!-- EDIT -->
    <EditUser v-else-if="editingUser" :user="editingUser" @close="closeEdit" @update-user="handleUpdateUser"
      class="user-detail-full" />
  </div>
</template>

<style scoped>
.content {
  width: 100%;
  padding: 20px;
}

.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.left {
  flex: 1
}

.right {
  flex-shrink: 0
}

.user-detail-full {
  width: 100%;
  height: 100%;
}
</style>
