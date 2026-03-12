import { createApp } from 'vue';
import App from './App.vue';

const app = createApp(App);

// 🎨 Defining a global Custom Directive 'v-focus'
app.directive('focus', {
  mounted: (el) => el.focus()
});
