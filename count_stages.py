import glob
import re
import os

base_path = r"c:\Users\Ozan\.gemini\antigravity\playground\exo-corona"
patterns = [
    os.path.join(base_path, "cyberscenarios*", "index.html"),
    os.path.join(base_path, "cybercompany*", "index.html"),
    os.path.join(base_path, "cybercompanyscenarios*", "index.html"),
]

print(f"{'Scenario':<40} | {'Stages':<10}")
print("-" * 55)

files = []
for p in patterns:
    files.extend(glob.glob(p))

for file_path in sorted(list(set(files))):
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
            # Method 1: Count id="stage..." or id="step..." (HTML Structure)
            matches_html = re.findall(r'id=["\'](?:stage|step)(\d+)["\']', content)
            
            # Method 2: Count distinct prefixes in decisionInfo (e.g., s1-, w1-, v1-)
            # Capturing [a-z] + digit + hyphen
            matches_js_prefix = re.findall(r'[\'"]([a-z]+)(\d+)-', content)
            # define stage count as max of the DIGIT part
            max_js_stage = 0
            if matches_js_prefix:
                # matches_js_prefix is list of tuples (prefix, number)
                max_js_stage = max([int(m[1]) for m in matches_js_prefix])
            
            # Method 3: Look for "showSection(X)" or "nextSection > X" logic
            matches_logic_next = re.findall(r'nextSection\s*>\s*(\d+)', content)
            matches_logic_show = re.findall(r'showSection\((\d+)\)', content)

            count = 0
            if matches_html:
                count = max(len(set(matches_html)), count)
            if max_js_stage > 0:
                count = max(max_js_stage, count)
            if matches_logic_next:
                 count = max(int(matches_logic_next[0]), count)
            if matches_logic_show:
                 count = max(max([int(x) for x in matches_logic_show]), count)
            
            relative_path = os.path.relpath(file_path, base_path)
            print(f"{relative_path:<40} | {count:<10}")
    except Exception as e:
        print(f"Error reading {file_path}: {e}")
