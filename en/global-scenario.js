/**
 * Global Scenario Enhancements
 * - Decision Button Randomization (via MutationObserver)
 * - Background Ambience Audio
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log('Global Scenario Script Loaded'); // Debug

    // --- 1. Audio Ambience Setup ---
    const audioPath = '../assets/audio/ambience.mp3';

    // Create Audio Element
    const bgAudio = new Audio(audioPath);
    bgAudio.loop = true;
    bgAudio.volume = 0.3; // Default low volume

    // Create UI Control
    const audioBtn = document.createElement('button');
    audioBtn.id = 'globalAudioBtn';
    audioBtn.innerHTML = '<i class="fas fa-volume-mute"></i>'; // Default icon
    audioBtn.title = "Background Sound (On/Off)";

    // Style the button
    Object.assign(audioBtn.style, {
        position: 'fixed',
        bottom: '20px',
        left: '20px',
        zIndex: '9999',
        backgroundColor: 'rgba(20, 20, 40, 0.8)',
        color: '#00E6FF',
        border: '1px solid #00E6FF',
        borderRadius: '50%',
        width: '50px',
        height: '50px',
        fontSize: '20px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 0 10px rgba(0, 230, 255, 0.3)',
        transition: 'all 0.3s ease'
    });

    audioBtn.addEventListener('mouseenter', () => {
        audioBtn.style.transform = 'scale(1.1)';
        audioBtn.style.boxShadow = '0 0 15px rgba(0, 230, 255, 0.6)';
    });

    audioBtn.addEventListener('mouseleave', () => {
        audioBtn.style.transform = 'scale(1)';
        audioBtn.style.boxShadow = '0 0 10px rgba(0, 230, 255, 0.3)';
    });

    // Toggle Logic
    let isPlaying = false;

    audioBtn.addEventListener('click', () => {
        if (isPlaying) {
            bgAudio.pause();
            audioBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
            audioBtn.style.color = '#00E6FF'; // Return to accent color
        } else {
            bgAudio.play().catch(e => console.log("Audio play failed (interaction required):", e));
            audioBtn.innerHTML = '<i class="fas fa-music"></i>';
            audioBtn.style.color = '#50fa7b'; // Green when playing
        }
        isPlaying = !isPlaying;
    });

    document.body.appendChild(audioBtn);


    // --- 2. Global Randomization (Deterministic / "Static") ---

    // Simple string hash for seeding
    function getHash(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = (hash << 5) - hash + char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return Math.abs(hash);
    }

    // Seeded RNG (Linear Congruential Generator)
    function seededRandom(seed) {
        const x = Math.sin(seed++) * 10000;
        return x - Math.floor(x);
    }

    function renameHeaders(container) {
        // Reset "Option A/B/C" headers if present
        const options = ["Option A", "Option B", "Option C", "Option D", "Option E"];
        const headers = container.querySelectorAll('h3, h4, .option-label'); // Broad selector

        let labelIndex = 0;
        headers.forEach(header => {
            if (labelIndex >= options.length) return;

            // Heuristic: Only rename if it looks like an option header
            // i.e. contains "Option" or matches pattern
            if (header.innerText.includes('Option')) {
                // Preserve the rest of the text? "Option A: Full Transparency" -> "Option A: Full Transparency" is pointless
                // We need to replace "Option [Old]" with "Option [New]"
                header.innerHTML = header.innerHTML.replace(/Option [A-Z]/, options[labelIndex]);
                labelIndex++;
            }
        });
    }

    function shuffleButtons(container) {
        // Only shuffle if not already shuffled
        if (container.classList.contains('shuffled')) return;

        const buttons = Array.from(container.children);
        if (buttons.length <= 1) return;

        // Generate seed based on text content to ensure consistency (Static Shuffle)
        // This ensures the shuffle is the SAME every time for the same content.
        const contentText = buttons.map(b => b.innerText.trim()).join('');
        let seed = getHash(contentText);

        // Fisher-Yates with seeded random
        for (let i = buttons.length - 1; i > 0; i--) {
            const j = Math.floor(seededRandom(seed) * (i + 1));
            [buttons[i], buttons[j]] = [buttons[j], buttons[i]];
            seed++; // Mutate seed slightly
        }

        // Re-append
        buttons.forEach(btn => container.appendChild(btn));

        // Rename headers to maintain logical order (A, B, C)
        renameHeaders(container);

        container.classList.add('shuffled');
    }

    // Initial check
    document.querySelectorAll('.decision-buttons, .flex.flex-col.md\\:flex-row, .grid.grid-cols-1.md\\:grid-cols-3').forEach(container => {
        // Refined selectors for legacy/extended scenarios
        // check if it likely contains decisions (has children buttons or divs)
        if (container.children.length > 1) {
            shuffleButtons(container);
        }
    });

    // Observer
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType === 1) {
                    if (node.classList.contains('decision-buttons')) {
                        shuffleButtons(node);
                    } else if (node.querySelectorAll) {
                        node.querySelectorAll('.decision-buttons').forEach(shuffleButtons);
                    }
                }
            });
        });
    });

    observer.observe(document.body, { childList: true, subtree: true });
});
