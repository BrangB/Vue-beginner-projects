<template>
  <div>
    <!-- Login view -->
    <div class="view login" v-if="state.username === '' || state.username === null">
      <form class="login-form" @submit.prevent="login">
        <div class="form-inner">
          <h1>Login to FireChat</h1>
          <label for="username">Username</label>
          <input type="text" v-model="inputUsername" placeholder="Please enter your username...">
          <input type="submit" value="Login">
        </div>
      </form>
    </div>

    <!-- Chat view -->
    <div class="view chat" v-else>
      <header>
        <button class="logout" @click="logout">Logout</button>
        <h1>Welcome, {{ state.username }}</h1>
      </header>
      <section class="chat-box">
        <!-- Display messages -->
        <div 
        v-for="message in state.messages" 
        :key="message.key" 
        :class="(message.username == state.username ? 'message current-user' : 'message')">
        <div class="message-inner">
          <div class="username">{{ message.username }}</div>
          <div class="content">{{ message.content }}</div>
        </div>
      </div>
      </section>
      <footer>
        <form @submit.prevent="sendMessage">
          <input type="text" v-model="inputMessage" placeholder="Write a message...">
          <input type="submit" value="Send">
        </form>
      </footer>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, reactive } from 'vue';
import db from './db'; // Ensure your Firebase db is imported correctly

export default {
  name: 'app',
  setup() {
    const inputUsername = ref('');
    const inputMessage = ref('');
    const state = reactive({
      username: '',
      messages: [] // Store messages in an array
    });

    const login = () => {
      if (inputUsername.value.trim() !== '') {
        state.username = inputUsername.value.trim();
        inputUsername.value = '';
      }
    };

    const logout = () => {
      state.username = ""
    }

    const sendMessage = () => {
      const messagesRef = db.ref('messages');

      if (inputMessage.value.trim() === '') {
        return;
      }

      const message = {
        username: state.username,
        content: inputMessage.value.trim()
      };

      messagesRef.push(message);
      inputMessage.value = '';
    };

    // Fetch messages on component mount
    onMounted(() => {
      const messagesRef = db.ref('messages');
      messagesRef.on('value', (snapshot) => {
        state.messages = [];
        snapshot.forEach((childSnapshot) => {
          state.messages.push(childSnapshot.val());
        });
      });
    });

    return {
      inputUsername,
      login,
      state,
      inputMessage,
      sendMessage,
      logout
    };
  }
};
</script>


<style>
* {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.view {
    display: flex;
    justify-content: center;
    min-height: 100vh;
    background-color: #ea526f;
}

.view.login {
    align-items: center;
}

.view.login .login-form {
    display: block;
    width: 100%;
    padding: 15px;
}

.view.login .login-form .form-inner {
    display: block;
    background-color: #FFF;
    padding: 50px 15px;
    border-radius: 16px;
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2);
}

.view.login .login-form .form-inner h1 {
    color: #AAA;
    font-size: 28px;
    margin-bottom: 30px;
}

.view.login .login-form .form-inner label {
    display: block;
    margin-bottom: 5px;
    color: #AAA;
    font-size: 16px;
    transition: 0.4s;
}

.view.login .login-form .form-inner input[type="text"] {
    appearance: none;
    border: none;
    outline: none;
    background: none;
    display: block;
    width: 100%;
    padding: 10px 15px;
    border-radius: 8px;
    margin-bottom: 15px;
    color: #333;
    font-size: 18px;
    box-shadow: 0px 0px 0px rgba(0, 0, 0, 0);
    background-color: #F3F3F3;
    transition: 0.4s;
}

.view.login .login-form .form-inner input[type="text"]::placeholder {
    color: #888;
    transition: 0.4s;
}

.view.login .login-form .form-inner input[type="submit"] {
    appearance: none;
    border: none;
    outline: none;
    background: none;
    display: block;
    width: 100%;
    padding: 10px 15px;
    background-color: #ea526f;
    border-radius: 8px;
    color: #FFF;
    font-size: 18px;
    font-weight: 700;
}

.view.login .login-form .form-inner:focus-within label {
    color: #ea526f;
}

.view.login .login-form .form-inner:focus-within input[type="text"] {
    background-color: #FFF;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.2);
}

.view.chat {
    flex-direction: column;
}

.view.chat header {
    position: relative;
    display: block;
    width: 100%;
    padding: 50px 30px 10px;
}

.view.chat header .logout {
    position: absolute;
    top: 15px;
    right: 15px;
    appearance: none;
    border: none;
    outline: none;
    background: none;
    color: #FFF;
    font-size: 18px;
    margin-bottom: 10px;
    text-align: right;
}

.view.chat header h1 {
    color: #FFF;
}

.view.chat .chat-box {
    border-radius: 24px 24px 0px 0px;
    background-color: #FFF;
    box-shadow: 0px 0px 12px rgba(100, 100, 100, 0.2);
    flex: 1 1 100%;
    padding: 30px;
}

.view.chat .chat-box .message {
    display: flex;
    margin-bottom: 15px;
}

.view.chat .chat-box .message .message-inner .username {
    color: #888;
    font-size: 16px;
    margin-bottom: 5px;
    padding-left: 15px;
    padding-right: 15px;
}

.view.chat .chat-box .message .message-inner .content {
    display: inline-block;
    padding: 10px 20px;
    background-color: #F3F3F3;
    border-radius: 999px;
    color: #333;
    font-size: 18px;
    line-height: 1.2em;
    text-align: left;
}

.view.chat .chat-box .message.current-user {
    margin-top: 30px;
    justify-content: flex-end;
    text-align: right;
}

.view.chat .chat-box .message.current-user .message-inner {
    max-width: 75%;
}

.view.chat .chat-box .message.current-user .message-inner .content {
    color: #FFF;
    font-weight: 600;
    background-color: #ea526f;
}

.view.chat footer {
    position: sticky;
    bottom: 0px;
    background-color: #FFF;
    padding: 30px;
    box-shadow: 0px 0px 12px rgba(100, 100, 100, 0.2);
}

.view.chat footer form {
    display: flex;
}

.view.chat footer form input[type="text"] {
    flex: 1 1 100%;
    appearance: none;
    border: none;
    outline: none;
    background: none;
    display: block;
    width: 100%;
    padding: 10px 15px;
    border-radius: 8px 0px 0px 8px;
    color: #333;
    font-size: 18px;
    box-shadow: 0px 0px 0px rgba(0, 0, 0, 0);
    background-color: #F3F3F3;
    transition: 0.4s;
}

.view.chat footer form input[type="text"]::placeholder {
    color: #888;
    transition: 0.4s;
}

.view.chat footer form input[type="submit"] {
    appearance: none;
    border: none;
    outline: none;
    background: none;
    display: block;
    padding: 10px 15px;
    border-radius: 0px 8px 8px 0px;
    background-color: #ea526f;
    color: #FFF;
    font-size: 18px;
    font-weight: 700;
}

</style>
