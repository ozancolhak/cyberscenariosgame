import os
import glob

# Define the script tag to inject
script_tag = '<script src="../global-scenario.js"></script>'

# Find all index.html files in subdirectories starting with 'cyber'
target_files = glob.glob('**/index.html', recursive=True)

for file_path in target_files:
    # Skip the root index.html
    if file_path == 'index.html':
        continue
    
    # Only target subfolders
    if not os.path.dirname(file_path):
        continue

    print(f"Processing {file_path}...")
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Check if already injected
    if 'global-scenario.js' in content:
        print(f"  Skipping: Already injected.")
        continue

    # Injection point: Before </body>
    if '</body>' in content:
        new_content = content.replace('</body>', f'{script_tag}\n</body>')
        
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"  Injected successfully.")
    else:
        print(f"  Warning: No </body> tag found.")
