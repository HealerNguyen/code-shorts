<script setup>
import { ref, nextTick, onMounted } from 'vue'

const isTyping = ref(false)
const inputMsg = ref('')
const messagesEnd = ref(null)
const isSidebarOpen = ref(false)

// Custom Selector State
const activeDropdown = ref(null)
const toggleDropdown = (id) => {
  activeDropdown.value = activeDropdown.value === id ? null : id
}
const closeDropdowns = () => {
  activeDropdown.value = null
}

const recentChats = ref([
  { id: 1, title: 'Deep dive into Vue 3 HMR...' },
  { id: 2, title: 'AI Architecture Trends 2025' },
  { id: 3, title: 'Creative Writing: Mars Colony' }
])

const models = ['Gemini 1.5 Pro', 'Claude 3.5 Sonnet', 'GPT-4o']
const selectedModel = ref(models[0])

const modes = ['Ask', 'Planning', 'Agent']
const selectedMode = ref(modes[0])

const messages = ref([
  { id: 1, text: "Hello! I'm your AI assistant. How can I help you today?", isBot: true }
])

const scrollToBottom = async () => {
  await nextTick()
  messagesEnd.value?.scrollIntoView({ behavior: 'smooth' })
}

const sendMessage = async () => {
  if (!inputMsg.value.trim()) return
  
  messages.value.push({ id: Date.now(), text: inputMsg.value, isBot: false })
  inputMsg.value = ''
  scrollToBottom()
  
  // Simulate AI Response
  isTyping.value = true
  scrollToBottom()
  
  setTimeout(() => {
    isTyping.value = false
    messages.value.push({
      id: Date.now(),
      text: `[Using ${selectedModel.value} in ${selectedMode.value} mode]\nGreat question! Let's explore the best way to implement that for you.`,
      isBot: true
    })
    scrollToBottom()
  }, 1500)
}

onMounted(() => {
  scrollToBottom()
})
</script>

