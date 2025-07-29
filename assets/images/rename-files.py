import os
import re
from transliterate import translit

def clean_filename(filename):
    # Разделяем имя и расширение
    name, ext = os.path.splitext(filename)
    
    # Транслитерация кириллицы в латиницу
    transliterated = translit(name, 'ru', reversed=True)
    
    # Удаляем все недопустимые символы (оставляем только буквы, цифры и дефисы)
    cleaned = re.sub(r"[^a-zA-Z0-9\-]", "-", transliterated)
    
    # Удаляем множественные дефисы и дефисы в начале/конце
    cleaned = re.sub(r"-+", "-", cleaned).strip("-")
    
    # Возвращаем имя в нижнем регистре с расширением
    return f"{cleaned.lower()}{ext}"

def rename_files_in_directory(root_dir):
    for root, dirs, files in os.walk(root_dir):
        for filename in files:
            # Пропускаем файлы без расширения
            if not os.path.splitext(filename)[1]:
                continue
                
            new_name = clean_filename(filename)
            
            if new_name != filename:
                old_path = os.path.join(root, filename)
                new_path = os.path.join(root, new_name)
                
                # Проверяем, не существует ли уже файл с таким именем
                counter = 1
                while os.path.exists(new_path):
                    name, ext = os.path.splitext(new_name)
                    new_name = f"{name}-{counter}{ext}"
                    new_path = os.path.join(root, new_name)
                    counter += 1
                
                os.rename(old_path, new_path)
                print(f"Renamed: {filename} → {new_name}")

if __name__ == "__main__":
    # Указываем текущую директорию или можно указать конкретный путь
    current_directory = os.path.dirname(os.path.abspath(__file__))
    rename_files_in_directory(current_directory)
    print("All files have been renamed successfully!")