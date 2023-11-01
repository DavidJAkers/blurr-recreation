<script setup lang="ts">
import useSettings from '@/composables/useSettings';
import ToggleSwitch from './ToggleSwitch.vue';

const { devMode, hardMode, toggleDevMode, toggleHardMode } = useSettings()

</script>

<template>
  <h2>Settings</h2>
  <div class="settings-modal">
    <div class="settings-row">
      <div class="settings-description">
        <p>Developer Mode</p>
        <p class="settings-subtext">Shows answers automatically</p>
      </div>
      <ToggleSwitch :value="devMode" @updateValue="toggleDevMode" />
    </div>

    <div class="settings-row">
      <div class="settings-description">
        <p>Hard Mode</p>
        <p class="settings-subtext">Limits to one Guess</p>
      </div>
      <ToggleSwitch :value="hardMode" @updateValue="toggleHardMode" />
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