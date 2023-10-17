<script setup lang="ts">
// import ToggleSwitch from './ToggleSwitch.vue';

// const props = defineProps<{dev_mode: boolean; hard_mode: boolean}>()
// const emit = defineEmits(['toggleDev', 'toggleHard'])

// const dev_toggle = () => {
//   emit('toggleDev')
// }

// const hard_toggle = () => {
//   emit('toggleHard')
// }
</script>

<template>
  <h2>Settings</h2>
    <div class="settings-modal">
      <div class="settings-row">
        <div class="settings-description">
          <p>Developer Mode</p>
          <p class="settings-subtext">Shows answers automatically</p>
        </div>
        <slot name="devSwitch" />
      </div>
      <div class="settings-row">
        <div class="settings-description">
          <p>Hard Mode</p>
          <p class="settings-subtext">Limits to one Guess</p>
        </div>
        <slot name="modeSwitch" />
      </div>
    </div>
</template>

<style scoped>
.victory-message h3 {
    text-align: center;
    font-size: 26px;
  }
.settings-modal {
  display: flex;
  flex-direction: column;
}
.settings-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  border-bottom: solid 1px #3a3a3c;
  padding: 10px 0 10px;
}
.settings-row p {
  margin: 0;
}
.settings-subtext {
  font-size: 12px;
  color: #818384
}
</style>