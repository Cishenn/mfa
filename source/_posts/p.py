import os

for file in os.listdir('.'):
    if os.path.isfile(file) and file.endswith('.md'):
        with open(file, 'r', encoding='utf-8') as f: 
            content = f.read()    
        import re
        print(content)
        content = re.sub(r'^<!--.*?-->', '', content, flags=re.DOTALL)
        content = content.lstrip()
        with open(file, 'w', encoding='utf-8') as f: 
            f.write(content)
        # input()