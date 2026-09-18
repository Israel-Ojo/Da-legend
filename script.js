
  
        tailwind.config = {
            darkMode: 'class',
            theme: {
                extend: {
                    colors: {
                        gold: {
                            DEFAULT: '#D4AF37',
                            light: '#F3E5AB',
                            dark: '#AA7C11',
                            glow: '#FFD700'
                        },
                        darkbg: '#0a0a0c',
                        cardbg: '#141419'
                    },
                    fontFamily: {
                        sans: ['Inter', 'sans-serif']
                    }
                }
            }
        }
    



        // Tab switching logic
        function switchTab(tabId) {
            const tabs = document.querySelectorAll('.tab-content');
            tabs.forEach(tab => tab.classList.add('hidden'));

            const targetTab = document.getElementById(`tab-${tabId}`);
            if (targetTab) {
                targetTab.classList.remove('hidden');
            }

            // Update navigation button active state
            const navBtns = document.querySelectorAll('.nav-btn');
            navBtns.forEach(btn => {
                btn.classList.remove('text-gold', 'bg-gold/10', 'border', 'border-gold/30');
                btn.classList.add('text-gray-300');
            });

            const activeBtn = document.getElementById(`nav-${tabId}`);
            if (activeBtn) {
                activeBtn.classList.add('text-gold', 'bg-gold/10', 'border', 'border-gold/30');
                activeBtn.classList.remove('text-gray-300');
            }

            // Close mobile menu after click
            document.getElementById('mobile-menu').classList.add('hidden');
        }

        // Dark / Light Theme Toggle Function
        function toggleDarkMode() {
            const html = document.documentElement;
            const themeIcon = document.getElementById('theme-icon');
            if (html.classList.contains('dark')) {
                html.classList.remove('dark');
                html.classList.add('light');
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
            } else {
                html.classList.remove('light');
                html.classList.add('dark');
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
            }
        }

        // Mobile Nav Drawer Toggle
        function toggleMobileMenu() {
            const menu = document.getElementById('mobile-menu');
            menu.classList.toggle('hidden');
        }

        // WhatsApp Modal Control
        function openEnrollModal() {
            document.getElementById('enrollModal').classList.remove('hidden');
        }

        function closeEnrollModal() {
            document.getElementById('enrollModal').classList.add('hidden');
        }

        // Redirect to WhatsApp with pre-filled message
        function sendWhatsAppMessage() {
            const name = document.getElementById('modalStudentName').value || 'Prospective Student';
            const course = document.getElementById('modalCourse').value || 'Music Program';
            const phone = "2347011046892";
            const text = encodeURIComponent(`Hello Da-Legend Music Academy! My name is ${name}. I would like to enroll in the ${course}. Please provide more details.`);
            window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
            closeEnrollModal();
        }

        // Simple AI Assistant Response Generator
        function handleAiChat(e) {
            e.preventDefault();
            const input = document.getElementById('aiInput');
            const chatBox = document.getElementById('chatBox');
            const query = input.value.trim();

            if (!query) return;

            // Render User Query
            const userMsg = document.createElement('div');
            userMsg.className = 'flex items-start justify-end space-x-2';
            userMsg.innerHTML = `<div class="bg-gold text-black p-3 rounded-lg max-w-[85%] font-medium">${query}</div>`;
            chatBox.appendChild(userMsg);

            input.value = '';
            chatBox.scrollTop = chatBox.scrollHeight;

            // Generate Automated Helpful AI Music Response
            setTimeout(() => {
                const aiMsg = document.createElement('div');
                aiMsg.className = 'flex items-start space-x-2';
                let reply = "That's a great question! At Da-Legend Music Academy, we recommend daily 20-minute scales practice, metronome rhythm drills, and active ear listening. Contact Da-Legend on WhatsApp for private personalized tutoring!";
                
                const qLower = query.toLowerCase();
                if (qLower.includes('piano') || qLower.includes('key')) {
                    reply = "For Piano: Practice the Major Scale formula (W-W-H-W-W-W-H) across 2 octaves using steady fingering (1-2-3-1-2-3-4-5).";
                } else if (qLower.includes('vocal') || qLower.includes('sing')) {
                    reply = "For Vocals: Always start with lip trills and humidification! Practice warmups on 'Ah' and 'Eee' vowels to expand your range smoothly without strain.";
                } else if (qLower.includes('guitar')) {
                    reply = "For Guitar: Master basic open chords (C, G, Am, F) and practice clean finger transitions with a metronome at 60 BPM.";
                }

                aiMsg.innerHTML = `
                    <span class="bg-gold text-black text-xs font-bold px-2 py-1 rounded">AI</span>
                    <div class="bg-gold/10 text-gray-200 p-3 rounded-lg max-w-[85%] border border-gold/20">${reply}</div>
                `;
                chatBox.appendChild(aiMsg);
                chatBox.scrollTop = chatBox.scrollHeight;
            }, 600);
        }
    