<template>
  <div @click="closeDropdowns" class="flex h-full w-full bg-[#0f172a] text-[#f8fafc] font-sans overflow-hidden">
    <!-- Sidebar Overlay for Mobile -->
    <Transition name="fade">
      <div v-if="isSidebarOpen" @click="isSidebarOpen = false" class="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"></div>
    </Transition>

    <!-- Sidebar -->
    <aside 
      class="fixed md:static inset-y-0 left-0 w-72 bg-[#1e293b] border-r border-[#334155] p-4 flex flex-col z-50 transition-transform duration-300 ease-in-out md:translate-x-0"
      :class="isSidebarOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <button class="flex items-center gap-2 bg-[#8a2be2] hover:bg-[#7b24c9] text-white px-4 py-2 rounded-lg font-medium transition-colors w-full mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
        New Chat
      </button>
      
      <div class="text-xs font-semibold text-[#94a3b8] uppercase tracking-wider mb-3">Recent</div>
      <div class="flex-1 overflow-y-auto space-y-2 -mx-2 px-2 pr-4 relative">
        <div v-for="chat in recentChats" :key="chat.id" class="p-2 rounded-md hover:bg-[#334155] cursor-pointer text-sm flex items-center justify-between group relative transition-colors">
          <span class="truncate text-[#cbd5e1] w-40">{{ chat.title }}</span>
          <button @click.stop="toggleDropdown(chat.id)" class="opacity-0 group-hover:opacity-100 p-1 hover:bg-[#475569] rounded hover:text-white text-[#94a3b8] transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
          </button>
          
          <!-- Context Menu -->
          <Transition name="fade">
            <div v-if="activeDropdown === chat.id" class="absolute right-0 top-10 w-36 bg-[#1e293b] border border-[#334155] rounded-xl shadow-2xl z-50 py-1.5 overflow-hidden">
              <button class="w-full text-left px-3 py-2 hover:bg-[#334155] text-xs text-[#cbd5e1] flex items-center gap-2 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg> Rename
              </button>
              <button class="w-full text-left px-3 py-2 hover:bg-red-500/20 text-xs text-red-500 flex items-center gap-2 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg> Delete
              </button>
            </div>
          </Transition>
        </div>
      </div>
    </aside>

    <!-- Main Chat Area -->
    <main class="flex-1 flex flex-col relative">
      <header class="h-16 md:h-14 border-b border-[#334155] flex items-center px-4 md:px-6 bg-[#0f172a]/80 backdrop-blur-md sticky top-0 z-10 gap-3">
        <!-- Mobile Menu Toggle -->
        <button @click="isSidebarOpen = !isSidebarOpen" class="md:hidden p-2 hover:bg-[#334155] rounded-lg text-[#94a3b8] transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
        </button>
        
        <h1 class="text-lg font-semibold tracking-tight text-white flex items-center gap-2">
          Nexus AI <span class="flex h-2 w-2 rounded-full bg-green-500"></span>
        </h1>
      </header>

      <!-- Message History -->
      <div class="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 scroll-smooth">
        <TransitionGroup name="fade">
          <div v-for="msg in messages" :key="msg.id" 
               class="flex gap-4 max-w-3xl mx-auto"
               :class="msg.isBot ? 'flex-row' : 'flex-row-reverse'">
               
            <div class="w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-md"
                 :class="msg.isBot ? 'bg-gradient-to-br from-[#8a2be2] to-[#cba6f7]' : 'bg-[#334155]'">
              <span class="text-xs font-bold">{{ msg.isBot ? 'AI' : 'ME' }}</span>
            </div>

            <div class="px-5 py-3 rounded-2xl max-w-[80%] leading-relaxed shadow-sm"
                 :class="msg.isBot ? 'bg-[#1e293b] rounded-tl-sm border border-[#334155]/50' : 'bg-[#8a2be2] text-white rounded-tr-sm'">
              {{ msg.text }}
            </div>
          </div>
        </TransitionGroup>

        <!-- Typing Indicator -->
        <div v-if="isTyping" class="flex gap-4 max-w-3xl mx-auto">
          <div class="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-gradient-to-br from-[#8a2be2] to-[#cba6f7]">
            <span class="text-xs font-bold">AI</span>
          </div>
          <div class="px-5 py-4 rounded-2xl bg-[#1e293b] rounded-tl-sm border border-[#334155]/50 flex items-center gap-1.5 h-[48px]">
            <div class="w-2 h-2 rounded-full bg-[#94a3b8] animate-bounce" style="animation-delay: 0ms"></div>
            <div class="w-2 h-2 rounded-full bg-[#94a3b8] animate-bounce" style="animation-delay: 150ms"></div>
            <div class="w-2 h-2 rounded-full bg-[#94a3b8] animate-bounce" style="animation-delay: 300ms"></div>
          </div>
        </div>
        
        <div ref="messagesEnd" class="h-4"></div>
      </div>

      <!-- Input Area -->
      <div class="p-4 md:p-6 bg-gradient-to-t from-[#0f172a] via-[#0f172a] to-transparent shrink-0">
        <div class="max-w-3xl mx-auto relative group">
          
          <div class="w-full bg-[#1e293b] border border-[#334155] rounded-3xl p-3 shadow-2xl focus-within:border-[#8a2be2] focus-within:ring-1 focus-within:ring-[#8a2be2]/50 transition-all flex flex-col gap-2">
            
            <textarea 
              v-model="inputMsg"
              @keyup.enter.prevent="sendMessage"
              placeholder="Message Nexus AI..." 
              class="w-full bg-transparent resize-none h-14 outline-none text-[#f8fafc] text-sm px-3 pt-2 placeholder-[#64748b] leading-relaxed"
            ></textarea>
            
            <!-- Bottom Options Bar -->
            <div class="flex items-center justify-between px-1 relative">
              <div class="flex items-center gap-1.5">
                
                <!-- Custom Model Button -->
                <div class="relative">
                  <button @click.stop="toggleDropdown('models')" class="flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-[#334155] text-[#cbd5e1] text-[11px] font-bold tracking-wide transition-all border border-transparent hover:border-[#334155]">
                    <div class="w-2 h-2 rounded-full bg-[#a6e3a1] shadow-[0_0_8px_rgba(166,227,161,0.5)]"></div>
                    {{ selectedModel }}
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="opacity-40"><polyline points="6 9 12 15 18 9"></polyline></svg>
                  </button>
                  <Transition name="fade">
                    <div v-if="activeDropdown === 'models'" class="absolute bottom-full left-0 mb-3 w-52 bg-[#1e293b] border border-[#334155] rounded-2xl shadow-2xl py-2.5 z-50 overflow-hidden backdrop-blur-xl">
                      <div class="px-4 pb-2 text-[10px] font-black text-[#64748b] uppercase tracking-[0.1em]">AI Engine</div>
                      <button v-for="m in models" :key="m" @click="selectedModel = m; closeDropdowns()" 
                        class="w-full text-left px-4 py-2.5 hover:bg-[#334155] text-xs font-medium text-[#cbd5e1] transition-colors flex items-center justify-between">
                        {{m}}
                        <svg v-if="m === selectedModel" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="text-[#8a2be2]"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      </button>
                    </div>
                  </Transition>
                </div>

                <div class="w-px h-3 bg-[#334155] mx-1"></div>

                <!-- Custom Mode Button -->
                <div class="relative">
                  <button @click.stop="toggleDropdown('modes')" class="flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-[#334155] text-[#cbd5e1] text-[11px] font-bold tracking-wide transition-all border border-transparent hover:border-[#334155]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="text-[#cba6f7]"><polyline points="16 3 21 3 21 8"></polyline><line x1="4" y1="20" x2="21" y2="3"></line><polyline points="21 16 21 21 16 21"></polyline><line x1="15" y1="15" x2="21" y2="21"></line><line x1="4" y1="4" x2="9" y2="9"></line></svg>
                    {{ selectedMode }}
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="opacity-40"><polyline points="6 9 12 15 18 9"></polyline></svg>
                  </button>
                  <Transition name="fade">
                    <div v-if="activeDropdown === 'modes'" class="absolute bottom-full left-0 mb-3 w-44 bg-[#1e293b] border border-[#334155] rounded-2xl shadow-2xl py-2.5 z-50 overflow-hidden backdrop-blur-xl">
                      <div class="px-4 pb-2 text-[10px] font-black text-[#64748b] uppercase tracking-[0.1em]">Work Mode</div>
                      <button v-for="mode in modes" :key="mode" @click="selectedMode = mode; closeDropdowns()" 
                        class="w-full text-left px-4 py-2.5 hover:bg-[#334155] text-xs font-medium text-[#cbd5e1] transition-colors flex items-center justify-between">
                        {{mode}} Focus
                        <svg v-if="mode === selectedMode" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="text-[#8a2be2]"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      </button>
                    </div>
                  </Transition>
                </div>
              </div>

              <!-- Submit Button (Arrow Up Style) -->
              <button 
                @click="sendMessage"
                class="w-10 h-10 bg-[#f8fafc] hover:bg-white rounded-full text-[#0f172a] transition-all transform active:scale-90 flex items-center justify-center shadow-xl"
                :class="{'opacity-20 cursor-not-allowed grayscale bg-[#334155]': !inputMsg.trim()}"
                :disabled="!inputMsg.trim()"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
.fade-enter-from {
  opacity: 0;
  transform: translateY(10px) scale(0.98);
}
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
