from bs4 import BeautifulSoup
import glob
import random
import re
import os

def process_file(file_path):
    print(f"Processing {file_path}...")
    with open(file_path, 'r', encoding='utf-8') as f:
        html_content = f.read()

    soup = BeautifulSoup(html_content, 'html.parser')
    modified = False

    # Detection Strategy 1: "Flex" containers in older scenarios (cyberscenarios1)
    # Looking for containers that hold 3 columns
    # Specific signature: class="w-full md:w-1/3" inside a parent
    
    # We find all flex containers that typically hold decisions
    flex_containers = soup.find_all('div', class_=lambda c: c and 'flex' in c and ('md:flex-row' in c or 'flex-col' in c) and 'gap-4' in c)
    
    for container in flex_containers:
        # Check if children look like decision cards
        children = container.find_all('div', class_=lambda c: c and 'w-full' in c and 'md:w-1/3' in c, recursive=False)
        
        if len(children) >= 2:
            # We have decision cards.
            # 1. Shuffle them visually/DOM-wise
            random.shuffle(children)
            
            # 2. Append them back in new order
            container.clear()
            for child in children:
                container.append(child)

            # 3. Rewrite Headers to maintain A, B, C order
            # Find all h3 tags in the new order
            headers = container.find_all('h3')
            
            options = ["Seçenek A", "Seçenek B", "Seçenek C", "Seçenek D", "Seçenek E"]
            
            for idx, h3 in enumerate(headers):
                if idx >= len(options): break
                
                # Replace "Seçenek X" with new correct label
                # Regex to replace "Seçenek [A-Z]" or just prepend if missing?
                # Most have text like "Seçenek A: Tam Şeffaflık"
                text = h3.get_text()
                
                # Regex replace
                new_text = re.sub(r'Seçenek [A-Z]', options[idx], text)
                
                # If regex didn't match (maybe it says "Option 1"), handle edge cases?
                # For this specific project, "Seçenek A" seems standard in legacy scenarios.
                
                if new_text != text:
                    h3.string = new_text
            
            modified = True
            print(f"  - Shuffled {len(children)} cards in a flex container.")

    # Detection Strategy 2: ".decision-buttons" containers (Extended scenarios)
    # These usually contain <button> elements.
    button_containers = soup.find_all('div', class_='decision-buttons')
    for container in button_containers:
        buttons = container.find_all('button', recursive=False)
        if len(buttons) >= 2:
            random.shuffle(buttons)
            container.clear()
            for btn in buttons:
                container.append(btn)
            modified = True
            print(f"  - Shuffled {len(buttons)} buttons in .decision-buttons.")

    if modified:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(str(soup))
        print("  Saved.")
    else:
        print("  No shuffleable content found.")

# Target specific files or all
target_dirs = glob.glob('**/index.html', recursive=True)

for file in target_dirs:
    # Skip root and non-scenario files if any
    if "cyberscenarios" in file or "cybercompany" in file:
        process_file(file)
