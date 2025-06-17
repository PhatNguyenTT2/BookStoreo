<template>
  <div class="table-wrapper">
    <v-data-table :headers="headers" :items="props.items" item-value="id" :items-per-page="-1" fixed-header height="600"
      class="elevation-1" hide-default-footer>
      <template #item.action="{ item }">
        <div class="action-icons">
          <v-tooltip text="View" location="top">
            <template #activator="{ props: tooltip }">
              <div v-bind="tooltip" @click="emit('view-user', item.id)" style="cursor: pointer;">
                <ViewIcon />
              </div>
            </template>
          </v-tooltip>

          <v-tooltip text="Edit" location="top">
            <template #activator="{ props: tooltip }">
              <div v-bind="tooltip" @click="emit('edit-user', item.id)" style="cursor: pointer;">
                <EditIcon />
              </div>
            </template>
          </v-tooltip>

          <v-tooltip text="Delete" location="top">
            <template #activator="{ props: tooltip }">
              <div v-bind="tooltip" @click="openDelete(item)" style="cursor: pointer;">
                <DeleteIcon />
              </div>
            </template>
          </v-tooltip>
        </div>
      </template>

      <template #item.role="{ item }">
        <span>{{ item.roles?.map(role => role.name)?.join(', ') || 'No roles' }}</span>
      </template>
    </v-data-table>

    <v-dialog v-model="dialog" width="400" persistent>
      <v-card>
        <v-card-title>Confirm Deletion</v-card-title>
        <v-card-text>
          Are you sure you want to delete user: <strong>{{ toDelete?.username }}</strong>?
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="dialog = false">Cancel</v-btn>
          <v-btn color="red" @click="confirmDelete">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useUser } from '@/data/user'
import EditIcon from '@/assets/icons-vue/edit.vue'
import ViewIcon from '@/assets/icons-vue/receipt.vue'
import DeleteIcon from '@/assets/icons-vue/trash.vue'

const userStore = useUser()

const props = defineProps({
  items: Array,
  showActions: { type: Boolean, default: true },
  showRoles: { type: Boolean, default: true },
  showEmail: { type: Boolean, default: true },
  showDob: { type: Boolean, default: true }
})

const emit = defineEmits(['view-user', 'edit-user', 'delete-user'])

const dialog = ref(false)
const toDelete = ref(null)

function openDelete(item) {
  toDelete.value = item
  dialog.value = true
}

function confirmDelete() {
  emit('delete-user', toDelete.value.id)
  dialog.value = false
}

const rawHeaders = [
  { title: 'ID', key: 'id' },
  { title: 'Name', key: 'name' },
  { title: 'Username', key: 'username' },
  { title: 'Email', key: 'email' },
  { title: 'DOB', key: 'dob' },
  { title: 'Roles', key: 'role' },
  { title: 'Action', key: 'action', sortable: false }
]

const headers = computed(() => rawHeaders.filter(h => {
  if (h.key === 'action' && !props.showActions) return false
  if (h.key === 'role' && !props.showRoles) return false
  if (h.key === 'email' && !props.showEmail) return false
  if (h.key === 'dob' && !props.showDob) return false
  return true
}))
</script>

<style scoped>
.table-wrapper {
  max-height: 66vh;
  overflow-y: auto;
}

.v-data-table {
  background-color: var(--vt-c-main-bg-color);
  border-radius: 12px;
  padding: 12px;
  font-family: Montserrat;
  font-size: 15px;
  color: var(--vt-c-second-bg-color);
}

::v-deep(.v-data-table__th) {
  background-color: var(--vt-c-main-bg-color) !important;
  color: var(--vt-c-second-bg-color) !important;
  font-weight: 600 !important;
}

::v-deep(.v-data-table-header__sort-btn) {
  color: var(--vt-c-second-bg-color) !important;
}

.action-icons {
  display: flex;
  gap: 12px;
}
</style>
