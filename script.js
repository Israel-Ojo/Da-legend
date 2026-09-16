
        tailwind.config = {
            darkMode: 'class',
            theme: {
                extend: {
                    colors: {
                        legend: {
                            darkBg: '#041B16',
                            darkCard: '#0B2E26',
                            purple: '#3C0E59',
                            purpleLight: '#6e32a0',
                            accent: '#00C896',
                            accentGlow: '#00FFBF',
                            gold: '#FFD700'
                        }
                    },
                    fontFamily: {
                        sans: ['Inter', 'sans-serif'],
                        heading: ['Outfit', 'sans-serif']
                    }
                }
            }
        }






        let isDarkMode = true;
        let isPlaying = false;
        let currentTrackIndex = 0;

        const tracks = [
            { title: "Afrobeat Jam Session", artist: "Da-Legend Ensemble", duration: "2:30" },
            { title: "Classical Piano Sonata", artist: "Israel Ojo & Students", duration: "3:15" },
            { title: "Gospel Choir Vocal Harmony", artist: "Academy Vocal Choir", duration: "4:02" },
            { title: "Jazz Guitar Improvisation", artist: "Israel Ojo", duration: "2:50" }
        ];

        // Initialize App
        window.addEventListener('DOMContentLoaded', () => {
            renderPlaylist();
            updateTrackUI();
        });

        // Theme Toggle Functionality
        function toggleTheme() {
            isDarkMode = !isDarkMode;
            const html = document.documentElement;
            const themeIcon = document.getElementById('themeIcon');
            
            if (isDarkMode) {
                html.classList.add('dark');
                html.classList.remove('light');
                themeIcon.className = 'fa-solid fa-sun text-lg';
            } else {
                html.classList.remove('dark');
                html.classList.add('light');
                themeIcon.className = 'fa-solid fa-moon text-lg';
            }
        }

        // Navigation Functionality
        function navigateTo(sectionId) {
            const sections = ['home', 'news', 'about', 'profile', 'music'];
            sections.forEach(s => {
                const el = document.getElementById(`section-${s}`);
                const navBtn = document.getElementById(`nav-${s}`);
                
                if (s === sectionId) {
                    el.classList.remove('hidden');
                    if (navBtn) {
                        navBtn.className = "nav-btn px-4 py-2 rounded-lg text-sm font-medium transition-all text-legend-accent bg-legend-accent/10 border border-legend-accent/30";
                    }
                } else {
                    el.classList.add('hidden');
                    if (navBtn) {
                        navBtn.className = "nav-btn px-4 py-2 rounded-lg text-sm font-medium transition-all text-slate-300 light:text-slate-600 hover:text-legend-accent hover:bg-legend-accent/5";
                    }
                }
            });
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // Mobile Menu Toggle
        function toggleMobileMenu() {
            const menu = document.getElementById('mobileMenu');
            const icon = document.getElementById('menuIcon');
            if (menu.classList.contains('hidden')) {
                menu.classList.remove('hidden');
                icon.className = 'fa-solid fa-xmark text-xl';
            } else {
                menu.classList.add('hidden');
                icon.className = 'fa-solid fa-bars text-xl';
            }
        }

        function toggleLike(btn) {
            const heartIcon = btn.querySelector('i');
            const countSpan = btn.querySelector('.like-count');
            let count = parseInt(countSpan.innerText);

            if (heartIcon.classList.contains('fa-regular')) {
                heartIcon.className = 'fa-solid fa-heart text-xl text-red-500';
                countSpan.innerText = count + 1;
            } else {
                heartIcon.className = 'fa-regular fa-heart text-xl';
                countSpan.innerText = count - 1;
            }
        }

        function renderPlaylist() {
            const container = document.getElementById('playlistContainer');
            container.innerHTML = '';
            
            tracks.forEach((track, index) => {
                const item = document.createElement('div');
                const isActive = index === currentTrackIndex;
                item.className = `p-3.5 rounded-xl flex items-center justify-between cursor-pointer transition ${isActive ? 'bg-legend-accent/20 border border-legend-accent/40' : 'bg-black/20 hover:bg-black/30'}`;
                item.onclick = () => selectTrack(index);

                item.innerHTML = `
                    <div class="flex items-center space-x-3 truncate">
                        <i class="fa-solid ${isActive && isPlaying ? 'fa-volume-high text-legend-accent' : 'fa-music text-slate-500'}"></i>
                        <div class="truncate">
                            <p class="text-sm font-semibold text-white dark:text-white light:text-slate-900 truncate">${track.title}</p>
                            <p class="text-xs text-slate-400 truncate">${track.artist}</p>
                        </div>
                    </div>
                    <span class="text-xs text-slate-400 font-mono">${track.duration}</span>
                `;
                container.appendChild(item);
            });
        }

        function updateTrackUI() {
            const track = tracks[currentTrackIndex];
            document.getElementById('currentTrackTitle').innerText = track.title;
            document.getElementById('currentTrackArtist').innerText = track.artist;
            document.getElementById('totalTime').innerText = track.duration;
            renderPlaylist();
        }

        function togglePlayPause() {
            isPlaying = !isPlaying;
            const btn = document.getElementById('playPauseBtn');
            btn.innerHTML = isPlaying ? '<i class="fa-solid fa-pause"></i>' : '<i class="fa-solid fa-play ml-1"></i>';
            renderPlaylist();
        }

        function nextTrack() {
            currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
            updateTrackUI();
        }

        function prevTrack() {
            currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
            updateTrackUI();
        }

        function selectTrack(index) {
            currentTrackIndex = index;
            isPlaying = true;
            document.getElementById('playPauseBtn').innerHTML = '<i class="fa-solid fa-pause"></i>';
            updateTrackUI();
        }

        function seekTrack(e) {
            const rect = e.currentTarget.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const width = rect.width;
            const percentage = (clickX / width) * 100;
            document.getElementById('progressBar').style.width = `${percentage}%`;
        }

        function toggleChatModal() {
            const modal = document.getElementById('chatModal');
            modal.classList.toggle('hidden');
        }

        function sendQuickPrompt(promptText) {
            document.getElementById('chatInput').value = promptText;
            handleChatSubmit(new Event('submit'));
        }

        async function handleChatSubmit(e) {
            e.preventDefault();
            const inputEl = document.getElementById('chatInput');
            const userText = inputEl.value.trim();
            if (!userText) return;

            // Render User Message
            renderChatMessage(userText, 'user');
            inputEl.value = '';

            // Render Typing Indicator
            const typingId = renderTypingIndicator();

            // Fetch AI Response via Gemini API
            try {
                const responseText = await fetchMusicAIResponse(userText);
                removeChatMessage(typingId);
                renderChatMessage(responseText, 'bot');
            } catch (err) {
                removeChatMessage(typingId);
                renderChatMessage("Sorry, I encountered an error. Please try asking your music question again!", 'bot');
            }
        }

        function renderChatMessage(text, sender) {
            const container = document.getElementById('chatMessages');
            const msgDiv = document.createElement('div');
            
            if (sender === 'user') {
                msgDiv.className = 'flex items-end justify-end space-x-2';
                msgDiv.innerHTML = `
                    <div class="bg-legend-accent text-slate-950 font-medium p-3.5 rounded-2xl rounded-tr-none max-w-[85%] text-sm leading-relaxed shadow">
                        ${escapeHtml(text)}
                    </div>
                `;
            } else {
                msgDiv.className = 'flex items-start space-x-3';
                msgDiv.innerHTML = `
                    <div class="w-8 h-8 rounded-lg bg-legend-purple text-legend-accent flex items-center justify-center text-xs flex-shrink-0">
                        <i class="fa-solid fa-music"></i>
                    </div>
                    <div class="bg-legend-darkCard dark:bg-legend-darkCard light:bg-slate-200 p-3.5 rounded-2xl rounded-tl-none max-w-[85%] text-sm text-slate-200 light:text-slate-800 leading-relaxed shadow">
                        ${text}
                    </div>
                `;
            }

            container.appendChild(msgDiv);
            container.scrollTop = container.scrollHeight;
        }

        function renderTypingIndicator() {
            const container = document.getElementById('chatMessages');
            const id = 'typing-' + Date.now();
            const msgDiv = document.createElement('div');
            msgDiv.id = id;
            msgDiv.className = 'flex items-start space-x-3';
            msgDiv.innerHTML = `
                <div class="w-8 h-8 rounded-lg bg-legend-purple text-legend-accent flex items-center justify-center text-xs flex-shrink-0">
                    <i class="fa-solid fa-music"></i>
                </div>
                <div class="bg-legend-darkCard p-3.5 rounded-2xl rounded-tl-none text-sm text-slate-400 flex items-center space-x-1">
                    <span class="w-2 h-2 bg-legend-accent rounded-full animate-bounce"></span>
                    <span class="w-2 h-2 bg-legend-accent rounded-full animate-bounce delay-100"></span>
                    <span class="w-2 h-2 bg-legend-accent rounded-full animate-bounce delay-200"></span>
                </div>
            `;
            container.appendChild(msgDiv);
            container.scrollTop = container.scrollHeight;
            return id;
        }

        function removeChatMessage(id) {
            const el = document.getElementById(id);
            if (el) el.remove();
        }

        function escapeHtml(str) {
            return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        }

        async function fetchMusicAIResponse(userPrompt) {
            const apiKey = ""; // Canvas handles empty key automatically
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`;

            const systemInstruction = `
You are "Da-Legend Music AI", a warm, enthusiastic, and knowledgeable assistant for "Da-Legend Music Academy" founded by Israel Ojo.

STRICT RULE: You ONLY answer questions related to MUSIC (instruments, vocal techniques, songwriting, music theory, music genres like Afrobeat, Jazz, Classical, Gospel, Pop, Rock, academy courses, Israel Ojo, practice routines, and studio production).

IF THE USER ASKS ABOUT NON-MUSIC TOPICS (e.g. coding, math, sports, politics, weather, recipes, crypto, general news):
Politely and musically decline. Example: "I can only tune into music-related discussions! Ask me about instruments, vocal techniques, Afrobeat, or Da-Legend Music Academy."

Keep responses helpful, structured, concise, and formatted with clean bullet points or short paragraphs.
`;

            const payload = {
                contents: [{ parts: [{ text: userPrompt }] }],
                systemInstruction: {
                    parts: [{ text: systemInstruction }]
                }
            };

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error('API Request failed');
            }

            const data = await response.json();
            const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
            return text || "I'm ready to answer your music questions!";
        }
    
