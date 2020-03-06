<template>
  <div class="page-container">
    <md-app>
      <md-app-toolbar class="md-primary">
        <div class="md-toolbar-row">
          <span class="md-title">My Chat App</span>
        </div>
      </md-app-toolbar>
      <md-app-content>
        <md-field>
          <label>Message</label>
          <md-textarea v-model="textarea" disabled v-auto-scroll-bottom></md-textarea>
        </md-field>
        <md-field>
          <label>Your Message</label>
          <md-input v-model="message"></md-input>
          <md-button class="md-primary md-raised" @click="sendMessage()">Submit</md-button>
        </md-field>
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  created () {
    this.$socket.on('chat', (data) => {
      this.textarea += '[' + data.socketId + ']' + data.message + '\n'
    })
  },
  data () {
    return {
      textarea: '',
      message: '',
      socketId: ''
    }
  },
  methods: {
    sendMessage () {
      this.$socket.emit('chat', {
        message: this.message,
        socketId: this.$socket.id
      })
      this.textarea += '[' + this.$socket.id + ']' + this.message + '\n'
      this.message = ''
      this.socketId = this.$socket.id
    }
  }
}
</script>

<style>
  .md-app {
    height: 800px;
    border: 1px solid;
  }
  .md-textarea {
    height: 300px;
  }
</style>
