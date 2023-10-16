<script lang="ts">
  import { defineComponent } from 'vue';
  import ToggleSwitch from './ToggleSwitch.vue';

  export default defineComponent({
    name: 'SettingsModal',
    components: { ToggleSwitch},
    emits: ['toggleDev', 'toggleHard'],
    props: {
      dev_mode: {
        required: true,
        type: Boolean
      },
      hard_mode: {
        required: true,
        type: Boolean
      }
    },
    setup(props, {emit}) {
      const dev_toggle = () => {
        emit('toggleDev')
      }

      const hard_toggle = () => {
        emit('toggleHard')
      }
  
      return {dev_toggle, hard_toggle }
    }
    
  })
</script>

<template>
  <h2>Settings</h2>
    <div class="settings-modal">
      <div class="settings-row">
        <div class="settings-description">
          <p>Developer Mode</p>
          <p class="settings-subtext">Shows answers automatically</p>
        </div>
        <ToggleSwitch :value="dev_mode" @updateValue="dev_toggle"/> 
      </div>
      <div class="settings-row">
        <div class="settings-description">
          <p>Hard Mode</p>
          <p class="settings-subtext">Limits to one Guess</p>
        </div>
        <ToggleSwitch :value="hard_mode" @updateValue="hard_toggle"/>
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